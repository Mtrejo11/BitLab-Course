$(document).ready(function () {
    $("#btn-get-usuarios").click(function () {
        console.log("Funciona");
       
        getUsers();
    }

    );


    function getUsers() {
        $.ajax({
            url: "https://mini-shop-rg.herokuapp.com/products",
            type: "GET",
            dataType: "json",
            success: function (respuesta) {
                console.log(respuesta);
                var collectionProducts = respuesta;
                $('#lista-productos').html('');
                for(var i=0;i<collectionProducts.length;i++){
                    var product =collectionProducts[i];

                    $("#lista-productos").append(
                        '<div class="card col-md-3 m-4" style=""><img class="card-img-top" src="'+product.image+'" alt="Card image cap">'+
                        '<div class="card-body"> <h5 class="card-title">'+product.name+'</h5>'+
                        '<p class="card-text">'+product.description+'</p>'+
                        '<p class="card-text">Price: $'+product.price+'</p>'+
                        '<a href="javascript:void(0)" class="btn btn-primary">ADD TO CART</a></di></div>'
                    );
                    console.log(product);
                }

            },
            error: function (error) {
                alert("Ha ocurrido el error "+error);
            },
            complete: function(status){
                console.log("Peticion finalizada");
            }
        });
    }






});