/**
 *
 */
var actions = require('../actions/AppActionCreator');

/**
 * 
 */
var Flow = React.createClass({


  /**
   *
   */
  render: function() {

  	return (
      <div className="ui left massive icon input">
        <input type="text" placeholder="你要告白的對象名稱" />
        <i className="search icon" />
      </div>
    );
  },


});

module.exports = Flow;
