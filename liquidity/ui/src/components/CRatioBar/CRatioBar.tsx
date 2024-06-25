import { TriangleDownIcon, TriangleUpIcon, InfoIcon } from '@chakra-ui/icons';
import { Box, Flex, Progress, Skeleton, Text, Tooltip } from '@chakra-ui/react';
import { FC } from 'react';

const getHealthVariant = ({
  targetCratioPercentage,
  liquidationCratioPercentage,
  currentCRatioPercentage,
  targetThreshold = 0.01,
}: {
  liquidationCratioPercentage: number | undefined;
  targetCratioPercentage: number | undefined;
  currentCRatioPercentage: number | undefined;
  targetThreshold: number | undefined;
}) => {
  if (!liquidationCratioPercentage || !targetCratioPercentage || !currentCRatioPercentage)
    return 'success';
  if (currentCRatioPercentage === 0) return 'success';
  const currentCRatioPercentageWithThresHold = currentCRatioPercentage * (1 + targetThreshold);
  // You can claim rewards when you below target but within the targetThreshold, the threshold does NOT apply to the liquidationRatio
  if (currentCRatioPercentage < liquidationCratioPercentage) return 'error';
  if (currentCRatioPercentageWithThresHold < targetCratioPercentage) return 'warning';
  return 'success';
};

