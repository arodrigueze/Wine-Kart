$(document).ready(function () {
    console.log("Ingreso listo para realizar!");

    if (localStorage.username) {
        $('#usernameonpage').text("Bienvenido " + localStorage.username);
    }

    $('#logout').click(function () {
        localStorage.removeItem("username");
        localStorage.removeItem("type");
        $('#usernameonpage').text("Bienvenido");
    });
});