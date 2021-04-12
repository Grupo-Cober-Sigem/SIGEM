var url = "";
var appUsuarios = new Vue({
    el: "#seccionPlanes",
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
        btnAgregarPlan: async function () {
            const { value: formValues } = await Swal.fire({
                title: 'Agregar',
                html:
                    '<div class="row"><div class="col-sm-8"><div class="form-group"><label for="exampleFormControlSelect1">Pre - Requesitos</label><select class="form-control" id="nivelformacion"><option>Aplica</option><option>No Aplica</option></select></div></div><div class="col-sm-4"><div class="form-group"><label for="exampleFormControlInput1">Año</label><input type="text" class="form-control" placeholder="Año" id="ubicacionasignatura"></div></div></div><div class="row"><div class="col"><label for="exampleFormControlInput1">Bloque</label><input type="text" class="form-control" placeholder="Ubicación del bloque" id="ubicacionasignatura"></div><div class="col"><label for="exampleFormControlInput1">Aula</label><input type="text" class="form-control" placeholder="Aula de la clase" id="ubicacionasignatura"></div></div><div class="form-group"><div class="row"><label class="col-form-label"></label></div></div><div class="row"><div class="col"><div class="form-group"><label for="exampleFormControlSelect1">Problema</label><textarea class="form-control" id="exampleFormControlTextarea1" rows="3"></textarea></div></div></div>',
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