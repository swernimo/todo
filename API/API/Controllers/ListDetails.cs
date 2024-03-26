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
        i.IsOverdue = (i.DueDate < DateTime.Today);
        i.Children.ForEach(c =>
        {
           c.IsOverdue = c.DueDate < DateTime.Today;
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
  }
}
