using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;
using Mk.Chat.Model;
using Mk.Chat.Services.Contracts;
using Mk.Chat.Services.Hubs;

namespace Mk.Chat.Web.Controllers
{
    public class UserController : Controller
    {
        private readonly IUserStore _userStore;
        private readonly IHubContext<ChatHub, IChatClient> _chatHub;

        public UserController(IUserStore userStore, IHubContext<ChatHub, IChatClient> chatHub)
        {
            _userStore = userStore;
            _chatHub = chatHub;
        }

        [HttpGet]
        [Route("api/users")]
        public IActionResult GetUsers()
        {
            var users = _userStore.GetAll();

            return Json(users);
        }

        [HttpGet]
        [Route("api/users/current")]
        public IActionResult GetCurrentUser()
        {
            var idString = HttpContext.Session.GetString("CurrentUserId");

            User currentUser = null;
            if (Guid.TryParse(idString, out var id))
            {
                currentUser = _userStore.GetById(id);
            }

            return Json(currentUser);
        }

        [HttpPost]
        [Route("api/users")]
        public async Task<IActionResult> Create(string userName)
        {
            var user = _userStore.Create(userName);

            HttpContext.Session.SetString("CurrentUserId", user.Id.ToString());
            await _chatHub.Clients.All.ReceiveNewUser(user);

            return Json(user);
        }
    }
}