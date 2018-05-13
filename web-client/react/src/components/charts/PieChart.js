// @flow
import React from 'react';
import { Pie } from 'react-chartjs-2';

type Props = {
    labels: Array<string>,
    data: Array<number>
};

let options = {
    legend: {
        display: true,
        position: 'bottom',
        labels: {
            fontColor: '#fff'
        }
    },
    tooltips: {
        // callbacks: {
        //   label: (item, data) => {
        //     let dataset = data.datasets[item.datasetIndex];
        //     let total = dataset.data.reduce((sum, value) => { return sum + value}, 0);
        //     let currentValue = dataset.data[item.index];
        //     let precentage = Math.floor(((currentValue/total) * 100)+0.5);
        //     return precentage + "%";
        //   }
        // } 
    }           
};

let height = 250;

const colorArray = [
    '#00cc00',
    '#0044cc',
    '#cc0000',
    '#cca300',
    '#00cccc',
    '#52527a',
    '#cc6600',
    '#cc00cc'
];

const PieChart = (props: Props) => {

    let data = {
        labels: props.labels,
        datasets: [{
            data: props.data,
            backgroundColor: colorArray,
            borderColor: colorArray,
            borderWidth: 1
        }]            
    };

    return (
        <Pie 
            data={data} 
            options={options} 
            height={height} />
    );
};

export { PieChart };