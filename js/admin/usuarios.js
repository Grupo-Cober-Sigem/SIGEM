var url = "../../../php/admin/usersxadmin.php";
var appUsuarios = new Vue({
    el: "#seccionUsuarios",
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
        btnAgregar: async function () {
            const { value: formValues } = await Swal.fire({
                title: 'Agregar',
                html:
                    '<div class="row"><label class="col-sm-3 col-form-label">Nombre</label><div class="col-sm-7"><input id="Nombre" type="text" class="form-control"></div></div><div class="row"><label class="col-sm-3 col-form-label">Apellidos</label><div class="col-sm-7"><input id="Apellidos" type="text" class="form-control"></div></div><div class="row"><label class="col-sm-3 col-form-label">Documento de Identidad</label><div class="col-sm-7"><input id="cod_user" type="number" min="0" class="form-control"></div></div><div class="row"><label class="col-sm-3 col-form-label">Correo Electrónico</label><div class="col-sm-7"><input id="email" type="text" class="form-control"></div></div><div class="row"><label class="col-sm-3 col-form-label">Contraseña</label><div class="col-sm-7"><input id="Pass" type="text" class="form-control"></div></div><div class="row"><label class="col-sm-3 col-form-label">Rol</label><div class="col-sm-7"><select class="form-control" id="rol"><option selected>Seleccionar</option><option value="1">Docente</option><option value="2">Jefe de Area</option><option value="3">Decano</option></select></div></div><div class="row"><label class="col-sm-3 col-form-label">Nombre</label><div class="col-sm-7"><input id="Nombre" type="text" class="form-control"></div></div><div class="row"><label class="col-sm-3 col-form-label">Apellidos</label><div class="col-sm-7"><input id="Apellidos" type="text" class="form-control"></div></div><div class="row"><label class="col-sm-3 col-form-label">Documento de Identidad</label><div class="col-sm-7"><input id="cod_user" type="number" min="0" class="form-control"></div></div><div class="row"><label class="col-sm-3 col-form-label">Correo Electrónico</label><div class="col-sm-7"><input id="email" type="text" class="form-control"></div></div><div class="row"><label class="col-sm-3 col-form-label">Contraseña</label><div class="col-sm-7"><input id="Pass" type="text" class="form-control"></div></div><div class="row"><label class="col-sm-3 col-form-label">Rol</label><div class="col-sm-7"><select class="form-control" id="rol"><option selected>Seleccionar</option><option value="1">Docente</option><option value="2">Jefe de Area</option><option value="3">Decano</option></select></div></div>',
                focusConfirm: false,
                showCancelButton: true,
                confirmButtonText: 'Guardar',
                confirmButtonColor: '#1cc88a',
                cancelButtonColor: '#3085d6',
                preConfirm: () => {
                    return [
                        this.nombre = document.getElementById('Nombre').value,
                        this.apellidos = document.getElementById('Apellido').value,
                        this.Cod_User = document.getElementById('Cod_User').value,
                        this.email = document.getElementById('email').value,
                        this.pass = document.getElementById('pass').value,
                        this.rol = document.getElementById('rol').value
                    ]
                }
            })
            if (this.marca == "" || this.modelo == "" || this.stock == 0) {
                Swal.fire({
                    type: 'info',
                    title: 'Datos incompletos',
                })
            }
            else {
                this.altaMovil();
                const Toast = Swal.mixin({
                    toast: true,
                    position: 'top-end',
                    showConfirmButton: false,
                    timer: 3000
                });
                Toast.fire({
                    type: 'success',
                    title: '¡Producto Agregado!'
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
        }
    },
    created:function(){
        this.listarUsuarios();
    }
});                                 