$(document).ready(function () {
    console.log("registro listo para realizar!");
    var usuarios;
    var usernameControl;

    var jqxhr = $.getJSON("/listUser", function (data) {
        usuarios = data;
    });


    $('#submitbtn').click(function () {
        if ($('#pass1RG').val().localeCompare("") == 0 || $('#pass2RG').val().localeCompare("") == 0 || $('#emailRG').val().localeCompare("") == 0 || $('#nameRG').val().localeCompare("") == 0 || $('#usernameRG').val().localeCompare("") == 0) {
            console.log("Los campos no pueden estar vacios");
            $('#regisStatus').hide("slow", function () {
                $('#regisStatus').text('Los campos no pueden estar vacios.').show("slow");
            });
        } else {
            if ($('#pass1RG').val().localeCompare($('#pass2RG').val()) == 0) {
                usernameControl = false;
                $.each(usuarios, function (key, val) {
                    if ($('#usernameRG').val().toLowerCase().localeCompare(val.username_user) == 0)
                        usernameControl = true;
                });

                if (usernameControl) {
                    $('#regisStatus').hide("slow", function () {
                        $('#regisStatus').text('El nombre de usuario ya existe, intenta con uno diferente!').show("slow");
                    });
                } else {
                    var dataUser = {
                        username: $('#usernameRG').val().toLowerCase(),
                        name: $('#nameRG').val(),
                        email: $('#emailRG').val(),
                        pass: $('#pass1RG').val()
                    };

                    $.ajax({
                        method: "POST",
                        url: "/createUser",
                        dataType: 'json',
                        data: { info: JSON.stringify(dataUser) }
                    }).done(function (msg) {
                        console.log(msg);
                    });
                    $('#regisStatus').hide("slow", function () {
                        $('#regisStatus').text('Usuario Registrado correctamente.').show("slow");
                        $('#usernameRG').val("");
                        $('#nameRG').val("");
                        $('#emailRG').val("");
                        $('#pass1RG').val("");
                        $('#pass2RG').val("");
                        var jqxhr2 = $.getJSON("/listUser", function (data) {
                            usuarios = data;
                        });
                        localStorage.setItem("username", dataUser.username);
                        localStorage.setItem("type", "customer");
                        alert(localStorage.getItem("username"));
                        alert(localStorage.getItem("type"));
                    });
                }
            } else {
                console.log("no coinciden las contraseñas");
                $('#regisStatus').hide("slow", function () {
                    $('#regisStatus').text('Las contraseñas no coinciden').show("slow");
                });
            }
        }
    });



});