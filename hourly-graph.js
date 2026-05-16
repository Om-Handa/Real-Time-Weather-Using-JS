let chart;

export function hourlyGraph(result){

    const now= new Date().getHours();
    const todayHours= result.forecast.forecastday[0].hour.slice(now);
    const tomHours= result.forecast.forecastday[1].hour.slice(0,now)

    const allHours=[...todayHours,...tomHours];
    const skip = window.innerWidth <= 600 ? 3 : 2;
    const skippedhours=allHours.filter((_,index)=>{
        return index%skip===0;
    })

    const data={
        labels:skippedhours.map(hour=>{
            let time= hour.time.split(" ")[1];
            let hr=parseInt(time.split(":")[0]);
            let AmPm= hr>=12?"PM":"AM";
            hr=hr%12||12;
            return `${hr}${AmPm}`
        }), 

        datasets:[
            {
                label:"Temp",
                data: skippedhours.map(hour =>
                    hour.temp_c
                ),

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
                    offset:20,
                    formatter:(value)=> value + "°",
                    font:{
                        size:18,
                        weight:"bold"
                    }
                }
            }
        ]
    }
        if(chart){
        chart.destroy();
    }
    let canvas=document.getElementById("hourly")
    Chart.register(ChartDataLabels);
    Chart.defaults.color = "rgba(255,255,255,0.8)";
    Chart.defaults.font.size = 16;
    chart =new Chart(canvas,{
        type:"line",
        data:data,
        options:{
            responsive:true,
            maintainAspectRatio:false,
            layout:{
                padding:{
                    top:50,
                    bottom:0
                }
            },
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
                        padding:20,
                        color:"rgba(255,255,255,0.7)",
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
            }
        }
    } );

}