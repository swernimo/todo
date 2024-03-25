using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
  [Route("api/[controller]")]
  [ApiController]
  public class HealthController : ControllerBase
  {
    [HttpGet]
    [Route("ping")]
    public IActionResult Ping()
    {
      return Ok("");
    }
  }
}
