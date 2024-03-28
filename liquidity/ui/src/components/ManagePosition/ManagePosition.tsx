import {
  Alert,
  Button,
  Flex,
  Input,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
} from '@chakra-ui/react';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import { TokenIcon } from '../TokenIcon';
import Wei from '@synthetixio/wei';
import { useParams } from '@snx-v3/useParams';
import { ReactNode } from 'react';
import { useBorrow } from '@snx-v3/useBorrow';
import { useRecoilState } from 'recoil';
import { amountState } from '../../state/amount';
import { InfoIcon } from '@chakra-ui/icons';
import { CheckIcon } from '@snx-v3/Multistep';

const ACTIONS = [
  {
    title: 'Borrow',
    link: 'borrow',
    icon: (fill: 'white' | 'cyan') => (
      <svg
        width="29"
        height="28"
        viewBox="0 0 29 28"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M7.46494 0.875C6.39702 0.875 5.53131 1.74071 5.53131 2.80862V6.87505H2.92044C1.85253 6.87505 0.986816 7.74076 0.986816 8.80867V13.1914C0.986816 14.2593 1.85253 15.125 2.92044 15.125H6.01645V18.8764C4.98274 18.9152 4.15662 19.7654 4.15662 20.8086V25.1914C4.15662 26.2593 5.02234 27.125 6.09025 27.125H24.2196C25.2875 27.125 26.1532 26.2593 26.1532 25.1914V21.1236C27.187 21.0848 28.0131 20.2346 28.0131 19.1914V14.8086C28.0131 13.7407 27.1474 12.875 26.0794 12.875H22.9834V9.125H25.5943C26.6622 9.125 27.5279 8.25928 27.5279 7.19137V2.80862C27.5279 1.74071 26.6622 0.875 25.5943 0.875H7.46494ZM7.78131 6.875V3.125H25.2779V6.875H7.78131ZM3.23682 9.12505V12.875H7.93705L7.95007 12.875H20.7334V9.12505H3.23682ZM8.26645 18.875V15.125H21.0498L21.0628 15.125H25.7631V18.875H8.26645ZM6.40662 24.875V21.125H23.9032V24.875H6.40662Z"
          fill={fill === 'cyan' ? '#00D1FF' : 'white'}
        />
      </svg>
    ),
  },
  {
    title: 'Claim Proft',
    link: 'claim',
    icon: (fill: 'white' | 'cyan') => (
      <svg
        width="30"
        height="30"
        viewBox="0 0 30 30"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M15.0903 2.50714C8.39782 2.50714 2.97247 7.93249 2.97247 14.625C2.97247 21.3175 8.39782 26.7429 15.0903 26.7429C21.7828 26.7429 27.2082 21.3175 27.2082 14.625C27.2082 7.93249 21.7828 2.50714 15.0903 2.50714ZM0.465332 14.625C0.465332 6.54783 7.01317 0 15.0903 0C23.1675 0 29.7153 6.54783 29.7153 14.625C29.7153 22.7022 23.1675 29.25 15.0903 29.25C7.01317 29.25 0.465332 22.7022 0.465332 14.625Z"
          fill={fill === 'cyan' ? '#00D1FF' : 'white'}
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M13.5792 11.9742C13.589 11.5066 13.7225 11.3161 13.8124 11.2254C13.931 11.1058 14.1602 10.9772 14.5845 10.9097C15.4687 10.769 16.6646 10.9739 17.6515 11.2338L18.8638 11.553L19.5023 9.12856L18.29 8.8093C17.2491 8.53515 15.6222 8.20591 14.1905 8.43372C13.4569 8.55046 12.6548 8.83183 12.0317 9.46053C11.3834 10.1147 11.0715 10.9997 11.0715 12.0296V12.0771L11.0751 12.1244C11.1655 13.316 11.8745 14.108 12.6098 14.6288C13.284 15.1062 14.1197 15.4539 14.7947 15.7348C14.8202 15.7454 14.8454 15.7559 14.8704 15.7664C15.6329 16.084 16.1988 16.3286 16.591 16.6158C16.9362 16.8687 16.9707 17.0216 16.9707 17.1567C16.9707 17.6803 16.8165 17.8884 16.6957 17.9976C16.5342 18.1438 16.2307 18.2862 15.7131 18.3507C14.6587 18.482 13.289 18.2239 12.2807 17.9538L11.0698 17.6296L10.4212 20.0513L11.6321 20.3756C12.6977 20.661 14.462 21.0331 16.023 20.8386C16.8131 20.7402 17.6878 20.4808 18.3774 19.8572C19.1078 19.1967 19.4778 18.2672 19.4778 17.1567C19.4778 15.9459 18.8008 15.1267 18.0724 14.5932C17.4094 14.1076 16.5679 13.7573 15.8907 13.4754C15.8718 13.4675 15.8531 13.4597 15.8345 13.452C15.0731 13.1348 14.4848 12.8844 14.0588 12.5828C13.6976 12.3269 13.602 12.1399 13.5792 11.9742Z"
          fill={fill === 'cyan' ? '#00D1FF' : 'white'}
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M15.0903 19.0125C15.7827 19.0125 16.3439 19.5737 16.3439 20.2661V23.4H13.8368V20.2661C13.8368 19.5737 14.398 19.0125 15.0903 19.0125Z"
          fill={fill === 'cyan' ? '#00D1FF' : 'white'}
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M16.3439 5.85V8.98393C16.3439 9.67626 15.7827 10.2375 15.0903 10.2375C14.398 10.2375 13.8368 9.67626 13.8368 8.98393V5.85H16.3439Z"
          fill={fill === 'cyan' ? '#00D1FF' : 'white'}
        />
      </svg>
    ),
  },
  {
    title: 'Repay',
    link: 'repay',
    icon: (fill: 'white' | 'cyan') => (
      <svg
        width="25"
        height="30"
        viewBox="0 0 25 30"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M11.9463 16.9468C11.9371 16.9568 11.863 17.0366 11.8554 17.3212C11.8648 17.3758 11.9002 17.4529 12.0696 17.5823C12.312 17.7675 12.657 17.928 13.1614 18.1546L13.2086 18.1758C13.6422 18.3704 14.223 18.6311 14.6861 18.997C15.2145 19.4144 15.6947 20.0514 15.6947 20.9695C15.6947 21.7802 15.445 22.494 14.9076 23.0182C14.594 23.3242 14.2295 23.519 13.8648 23.6413V24.2407C13.8648 24.862 13.3611 25.3657 12.7398 25.3657C12.1185 25.3657 11.6148 24.862 11.6148 24.2407V23.7711C11.0554 23.6949 10.5461 23.5668 10.1775 23.4603C9.58059 23.2879 9.23649 22.6642 9.40893 22.0673C9.58137 21.4704 10.2051 21.1263 10.802 21.2987C11.4507 21.4861 12.28 21.6479 12.8862 21.5664C13.1746 21.5277 13.2943 21.4487 13.3365 21.4076C13.3548 21.3898 13.4447 21.3023 13.4447 20.9695L13.4449 20.9629C13.4463 20.935 13.4485 20.8867 13.2913 20.7624C13.0725 20.5896 12.7445 20.434 12.2393 20.207L12.1813 20.181C11.7482 19.9867 11.1727 19.7285 10.7038 19.3702C10.1747 18.9661 9.67105 18.3522 9.6075 17.4484L9.60473 17.409V17.3695C9.60473 16.6186 9.81462 15.9414 10.2899 15.4241C10.6765 15.0033 11.1571 14.7777 11.6148 14.6617V14.4907C11.6148 13.8694 12.1185 13.3657 12.7398 13.3657C13.3611 13.3657 13.8648 13.8694 13.8648 14.4907V14.6746C14.185 14.7357 14.4751 14.81 14.7122 14.8774C15.3098 15.0472 15.6567 15.6693 15.4869 16.267C15.3171 16.8646 14.695 17.2115 14.0973 17.0417C13.462 16.8612 12.7516 16.7388 12.2625 16.8227C12.0406 16.8608 11.9663 16.9251 11.9463 16.9468Z"
          fill={fill === 'cyan' ? '#00D1FF' : 'white'}
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M7.07654 0.705161C6.75677 0.70214 6.44155 0.78162 6.16136 0.936004C5.87813 1.09206 5.64049 1.31926 5.47187 1.59518C5.30325 1.8711 5.20948 2.18622 5.19981 2.50945C5.19014 2.83267 5.2649 3.15284 5.41672 3.43835L5.48953 3.57526L7.43875 5.61515C7.36642 5.67057 7.29723 5.73071 7.23167 5.79536C6.81902 6.20228 6.58316 6.7553 6.57511 7.33477L6.57483 7.35487L6.57527 7.37496C6.57946 7.56688 6.60834 7.75674 6.66068 7.94001C5.01621 9.23912 3.64911 10.8604 2.64552 12.7084C1.47605 14.8618 0.833458 17.2617 0.770392 19.7113L0.77002 19.7258V19.7402C0.77002 23.0186 2.1089 25.4731 4.3285 27.0682C6.49716 28.6266 9.40436 29.2952 12.485 29.2952C15.5657 29.2952 18.4794 28.6267 20.6548 27.0694C22.8814 25.4756 24.23 23.0214 24.23 19.7402V19.7245L24.2296 19.7088C24.1611 17.2549 23.511 14.8523 22.333 12.6986C21.3378 10.8793 19.9899 9.28153 18.3721 7.99658C18.4356 7.78989 18.4688 7.5743 18.47 7.35656L18.47 7.34572L18.4699 7.33488C18.462 6.76067 18.2303 6.2122 17.8243 5.80613C17.7503 5.73217 17.6716 5.664 17.5889 5.60191L19.5386 3.56158L19.6152 3.40534C19.7541 3.12204 19.8192 2.80827 19.8046 2.4931C19.7899 2.17793 19.696 1.87155 19.5315 1.60232C19.367 1.3331 19.1372 1.10975 18.8634 0.952957C18.5896 0.796163 18.2806 0.710995 17.9652 0.705342L7.07654 0.705161ZM8.00906 2.95516L10.1161 5.16016H14.899L17.006 2.95516H8.00906ZM8.72745 9.55528C8.58321 9.55718 8.43997 9.54421 8.29987 9.51703C6.78473 10.6577 5.53001 12.1116 4.62275 13.7822C3.62526 15.6189 3.07611 17.6654 3.02003 19.7546C3.02379 22.3334 4.03911 24.0895 5.64154 25.2411C7.29788 26.4313 9.68568 27.0452 12.485 27.0452C15.2844 27.0452 17.6807 26.4313 19.3452 25.2398C20.9554 24.0872 21.9759 22.3312 21.98 19.7559C21.9191 17.6634 21.3636 15.6151 20.359 13.7784C19.4457 12.1088 18.1849 10.6574 16.6642 9.52074C16.5314 9.54476 16.396 9.55648 16.2597 9.5554L16.2521 9.55533L16.2147 9.55525H15.1164L15.5125 10.3954C15.7774 10.9574 15.5366 11.6278 14.9746 11.8928C14.4126 12.1577 13.7423 11.9169 13.4773 11.3549L12.6289 9.55525H12.3709L11.5225 11.3549C11.2576 11.9169 10.5872 12.1577 10.0252 11.8928C9.46318 11.6278 9.22237 10.9574 9.48731 10.3954L9.88341 9.55525H8.77705L8.76989 9.5554L8.765 9.55525L8.72745 9.55528Z"
          fill={fill === 'cyan' ? '#00D1FF' : 'white'}
        />
      </svg>
    ),
  },
];

