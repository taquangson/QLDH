using QLDH.App_Start;
using QLDH.DataAccess;
using QLDH.DataAccess.DAO;
using QLDH.DataAccess.Models;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Web;
using System.Web.Mvc;

namespace QLDH.Controllers
{
    public class DanhMucComboHangHoaController : Controller
    {
        // GET: DanhMucHangHoa
        [SessionExpire]
        public ActionResult DanhMucComboHangHoa()
        {
            return View();
        }

        [SessionExpire]
        [HttpGet]
        public ActionResult GetAll()
        {
            DanhMucComboDAO dmDAO = new DanhMucComboDAO();

            List<DanhMucComboModel> dt = dmDAO.GetAll();
            return Json(dt, JsonRequestBehavior.AllowGet);
        }

        [SessionExpire]
        [HttpPost]
        public ActionResult Create(DanhMucComboModel model)
        {
            DanhMucComboDAO dmDAO = new DanhMucComboDAO();
            DanhMucComboHangHoaDAO dmCBHHDAO = new DanhMucComboHangHoaDAO();

            if (model != null)
            {
                int idVuaTao = dmDAO.Create(model);
                if (idVuaTao == 0)
                {
                    return Json(new { status = false, msg = "Lưu thất bại, vui lòng liên hệ quản trị" }, JsonRequestBehavior.AllowGet);
                }
                for (int i = 0; i < model.DanhMucComboHangHoa.Count; i++)
                {
                    model.DanhMucComboHangHoa[i].ID_DanhMucCombo = idVuaTao;
                    dmCBHHDAO.Insert(model.DanhMucComboHangHoa[i]);
                }

                return Json(new { status = true, msg = "Lưu thành công" }, JsonRequestBehavior.AllowGet);               
            }

            return Json(new { status = false, msg = "Lưu thất bại, vui lòng liên hệ quản trị" }, JsonRequestBehavior.AllowGet);
        }

        [SessionExpire]
        [HttpPost]
        public ActionResult Update(DanhMucComboModel model)
        {
            DanhMucComboDAO dmDAO = new DanhMucComboDAO();
            DanhMucComboHangHoaDAO dmCBHHDAO = new DanhMucComboHangHoaDAO();

            if (model != null)
            {

                if (dmDAO.Update(model) == 0)
                {
                    return Json(new { status = false, msg = "Lưu thất bại, vui lòng liên hệ quản trị" }, JsonRequestBehavior.AllowGet);
                }
                for (int i = 0; i < model.DanhMucComboHangHoa.Count; i++)
                {
                    dmCBHHDAO.Insert(model.DanhMucComboHangHoa[i]);
                }
                return Json(new { status = true, msg = "Lưu thành công" }, JsonRequestBehavior.AllowGet);
            }

            return Json(new { status = false, msg = "Lưu thất bại, vui lòng liên hệ quản trị" }, JsonRequestBehavior.AllowGet);
        }

        [SessionExpire]
        [HttpPost]
        public ActionResult Delete(string ID)
        {
            DanhMucComboDAO dmDAO = new DanhMucComboDAO();
            if (ID != null)
            {
                List<string> list = ID.Split(',').ToList();
                for (int i = 0; i < list.Count; i++)
                {
                    if (dmDAO.Delete(Int32.Parse(list[i])) == 0)
                    {
                        return Json(new { status = false, msg = "Xóa dữ liệu thất bại, vui lòng liên hệ quản trị" }, JsonRequestBehavior.AllowGet);
                    }
                }
                return Json(new { status = true, msg = "Xóa dữ liệu thành công" }, JsonRequestBehavior.AllowGet);
            }

            return Json(new { status = false, msg = "Xóa dữ liệu thất bại, vui lòng liên hệ quản trị" }, JsonRequestBehavior.AllowGet);
        }

        [SessionExpire]
        [HttpGet]
        public ActionResult GetAllDonViTinh()
        {
            DanhMucComboDAO dmDAO = new DanhMucComboDAO();

            List<DanhMucComboModel> dt = dmDAO.GetAllDonViTinh();
            return Json(dt, JsonRequestBehavior.AllowGet);
        }

        [SessionExpire]
        [HttpGet]
        public ActionResult GetAllChiTiet(int ID)
        {
            DanhMucComboHangHoaDAO dmDAO = new DanhMucComboHangHoaDAO();

            List<DanhMucComboHangHoaModel> dt = dmDAO.GetAll(ID);
            return Json(dt, JsonRequestBehavior.AllowGet);
        }

        [SessionExpire]
        [HttpPost]
        public ActionResult UploadAnh(HttpPostedFileBase file)
        {
            if (file != null && file.ContentLength > 0)
            {
                var fileName = DateTime.Now.ToString("yyyyMMddHHmmss") + "." + file.FileName.Split('.')[1];
                var path = Path.Combine(Server.MapPath("~/Images/AnhCombo"), fileName);
                file.SaveAs(path);

                return Json(new { status = true, msg = "Cập nhật ảnh combo tra thành công", fileName }, JsonRequestBehavior.AllowGet);
            }

            return Json(new { status = false, msg = "Lỗi khi tải lên ảnh" }, JsonRequestBehavior.AllowGet);
        }

    }
}