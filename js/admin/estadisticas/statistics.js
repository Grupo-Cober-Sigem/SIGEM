var url = "../../../php/admin/estadisticas.php";
var appUsuarios = new Vue({
    data: {
        aprobado: [],
        pendiente: [],
        rechazado: []
    },
    methods: {
        //Procedimientos
        contarAprobados: function(){
            axios.post(url,{opcion:1}).then(response=>{
                this.aprobado = response.data;
                console.log("Este es el valor de aprobado "+this.aprobado);
                ap = this.aprobado;
                console.log(ap);
            });
        },
        contarPendientes: function(){
            axios.post(url,{opcion:2}).then(response=>{
                this.pendiente = response.data;
                console.log("Este es el valor de pendiente "+this.pendiente);
            });
        },
        contarRechazados: function(){
            axios.post(url,{opcion:3}).then(response=>{
                this.rechazado = response.data;
                console.log("Este es el valor de rechazado "+this.rechazado);
            });
        },

        mostrarGrafica: function(){
            // Obtener una referencia al elemento canvas del DOM
            const $grafica = document.querySelector("#grafica");
            // Las etiquetas son las que van en el eje X.
            const etiquetas = ["Estado"]
            // Podemos tener varios conjuntos de datos

            axios.post(url,{opcion:1}).then(response=>{ //Inicia APROBADOS
                this.aprobado = response.data;
                console.log("Este es el valor de aprobado "+this.aprobado);
                
                axios.post(url,{opcion:2}).then(response=>{ //Inicia PENDIENTE
                    this.pendiente = response.data;
                    console.log("Este es el valor de pendiente "+this.pendiente);

                    axios.post(url,{opcion:3}).then(response=>{ //Inicia RECHAZADO
                        this.rechazado = response.data;
                        console.log("Este es el valor de rechazado "+this.rechazado);

                        const seguimientosaprobados = {
                            label: "Seguimientos Aprobados",
                            data: [this.aprobado], // La data es un arreglo que debe tener la misma cantidad de valores que la cantidad de etiquetas
                            backgroundColor: 'rgba(0, 143, 57, 0.2)', // Color de fondo
                            borderColor: 'rgba(0, 143, 57, 1)', // Color del borde
                            borderWidth: 1,// Ancho del borde
                        };
                        const seguimientosporrevisar = {
                            label: "Seguimientos por Revisar",
                            data: [this.pendiente], // La data es un arreglo que debe tener la misma cantidad de valores que la cantidad de etiquetas
                            backgroundColor: 'rgba(255, 128, 0, 0.2)',// Color de fondo
                            borderColor: 'rgba(255, 128, 0, 1)',// Color del borde
                            borderWidth: 1,// Ancho del borde
                        };
                        const seguimientosrechazados = {
                            label: "Seguimientos Rechazados",
                            data: [this.rechazado], // La data es un arreglo que debe tener la misma cantidad de valores que la cantidad de etiquetas
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

                    }); //Termina RECHAZADO
                }); //Termina PENDIENTES
            }); //Termina APROBADOS
        }
    },
    created:function(){
        this.contarAprobados();
        this.contarPendientes();
        this.contarRechazados();
        this.mostrarGrafica();
    }/*
*/});
