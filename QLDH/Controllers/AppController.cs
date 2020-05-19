using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using QLDH.App_Start;
using QLDH.DataAccess.DAO;
using QLDH.DataAccess.Models;
using Newtonsoft.Json;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using QLDH.DataAccess.Helper;
using QLDH.Hubs;
using System.Threading.Tasks;
using System.IO;
using System.Web.Script.Serialization;
using System.Web;

namespace QLDH.Controllers
{
    [RoutePrefix("api/appdata")]
    public class AppController : ApiController
    {
        
        [HttpPost]
        [Route("getToken")]
        public HttpResponseMessage GetToken([FromBody] UserAppModel model)
        {
            HttpResponseMessage response = new HttpResponseMessage();
            response = Request.CreateResponse(HttpStatusCode.NotFound, "Mã bảo mật không đúng, vui lòng liên hệ Administrator.");

            try
            {
                TaiKhoanDAO tk_dao = new TaiKhoanDAO();
                if (tk_dao.CheckLogin_App(model.UserName, model.Password, model.Current_Imei, model.Current_Device))
                {
                    UserAppModel tk = tk_dao.GetAppUserInfoByName(model.UserName);
                    if (tk == null)
                    {
                        response = Request.CreateResponse(HttpStatusCode.Unauthorized, "Thông tin tài khoản không đúng.");
                    }
                    else
                    {
                        string token = createToken(model.UserName, model.Current_Imei, model.Current_Device);
                        TokenResult result = new TokenResult();
                        result.token = token;
                        result.UserInfo = tk;
                        response = Request.CreateResponse(HttpStatusCode.OK, result);
                    }
                }
                else
                {
                    response = Request.CreateResponse(HttpStatusCode.Unauthorized, "Thông tin tài khoản không đúng.");
                }
            }
            catch (Exception ex)
            {
                response = Request.CreateResponse(HttpStatusCode.NotModified, ex);
            }

            return response;
        }

        [HttpPost]
        [Route("checklogin")]
        public HttpResponseMessage checklogin([FromBody] UserAppModel model)
        {
            HttpResponseMessage response = new HttpResponseMessage();
            response = Request.CreateResponse(HttpStatusCode.NotFound, "Mã bảo mật không đúng, vui lòng liên hệ Administrator.");
            try
            {
                TaiKhoanDAO tk_dao = new TaiKhoanDAO();
                if (tk_dao.CheckLogin_App(model.UserName, model.Password, model.Current_Imei, model.Current_Device))
                    response = Request.CreateResponse(HttpStatusCode.OK, new { loginSuccess = true });
                else
                    response = Request.CreateResponse(HttpStatusCode.NotModified, new { loginSuccess = false });
            }
            catch (Exception ex)
            {
                response = Request.CreateResponse(HttpStatusCode.NotModified, ex);
            }
            return response;
        }

        public class TokenResult
        {
            public string token { get; set; }
            public UserAppModel UserInfo { get; set; }
        }

        private string createToken(string userName, string imei, string device)
        {
            //Set issued at date
            DateTime issuedAt = DateTime.UtcNow;
            //set the time when it expires
            DateTime expires = DateTime.UtcNow.AddDays(7);

            var tokenHandler = new JwtSecurityTokenHandler();

            //create a identity and add claims to the user which we want to log in
            ClaimsIdentity claimsIdentity = new ClaimsIdentity(new[]
            {
                new Claim(ClaimTypes.Name, "ihealing"),
                new Claim("Username", userName),
                new Claim("Imei", imei),
                new Claim("Device", device)
            });

            const string sec = "taquangson@12345";
            //var now = DateTime.UtcNow;
            var securityKey = new Microsoft.IdentityModel.Tokens.SymmetricSecurityKey(System.Text.Encoding.Default.GetBytes(sec));
            var signingCredentials = new Microsoft.IdentityModel.Tokens.SigningCredentials(securityKey, Microsoft.IdentityModel.Tokens.SecurityAlgorithms.HmacSha256Signature);

            //create the jwt
            var token =
                (JwtSecurityToken)
                    tokenHandler.CreateJwtSecurityToken(issuer: "sontq", audience: "sontq",
                        subject: claimsIdentity, notBefore: issuedAt, expires: expires, signingCredentials: signingCredentials);
            var tokenString = tokenHandler.WriteToken(token);

            return tokenString;
        }