function ManageInputUi({
  collateralSymbol,
  collateral,
  price,
  title,
  inputSubline,
  buttonText,
  handleButtonClick,
  children,
}: {
  collateralSymbol: string;
  collateral: Wei;
  price: Wei;
  title: string;
  inputSubline: string;
  buttonText: string;
  handleButtonClick: () => void;
  children?: ReactNode;
}) {
  const [amount, setAmount] = useRecoilState(amountState);
  return (
    <Flex flexDir="column">
      <Text fontSize="14px" fontWeight={700} color="white">
        {title}
      </Text>
      <Flex border="1px solid" borderColor="gray.900" rounded="base" justifyContent="space-between">
        <Flex p="2" flexDir="column" gap="1" w="100%">
          <TokenIcon symbol={collateralSymbol} />
          <Text fontSize="12px" display="flex" color="gray.500">
            {inputSubline}:&nbsp;
            {collateral.toNumber().toFixed(2)}
            <Text
              color="cyan.500"
              fontSize="12px"
              fontWeight={700}
              ml="2"
              cursor="pointer"
              onClick={() => {
                setAmount(collateral);
                const node = document.getElementById('input-deposit') as HTMLInputElement;
                node.value = collateral.toNumber().toFixed(2);
              }}
            >
              Max
            </Text>
          </Text>
        </Flex>
        <Flex p="2" flexDir="column" alignItems="end" justifyContent="end">
          <Input
            id="input-deposit"
            variant="unstyled"
            placeholder="00.00"
            textAlign="end"
            fontSize="24px"
            color="white"
            type="number"
            overflow="scroll"
            fontWeight={700}
            onChange={(e) => {
              setAmount(new Wei(e.target.value ? e.target.value : 0, collateral.p));
            }}
          />
          <Text fontSize="12px" color="gray.500">
            ${amount.mul(price).toNumber().toFixed(2)}
          </Text>
        </Flex>
      </Flex>
      {children}
      <Button onClick={() => handleButtonClick()}>{buttonText}</Button>
    </Flex>
  );
}

