import {
  Flex,
  Heading,
  Tag,
  Text,
  Button,
  Box,
  Link,
  Fade,
  TableContainer,
  Th,
  Table,
  Thead,
  Tr,
  Tbody,
  Td,
  Icon,
  IconProps,
} from '@chakra-ui/react';
import { NetworkIcon } from '@snx-v3/useBlockchain';
import { TokenIcon } from '../../TokenIcon';
import { Sparkles } from '@snx-v3/icons';
import { Tooltip } from '@snx-v3/Tooltip';

interface TorosPoolCardProps {
  tvl: string;
  apy: number;
}

export function TorosPoolCard({ tvl, apy }: TorosPoolCardProps) {
  return (
    <Fade in>
      <Box
        bgGradient="linear(to-tr, green.700, cyan.800)"
        p="1px"
        rounded="base"
        position="relative"
      >
        {/* For overlay to not show gradient */}
        <Box
          position="absolute"
          rounded="base"
          bg="navy.700"
          width="calc(100% - 2px)"
          height="calc(100% - 2px)"
        />
        <Flex
          position="relative"
          onClick={() => {
            window.open('https://toros.finance/synthetix-usdc-andromeda-yield', '_blank');
          }}
          flexDir="column"
          rounded="base"
          bg="navy.700"
          _hover={{ cursor: 'pointer', bg: 'whiteAlpha.50', textDecoration: 'none' }}
          p={6}
        >
          <Flex w="100%" gap="2" alignItems="start" mb="4" justifyContent="space-between">
            <Flex>
              <Flex flexDirection="column" justifyContent="space-between">
                <Heading fontSize="20px" fontWeight={700} color="white">
                  USDC Andromeda Yield
                </Heading>
                <Flex alignItems="center" gap="1">
                  <NetworkIcon networkId={8453} w="14px" height="14px" />
                  <Text color="gray.500" fontSize="12px">
                    Base Network
                  </Text>
                </Flex>
              </Flex>
              <Tag
                mx={2}
                mt="2px"
                size="sm"
                bgGradient="linear(to-tr, green.700, cyan.800)"
                color="white"
                alignSelf="flex-start"
              >
                Auto Compound
              </Tag>
              <Tooltip
                placement="top"
                label="This vault is earning OP tokens via the Optimism Superfest"
              >
                <Link href="https://superfest.optimism.io/" target="_blank" alignItems="center">
                  <OpSuperfestIcon mb="1px" />
                </Link>
              </Tooltip>
            </Flex>
            <Flex>
              <Text fontSize="20px" fontWeight={700} color="gray.500" mr={2}>
                TVL
              </Text>
              <Text fontSize="20px" fontWeight={700} color="white" mr={4}>
                ${tvl}
              </Text>
              <Text fontSize="20px" fontWeight={700} color="gray.500" mr={2}>
                APY
              </Text>
              <Text fontSize="20px" fontWeight={700} color="white">
                Up to {apy}%
                <Sparkles w="18px" h="18px" mb={1} ml="0.5px" />
              </Text>
            </Flex>
          </Flex>
          <TableContainer>
            <Table>
              <Thead>
                <Tr borderBottom="1px solid #2D2D38">
                  <Th
                    textTransform="unset"
                    color="gray.600"
                    border="none"
                    fontFamily="heading"
                    fontSize="12px"
                    lineHeight="16px"
                    letterSpacing={0.6}
                    fontWeight={700}
                    px={4}
                    py={3}
                  >
                    Collateral
                  </Th>
                  <Th
                    textTransform="unset"
                    color="gray.600"
                    border="none"
                    fontFamily="heading"
                    fontSize="12px"
                    lineHeight="16px"
                    letterSpacing={0.6}
                    fontWeight={700}
                    px={4}
                    py={3}
                  >
                    APY
                  </Th>
                  <Th
                    textTransform="unset"
                    color="gray.600"
                    border="none"
                    fontFamily="heading"
                    fontSize="12px"
                    lineHeight="16px"
                    letterSpacing={0.6}
                    fontWeight={700}
                    px={4}
                    py={3}
                  ></Th>
                </Tr>
              </Thead>
              <Tbody>
                <Tr>
                  <Td width="66%" border="none" px={4}>
                    <Flex alignItems="center">
                      <TokenIcon w={26} h={26} symbol="USDC" />
                      <Flex flexDirection="column" ml={3} mr="auto">
                        <Text
                          fontSize="14px"
                          color="white"
                          fontWeight={700}
                          lineHeight="1.25rem"
                          fontFamily="heading"
                        >
                          USDC
                        </Text>
                        <Text
                          fontSize="12px"
                          color="gray.500"
                          fontFamily="heading"
                          lineHeight="1rem"
                        >
                          USD Coin
                        </Text>
                      </Flex>
                    </Flex>
                  </Td>
                  <Td border="none" textAlign="left" px="12px">
                    <Text
                      fontFamily="heading"
                      fontSize="14px"
                      lineHeight="20px"
                      fontWeight={500}
                      color="white"
                    >
                      {apy}%
                      <Sparkles w="14px" h="14px" mb={1} ml="0.5px" mt="1px" />
                    </Text>
                  </Td>
                  <Td border="none" textAlign="right" px={0}>
                    <Link
                      href="https://toros.finance/synthetix-usdc-andromeda-yield"
                      rel="noopener"
                      target="_blank"
                      _hover={{ textDecoration: 'none' }}
                      mr="auto"
                    >
                      <Button
                        size="sm"
                        height="32px"
                        py="10px"
                        px="12px"
                        whiteSpace="nowrap"
                        borderRadius="4px"
                        fontFamily="heading"
                        fontWeight={700}
                        fontSize="14px"
                        lineHeight="20px"
                      >
                        Deposit on Toros
                        <LinkOffIcon ml={1} />
                      </Button>
                    </Link>
                  </Td>
                </Tr>
              </Tbody>
            </Table>
          </TableContainer>
          <Flex direction="row" alignItems="center" justifyContent="flex-end">
            <Text fontSize="16px" color="gray.500" mr={2}>
              by
            </Text>
            <TorosIcon />
          </Flex>
        </Flex>
      </Box>
    </Fade>
  );
}

