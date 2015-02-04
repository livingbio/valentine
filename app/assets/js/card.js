var VALENTINE = {
    num: 0,
    resourse: "/valentine/api/valentineinfo",
    id: undefined,
    photo: undefined,
    name: undefined,
    fbid: undefined,
    src: undefined,
    fake: {name: "周傑輪", commit: "哈摟", id: "72447883975", photo: "https://fbcdn-profile-a.akamaihd.net/hprofile-ak-x…gda__=1432520886_c51aedd561e607dbcc9167ff21ce0cb6", who: "親愛的昆霖"},


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

$(function(){
    VALENTINE.init();
    $('#go_activity').click(function(){
        window.open('/valentine_game.html');
    });
    $('#delete_ad').click(function(){
        var ans = confirm("確定不想再看到告白留言?");
        if (ans) {
            // console.log('刪除')
            Tagtoo.Cookie.setItem('tags','');
            Tagtoo.Cookie.setItem('valentine_ids','[]');
        } else {
            return false
        }
    });
    $('#scrollTop').click(function(){
        $(window).scrollTop(300);
    });
});