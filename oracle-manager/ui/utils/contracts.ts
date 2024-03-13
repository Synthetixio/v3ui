import { Contract, providers, utils } from 'ethers';
import * as OracleManagerProxy1 from '@synthetixio/v3-contracts/build/1-main/OracleManagerProxy';
import * as OracleManagerProxy5 from '@synthetixio/v3-contracts/build/5-main/OracleManagerProxy';
import * as OracleManagerProxy10 from '@synthetixio/v3-contracts/build/10-main/OracleManagerProxy';
import * as OracleManagerProxy420 from '@synthetixio/v3-contracts/build/420-main/OracleManagerProxy';
import * as OracleManagerProxy11155111 from '@synthetixio/v3-contracts/build/11155111-main/OracleManagerProxy';
import * as OracleManagerProxy84531Andromeda from '@synthetixio/v3-contracts/build/84531-andromeda/OracleManagerProxy';
import * as OracleManagerProxy8453Andromeda from '@synthetixio/v3-contracts/build/8453-andromeda/OracleManagerProxy';
import * as OracleManagerProxy421614Arbthetix from '@synthetixio/v3-contracts/build/421614-arbthetix/OracleManagerProxy';
import { Node } from './types';
import { ORACLE_NODE_TYPES } from './constants';

export function encodeBytesByNodeType(id: number, parameters: any[]) {
  switch (id) {
    case 1:
      return utils.defaultAbiCoder.encode(['uint'], parameters);
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
      return utils.defaultAbiCoder.encode(['uint'], parameters);
    case 7:
      return utils.defaultAbiCoder.encode(['uint'], parameters);
    case 8:
      return utils.defaultAbiCoder.encode(
        ['int'],
        parameters.map((p) => p.toString())
      );
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

export const getNodeModuleContract = (
  signerOrProvider: providers.JsonRpcSigner | providers.JsonRpcProvider,
  networkId: number
) => {
  switch (networkId) {
    case 1:
      return new Contract(OracleManagerProxy1.address, OracleManagerProxy1.abi, signerOrProvider);
    case 5:
      return new Contract(OracleManagerProxy5.address, OracleManagerProxy5.abi, signerOrProvider);
    case 10:
      return new Contract(OracleManagerProxy10.address, OracleManagerProxy10.abi, signerOrProvider);
    case 420:
      return new Contract(
        OracleManagerProxy420.address,
        OracleManagerProxy420.abi,
        signerOrProvider
      );
    case 84531:
      return new Contract(
        OracleManagerProxy84531Andromeda.address,
        OracleManagerProxy84531Andromeda.abi,
        signerOrProvider
      );
    case 11155111:
      return new Contract(
        OracleManagerProxy11155111.address,
        OracleManagerProxy11155111.abi,
        signerOrProvider
      );
    case 8453: {
      return new Contract(
        OracleManagerProxy8453Andromeda.address,
        OracleManagerProxy8453Andromeda.abi,
        signerOrProvider
      );
    }
    case 421614:
      return new Contract(
        OracleManagerProxy421614Arbthetix.address,
        OracleManagerProxy421614Arbthetix.abi,
        signerOrProvider
      );
    default:
      return new Contract(OracleManagerProxy1.address, OracleManagerProxy1.abi, signerOrProvider);
  }
};
