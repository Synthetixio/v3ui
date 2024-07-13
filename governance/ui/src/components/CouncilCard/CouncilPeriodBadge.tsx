import { Badge, Fade, Skeleton } from '@chakra-ui/react';

export const CouncilPeriodBadge = ({
  councilPeriod,
  isLoading,
}: {
  councilPeriod: string | undefined;
  isLoading: boolean;
}) => {
  const { color, text } = councilPeriodMetaData(councilPeriod);

  return (
    <Skeleton isLoaded={!isLoading} height="20px" mb="24px">
      <Fade in>
        <Badge
          bg={color}
          color="white"
          mb="6"
          textTransform="uppercase"
          data-cy="council-period-badge"
        >
          {text}
        </Badge>
      </Fade>
    </Skeleton>
  );
};

function councilPeriodMetaData(councilPeriod: string | undefined) {
  switch (councilPeriod) {
    case '0':
      return {
        color: 'gray.900',
        text: 'Closed - Council Elected',
      };
    case '1':
      return {
        color: 'orange.600',
        text: 'Nomination Open',
      };
    case '2':
      return {
        color: 'teal.500',
        text: 'Voting Open',
      };
    default:
      return {
        color: 'purple.500',
        text: 'Evaluation',
      };
  }
}
