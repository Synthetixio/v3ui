import { CloseIcon } from '@chakra-ui/icons';
import { Box, Flex, IconButton, Text } from '@chakra-ui/react';
import { FC } from 'react';
import { useParams } from 'react-router-dom';
import { Handle, Position } from 'reactflow';
import { useRecoilState } from 'recoil';
import { nodesState } from '../state/nodes';
import { NodeStateButton } from './NodeStateButton';

export const ConstantNode: FC<{ data: { label: string }; id: string }> = ({ data, id }) => {
  const [nodes, setNodes] = useRecoilState(nodesState);
  const params = useParams();
  const node = nodes.find((node) => node.id === id);
  return (
    <Box
      bg="red.800"
      borderRadius="4px"
      p="3"
      display="flex"
      flexDirection="column"
      alignItems="center"
      w="280px"
    >
      <Flex gap="2" alignItems="center" mb="2" width="100%">
        <Text fontSize="lg" fontWeight="bold" mr="auto">
          Constant Node
        </Text>
        <IconButton
          disabled={!!params.nodeId}
          icon={<CloseIcon color="white" />}
          onClick={(e) => {
            e.stopPropagation();
            setNodes((state) => {
              const newState = state
                .filter((s) => s.id !== node?.id)
                .map((s) => {
                  if (s.parents.includes(node?.id || '')) {
                    return {
                      ...s,
                      parents: s.parents.filter((parent) => parent !== node?.id),
                    };
                  }
                  return s;
                });
              return newState;
            });
          }}
          aria-label="close"
          variant="ghost"
          size="xs"
        />
      </Flex>
      <Flex
        flexDirection="column"
        gap="4"
        bg="red.900"
        p="5"
        borderWidth="1px"
        borderStyle="solid"
        borderColor="whiteAlpha.400"
        borderRadius="4px"
        mb="2"
        w="100%"
      >
        {data.label && (
          <Flex gap="2">
            <Text fontWeight="bold" color="whiteAlpha.800" fontSize="xs">
              Name:
            </Text>
            <Text fontSize="xs" color="whiteAlpha.800">
              {data.label}
            </Text>
          </Flex>
        )}
        <Flex gap="2">
          <Text fontWeight="bold" color="whiteAlpha.800" fontSize="xs">
            Constant Value:
          </Text>
          <Text fontSize="xs" color="whiteAlpha.800">
            {node?.parameters[0]}
          </Text>
        </Flex>
      </Flex>
      {node && <NodeStateButton node={node} />}
      <Handle
        type="source"
        isValidConnection={() => true}
        position={Position.Bottom}
        style={{ background: '#4E0055' }}
        isConnectable
      ></Handle>
    </Box>
  );
};
