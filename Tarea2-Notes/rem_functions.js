$(document).ready(function () {
    $("#btn_add").click(function () {

        remind();

    });


    $("#btn_del_all").click(function () {
        console.log("Eliminando todo...")
        reminder.splice(0, reminder.length); //Borrar todos los elementos del arreglo
        inputs.splice(0, inputs.length);
        $("#notas").html("");    //Limpiar el contenedor de notas
        $("#information").css("visibility", 'hidden'); //Ocultar las instrucciones
        i = 1;
    });


    var i = 1;  //Indice para arreglo de notas
    var reminder = [];  //Arreglo de notas
    var inputs = [];    //Arreglo de contenedores

    // Revisar si se ha dado enter para registar lo que se ingreso en el text box
  
    $("#txt_reminder").on("keyup", function (event) {
        if (event.keyCode === 13) {
            event.preventDefault();
            $("#btn_add").click();
        }
    });






    function add(t) {
        reminder.push({ //Agregar una nueva tarea con id, el texto de la tarea y una bandera para marcarla
            idRem: ('span' + i),
            param: t,
            flag: false
        });
    }

    function remind() {

        var text = $("#txt_reminder").val();

        //Comprobar primero si no está vacío
        if (text != "") {
            add(text);  //Enviar el texto leído del input para guardar en arreglo
            $("#information").css('visibility', 'visible'); //Hacer visible la informacion sobre las tareas

            $("#txt_reminder").val("");
            var id_actual = 'span'+i;
            $("#notas").append(
                
                "<div class='border border-secondary rounded texto '><span class='markable' id="+id_actual+">" + reminder[i - 1].param +
                '</span><img id=' + (i - 1) + ' src="https://cdn.pixabay.com/photo/2017/02/12/21/29/false-2061132_960_720.png" class="ex"></div>'
            );

            console.log(reminder)
            i++;
        }
        else { //Si está vacía desplegar advertencia

            swal({ //Sweet Alert warning
                title: "¡Atención!",
                text: "Debes escribir una tarea para agregarla a la lista",
                icon: "warning"
            });
        }

    }

    $('div').on('click', 'img', function () {
        eliminar(this.id);
    });

    $('div').on('click', '.markable', function () {
        mark(this.id);
    });


    //Eliminar recibe el indice del elemento del arreglo que se quiere borrar
    function eliminar(id_elim) {
        $("#notas").html("");   //Limpiar el contenedor de notas para actualizarlo

        reminder.splice(id_elim, 1);   //Quitar la tarea del arreglo según el índice indicado

        //Ciclo para cambiar ids
        for (let cont = 0; cont < reminder.length; cont++) {
            reminder[cont].idRem = 'span' + (cont + 1);
        }

        console.log(reminder);
        
        for (let cont = 0; cont < reminder.length; cont++) {
            var id_actualizado = 'span'+(cont+1);
            $("#notas").append(
                "<div class='border border-secondary rounded texto '><span class='markable' id="+id_actualizado+">" + reminder[cont].param +
                '</span><img id=' + cont + ' src="https://cdn.pixabay.com/photo/2017/02/12/21/29/false-2061132_960_720.png" class="ex"></div>'
            );


            if (reminder[cont].flag) {   //Si la bandera del elemento indica que no está marcado
                $("#"+reminder[cont].idRem).css('textDecoration', 'line-through');   //El texto se tacha 
            }

        }


        i = reminder.length + 1;  //actualizar el último índice para seguir insertando tareas
    }



    function mark(id_marked) {

        //Buscar en el arreglo el índice en el que coincide el id solicitado para tachar (id_marked) 
        var marked_index = reminder.findIndex(function (element) {
            return element.idRem == id_marked;  //Retorna el índice encontrado
        });

        if (!reminder[marked_index].flag) {   //Si la bandera del elemento indica que no está marcado
            $("#"+id_marked).css('textDecoration', 'line-through');   //El texto se tacha
            reminder[marked_index].flag = true;
        }
        else {   //Si la bandera del elemento indica que está marcado
            $("#"+id_marked).css('textDecoration', 'none');   //Se quita la línea
            reminder[marked_index].flag = false;
        }
    }

});