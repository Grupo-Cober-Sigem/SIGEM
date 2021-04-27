var url = "../../../php/admin/planaula/planaula.php";
var appUsuarios = new Vue({
    el: "#seccionPlanes",
    data: {
        datosPlan: [],
        codigo: 0,
        nombre: "",
        ubicacion: "",
        preRequisitos: "",
        periodo: "",
        bloque: "",
        aula: ""
    },
    methods: {
        btnEditarPlan: async function (codigo,preRequisitos,periodo,bloque,aula) {
            const { value: formValues } = await Swal.fire({
                title: 'Editar',
                html:
                    '<div class="row"><div class="col-sm-8"><div class="form-group">'+
/*preRequisitos*/   '<label for="preRequisitos">Pre - Requesitos</label><select class="form-control" id="preRequisitos">'+
                        '<option value="'+preRequisitos+'" disabled>'+preRequisitos+'</option>'+
                        '<option value="Aplica">Aplica</option>'+
                        '<option value="No Aplica">No Aplica</option></select></div></div><div class="col-sm-4"><div class="form-group">'+
/*Periodo*/         '<label for="periodo">Año</label><input type="text" class="form-control" placeholder="Año" id="periodo" value="'+periodo+'"></div></div></div>'+
                    '<div class="row"><div class="col">'+
/*Bloque*/          '<label for="bloque">Bloque</label><input type="text" class="form-control" placeholder="Ubicación del bloque" id="bloque" value="'+bloque+'"></div><div class="col">'+
/*Aula*/            '<label for="aula">Aula</label><input type="text" class="form-control" placeholder="Aula de la clase" id="aula" value="'+aula+'"></div></div>'+
                    '<div class="form-group"><div class="row">'+
                    '<label class="col-form-label"></label></div></div><div class="row"><div class="col"></div></div>',
                focusConfirm: false,
                showCancelButton: true,
                confirmButtonText: 'Guardar',
                confirmButtonColor: '#1cc88a',
                showLoaderOnConfirm: true,
                cancelButtonText: "Cancelar",
                cancelButtonColor: '#CB3234',

                preConfirm: () => {
                    
                    return [
                        this.codigo = codigo,
                        this.preRequisitos = Swal.getPopup().querySelector('#preRequisitos').value,
                        this.periodo = Swal.getPopup().querySelector('#periodo').value,
                        this.bloque = Swal.getPopup().querySelector('#bloque').value,
                        this.aula = Swal.getPopup().querySelector('#aula').value
                    ]
                }
            })
            if (this.codigo=="" || this.preRequisitos == "" || this.periodo=="" || this.bloque=="" || this.aula=="") {
                Swal.fire({
                    type: 'info',
                    title: 'Datos incompletos',
                })
            }
            else {
                this.editarPlan();
                const Toast = Swal.mixin({
                    toast: true,
                    position: 'top-end',
                    showConfirmButton: false,
                    timer: 3000
                });
                Toast.fire({
                    type: 'success',
                    title: 'El registro ha sido actualizado.'
                })
            }
        },

        //Procedimientos
        listarPlan: function(){
            axios.post(url,{opcion:1}).then(response=>{
                this.datosPlan = response.data;
                console.log(this.datosPlan);
            });
        },

        editarPlan: function(codigo,preRequisitos,periodo,bloque,aula){
            axios.post(url, {opcion:2, codigo:codigo, preRequisitos:preRequisitos, periodo:periodo, bloque:bloque, aula:aula }).then(response =>{
                this.listarPlan();
            });        
        },

        btnFiltrarPlan: async function()
        {
            let nombre = document.getElementById("campoBusqueda").value;

            switch(nombre)
            {
                case "":
                    this.listarPlan();
                    break;

                case null:
                    this.listarPlan();
                    break;
                
                default:
                    axios.post(url,{opcion:3,codigo:nombre}).then(response=>{
                        this.datosPlan = response.data;
                        console.log(this.datosPlan);
                        nombre="";
                    });
                    break;
            }
        },
    },
    created:function(){
        this.listarPlan();
    }
});                                 