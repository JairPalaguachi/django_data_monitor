/**
 * For usage, visit Chart.js docs https://www.chartjs.org/docs/latest/
 */

// Obtener datos del template para gráfico de barras
const barsCanvas = document.getElementById('bars');

if (barsCanvas) {
  const barLabels = barsCanvas.dataset.labels ? barsCanvas.dataset.labels.split(',') : [];
  const barCounts = barsCanvas.dataset.counts ? barsCanvas.dataset.counts.split(',').map(Number) : [];
  const barLeast = barsCanvas.dataset.least || '';

  const barConfig = {
    type: 'bar',
    data: {
      labels: barLabels.map(label => `${label} estrellas`), // Agregar "estrellas" a cada label
      datasets: [
        {
          label: 'Frecuencia de calificaciones',
          backgroundColor: '#0694a2',
          borderColor: '#0694a2',
          borderWidth: 1,
          data: barCounts,
        }
      ],
    },
    options: {
      responsive: true,
      legend: {
        display: false,
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
            beginAtZero: true,
            stepSize: 1 // Para mostrar solo números enteros
          }
        }],
      },
      tooltips: {
        mode: 'index',
        intersect: false,
        callbacks: {
          title: function(tooltipItem, data) {
            return data.labels[tooltipItem[0].index];
          },
          label: function(tooltipItem, data) {
            return `Cantidad: ${tooltipItem.yLabel}`;
          }
        }
      }
    },
  };

  const barsCtx = document.getElementById('bars');
  window.myBar = new Chart(barsCtx, barConfig);
}