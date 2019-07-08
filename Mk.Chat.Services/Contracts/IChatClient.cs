using System.Threading.Tasks;
using Mk.Chat.Model;

namespace Mk.Chat.Services.Contracts
{
    public interface IChatClient
    {
        Task ReceiveNewUser(User user);
    }
}