$(function(){
    $( "#name" ).keypress(function( event ) { if ( event.which == 13 ) { event.preventDefault(); VALENTINE.nameConfirm(); } });
    $( "#msg" ).keypress(function( event ) { if ( event.which == 13 ) { event.preventDefault(); VALENTINE.msgConfirm(); } });
    $( "#link" ).keypress(function( event ) { if ( event.which == 13 ) { event.preventDefault(); VALENTINE.copy(); } });

    $( "#login" ).on({
        click: function() {
            VALENTINE.login();
            ga('send', 'event', 'button', 'click', 'login');
        }
    });

    $( "#name .button" ).on({
        click: VALENTINE.nameConfirm,
        keypress: VALENTINE.nameConfirm
    });

    $( "#msg .button" ).on({
        click: VALENTINE.msgConfirm,
        keypress: VALENTINE.msgConfirm
    });

    $( "#link .button" ).on({
        click: VALENTINE.copy,
        keypress: VALENTINE.copy
    });

    VALENTINE.count();

    var client = new ZeroClipboard( document.getElementById("copy-button") );

    client.on( "ready", function( readyEvent ) {
      // alert( "ZeroClipboard SWF is ready!" );

        client.on( "copy", function (event) {
            var clipboard = event.clipboardData;
            var val = 'http://' + document.location.host + '/valentine_card.html?id=' + VALENTINE.id;
            clipboard.setData("text/plain", val);
        });

        client.on( "aftercopy", function( event ) {
            // `this` === `client`
            // `event.target` === the element that was clicked
            // event.target.style.display = "none";  
            alert("複製成功: " + event.data["text/plain"] );
        } );
    } );
});