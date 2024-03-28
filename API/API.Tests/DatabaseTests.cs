﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Xunit;
using API.Shared;
using API.Shared.Entities;
using System.Diagnostics.CodeAnalysis;
using NuGet.Frameworks;

namespace API.Tests
{
  public class DatabaseTests
  {

    readonly Func<string, TodoList> CreateMockTodoList = (string id) =>
    {
      return new TodoList()
      {
        Id = id,
        Name = "xUnit Save Test",
        IsClosed = false,
        Items = []
      };
    };

    [Fact]
    public void SaveList_ShouldInsert()
    {
      var db = new Database();
      var mockList = CreateMockTodoList(Guid.NewGuid().ToString());
      Assert.Empty(db.GetTodoList());
      db.SaveList(mockList);
      Assert.Single(db.GetTodoList());
    }

    [Fact]
    public void SaveList_Should_CreateID()
    {
      var db = new Database();
      var mockList = CreateMockTodoList(string.Empty);
      db.SaveList(mockList);
      var savedList = db.GetTodoList()[0];

      Assert.NotEqual(string.Empty, savedList.Id);
    }

    [Fact]
    public void DeleteList_ReturnFalse_When_ID_NotFound()
    {
      var db = new Database();
      var id = Guid.NewGuid().ToString();
      var expected = false;
      var actual = db.DeleteList(id);

      Assert.Equal(expected, actual);
    }

    [Fact]
    public void DeleteList_ReturnFalse_When_ID_IsEmpty()
    {
      var db = new Database();
      var expected = false;
      var actual = db.DeleteList(string.Empty);

      Assert.Equal(expected, actual);
    }

    [Fact]
    public void DeleteList_Should_RemoveList()
    {
      var db = new Database();
      var mockList1 = CreateMockTodoList(Guid.NewGuid().ToString());
      var mockList2 = CreateMockTodoList(Guid.NewGuid().ToString());
      var mockList3 = CreateMockTodoList(Guid.NewGuid().ToString());

      db.SaveList(mockList1);
      db.SaveList(mockList2);
      db.SaveList(mockList3);
      
      Assert.Equal(3, db.GetTodoList().Count);
      
      db.DeleteList(mockList1.Id);

      var list = db.GetTodoList();
      var deletedList = list.Where(l => l.Id == mockList1.Id).FirstOrDefault();

      Assert.Null(deletedList);
    }

    [Fact]
    public void ClearList_Should_RemoveAllSavedLists()
    {
      var db = new Database();
      var mockList1 = CreateMockTodoList(Guid.NewGuid().ToString());
      var mockList2 = CreateMockTodoList(Guid.NewGuid().ToString());
      var mockList3 = CreateMockTodoList(Guid.NewGuid().ToString());

      db.SaveList(mockList1);
      db.SaveList(mockList2);
      db.SaveList(mockList3);

      Assert.Equal(3, db.GetTodoList().Count);

      db.ClearAllLists();

      Assert.Empty(db.GetTodoList());
    }

    [Fact]
    public void GetTodo_Should_ReturnNull_WhenId_NotFound()
    {
      var db = new Database();
      var id = Guid.NewGuid().ToString();

      var actual = db.GetTodo(id);

      Assert.Null(actual);
    }

    [Fact]
    public void GetTodo_Should_Return_List_WhenFound()
    {
      var db = new Database();
      var id = Guid.NewGuid().ToString();
      var mockList = CreateMockTodoList(id);
      
      db.SaveList(mockList);
      
      var actual = db.GetTodo(id);
      
      Assert.Equal(mockList, actual);
    }

    [Fact]
    public void UpdateList_Should_UpdateName()
    {
      var db = new Database();
      var mocklist = CreateMockTodoList(Guid.NewGuid().ToString());
      db.SaveList(mocklist);
      var newName = "This is a new name";
      mocklist.Name = newName;
      db.UpdateList(mocklist);

      var actual = db.GetTodo(mocklist.Id);

      Assert.Equal(newName, actual.Name);
    }
  }
}
