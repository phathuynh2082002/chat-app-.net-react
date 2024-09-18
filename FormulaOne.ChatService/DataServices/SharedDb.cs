using FormulaOne.ChatService.Models;
using System.Collections.Concurrent;

namespace FormulaOne.ChatService.DataServices
{
    public class SharedDb
    {
        public readonly ConcurrentDictionary<string, UserConnection> _connections = new();
        public ConcurrentDictionary<string, UserConnection> connections => _connections;

    }
}
