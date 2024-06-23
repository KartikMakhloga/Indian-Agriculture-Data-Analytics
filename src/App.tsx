import React from 'react';
import { MantineProvider, Container } from '@mantine/core';
import AggregatedTable from './components/AggregatedTable';
import CropAverageTable from './components/CropAverageTable';
import { aggregateYearlyData, aggregateCropData } from './dataProcessing';
import '@mantine/core/styles.css';

const App: React.FC = () => {
  const yearlyData = aggregateYearlyData();
  const cropData = aggregateCropData();

  return (
    <MantineProvider>
      <Container size="lg" style={{ padding: '2rem' }}>
        <div>
          <h1 style={{ textAlign: 'center', marginBottom: '2rem' }}>Indian Agriculture Data Analytics</h1>
          <AggregatedTable data={yearlyData} />
          <br />
          <CropAverageTable data={cropData} />
        </div>
      </Container>
    </MantineProvider>
  );
};

export default App;
