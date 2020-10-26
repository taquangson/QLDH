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
    public class TinNhanHub : Hub
    {
        private static IHubContext hubContext = GlobalHost.ConnectionManager.GetHubContext<TinNhanHub>();
        public static void updateTinNhan(string DienThoai)
        {         
            hubContext.Clients.All.pushTinNhan(DienThoai);

        }
    }
}