function PositionAction({
  tab,
  tabAction,
  price,
  collateralSymbol,
  debt,
  poolId,
  collateralAddress,
  accountId,
}: {
  tab: number;
  tabAction: string | null;
  price: Wei;
  collateralSymbol: string;
  debt: Wei;
  poolId?: string;
  collateralAddress?: string;
  accountId?: string;
}) {
  const [amount] = useRecoilState(amountState);
  const { exec: mintUSD, isLoading } = useBorrow({
    accountId,
    debtChange: amount,
    collateralTypeAddress: collateralAddress,
    poolId,
  });

  const handleButtonClick = async () => {
    await mintUSD();
  };
  if (tab === 1) {
    if (tabAction === 'claim') {
      return (
        <ManageInputUi
          collateralSymbol={collateralSymbol}
          collateral={debt.abs()}
          price={price}
          buttonText="Claim"
          inputSubline="Max Claim"
          title="Claim Profit"
          handleButtonClick={handleButtonClick}
          steps={['signTransaction', 'success']}
        >
          {amount.eq(0) ? (
            <Alert colorScheme="cyan" rounded="base" my="2">
              <Flex rounded="full" mr="2">
                <InfoIcon w="20px" h="20px" color="cyan.500" />
              </Flex>
              As a security precaution, claimed assets can only be withdrawn to your wallet after 24
              hs since your previous account activity.
            </Alert>
          ) : (
            <Alert colorScheme="green" rounded="base" my="2">
              <Flex bg="green.500" p="1" rounded="full" mr="2">
                <CheckIcon w="12px" h="12px" color="green.900" />
              </Flex>
              Positive market performance has credited your position. Claim up to $
              {debt.abs().mul(price).toNumber().toFixed(2)} without accruing debt.
            </Alert>
          )}
        </ManageInputUi>
      );
    }
    return 'uh no';
  }
  return 'uh no';
}

