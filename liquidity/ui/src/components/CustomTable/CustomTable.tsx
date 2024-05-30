import { Skeleton, Table, TableContainer, Tbody, Td, Text, Thead, Tr } from '@chakra-ui/react';
import { Fragment, ReactNode } from 'react';

interface TableProps {
  headerColumns: ReactNode[];
  rows: ReactNode[];
  loadingState: { isLoading: boolean; headerLength: number; numberOfRows: number };
}

export function CustomTable({ headerColumns, rows, loadingState }: TableProps) {
  const loadingHeader = Array(loadingState.headerLength).fill(1, 0);
  const loadingRows = Array(loadingState.numberOfRows).fill(1, 0);

  return (
    <TableContainer>
      <Table
        variant="simple"
        bg="navy.700"
        border="1px solid"
        borderColor="gray.900"
        rounded="base"
      >
        <Thead>
          {loadingState.isLoading ? (
            <Tr borderBottomWidth="none">
              {loadingHeader.map((placeholder, index) => (
                <Td border="none" key={placeholder.toString().concat(index.toString())}>
                  <Skeleton height="1rem" mb={1} width="70%">
                    <Text color="white" fontWeight={700} lineHeight="1.25rem" fontFamily="heading">
                      sUSDC
                    </Text>
                  </Skeleton>
                </Td>
              ))}
            </Tr>
          ) : (
            headerColumns.map((column, index) => (
              <Fragment key={index.toString().concat('table-header')}>{column}</Fragment>
            ))
          )}
        </Thead>
        <Tbody>
          <Tr border="none" borderTop="1px" borderTopColor="gray.900" width="100%" height="0px">
            {headerColumns.map((_, index) => (
              <Td
                key={Math.random().toFixed(5).concat(index.toString())}
                height="0px"
                border="none"
                px={0}
                pt={0}
                pb={4}
              />
            ))}
          </Tr>
          {loadingState.isLoading
            ? loadingRows.map((row, index) => (
                <Tr key={row.toString().concat(index.toString())}>
                  {loadingHeader.map((placeholder, index) => (
                    <Td border="none" key={placeholder.toString().concat(index.toString())}>
                      <Skeleton height="1rem" mb={1} width="70%">
                        <Text
                          color="white"
                          fontWeight={700}
                          lineHeight="1.25rem"
                          fontFamily="heading"
                        >
                          sUSDC
                        </Text>
                      </Skeleton>
                    </Td>
                  ))}
                </Tr>
              ))
            : rows.map((row, index) => (
                <Fragment key={index.toString().concat('table-row')}>{row}</Fragment>
              ))}
        </Tbody>
      </Table>
    </TableContainer>
  );
}