const TorosIcon = () => (
  <svg width="48" height="16" viewBox="0 0 48 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M6.15767 6.11048H3.91623L3.90559 14.6212H1.6864L1.69703 6.10854H0V3.86863H1.69703L1.6864 0.5H3.91043L3.92106 3.87545H6.15767V6.11048ZM12.4188 15C11.4701 15.0094 10.5385 14.7448 9.73449 14.2375C8.91459 13.7182 8.24043 12.996 7.77629 12.1399C7.31214 11.2837 7.07348 10.3221 7.08306 9.34667C7.07078 7.85556 7.63097 6.41733 8.64665 5.33236C9.12781 4.81663 9.70555 4.40191 10.3466 4.1121C11.1059 3.7745 11.9352 3.62747 12.7633 3.68361C13.5914 3.73976 14.3937 3.99741 15.1012 4.43445C15.9083 4.9424 16.5739 5.64888 17.0351 6.48737C17.5182 7.36105 17.7662 8.34671 17.7545 9.34667C17.7605 10.0978 17.6192 10.8428 17.3387 11.5389C17.0704 12.2054 16.6816 12.816 16.1919 13.3395C15.7112 13.8545 15.1346 14.2691 14.4949 14.5598C13.8423 14.8549 13.1342 15.0051 12.4188 15ZM12.4188 12.765C12.9843 12.7723 13.5388 12.6074 14.0095 12.2917C14.4798 11.9753 14.8633 11.5445 15.1244 11.0393C15.3956 10.5123 15.5362 9.92717 15.5344 9.33366C15.5325 8.74016 15.3882 8.15591 15.1137 7.6307C14.8482 7.12516 14.4613 6.69461 13.9882 6.3783C13.5179 6.07272 12.9699 5.91068 12.4102 5.91172C11.8505 5.91276 11.3031 6.07682 10.8339 6.38414C10.3601 6.70025 9.97435 7.13302 9.71322 7.64141C9.43906 8.16714 9.2979 8.75286 9.30225 9.34667C9.29424 9.95098 9.44147 10.5471 9.72966 11.0772C9.99945 11.5774 10.3903 12.0008 10.8658 12.3082C11.3285 12.6091 11.8681 12.7678 12.4188 12.765ZM25.8839 6.28578C25.5854 6.09903 25.2643 5.95174 24.9285 5.84754C24.6982 5.77914 24.4589 5.7463 24.2187 5.75015C23.7013 5.73917 23.1936 5.89324 22.7683 6.19034C22.3465 6.49492 22.0128 6.907 21.8013 7.38431C21.5656 7.907 21.447 8.47559 21.4542 9.04963V14.6212H19.2243V3.87545H21.4435V5.32652C21.7956 4.80626 22.258 4.37119 22.7973 4.05269C23.3367 3.73847 23.9505 3.57695 24.5736 3.58523C24.8154 3.58523 25.0455 3.59594 25.2621 3.61737C25.4743 3.63781 25.6837 3.68091 25.8868 3.74592L25.8839 6.28578ZM42.3146 14.8276C41.7533 14.7921 41.1998 14.6764 40.6708 14.4838C40.1612 14.3038 39.6862 14.0366 39.2667 13.694C38.8786 13.3784 38.5698 12.975 38.3655 12.5166L40.255 11.6995C40.3722 11.9232 40.5373 12.1178 40.7385 12.2693C40.9849 12.4644 41.2608 12.6186 41.5555 12.726C41.8693 12.8447 42.2019 12.9048 42.537 12.9033C42.8541 12.9062 43.1695 12.8575 43.4711 12.7591C43.7416 12.6733 43.9858 12.5194 44.1809 12.3121C44.3635 12.1181 44.4631 11.8597 44.4584 11.5924C44.4656 11.4535 44.441 11.3149 44.3863 11.1872C44.3316 11.0595 44.2484 10.9462 44.1432 10.8562C43.9117 10.6695 43.6448 10.5323 43.3589 10.453C43.0457 10.3556 42.7324 10.2699 42.42 10.1842C41.7596 10.0394 41.1171 9.82121 40.5045 9.53365C39.968 9.29172 39.4947 8.92767 39.1217 8.47018C38.78 8.03648 38.6095 7.50442 38.6102 6.874C38.5962 6.23276 38.79 5.60439 39.1623 5.08402C39.5363 4.571 40.0393 4.16761 40.6195 3.91537C41.2278 3.64167 41.8872 3.5022 42.5535 3.50635C43.3683 3.49738 44.1735 3.6854 44.9013 4.05464C45.577 4.38978 46.1427 4.91383 46.5306 5.56414L44.7707 6.61592C44.6543 6.38766 44.4892 6.18814 44.2872 6.0316C44.0683 5.85655 43.8236 5.71691 43.562 5.6177C43.292 5.51402 43.0074 5.45419 42.7188 5.44046C42.3787 5.42316 42.0382 5.465 41.7122 5.56414C41.4281 5.64502 41.1715 5.80303 40.9705 6.02089C40.7807 6.2408 40.6815 6.5254 40.693 6.81654C40.693 7.13078 40.8032 7.36548 41.0237 7.52065C41.2801 7.69075 41.5632 7.81588 41.8611 7.89072C42.1996 7.98422 42.5464 8.0881 42.9016 8.20236C43.5161 8.3951 44.1127 8.64145 44.6847 8.93861C45.2014 9.19829 45.6591 9.56306 46.0288 10.0099C46.3754 10.4476 46.5502 10.9983 46.52 11.5574C46.5302 12.2013 46.3168 12.8285 45.9166 13.3308C45.5042 13.8478 44.9654 14.2478 44.353 14.4916C43.7078 14.7584 43.0106 14.8733 42.3146 14.8276ZM37.4498 9.30381C37.5184 12.2508 35.0643 15.0497 32.0705 14.9951C28.9965 15.0536 26.5143 12.0803 26.7126 9.06522C26.7465 7.93782 27.1101 6.84559 27.7579 5.92545C27.7859 5.8787 27.8062 5.87675 27.8468 5.91571C28.3517 6.4168 28.941 6.8234 29.5874 7.1165C29.6357 7.13695 29.6396 7.15156 29.6096 7.19246C29.1276 7.87096 28.8958 8.69755 28.954 9.52975C28.9791 11.6966 31.3714 13.4963 33.3827 12.4358C35.22 11.5204 35.7711 8.9094 34.5934 7.25673C34.4802 7.14279 34.5025 7.11357 34.6465 7.07072C35.073 6.86811 35.4733 6.61401 35.8388 6.31402C36.0044 6.18281 36.162 6.04167 36.3107 5.89136C36.3484 5.85143 36.3668 5.86117 36.3939 5.90013C37.0941 6.89383 37.4637 8.08539 37.4498 9.30381Z"
      fill="#9999AC"
    />
    <path
      d="M27.8304 0.499995H28.8631C28.9598 0.499995 28.9463 0.488308 28.9482 0.588617C28.8911 3.07686 31.7804 4.98663 33.8517 3.34468C34.2734 3.01612 34.6147 2.59455 34.8494 2.11239C35.0841 1.63022 35.2059 1.10028 35.2055 0.563296C35.2055 0.515577 35.2151 0.498047 35.2673 0.498047H37.3889C37.4363 0.498047 37.4469 0.512655 37.4469 0.558427C37.4875 4.55131 33.2473 7.57616 29.6328 5.58264C27.8381 4.60974 26.7019 2.61817 26.7077 0.567192C26.7077 0.515577 26.7193 0.499995 26.7725 0.499995H27.8304Z"
      fill="#9999AC"
    />
  </svg>
);

