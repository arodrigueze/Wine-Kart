$(document).ready(function () {

    var categorias;
    var productos;
    console.log("JS de registro productos y categorias");
    var jqxhr2 = $.getJSON("/listCategory", function (data) {
        categorias = data;
        $("#listaCategorias").empty();
        $.each(categorias, function (key, val) {
            cargarCategorias(val._id, val.name_category);
            console.log(val.name_category);
        });
    });

    var jqxhr3 = $.getJSON("/listProducts", function (data) {
        productos = data;
        $("#listaProductos").empty();
        $.each(productos, function (key, val) {
            cargarProductos(val._id, val.name_product);
            console.log(val.name_product);
        });
    });

    if (localStorage.username) {
        if (localStorage.type.localeCompare("admin") == 0) {
            $('#usernameonpage').text("Bienvenido " + localStorage.username);
        } else {
            window.location.replace("/loginAdmin");
        }
    } else {
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

    $('#submitbtnProd').click(function () {
        if ($('#name').val().localeCompare("") == 0 || $('#description').val().localeCompare("") == 0 || $('#price').val().localeCompare("") == 0 || $('#listaCategorias').has('option').length == 0) {
            console.log("Los campos no pueden estar vacios");
            console.log($('#name').val());
            console.log($('#description').val());
            console.log($('#price').val());
            console.log($('#listaCategorias').has('option').length);
            $('#regisProdStatus').hide("slow", function () {
                $('#regisProdStatus').text('Los campos no pueden estar vacios.').show("slow");
            });
        } else {
            if (!isNaN($('#price').val())) {
                var productoControl = false;
                $.each(productos, function (key, val) {
                    if ($('#usernameRG').val().toLowerCase().localeCompare(val.name_product) == 0)
                        productoControl = true;
                });

                if (productoControl) {
                    $('#regisProdStatus').hide("slow", function () {
                        $('#regisProdStatus').text('El nombre de Producto ya existe, intenta con uno diferente!').show("slow");
                    });
                } else {
                    var dataProduct = {
                        name_product: $('#name').val().toLowerCase(),
                        price_product: $('#price').val(),
                        category_product: $('#listaCategorias option:selected').text(),
                        description_product: $('#description').val()
                    };
                    console.log(dataProduct);
                    $.ajax({
                        method: "POST",
                        url: "/createProduct",
                        dataType: 'json',
                        data: { info: JSON.stringify(dataProduct) }
                    }).done(function (msg) {
                        console.log("Producto Registrado ok");
                        $('#regisProdStatus').hide("slow", function () {
                            $('#regisProdStatus').text('Producto Registrado correctamente.').show("slow");
                            $('#name').val("");
                            $('#price').val("");
                            $('#description').val("");
                            var jqxhr0 = $.getJSON("/listProducts", function (data) {
                                productos = data;
                                $("#listaProductos").empty();
                                $.each(productos, function (key, val) {
                                    cargarProductos(val._id, val.name_product);
                                    console.log(val.name_product);
                                });
                            });
                        });
                    });
                }
            } else {
                console.log("El precio debe ser un numero");
                $('#regisProdStatus').hide("slow", function () {
                    $('#regisProdStatus').text('El precio debe ser un numero').show("slow");
                });
            }
        }
    });

    $('#submitbtnCategoria').click(function () {
        if ($('#nameCategoria').val().localeCompare("") == 0) {
            $('#regisCategoriaStatus').hide("slow", function () {
                $('#regisCategoriaStatus').text('Los campos no pueden estar vacios.').show("slow");
            });
        } else {
            var categoriaControl = false;
            $.each(categorias, function (key, val) {
                if ($('#nameCategoria').val().toLowerCase().localeCompare(val.name_category) == 0)
                    categoriaControl = true;
            });
            if (categoriaControl) {
                $('#regisCategoriaStatus').hide("slow", function () {
                    $('#regisCategoriaStatus').text('La categoria ya existe.').show("slow");
                    $('#nameCategoria').val("");
                });
            } else {
                var dataCategoria = {
                    categoryName: $('#nameCategoria').val().toLowerCase()
                };
                $.ajax({
                    method: "POST",
                    url: "/createCategory",
                    dataType: 'json',
                    data: { info: JSON.stringify(dataCategoria) }
                }).done(function (msg) {
                    console.log("Registrado categoria ok");
                    $('#regisCategoriaStatus').hide("slow", function () {
                        $('#regisCategoriaStatus').text('Categoria Registrada correctamente.').show("slow");
                        $('#nameCategoria').val("");
                        var jqxhr5 = $.getJSON("/listCategory", function (data) {
                            categorias = data;
                            $("#listaCategorias").empty();
                            $.each(categorias, function (key, val) {
                                cargarCategorias(val._id, val.name_category);
                            });
                        });
                        console.log(categorias);
                    });
                });
            }
        }
    });

    //-----------------------------------------------------------------------
    //Cargar categorias
    function cargarCategorias(id, name) {
        var $newOption = $("<option>" + name + "</option>");
        $newOption.attr("id", id);
        $("#listaCategorias").append($newOption);
    }

    //-----------------------------------------------------------------------
    //Cargar Productos
    function cargarProductos(id, name) {
        var $newOption = $("<option>" + name + "</option>");
        $newOption.attr("id", id);
        $("#listaProductos").append($newOption);
    }
});


