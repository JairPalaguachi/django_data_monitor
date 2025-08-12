/**
 * For usage, visit Chart.js docs https://www.chartjs.org/docs/latest/
 */

// Obtener datos del template
const lineCanvas = document.getElementById('line');
const labels = lineCanvas.dataset.labels ? lineCanvas.dataset.labels.split(',') : [];
const counts = lineCanvas.dataset.counts ? lineCanvas.dataset.counts.split(',').map(Number) : [];
const least = lineCanvas.dataset.least || '';

const lineConfig = {
  type: 'line',
  data: {
    labels: labels,
    datasets: [
      {
        label: 'Frecuencia de calificaciones',
        backgroundColor: '#0694a2',
        borderColor: '#0694a2',
        data: counts,
        fill: false,
      }
    ],
  },
  options: {
    responsive: true,
    legend: {
      display: false,
    },
    tooltips: {
      mode: 'index',
      intersect: false,
    },
    hover: {
      mode: 'nearest',
      intersect: true,
    },
    scales: {
      xAxes: [{
        display: true,
        scaleLabel: {
          display: true,
          labelString: 'Calificación',
        },
      }],
      yAxes: [{
        display: true,
        scaleLabel: {
          display: true,
          labelString: 'Cantidad',
        },
        ticks: {
          beginAtZero: true
        }
      }],
    },
  },
};

window.myLine = new Chart(lineCanvas, lineConfig);
