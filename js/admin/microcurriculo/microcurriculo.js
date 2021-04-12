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
                    '<div class="form-group"><label for="exampleFormControlInput1">Nombre</label><input type="text" class="form-control" placeholder="Nombre de la asignatura" id="nombreasignatura"></div><div class="form-group"><div class="row"><div class="col"><label for="exampleFormControlInput1">Código</label><input type="text" class="form-control" placeholder="Código de la asignatura" id="codigoasignatura"></div><div class="col"><label for="exampleFormControlInput1">Nro. de Creditos</label><input type="text" class="form-control" placeholder="Cantidad de Creditos" id="cdcxignatura"></div></div></div><div class="row"><div class="col"><div class="form-group"><label for="exampleFormControlSelect1">Área</label><select class="form-control" id="nivelformacion"><option value="1">Básicas de Ingeniería</option><option value="2">Ingeniería Aplicada</option></select></div></div><div class="col"><div class="form-group"><label for="exampleFormControlSelect1">Ubicación</label><select class="form-control" id="nivelformacion"><option value="1">Semestre 1</option><option value="2">Semestre 2</option></select></div></div></div><div class="row"><div class="col"><div class="form-group"><label for="exampleFormControlSelect1">Nivel de formación</label><select class="form-control" id="nivelformacion"><option value="1">Pregado</option><option value="2">Posgrado</option><option value="3">Tecnología</option><option value="4">Técnico</option></select></div></div><div class="col"><div class="form-group"><label for="exampleFormControlSelect1">Modalidad</label><select class="form-control" id="modalidad"><option value="1">Presencial</option><option value="2">A distancia</option><option value="3">Tutoriada</option><option value="4">Virtual</option><option value="5">Escenarios múltiples</option></select></div></div></div><div class="row"><div class="col"><div class="form-group"><label for="exampleFormControlSelect1">Carácter</label><select class="form-control" id="carasignatura"><option value="1">Obligatoria</option><option value="2">Electiva</option><option value="3">Optativa</option></select></div></div><div class="col"><div class="form-group"><label for="exampleFormControlSelect1">Tipo de asignatura</label><select class="form-control" id="tipoasignatura"><option value="1">Teórica</option><option value="2">Práctica</option><option value="3">Teórica Práctica</option></select></div></div></div><div class="row"><div class="col"><div class="form-group"><label for="exampleFormControlInput1">Número de horas Semanales</label><div class="row"><div class="col"><input type="text" class="form-control" placeholder="Presenciales" id="ubicacionasignatura"></div><div class="col"><input type="text" class="form-control" placeholder="Independientes" id="ubicacionasignatura"></div></div></div></div></div>',
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