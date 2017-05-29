$(document).ready(function () {
    var productos;
    var imagenProducto;
    var producto;
    var carrito = [];
    var itemAdd;
    var imagen;
    var controlImagen;
    console.log("En single!");

    if (!localStorage.totalplusitems) {
        localStorage.setItem("totalplusitems", 0);
        localStorage.setItem("totalplusitemscount", 0);
    }

    if (localStorage.username) {
        $('#usernameonpage').text("Bienvenido " + localStorage.username);
    }

    //localStorage.removeItem("productosEnCarrito");

    if (localStorage.productosEnCarrito) {
        carrito = JSON.parse(localStorage.getItem("productosEnCarrito"));
        if (localStorage.singleData) {
            for (i = 0; i < carrito.length; i++) {
                if (carrito[i].nombre.localeCompare(localStorage.singleData) == 0) {
                    $("#cantidadProductoSingle").val(carrito[i].cantidad);
                    break;
                }
            }
        }
    }

    $("#etalage").empty();
    var jqxhr = $.getJSON("/listProducts", function (data) {
        productos = data;
        var jqxhr3 = $.getJSON("/listImageProduct", function (data1) {
            imagenProducto = data1;
            if (localStorage.singleData) {
                $.each(productos, function (key, val) {
                    if (val.name_product.localeCompare(localStorage.singleData) == 0) {
                        producto = val;
                        return false;
                    }
                });
                console.log(producto);
                controlImagen = false;
                $.each(imagenProducto, function (key, val) {
                    if (val.name_product.localeCompare(localStorage.singleData) == 0) {
                        if (!controlImagen) {
                            imagen = val.url_image_product;
                        }
                        var $li = $("<li></li>");
                        var $img1 = $("<img class='etalage_thumb_image' src='" + val.url_image_product + "' />");
                        var $img2 = $("<img class='etalage_source_image' src='" + val.url_image_product + "' />");
                        $li.append($img1);
                        $li.append($img2);
                        $("#etalage").append($li);
                    }
                });

                $('#etalage').etalage({
                    thumb_image_width: 300,
                    thumb_image_height: 400,
                    source_image_width: 700,
                    source_image_height: 800,
                    show_hint: true,
                    click_callback: function (image_anchor, instance_id) {
                        alert('Callback example:\nYou clicked on an image with the anchor: "' + image_anchor + '"\n(in Etalage instance: "' + instance_id + '")');
                    }
                });
                // This is for the dropdown list example:
                $('.dropdownlist').change(function () {
                    etalage_show($(this).find('option:selected').attr('class'));
                });

                var precioDesc = parseInt(producto.price_product);
                if (localStorage.type) {
                    precioDesc = producto.price_product - (producto.price_product * 0.1);
                }
                var totalString = " " + precioDesc.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,");
                $('#nombreProducto').text(producto.name_product);
                $('#precioProducto').text("$ " + totalString);
                $('#categoriaProducto').text(producto.category_product);
                $('#descripcionProducto').text(producto.description_product);

            }
        });
    });

    //funcion agregar al carrito
    $("#btnAgregarCarrito").click(function () {
        var prodName = localStorage.singleData;
        var control = false;
        var popupName = "myPopup" + prodName;

        if (carrito.length > 0) {
            for (i = 0; i < carrito.length; i++) {
                if (carrito[i].nombre.localeCompare(prodName) == 0) {
                    carrito[i].cantidad = $("#cantidadProductoSingle").val();
                    localStorage.removeItem("productosEnCarrito");
                    localStorage.setItem("productosEnCarrito", JSON.stringify(carrito));
                    control = true;
                    break;
                }
            }
            if (!control) {
                itemAdd = { nombre: prodName, cantidad: $("#cantidadProductoSingle").val(), precio: producto.price_product, categoria: producto.category_product, image: imagen };
                carrito.push(itemAdd);
                localStorage.removeItem("productosEnCarrito");
                localStorage.setItem("productosEnCarrito", JSON.stringify(carrito));
            }
        } else {
            itemAdd = { nombre: prodName, cantidad: $("#cantidadProductoSingle").val(), precio: producto.price_product, categoria: producto.category_product, image: imagen };
            carrito.push(itemAdd);
            localStorage.setItem("productosEnCarrito", JSON.stringify(carrito));
        }
        var cont = 0;
        var tott = 0;
        for (i = 0; i < carrito.length; i++) {
            cont = cont+carrito[i].cantidad;
            tott = tott +parseInt(carrito[i].precio)*parseInt(carrito[i].cantidad);
            console.log(carrito[i]);
        }

        var totTem = " " + tott.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,");   

        localStorage.totalplusitems=totTem;
        localStorage.totalplusitemscount = cont;

        

        $('.simpleCart_total').text("$ "+localStorage.totalplusitems);
        $('.simpleCart_quantity').text(localStorage.totalplusitemscount);

        var popup = document.getElementById("myPopup");
        popup.classList.toggle("show");
        setTimeout(function () { popup.classList.toggle("show"); }, 2000);
    });

    $('#logout').click(function () {
        localStorage.removeItem("username");
        localStorage.removeItem("type");
        $('#usernameonpage').text("Bienvenido");
        var precioDesc = producto.price_product;
        if (localStorage.type) {
            precioDesc = producto.price_product - (producto.price_product * 0.1);
        }
        $('#precioProducto').text("$ " + precioDesc);
    });
});