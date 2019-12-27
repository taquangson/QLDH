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
    public class DiemDanhHub : Hub
    {
        private static IHubContext hubContext = GlobalHost.ConnectionManager.GetHubContext<DiemDanhHub>();
        public static void updateDiemDanh(int ID_Lop, string Username, int Ca)
        {
            LopHocDAO lhdao = new LopHocDAO();
            LopHocModel l = lhdao.GetById_LopHoc(ID_Lop);            
            hubContext.Clients.All.pushDiemDanh(ID_Lop);
            hubContext.Clients.All.pushDesktopDiemDanh(ID_Lop, l.TenLop, Username, Ca);
        }
    }
}