        [HttpGet]
        [Route("getAllHocSinhByTaikhoan")]
        public HttpResponseMessage getAllHocSinhByTaikhoan()
        {
            HttpResponseMessage response = new HttpResponseMessage();
            response = Request.CreateResponse(HttpStatusCode.NotFound, "Mã bảo mật không đúng, vui lòng liên hệ Administrator.");
            try
            {
                UserAppModel userinfo = AuthorHelper.checkAuthorization();

                if (userinfo == null)
                {
                    response = Request.CreateResponse(HttpStatusCode.Unauthorized, "Mã bảo mật không đúng, vui lòng liên hệ Administrator.");
                }
                else
                {
                    HocSinhDAO hsdao = new HocSinhDAO();
                    List<HocSinhModel> result = hsdao.GetAllBySDT(userinfo.UserName);
                    response = Request.CreateResponse(HttpStatusCode.Created, new { data = result, message = "OK" });
                }
            }
            catch (Exception ex)
            {
                response = Request.CreateResponse(HttpStatusCode.NotModified, ex);
            }
            return response;
        }

        [HttpGet]
        [Route("getAllLopByHocSinh")]
        public HttpResponseMessage getAllLopByHocSinh([FromUri] int ID_HocSinh)
        {
            HttpResponseMessage response = new HttpResponseMessage();
            response = Request.CreateResponse(HttpStatusCode.NotFound, "Mã bảo mật không đúng, vui lòng liên hệ Administrator.");
            try
            {
                UserAppModel userinfo = AuthorHelper.checkAuthorization();

                if (userinfo == null)
                {
                    response = Request.CreateResponse(HttpStatusCode.Unauthorized, "Mã bảo mật không đúng, vui lòng liên hệ Administrator.");
                }
                else
                {
                    LopHocDAO hsdao = new LopHocDAO();
                    List<LopHocModel> result = hsdao.GetAll_ByHocSinh(ID_HocSinh);
                    response = Request.CreateResponse(HttpStatusCode.Created, new { data = result, message = "OK" });
                }
            }
            catch (Exception ex)
            {
                response = Request.CreateResponse(HttpStatusCode.NotModified, ex);
            }
            return response;
        }

        [HttpGet]
        [Route("getalllop")]
        public HttpResponseMessage getalllop()
        {
            HttpResponseMessage response = new HttpResponseMessage();
            response = Request.CreateResponse(HttpStatusCode.NotFound, "Mã bảo mật không đúng, vui lòng liên hệ Administrator.");
            try
            {
                UserAppModel userinfo = AuthorHelper.checkAuthorization();

                if (userinfo == null)
                {
                    response = Request.CreateResponse(HttpStatusCode.Unauthorized, "Mã bảo mật không đúng, vui lòng liên hệ Administrator.");
                }
                else
                {
                    LopHocDAO hsdao = new LopHocDAO();
                    TaiKhoanDAO tkdao = new TaiKhoanDAO();
                    TaiKhoanModel userinfor = tkdao.GetByTenTaiKhoanOrEmail(userinfo.UserName);
                    List<LopHocModel> result = new List<LopHocModel>();
                    if (userinfor.Role == 3)
                    {
                        result = hsdao.GetByGiaoVien(userinfor.ID);
                    }
                    else if (userinfor.Role == 2)
                    {
                        result = hsdao.GetAll_LopHoc(userinfor.ID_ChiNhanh);
                    }
                    else if (userinfor.Role == 1)
                    {
                        result = hsdao.GetAll_LopHoc(0);
                    }
                    response = Request.CreateResponse(HttpStatusCode.Created, new { data = result, message = "OK" });
                }
            }
            catch (Exception ex)
            {
                response = Request.CreateResponse(HttpStatusCode.NotModified, ex);
            }
            return response;
        }

        [HttpGet]
        [Route("getAllLopChuaDangKyByHocSinh")]
        public HttpResponseMessage getAllLopChuaDangKyByHocSinh([FromUri] int ID_HocSinh)
        {
            HttpResponseMessage response = new HttpResponseMessage();
            response = Request.CreateResponse(HttpStatusCode.NotFound, "Mã bảo mật không đúng, vui lòng liên hệ Administrator.");
            try
            {
                UserAppModel userinfo = AuthorHelper.checkAuthorization();

                if (userinfo == null)
                {
                    response = Request.CreateResponse(HttpStatusCode.Unauthorized, "Mã bảo mật không đúng, vui lòng liên hệ Administrator.");
                }
                else
                {
                    LopHocDAO hsdao = new LopHocDAO();
                    List<LopHocModel> result = hsdao.GetLopChuaDangKy_ByHocSinh(ID_HocSinh);
                    response = Request.CreateResponse(HttpStatusCode.Created, new { data = result, message = "OK" });
                }
            }
            catch (Exception ex)
            {
                response = Request.CreateResponse(HttpStatusCode.NotModified, ex);
            }
            return response;
        }



