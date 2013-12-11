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

      var header = (React.DOM.header(null, 
        React.DOM.h1(null, "Todos"),
        React.DOM.form( {onSubmit:this.onEditSubmit}, 
          React.DOM.input( {ref:"edit", type:"text", value:this.state.editing || '', onChange:this.onEditChange, placeholder:"What needs to be done?"})
        )
      )
          );

      if (!this.props.todos.length) {
        return header;
      }

      var done = this.props.todos.done().length;
      var remaining = this.props.todos.remaining().length;

      var main = (
          React.DOM.section( {id:"main"}, 
            React.DOM.input( {id:"toggle-all", type:"checkbox", checked:remaining}),
            React.DOM.label( {for:"toggle-all"}, "Mark all as complete"),
            TodoListView( {todos:this.props.todos})
          )
          );

      var footer = (
          React.DOM.footer(null, 
            React.DOM.a( {id:"clear-completed"}, "Clear completed"),
            React.DOM.div( {id:"todo-count"})
          )
          );

      return React.DOM.div(null, header, main, footer)
    }

  });

});