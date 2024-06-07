// Has to be imported cause yarn deps is dumb
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Contract, providers, utils } from 'ethers';
import { Node } from './types';
import { ORACLE_NODE_TYPES } from './constants';
import { Network } from '@snx-v3/useBlockchain';
import { importOracleManagerProxy } from '@snx-v3/contracts';

export function encodeBytesByNodeType(id: number, parameters: any[]) {
  switch (id) {
    case 1:
      return utils.defaultAbiCoder.encode(
        ['uint'],
        parameters.map((p) => p.toString())
      );
    case 2:
      return utils.defaultAbiCoder.encode(['address'], parameters);
    case 3:
      return utils.defaultAbiCoder.encode(['address', 'uint', 'uint8'], parameters);
    case 4:
      return utils.defaultAbiCoder.encode(
        ['address', 'address', 'uint', 'uint', 'address', 'uint'],
        parameters
      );
    case 5:
      return utils.defaultAbiCoder.encode(['address', 'bytes32', 'bool'], parameters);
    case 6:
      return utils.defaultAbiCoder.encode(
        ['uint'],
        parameters.map((p) => p.toString())
      );
    case 7:
      return utils.defaultAbiCoder.encode(
        ['uint'],
        parameters.map((p) => p.toString())
      );
    case 8:
      return utils.defaultAbiCoder.encode(
        ['int'],
        parameters.map((p) => p.toString())
      );
    case 9:
      return utils.defaultAbiCoder.encode(['address', 'bytes32', 'uint'], parameters);
    default:
      return '';
  }
}

export function decodeBytesByNodeType(id: number, parameters: any[]) {
  switch (id) {
    case 1:
      return utils.defaultAbiCoder.decode(['uint'], parameters).map((operation) => {
        const option = ORACLE_NODE_TYPES[4].parameters[0].options!.find(
          (option) => option.value === Number(operation.toString())
        );
        if (option) return option.value;
        return operation;
      });
    case 2:
      return utils.defaultAbiCoder.decode(['address'], parameters);
    case 3:
      return utils.defaultAbiCoder
        .decode(['address', 'uint', 'uint8'], parameters)
        .map((param, index) => {
          if (index === 1) {
            return Number(param.toString());
          }
          return param;
        });
    case 4:
      return utils.defaultAbiCoder
        .decode(['address', 'address', 'address', 'uint'], parameters)
        .map((param, index) => {
          if (index === 3) {
            return Number(param.toString());
          }
          return param;
        });
    case 5:
      return utils.defaultAbiCoder.decode(['address', 'bytes32', 'bool'], parameters);
    case 6:
      return utils.defaultAbiCoder.decode(['uint'], parameters).map((param) => {
        return Number(param.toString());
      });
    case 7:
      return utils.defaultAbiCoder.decode(['uint'], parameters).map((param) => {
        return Number(param.toString());
      });
    case 8:
      return utils.defaultAbiCoder.decode(['int'], parameters).map((param) => {
        return Number(param.toString());
      });
    case 9:
      return utils.defaultAbiCoder.decode(['address', 'bytes32', 'uint'], parameters);
    default:
      return '';
  }
}

export function nodeInformationByNodeIds(id: number) {
  switch (id) {
    case 1:
      return { label: 'Reducer', slug: 'reducer' };
    case 2:
      return { label: 'External Node', slug: 'externalNode' };
    case 3:
      return { label: 'ChainLink', slug: 'chainLink' };
    case 4:
      return { label: 'Uniswap', slug: 'uniswap' };
    case 5:
      return { label: 'Pyth', slug: 'pyth' };
    case 6:
      return { label: 'Price Deviation Circuit Breaker', slug: 'priceDeviationCircuitBreaker' };
    case 7:
      return { label: 'Staleness Circuit Breaker', slug: 'stalenessCircuitBreaker' };
    case 8:
      return { label: 'Constant', slug: 'constant' };
    case 9:
      return { label: 'Pyth Offchain Lookup', slug: 'pythOffchainLookup' };
    default:
      return { label: '', slug: '' };
  }
}

export function hashId(node: Node, parents: string[]) {
  return utils.keccak256(
    utils.defaultAbiCoder.encode(
      ['uint256', 'bytes', 'bytes32[]'],
      [node.typeId, encodeBytesByNodeType(node.typeId, node.parameters), parents]
    )
  );
}

export const getNodeModuleContract = async (
  signerOrProvider: providers.JsonRpcSigner | providers.JsonRpcProvider,
  network: Network
) => {
  const OracleManagerProxy = await importOracleManagerProxy(network.id, network.preset);
  return new Contract(OracleManagerProxy.address, OracleManagerProxy.abi, signerOrProvider);
};
