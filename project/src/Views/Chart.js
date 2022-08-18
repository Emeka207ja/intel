import React,{useState} from 'react'
// import 'chart.js/auto';
import { Chart as ChartJs,LineElement, CategoryScale, LinearScale,PointElement,Tooltip,Legend,Filler } from 'chart.js'
import { Line } from 'react-chartjs-2';
import "./chart.css"
ChartJs.register(
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  Filler
)
const Chart = (props) => {
   const [label,setLabel] = useState()
    // const opts = {
    //     tooltips: {
    //         intersect: false,
    //         mode: "index"
    //     },
    //     responsive: true,
    //     maintainAspectRatio: false
    // };
    // if (price === "0.00") {
    //     return <h2>please select a currency pair</h2>
    // }
  
  
  const { datas,price,Time } = props
  
  
  
  const data= {
        labels: Time,
        datasets: [{
            label: 'Price is Usd',
          data:datas,
            backgroundColor:[ 'rgba(255, 99, 132, 0.2)'],
            
          borderColor:[ 'rgba(255,99,132,1)'],
          tension: 0.4,
             fill:false,
        }]
    }
  const options = {
    // Tooltip: {
    //   intersect: false,
    //   mode:"index"
    // },
    // responsive:true,
     maintainAspectRatio:false,
        scales: {
          // y: {
          //   ticks: {
          //     beginAtZero:true
          //   }
          // }]
        
    },
    Legend: {
      labels: {
            fontSize:26
          }
        }
  }
// console.log("props",props.datas)
 
  
  return (
    <div className='chart'>
          {/* <h2>{`$ ${price}`}</h2> */}
          {/* <Line data={data} options={ opts} /> */}
          <div className='chart_con'>
              {/* <chart  data={data} options={ opts} /> */}
              <Line data={data} options={ options}/>
          </div>
    </div>
  )
}

export default Chart
