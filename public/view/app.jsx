/** @jsx React.DOM */

define(['./todoList'], function(TodoListView) {

  return React.createClass({

    getInitialState: function() {
      return {
        editing: null
      };
    },


    onEditChange: function(event) {
      this.setState({editing: event.target.value});
    },

    onEditSubmit: function() {
      var value = this.state.editing;
      if (!value) return false;

      this.props.todos.create({title: value});
      this.setState({editing: null});
      return false;
    },

    // Clear all done todo items, destroying their models.
    clearCompleted: function() {
      this.props.todos.done().each(function(todo) {
        todo.destroy();
      });
    },
    /*
     toggleAllComplete: function() {
     var done = this.ui.allCheckbox.prop('checked');
     this.collection.each(function(todo) {
     todo.save({done: done});
     });
     }
     */


    render: function() {

      var header = (<header>
        <h1>Todos</h1>
        <form onSubmit={this.onEditSubmit}>
          <input ref="edit" type="text" value={this.state.editing || ''} onChange={this.onEditChange} placeholder="What needs to be done?"/>
        </form>
      </header>
          );

      if (!this.props.todos.length) {
        return header;
      }

      var done = this.props.todos.done().length;
      var remaining = this.props.todos.remaining().length;

      var main = (
          <section id="main">
            <input id="toggle-all" type="checkbox" checked={remaining}/>
            <label for="toggle-all">Mark all as complete</label>
            <TodoListView todos={this.props.todos}/>
          </section >
          );

      var footer = (
          <footer>
            <a id="clear-completed">Clear completed</a>
            <div id="todo-count"></div>
          </footer>
          );

      return <div>{header} {main} {footer}</div>
    }

  });

});