import data from './Manufac _ India Agro Dataset.json';

interface CropData {
  Country: string;
  Year: string;
  "Crop Name": string;
  "Crop Production (UOM:t(Tonnes))": string | number;
  "Yield Of Crops (UOM:Kg/Ha(KilogramperHectare))": string | number;
  "Area Under Cultivation (UOM:Ha(Hectares))": string | number;
}

interface AggregatedData {
  year: number;
  maxProductionCrop: string;
  minProductionCrops: string[];
}

interface CropAverageData {
  crop: string;
  averageYield: number;
  averageCultivationArea: number;
}

// Convert missing values to 0 and parse numbers
const processedData: CropData[] = data.map(item => ({
  ...item,
  "Crop Production (UOM:t(Tonnes))": parseFloat(item["Crop Production (UOM:t(Tonnes))"] as string || '0'),
  "Yield Of Crops (UOM:Kg/Ha(KilogramperHectare))": parseFloat(item["Yield Of Crops (UOM:Kg/Ha(KilogramperHectare))"] as string || '0'),
  "Area Under Cultivation (UOM:Ha(Hectares))": parseFloat(item["Area Under Cultivation (UOM:Ha(Hectares))"] as string || '0'),
}));

// Aggregate data for max and min production crops per year
const aggregateYearlyData = (): AggregatedData[] => {
  const yearlyData: { [key: number]: CropData[] } = {};
  processedData.forEach(item => {
    const year = parseInt(item.Year.split(',')[1].trim());
    if (!yearlyData[year]) yearlyData[year] = [];
    yearlyData[year].push(item);
  });

  return Object.entries(yearlyData).map(([year, crops]) => {
    const maxProductionCrop = crops.reduce((max, crop) => Number(crop["Crop Production (UOM:t(Tonnes))"]) > Number(max["Crop Production (UOM:t(Tonnes))"]) ? crop : max);
    const minProductionValue = Math.min(...crops.map(crop => Number(crop["Crop Production (UOM:t(Tonnes))"])));
    const minProductionCrops = crops.filter(crop => Number(crop["Crop Production (UOM:t(Tonnes))"]) === minProductionValue).map(crop => crop["Crop Name"]);
    return {
      year: parseInt(year),
      maxProductionCrop: maxProductionCrop["Crop Name"],
      minProductionCrops: minProductionCrops,
    };
  });
};

// Aggregate data for average yield and cultivation area per crop
const aggregateCropData = (): CropAverageData[] => {
  const cropData: { [key: string]: { totalYield: number, totalArea: number, count: number } } = {};
  processedData.forEach(item => {
    const cropName = item["Crop Name"];
    if (!cropData[cropName]) cropData[cropName] = { totalYield: 0, totalArea: 0, count: 0 };
    cropData[cropName].totalYield += Number(item["Yield Of Crops (UOM:Kg/Ha(KilogramperHectare))"]);
    cropData[cropName].totalArea += Number(item["Area Under Cultivation (UOM:Ha(Hectares))"]);
    cropData[cropName].count += 1;
  });

  return Object.entries(cropData).map(([crop, { totalYield, totalArea, count }]) => ({
    crop,
    averageYield: parseFloat((totalYield / count).toFixed(3)),
    averageCultivationArea: parseFloat((totalArea / count).toFixed(3)),
  }));
};

export { aggregateYearlyData, aggregateCropData };
export type { AggregatedData, CropAverageData };
