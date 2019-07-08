using System.Threading.Tasks;
using Microsoft.AspNetCore.SignalR;
using Mk.Chat.Model;
using Mk.Chat.Services.Contracts;

namespace Mk.Chat.Services.Hubs
{
    public class ChatHub : Hub<IChatClient>
    {
        public async Task ReceiveNewUser(User user)
        {
            await Clients.All.ReceiveNewUser(user);
        }
    }
}