using System;
using System.Collections.Generic;
using Mk.Chat.Model;

namespace Mk.Chat.Services.Contracts
{
    public interface IUserStore
    {
        IReadOnlyCollection<User> GetAll();

        User GetById(Guid id);

        User Create(string userName);
    }
}