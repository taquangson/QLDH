using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Microsoft.AspNet.SignalR;
using Microsoft.Owin;
using QLDH.DataAccess.DAO;
using QLDH.DataAccess.Models;

[assembly: OwinStartup(typeof(QLDH.Startup))]
namespace QLDH.Hubs
{
    public class BoardcastHub : Hub
    {
        private static IHubContext hubContext = GlobalHost.ConnectionManager.GetHubContext<BoardcastHub>();

        public static void offer(string id, string description)
        {         
            hubContext.Clients.All.push_offer(id, description);
        }

        public static void candidate_server(string id, string description)
        {
            hubContext.Clients.All.push_candidate_server(id, description);
        }

        public static void candidate_client(string id, string description)
        {
            hubContext.Clients.All.push_candidate_client(id, description);
        }

        public static void answer(string id, string description)
        {
            hubContext.Clients.All.push_answer(id, description);
        }

        public static void watcher(string id)
        {
            hubContext.Clients.All.push_watcher(id);
        }

        public static void chat(string id, string description)
        {
            hubContext.Clients.All.push_chat(id, description);
        }
    }
}