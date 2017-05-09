$(document).ready(function () {

    if (localStorage.username) {
        if(localStorage.type.localeCompare("admin")==0){
            $('#usernameonpage').text("Bienvenido " + localStorage.username);
        }else{
            window.location.replace("/loginAdmin");
        }
    }else{
        window.location.replace("/loginAdmin");
    }


    $('#closeDiag').click(function () {
        Avgrund.hide();
        window.location.replace("/loginAdmin");
    });

    $('#logout').click(function () {
        localStorage.removeItem("username");
        localStorage.removeItem("type");
        $('#usernameonpage').text("Bienvenido");
        window.location.replace("/loginAdmin");
    });

   
   
});