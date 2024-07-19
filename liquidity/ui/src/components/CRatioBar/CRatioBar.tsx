import { TriangleDownIcon, TriangleUpIcon, InfoIcon } from '@chakra-ui/icons';
import { Box, Flex, Progress, Skeleton, Text, Tooltip } from '@chakra-ui/react';
import { FC } from 'react';
import { LineWithText } from './LineWithText';
import { getHealthVariant, getProgressSize, ratioIsMaxUInt } from './CRatioBar.utils';
import { CRatioBadge } from './CRatioBadge';

export const CRatioBarUi: FC<{
  liquidationCratio: number;
  targetCratio: number;
  currentCRatio: number;
  newCratio?: number;
  isLoading: boolean;
  hasChanges: boolean;
}> = ({ targetCratio, liquidationCratio, currentCRatio, newCratio, isLoading, hasChanges }) => {
  const variant = hasChanges
    ? getHealthVariant({
        targetCratio: targetCratio,
        liquidationCratio: liquidationCratio,
        cRatio: newCratio,
      })
    : getHealthVariant({
        targetCratio: targetCratio,
        liquidationCratio: liquidationCratio,
        cRatio: currentCRatio,
      });

  const newBarSize = getProgressSize({
    cRatio: newCratio,
    targetCratio: targetCratio,
    liquidationCratio: liquidationCratio,
  });

  const currentBarSize = getProgressSize({
    cRatio: currentCRatio,
    targetCratio: targetCratio,
    liquidationCratio: liquidationCratio,
  });

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
      <Flex
        color="white"
        fontWeight={800}
        fontSize="20px"
        flexDir={['column', 'row']}
        alignItems="center"
        gap={2}
      >
        {!currentCRatio ? (
          <Text>N/A</Text>
        ) : (
          <Text>{ratioIsMaxUInt(currentCRatio) ? 'Infinite' : `${currentCRatio.toFixed(2)}%`}</Text>
        )}

        {hasChanges && newCratio && (
          <>
            <span>&rarr;</span>
            <Text>{ratioIsMaxUInt(newCratio) ? 'Infinite' : `${newCratio.toFixed(2)} %`}</Text>
          </>
        )}

        {(hasChanges ? newCratio || 0 : currentCRatio) !== 0 && (
          <CRatioBadge
            cRatio={hasChanges ? newCratio || 0 : currentCRatio}
            liquidationCratio={liquidationCratio}
            targetCratio={targetCratio}
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
            left="25%"
            text={!isLoading ? `Liquidation < ${liquidationCratio.toFixed(0)}%` : 'Liquidation'}
            tooltipText="Point at which your Position gets liquidated."
          />
          <LineWithText
            left="75%"
            text={
              !isLoading
                ? `Borrowing Ratio ${
                    ratioIsMaxUInt(targetCratio) ? 'Infinite' : targetCratio.toFixed(0)
                  }%`
                : 'Borrowing Ratio'
            }
            tooltipText="Minimum point at which you can borrow assets"
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
          <Progress
            variant={
              currentBarSize < newBarSize && !(currentBarSize >= 100 && newBarSize > 100)
                ? `update-${variant}`
                : variant
            }
            top={0}
            bottom={0}
            height="12px"
            position="absolute"
            margin="auto"
            left="0"
            width="100%"
            value={Math.min(newBarSize, currentBarSize)}
          />
          <Progress
            variant={currentBarSize >= newBarSize ? `update-${variant}` : variant}
            top={0}
            bottom={0}
            height="12px"
            position="absolute"
            margin="auto"
            width="100%"
            left={`${Math.min(newBarSize, currentBarSize)}%`}
            display={newCratio === 0 ? 'none' : 'block'}
            value={Math.abs(newBarSize - currentBarSize)}
          />
        </Skeleton>
        <Box
          bg={variant}
          height="12px"
          position="absolute"
          left={`${getProgressSize({
            cRatio: newCratio,
            targetCratio: targetCratio,
            liquidationCratio: liquidationCratio,
          })}%`}
          top={0}
          bottom={0}
          margin="auto"
          display={newCratio === 0 ? 'none' : 'block'}
        >
          {currentCRatio > 0 && !isLoading && (
            <>
              <TriangleDownIcon
                position="absolute"
                right={0}
                top={0}
                transform="translate(50%,-100%)"
                color={variant}
              />
              <TriangleUpIcon
                data-testid="current c-ration triangle"
                position="absolute"
                right={0}
                bottom={0}
                transform="translate(50%,100%)"
                color={variant}
              />
            </>
          )}
        </Box>
      </Box>
    </Flex>
  );
};

export const CRatioBar: FC<{
  liquidationCratio?: number;
  targetCratio?: number;
  currentCRatio?: number;
  newCratio?: number;
  isLoading: boolean;
  hasChanges: boolean;
}> = ({ newCratio, currentCRatio, targetCratio, liquidationCratio, isLoading, hasChanges }) => {
  return (
    <CRatioBarUi
      liquidationCratio={liquidationCratio || 100}
      targetCratio={targetCratio || 100}
      currentCRatio={currentCRatio || 0}
      newCratio={newCratio}
      isLoading={isLoading}
      hasChanges={hasChanges}
    />
  );
};
