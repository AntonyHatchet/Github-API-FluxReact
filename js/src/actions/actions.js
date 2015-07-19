'use strict'
var AppDispatcher = require('../dispatcher');
var ActionTypes = require('../constants/IssueConstants');

var IssueAction = {
	findIssues: function(userName,repository){
		    var xhr = new XMLHttpRequest();
		    xhr.open('GET', 'https://api.github.com/repos/'+userName+'/'+repository+'/issues', false);
		    xhr.send();
		    if (xhr.status != 200) {
			  // обработать ошибку
			  console.log(xhr.status + ': ' + xhr.statusText ); // пример вывода: 404: Not Found
			  	AppDispatcher.dispatch({
                    type: ActionTypes.API_ERR,
                    reply: {status:xhr.status,text:xhr.statusText }
                });
			} else {
				console.log('succes')
			  	AppDispatcher.dispatch({
                    type: ActionTypes.API_SEARCH,
                    reply: xhr.response
                });
			}
	}
}

module.exports = IssueAction;