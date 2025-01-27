using QLDH.App_Start;
using QLDH.DataAccess.DAO;
using QLDH.DataAccess.Models;
using System.Collections.Generic;
using System.Web.Mvc;

namespace QLDH.Controllers
{
    public class QuyController : Controller
    {
        [SessionExpire]
        public ActionResult Index()
        {
            return View();
        }

        [SessionExpire]
        [HttpGet]
        public ActionResult GetAllQuy()
        {
            QuyDAO quyDAO = new QuyDAO();
            List<QuyModel> dt = quyDAO.GetAll();
            return Json(dt, JsonRequestBehavior.AllowGet);
        }

        [SessionExpire]
        [HttpGet]
        public ActionResult GetQuyById(int id)
        {
            QuyDAO quyDAO = new QuyDAO();
            QuyModel dt = quyDAO.GetById(id);
            return Json(dt, JsonRequestBehavior.AllowGet);
            
        }

        [SessionExpire]
        [HttpPost]
        public ActionResult InsertOrUpdateQuy(QuyModel model)
        {
            QuyDAO quyDAO = new QuyDAO();
            int check_id = quyDAO.InsertOrUpdate(model);
            return Json(check_id, JsonRequestBehavior.AllowGet);
        }

        [SessionExpire]
        [HttpPost]
        public ActionResult DeleteQuy(string id)
        {
            QuyDAO quyDAO = new QuyDAO();
            bool check = quyDAO.Delete(int.Parse(id));
            return Json("trạng thái xóa: " + check, JsonRequestBehavior.AllowGet);
        }
    }
}