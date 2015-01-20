/**
 * 
 */
var shortId = require('shortid');
var actions = require('../actions/AppActionCreator');

/**
 * 
 */
var comp = React.createClass({

  componentDidMount: function(){
      this.$input = $('#todo-input');
  },

  /**
   * supported events
   * http://facebook.github.io/react/docs/events.html
   */
  render: function() {

    return (
      
      <div className="input-box">
     
        <input id="todo-input" 
               className="search-input" 
               type="text" 
               
               placeholder="輸入待辦事項!" 
               
               onKeyDown={this.handleKeyDown} />

        <button className="save-button right" onClick={this.handleSave}>Save</button>

<div className="ui facebook button massive" onClick={this.fbLogin}>
  <i className="facebook icon"></i>
  大聲來告白
</div>


<div id="status"></div>
      </div>
    );
  
  },

  /**
   * 
   */
  fbLogin: function(evt){
      FB.login(function(response) {

          if (response.authResponse) {
              console.log('Welcome!  Fetching your information.... ');
              //console.log(response); // dump complete info
              access_token = response.authResponse.accessToken; //get access token
              user_id = response.authResponse.userID; //get FB UID

              FB.api('/me', function(response) {
                  user_email = response.email; //get user email
                  console.log(response)
                  console.log('Successful login for: ' + response.name);
            // you can store this data into your database             
              });
                FB.api('/me/picture?width=100', function(response) {
                  user_email = response.email; //get user email
                  console.log(response.data.url)
                  // console.log('Successful login for: ' + response.name);
            // you can store this data into your database             
              });

          } else {
              //user hit cancel button
              console.log('User cancelled login or did not fully authorize.');

          }
      }, {
          scope: 'publish_stream,email,user_about_me,user_photos'
      });
  },
  
  /**
   * 按下 enter 就存檔
   */  
  handleKeyDown: function(evt){
      if( evt.keyCode == 13){
          this.handleSave();
      }
  },

  /**
   * 按下 save 鈕就存檔
   */
  handleSave: function(evt){

      var val = this.$input.val();  

      // 未輸入文字的話就擋掉
      if( val.trim().length == 0 ) return;

      var item = {};
      item.name = val;
      item.uid = shortId.generate();
      item.created = Date.now();

      actions.createTodo( item );

      // 清空輸入框，等待下一次的輸入
      this.$input.val('');
  },

  noop: function(){}

});

module.exports = comp;