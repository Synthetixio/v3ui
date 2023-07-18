import { Node, OracleNodeTypes } from './types';

export function convertStateToQueryParam(nodes: Node[]) {
  const queryParam = window.location.origin + '/';
  const nodeTypeIds: number[] = [];
  const nodeIds: string[] = [];
  const nodeParents: string[][] = [];
  const nodeParameters: string[][] = [];
  const nodeLocation: { x: string; y: string }[] = [];
  const networks: number[] = [];

  nodes.forEach((node) => {
    if (node.network && networks.length === 0) networks.push(node.network);
    nodeTypeIds.push(node.typeId);
    nodeIds.push(node.id);
    nodeParents.push(node.parents);
    nodeParameters.push(node.parameters);
    nodeLocation.push({ x: node.position.x.toFixed(2), y: node.position.y.toFixed(2) });
  });
  navigator.clipboard.writeText(
    queryParam.concat(
      `?tid=${JSON.stringify(nodeTypeIds)}&id=${JSON.stringify(nodeIds)}&par=${JSON.stringify(
        nodeParents
      )}&net=${JSON.stringify(networks)}&pam=${JSON.stringify(nodeParameters)}&loc=${JSON.stringify(
        nodeLocation
      )}`
    )
  );
}

export function oracleTypeFromTypeId(id: number): OracleNodeTypes {
  switch (id) {
    case 1:
      return 'reducer';
    case 2:
      return 'externalNode';
    case 3:
      return 'chainLink';
    case 4:
      return 'uniswap';
    case 5:
      return 'pyth';
    case 6:
      return 'priceDeviationCircuitBreaker';
    case 7:
      return 'stalenessCircuitBreaker';
    case 8:
      return 'constant';
    default:
      return 'chainLink';
  }
}
