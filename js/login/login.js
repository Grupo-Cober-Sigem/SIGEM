$(document).ready(function(){
    $('#loginForm').submit(function(event){

        event.preventDefault();

        var cadena= "Cod_User=" + parseInt($('#Usuario').val())+
                    "Pass=" + $('#Pass').val();

        $.ajax({
            type:"POST",
            url:"../../PHP/logica/iniciarSesion.php",
            data:cadena,
            success:function(res){

                switch(res){
                    case 1:
                        window.location="./pages/administrador/indexadmin.html";
                        break;
                    case 2:
                        window.location="./pages/decano/indexdec.html";
                        break;
                    case 3:
                        window.location="./pages/jefearea/indexja.html";
                        break;
                    case 4:
                        window.location="./pages/docentes/indexdoc.html";
                        break;
                    default:
                        alertify.alert('Lo lamentamos, pero su usuario no se encuentra en el sistema.');
                }
            }
        });
    });
});