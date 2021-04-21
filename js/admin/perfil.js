var url = "../../php/admin/perfilxadmin.php";

var app = new Vue({
    el: "#perfilxadmin",
    // Se definen las variables a recuperar de la base de datos
    data: {
        datos: [], 
        cod: "",
        nombres: "",
        apellidos: "",
        correo: "",
        pass:""
    },
    // Se definen las acciones de los botones
    methods: {
        btnEditar: async function (nombres, apellidos, correo, pass) {
            await Swal.fire({
                title: 'EDITAR',
                html:
                '<div class="form-group"><div class="row"><label class="col-sm-4 col-form-label">Nombres</label><div class="col-sm-7"><input id="nombres" value="'+nombres+'" type="text" class="form-control"></div></div><div class="row"><label class="col-sm-4 col-form-label">Apellidos</label><div class="col-sm-7"><input id="apellidos" value="'+apellidos+'" type="text" class="form-control"></div></div><div class="row"><label class="col-sm-4 col-form-label">Correo</label><div class="col-sm-7"><input id="correo" value="'+correo+'" class="form-control"></div></div><div class="form-group"><div class="row"><label class="col-sm-4 col-form-label">Contraseña</label><div class="col-sm-7"><input id="pass" value="'+pass+'" type="text" class="form-control"></div></div></div>', 
                focusConfirm: false,
                showCancelButton: true,                         
                }).then((result) => {
                  if (result.value) {                                             
                    nombres = document.getElementById('nombres').value,    
                    apellidos = document.getElementById('apellidos').value,
                    correo = document.getElementById('correo').value,                
                    pass = document.getElementById('pass').value

                    this.actualizarDatos(nombres, apellidos, correo, pass);
                    Swal.fire(
                      '¡Actualizado!',
                      'El registro ha sido actualizado.',
                      'success'
                    )                  
                  }
                });
        },

        // Procedimiento Listar
        listarDatos: function() {
            // Se llama  axios
            this.cod = localStorage.getItem("usuario");
            console.log(this.cod);

            axios.post(url,{opcion:1, usuario:this.cod}).then(response => {
                this.datos = response.data;

                this.nombres = this.datos[0].Nombres;
                this.apellidos = this.datos[0].Apellidos;
                this.correo = this.datos[0].email;
                this.pass = this.datos[0].pass;
            });
        },

        actualizarDatos: async function(nombres, apellidos, correo, pass) {
            axios.post(url, {opcion:2, usuario:this.cod, nombres:nombres, apellidos:apellidos, correo:correo, pass:pass}).then(response => {
                this.listarDatos();
            });
        }

    }, 
    // Ejecutamos la función al momento de ingresar a la página
    created: function(){
        this.listarDatos();
    }

});