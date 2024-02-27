import { Skeleton, SkeletonProps } from '@chakra-ui/react';

interface SynthSkeletonProps extends SkeletonProps {
  children: React.ReactNode;
}

export const SynthSkeleton = ({ children, ...props }: SynthSkeletonProps) => {
  return (
    <Skeleton {...props} startColor="gray.700" endColor="navy.800">
      {children}
    </Skeleton>
  );
};
