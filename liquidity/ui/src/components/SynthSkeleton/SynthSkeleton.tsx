import { Skeleton, SkeletonCircle, SkeletonProps } from '@chakra-ui/react';

interface SynthSkeletonProps extends SkeletonProps {
  children: React.ReactNode;
}

export const SynthSkeleton = ({ children, ...props }: SynthSkeletonProps) => {
  return (
    <Skeleton startColor="gray.700" endColor="navy.800" {...props}>
      {children}
    </Skeleton>
  );
};

export const SynthCircle = ({ children, ...props }: SkeletonProps) => {
  return (
    <SkeletonCircle startColor="gray.700" endColor="navy.800" {...props}>
      {children}
    </SkeletonCircle>
  );
};
