var rol= localStorage.getItem("rol");

switch(rol)
{
    case "2":
        break;

    default:
        document.location.href="/";
}

function cerrarSesion(){
    
    localStorage.clear();
    document.location.href="/";
}