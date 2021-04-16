var url = "../../../php/admin/usersxadmin.php";
var appUsuarios = new Vue({
    el: "#seccionUsuarios",
    data: {
        datosUsuarios: [],
        cod_user: 0,
        pass: "",
        nombre: "",
        apellidos: "",
        email: "",
        rol: 0
    },
    methods: {
        btnAgregar: async function () {
            const { value: formValues } = await Swal.fire({
                title: 'Agregar',
                html: '<div class="form-group"><div class="row"><label class="col-form-label"></label></div></div><div class="form-group"><div class="row"><label class="col-sm-4 col-form-label text-left">Nombres</label><div class="col-sm-8"><input id="nombre" type="text" class="form-control"></div></div></div><div class="form-group"><div class="row"><label class="col-sm-4 col-form-label text-left">Apellidos</label><div class="col-sm-8"><input id="apellidos" type="text" class="form-control"></div></div></div><div class="form-group"><div class="row"><label class="col-sm-6 col-form-label text-left">Nro. de Identificación</label><div class="col-sm-6"><input id="cod_user" type="number" min="0" class="form-control"></div></div></div><div class="form-group"><div class="row"><label class="col-sm-5 col-form-label text-left">Email Unilibre</label><div class="col-sm-7"><input id="email" type="text" class="form-control"></div></div></div><div class="form-group"><div class="row"><label class="col-sm-4 col-form-label text-left">Contraseña</label><div class="col-sm-8"><input id="pass" type="text" class="form-control"></div></div></div><div class="form-group"><div class="row"><label class="col-sm-4 col-form-label text-left">Rol</label><div class="col-sm-8"><select class="form-control" id="rol"><option value="">Seleccionar</option><option value="1">Docente</option><option value="2">Jefe de Area</option><option value="3">Decano</option></select></div></div></div>',
                focusConfirm: false,
                showCancelButton: true,
                confirmButtonText: 'Guardar',
                confirmButtonColor: '#1cc88a',
                showLoaderOnConfirm: true,
                cancelButtonText: "Cancelar",
                cancelButtonColor: '#CB3234',

                preConfirm: () => {
                    return [
                        this.nombre = Swal.getPopup().querySelector('#nombre').value,
                        this.apellidos = Swal.getPopup().querySelector('#apellidos').value,
                        this.cod_user = Swal.getPopup().querySelector('#cod_user').value,
                        this.email = Swal.getPopup().querySelector('#email').value,
                        this.pass = Swal.getPopup().querySelector('#pass').value,
                        this.rol = Swal.getPopup().querySelector('#rol').value
                    ]
                }
            })

            if (this.nombre == "" || this.apellidos == "" || this.cod_user == 0 || this.email==''|| this.pass==''|| this.rol== 0) 
            {
                Swal.fire({
                    icon: 'info',
                    title: 'Datos incompletos',
                })
            }
            else 
            {
                this.agregarUsuarios();
                const Toast = Swal.mixin(
                {
                    toast: true,
                    position: 'top-end',
                    showConfirmButton: false,
                    timer: 3000
                });

                Toast.fire({
                    icon: 'success',
                    title: '¡Usuario Agregado!'
                })
            }
        },
        btnEditarUser: async function (cod_user,nombre,apellidos,email,pass,rol) { 
            await Swal.fire({
                title: 'EDITAR',
                html:
                '<div class="form-group"><div class="row"><label class="col-form-label"></label></div></div><div class="form-group"><div class="row"><label class="col-sm-4 col-form-label text-left">Nombres</label><div class="col-sm-8"><input id="nombre" value="'+nombre+'" type="text" class="form-control"></div></div></div><div class="form-group"><div class="row"><label class="col-sm-4 col-form-label text-left">Apellidos</label><div class="col-sm-8"><input id="apellidos" value="'+apellidos+'" type="text" class="form-control"></div></div></div><div class="form-group"><div class="row"><label class="col-sm-6 col-form-label text-left">Nro. de Identificación</label><div class="col-sm-6"><input id="cod_user" value="'+cod_user+'"type="number" min="0" class="form-control" disabled></div></div></div><div class="form-group"><div class="row"><label class="col-sm-5 col-form-label text-left">Email Unilibre</label><div class="col-sm-7"><input id="email" value="'+email+'" type="text" class="form-control"></div></div></div><div class="form-group"><div class="row"><label class="col-sm-4 col-form-label text-left">Contraseña</label><div class="col-sm-8"><input id="pass" value="'+pass+'"type="text" class="form-control"></div></div></div><div class="form-group"><div class="row"><label class="col-sm-4 col-form-label text-left">Rol</label><div class="col-sm-8"><select class="form-control" id="rol"><option value="'+rol+'" disabled selected>Seleccionar</option><option value="1">Docente</option><option value="2">Jefe de Area</option><option value="3">Decano</option></select></div></div></div>', 
                focusConfirm: false,
                showCancelButton: true,                         
                }).then((result) => {
                  if (result.value) {                                             
                    nombre = Swal.getPopup().querySelector('#nombre').value,
                    apellidos = Swal.getPopup().querySelector('#apellidos').value,
                    cod_user = Swal.getPopup().querySelector('#cod_user').value,
                    email = Swal.getPopup().querySelector('#email').value,
                    pass = Swal.getPopup().querySelector('#pass').value,
                    rol = Swal.getPopup().querySelector('#rol').value                    
                    
                    console.log("Valor de nombre antes de editar: "+nombre);
                    console.log("Valor de apellidos antes de editar: "+apellidos);
                    console.log("Valor de cod_user antes de editar: "+cod_user);
                    console.log("Valor de email antes de editar: "+email);
                    console.log("Valor de pass antes de editar: "+pass);
                    console.log("Valor de rol antes de editar: "+rol);

                    this.editarUsuarios(cod_user,pass,nombre,apellidos,email,rol);
                    Swal.fire(
                      '¡Actualizado!',
                      'El registro ha sido actualizado.',
                      'success'
                    )                  
                  }
                });
        },

        btnDeshabilitarUser: async function () { },

        //Procedimientos
        listarUsuarios: function(){
            axios.post(url,{opcion:1}).then(response=>{
                this.datosUsuarios = response.data;
                console.log(this.datosUsuarios);
            });
        },

        editarUsuarios: function (cod_user,pass,nombre,apellidos,email,rol){
            axios.post(url, {opcion:2, cod_user:cod_user, pass:pass, nombre:nombre, apellidos:apellidos,email:email,rol:rol }).then(response =>{           
                this.listarUsuarios();           
             });  
        },

        agregarUsuarios: function(){
            axios.post(url,{opcion:4, cod_user:this.cod_user, pass:this.pass, nombre:this.nombre, apellidos:this.apellidos, email:this.email, rol:this.rol}).then(response =>{
                this.listarUsuarios();
            });        
            this.cod_user=0,
            this.pass="",
            this.nombre="",
            this.apellidos="",
            this.email="",
            this.rol=0
        },
    },
    created:function(){
        this.listarUsuarios();
    }
});                                 