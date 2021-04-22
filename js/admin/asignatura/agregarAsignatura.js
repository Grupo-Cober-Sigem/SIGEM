var url = "";
var appAsignatura = new Vue({
    el: "#seccionAsignatura",
    data: {
        datosAsignatura: [],
        arrayUnidades:[],
        arraySesiones:[],
        arraySubtemas:[]
    },
    methods: {
        btnAgregarAsignatura: async function () {
            const { value: formValues } = await Swal.fire({
                title: 'Agregar',
                html:
                    '<div class="form-group"><label for="recipient-name" class="col-form-label">Nombre</label><input type="text" class="form-control" id="recipient-name"></div><div class="row"><div class="col"><div class="form-group"><label for="recipient-name" class="col-form-label">Código</label><input type="text" class="form-control" id="recipient-name"></div></div><div class="col"><div class="form-group"><label for="recipient-name" class="col-form-label">Semestre</label><select class="form-control" id="nivelformacion"><option value="1">Primero</option></select></div></div><div class="col"><div class="form-group"><label for="recipient-name" class="col-form-label">Estudiantes</label><input type="text" class="form-control" placeholder="Cantidad" id="recipient-name"></div></div></div><div class="form-group"><label for="recipient-name" class="col-form-label">Programa de la asignatura</label><select class="form-control" id="docxasig"><option value="1">Nombre del programa</option></select></div><div class="form-group"><label for="recipient-name" class="col-form-label">Área de la asignatura</label><select class="form-control" id="docxasig"><option value="1">Nombre del área</option></select></div><div class="form-group"><label for="recipient-name" class="col-form-label">Docente</label><select class="form-control" id="docxasig"><option value="1">Maritza Sanchez</option></select></div>',
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
        listarAsignatura: function(){
            axios.post(url,{opcion:1}).then(response=>{
                this.datosUsuarios = response.data;
                console.log(this.datos);
            });
        },

        AgregarAsignatura: function(){
            axios.post(url, {opcion:4, marca:this.marca, modelo:this.modelo,stock:this.stock }).then(response =>{
                this.listarAsignatura();
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