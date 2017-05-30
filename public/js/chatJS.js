$(document).ready(function (c) {

    //var socket = io.connect("http://localhost:3001");
    //var socket = io.connect("https://winestore.herokuapp.com");
    
    //var socket = io("http://localhost:3000");
    var socket = io();
/*
    socket.on("connection", function (data) {
        console.log(data);
        socket.emit('chat message', "usuario conectado");
        return false;
    });
*/ 
    socket.on('chat message', function (msg) {
        insertChat("you", msg, 0);
    });
    



    var me = {};
    me.avatar = "/images/userchat.png";

    var you = {};
    you.avatar = "/images/adminchat.png";

    function formatAMPM(date) {
        var hours = date.getHours();
        var minutes = date.getMinutes();
        var ampm = hours >= 12 ? 'PM' : 'AM';
        hours = hours % 12;
        hours = hours ? hours : 12; // the hour '0' should be '12'
        minutes = minutes < 10 ? '0' + minutes : minutes;
        var strTime = hours + ':' + minutes + ' ' + ampm;
        return strTime;
    }

    //-- No use time. It is a javaScript effect.
    function insertChat(who, text, time = 0) {
        var control = "";
        var date = formatAMPM(new Date());

        if (who == "me") {

            control = '<li style="width:100%">' +
                '<div class="msj macro">' +
                '<div class="avatar"><img class="img-circle" style="width:100%;" src="' + me.avatar + '" /></div>' +
                '<div class="text text-l">' +
                '<p>' + text + '</p>' +
                '<p><small>' + date + '</small></p>' +
                '</div>' +
                '</div>' +
                '</li>';
        } else {
            control = '<li style="width:100%;">' +
                '<div class="msj-rta macro">' +
                '<div class="text text-r">' +
                '<p>' + text + '</p>' +
                '<p><small>' + date + '</small></p>' +
                '</div>' +
                '<div class="avatar" style="padding:0px 0px 0px 10px !important"><img class="img-circle" style="width:100%;" src="' + you.avatar + '" /></div>' +
                '</li>';
        }
        setTimeout(
            function () {
                $("#contenedorChat").append(control);

            }, time);

    }

    function resetChat() {
        $("ul").empty();
    }

    $(".mytext").on("keyup", function (e) {
        if (e.which == 13) {
            var text = $(this).val();
            if (text != "") {
                insertChat("me", text);
                $(this).val('');
            }
            socket.emit('chat message', text);
        }
    })

    //-- Clear Chat
    resetChat();

    //-- Print Messages
    //insertChat("me", "Hello Tom...", 0);

});