const LineWithText: FC<{
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

const ratioIsMaxUInt = (ratio: number) => ratio > Number.MAX_SAFE_INTEGER;

export const CRatioBarUi: FC<{
  liquidationCratioPercentage: number;
  targetCratioPercentage: number;
  currentCRatioPercentage: number;
  newCratioPercentage?: number;
  targetThreshold: number;
  isLoading: boolean;
  hasChanges: boolean;
}> = ({
  targetCratioPercentage,
  liquidationCratioPercentage,
  currentCRatioPercentage,
  newCratioPercentage,
  targetThreshold,
  isLoading,
  hasChanges,
}) => {
  const maxRatioShown = Math.min(
    Math.max(targetCratioPercentage, currentCRatioPercentage) * 1.1,
    // If the c-ratio is bigger than 2.5x the target ratio the target and liquidation labels will overlap due to the big scale difference.
    // So when this is the case we opt not to show the current c-ratio arrows and set maxRatioShown to target * 2.5.
    targetCratioPercentage * 1.1
  );

  const scaleFactor = maxRatioShown / 100;

  const variant = getHealthVariant({
    targetCratioPercentage,
    liquidationCratioPercentage,
    currentCRatioPercentage,
    targetThreshold,
  });
  const newVariant = getHealthVariant({
    targetCratioPercentage,
    liquidationCratioPercentage,
    currentCRatioPercentage: newCratioPercentage,
    targetThreshold,
  });

  const newCratioPercentageWithDefault = newCratioPercentage || 0;
  const highlightedProgressCRatio =
    newCratioPercentage === undefined
      ? currentCRatioPercentage
      : newCratioPercentageWithDefault < currentCRatioPercentage
        ? newCratioPercentageWithDefault
        : currentCRatioPercentage;
  const nonHighLightedProgressCRatio =
    newCratioPercentageWithDefault < currentCRatioPercentage
      ? currentCRatioPercentage
      : newCratioPercentageWithDefault;

  return (
    <Flex flexDir="column" gap="2">
      <Text color="gray.500">
        C-Ratio{' '}
        <Tooltip label="TODO" p="3">
          <InfoIcon w="12px" h="12px" />
        </Tooltip>
      </Text>
      {!currentCRatioPercentage ? (
        <Text color="gray.500" fontWeight={800} fontSize="20px">
          N/A
        </Text>
      ) : (
        <Flex gap="1" alignItems="center">
          <Text color="white" fontWeight={800} fontSize="20px">
            {ratioIsMaxUInt(currentCRatioPercentage)
              ? 'Infinite'
              : currentCRatioPercentage.toFixed(2)}
            %
          </Text>
          {ratioIsMaxUInt(currentCRatioPercentage) ? (
            <Text color="white" fontWeight={800} fontSize="20px">
              &rarr; Infinite %
            </Text>
          ) : (
            hasChanges && (
              <Text color="white" fontWeight={800} fontSize="20px">
                &rarr; {newCratioPercentage?.toFixed(2)}%
              </Text>
            )
          )}
        </Flex>
      )}
      <Box
        position="relative"
        height="100px"
        width="full"
        data-testid="c ratio progressbar"
        overflowX="hidden"
      >
        <>
          <LineWithText
            left={
              !isLoading && liquidationCratioPercentage > 10
                ? liquidationCratioPercentage / scaleFactor
                : 10
            }
            text={
              !isLoading
                ? `Liquidation < ${liquidationCratioPercentage.toFixed(0)}%`
                : 'Liquidation'
            }
            tooltipText="You may be flagged for liquidation"
            tooltipPosition="left"
          />
          <LineWithText
            left={!isLoading ? targetCratioPercentage / scaleFactor : 66}
            text={
              !isLoading
                ? `Target ${
                    ratioIsMaxUInt(targetCratioPercentage)
                      ? 'Infinite'
                      : targetCratioPercentage.toFixed(0)
                  }%`
                : 'Target'
            }
            tooltipText="Required to claim rewards"
            tooltipPosition="right"
          />
        </>
        <Skeleton
          variant={variant}
          top={0}
          bottom={0}
          height="12px"
          position="absolute"
          margin="auto"
          width="100%"
          isLoaded={!isLoading}
        >
          {newCratioPercentage !== undefined ? (
            <Progress
              data-testId="non highlighted progress bar"
              variant={newCratioPercentage === 0 ? 'white' : 'update-' + newVariant}
              top={0}
              bottom={0}
              height="12px"
              position="absolute"
              margin="auto"
              width="100%"
              value={newCratioPercentage === 0 ? 0 : nonHighLightedProgressCRatio / scaleFactor}
            />
          ) : null}
          <Progress
            variant={newCratioPercentage !== undefined ? newVariant : variant}
            top={0}
            bottom={0}
            height="12px"
            position="absolute"
            margin="auto"
            width="100%"
            data-testId="highlighted progress bar"
            display={newCratioPercentage === 0 ? 'none' : 'block'}
            value={highlightedProgressCRatio / scaleFactor}
          />
        </Skeleton>
        <Box
          bg={variant}
          height="12px"
          position="absolute"
          left={`${
            (newCratioPercentage !== undefined ? newCratioPercentage : currentCRatioPercentage) /
            scaleFactor
          }%`}
          top={0}
          bottom={0}
          margin="auto"
          display={newCratioPercentage === 0 ? 'none' : 'block'}
        >
          {currentCRatioPercentage > 0 && !isLoading && (
            <>
              <TriangleDownIcon
                data-testid="current c-ration triangle"
                position="absolute"
                right={0}
                top={0}
                transform="translate(50%,-100%)"
                color={newCratioPercentage !== undefined ? newVariant : variant}
              />
              <TriangleUpIcon
                data-testid="current c-ration triangle"
                position="absolute"
                right={0}
                bottom={0}
                transform="translate(50%,100%)"
                color={newCratioPercentage !== undefined ? newVariant : variant}
              />
            </>
          )}
        </Box>
      </Box>
    </Flex>
  );
};

export const CRatioBar: FC<{
  liquidationCratioPercentage?: number;
  targetCratioPercentage?: number;
  currentCRatioPercentage?: number;
  targetThreshold: number;
  newCratioPercentage?: number;
  isLoading: boolean;
  hasChanges: boolean;
}> = ({
  newCratioPercentage,
  targetThreshold,
  currentCRatioPercentage,
  targetCratioPercentage,
  liquidationCratioPercentage,
  isLoading,
  hasChanges,
}) => {
  return (
    <CRatioBarUi
      liquidationCratioPercentage={liquidationCratioPercentage || 100}
      targetCratioPercentage={targetCratioPercentage || 100}
      currentCRatioPercentage={currentCRatioPercentage || 0}
      targetThreshold={targetThreshold}
      newCratioPercentage={newCratioPercentage}
      isLoading={isLoading}
      hasChanges={hasChanges}
    />
  );
};
