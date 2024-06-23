import React from 'react';
import { Table, Card, Title } from '@mantine/core';
import { AggregatedData } from '../dataProcessing';

interface Props {
  data: AggregatedData[];
}

const AggregatedTable: React.FC<Props> = ({ data }) => {
  const rows = data.map((row) => (
    <Table.Tr key={row.year}>
      <Table.Td>{row.year}</Table.Td>
      <Table.Td>{row.maxProductionCrop}</Table.Td>
      <Table.Td>{row.minProductionCrops.join(', ')}</Table.Td>
    </Table.Tr>
  ));

  return (
    <Card shadow="sm" padding="lg" radius="md" withBorder>
      <Title order={3} style={{ textAlign: 'center', marginBottom: '1rem' }}>
        Yearly Crop Production
      </Title>
      <Table striped highlightOnHover withTableBorder withColumnBorders>
        <Table.Thead>
          <Table.Tr>
            <Table.Th>Year</Table.Th>
            <Table.Th>Crop with Maximum Production in that Year</Table.Th>
            <Table.Th>Crop with Minimum Production in that Year</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>{rows}</Table.Tbody>
      </Table>
    </Card>
  );
};

export default AggregatedTable;
