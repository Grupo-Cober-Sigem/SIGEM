var url = "../../../php/admin/periodos.php";
var appUsuarios = new Vue({
    el: "#seccionPeriodos",
    data: {
        datosPeriodos: [],
        periodo: "",
        fechaFin: "",
        fechaIni: ""
    },
    methods: {
        btnAgregarPeriodos: async function () {
            const { value: formValues } = await Swal.fire({
                title: 'Agregar',
                html:
                    '<div class="form-group"><label for="periodo" class="col-form-label">Nombre</label><input type="text" class="form-control" id="periodo" placeholder="AAAA-S"></div><div class="row"><div class="col"><div class="form-group"><label for="fechaIni" class="col-form-label">Fecha de Inicio</label><input type="text" class="form-control" id="fechaIni" placeholder="DD/MM/AAAA"></div></div><div class="col"><div class="form-group"><label for="fechaFin" class="col-form-label">Fecha de Fin</label><input type="text" class="form-control" id="fechaFin" placeholder="DD/MM/AAAA"></div></div></div>',
                focusConfirm: false,
                showCancelButton: true,
                confirmButtonText: 'Guardar',
                confirmButtonColor: '#1cc88a',
                showLoaderOnConfirm: true,
                cancelButtonText: "Cancelar",
                cancelButtonColor: '#CB3234',

                preConfirm: () => {
                    return [
                        this.periodo = document.getElementById('periodo').value,
                        this.apellidos = document.getElementById('fechaIni').value,
                        this.Cod_User = document.getElementById('fechaFin').value
                    ]
                }
            })
            if (this.periodo == "" || this.fechaIni == "" || this.fechaFin == "") {
                Swal.fire({
                    type: 'info',
                    title: 'Datos incompletos',
                })
            }
            else {
                this.agregarPeriodo();
                const Toast = Swal.mixin({
                    toast: true,
                    position: 'top-end',
                    showConfirmButton: false,
                    timer: 3000
                });
                Toast.fire({
                    type: 'success',
                    title: 'Periodo Agregado!'
                })
            }
        },
        btnEditarUser: async function () { },
        btnDeshabilitarUser: async function () { },

        //Procedimientos
        listarPeriodos: function(){
            axios.post(url,{opcion:1}).then(response=>{
                this.datosUsuarios = response.data;
                console.log(this.datos);
            });
        },

        agregarPeriodo: function(){
            axios.post(url, {opcion:4, periodo:this.periodo, fechaIni:this.fechaIni,fechaFin:this.fechaFin }).then(response =>{
                this.listarMoviles();
            });        
             this.periodo = "",
             this.fechaIni = "",
             this.fechaFin = ""
        },
    },
    created:function(){
        this.listarPeriodos();
    }
});                                 