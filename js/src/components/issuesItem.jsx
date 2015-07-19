'use strict'
var React = require('react');

var Issues = React.createClass({
    render: function(){
    	var issues = this.props.issues;
		return (
		 <li key={issues.id}>
 	        <h3 className="title">{issues.title}</h3>
	        <div className="number"># {issues.number}</div>
	        <div className="state">State is {issues.state}</div>
	        <div className="created">Created {issues.created_at}</div>
	      </li>
		)
	}
})

module.exports = Issues;