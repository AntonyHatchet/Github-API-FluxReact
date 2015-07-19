'use strict'
var React = require('react');
var Forms = require('./components/forms');
var Issues = require('./components/issues');
var Store = require('./store/store');

function getTodoState() {
  return {
    allIssues: Store.getAll()
  };
}

var App = React.createClass({
	getInitialState: function() {
	    return getTodoState();
	},
    componentDidMount: function() {
	    Store.addChangeListener(this._onChange);
	},
    componentWillUnmount: function() {
	    Store.removeChangeListener(this._onChange);
	},
	render: function(){
		return (
			<div className="wrapper">
				<Forms/>
				<Issues allIssues={this.state.allIssues}/>
			</div>
		)
	},
 	_onChange: function() {
	    this.setState(getTodoState());
    }
});

React.render(<App/>,document.body);