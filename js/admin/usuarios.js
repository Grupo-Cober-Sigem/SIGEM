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
                    '<div class="modal fade" id="agregarModal" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true"><div class="modal-dialog" role="document"><div class="modal-content"><div class="modal-header"><h5 class="modal-title" id="exampleModalLabel">Creación de Usuarios</h5><button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button></div><div class="modal-body"><form>',
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
        btnDeshabilitarUser: function () { },

        //Procedimientos
        listarUsuarios: function(){
            axios.post(url,{opcion:1}).then(response=>{
                this.datos = response.data;
                console.log(this.datos);

            });
        }
    },
    created:function(){
        this.listarUsuarios();
    },
})