using API.Shared.Entities;
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
      if (string.IsNullOrEmpty(list.Id))
      {
        list.Id = Guid.NewGuid().ToString();
      }
      _todos.Add(list);
      return true;
    }

    public bool DeleteList(string idToDelete) 
    {
      if (string.IsNullOrEmpty(idToDelete))
      {
        return false;
      }

      TodoList list = _todos.Find(l => l.Id.Equals(idToDelete));
      if (list == null)
      {
        return false;
      }

      _todos.Remove(list);
      return true;
    }

    public bool ClearAllLists()
    {
      _todos.Clear();
      return true;
    }

    public TodoList GetTodo(string id)
    {
      return _todos.Find(x => x.Id.Equals(id));
    }

    public bool SaveChildToList(AddChildRequest request)
    {
      TodoList? parent = GetTodo(request.ParentId);
      if (string.IsNullOrEmpty(request.ChildToAdd.Id))
      {
        request.ChildToAdd.Id = Guid.NewGuid().ToString();
      }
      if (parent == null)
      {
        parent = GetTodoList().Where(l => l.Items.Where(c => c.Id == request.ParentId).Any()).FirstOrDefault();
        if (parent != null)
        {
          TodoItem parentItem = parent.Items.Where(i => i.Id.Equals(request.ParentId)).First();
          parentItem.Children.Add(request.ChildToAdd);
          return true;
        } else
        {
          return false;
        }
      }

      parent.Items.Add(request.ChildToAdd);
      return true;
    }

    public bool DeleteChildTask(string childId)
    {
      TodoList? parentList = GetTodoList().Where(l => l.Items.Where(c => c.Id.Equals(childId)).Count() > 0).FirstOrDefault();
      if(parentList == null)
      {
        parentList = GetTodoList().Where(l => l.Items.Where(c => c.Children.Where(g => g.Id.Equals(childId)).Any()).Any()).FirstOrDefault();
        TodoItem parentItem = parentList.Items.Where(i => i.Children.Where(c => c.Id.Equals(childId)).Any()).First();
        int index = parentItem.Children.FindIndex(c => c.Id.Equals(childId));
        parentItem.Children.RemoveAt(index);
        return true;
      } else
      {
        int count = parentList.Items.RemoveAll(c => c.Id.Equals(childId));
        return count > 0;
      }
      return false;
    }

    public bool UpdateChildTask(TodoItem item)
    {
      TodoList? parentList = GetTodoList().Where(l => l.Items.Where(c => c.Id == item.Id).Count() > 0).FirstOrDefault();
      bool success = false;
      if (parentList == null)
      {
        parentList = GetTodoList().Where(l => l.Items.Where(c => c.Children.Where(g => g.Id.Equals(item.Id)).Any()).Any()).FirstOrDefault();
        if (parentList != null)
        {
          TodoItem parentItem = parentList.Items.Where(i => i.Children.Where(c => c.Id.Equals(item.Id)).Any()).First();
          int index = parentItem.Children.FindIndex(c => c.Id.Equals(item.Id));
          parentItem.Children[index] = item;
          return true;
        }
      }
      else
      {
        for (var i = 0; i < parentList.Items.Count; i++)
        {
          var child = parentList.Items[i];
          if (child.Id.Equals(item.Id))
          {
            parentList.Items[i] = item;
            success = true;
            break;
          }
        }
      }

      return success;
    }
  }
}
