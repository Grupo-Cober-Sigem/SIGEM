var url = "";
var appUsuarios = new Vue({
    el: "#seccionPeriodos",
    data: {
        datosUsuarios: [],
        cod: "",
        pass: "",
        Nombres: "",
        Apellidos: "",
        email: "",
        rol: ""
    },
    methods: {
        btnAgregarPeriodos: async function () {
            const { value: formValues } = await Swal.fire({
                title: 'Agregar',
                html:
                    '<div class="form-group"><label for="recipient-name" class="col-form-label">Nombre</label><input type="text" class="form-control" id="recipient-name" placeholder="AAAA-S"></div><div class="row"><div class="col"><div class="form-group"><label for="recipient-name" class="col-form-label">Fecha de Inicio</label><input type="text" class="form-control" id="recipient-name" placeholder="DD/MM/AAAA"></div></div><div class="col"><div class="form-group"><label for="recipient-name" class="col-form-label">Fecha de Fin</label><input type="text" class="form-control" id="recipient-name" placeholder="DD/MM/AAAA"></div></div></div>',
                focusConfirm: false,
                showCancelButton: true,
                confirmButtonText: 'Guardar',
                confirmButtonColor: '#1cc88a',
                showLoaderOnConfirm: true,
                cancelButtonText: "Cancelar",
                cancelButtonColor: '#CB3234',

                preConfirm: () => {
                    
                    return [
                        this.nombre = document.getElementById('Nombre').value,
                        this.apellidos = document.getElementById('Apellidos').value,
                        this.Cod_User = document.getElementById('Cod_User').value,
                        this.email = document.getElementById('email').value,
                        this.pass = document.getElementById('pass').value,
                        this.rol = document.getElementById('rol').value
                    ]
                }
            })
            if (this.nombre == "" || this.apellidos == "" || this.Cod_User == 0 || this.email=='') {
                Swal.fire({
                    type: 'info',
                    title: 'Datos incompletos',
                })
            }
            else {
                this.agregarUsuarios();
                const Toast = Swal.mixin({
                    toast: true,
                    position: 'top-end',
                    showConfirmButton: false,
                    timer: 3000
                });
                Toast.fire({
                    type: 'success',
                    title: '¡Usuario Agregado!'
                })
            }
        },
        btnEditarUser: async function () { },
        btnDeshabilitarUser: async function () { },

        //Procedimientos
        listarUsuarios: function(){
            axios.post(url,{opcion:1}).then(response=>{
                this.datosUsuarios = response.data;
                console.log(this.datos);
            });
        },

        agregarUsuarios: function(){
            axios.post(url, {opcion:4, marca:this.marca, modelo:this.modelo,stock:this.stock }).then(response =>{
                this.listarMoviles();
            });        
             this.marca = "",
             this.modelo = "",
             this.stock = 0
        },
    },
    created:function(){
        this.listarUsuarios();
    }
});                                 