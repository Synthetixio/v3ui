import util from 'util';
import { ethers } from 'ethers';
import { importAllErrors } from '@snx-v3/contracts';

const PYTH_ERRORS = [
  // Function arguments are invalid (e.g., the arguments lengths mismatch)
  // Signature: 0xa9cb9e0d
  'error InvalidArgument()',
  // Update data is coming from an invalid data source.
  // Signature: 0xe60dce71
  'error InvalidUpdateDataSource()',
  // Update data is invalid (e.g., deserialization error)
  // Signature: 0xe69ffece
  'error InvalidUpdateData()',
  // Insufficient fee is paid to the method.
  // Signature: 0x025dbdd4
  'error InsufficientFee()',
  // There is no fresh update, whereas expected fresh updates.
  // Signature: 0xde2c57fa
  'error NoFreshUpdate()',
  // There is no price feed found within the given range or it does not exists.
  // Signature: 0x45805f5d
  'error PriceFeedNotFoundWithinRange()',
  // Price feed not found or it is not pushed on-chain yet.
  // Signature: 0x14aebe68
  'error PriceFeedNotFound()',
  // Requested price is stale.
  // Signature: 0x19abf40e
  'error StalePrice()',
  // Given message is not a valid Wormhole VAA.
  // Signature: 0x2acbe915
  'error InvalidWormholeVaa()',
  // Governance message is invalid (e.g., deserialization error).
  // Signature: 0x97363b35
  'error InvalidGovernanceMessage()',
  // Governance message is not for this contract.
  // Signature: 0x63daeb77
  'error InvalidGovernanceTarget()',
  // Governance message is coming from an invalid data source.
  // Signature: 0x360f2d87
  'error InvalidGovernanceDataSource()',
  // Governance message is old.
  // Signature: 0x88d1b847
  'error OldGovernanceMessage()',
  // The wormhole address to set in SetWormholeAddress governance is invalid.
  // Signature: 0x13d3ed82
  'error InvalidWormholeAddressToSet()',
];

function decodeBuiltinErrors(data) {
  let sighash = ethers.utils.id('Panic(uint256)').slice(0, 10);
  if (data.startsWith(sighash)) {
    // this is the `Panic` builtin opcode
    const reason = ethers.utils.defaultAbiCoder.decode(['uint256'], '0x' + data.slice(10))[0];
    switch (reason.toNumber()) {
      case 0x00:
        return { name: 'Panic("generic/unknown error")', sighash, args: [{ reason }] };
      case 0x01:
        return { name: 'Panic("assertion failed")', sighash, args: [{ reason }] };
      case 0x11:
        return { name: 'Panic("unchecked underflow/overflow")', sighash, args: [{ reason }] };
      case 0x12:
        return { name: 'Panic("division by zero")', sighash, args: [{ reason }] };
      case 0x21:
        return { name: 'Panic("invalid number to enum conversion")', sighash, args: [{ reason }] };
      case 0x22:
        return {
          name: 'Panic("access to incorrect storage byte array")',
          sighash,
          args: [{ reason }],
        };
      case 0x31:
        return { name: 'Panic("pop() empty array")', sighash, args: [{ reason }] };
      case 0x32:
        return { name: 'Panic("out of bounds array access")', sighash, args: [{ reason }] };
      case 0x41:
        return { name: 'Panic("out of memory")', sighash, args: [{ reason }] };
      case 0x51:
        return { name: 'Panic("invalid internal function")', sighash, args: [{ reason }] };
      default:
        return { name: 'Panic("unknown")', sighash, args: [{ reason }] };
    }
  }
  sighash = ethers.utils.id('Error(string)').slice(0, 10);
  if (data.startsWith(sighash)) {
    // this is the `Error` builtin opcode
    const reason = ethers.utils.defaultAbiCoder.decode(['string'], '0x' + data.slice(10));
    return { name: `Error("${reason}")`, sighash, args: [{ reason }] };
  }

  return;
}

function decodePythErrors(data) {
  const PythInterface = new ethers.utils.Interface(PYTH_ERRORS);
  try {
    const decodedError = PythInterface.parseError(data);
    Object.assign(decodedError, {
      name: `PythError.${decodedError.name}`,
    });
    return decodedError;
  } catch (e) {
    // whatever
  }
}

export async function parseError(error) {
  const errorData =
    error?.error?.error?.error?.data ||
    error?.error?.error?.data ||
    error?.error?.data?.data ||
    error?.error?.data ||
    error?.data?.data ||
    error?.data;

  if (typeof errorData !== 'string') {
    console.log('Error data missing', { error });
    throw error;
  }

  const AllErrorsContract = await importAllErrors(
    process.env.CYPRESS_CHAIN_ID,
    process.env.CYPRESS_PRESET
  );

  const errorParsed = (() => {
    try {
      const panic = decodeBuiltinErrors(errorData);
      if (panic) {
        return panic;
      }
      const pythError = decodePythErrors(errorData);
      if (pythError) {
        return pythError;
      }

      const AllErrorsInterface = new ethers.utils.Interface(AllErrorsContract.abi);
      const data = AllErrorsInterface.parseError(errorData);
      console.log({ decodedError: data });

      if (
        data?.name === 'OracleDataRequired' &&
        data?.args?.oracleContract &&
        data?.args?.oracleQuery
      ) {
        const oracleAddress = data?.args?.oracleContract;
        const oracleQueryRaw = data?.args?.oracleQuery;

        let updateType, publishTime, stalenessTolerance, feedIds, priceId;
        // eslint-disable-next-line prefer-const
        [updateType, publishTime, priceId] = ethers.utils.defaultAbiCoder.decode(
          ['uint8', 'uint64', 'bytes32'],
          oracleQueryRaw
        );

        if (updateType === 1) {
          [updateType, stalenessTolerance, feedIds] = ethers.utils.defaultAbiCoder.decode(
            ['uint8', 'uint64', 'bytes32[]'],
            oracleQueryRaw
          );
          publishTime = undefined;
        } else {
          feedIds = [priceId];
        }
        const errorOracleDataRequired = new Error('OracleDataRequired');
        Object.assign(errorOracleDataRequired, {
          name: data.name,
          error,
          args: {
            oracleAddress,
            oracleQuery: {
              updateType,
              publishTime: Number(publishTime),
              stalenessTolerance: Number(stalenessTolerance),
              feedIds,
            },
            oracleQueryRaw,
          },
          signature: data.signature,
          sighash: data.sighash,
          errorFragment: data.errorFragment,
        });
        return errorOracleDataRequired;
      }
      return data;
    } catch (e) {
      console.log(e);
    }
    return error;
  })();
  if (!errorParsed.name) {
    throw error;
  }
  const args = errorParsed?.args
    ? Object.fromEntries(
        Object.entries(errorParsed.args).filter(([key]) => `${parseInt(key)}` !== key)
      )
    : {};
  error.message = `${errorParsed?.name}, ${errorParsed?.sighash} (${util.inspect(args)})`;
  console.log(error);
  throw error;
}

module.exports = {
  parseError,
};
