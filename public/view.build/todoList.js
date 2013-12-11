/** @jsx React.DOM */

define(['../util/backboneMixin', './todo'], function(BackboneMixin, TodoView) {

  return React.createClass({
    mixins: [BackboneMixin],

    getBackboneModels: function() {
      return [this.props.todos];
    },
    render: function() {
      var items = this.props.todos.models.map(function(model) {
     // console.log(model.cid);
        return TodoView( {todo:model});
      });
      return React.DOM.ul( {className:"todo-list"}, items);
    }

  });

});

