// @flow
import React from 'react';
import { Line } from 'react-chartjs-2';

type Props = {
    labels: Array<string>,
    datasets: Array<{
        data: Array<number>,
        label: string,
        borderColor: string
    }>
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
        display: true,
        position: 'bottom',
        labels: {
            fontColor: '#fff'
        }
    }
};

const height = 150;

const LineChart = (props: Props) => {
    let chartData = {
        labels: props.labels,
        datasets: props.datasets.map(x => ({
            ...x,
            fill: false
        }))
    };

    return (
        <Line
            data={chartData} 
            options={options} 
            height={height} />
    );
}

export { LineChart };