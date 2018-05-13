// @flow
import React from 'react';
import { Bar } from 'react-chartjs-2';

type Props = {
    labels: Array<string>,
    data: Array<number>
};

const options = {
    scales: {
        xAxes: [{
            scaleLabel: {
                display: true,
                fontColor: '#fff'
            },
            ticks: {
                fontColor: '#fff'
            },
            gridLines: {
                color: '#339966'
            }
        }],
        yAxes: [{
            ticks: {
                fontColor: '#fff'
            },
            gridLines: {
                color: '#339966'
            }
        }],         
    },
    legend: {
        display: false
    }
};

let height = 250;

const colorArray = [
    '#00cc00',
    '#2952a3',
    '#7a00cc',
    '#cc0044',
    '#00e6e6',
    '#666699',
    '#33cccc',
    '#804000'
];

const BarChart = (props: Props) => {

    let data = {
        labels: props.labels,
        datasets:[{
            backgroundColor: colorArray,
            borderColor: colorArray,
            data: props.data                  
        }]
    };

    return(
        <Bar
            data={data}
            options={options}
            height={height} />
    )
}

export { BarChart };