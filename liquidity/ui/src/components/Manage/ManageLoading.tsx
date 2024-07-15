import { Box, Divider, Flex, Skeleton } from '@chakra-ui/react';
import { FC } from 'react';
import { PositionTitle } from './PositionTitle';
import { BorderBox } from '@snx-v3/BorderBox';

export const ManageLoading: FC<{
  collateralSymbol?: string;
  poolName?: string;
}> = ({ collateralSymbol, poolName }) => {
  return (
    <Box mb={12} mt={8}>
      <PositionTitle collateralSymbol={collateralSymbol} poolName={poolName} isOpen />

      <Flex mt={6} flexDirection={['column', 'column', 'row']} gap={4}>
        <BorderBox gap={4} flex={1} p={6} flexDirection="column" bg="navy.700" height="fit-content">
          <Skeleton maxW="100px" width="100%" height="20px" />
          <Flex gap={4}>
            <BorderBox display="flex" flexDir="column" gap={2} p={4} flex={1} height="152px">
              <Skeleton width="100px" height="20px" />
              <Skeleton width="100%" height="28px" />
            </BorderBox>
            <BorderBox display="flex" flexDir="column" gap={2} p={4} flex={1} height="152px">
              <Skeleton width="100px" height="20px" />
              <Skeleton width="100%" height="28px" />
            </BorderBox>
          </Flex>

          <BorderBox display="flex" flexDir="column" gap={2} p={4} flex={1} height="130px">
            <Skeleton width="100px" height="20px" />
            <Skeleton width="100%" height="28px" maxW="300px" />
          </BorderBox>

          <BorderBox display="flex" flexDir="column" gap={2} p={4} flex={1} height="130px">
            <Skeleton width="100px" height="20px" />
            <Skeleton width="100%" height="28px" maxW="300px" />
          </BorderBox>
        </BorderBox>

        <BorderBox
          flex={1}
          maxW={['100%', '100%', '501px']}
          p={6}
          flexDirection="column"
          bg="navy.700"
          height="fit-content"
        >
          <Skeleton maxW="232px" width="100%" height="20px" />
          <Divider my={6} />
          <Skeleton maxW="232px" width="100%" height="20px" />
          <Skeleton mt={4} width="100%" height="79px" />
          <Skeleton mt={6} width="100%" height="48px" />
        </BorderBox>
      </Flex>
    </Box>
  );
};
