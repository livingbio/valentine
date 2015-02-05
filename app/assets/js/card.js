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