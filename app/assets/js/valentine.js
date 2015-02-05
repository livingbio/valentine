var VALENTINE = {

    // game
    num: 0,
    resourse: "/valentine/api/valentineinfo",
    id: undefined,
    photo: undefined,
    name: undefined,
    fbid: undefined,
    success: 0,
    
    // card
    src: undefined,
    fake: {name: "周傑輪", commit: "哈摟", id: "72447883975", photo: "https://fbcdn-profile-a.akamaihd.net/hprofile-ak-x…gda__=1432520886_c51aedd561e607dbcc9167ff21ce0cb6", who: "親愛的昆霖"},

    // card
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
    },

    // card
    init: function () {


        this.id = Tagtoo.Core.decodeQueryData(document.location.href).id;
        this.id = (this.id) ? Number(this.id) : false;
        
        if(!this.id) {
            this.assign(this.fake);
        } else {
            this.cookie();
            this.src = document.location.origin + this.resourse + '/' + this.id;
            $.get(this.src, function(data,status){
                // console.log("Data: " + data + "\nStatus: " + status);
                data = JSON.parse(data);
                // console.log(data)
                VALENTINE.assign(data);
            });                
        }


    },

    cookie: function () {
        // console.log("cookie")
        if(!Tagtoo.Cookie.getItem("tags")) {
            Tagtoo.Cookie.setItem("tags","valentine");
        }

        if(!Tagtoo.Cookie.getItem("valentine_ids")) {
            var arr = [];
            arr.push(this.id)
            var str = JSON.stringify(arr);
            Tagtoo.Cookie.setItem("valentine_ids", str);
        } else {
            // 如果有同樣就不塞
            
            var ids = JSON.parse(Tagtoo.Cookie.getItem("valentine_ids")) || [];
            
            for (var i = 0; i < ids.length; i++) {
                // console.log(i)
                if(ids[i] == this.id) {
                    return false
                }
            };
            
            // 直接 push 
            ids.push(this.id);
            ids = JSON.stringify(ids);
            Tagtoo.Cookie.setItem("valentine_ids", ids);
        }
    },

    assign: function (data) {
        var url = "https://www.facebook.com/" + data.id;
        // console.log(url)
        $('#receiver').html(data.who);
        $('#emitter').html(data.name);
        $('#emitter-a').attr('href',url);
    }
};