const LinkOffIcon = ({ ...props }: IconProps) => (
  <Icon width="14px" height="14px" viewBox="0 0 14 14" fill="none" {...props}>
    <g clipPath="url(#clip0_13614_19286)">
      <path
        d="M9.07955 4.47121L4.65447 4.47121L4.65447 3.30472L11.071 3.30472L11.071 9.72124L9.90451 9.72124L9.90451 5.29617L4.11719 11.325L3.29224 10.5L9.07955 4.47121Z"
        fill="currentColor"
      />
    </g>
    <defs>
      <clipPath id="clip0_13614_19286">
        <rect width="14" height="14" fill="white" />
      </clipPath>
    </defs>
  </Icon>
);

const OpSuperfestIcon = ({ ...props }: IconProps) => (
  <Icon width="20px" height="20px" viewBox="0 0 20 20" fill="none" {...props}>
    <g clipPath="url(#clip0_16561_34101)">
      <path
        d="M8.23338 3.38925L9.4785 1.79248L10.9154 3.20745L12.6791 2.20823L13.4609 4.06847L15.4693 3.81802L15.4799 5.8408L17.4289 6.37567L16.6633 8.25274L18.2587 9.493L16.8364 10.9372L17.8319 12.6943L15.9681 13.4884L16.2149 15.493L14.1913 15.5154L13.6497 17.4641L11.7783 16.708L10.5332 18.3046L9.09627 16.8897L7.33684 17.8879L6.55078 16.0287L4.54655 16.2781L4.53604 14.2552L2.58704 13.7203L3.3483 11.8445L1.75732 10.603L3.17956 9.15879L2.184 7.40172L4.04354 6.60879L3.80095 4.60308L5.82036 4.58182L6.36202 2.63314L8.23338 3.38925Z"
        fill="#FF0420"
      />
      <path
        d="M8.58532 4.63462L9.5961 3.33838L10.7626 4.48704L12.1943 3.67588L12.829 5.18603L14.4595 4.9827L14.468 6.62481L16.0503 7.05901L15.4288 8.58281L16.7237 9.58965L15.5692 10.7621L16.3775 12.1885L14.8644 12.8331L15.0648 14.4605L13.422 14.4786L12.9823 16.0606L11.4631 15.4468L10.4523 16.743L9.28581 15.5943L7.85752 16.4046L7.21938 14.8954L5.59236 15.0978L5.58382 13.4556L4.00162 13.0214L4.61961 11.4986L3.32806 10.4908L4.48262 9.31835L3.67444 7.89195L5.18401 7.24826L4.98706 5.62002L6.62642 5.60277L7.06614 4.02082L8.58532 4.63462Z"
        fill="#FFF2AF"
      />
      <path
        d="M8.93823 5.90234L9.70733 4.91602L10.5949 5.79004L11.6843 5.17282L12.1673 6.32189L13.4079 6.16718L13.4144 7.41666L14.6183 7.74705L14.1455 8.9065L15.1308 9.67262L14.2523 10.5647L14.8672 11.6501L13.716 12.1406L13.8685 13.3788L12.6185 13.3926L12.2839 14.5963L11.1279 14.1292L10.3588 15.1157L9.47124 14.2416L8.38444 14.8581L7.89889 13.7097L6.66088 13.8637L6.6544 12.6142L5.45051 12.2839L5.92072 11.1251L4.93799 10.3583L5.81649 9.46618L5.20155 8.38083L6.35017 7.89104L6.20032 6.65212L7.44772 6.639L7.78229 5.43529L8.93823 5.90234Z"
        fill="#69D7FF"
      />
    </g>
    <defs>
      <clipPath id="clip0_16561_34101">
        <rect width="20" height="20" fill="white" />
      </clipPath>
    </defs>
  </Icon>
);
