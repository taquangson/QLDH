using Newtonsoft.Json.Linq;
using QLDH.App_Start;
using QLDH.DataAccess.DAO;
using QLDH.DataAccess.Models;
using System;
using System.Collections;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.Script.Serialization;

namespace QLDH.Controllers
{
    public class TroChoiController : Controller
    {

        [SessionExpire]
        public ActionResult TroChoi()
        {
            return View();
        }

        [AllowAnonymous]
        public ActionResult GameSapXep(int ID)
        {
            TroChoiDAO chdao = new TroChoiDAO();
            TroChoiModel model = chdao.GetByID(ID);
            var rnd = new Random();
            model.lstDapAn = model.lstDapAn.OrderBy(item => rnd.Next()).ToList();
            return View(model);
        }

        [AllowAnonymous]
        public ActionResult GameLapGhep(int ID)
        {
            TroChoiDAO chdao = new TroChoiDAO();
            TroChoiModel model = chdao.GetByID(ID);
            var rnd = new Random();
            model.lstDapAn = model.lstDapAn.OrderBy(item => rnd.Next()).ToList();
            return View(model);
        }

        [AllowAnonymous]
        public ActionResult GameNoiDuong(int ID)
        {
            TroChoiDAO chdao = new TroChoiDAO();
            TroChoiModel model = chdao.GetByID(ID);
            var rnd = new Random();
            model.lstDapAn = model.lstDapAn.OrderBy(item => rnd.Next()).ToList();
            return View(model);
        }

        [SessionExpire]
        [HttpPost]
        public ActionResult UploadAnh(HttpPostedFileBase file)
        {
            if (file != null && file.ContentLength > 0)
            {
                string fileName = DateTime.Now.ToString("yyyyMMddhhmmss") + Path.GetFileName(file.FileName);
                string path = Path.Combine(Server.MapPath("~/Images/AnhTroChoi"), fileName);
                file.SaveAs(path);
                return Json(new { status = true, msg = fileName }, JsonRequestBehavior.AllowGet);
            }
            else
            {
                return Json(new { status = false, msg = "" }, JsonRequestBehavior.AllowGet);
            }
        }

        [SessionExpire]
        [HttpPost]
        public ActionResult UploadAnhDapAn(HttpPostedFileBase file)
        {
            if (file != null && file.ContentLength > 0)
            {
                string fileName = DateTime.Now.ToString("yyyyMMddhhmmss") + Path.GetFileName(file.FileName);
                string path = Path.Combine(Server.MapPath("~/Images/AnhTroChoi"), fileName);
                file.SaveAs(path);
                return Json(new { status = true, msg = fileName }, JsonRequestBehavior.AllowGet);
            }
            else
            {
                return Json(new { status = false, msg = "" }, JsonRequestBehavior.AllowGet);
            }
        }

        [SessionExpire]
        [HttpGet]
        public ActionResult GetAllTroChoi()
        {
            TroChoiDAO chdao = new TroChoiDAO();

            return Json(chdao.GetAll(), JsonRequestBehavior.AllowGet);
        }



        [HttpPost, ValidateInput(false)]
        [SessionExpire]
        public ActionResult TroChoi_InsertOrUpdate(TroChoiModel item)
        {
            TroChoiDAO dao = new TroChoiDAO();
            DapAnTroChoiDAO dadao = new DapAnTroChoiDAO();
            int ID_TroChoi = dao.InsertOrUpdate_TroChoi(item);
            if (ID_TroChoi > 0)
            {
                if (item.ID > 0)
                {
                    List<DapAnTroChoiModel> dapan_old = dadao.GetDapAn_ByTroChoi(ID_TroChoi);
                    if (dapan_old.Count > 0)
                    {
                        foreach (DapAnTroChoiModel da in dapan_old)
                        {
                            if (item.lstDapAn == null)
                            {
                                dadao.Delete_DapAn(da.ID);
                            }
                            else if (item.lstDapAn.FirstOrDefault(x => x.ID == da.ID) == null)
                            {
                                dadao.Delete_DapAn(da.ID);
                            }
                        }
                    }
                }
                if (item.lstDapAn != null)
                {
                    foreach (DapAnTroChoiModel d in item.lstDapAn)
                    {
                        d.ID_TroChoi = ID_TroChoi;
                        dadao.InsertOrUpdate_DapAn(d);
                    }
                }
                return Json(new { status = true, msg = "Lưu dữ liệu thành công" }, JsonRequestBehavior.AllowGet);
            }
            else
            {
                return Json(new { status = false, msg = "Lưu dữ liệu thất bại, vui lòng liên hệ quản trị" }, JsonRequestBehavior.AllowGet);
            }
        }


    }
}