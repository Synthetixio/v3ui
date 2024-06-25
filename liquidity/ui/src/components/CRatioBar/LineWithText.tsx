import { InfoIcon } from '@chakra-ui/icons';
import { Box, Tooltip, Text } from '@chakra-ui/react';
import { FC } from 'react';

export const LineWithText: FC<{
  left: number;
  text: string;
  tooltipText: string;
  tooltipPosition: 'left' | 'right';
}> = ({ left, text, tooltipText, tooltipPosition }) => {
  return (
    <>
      <Box
        position="absolute"
        height="40%"
        transform="translateX(-50%)"
        left={`calc(${left}% ${tooltipPosition === 'left' ? '-' : '+'} 20px)`}
        top={0}
        bottom={0}
        margin="auto"
      >
        <Text
          color="gray.700"
          whiteSpace="nowrap"
          fontSize="xx-small"
          transform="translateY(calc(-100% - 10px) )"
        >
          {text}{' '}
          <Tooltip label={tooltipText} hasArrow>
            <InfoIcon />
          </Tooltip>
        </Text>
      </Box>
      <Box
        position="absolute"
        height="40%"
        width="1px"
        bg="gray.900"
        left={`${left}%`}
        top={0}
        bottom={0}
        margin="auto"
      />
    </>
  );
};
