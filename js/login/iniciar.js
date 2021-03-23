var url = "php/login.php";

var app = new Vue({
    el: "#app",
    // Se definen las variables a recuperar de la base de datos
    data: {
        datos: []
    },
    // Se definen las acciones de los botones
    methods: {
        btnIniciar: async function() {
            let usuario = document.getElementById('usuario').value;
            let contraseña = document.getElementById('contraseña').value; 

            if(usuario != '' && contraseña != ''){
                this.consultarUsuario(usuario, contraseña);
            } else {
                Swal.fire({
                    icon: 'warning',
                    title: 'Campos incompletos',
                    text: 'Debe llenar todos los campos'
                  })
            }
        },

        // Procedimiento Consultar usuario
        consultarUsuario: function(usuario, contraseña){
            axios.post(url, {opcion:1, usuario:usuario, contraseña:contraseña}).then(response => {
                this.datos = response.data;

                if(this.datos != ''){
                    localStorage.setItem("usuario", this.datos[0].Cod_User);
                    window.location.href = "http://localhost/SIGEM/pages/administrador/indexadmin.html";
                } else {
                    console.log("Error, datos incorrectos");
                    //y mostramos un msj sobre la eliminación  
                    Swal.fire({
                        icon: 'error',
                        title: 'El usuario no existe',
                        text: 'Por favor vuelva a intentarlo'
                      })
                }
                
        });
    }
    }

});