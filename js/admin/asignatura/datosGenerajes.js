var url ="";
var appUsuarios = new Vue({
    el: "#seccionDatosGenerales",
    data: {
        //Arrays para gestionar datos en las tablas
        criterios:[],
        biblioBasica:[],
        biblioSeriadas:[],
        biblioWeb:[],
        biblioSegundaLengua:[],
        biblioComplementaria:[],
        unidadesEdit:[],
        subtemasEdit:[],
        //Arrays y variables para resto de datos
        nombre:"",
        codAsig:"",
        area:0,
        ubicacion:"",
        caracter:"",
        tipo:"",
        horaPresencial:"",
        horaIndependiente:""
    },
    methods: {
        //GESTIONAR REGISTROS EN TABLAS
        // <------ CRITERIOS DE EVALUACIÓN ------>
        btnAgregarCriterio: async function(){ //Agregar Criterios de Evaluación
            var concepto= document.getElementById("criteConcepto").value;
            var tipo= document.getElementById("criteTipo").value;
            var instrumento= document.getElementById("criteInstrumento").value;
            var valor= document.getElementById("critePorcentaje").value;
            var fecha= document.getElementById("criteFecha").value;

            if(concepto=="" || tipo=="" || instrumento=="" || valor=="" || fecha==""){

                Swal.fire({
                    icon: 'info',
                    title: 'Datos incompletos',
                    text: 'Por favor complete todos los campos del criterio de evaluación'
                });
            }else{

                this.criterios.push({

                    concepto: concepto,
                    tipo: tipo,
                    instrumento: instrumento,
                    porcentaje: valor,
                    fecha: fecha
                });
    
                document.getElementById("criteConcepto").value="";
                document.getElementById("criteTipo").value="";
                document.getElementById("criteInstrumento").value="";
                document.getElementById("critePorcentaje").value="";
                document.getElementById("criteFecha").value="";
            }
        },

        btnQuitarCriterio: async function(criterio){ //Eliminar Criterio de Evaluación
            this.criterios.splice(criterio,1);
        },

        // <------ BIBLIOGRAFÍAS ------>
        btnAgregarBiblioBasica: async function(){ //Agregar Bibliografías Básicas
            var sigTopografica = document.getElementById("basicaSignatura").value;
            var basicaBiblio = document.getElementById("basicaBiblio").value;

            if(sigTopografica=="" || basicaBiblio==""){

                Swal.fire({
                    icon: 'info',
                    title: 'Datos incompletos',
                    text: 'Por favor complete todos los campos del registro de bibliografia'
                });
            }else{

                this.biblioBasica.push({
                    ISBN: sigTopografica,
                    biblioDetalle: basicaBiblio,
                    biblioTipo:1
                });

                document.getElementById("basicaSignatura").value="";
                document.getElementById("basicaBiblio").value="";
            }
        },

        btnQuitarBiblioBasica: async function(basica){ //Eliminar Bibliografía Básica
            this.biblioBasica.splice(basica,1);
        },

        btnAgregarBiblioSeriada: async function(){ //Agregar Bibliografía Seriada
            var sigTopografica = document.getElementById("seriadaSignatura").value;
            var seriadaBiblio = document.getElementById("seriadaBiblio").value;

            if(sigTopografica=="" || seriadaBiblio==""){

                Swal.fire({
                    icon: 'info',
                    title: 'Datos incompletos',
                    text: 'Por favor complete todos los campos del registro de bibliografia'
                });
            }else{

                this.biblioSeriadas.push({
                    ISBN: sigTopografica,
                    biblioDetalle: seriadaBiblio,
                    biblioTipo:2
                });

                document.getElementById("seriadaSignatura").value="";
                document.getElementById("seriadaBiblio").value="";
            }
        },

        btnQuitarBiblioSeriada: async function(seriada){ //Eliminar Bibliografía Seriada
            this.biblioSeriadas.splice(seriada,1);
        },

        btnAgregarBiblioWeb: async function(){ //Agregar Bibliografía Web
            var webBiblio = document.getElementById("webBiblio").value;

            if(webBiblio==""){

                Swal.fire({
                    icon: 'info',
                    title: 'Datos incompletos',
                    text: 'Por favor complete todos los campos del registro de bibliografia'
                });
            }else{

                this.biblioWeb.push({
                    biblioDetalle: webBiblio,
                    biblioTipo:3
                });

                document.getElementById("webBiblio").value="";
            }
        },

        btnQuitarBiblioWeb: async function(web){ //Eliminar Bibliografía Web
            this.biblioWeb.splice(web,1);
        },

        btnAgregarBiblioSegundaLengua: async function(){ //Agregar Bibliografía en Segunda Lengua
            var segundaLenguaBiblio = document.getElementById("segundaLenguaBiblio").value;

            if(segundaLenguaBiblio==""){

                Swal.fire({
                    icon: 'info',
                    title: 'Datos incompletos',
                    text: 'Por favor complete todos los campos del registro de bibliografia'
                });
            }else{

                this.biblioSegundaLengua.push({
                    biblioDetalle: segundaLenguaBiblio,
                    biblioTipo:4
                });

                document.getElementById("segundaLenguaBiblio").value="";
            }
        },

        btnQuitarBiblioSegundaLengua: async function(segundaLengua){ //Eliminar Bibliografía en Segunda Lengua
            this.biblioSegundaLengua.splice(segundaLengua,1);
        },

        btnAgregarBiblioComplementaria: async function(){ //Agregar Bibliografía Complementaria
            var sigTopografica = document.getElementById("complementarioSignatura").value;
            var complementarioBiblio = document.getElementById("complementarioBiblio").value;

            if(sigTopografica=="" || complementarioBiblio==""){

                Swal.fire({
                    icon: 'info',
                    title: 'Datos incompletos',
                    text: 'Por favor complete todos los campos del registro de bibliografia'
                });
            }else{

                this.biblioComplementaria.push({
                    ISBN: sigTopografica,
                    biblioDetalle: complementarioBiblio,
                    biblioTipo:5
                });

                document.getElementById("complementarioSignatura").value="";
                document.getElementById("complementarioBiblio").value="";
            }
        },

        btnQuitarBiblioComplementaria: async function(complementaria){ //Eliminar Bibliografía Complementaria
            this.biblioComplementaria.splice(complementaria,1);
        },
    },

    

    created:function(){
        
    }
});                                 