/** @jsx React.DOM */

define(['../util/backboneMixin'], function(BackboneMixin) {

  return React.createClass({
    mixins: [BackboneMixin],

    getInitialState: function() {
      return {
        editing: null,
      }
    },

    getBackboneModels: function() {
      return [this.props.todo];
    },

    onToggleChange: function(event) {
      this.props.todo.set({done: event.target.checked});
    },

    onEditChange: function(event) {
      this.setState({editing: event.target.value});
    },

    onViewDblClick: function(event) {
      this.setState({editing: ''});
      this.refs.edit.getDOMNode().focus();
    },

    onDestroyClick: function() {
      this.props.todo.destroy();
      return false;
    },

    onSubmit: function() {
      this.editEnd();
      return false;
    },

    editEnd: function() {
      var value = this.state.editing;
      if (!value) {
        this.props.todo.destroy();
      } else {
        this.props.todo.save({title: value});
      }
      this.setState({editing: null});
      return false;
    },

    render: function() {

      return (<li className={this.state.editing !== null ? 'editing' : ''}>
        <div className="view" onDblClick={this.onViewDblClick}>
          <input className="toggle" type="checkbox"
            checked={this.props.todo.get('done')} onChange={this.onToggleChange}/>
          <label>{this.props.todo.get('title')}</label>
          <a className="destroy" onClick={this.onDestroyClick}></a>
        </div>
        <form onSubmit={this.onSubmit}>
        <input ref="edit" onBlur={this.editEnd} className="edit" type="text" value={this.state.editing || ''} onChange={this.onEditChange} />
        </form>
      </li>);
    }

  })

});