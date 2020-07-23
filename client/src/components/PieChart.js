import React from 'react';
import Chart from 'react-google-charts';

export default function PieChart({ dataCategories }) {
  const pieOptions = {
    title: 'teste',
    pieHole: 0.5,
    slices: [
      {
        color: '#2BB673',
      },
      {
        color: '#d91e48',
      },
      {
        color: '#007fad',
      },
      {
        color: '#e9a227',
      },
    ],
    legend: {
      position: 'bottom',
      alignment: 'center',
      textStyle: {
        color: '233238',
        fontSize: 14,
      },
    },
    tooltip: {
      showColorCode: true,
    },
    chartArea: {
      left: 0,
      top: 10,
      width: '100%',
      height: '90%',
    },
  };

  const pieData = [['Category', 'Value'], ...dataCategories];
  return (
    <div id="pie-chart" className="center">
      <span className="font-large">Despesas por categoria</span>

      <Chart
        width={'100%'}
        height={'500px'}
        chartType="PieChart"
        data={pieData}
        options={pieOptions}
        rootProps={{ 'data-testid': '3' }}
      />
    </div>
  );
}