export function ManagePosition({ debt, price }: { debt: Wei; price: Wei }) {
  const [queryParams] = useSearchParams();
  const { collateralSymbol, tab, tabAction, collateralAddress, poolId, accountId } = useParams();
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const tabParsed = tab ? Number(tab) : 0;
  return (
    <Flex
      rounded="base"
      border="1px solid"
      borderColor="gray.900"
      p="6"
      bg="navy.700"
      flexDir="column"
      minW="512px"
    >
      <Tabs isFitted defaultIndex={tabParsed}>
        <TabList>
          <Tab
            color="white"
            fontWeight={700}
            onClick={() => {
              queryParams.set('tab', '0');
              navigate({
                pathname,
                search: queryParams.toString(),
              });
            }}
          >
            Manage Collateral
          </Tab>
          <Tab
            color="white"
            fontWeight={700}
            onClick={() => {
              queryParams.set('tab', '1');
              navigate({
                pathname,
                search: queryParams.toString(),
              });
            }}
          >
            Manage Debt
          </Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <p>implement me</p>
          </TabPanel>
          <TabPanel px="0">
            <Flex flexDir="column">
              <Flex justifyContent="space-between">
                {ACTIONS.map((action) => (
                  <Flex
                    w="135px"
                    h="84px"
                    justifyContent="center"
                    key={action.title.concat('-tab-actions')}
                    border="1px solid"
                    flexDir="column"
                    alignItems="center"
                    borderColor={tabAction === action.link ? 'cyan.500' : 'gray.900'}
                    rounded="base"
                    cursor="pointer"
                    onClick={() => {
                      queryParams.set('tabAction', action.link);
                      navigate({
                        pathname,
                        search: queryParams.toString(),
                      });
                    }}
                  >
                    {action.icon(tabAction === action.link ? 'cyan' : 'white')}
                    <Text
                      fontSize="14px"
                      fontWeight={700}
                      mt="2"
                      color={tabAction === action.link ? 'cyan.500' : 'white'}
                    >
                      {action.title}
                    </Text>
                  </Flex>
                ))}
              </Flex>
            </Flex>
          </TabPanel>
        </TabPanels>
      </Tabs>
      <PositionAction
        tab={tabParsed}
        tabAction={tabAction || 'repay'}
        debt={debt}
        collateralSymbol={collateralSymbol || 'USDC'}
        price={price}
        accountId={accountId}
        collateralAddress={collateralAddress}
        poolId={poolId}
      />
    </Flex>
  );
}
