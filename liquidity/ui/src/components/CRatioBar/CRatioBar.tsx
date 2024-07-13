import { TriangleDownIcon, TriangleUpIcon, InfoIcon } from '@chakra-ui/icons';
import { Box, Flex, Progress, Skeleton, Text, Tooltip } from '@chakra-ui/react';
import { FC } from 'react';
import { LineWithText } from './LineWithText';
import { getHealthVariant, ratioIsMaxUInt } from './CRatioBar.utils';
import { CRatioBadge } from './CRatioBadge';

export const CRatioBarUi: FC<{
  liquidationCratioPercentage: number;
  targetCratioPercentage: number;
  currentCRatioPercentage: number;
  newCratioPercentage?: number;
  isLoading: boolean;
  hasChanges: boolean;
}> = ({
  targetCratioPercentage,
  liquidationCratioPercentage,
  currentCRatioPercentage,
  newCratioPercentage,
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
  });
  const newVariant = getHealthVariant({
    targetCratioPercentage,
    liquidationCratioPercentage,
    currentCRatioPercentage: newCratioPercentage,
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
      <Text color="gray.500" fontSize="xs">
        C-Ratio{' '}
        <Tooltip
          label="C-ratio is a dynamic number that represents a ratio between your collateral and your debt."
          p="3"
        >
          <InfoIcon w="10px" h="10px" />
        </Tooltip>
      </Text>
      <Flex alignItems="center" gap={2}>
        {!currentCRatioPercentage ? (
          <Text color="white" fontWeight={800} fontSize="20px">
            N/A
          </Text>
        ) : (
          <Text color="white" fontWeight={800} fontSize="20px">
            {ratioIsMaxUInt(currentCRatioPercentage)
              ? 'Infinite'
              : currentCRatioPercentage.toFixed(2)}
            %
          </Text>
        )}

        {hasChanges && newCratioPercentage && (
          <Text color="white" fontWeight={800} fontSize="20px">
            &rarr;{' '}
            {ratioIsMaxUInt(newCratioPercentage)
              ? 'Infinite'
              : `${newCratioPercentage.toFixed(2)} %`}
          </Text>
        )}

        {(hasChanges ? newCratioPercentage || 0 : currentCRatioPercentage) !== 0 && (
          <CRatioBadge
            currentCRatioPercentage={
              hasChanges ? newCratioPercentage || 0 : currentCRatioPercentage
            }
            liquidationCratioPercentage={liquidationCratioPercentage}
            targetCratioPercentage={targetCratioPercentage}
          />
        )}
      </Flex>

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
            tooltipText="Point at which your Position gets liquidated."
            tooltipPosition="left"
          />
          <LineWithText
            left={!isLoading ? targetCratioPercentage / scaleFactor : 66}
            text={
              !isLoading
                ? `Borrowing Ratio ${
                    ratioIsMaxUInt(targetCratioPercentage)
                      ? 'Infinite'
                      : targetCratioPercentage.toFixed(0)
                  }%`
                : 'Borrowing Ratio'
            }
            tooltipText="Minimum point at which you can borrow assets"
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
              data-testid="highlighted progress bar"
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
            data-testid="non highlighted progress bar"
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
  newCratioPercentage?: number;
  isLoading: boolean;
  hasChanges: boolean;
}> = ({
  newCratioPercentage,
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
      newCratioPercentage={newCratioPercentage}
      isLoading={isLoading}
      hasChanges={hasChanges}
    />
  );
};
