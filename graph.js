let chart;

export function createGraph(result){
    const data={
        labels:[
            result.forecast.forecastday[0].date,
            result.forecast.forecastday[1].date,
            result.forecast.forecastday[2].date
        ],
        datasets:[
            {
                label:"Min",
                data:[
                    result.forecast.forecastday[0].day.mintemp_c,
                    result.forecast.forecastday[1].day.mintemp_c,
                    result.forecast.forecastday[2].day.mintemp_c
                ],
                borderColor:"rgb(50,96,216)",
                backgroundColor:"rgb(50,96,216)",   
                pointBackgroundColor:'white',
                pointBorderColor:'white',
                pointRadius:window.innerWidth <= 600 ? 2 : 5,
                borderWidth: window.innerWidth <= 600 ? 3 : 5,
                tension: window.innerWidth <= 600 ? 0.25 : 0.4,
                datalabels:{
                    color:"white",
                    align:"bottom",
                    offset:8,
                    formatter:(value)=> value + "°",
                    font:{
                        size:18,
                        weight:"bold"
                    }
                }
            },
            {
                label:"Max",
                data:[
                    result.forecast.forecastday[0].day.maxtemp_c,
                    result.forecast.forecastday[1].day.maxtemp_c,
                    result.forecast.forecastday[2].day.maxtemp_c
                ],
                borderColor:"rgb(249,195,3)",
                backgroundColor:"rgb(249,195,3)",
                pointBackgroundColor:'white',
                pointBorderColor:'white',
                pointRadius:window.innerWidth <= 600 ? 2 : 5,
                borderWidth: window.innerWidth <= 600 ? 3 : 5,
                tension: window.innerWidth <= 600 ? 0.25 : 0.4,
                datalabels:{
                color:"white",
                align:"top",
                offset:8,
                formatter:(value)=> value + "°",
                font:{
                    size:18,
                    weight:"bold"
                }
            }
            }
        ]
    };
    if(chart){
        chart.destroy();
    }
    
    let canvas=document.getElementById("forecastCanvas")
    Chart.register(ChartDataLabels);
    Chart.defaults.color = "rgba(255,255,255,0.8)";
    Chart.defaults.font.size = 16;
    chart =new Chart(canvas,{
        type:"line",
        data:data,
        options:{
            responsive:true,
            maintainAspectRatio:false,
            plugins:{
                legend:{
                    display:false,
                    labels:{
                        color:"white",
                        boxWidth:15
                    }
                }
            },
            scales:{
                x:{
                    grid:{
                        display:false
                    },
                    ticks:{
                        padding:30,
                        color:"rgba(255,255,255,0.7)",
                        maxRotation:0,
                        minRotation:0,
                    }
                },
                y:{
                    display:false,
                    grid:{
                        display:false
                    }
                }
            },
            elements:{
                point:{
                    hoverRadius:6
                }
            },
            layout:{
                padding:{
                    bottom:25,
                    top:20
                }
}
        }
    } );
}

