import React, { Component } from 'react';
import CanvasJSReact from './canvasjs.react';
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

class MonthlyGrowChart extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dataPoints: [],
        }
    }

    setDataPoints = (dataPts) => {
        const dataPoints = [];
        var i;
        for (i = 0; i < dataPts.length; i++) {
            dataPoints.push({
                label: dataPts[i]["month"],
                y: dataPts[i]["score"]
            });
        }
        this.setState({dataPoints})
    };

    render() {
        const options = {
            animationEnabled: true,
            exportEnabled: true,
            theme: "light2", // "light1", "dark1", "dark2"
            title:{
                text: ""
            },
            axisY: {
                title: "Score",
                includeZero: false,
            },
            axisX: {
                title: "Month",
                interval: 1
            },
            data: [{
                type: "line",
                toolTipContent: "{label}: {y}",
                dataPoints: this.state.dataPoints
            }]
        };
        return (
            <div>
                <CanvasJSChart options = {options}
                    /* onRef={ref => this.chart = ref} */
                />
                {/*You can get reference to the chart instance as shown above using onRef. This allows you to access all chart properties and methods*/}
            </div>
        );
    }
}

export default MonthlyGrowChart;