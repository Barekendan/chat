using Microsoft.AspNetCore.Mvc;

namespace Mk.Chat.Web.Controllers
{
    public class UserController : Controller
    {
        // GET
        [HttpGet]
        [Route("api/users")]
        public IActionResult GetUsers()
        {


            return Json(new[] {new {Id = 1, Name = "Vova"}, new {Id = 2, Name = "Dima"}});
        }
    }
}