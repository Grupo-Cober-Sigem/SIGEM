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
                console.log("Valor del array datos: "+this.datos);
                if(this.datos != '')
                {
                    if(this.datos[0].habilitado==1)
                    {
                        localStorage.setItem("usuario", this.datos[0].Cod_User);
                        localStorage.setItem("rol",this.datos[0].rol);
                        switch(this.datos[0].rol)
                        {
                            case 1:
                                window.location.href = "./pages/docentes/indexdoc.html";
                                break;

                            case 2:
                                window.location.href = "./pages/jefearea/indexja.html";
                                break;

                            case 3:
                                window.location.href = "./pages/decano/indexdec.html";
                                break;

                            case 5:
                                window.location.href = "./pages/administrador/indexadmin.html";
                                break;
                        }
                    }else
                    {
                        Swal.fire({
                            icon: 'error',
                            title: 'Usuario deshabilitado',
                            text: 'Consulte con el administrador para más información'
                          }) 
                    }
                } else 
                {
                    console.log("Error, datos incorrectos");
                    //y mostramos un msj sobre la eliminación  
                    Swal.fire({
                        icon: 'error',
                        title: 'Credenciales incorrectas',
                        text: 'Por favor vuelva a intentarlo'
                      })
                }
                
        });
    }
    }

});