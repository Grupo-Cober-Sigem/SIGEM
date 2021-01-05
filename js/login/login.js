$(document).ready(function(){
    $('#btnIngreso').click(function(){
        
        cadena= "Cod_User=" + parseInt($('#Usuario').val())+
                "Pass=" + $('#Pass').val();

                $.ajax({
                    type:"POST",
                    url:"../../../PHP/logica.iniciarSesion.php",
                    data:cadena,
                    success:function(res){
                        if(r==1)
                        {
                            window.location=""
                        }
                    }
                });
    });
});