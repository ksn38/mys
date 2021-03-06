let radio = document.querySelector('form');
let item = 250;
let date = [];
let vix = [];
let tnx = [];
let gspc = [];
let ixic = [];
let rut = [];
let wti = [];
let gold = [];
let level = 30;
let vix2 = [];
let chart1 = document.getElementById("line-chart");
let chart2 = document.getElementById("line-chart2");
let chart3 = document.getElementById("line-chart3");
let chart4 = document.getElementById("line-chart4");
let chart5 = document.getElementById("line-chart5");
let chart6 = document.getElementById("line-chart6");
let chart7 = document.getElementById("line-chart7");
let chart8 = document.getElementById("line-chart8");
let chart9 = document.getElementById("line-chart9");
let chart10 = document.getElementById("line-chart10");
let lengthRD = received_data.length;
//console.log(lengthRD);
let win = 30;
let radWin = document.getElementsByName('win');
let tr = document.querySelectorAll('.change');
let tri = document.querySelectorAll('.change-invert');
let offsetInput = document.getElementById('offset-input');
let levelInput = document.getElementById('level-input');
let correlationInput = document.getElementById('correlation-input');
let offset = 0;
let dateOffset = [];
let dateOffsetOutput = document.getElementById('dateOffsetOutput');
dateOffsetOutput.innerHTML = received_data[lengthRD - 1]['fields']['date_added'];
let periodInput = document.getElementById("period-input");


for (let i = lengthRD - 1; i >= 0; i--) {
    dateOffset.push(received_data[i]['fields']['date_added']);
    //console.log(i);
  }

for (let i of tr) {
  if (parseInt(i.textContent) < 0) {
    i.classList.add('bg-danger')
  }
  else if (parseInt(i.textContent) > 0) {
    i.classList.add('bg-success')
  }else {i.classList.add('bg-secondary')}
}

for (let i of tri) {
  if (parseInt(i.textContent) > 0) {
    i.classList.add('bg-danger')
  }
  else if (parseInt(i.textContent) < 0) {
    i.classList.add('bg-success')
  }else {i.classList.add('bg-secondary')}
}

let cor = (list1, list2) => {
  let average = (list) => {
    return list.reduce((accum, curr) => accum + curr) / list.length;
  };

  let avgList1 = average(list1);
  let avgList2 = average(list2);

  let cov = (list1, avgList1, list2, avgList2) => {
    let list = [];
    for (let i = 0; i < list1.length; i++) {
      list[i] = (list1[i] - avgList1)*(list2[i] - avgList2);
    };
    return list;
  };

  let sum = (list) => {
    return list.reduce((accum, curr) => accum + curr);
  }

  let dif2 = (list, avg) => {
    let initialValue = 0;
    return list.reduce((accum, curr) => accum + ((curr - avg)**2), initialValue);
  }

  return (sum(cov(list1, avgList1, list2, avgList2)))/Math.sqrt(dif2(list1, avgList1)*dif2(list2, avgList2));
};

let lineChart = function(x, y, xLabel, yLabel, xColor, yColor, chart, win, item) {
  let rcor = [];
  
  for (let i = 0; i < item; i++) {
      rcor.push(cor(x.slice(i, i + win), y.slice(i, i + win)));
  };
  
  let radPoint = 3;
  let bordWidth = 3;
  
  if (item > 50) {
    radPoint = 0;
    bordWidth = 2;
  };
  
  return new Chart(chart, {
    type: 'line',
    data: {
      labels: date.slice(win),
      datasets: [{ 
          data: x.slice(win),
          borderColor: xColor,
          fill: false,
          label: xLabel,
          yAxisID: xLabel,
          pointRadius: radPoint,
          borderWidth: bordWidth,
        }, { 
          data: y.slice(win),
          borderColor: yColor,
          fill: false,
          label: yLabel,
          yAxisID: yLabel,
          pointRadius: radPoint,
          borderWidth: bordWidth,
        }, { 
          data: rcor,
          borderColor: '#777777',
          fill: true,
          label: 'Rolling correlation',
          yAxisID: 'Rolling correlation',
          pointRadius: 0,
          borderWidth: 1,
        }, { 
          data: vix2.slice(win),
          borderColor: '#ff0000',
          backgroundColor: '#feadad',
          steppedLine: 'middle',
          fill: true,
          label: 'VIX',
          yAxisID: 'VIX2',
          pointRadius: 0,
          borderWidth: 0,
        }
      ]
    },
    options: {
      animation: {
        duration: 0
      },
      events: [],
      title: {
        display: true,
        text: ''
      },
      scales: {
        xAxes: [{
          gridLines: {
          drawOnChartArea: false
          }
        }],
        yAxes: [{
          id: xLabel,
          type: 'linear',
          position: 'left',
          gridLines: {
            drawOnChartArea: false
          }
        }, {
          id: yLabel,
          type: 'linear',
          position: 'right',
          gridLines: {
            drawOnChartArea: false
          }          
        }, {
          id: 'Rolling correlation',
          type: 'linear',
          display: false,
          position: 'right',
          ticks : {
            max : 1,    
            min : -1
          }
        }, {
          id: 'VIX2',
          type: 'linear',
          display: false,
          position: 'left',
          ticks : {
            max : 100,    
            min : 0
          }
        }]
      }
    }
  });
};