        [HttpGet]
        [Route("getLichHocByLop")]
        public HttpResponseMessage getLichHocByLop([FromUri] int ID_Lop)
        {
            HttpResponseMessage response = new HttpResponseMessage();
            response = Request.CreateResponse(HttpStatusCode.NotFound, "Mã bảo mật không đúng, vui lòng liên hệ Administrator.");
            try
            {
                UserAppModel userinfo = AuthorHelper.checkAuthorization();

                if (userinfo == null)
                {
                    response = Request.CreateResponse(HttpStatusCode.Unauthorized, "Mã bảo mật không đúng, vui lòng liên hệ Administrator.");
                }
                else
                {
                    LichHocDAO lhdao = new LichHocDAO();
                    List<LichHocModel> result = lhdao.GetByLop(ID_Lop);
                    response = Request.CreateResponse(HttpStatusCode.Created, new { data = result, message = "OK" });
                }
            }
            catch (Exception ex)
            {
                response = Request.CreateResponse(HttpStatusCode.NotModified, ex);
            }
            return response;
        }

        [HttpPost]
        [Route("dangkyhoc")]
        public HttpResponseMessage dangkyhoc([FromBody] DangKyHocModel model)
        {
            HttpResponseMessage response = new HttpResponseMessage();
            response = Request.CreateResponse(HttpStatusCode.NotFound, "Mã bảo mật không đúng, vui lòng liên hệ Administrator.");
            try
            {
                UserAppModel userinfo = AuthorHelper.checkAuthorization();

                if (userinfo == null)
                {
                    response = Request.CreateResponse(HttpStatusCode.Unauthorized, "Mã bảo mật không đúng, vui lòng liên hệ Administrator.");
                }
                else
                {
                    DangKyHocDAO tk_dao = new DangKyHocDAO();
                    model.User_DangKy = userinfo.UserName;
                    model.TrangThai = 1;
                    if (tk_dao.InsertOrUpdate(model) > 0)
                        response = Request.CreateResponse(HttpStatusCode.OK, new { success = true, msg = "Đăng ký học thành công. Bộ phận văn phòng sẽ liên hệ trực tiếp với quý phụ huynh để hoàn tất thủ tục! Xin chân thành cảm ơn!" });
                    else
                        response = Request.CreateResponse(HttpStatusCode.NotModified, new { success = false, msg = "Đăng ký học không thành công. Vui lòng liên hệ với văn phòng trung tâm!" });
                }
            }
            catch (Exception ex)
            {
                response = Request.CreateResponse(HttpStatusCode.NotModified, ex);
            }
            return response;
        }

        [HttpPost]
        [Route("xinnghiphep")]
        public HttpResponseMessage xinnghiphep([FromBody] XinNghiPhepAppModel model)
        {
            HttpResponseMessage response = new HttpResponseMessage();
            response = Request.CreateResponse(HttpStatusCode.NotFound, "Mã bảo mật không đúng, vui lòng liên hệ Administrator.");
            try
            {
                UserAppModel userinfo = AuthorHelper.checkAuthorization();

                if (userinfo == null)
                {
                    response = Request.CreateResponse(HttpStatusCode.Unauthorized, "Mã bảo mật không đúng, vui lòng liên hệ Administrator.");
                }
                else
                {
                    XinNghiPhepDAO np_dao = new XinNghiPhepDAO();
                    foreach (DateTime ngaynghi in model.lstNgayNghi)
                    {
                        XinNghiPhepModel item = new XinNghiPhepModel();
                        item.NgayNghi = ngaynghi;
                        item.LyDoNghi = model.LyDo;
                        item.ID_HocSinh = model.ID_HocSinh;
                        np_dao.InsertOrUpdate(item);
                    }
                    response = Request.CreateResponse(HttpStatusCode.OK, new { success = true, msg = "Cảm ơn quý phụ huynh đã thông báo lịch nghỉ phép!" });
                }
            }
            catch (Exception ex)
            {
                response = Request.CreateResponse(HttpStatusCode.NotModified, ex);
            }
            return response;
        }

