import { hashId } from './contracts';
import { Node } from './types';

export const findParentNode = (parentId: string, nodes: Node[]) => {
  const parentNode = nodes.find((node) => node.id === parentId);
  if (parentNode) {
    return hashId(parentNode, []);
  }
  return '';
};
