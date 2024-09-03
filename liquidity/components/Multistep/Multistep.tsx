import { PropsWithChildren, ReactNode } from 'react';
import { Box, Checkbox, CheckboxProps, Flex, FlexProps, Text } from '@chakra-ui/react';
import { Step } from './Step';
import { statusColor } from './statusColor';
import { MultistepStatus } from './MultistepStatus';

function StepCheckbox({ children, ...props }: PropsWithChildren<CheckboxProps>) {
  return (
    <Flex mt="0.5">
      <Checkbox size="sm" {...props}>
        <Box fontSize="xs" opacity="0.66">
          {children}
        </Box>
      </Checkbox>
    </Flex>
  );
}
interface Props extends Omit<FlexProps, 'title'> {
  step: number;
  title: string | ReactNode;
  subtitle?: string | ReactNode;
  checkboxLabel?: string;
  checkboxProps?: CheckboxProps;
  status: MultistepStatus;
  children?: ReactNode | undefined;
}

export function Multistep({
  step,
  title,
  subtitle,
  checkboxLabel,
  checkboxProps,
  status,
  children,
  ...props
}: Props) {
  return (
    <Flex
      position="relative"
      alignItems="center"
      gap={4}
      rounded="lg"
      mt="6"
      p="4"
      border="1px solid"
      transitionProperty="border-color"
      transitionDuration="normal"
      borderColor={statusColor(status)}
      {...props}
    >
      <Step status={status}>{step}</Step>
      <Flex direction="column">
        <Text data-cy={`multistep-${step}`}>{title}</Text>
        {subtitle ? (
          <Text as="div" fontSize="xs" opacity="0.66">
            {subtitle}
          </Text>
        ) : null}
        {checkboxLabel ? <StepCheckbox {...checkboxProps}>{checkboxLabel}</StepCheckbox> : null}
        {children}
      </Flex>
    </Flex>
  );
}
