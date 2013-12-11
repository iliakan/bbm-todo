require(['./model/todoList', './view.build/app'], function(TodoList, AppView) {

  var todos = new TodoList([
    {title: 'todo 1'},
    {title: 'todo 2'},
    {title: 'todo 3'},
    {title: 'todo 4'},
    {title: 'todo 5'},
    {title: 'todo 6'},
    {title: 'todo 7'},
    {title: 'todo 8'},
    {title: 'todo 9'},
    {title: 'todo 10'},
    {title: 'todo 11'}
  ]);


  React.renderComponent(AppView({ todos: todos }), document.getElementById('app'));

});