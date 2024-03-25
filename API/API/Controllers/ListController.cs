using API.Shared.Entities;
using API.Shared.Interfaces;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
  [Route("api/[controller]")]
  [ApiController]
  public class ListController : ControllerBase
  {

    private readonly IDatabase _db;

    public ListController(IDatabase db)
    {
      _db = db;
    }

    [HttpGet]
    public IActionResult Get()
    {
      var list = _db.GetTodoList();
      TodoListGetResponse response = new()
      {
        Success = true,
        TotalItems = list.Count,
        Todolist = list
      };
      return Ok(response);
    }

    [HttpPost] 
    public IActionResult CreateTodoList([FromBody]string name)
    {
      TodoList newList = new()
      {
        Name = name,
        IsClosed = false,
        Items = []
      };
      var success = _db.SaveList(newList);
      if (success)
      {
        return Created($"details/{newList.Id}", newList);
      }
      return BadRequest();
    }
  }
}
