using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using API.Shared.Entities;
using API.Shared.Interfaces;

namespace API.Controllers
{
  [Route("api/[controller]")]
  [ApiController]
  public class ListDetails : ControllerBase
  {

    private readonly IDatabase _db;

    public ListDetails(IDatabase db)
    {
      _db = db;
    }

    [HttpGet]
    [Route("{id}")]
    public IActionResult Get(string id)
    {
      TodoList list = _db.GetTodo(id);
      if (list == null)
      {
        return NoContent();
      }

      list.Items.ForEach(i =>
      {
        i.IsOverdue = (i.DueDate < DateTime.Today) && !i.IsCompleted;
        i.Children.ForEach(c =>
        {
           c.IsOverdue = c.DueDate < DateTime.Today && !i.IsCompleted;
        });
      });

      return Ok(list);
    }

    [HttpPost]
    [Route("addChild")]
    public IActionResult AddChild([FromBody] AddChildRequest request)
    {
      if (_db.SaveChildToList(request))
      {
        return Created("", request.ChildToAdd);
      }
      return BadRequest();
    }

    [HttpDelete]
    [Route("deleteChild/{id}")]
    public IActionResult Delete(string id)
    {
      bool success = _db.DeleteChildTask(id);
      return Ok(success);
    }

    [HttpPut]
    [Route("updateChild")]
    public IActionResult UpdateChild([FromBody]TodoItem item)
    {
      bool success = _db.UpdateChildTask(item);
      return Ok(success);
    }
  }
}
