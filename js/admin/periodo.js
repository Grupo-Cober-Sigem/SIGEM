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
                html:'<div class="form-group"><label for="periodo" class="col-form-label">Nombre</label><input type="text" class="form-control" id="periodo" placeholder="AAAA-S"></div><div class="row"><div class="col"><div class="form-group"><label for="fechaIni" class="col-form-label">Fecha de Inicio</label><input type="text" class="form-control" id="fechaIni" placeholder="DD/MM/AAAA"></div></div><div class="col"><div class="form-group"><label for="fechaFin" class="col-form-label">Fecha de Fin</label><input type="text" class="form-control" id="fechaFin" placeholder="DD/MM/AAAA"></div></div></div>',
                focusConfirm: false,
                showCancelButton: true,
                confirmButtonText: 'Guardar',
                confirmButtonColor: '#1cc88a',
                showLoaderOnConfirm: true,
                cancelButtonText: "Cancelar",
                cancelButtonColor: '#CB3234',

                preConfirm: () => {
                    return [
                        this.periodo = Swal.getPopup().querySelector('#periodo').value,
                        this.fechaIni = Swal.getPopup().querySelector('#fechaIni').value,
                        this.fechaFin = Swal.getPopup().querySelector('#fechaFin').value
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
        btnEditarPeriodo: async function (periodo,fechaIni,fechaFin) { 
            await Swal.fire({
                title: 'Editar',
                html:
                '<div class="form-group"><label for="periodo" class="col-form-label">Nombre</label><input type="text" class="form-control" id="periodo" value="'+periodo+'" placeholder="AAAA-S"></div><div class="row"><div class="col"><div class="form-group"><label for="fechaIni" class="col-form-label">Fecha de Inicio</label><input type="text" class="form-control" id="fechaIni" value="'+fechaIni+'" placeholder="DD/MM/AAAA"></div></div><div class="col"><div class="form-group"><label for="fechaFin" class="col-form-label">Fecha de Fin</label><input type="text" class="form-control" id="fechaFin" value="'+fechaFin+'" placeholder="DD/MM/AAAA"></div></div></div>', 
                focusConfirm: false,
                showCancelButton: true,
                cancelButtonText: "Cancelar",

                }).then((result) => {
                  if (result.value) {                                             
                    periodo = Swal.getPopup().querySelector('#nombre').value,
                    fechaIni = Swal.getPopup().querySelector('#apellidos').value,
                    fechaFin = Swal.getPopup().querySelector('#cod_user').value              

                    this.editarPeriodos(periodo,fechaIni,fechaFin);
                    Swal.fire(
                      '¡Actualizado!',
                      'El registro ha sido actualizado.',
                      'success'
                    )                  
                  }
                });
        },

        //Procedimientos
        listarPeriodos: function(){
            axios.post(url,{opcion:1}).then(response=>{
                this.datosPeriodos = response.data;
                console.log(this.datosPeriodos);
            });
        },

        editarPeriodos:function(periodo,fechaIni,fechaFin){
            axios.post(url,{opcion:2, periodo:periodo, fechaIni:fechaIni, fechaFin:fechaFin}).then(response => {
                this.listarPeriodos();
            });
        },
        
        agregarPeriodo: function(){
            axios.post(url, {opcion:4, periodo:this.periodo, fechaIni:this.fechaIni,fechaFin:this.fechaFin }).then(response =>{
                this.listarPeriodos();
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