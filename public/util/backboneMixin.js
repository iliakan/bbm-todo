define([], {
  _backboneForceUpdate: function() {
    this.forceUpdate();
  },
  componentDidMount: function() {
    // Whenever there may be a change in the Backbone data, trigger a reconcile.
    this.getBackboneModels().map(function(model) {
      model.on('all', function(event, model, collection, options) {
        console.log(this, arguments);
      });
      model.on('add change remove', this._backboneForceUpdate);
    }.bind(this));
  },
  componentWillUnmount: function() {
    // Ensure that we clean up any dangling references when the component is destroyed.
    this.getBackboneModels().map(function(model) {
      model.off('add change remove', this._backboneForceUpdate);
    }.bind(this));
  }
});
