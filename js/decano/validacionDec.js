var rol= localStorage.getItem("rol");

switch(rol)
{
    case "3":
        break;

    default:
        document.location.href="/";
}

function cerrarSesion(){
    
    localStorage.clear();
    document.location.href="/";
}