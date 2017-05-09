$(document).ready(function () {
    console.log("Ingreso listo para realizar!");

    if (localStorage.username) {
        $('#usernameonpage').text("Bienvenido " + localStorage.username);
    }

    $('#closeDiaglogin').click(function () {
        Avgrund.hide();
        window.location.replace("/");
    });

    $('#logout').click(function () {
        localStorage.removeItem("username");
        localStorage.removeItem("type");
        $('#usernameonpage').text("Bienvenido");
    });

    $('#submitbtnlogin').click(function () {
        if ($('#username_login').val().localeCompare("") == 0 || $('#password_login').val().localeCompare("") == 0) {
            console.log("Los campos no pueden estar vacios");
            $('#loginStatus').hide("slow", function () {
                $('#loginStatus').text('Los campos no pueden estar vacios.').show("slow");
            });
        } else {
            var dataUser = {
                username: $('#username_login').val().toLowerCase(),
                password: $('#password_login').val()
            };

            $.ajax({
                method: "POST",
                url: "/loginUser",
                dataType: 'json',
                data: { info: JSON.stringify(dataUser) },
                statusCode: {
                    500: function () {
                        $('#loginStatus').hide("slow", function () {
                            $('#loginStatus').text('Error en el acceso, intenta nuevamente.').show("slow");
                        });
                    }
                },
                success: function (data) {
                    if (data) {
                        console.log("login ok");
                        console.log(data);
                        $('#loginStatus').hide("slow", function () {
                            $('#loginStatus').text('Ingreso usuario correctamente.').show("slow");
                            $('#username_login').val("");
                            $('#password_login').val("");
                            Avgrund.show("#default-popup");
                            localStorage.setItem("username", data.username_user);
                            localStorage.setItem("type", data.type_user);
                            $('#usernameonpage').text("Bienvenido " + dataUser.username);
                        });
                    }
                }
            });
            console.log("Regreso de login");

        }
    });
});