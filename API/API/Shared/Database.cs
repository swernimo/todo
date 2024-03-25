﻿using API.Shared.Entities;
using API.Shared.Interfaces;
using System.Reflection.Metadata.Ecma335;

namespace API.Shared
{
  public class Database : IDatabase
  {

    private List<TodoList> _todos = [];

    public List<TodoList> GetTodoList()
    {
      return _todos;
    }

    public bool SaveList(TodoList list)
    {
      _todos.Add(list);
      return true;
    }

    public bool DeleteList(string idToDelete) 
    {
      if (string.IsNullOrEmpty(idToDelete))
      {
        return false;
      }

      TodoList list = _todos.Find(l => l.Id.ToString().Equals(idToDelete));
      if (list == null)
      {
        return false;
      }

      _todos.Remove(list);
      return true;
    }
  }
}