        [HttpGet]
        [Route("danhsachcahoc")]
        public HttpResponseMessage danhsachcahoc()
        {
            HttpResponseMessage response = new HttpResponseMessage();
            response = Request.CreateResponse(HttpStatusCode.NotFound, "Mã bảo mật không đúng, vui lòng liên hệ Administrator.");
            try
            {
                UserAppModel userinfo = AuthorHelper.checkAuthorization();

                if (userinfo == null)
                {
                    response = Request.CreateResponse(HttpStatusCode.Unauthorized, "Mã bảo mật không đúng, vui lòng liên hệ Administrator.");
                }
                else
                {
                    CaHocDAO dm_dao = new CaHocDAO();
                    List<CaHocModel> dt = dm_dao.GetAll();
                    response = Request.CreateResponse(HttpStatusCode.Created, new { data = dt, message = "OK" });
                }
            }
            catch (Exception ex)
            {
                response = Request.CreateResponse(HttpStatusCode.NotModified, ex);
            }
            return response;
        }

        [HttpGet]
        [Route("danhsachhocsinhtronglop")]
        public HttpResponseMessage danhsachhocsinhtronglop([FromUri]int ID_Lop, int Ca)
        {
            HttpResponseMessage response = new HttpResponseMessage();
            response = Request.CreateResponse(HttpStatusCode.NotFound, "Mã bảo mật không đúng, vui lòng liên hệ Administrator.");
            try
            {
                UserAppModel userinfo = AuthorHelper.checkAuthorization();

                if (userinfo == null)
                {
                    response = Request.CreateResponse(HttpStatusCode.Unauthorized, "Mã bảo mật không đúng, vui lòng liên hệ Administrator.");
                }
                else
                {
                    HocSinhDAO hsdao = new HocSinhDAO();
                    List<HocSinhModel> lhs = new List<HocSinhModel>();
                    lhs.AddRange(hsdao.GetByLop_HocSinh(ID_Lop));
                    DiemDanhDAO ddao = new DiemDanhDAO();
                    PhieuHocDAO phdao = new PhieuHocDAO();
                    CaHocModel ca = new CaHocDAO().GetByID(Ca);
                    DateTime quagiodiemdanh = DateTime.Now;
                    int quagio = 1;
                    quagiodiemdanh = DateTime.Now.Date + ca.GioBatDau + new TimeSpan(0, 45, 0);
                    if (DateTime.Compare(DateTime.Now, quagiodiemdanh) < 0 || userinfo.EmployeeType != 0)
                    {
                        quagio = 0;
                    }
                    foreach (HocSinhModel hs in lhs)
                    {
                        try
                        {
                            DiemDanhModel dd = ddao.GetByHocSinh_Ngay(ID_Lop, hs.ID, DateTime.Now, Ca);
                            List<PhieuHocModel> lph = phdao.GetByHocSinh_Thang(hs.ID, DateTime.Now.Month);
                            if (lph.Find(x => x.ID_Lop == ID_Lop) != null)
                            {
                                hs.DaMuaPhieu = true;
                            }
                            else
                            {
                                hs.DaMuaPhieu = false;
                            }
                            hs.ID_DiemDanh = dd.ID;
                            hs.CoPhep = dd.CoPhep;
                            hs.QuaGioDiemDanh = quagio;
                        }
                        catch (Exception ex)
                        {

                        }
                    }
                    response = Request.CreateResponse(HttpStatusCode.Created, new { data = lhs, message = "OK" });
                }
            }
            catch (Exception ex)
            {
                response = Request.CreateResponse(HttpStatusCode.NotModified, ex);
            }
            return response;
        }

