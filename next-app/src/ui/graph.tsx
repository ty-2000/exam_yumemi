'use client';
import React from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { PrefectureWithPopulationState } from '@/lib/definitions';
import { genColor } from '@/lib/color';
import { Box } from '@chakra-ui/react';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

export default function Graph({
  prefPopuState,
}: {
  prefPopuState: PrefectureWithPopulationState[];
}) {
  const selectedPrefDetails = prefPopuState.filter((_) => _.isSelected);
  const labels = selectedPrefDetails.find((_) => true)?.populationArr.map((_) => _.label);
  const selectedLabel = labels?.find((_) => _ === '総人口');
  const graphDatasets = selectedPrefDetails.map((_) => ({
    prefName: _.prefName,
    color: genColor(_.prefCode),
    data: _.populationArr.find((_) => _.label === selectedLabel)?.data,
  }));

  const chartData = {
    labels: graphDatasets.find((_) => true)?.data?.map((_) => _.year),
    datasets: graphDatasets.map((gd) => {
      return {
        label: gd.prefName,
        data: gd.data?.map((e) => e.value),
        borderColor: gd.color,
        backgroundColor: gd.color,
      };
    }),
  };

  const options = {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };
  return (
    <Box padding={10} display='flex' justifyContent='center' alignItems='center'>
      <Line data={chartData} options={options} />
    </Box>
  );
}
