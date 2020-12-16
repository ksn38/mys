let radio = document.querySelectorAll('input[name="period"]');
let item = 20;
let date = [];
let vix = [];
let tnx = [];
let gspc = [];
let chart1 = document.getElementById("line-chart");
let chart2 = document.getElementById("line-chart2");
let chart3 = document.getElementById("line-chart3");
let onload = true;
let lengthRD = received_data.length;


let lineChart = function(x, y, xLabel, yLabel, chart) {
  new Chart(chart, {
    type: 'line',
    data: {
      labels: date,
      datasets: [{ 
          data: x,
          label: xLabel,
          borderColor: "#039000",
          fill: false,
          label: xLabel,
          yAxisID: xLabel,
        }, { 
          data: y,
          label: yLabel,
          borderColor: "#8e5ea2",
          fill: false,
          label: yLabel,
          yAxisID: yLabel,
        }
      ]
    },
    options: {
      title: {
        display: true,
        text: ''
      },
      scales: {
        yAxes: [{
          id: xLabel,
          type: 'linear',
          position: 'left',
        }, {
          id: yLabel,
          type: 'linear',
          position: 'right',
          
        }]
      }
    }
  });
};


for (let i = lengthRD - 20; i < lengthRD; i++) {
  date.push(received_data[i]['fields']['date_added']);
  vix.push(received_data[i]['fields']['vix']);
  tnx.push(received_data[i]['fields']['tnx']);
  gspc.push(received_data[i]['fields']['gspc']);
}

lineChart(vix, tnx, 'VIX', 'TR10', chart1);
lineChart(vix, gspc, 'VIX', 'S&P500', chart2);
lineChart(tnx, gspc, 'TR10', 'S&P500', chart3);


for(let i = 0; i < radio.length; i++){
  radio[i].addEventListener("change", function(){
    item = radio[i].value;
    console.log(item);
    for (let i = lengthRD - item; i < lengthRD; i++) {
      date.push(received_data[i]['fields']['date_added']);
      vix.push(received_data[i]['fields']['vix']);
      tnx.push(received_data[i]['fields']['tnx']);
      gspc.push(received_data[i]['fields']['gspc']);
    }

    lineChart(vix, tnx, 'VIX', 'TR10', chart1);
    lineChart(vix, gspc, 'VIX', 'S&P500', chart2);
    lineChart(tnx, gspc, 'TR10', 'S&P500', chart3);
    item = 20;
    date = [];
    vix = [];
    tnx = [];
    gspc = [];
  });
}


/*window.onload = function(){
  
}*/


