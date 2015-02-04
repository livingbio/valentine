var VALENTINE = {
    num: 0,
    resourse: "/valentine/api/valentineinfo",
    id: undefined,
    photo: undefined,
    name: undefined,
    fbid: undefined,
    success: 0,

    login: function () {

        var that = this;

        FB.login(function(response) {

            if (response.authResponse) {

                // console.log('Welcome!  Fetching your information.... ');
                //console.log(response); // dump complete info
                access_token = response.authResponse.accessToken; //get access token
                user_id = response.authResponse.userID; //get FB UID

                FB.api('/me', function(response) {
                    // console.log('Successful login for: ' + response.id);
                    that.name = response.name;
                    that.fbid = response.id;
                    that.display();        
                });

                FB.api('/me/picture?width=200&height=200', function(response) {
                    that.photo = response.data.url;
                    that.display();             
                });

            } else {
                //user hit cancel button
                console.log('User cancelled login or did not fully authorize.');

            }

        }, {
            scope: 'publish_stream,email,user_about_me,user_photos'
        });
    },


    display: function () {

        this.num+=1;

        if(this.num == 2) {
            $('#login').css('display','none');
            $('#flow').css('display','block');
        }
    },

    finish: function (obj, o) {
        $(obj).removeClass('active').addClass('completed');
        $(o).css('display','none');
    },

    start: function (obj, o) {
        $(obj).removeClass('disabled').addClass('active');
        $(o).css('display','table');
    },

    nameConfirm: function (event) {
        // if(event.type == 'click' || event.which == 13 ) {            
            var name = $('#name input').val();
            var validate = VALENTINE.validate(name, 10, "告白對象暱稱不可以超過五個字唷（英文不可以超過十個字）!");

            if (validate) {
                var a = confirm("確定要告白的對象叫做『" + name + "』");
            }

            if (a && validate) {
                VALENTINE.finish('#step1', '#name');
                VALENTINE.start('#step2', '#msg');
                $('#msg input').focus();
            } else {
                return false
            }
        // }
    },

    msgConfirm: function () {
        // if(event.type == 'click' || event.which == 13 ) {
            var msg = $('#msg input').val();
            var validate = VALENTINE.validate(msg, 40, "告白對象暱稱不可以超過二十個字唷（英文不可以超過四十個字）!");

            if (validate) {
                var a = confirm("確定要告白的內容是『" + msg + "』");
            }

            if (a && validate) {
                VALENTINE.finish('#step2', '#msg');
                VALENTINE.start('#step3', '#link');
                VALENTINE.submit();
            } else {
                return false
            }
        // }
    },

    copy: function () {
        // if(event.type == 'click' || event.which == 13 ) {
            $('#step3').removeClass('active').addClass('completed');
        // }
    },

    submit: function () {

        var that = this;
        var $name = $('#name input').val();
        var $msg = $('#msg input').val();
        var $input = $('#link input');
        var obj = {
            name: this.name,
            photo: this.photo,
            who: $name,
            commit: $msg,
            id: this.fbid
        };

        $.post(this.resourse, obj, function(data,status){
            var data = JSON.parse(data);
            that.id = data.id;
            var val = 'https://' + document.location.host + '/valentine_card.html?id=' + that.id;
            // console.log(val)
            $input.val(val).attr('data-clipboard-text', val);
        });

    },

    validate: function (str, max, msg) {
        if(str.replace(/[^\x00-\xff]/g,"**").length > max) {
            alert(msg)
            return false
        } else {
            return true
        }
    },

    count: function () {
        $.get("/valentine/api/valentinecount", {}, function(data,status){
            // console.log(data)
            data = JSON.parse(data)
            if(data.count > 0) {
                $('#num').text(data.count);

                $(window).scroll(function(){
                    // console.log('捲動')
                    var he = $('body').scrollTop();
                    if(he > 200) {
                        // $('.cookie.nag').nag('show');  
                        $('.cookie.nag').show(0);          
                    } else {
                        $('.cookie.nag').hide(0);
                        // $('.close').click() 
                    }
                });
            }
        });
    }
}

var tagtoo_advertiser_id = 251;
var tagtoo_ga = document.createElement('script');
tagtoo_ga.type = 'text/javascript';
tagtoo_ga.async = true;
tagtoo_ga.src = '//ad.tagtoo.co/media/ad/track.js';
var tagtoo_s = document.getElementsByTagName('script')[0];
tagtoo_s.parentNode.insertBefore(tagtoo_ga, tagtoo_s);

if (typeof TagtooTagManager == "undefined") {
    (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
    new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
    j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
    '//www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
    })(window,document,'script','TagtoodataLayer','GTM-MHN67X'); 
    TagtooTagManager = true;
};

window.fbAsyncInit = function() {
    FB.init({
        appId: '776675399034344',
        cookie: true, // enable cookies to allow the server to access 
        // the session
        xfbml: true, // parse social plugins on this page
        version: 'v2.1' // use version 2.1
    });
};

// Load the SDK asynchronously
(function(d, s, id) {
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) return;
    js = d.createElement(s);
    js.id = id;
    js.src = "//connect.facebook.net/en_US/sdk.js";
    fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));

$(function(){
    $( "#name" ).keypress(function( event ) { if ( event.which == 13 ) { event.preventDefault(); VALENTINE.nameConfirm(); } });
    $( "#msg" ).keypress(function( event ) { if ( event.which == 13 ) { event.preventDefault(); VALENTINE.msgConfirm(); } });
    $( "#link" ).keypress(function( event ) { if ( event.which == 13 ) { event.preventDefault(); VALENTINE.copy(); } });

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
            var val = 'https://' + document.location.host + '/valentine_card.html?id=' + VALENTINE.id;
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