using System;
using System.Collections.Concurrent;
using System.Collections.Generic;
using System.Linq;
using Mk.Chat.Model;
using Mk.Chat.Services.Contracts;

namespace Mk.Chat.Services
{
    public class UserInMemoryStore : IUserStore
    {
        private ConcurrentDictionary<Guid, User> _store = new ConcurrentDictionary<Guid, User>();

        public IReadOnlyCollection<User> GetAll()
        {
            return _store.Values.ToList();
        }

        public User GetById(Guid id)
        {
            _store.TryGetValue(id, out var user);

            return user;
        }

        public User Create(string userName)
        {
            var user = new User() {Name = userName};

            return  _store.AddOrUpdate(user.Id, user, (guid, user1) => user1);
        }
    }
}