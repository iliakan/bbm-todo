define([], function() {

  return Backbone.Model.extend({

   // localStorage: new Backbone.LocalStorage("todo-backbone"),

    // Default attributes for the todo item.
    defaults: function() {
      return {
        title: "empty todo...",
        order: this.collection ? this.collection.nextOrder() : 0,
        done: false
      };
    },

    // Toggle the `done` state of this todo item.
    toggle: function() {
      this.save({done: !this.get("done")});
    }

  })

});