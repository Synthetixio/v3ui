import {
  Divider,
  Flex,
  Heading,
  Table,
  TableContainer,
  Tag,
  Tbody,
  Text,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react';
import { CouncilSlugs } from '../../utils/councils';
import { MemberTableView } from '../MemberTableView/MemberTableView';
import { Members } from './Members';

export default function CouncilMembers({ activeCouncil }: { activeCouncil: CouncilSlugs }) {
  return (
    <Flex
      borderWidth="1px"
      borderStyle="solid"
      rounded="base"
      borderColor="gray.900"
      bg="navy.700"
      flexDirection="column"
      mt={6}
    >
      <Flex p={{ base: 4, md: 6 }} justifyContent="space-between">
        <Flex flexDir="column" alignItems="center">
          <Heading fontSize="lg" w="100%">
            Election for Q4 2023 - Q1 2024
          </Heading>
          <Text fontSize="xs" w="100%">
            01 Oct 2023 - 01 April 2024
          </Text>
        </Flex>
        <Flex justifyContent="flex-end">
          <Tag bg="gray.900" color="white" h="fit-content" data-cy="election-closed-tag">
            Closed
          </Tag>
        </Flex>
      </Flex>
      <Divider />
      <TableContainer>
        <Table style={{ borderCollapse: 'separate', borderSpacing: '0 1px' }}>
          <Thead>
            <Tr>
              <Th
                textTransform="none"
                cursor="pointer"
                w="50px"
                userSelect="none"
                px="0"
                textAlign="center"
                data-cy="number-table-header"
              >
                Seat
              </Th>
              <Th
                textTransform="none"
                w="200px"
                cursor="pointer"
                userSelect="none"
                data-cy="name-table-header"
              >
                Name
              </Th>
              <Th userSelect="none" textTransform="none" textAlign="center" px="0"></Th>
            </Tr>
          </Thead>
          <Tbody>
            {Members?.length > 0
              ? Members.filter((member) => member.council === activeCouncil).map((member) => {
                  return (
                    <MemberTableView
                      key={member.address}
                      name={member.name}
                      place={member.seat}
                      address={member.address}
                      image={member.image}
                      activeCouncil={activeCouncil}
                    />
                  );
                })
              : null}
          </Tbody>
        </Table>
      </TableContainer>
    </Flex>
  );
}
