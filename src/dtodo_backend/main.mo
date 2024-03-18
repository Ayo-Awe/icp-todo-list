import Text "mo:base/Text";
import HashMap "mo:base/HashMap";
import List "mo:base/List";

actor {
  type Todo = {
    id : Text;
    description : Text;
    done : Bool;
  };

  var todoMap = HashMap.HashMap<Text, Todo>(30, Text.equal, Text.hash);

  public query func getTodos() : async [Todo] {
    var todoList = List.nil<Todo>();

    for (todo in todoMap.vals()) {
      todoList := List.push(todo, todoList);
    };

    List.toArray(todoList);
  };

  public func createTodo(id : Text, description : Text) {
    let newTodo : Todo = {
      id = id;
      description = description;
      done = false;
    };

    todoMap.put(id, newTodo);
  };

  public func toggleTodo(id : Text) {
    var todo = todoMap.get(id);

    switch (todo) {
      case (null) {
        // do nothing
      };

      case (?value) {
        var updatedTodo = {
          id = value.id;
          description = value.description;
          done = not value.done;
        };

        todoMap.put(value.id, updatedTodo);
      };
    };
  };

  public func deleteTodo(id : Text) {
    todoMap.delete(id);
  };

};
