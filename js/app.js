// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('starter', ['backand'])

.config(function(BackandProvider) {
  BackandProvider.setAppName('dart');
  BackandProvider.setSignUpToken('f4066cf4-c00f-4bff-b19d-f543a07f9a48');
  BackandProvider.setAnonymousToken('172b6221-8fac-4362-a751-6af587f6ad46');
})

.controller('AppCtrl', function($scope, TodoService) {
  $scope.todos = [];
  $scope.input = {};

  function getAllTodos() {
    TodoService.getTodos().then(function(result) {
      $scope.todos = result.data.data;
    });
  }

  $scope.addTodo = function() {
    TodoService.addTodo($scope.input).then(function(result) {
      $scope.input = {};
      getAllTodos();
    });
  }

  $scope.deleteTodo = function(id) {
    TodoService.deleteTodo(id).then(function(result) {
      getAllTodos();
    });
  }

  getAllTodos();
})

.service('TodoService', function($http, Backand) {
  var baseUrl = '/1/objects/';
  var objectName = 'todos/';

  function getUrl() {
    return Backand.getApiUrl() + baseUrl + objectName;
  }

  function getUrlForId(id) {
    return getUrl() + id;
  }

  getTodos = function() {
    return $http.get(getUrl());
  };

  addTodo = function(todo) {
    return $http.post(getUrl(), todo);
  };

  deleteTodo = function(id) {
    return $http.delete(getUrlForId(id));
  };

  return {
    getTodos: getTodos,
    addTodo: addTodo,
    deleteTodo: deleteTodo
  }
});
