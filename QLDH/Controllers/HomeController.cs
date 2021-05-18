using QLDH.App_Start;
using QLDH.DataAccess.DAO;
using QLDH.DataAccess.Models;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace QLDH.Controllers
{
    public class HomeController : Controller
    {
        [SessionExpire]
        public ActionResult Index()
        {
            if (Session["UserInfor"] != null)
            {
                try
                {
                    UserAppModel userinfor = (UserAppModel)System.Web.HttpContext.Current.Session["UserInfor"];
                    if(userinfor.ExpriedTime > DateTime.Now)
                    {
                        return RedirectToAction("DanhSachDeThiTheoHocSinh", "TracNghiem");
                    }
                    else
                    {
                        return RedirectToAction("Login", "User");
                    }
                }
                catch
                {

                }
                return View();

            }
            else
            {
                return RedirectToAction("Login", "User");
            }
        }

        [SessionExpire]
        public ActionResult About()
        {
            ViewBag.Message = "Your application description page.";

            return View();
        }

        [SessionExpire]
        public ActionResult Contact()
        {
            ViewBag.Message = "Your contact page.";

            return View();
        }

    }
}