import { Amount } from '@snx-v3/Amount';
import { Button, Flex, Td, Tr, SkeletonCircle, Skeleton } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { wei } from '@synthetixio/wei';
import { TokenIcon } from '../../ui/src/components';

export const VaultRowLoading = ({
  startColor,
  endColor,
}: {
  startColor: string;
  endColor: string;
}) => {
  return (
    <Tr>
      <Td>
        <Flex flexDir="row" py={4}>
          <SkeletonCircle startColor={startColor} endColor={endColor} height="40px" width="40px">
            <TokenIcon width={40} height={40} symbol="SNX" />
          </SkeletonCircle>
        </Flex>
      </Td>
      <Td>
        <Skeleton height="28px" startColor={startColor} endColor={endColor}>
          <Amount value={wei(10 ** 5)} prefix="$" />
        </Skeleton>
      </Td>
      <Td>
        <Skeleton height="28px" startColor={startColor} endColor={endColor}>
          <Amount value={wei(10 ** 5)} suffix="%" />
        </Skeleton>
      </Td>
      <Td>
        <Skeleton height="28px" startColor={startColor} endColor={endColor}>
          <Amount value={wei(10 ** 5)} suffix="%" />
        </Skeleton>
      </Td>
      <Td>
        <Skeleton height="28px" startColor={startColor} endColor={endColor}>
          <Amount value={wei(10 ** 5)} suffix="%" />
        </Skeleton>
      </Td>
      <Td textAlign="end">
        <Skeleton height="28px" startColor={startColor} endColor={endColor}>
          <Button as={Link} disabled>
            Loading
          </Button>
        </Skeleton>
      </Td>
    </Tr>
  );
};
