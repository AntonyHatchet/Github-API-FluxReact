'use strict'
var React = require('react');
var Actions = require('../actions/actions');

var Inputs = React.createClass({
	render: function(){
		return (
			<input onChange={this.props.onChange} type={this.props.type} placeholder={this.props.name} value={this.props.value}required/>
		)
	}
});

var Buttons = React.createClass({
	render: function(){
		return (
			<button type={this.props.type} onClick={this.props.onClick}>{this.props.name}</button>
		)
	}
});

var Forms = React.createClass({
	getInitialState: function(){
		return {
			name:"",
			link:""
		}
	},
	handleChange: function(e){
		if (e.target.placeholder === "Name"){
			this.setState({name: e.target.value})
		}else this.setState({link: e.target.value})
	},
	handleSubmit: function(e){
			e.preventDefault();
			Actions.findIssues(this.state.name,this.state.link)
		  },
	render: function(){
		return (
			<form onSubmit={ this.handleSubmit }>
				<Inputs onChange={this.handleChange} value={this.state.name} name="Name" type="text" />
				<Inputs onChange={this.handleChange} value={this.state.link} name="Repo" type="text"/>
				<Buttons type="submit" name="Find"/>
			</form>
		)
	}
});

module.exports = Forms