import React from 'react';
import Chart from 'react-google-charts';
import './styles.css';

export default function PieChart({ dataCategories }) {
  const pieOptions = {
    pieHole: 0.5,
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
      top: 12,
      width: '100%',
      height: '90%',
    },
    width: '100%',
  };

  const pieData = [['Category', 'Value'], ...dataCategories];
  return (
    <div id="pie-chart" className="center">
      <span className="font-large">Despesas por categoria</span>
      <Chart chartType="PieChart" data={pieData} options={pieOptions} />
    </div>
  );
}
