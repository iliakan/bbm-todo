require(['./model/todoList', './view/app'], function(TodoList, AppView) {
  var App = new Marionette.Application();

  App.addInitializer(function() {
    var todos = new TodoList();

    todos.fetch();
    /*
    todos.reset([
      {title: "Todo 1", done: false, order: 1},
      {title: "Todo 2", done: true, order: 2},
      {title: "Todo 3", done: false, order: 3}
    ]); */

    this.appView = new AppView({
      collection: todos
    }).render();

    $('#app').empty().append(this.appView.$el);

  });

  App.start();

});