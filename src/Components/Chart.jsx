import React from 'react'
import { Line } from 'react-chartjs-2'
import { Chart as ChartJS, 
    LinearScale, 
    CategoryScale, 
    PointElement, 
    LineElement,
    Title, 
    Tooltip, 
    Legend 
} from 'chart.js'
import { Box } from '@chakra-ui/react';

ChartJS.register({
    LinearScale, 
    CategoryScale, 
    PointElement,   
    LineElement,
    Title, 
    Tooltip, 
    Legend
})

const Chart = (props) => {
    const dates = [];
    const prices = [];

    const { currency, days, arr } = props;


    for(let i = 0; i < arr.length; i++) {
        if(days === "24h") dates.push(new Date(arr[i][0]).toLocaleTimeString());
        else dates.push(new Date(arr[i][0]).toLocaleDateString());
        prices.push(arr[i][1]);
    }

    return (
        <>
            <Line
                options={{
                    responsive: true,
                    plugins: {
                        legend: {
                            position: 'top',
                        },
                        title: {
                            display: true,
                            text: 'Prices Over Time',
                        },
                    },
                    elements: {
                        point: {
                            radius: 0, // Hides the circles
                            hoverRadius: 0 // Hides the hover circles
                        }
                    }
                }}
                data={{
                    labels: dates,
                    datasets: [
                        {
                            label: `Prices in ${currency}`,
                            data: prices,
                            borderColor: 'red',
                            borderWidth: 0.6,
                            fill: true,
                        },
                    ],
                }}
            />
        </>
    );
};

export default Chart;
