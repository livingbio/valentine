/**
 *
 */
var actions = require('../actions/AppActionCreator');

/**
 * 
 */
var Step = React.createClass({


  /**
   *
   */
  render: function() {

  	return (
      <div className="ui ordered steps">
        <div className="completed step">
          <div className="content">
            <div className="title">對誰告白</div>
            <div className="description">輸入你想要告白的對象</div>
          </div>
        </div>
        <div className="active step">
          <div className="content">
            <div className="title">告白吧</div>
            <div className="description">輸入你想要告白的內容</div>
          </div>
        </div>
        <div className="disabled step">
          <div className="content">
            <div className="title">恭喜</div>
            <div className="description">把連結分享給你的告白對象</div>
          </div>
        </div>
      </div>
    );
  },


});

module.exports = Step;