let createCharts = function* (offset, level, win, item) {
  //console.log(dateOffset[offset]);
  if (lengthRD - item - win - offset < 0) {
    offset = 0;
    offsetInput.value = 0;
  };
  for (let i = lengthRD - item - win - offset; i < lengthRD - offset; i++) {
    date.push(received_data[i]['fields']['date_added']);
    vix.push(received_data[i]['fields']['vix']);
    tnx.push(received_data[i]['fields']['tnx']);
    gspc.push(received_data[i]['fields']['gspc']);
    ixic.push(received_data[i]['fields']['ixic']);
    rut.push(received_data[i]['fields']['rut']);
    wti.push(received_data[i]['fields']['wti']);
    gold.push(received_data[i]['fields']['gold']);
    if (received_data[i]['fields']['vix'] > level) {
      vix2.push(received_data[i]['fields']['vix'])
    } else {vix2.push(0)};
  }
  
  let wtiGold = wti.map(function(n, i) {
     return n / gold[i];
    }
  );

  yield (lineChart(vix, gspc, 'VIX', 'S&P500', '#ff0000', "#0000ff", chart1, win, item),
  lineChart(tnx, gspc, 'TR10', 'S&P500', '#c000ff', "#0000ff", chart2, win, item),
  lineChart(wti, tnx, 'WTI', 'TR10', '#000000', "#c000ff", chart3, win, item),
  lineChart(gold, tnx, 'Gold', 'TR10', '#ffd800', "#c000ff", chart4, win, item),
  lineChart(wti, gspc, 'WTI', 'S&P500', '#000000', "#0000ff", chart5, win, item),
  lineChart(gold, gspc, 'Gold', 'S&P500', '#ffd800', "#0000ff", chart6, win, item),
  lineChart(wtiGold, tnx, 'Wti/Gold', 'TR10', '#a4a260', "#c000ff", chart7, win, item),
  lineChart(ixic, rut, 'Nasdaq', 'Russell', '#36ff00', "#ff6600", chart8, win, item),
  lineChart(ixic, gspc, 'Nasdaq', 'S&P500', '#36ff00', "#0000ff", chart9, win, item),
  lineChart(rut, gspc, 'Russell', 'S&P500', '#ff6600', "#0000ff", chart10, win, item),
  
  date = [],
  vix = [],
  vix2 = [],
  tnx = [],
  gspc = [],
  ixic = [],
  rut = [],
  wti = [],
  gold = []);
};

createCharts(offset, level, win, item).next(); 

for(let i = 0; i < radio.length; i++){
  radio[i].addEventListener("change", function(){
    item = parseInt(radio[i].value);
    createCharts(offset, level, win, item).next(); 
    periodInput.value = item;
  });
}

for(let i = 0; i < radWin.length; i++){
  radWin[i].addEventListener("change", function(){
    win = parseInt(radWin[i].value);
    createCharts(offset, level, win, item).next(); 
    correlationInput.value = win;
  });
}

correlationInput.onchange = function () {
  win = parseInt(correlationInput.value);
  createCharts(offset, level, win, item).next(); 
}

offsetInput.onchange = function () {
  offset = parseInt(offsetInput.value);
  createCharts(offset, level, win, item).next(); 
}

levelInput.onchange = function () {
  level = parseInt(levelInput.value);
  createCharts(offset, level, win, item).next(); 
  //console.log(offset);
}

offsetInput.oninput = function() {
  offset = parseInt(offsetInput.value);
  if (offset < lengthRD - win - item + 1) {
    dateOffsetOutput.innerHTML = dateOffset[offset];
  } else {
    dateOffsetOutput.innerHTML = received_data[lengthRD - 1]['fields']['date_added'];;
  }
};

periodInput.onchange = () => {
  item = periodInput.value;
  //periodInput.step = Math.floor(periodInput.value/10);
  //console.log(Math.ceil(period.value/10));
  createCharts(offset, level, win, item).next(); 
}


