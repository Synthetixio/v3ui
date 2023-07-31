import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Heading,
  Image,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react';
import { Council } from '../../utils/councils';
import { Badge } from '../Badge';

export function PassedElectionAccordion({ activeCouncil }: { activeCouncil: Council }) {
  return (
    <Accordion allowMultiple allowToggle>
      <AccordionItem mb="6">
        <h2>
          <AccordionButton height="76px">
            <Heading as="h3" fontSize="18px" lineHeight="28px" fontWeight="700" mr="3">
              Q1 2023
            </Heading>
            <Text color="white" bg="purple.700" px="2" borderRadius="base" mr="auto">
              01/02/2023 - 06/06/2023
            </Text>
            <AccordionIcon />
          </AccordionButton>
        </h2>
        <AccordionPanel mb={4} p="0">
          <Table>
            <Thead borderWidth="1px" borderStyle="solid" borderColor="gray.900">
              <Tr>
                <Th>Name</Th>
                <Th>Role</Th>
                <Th>Votes Received</Th>
                <Th>Voting Power (in %)</Th>
              </Tr>
            </Thead>
            <Tbody>
              <Tr>
                <Td display="flex" alignItems="center" maxW="350px">
                  <Image w="30px" h="30px" src="/img.png" mr="3" borderRadius="full" />
                  <Text
                    fontSize="14px"
                    lineHeight="20px"
                    fontWeight={700}
                    textOverflow="ellipsis"
                    overflow="hidden"
                    whiteSpace="nowrap"
                  >
                    {activeCouncil.address}
                  </Text>
                </Td>
                <Td>
                  <Badge colorScheme="cyan">Spartan Council</Badge>
                </Td>
                <Td>
                  <Text fontSize="14px" fontWeight={500}>
                    20
                  </Text>
                </Td>
                <Td>
                  <Text fontSize="14px" fontWeight={500}>
                    16.04%
                  </Text>
                  <Text size="xs" color="gray.500">
                    3,45345,3242,22
                  </Text>
                </Td>
              </Tr>
            </Tbody>
          </Table>
        </AccordionPanel>
      </AccordionItem>
    </Accordion>
  );
}
