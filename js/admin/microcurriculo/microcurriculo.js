var url = "";
var appUsuarios = new Vue({
    el: "#seccionMicrocurriculo",
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
        btnAgregarMicro: async function () {
            const { value: formValues } = await Swal.fire({
                title: 'Agregar',
                html:
                    '',
                focusConfirm: false,
                showCancelButton: true,
                confirmButtonText: 'Guardar',
                confirmButtonColor: '#1cc88a',
                cancelButtonColor: "",
                cancelButtonColor: '#3085d6',

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
        btnEditarUser: async function () {
            /*Para editar el microcurriculo hay dos situaciones:
            1) Cuando se llena la primera vez
            2) Cuando hay al menos un datos 
            
            Se va a hacer un if preguntando por los datos adicionales. 
            Si minimo uno se encuentra lleno, se van a llenar respectivamente el formulario.
            Si no hay ninguno diligenciado, el formulario se mostrará como es establecido.*/
         },
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