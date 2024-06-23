import React from 'react';
import { Table, Card, Title } from '@mantine/core';
import { CropAverageData } from '../dataProcessing';

interface Props {
  data: CropAverageData[];
}

const CropAverageTable: React.FC<Props> = ({ data }) => {
  const rows = data.map((row) => (
    <Table.Tr key={row.crop}>
      <Table.Td>{row.crop}</Table.Td>
      <Table.Td>{row.averageYield}</Table.Td>
      <Table.Td>{row.averageCultivationArea}</Table.Td>
    </Table.Tr>
  ));

  return (
    <Card shadow="sm" padding="lg" radius="md" withBorder>
      <Title order={3} style={{ textAlign: 'center', marginBottom: '1rem' }}>
        Crop Averages (1950-2020)
      </Title>
      <Table striped highlightOnHover withTableBorder withColumnBorders>
        <Table.Thead>
          <Table.Tr>
            <Table.Th>Crop</Table.Th>
            <Table.Th>Average Yield (Kg/Ha)</Table.Th>
            <Table.Th>Average Cultivation Area (Ha)</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>{rows}</Table.Tbody>
      </Table>
    </Card>
  );
};

export default CropAverageTable;
