/**
 *
 */
var actions = require('../actions/AppActionCreator');

/**
 * 
 */
var Header = React.createClass({

  /**
   * 
   */
  render: function() {


    return (
      
      <header className="header">
        
        <p className="logo">塔圖心傳心</p>

      </header>
    );
  
  },

  /**
   * 
   */
  handleChange: function(evt){
      var val = evt.target.value.trim();
      actions.doSearch(val);
  },

  //
  noop: function(){
  }

});

module.exports = Header;