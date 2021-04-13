var url = "../../../php/admin/usersxadmin.php";
var appUsuarios = new Vue({
    el: "#seccionUsuarios",
    data: {
        datosUsuarios: [],
        cod_user: "",
        pass: "",
        nombre: "",
        apellidos: "",
        email: "",
        rol: ""
    },
    methods: {
        btnAgregar: async function () {
            const { value: formValues } = await Swal.fire({
                title: 'Agregar',
                html:
                    '<div class="form-group"><div class="row"><label class="col-form-label"></label></div></div><div class="form-group"><div class="row"><label class="col-sm-4 col-form-label text-left">Nombres</label><div class="col-sm-8"><input id="nombre" type="text" class="form-control"></div></div></div><div class="form-group"><div class="row"><label class="col-sm-4 col-form-label text-left">Apellidos</label><div class="col-sm-8"><input id="apellidos" type="text" class="form-control"></div></div></div><div class="form-group"><div class="row"><label class="col-sm-6 col-form-label text-left">Nro. de Identificación</label><div class="col-sm-6"><input id="cod_user" type="number" min="0" class="form-control"></div></div></div><div class="form-group"><div class="row"><label class="col-sm-5 col-form-label text-left">Email Unilibre</label><div class="col-sm-7"><input id="email" type="text" class="form-control"></div></div></div><div class="form-group"><div class="row"><label class="col-sm-4 col-form-label text-left">Contraseña</label><div class="col-sm-8"><input id="pass" type="text" class="form-control"></div></div></div><div class="form-group"><div class="row"><label class="col-sm-4 col-form-label text-left">Rol</label><div class="col-sm-8"><select class="form-control" id="rol"><option selected>Seleccionar</option><option value="1">Docente</option><option value="2">Jefe de Area</option><option value="3">Decano</option></select></div></div></div>',
                focusConfirm: false,
                showCancelButton: true,
                confirmButtonText: 'Guardar',
                confirmButtonColor: '#1cc88a',
                showLoaderOnConfirm: true,
                cancelButtonText: "Cancelar",
                cancelButtonColor: '#CB3234',

                preConfirm: () => {
                    return [
                        this.nombre = document.getElementById('nombre').value,
                        this.apellidos = document.getElementById('apellidos').value,
                        this.cod_user = document.getElementById('cod_user').value,
                        this.email = document.getElementById('email').value,
                        this.pass = document.getElementById('pass').value,
                        this.rol = document.getElementById('rol').value
                    ]
                }
            })
            /*if (this.nombre == "" || this.apellidos == "" || this.Cod_User == "" || this.email=='') {
                Swal.fire({
                    type: 'info',
                    title: 'Datos incompletos',
                })
            }
            else {*/
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
            /*}*/
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
            axios.post(url, {opcion:4, Cod_User:this.code_user, Pass:this.pass, Nombres:this.nombre, Apellidos:this.apellidos, email:this.email, rol:this.rol}).then(response =>{
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