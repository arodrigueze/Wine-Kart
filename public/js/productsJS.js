$(document).ready(function () {

    var categorias;
    var productos;
    var proImages;
    var itemAdd;
    var jqxhr1;
    var jqxhr2;
    var jqxhr3;

    if (localStorage.username) {
        $('#usernameonpage').text("Bienvenido " + localStorage.username);
    }

    jqxhr1 = $.getJSON("/listCategory", function (data) {
        categorias = data;
        $("#contenedorCategorias").empty();
        $.each(categorias, function (key, val) {
            cargarCategorias(val._id, val.name_category);
        });
        jqxhr3 = $.getJSON("/listImageProduct", function (data1) {
            proImages = data1;
            jqxhr2 = $.getJSON("/listProducts", function (data2) {
                productos = data2;
                $("#listaProductos").empty();
                $.each(productos, function (key, val) {
                    cargarProductos(val);
                });
            });
        });
    });

    $('#logout').click(function () {
        localStorage.removeItem("username");
        localStorage.removeItem("type");
        $('#usernameonpage').text("Bienvenido");
        $("#contenedorProductos").empty();
        $.each(productos, function (key, val) {
            cargarProductos(val);
        });
    });

    //filtro menor a 50000
    $('#filtroMenor100000').click(function () {
        $("#contenedorProductos").empty();
        $.each(productos, function (key, val) {
            if(parseInt(val.price_product)<100000){
                cargarProductos(val);
            }
        });
    });

    //filtro mayor a 150000
    $('#mayor150000').click(function () {
        $("#contenedorProductos").empty();
        $.each(productos, function (key, val) {
            if(parseInt(val.price_product)>150000){
                cargarProductos(val);
            }
        });
    });

    //filtro menor a 50000
    $('#filtroMenor50000').click(function () {
        $("#contenedorProductos").empty();
        $.each(productos, function (key, val) {
            if(parseInt(val.price_product)<50000){
                cargarProductos(val);
            }
        });
    });

    //funcion ir a single data
    $(document).on('click', "a.toSingle", function () {
        var prodName = $(this).attr('id') + "";
        localStorage.setItem("singleData", prodName);
        console.log("Redireccion a single con " + prodName);
        window.location.replace("/single");
    });

    //funcion cargar cat
    $(document).on('click', "a.classCategory", function () {
        var catName = $(this).attr('name') + "";
        console.log("nombre cat "+catName);
        $("#contenedorProductos").empty();
        $.each(productos, function (key, val) {
            if(catName.localeCompare(val.category_product)==0){
                cargarProductos(val);
            }
        });
    });
    //-----------------------------------------------------------------------
    //Cargar categorias
    function cargarCategorias(id, name) {
        var $newAnchor = $("<a class='classCategory'></a>");
        var $parrafo = $("<p>" + name + "</p>");
        $newAnchor.attr("id", id);
        $newAnchor.attr("name", name);
        $newAnchor.append($parrafo);
        $("#contenedorCategorias").append($newAnchor);
    }

    //-----------------------------------------------------------------------
    //Cargar Productos
    function cargarProductos(producto) {
        var imagen;
        $.each(proImages, function (key, val) {
            if (val.name_product.localeCompare(producto.name_product) == 0) {
                imagen = val.url_image_product;
                console.log("Producto " + producto.name_product + " Imagen " + val.url_image_product);
                return false;
            }
        });

        var precioDesc = parseInt(producto.price_product);
        if (localStorage.type) {
            precioDesc = producto.price_product - (producto.price_product * 0.1);
        }

        var $contenedor = $("<div class='col-sm-4 col-lg-4 col-md-4'></div>");
        var $anchor = $("<a href='#'class='toSingle' id='" + producto.name_product + "'></a>");
        var $moreProduct = $("<div class='more-product'><span> </span></div>");
        var $lowMoreProduct = $("<div class='product-img b-link-stripe b-animate-go  thickbox'></div>");
        var $imageInsideLP = $("<img src=" + imagen + " class='img-responsive'' alt='' />");
        var $lowImageInsideLP = $("<div class='b-wrapper'></div>");
        var $h4 = $("<h4 class='b-animate b-from-left  b-delay03'></h4>");
        var $botonCA = $("<button class='btns compraAhora'>COMPRA AHORA!</button>");
        $h4.append($botonCA);
        $lowImageInsideLP.append($h4);
        $lowMoreProduct.append($imageInsideLP);
        $lowMoreProduct.append($lowImageInsideLP);
        $anchor.append($moreProduct);
        $anchor.append($lowMoreProduct);
        var $lowAnchor = $("<div class='product-info simpleCart_shelfItem'></div>");
        var $proInfo = $("<div class='product-info-cust prt_name'></div>");
        var $h4proInfo = $("<h5>" + producto.name_product + "</h5>");
        var totalString = " " + precioDesc.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,");
        var $precio = $("<span class='item_price'>$" + totalString + "</span><br><span>"+producto.category_product+"</span><br>");

        var $clearFix = $("<div class='clearfix'> </div>");
        $proInfo.append($h4proInfo);
        $proInfo.append($precio);
        $lowAnchor.append($proInfo);
        $lowAnchor.append($clearFix);
        $contenedor.append($anchor);
        $contenedor.append($lowAnchor);
        $("#contenedorProductos").append($contenedor);
    }
});