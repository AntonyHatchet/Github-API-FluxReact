'use strict'
var AppDispatcher = require('../dispatcher');
var EventEmitter = require('events').EventEmitter;
var ActionTypes = require('../constants/IssueConstants');
var assign = require('object-assign');

var CHANGE_EVENT = 'change';

var _issues = {};

/**
 * Create a TODO item.
 * @param  {string} text The content of the TODO
 */
function create(text) {
  //console.log(text,"create")
  // Hand waving here -- not showing how this interacts with XHR or persistent
  // server-side storage.
  // Using the current timestamp + random number in place of a real id.
  var id = (+new Date() + Math.floor(Math.random() * 999999)).toString(36);
  _issues[id] = {
    id: id,
    text: text
  };
}

/**
 * Delete a TODO item.
 * @param  {string} id
 */
function destroy(id) {
  delete _issues[id];
}

var TodoStore = assign({}, EventEmitter.prototype, {

  /**
   * Get the entire collection of TODOs.
   * @return {object}
   */
  getAll: function() {
    return _issues;
  },

  emitChange: function() {
    this.emit(CHANGE_EVENT);
  },

  /**
   * @param {function} callback
   */
  addChangeListener: function(callback) {
    this.on(CHANGE_EVENT, callback);
  },

  /**
   * @param {function} callback
   */
  removeChangeListener: function(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  }
});

// Register callback to handle all updates
AppDispatcher.register(function(action) {
  var text;

  switch(action.type) {
    case ActionTypes.API_SEARCH:
      text = action.reply.trim();
      if (text !== '') {
        create(text);
        TodoStore.emitChange();
      }
      break;
      
    case ActionTypes.TODO_UPDATE:
    //console.log("update",action)
      text = action.reply.trim();
      if (text !== '') {
        update(action.id, {text: text});
        TodoStore.emitChange();
      }
      break;

    case ActionTypes.TODO_DESTROY:
      destroy(action.id);
      TodoStore.emitChange();
      break;

    case ActionTypes.TODO_DESTROY_COMPLETED:
      destroyCompleted();
      TodoStore.emitChange();
      break;

    default:
      // no op
  }
});

module.exports = TodoStore;