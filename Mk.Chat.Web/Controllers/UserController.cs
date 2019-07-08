using System;
using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Mk.Chat.Model;
using Mk.Chat.Services.Contracts;

namespace Mk.Chat.Web.Controllers
{
    public class UserController : Controller
    {
        private readonly IUserStore _userStore;

        public UserController(IUserStore userStore)
        {
            _userStore = userStore;
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
        public IActionResult Create(string userName)
        {
            var user = _userStore.Create(userName);

            HttpContext.Session.SetString("CurrentUserId", user.Id.ToString());

            return Json(user);
        }
    }
}