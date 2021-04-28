// Obtener una referencia al elemento canvas del DOM
const $grafica = document.querySelector("#grafica");
// Las etiquetas son las que van en el eje X.
const etiquetas = ["Estado"]
// Podemos tener varios conjuntos de datos
const seguimientosaprobados = {
    label: "Seguimientos Aprobados",
    data: [8], // La data es un arreglo que debe tener la misma cantidad de valores que la cantidad de etiquetas
    backgroundColor: 'rgba(0, 143, 57, 0.2)', // Color de fondo
    borderColor: 'rgba(0, 143, 57, 1)', // Color del borde
    borderWidth: 1,// Ancho del borde
};
const seguimientosporrevisar = {
    label: "Seguimientos por Revisar",
    data: [10], // La data es un arreglo que debe tener la misma cantidad de valores que la cantidad de etiquetas
    backgroundColor: 'rgba(255, 128, 0, 0.2)',// Color de fondo
    borderColor: 'rgba(255, 128, 0, 1)',// Color del borde
    borderWidth: 1,// Ancho del borde
};
const seguimientosrechazados = {
    label: "Seguimientos Rechazados",
    data: [2], // La data es un arreglo que debe tener la misma cantidad de valores que la cantidad de etiquetas
    backgroundColor: 'rgba(255, 0, 0, 0.2)',// Color de fondo
    borderColor: 'rgba(255, 0, 0, 1)',// Color del borde
    borderWidth: 1,// Ancho del borde
};

new Chart($grafica, {
    type: 'bar',// Tipo de gráfica
    data: {
        labels: etiquetas,
        datasets: [
            seguimientosaprobados,
            seguimientosporrevisar,
            seguimientosrechazados,
            // Aquí más datos...
        ]
    },
    options: {
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: true
                }
            }],
        },
    }
});
