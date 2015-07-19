'use strict'
var React = require('react');
var IssuesItem = require('./issuesItem');

var Issues = React.createClass({
    render: function(){
    	var allIssues;
    	for (var item in this.props.allIssues){
			allIssues = JSON.parse(this.props.allIssues[item].text)
    	}
    	console.log(allIssues)
    	var issues = [];

    	for (var key in allIssues) {
		      issues.push(<IssuesItem key={key} issues={allIssues[key]} />);
		    }
		return (
			 <ul id="todo-list">{issues}</ul>
		)
	}
})

module.exports = Issues;