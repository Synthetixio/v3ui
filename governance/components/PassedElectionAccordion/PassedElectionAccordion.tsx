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
            <Heading as="h3" fontSize="18px" lineHeight="28px" fontWeight="700">
              Q1 2023
            </Heading>
            <Badge bg="purple.700" px="1" ml="3" mr="auto">
              <Text color="white">01askjdhasjkd</Text>
            </Badge>
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
                <Td>
                  <Image w="30px" h="30px" src="/img.png" mr="3" borderRadius="full" />
                  <Text fontSize="14px" lineHeight="20px" fontWeight={700}>
                    Andy
                  </Text>
                </Td>
                <Td>
                  <Badge colorScheme="cyan" h="14px" fontSize="10px">
                    Spartan Council
                  </Badge>
                </Td>
              </Tr>
            </Tbody>
          </Table>
        </AccordionPanel>
      </AccordionItem>
    </Accordion>
  );
}
