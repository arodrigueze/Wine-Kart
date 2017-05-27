$(document).ready(function () {

    var categorias;
    var productos;
    var proImages;
    var jqxhr1;
    var jqxhr2;
    var jqxhr3;

    jqxhr1 = $.getJSON("/listCategory", function (data) {
        categorias = data;
        $("#contenedorCategorias").empty();
        $.each(categorias, function (key, val) {
            cargarCategorias(val._id, val.name_category);
        });
        jqxhr3 = $.getJSON("/listImageProduct", function (data) {
            proImages = data;
            jqxhr2 = $.getJSON("/listProducts", function (data) {
                productos = data;
                $("#listaProductos").empty();
                $.each(productos, function (key, val) {
                    cargarProductos(val);
                });
            });
        });
    });

    if (localStorage.username) {
        $('#usernameonpage').text("Bienvenido " + localStorage.username);
    }

    $('#logout').click(function () {
        localStorage.removeItem("username");
        localStorage.removeItem("type");
        $('#usernameonpage').text("Bienvenido");
    });


    //-----------------------------------------------------------------------
    //Cargar categorias
    function cargarCategorias(id, name) {
        var $newAnchor = $("<a></a>");
        var $parrafo = $("<p>" + name + "</p>");
        $newAnchor.attr("href", "#");
        $newAnchor.attr("id", id);
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

        var $contenedor = $("<div class='col-sm-4 col-lg-4 col-md-4'></div>");  
        var $anchor = $("<a href='/single'></a>");  
        var $moreProduct = $("<div class='more-product'><span> </span></div>");
        var $lowMoreProduct = $("<div class='product-img b-link-stripe b-animate-go  thickbox'></div>");
        var $imageInsideLP = $("<img src="+imagen+" class='img-responsive'' alt='' />");
        var $lowImageInsideLP = $("<div class='b-wrapper'></div>");
        var $h4 = $("<h4 class='b-animate b-from-left  b-delay03'></h4>");
        var $botonCA = $("<button class='btns'>COMPRA AHORA!</button>");
        $h4.append($botonCA);
        $lowImageInsideLP.append($h4);
        $lowMoreProduct.append($imageInsideLP);
        $lowMoreProduct.append($lowImageInsideLP);
        $anchor.append($moreProduct);
        $anchor.append($lowMoreProduct);
        var $lowAnchor = $("<div class='product-info simpleCart_shelfItem'></div>");
        var $proInfo = $("<div class='product-info-cust prt_name'></div>");
        var $h4proInfo = $("<h4>"+producto.name_product+"</h4>");
        var $precio = $("<span class='item_price'>$"+producto.price_product+"</span>");
        var $agregar = $("<input type='button' class='item_add items' value='ADD'>");
        var $clearFix =$("<div class='clearfix'> </div>");
        $proInfo.append($h4proInfo);
        $proInfo.append($precio);
        $proInfo.append($agregar);
        $lowAnchor.append($proInfo);
        $lowAnchor.append($clearFix);
        $contenedor.append($anchor);
        $contenedor.append($lowAnchor);
        $("#contenedorProductos").append($contenedor);
    }
});