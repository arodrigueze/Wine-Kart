$(document).ready(function (c) {

    console.log("En carrito de compras.")
    var carrito;

    if (localStorage.username) {
        $('#usernameonpage').text("Bienvenido " + localStorage.username);
    }

    $("#contenedorProductos").empty();
    $("#contenedorProductos").append("<h2>Mi carrito de compras</h2>");

    if (localStorage.productosEnCarrito) {
        carrito = JSON.parse(localStorage.getItem("productosEnCarrito"));
        for (i = 0; i < carrito.length; i++) {
            cargarCarrito(carrito[i]);
        }
        calcularTotal();
    } else { calcularTotal() }

    //cargar elementos en pagina
    function cargarCarrito(productoEnCarrito) {
        var precioDesc = parseInt(productoEnCarrito.precio);

        if (localStorage.type) {
            precioDesc = productoEnCarrito.precio - (productoEnCarrito.precio * 0.1);
        }
        var totalString1 = " " + precioDesc.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,");
        var $loadImagen = $("<div class='cart-item cyc'><img src='" + productoEnCarrito.image + "' /></div>");
        var $dataProduc = $("<div class='cart-item-info'><h3>" + productoEnCarrito.nombre + "<span>" + productoEnCarrito.categoria + "</span></h3><h4><span>Cop. $ </span>" + totalString1 + "</h4><p class='qty'>Qty ::</p><input min='1' type='text' id='quantity' name='quantity' value='" + productoEnCarrito.cantidad + "' class='form-control input-small' disabled></div><div class='clearfix'></div>");
        var $dataAdicio = $("<div class='delivery'><p>Cargos de Envío:: Cop. 5,000.00</p><span>Entrega en 30 min.</span><div class='clearfix'></div></div>");
        var $contenedor1 = $("<div class='cart-sec'></div>");
        $contenedor1.append($loadImagen);
        $contenedor1.append($dataProduc);
        $contenedor1.append($dataAdicio);
        var $cierre = $("<div class='close1' id='cierre" + productoEnCarrito.nombre + "'> </div>");
        var $contenedor = $("<div class='cart-header' id='producto" + productoEnCarrito.nombre + "'></div>");
        $contenedor.append($cierre);
        $contenedor.append($contenedor1);
        $("#contenedorProductos").append($contenedor);
    }

    $(document).on('click', "div.close1", function () {
        var elemento = "" + $(this).attr('id');
        elemento = elemento.replace("cierre", "");
        for (i = 0; i < carrito.length; i++) {
            console.log("nombre " + carrito[i].nombre + " nombre 2" + elemento);

            if (elemento.localeCompare(carrito[i].nombre) == 0) {
                carrito.splice(i, 1);
                if (carrito.length == 0) {
                    localStorage.removeItem("productosEnCarrito");
                    break;
                } else {
                    localStorage.removeItem("productosEnCarrito");
                    localStorage.setItem("productosEnCarrito", JSON.stringify(carrito));
                    break;
                }
            }
        }
        $("#contenedorProductos").empty();
        $("#contenedorProductos").append("<h2>Mi carrito de compras</h2>");
        for (i = 0; i < carrito.length; i++) {
            cargarCarrito(carrito[i]);
        }
        calcularTotal();
    });

    $('#logout').click(function () {
        localStorage.removeItem("username");
        localStorage.removeItem("type");
        $('#usernameonpage').text("Bienvenido");
        $("#contenedorProductos").empty();
        $("#contenedorProductos").append("<h2>Mi carrito de compras</h2>");
        if (localStorage.productosEnCarrito) {
            carrito = JSON.parse(localStorage.getItem("productosEnCarrito"));
            for (i = 0; i < carrito.length; i++) {
                cargarCarrito(carrito[i]);
            }
        }
        calcularTotal();
    });

    function calcularTotal() {
        var total = 0;
        var cantidadTemp = 0;

        if (carrito) {
            for (i = 0; i < carrito.length; i++) {
                total = total + parseInt(carrito[i].precio) * parseInt(carrito[i].cantidad);
                cantidadTemp = cantidadTemp + parseInt(carrito[i].cantidad);
            }
            localStorage.totalplusitems = total;
            localStorage.totalplusitemscount = cantidadTemp;

            var totTem = " " + parseInt(localStorage.totalplusitems).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,");
            $('.simpleCart_total').text(totTem);
            $('.simpleCart_quantity').text(localStorage.totalplusitemscount);

            var totalString = " " + total.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,");
            console.log("total " + totalString);
            $('#totalPrecio').text(totalString);
            var precioDesc = total;
            if (localStorage.type) {
                precioDesc = total - (total * 0.1);
                $('#descuentoField').text("10%");
            } else {
                $('#descuentoField').text("---");
            }

            if (precioDesc == 0) {
                $('#totalFinal').text("0");
            } else {
                precioDesc = precioDesc + 5000;
                var totalString2 = " " + precioDesc.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,");
                $('#totalFinal').text(totalString2);
            }
        } else {
            $('#totalPrecio').text("0");
            $('#descuentoField').text("---");
            $('#totalFinal').text("0");
        }




    }
});