        [HttpPost]
        [Route("diemdanhhocsinh")]
        public HttpResponseMessage diemdanhhocsinh([FromBody] DiemDanhModel d)
        {
            HttpResponseMessage response = new HttpResponseMessage();
            response = Request.CreateResponse(HttpStatusCode.NotFound, "Mã bảo mật không đúng, vui lòng liên hệ Administrator.");
            try
            {
                UserAppModel userinfo = AuthorHelper.checkAuthorization();

                if (userinfo == null)
                {
                    response = Request.CreateResponse(HttpStatusCode.Unauthorized, "Mã bảo mật không đúng, vui lòng liên hệ Administrator.");
                }
                else
                {
                    DiemDanhDAO ddao = new DiemDanhDAO();
                    DateTime batdau = DateTime.Now;
                    CaHocDAO chdao = new CaHocDAO();
                    CaHocModel ca = chdao.GetByID(d.Ca);
                    d.ThoiGianVaoLop = DateTime.Now.Date + ca.GioBatDau + new TimeSpan(0, 30, 0);
                    if (DateTime.Compare(d.ThoiGianVaoLop, DateTime.Now) > 0)
                    {
                        d.ThoiGianVaoLop = DateTime.Now;
                    }
                    PhieuHocDAO phd = new PhieuHocDAO();
                    TaiKhoanDAO tkdao = new TaiKhoanDAO();
                    TaiKhoanModel tk = tkdao.GetByTenTaiKhoanOrEmail(userinfo.UserName);
                    d.ID_NhanVien = tk.ID;
                    DiemDanhModel diemdanhcu = ddao.GetByHocSinh_Ngay(d.ID_Lop, d.ID_HocSinh, batdau, d.Ca);
                    d.ID = diemdanhcu.ID;
                    PhieuHocModel phmodel = phd.GetByHocSinh_Thang_Nam(d.ID_HocSinh, d.ID_Lop, DateTime.Now.Month, DateTime.Now.Year, d.HocDuoi);
                    if (diemdanhcu.ID == 0)
                    {
                        if (ddao.InsertOrUpdate(d))
                        {
                            DiemDanhHub.updateDiemDanh(d.ID_Lop, tk.TenDayDu, d.Ca);
                            if (d.CoPhep != 1)
                            {
                                if (phmodel.ID > 0)
                                {
                                    phmodel.SoBuoiDaHoc++;
                                    phd.InsertOrUpdate(phmodel);
                                }
                            }
                        }
                    }
                    else
                    {
                        if (diemdanhcu.CoPhep == d.CoPhep)
                        {
                            if (ddao.Delete(diemdanhcu.ID))
                            {
                                DiemDanhHub.updateDiemDanh(d.ID_Lop, tk.TenDayDu, d.Ca);
                                if (diemdanhcu.CoPhep != 1)
                                {
                                    if (phmodel.ID > 0)
                                    {
                                        phmodel.SoBuoiDaHoc--;
                                        phd.InsertOrUpdate(phmodel);
                                    }
                                }
                            }
                        }
                        else
                        {
                            if (ddao.InsertOrUpdate(d))
                            {
                                DiemDanhHub.updateDiemDanh(d.ID_Lop, tk.TenDayDu, d.Ca);
                                if (d.CoPhep == 1)
                                {
                                    if (diemdanhcu.CoPhep != 1)
                                    {
                                        if (phmodel.ID > 0)
                                        {
                                            phmodel.SoBuoiDaHoc--;
                                            phd.InsertOrUpdate(phmodel);
                                        }
                                    }
                                }
                                else if (d.CoPhep != 1)
                                {
                                    if (diemdanhcu.CoPhep == 1)
                                    {
                                        if (phmodel.ID > 0)
                                        {
                                            phmodel.SoBuoiDaHoc++;
                                            phd.InsertOrUpdate(phmodel);
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
                response = Request.CreateResponse(HttpStatusCode.OK, new { success = true, msg = "" });
            }
            catch (Exception ex)
            {
                response = Request.CreateResponse(HttpStatusCode.NotModified, ex);
            }
            return response;
        }


        public class HttpPostedFile
        {
            public HttpPostedFile(string name, string filename, byte[] file)
            {
                //Property Assignment
            }
            public string Name { get; private set; }
            public string Filename { get; private set; }
            public byte[] File { private set; get; }
        }

        [HttpPost]
        [Route("uploadanhdiemdanh")]
        public async Task<HttpResponseMessage> uploadanhdiemdanh()
        {
            log4net.ILog log = log4net.LogManager.GetLogger(typeof(AppController));
            try
            {
                var provider = new MultipartMemoryStreamProvider();
                await Request.Content.ReadAsMultipartAsync(provider);
                log.Info("Đoc file từ request");
                var files = new Dictionary<string, HttpPostedFile>(StringComparer.InvariantCultureIgnoreCase);
                log.Info("Lấy file");                
                //var fileNameParam = provider.Contents[0].Headers.ContentDisposition.Parameters
                //    .FirstOrDefault(p => p.Name.ToLower() == "filename");
                //log.Info("Lấy tên file : " + fileNameParam);
                var fileNameParam = await provider.Contents[1].ReadAsStringAsync();
                string fileName = (fileNameParam == null) ? "" : fileNameParam.Trim('"');
                fileName = DateTime.Now.ToString("ddMMyyyyhhmmssss") + fileNameParam;
                log.Info("Tạo filename : " + fileName);
                byte[] file = await provider.Contents[0].ReadAsByteArrayAsync();
                log.Info("Đọc byte : " + file.Length);
                string filePath = AppDomain.CurrentDomain.BaseDirectory + @"Images\AnhDiemDanh" + @"\" + fileName;
                log.Info("Filepath: " + filePath);
                File.WriteAllBytes(filePath, file);
                log.Info("Ghi file");
                File.WriteAllBytes(filePath, file);
                string result = "/Images/" + "AnhDiemDanh/" + fileName;
                return Request.CreateResponse(HttpStatusCode.Created, new { data = result, message = "OK" }); ;
            }
            catch (Exception ex)
            {
                return null;
            }
        }

        public class AnhDiemDanh
        {
            public string FilePath { get; set; }
            public int ID_LopHoc { get; set; }
            public int ID_CaHoc { get; set; }
            public DateTime Ngay { get; set; }
        }

        [HttpPost]
        [Route("capnhatanhdiemdanh")]
        public HttpResponseMessage capnhatanhdiemdanh([FromBody] AnhDiemDanh model)
        {
            HttpResponseMessage response = new HttpResponseMessage();
            response = Request.CreateResponse(HttpStatusCode.NotFound, "Mã bảo mật không đúng, vui lòng liên hệ Administrator.");
            try
            {
                UserAppModel userinfo = AuthorHelper.checkAuthorization();

                if (userinfo == null)
                {
                    response = Request.CreateResponse(HttpStatusCode.Unauthorized, "Mã bảo mật không đúng, vui lòng liên hệ Administrator.");
                }
                else
                {
                    AnhDiemDanhModel item = new AnhDiemDanhModel();
                    item.DuongDan = model.FilePath;
                    item.ID_LopHoc = model.ID_LopHoc;
                    item.ID_CaHoc = model.ID_CaHoc;
                    item.NgayTao = model.Ngay;
                    AnhDiemDanhDAO dao = new AnhDiemDanhDAO();
                    dao.InsertOrUpdate(item);
                    response = Request.CreateResponse(HttpStatusCode.Created, new { success = true, message = "OK" });
                }
            }
            catch (Exception ex)
            {
                response = Request.CreateResponse(HttpStatusCode.NotModified, ex);
            }
            return response;
        }


        [HttpGet]
        [Route("getalltinnhan")]
        public HttpResponseMessage getalltinnhan()
        {
            HttpResponseMessage response = new HttpResponseMessage();
            response = Request.CreateResponse(HttpStatusCode.NotFound, "Mã bảo mật không đúng, vui lòng liên hệ Administrator.");
            try
            {
                UserAppModel userinfo = AuthorHelper.checkAuthorization();

                if (userinfo == null)
                {
                    response = Request.CreateResponse(HttpStatusCode.Unauthorized, "Mã bảo mật không đúng, vui lòng liên hệ Administrator.");
                }
                else
                {
                    TinNhanDAO tndao = new TinNhanDAO();
                    response = Request.CreateResponse(HttpStatusCode.OK, new { success = true, data = tndao.GetByUser(userinfo.UserName) });
                }
            }
            catch (Exception ex)
            {
                response = Request.CreateResponse(HttpStatusCode.NotModified, ex);
            }
            return response;
        }

        [HttpPost]
        [Route("guitinnhan")]
        public HttpResponseMessage guitinnhan(TinNhanModel model)
        {
            HttpResponseMessage response = new HttpResponseMessage();
            response = Request.CreateResponse(HttpStatusCode.NotFound, "Mã bảo mật không đúng, vui lòng liên hệ Administrator.");
            try
            {
                UserAppModel userinfo = AuthorHelper.checkAuthorization();

                if (userinfo == null)
                {
                    response = Request.CreateResponse(HttpStatusCode.Unauthorized, "Mã bảo mật không đúng, vui lòng liên hệ Administrator.");
                }
                else
                {
                    TaiKhoanDAO tk_dao = new TaiKhoanDAO();
                    TinNhanDAO tndao = new TinNhanDAO();
                    if(tndao.InsertOrUpdate(model) > 0)
                    {
                        response = Request.CreateResponse(HttpStatusCode.Created, new { success = true, message = "OK" });
                    }
                    else
                    {
                        response = Request.CreateResponse(HttpStatusCode.Created, new { success = false, message = "Error" });
                    }
                }
            }
            catch (Exception ex)
            {
                response = Request.CreateResponse(HttpStatusCode.NotModified, ex);
            }
            return response;
        }
    }
}