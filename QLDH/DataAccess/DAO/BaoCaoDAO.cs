using QLDH.DataAccess.Helper;
using QLDH.DataAccess.Models;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Reflection;
using System.Web;
namespace QLDH.DataAccess.DAO
{
    public class BaoCaoDAO
    {
        log4net.ILog log = log4net.LogManager.GetLogger(typeof(TaiKhoanDAO));
        private DataHelper helper;
        public BaoCaoDAO()
        {
            helper = new DataHelper();
        }

        public class ThongKeBuoiHocTheoHocSinhModel
        {
            public string TenLop { get; set; }
            public string TenHocSinh { get; set; }
            public string TenGiaoVien { get; set; }
            public DateTime ThoiGianVaoLop { get; set; }
            public int CoPhep { get; set; }
            public string CoMat { get; set; }
            public string VangCoPhep { get; set; }
            public string VangKhongPhep { get; set; }
        }

        private ThongKeBuoiHocTheoHocSinhModel GetThongKeBuoiHocTheoHocSinhModelFromDataRow(DataRow dr)
        {
            ThongKeBuoiHocTheoHocSinhModel obj = new ThongKeBuoiHocTheoHocSinhModel();
            foreach (PropertyInfo propertyInfo in obj.GetType().GetProperties())
            {
                if (dr.Table.Columns.IndexOf(propertyInfo.Name) >= 0)
                {

                    if (!string.IsNullOrWhiteSpace(dr[propertyInfo.Name].ToString()))
                    {
                        var value = Convert.ChangeType(dr[propertyInfo.Name], propertyInfo.PropertyType);
                        propertyInfo.SetValue(obj, value);
                    }
                    else
                    {
                        propertyInfo.SetValue(obj, null);
                    }
                }
                else
                {
                    propertyInfo.SetValue(obj, null);
                }
            }
            return obj;
        }

        public List<ThongKeBuoiHocTheoHocSinhModel> ThongKeBuoiHocTheoHocSinh(int ID_Lop, int ID_HocSinh, DateTime TuNgay, DateTime DenNgay)
        {
            try
            {
                List<ThongKeBuoiHocTheoHocSinhModel> result = new List<ThongKeBuoiHocTheoHocSinhModel>();
                SqlParameter[] pars = new SqlParameter[]
                {
                    new SqlParameter("@ID_HocSinh",ID_HocSinh),
                    new SqlParameter("@ID_Lop",ID_Lop),
                    new SqlParameter("@TuNgay",TuNgay),
                    new SqlParameter("@DenNgay",DenNgay)
                };
                DataSet ds = helper.ExecuteDataSet("sp_BaoCao_ThongKeBuoiHocTheoHocSinh", pars);
                DataTable dt = ds.Tables[0];
                foreach (DataRow dr in dt.Rows)
                {
                    ThongKeBuoiHocTheoHocSinhModel item = GetThongKeBuoiHocTheoHocSinhModelFromDataRow(dr);
                    switch (item.CoPhep)
                    {
                        case 0:
                            item.CoMat = "x";
                            item.VangCoPhep = "";
                            item.VangKhongPhep = "";
                            break;
                        case -1:
                            item.CoMat = "";
                            item.VangCoPhep = "";
                            item.VangKhongPhep = "x";
                            break;
                        case 1:
                            item.CoMat = "";
                            item.VangCoPhep = "x";
                            item.VangKhongPhep = "";
                            break;
                    }
                    result.Add(item);
                }
                return result;
            }
            catch (Exception ex)
            {
                log.Error("sp_BaoCao_ThongKeBuoiHocTheoHocSinh " + ex.Message);
                return null;


            }
        }

        public class BaoCaoPhieuHocTheoHocSinhModel
        {
            public int ID_HocSinh { get; set; }
            public string TenHocSinh { get; set; }
            public int ID_PhieuHoc { get; set; }
            public int ID_Lop { get; set; }
            public string TenLop { get; set; }
            public int SoBuoi { get; set; }
            public int SoBuoiDaHoc { get; set; }
            public DateTime NgayTao { get; set; }
            public float SoTien { get; set; }
            public int ID_NhanVien { get; set; }
            public string TenNhanVien { get; set; }
            public int Thang { get; set; }
            public int Nam { get; set; }
        }

        private BaoCaoPhieuHocTheoHocSinhModel GetBaoCaoPhieuHocTheoHocSinhModelFromDataRow(DataRow dr)
        {
            BaoCaoPhieuHocTheoHocSinhModel obj = new BaoCaoPhieuHocTheoHocSinhModel();
            foreach (PropertyInfo propertyInfo in obj.GetType().GetProperties())
            {
                if (dr.Table.Columns.IndexOf(propertyInfo.Name) >= 0)
                {

                    if (!string.IsNullOrWhiteSpace(dr[propertyInfo.Name].ToString()))
                    {
                        var value = Convert.ChangeType(dr[propertyInfo.Name], propertyInfo.PropertyType);
                        propertyInfo.SetValue(obj, value);
                    }
                    else
                    {
                        propertyInfo.SetValue(obj, null);
                    }
                }
                else
                {
                    propertyInfo.SetValue(obj, null);
                }
            }
            return obj;
        }

        public List<BaoCaoPhieuHocTheoHocSinhModel> GetBaoCaoPhieuHocTheoHocSinh(int ID_HocSinh, DateTime TuNgay, DateTime DenNgay)
        {
            try
            {
                List<BaoCaoPhieuHocTheoHocSinhModel> result = new List<BaoCaoPhieuHocTheoHocSinhModel>();
                SqlParameter[] pars = new SqlParameter[]
                {
                    new SqlParameter("@ID_HocSinh",ID_HocSinh),
                    new SqlParameter("@TuNgay",TuNgay),
                    new SqlParameter("@DenNgay",DenNgay)
                };
                DataSet ds = helper.ExecuteDataSet("sp_BaoCao_BaoCaoPhieuHocTheoHocSinh", pars);
                DataTable dt = ds.Tables[0];
                foreach (DataRow dr in dt.Rows)
                {
                    BaoCaoPhieuHocTheoHocSinhModel item = GetBaoCaoPhieuHocTheoHocSinhModelFromDataRow(dr);
                    result.Add(item);
                }
                return result;
            }
            catch (Exception ex)
            {
                log.Error("sp_BaoCao_BaoCaoPhieuHocTheoHocSinh " + ex.Message);
                return null;
            }
        }
        public List<BaoCaoPhieuHocTheoHocSinhModel> GetBaoCaoPhieuHocTheoHocSinh_TheoThang(int ID_HocSinh, int Thang)
        {
            try
            {
                List<BaoCaoPhieuHocTheoHocSinhModel> result = new List<BaoCaoPhieuHocTheoHocSinhModel>();
                SqlParameter[] pars = new SqlParameter[]
                {
                    new SqlParameter("@ID_HocSinh",ID_HocSinh),
                    new SqlParameter("@Thang",Thang)
                };
                DataSet ds = helper.ExecuteDataSet("sp_BaoCao_BaoCaoPhieuHocTheoHocSinh_TheoThang", pars);
                DataTable dt = ds.Tables[0];
                foreach (DataRow dr in dt.Rows)
                {
                    BaoCaoPhieuHocTheoHocSinhModel item = GetBaoCaoPhieuHocTheoHocSinhModelFromDataRow(dr);
                    result.Add(item);
                }
                return result;
            }
            catch (Exception ex)
            {
                log.Error("sp_BaoCao_BaoCaoPhieuHocTheoHocSinh " + ex.Message);
                return null;
            }
        }

        public class BaoCaoSoBuoiHoc_HocSinh_ThangModel
        {
            public string TenLop { get; set; }
            public int Thang { get; set; }
            public int Nam { get; set; }
            public int SoBuoiHoc { get; set; }
            public int SoBuoiDaMua { get; set; }
            public int SoBuoiDaMuaPhuThu { get; set; }
            public int SoBuoiDaMuaGiamTru { get; set; }
            public int SoBuoiTheoLich { get; set; }
            public int ID_LopHoc { get; set; }
            public int ID_PhieuHoc { get; set; }
            public float DonGia { get; set; }
            public List<int> LichHoc { get; set; }
            public int ID_CongThucTinhHocPhi { get; set; }
            public CongThucTinhHocPhiModel CongThucTinhHocPhi { get; set; }
            public int LoaiHinh { get; set; }
        }

        public class BaoCaoSoBuoiHoc_HocSinh_ThangModel_ByDate
        {
            public int Thang { get; set; }
            public int Nam { get; set; }
            public bool NoHocPhi { get; set; }
            public List<BaoCaoSoBuoiHoc_HocSinh_ThangModel> data { get; set; }
        }

        private BaoCaoSoBuoiHoc_HocSinh_ThangModel GetBaoCaoSoBuoiHoc_HocSinh_ThangModelFromDataRow(DataRow dr)
        {
            BaoCaoSoBuoiHoc_HocSinh_ThangModel obj = new BaoCaoSoBuoiHoc_HocSinh_ThangModel();
            foreach (PropertyInfo propertyInfo in obj.GetType().GetProperties())
            {
                if (dr.Table.Columns.IndexOf(propertyInfo.Name) >= 0)
                {

                    if (!string.IsNullOrWhiteSpace(dr[propertyInfo.Name].ToString()))
                    {
                        var value = Convert.ChangeType(dr[propertyInfo.Name], propertyInfo.PropertyType);
                        propertyInfo.SetValue(obj, value);
                    }
                    else
                    {
                        propertyInfo.SetValue(obj, null);
                    }
                }
                else
                {
                    propertyInfo.SetValue(obj, null);
                }
            }
            return obj;
        }


        public List<BaoCaoSoBuoiHoc_HocSinh_ThangModel> GetBaoCaoSoBuoiHoc_HocSinh_Thang(int ID_HocSinh, DateTime TuNgay, DateTime DenNgay)
        {
            try
            {
                List<BaoCaoSoBuoiHoc_HocSinh_ThangModel> result = new List<BaoCaoSoBuoiHoc_HocSinh_ThangModel>();
                SqlParameter[] pars = new SqlParameter[]
                {
                    new SqlParameter("@ID_HocSinh",ID_HocSinh),
                    new SqlParameter("@TuNgay",TuNgay),
                    new SqlParameter("@DenNgay",DenNgay)
                };
                DataSet ds = helper.ExecuteDataSet("sp_BaoCao_BaoCaoSoBuoiHoc_HocSinh_Thang", pars);
                DataTable dt = ds.Tables[0];
                HocSinhDAO hsdao = new HocSinhDAO();
                HocSinhModel hs = hsdao.GetById(ID_HocSinh);
                foreach (DataRow dr in dt.Rows)
                {
                    BaoCaoSoBuoiHoc_HocSinh_ThangModel item = GetBaoCaoSoBuoiHoc_HocSinh_ThangModelFromDataRow(dr);
                    item.SoBuoiDaMua += item.SoBuoiDaMuaPhuThu;
                    item.SoBuoiDaMua -= item.SoBuoiDaMuaGiamTru;
                    item.LichHoc = new List<int>();
                    List<LichHocModel> lich = new LichHocDAO().GetByLop(item.ID_LopHoc);
                    foreach (LichHocModel l in lich)
                    {
                        item.LichHoc.Add(l.Thu);
                    }
                    item.CongThucTinhHocPhi = new CongThucTinhHocPhiDAO().GetByID(item.ID_CongThucTinhHocPhi);
                    if (item.CongThucTinhHocPhi != null)
                        if (item.CongThucTinhHocPhi.ApDungCK == 1 && hs.GiamGia > 0)
                    {
                        item.CongThucTinhHocPhi.HocPhi = item.CongThucTinhHocPhi.HocPhi / 100 * (100 - (decimal)hs.GiamGia);
                    }
                    result.Add(item);
                }
                return result;
            }
            catch (Exception ex)
            {
                log.Error("sp_BaoCao_BaoCaoPhieuHocTheoHocSinh_TheoThang " + ex.Message);
                return null;
            }
        }

        public List<BaoCaoSoBuoiHoc_HocSinh_ThangModel> BaoCaoPhieuHoc_ByHocSinh(int ID_HocSinh)
        {
            try
            {
                List<BaoCaoSoBuoiHoc_HocSinh_ThangModel> result = new List<BaoCaoSoBuoiHoc_HocSinh_ThangModel>();
                SqlParameter[] pars = new SqlParameter[]
                {
                    new SqlParameter("@ID_HocSinh",ID_HocSinh)
                };
                DataSet ds = helper.ExecuteDataSet("sp_BaoCao_BaoCaoPhieuHoc_ByHocSinh", pars);
                DataTable dt = ds.Tables[0];
                HocSinhDAO hsdao = new HocSinhDAO();
                HocSinhModel hs = hsdao.GetById(ID_HocSinh);
                foreach (DataRow dr in dt.Rows)
                {
                    BaoCaoSoBuoiHoc_HocSinh_ThangModel item = GetBaoCaoSoBuoiHoc_HocSinh_ThangModelFromDataRow(dr);
                    item.SoBuoiDaMua += item.SoBuoiDaMuaPhuThu;
                    item.SoBuoiDaMua -= item.SoBuoiDaMuaGiamTru;
                    item.LichHoc = new List<int>();
                    List<LichHocModel> lich = new LichHocDAO().GetByLop(item.ID_LopHoc);
                    foreach (LichHocModel l in lich)
                    {
                        item.LichHoc.Add(l.Thu);
                    }
                    item.CongThucTinhHocPhi = new CongThucTinhHocPhiDAO().GetByID(item.ID_CongThucTinhHocPhi);
                    if (item.CongThucTinhHocPhi != null)
                        if (item.CongThucTinhHocPhi.ApDungCK == 1 && hs.GiamGia > 0)
                        {
                            item.CongThucTinhHocPhi.HocPhi = item.CongThucTinhHocPhi.HocPhi / 100 * (100 - (decimal)hs.GiamGia);
                        }
                    result.Add(item);
                }
                return result;
            }
            catch (Exception ex)
            {
                log.Error("sp_BaoCao_BaoCaoPhieuHoc_ByHocSinh " + ex.Message);
                return null;
            }
        }

        public class ThongKeBuoiHocTheoGiaoVienModel
        {
            public DateTime NgayHoc { get; set; }
            public DateTime GioBatDau { get; set; }
            public DateTime GioKetThuc { get; set; }
            public string TenLop { get; set; }
            public string TenCa { get; set; }
            public int SiSo { get; set; }
            public int ID_Lop { get; set; }
        }

        private ThongKeBuoiHocTheoGiaoVienModel GetThongKeBuoiHocTheoGiaoVienModelFromDataRow(DataRow dr)
        {
            ThongKeBuoiHocTheoGiaoVienModel obj = new ThongKeBuoiHocTheoGiaoVienModel();
            foreach (PropertyInfo propertyInfo in obj.GetType().GetProperties())
            {
                if (dr.Table.Columns.IndexOf(propertyInfo.Name) >= 0)
                {

                    if (!string.IsNullOrWhiteSpace(dr[propertyInfo.Name].ToString()))
                    {
                        var value = Convert.ChangeType(dr[propertyInfo.Name], propertyInfo.PropertyType);
                        propertyInfo.SetValue(obj, value);
                    }
                    else
                    {
                        propertyInfo.SetValue(obj, null);
                    }
                }
                else
                {
                    propertyInfo.SetValue(obj, null);
                }
            }
            return obj;
        }

        public List<ThongKeBuoiHocTheoGiaoVienModel> GetData_ThongKeBuoiHocTheoGiaoVien(int ID_Lop, int ID_GiaoVien, DateTime TuNgay, DateTime DenNgay)
        {
            try
            {
                List<ThongKeBuoiHocTheoGiaoVienModel> result = new List<ThongKeBuoiHocTheoGiaoVienModel>();
                SqlParameter[] pars = new SqlParameter[]
                {
                    new SqlParameter("@ID_GiaoVien",ID_GiaoVien),
                    new SqlParameter("@ID_Lop",ID_Lop),
                    new SqlParameter("@TuNgay",TuNgay),
                    new SqlParameter("@DenNgay",DenNgay)
                };
                DataSet ds = helper.ExecuteDataSet("sp_BaoCao_BaoCaoSoBuoiHocTheoGiaoVien", pars);
                DataTable dt = ds.Tables[0];
                foreach (DataRow dr in dt.Rows)
                {
                    ThongKeBuoiHocTheoGiaoVienModel item = GetThongKeBuoiHocTheoGiaoVienModelFromDataRow(dr);
                    result.Add(item);
                }
                return result;
            }
            catch (Exception ex)
            {
                log.Error("sp_BaoCao_BaoCaoSoBuoiHocTheoGiaoVien " + ex.Message);
                return null;


            }
        }

        public class BaoCaoDoanhThuModel
        {
            public DateTime NgayTao { get; set; }
            public string MaPhieu { get; set; }
            public DateTime ThoiGianIn { get; set; }
            public DateTime NgayThanhToan { get; set; }
            public int TrangThai { get; set; }
            public double DaThanhToan { get; set; }
            public double TongThu { get; set; }
            public string TenNhanVien { get; set; }
            public string TenHocSinh { get; set; }
            public string HinhThucThanhToan { get; set; }
        }

        private BaoCaoDoanhThuModel GetBaoCaoDoanhThuModelFromDataRow(DataRow dr)
        {
            BaoCaoDoanhThuModel obj = new BaoCaoDoanhThuModel();
            foreach (PropertyInfo propertyInfo in obj.GetType().GetProperties())
            {
                if (dr.Table.Columns.IndexOf(propertyInfo.Name) >= 0)
                {

                    if (!string.IsNullOrWhiteSpace(dr[propertyInfo.Name].ToString()))
                    {
                        var value = Convert.ChangeType(dr[propertyInfo.Name], propertyInfo.PropertyType);
                        propertyInfo.SetValue(obj, value);
                    }
                    else
                    {
                        propertyInfo.SetValue(obj, null);
                    }
                }
                else
                {
                    propertyInfo.SetValue(obj, null);
                }
            }
            return obj;
        }

        public List<BaoCaoDoanhThuModel> GetBaoCaoDoanhThu(int ID_ChiNhanh, int ID_NhanVien, DateTime TuNgay, DateTime DenNgay)
        {
            try
            {
                List<BaoCaoDoanhThuModel> result = new List<BaoCaoDoanhThuModel>();
                SqlParameter[] pars = new SqlParameter[]
                {
                    new SqlParameter("@ID_ChiNhanh",ID_ChiNhanh),
                    new SqlParameter("@ID_NhanVien",ID_NhanVien),
                    new SqlParameter("@from",TuNgay),
                    new SqlParameter("@to",DenNgay)
                };
                DataSet ds = helper.ExecuteDataSet("sp_LichSuThanhToan_GetByDate", pars);
                DataTable dt = ds.Tables[0];
                foreach (DataRow dr in dt.Rows)
                {
                    BaoCaoDoanhThuModel item = GetBaoCaoDoanhThuModelFromDataRow(dr);
                    result.Add(item);
                }
                return result;
            }
            catch (Exception ex)
            {
                log.Error("sp_LichSuThanhToan_GetByDate " + ex.Message);
                return null;
            }
        }

        public List<BaoCaoDoanhThuModel> GetBaoCaoDoanhThu2(int ID_ChiNhanh, int ID_NhanVien, DateTime TuNgay, DateTime DenNgay)
        {
            try
            {
                List<BaoCaoDoanhThuModel> result = new List<BaoCaoDoanhThuModel>();
                SqlParameter[] pars = new SqlParameter[]
                {
                    new SqlParameter("@ID_ChiNhanh",ID_ChiNhanh),
                    new SqlParameter("@ID_NhanVien",ID_NhanVien),
                    new SqlParameter("@from",TuNgay),
                    new SqlParameter("@to",DenNgay)
                };
                DataSet ds = helper.ExecuteDataSet("sp_BaoCaoDoanhThu_GetByDate", pars);
                DataTable dt = ds.Tables[0];
                foreach (DataRow dr in dt.Rows)
                {
                    BaoCaoDoanhThuModel item = GetBaoCaoDoanhThuModelFromDataRow(dr);
                    result.Add(item);
                }
                return result;
            }
            catch (Exception ex)
            {
                log.Error("sp_BaoCaoDoanhThu_GetByDate " + ex.Message);
                return null;
            }
        }

        public List<BaoCaoDoanhThuModel> GetBaoCaoHachToan(int ID_ChiNhanh, int ID_NhanVien, int Thang, int Nam)
        {
            try
            {
                List<BaoCaoDoanhThuModel> result = new List<BaoCaoDoanhThuModel>();
                SqlParameter[] pars = new SqlParameter[]
                {
                    new SqlParameter("@ID_ChiNhanh",ID_ChiNhanh),
                    new SqlParameter("@ID_NhanVien",ID_NhanVien),
                    new SqlParameter("@Thang",Thang),
                    new SqlParameter("@Nam",Nam)
                };
                DataSet ds = helper.ExecuteDataSet("sp_LichSuThanhToan_GetByDatePhieuHoc", pars);
                DataTable dt = ds.Tables[0];
                foreach (DataRow dr in dt.Rows)
                {
                    BaoCaoDoanhThuModel item = GetBaoCaoDoanhThuModelFromDataRow(dr);
                    result.Add(item);
                }
                return result;
            }
            catch (Exception ex)
            {
                log.Error("sp_LichSuThanhToan_GetByDatePhieuHoc " + ex.Message);
                return null;
            }
        }

        public class BaoCaoNoPhieuModel
        {
            public string TenHocSinh { get; set; }
            public int SoPhieuNo { get; set; }
            public string TenLop { get; set; }
            public string TenLopDaMua { get; set; }
            public int ID_HocSinh { get; set; }
        }

        private BaoCaoNoPhieuModel GetBaoCaoNoPhieuModelFromDataRow(DataRow dr)
        {
            BaoCaoNoPhieuModel obj = new BaoCaoNoPhieuModel();
            foreach (PropertyInfo propertyInfo in obj.GetType().GetProperties())
            {
                if (dr.Table.Columns.IndexOf(propertyInfo.Name) >= 0)
                {

                    if (!string.IsNullOrWhiteSpace(dr[propertyInfo.Name].ToString()))
                    {
                        var value = Convert.ChangeType(dr[propertyInfo.Name], propertyInfo.PropertyType);
                        propertyInfo.SetValue(obj, value);
                    }
                    else
                    {
                        propertyInfo.SetValue(obj, null);
                    }
                }
                else
                {
                    propertyInfo.SetValue(obj, null);
                }
            }
            return obj;
        }

        public List<BaoCaoNoPhieuModel> GetBaoCaoNoPhieu(int ID_ChiNhanh, int Thang, int Nam)
        {
            try
            {
                List<BaoCaoNoPhieuModel> result = new List<BaoCaoNoPhieuModel>();
                SqlParameter[] pars = new SqlParameter[]
                {
                    new SqlParameter("@ID_ChiNhanh",ID_ChiNhanh),
                    new SqlParameter("@Thang",Thang),
                    new SqlParameter("@Nam",Nam)
                };
                DataSet ds = helper.ExecuteDataSet("sp_BaoCao_BaoCaoNoPhieu", pars);
                DataTable dt = ds.Tables[0];
                foreach (DataRow dr in dt.Rows)
                {
                    BaoCaoNoPhieuModel item = GetBaoCaoNoPhieuModelFromDataRow(dr);
                    result.Add(item);
                }
                return result;
            }
            catch (Exception ex)
            {
                log.Error("sp_BaoCao_BaoCaoNoPhieu " + ex.Message);
                return null;
            }
        }

        public class BieuDoDiemModel
        {
            public string TenHocSinh { get; set; }
            public float Diem { get; set; }
            public string ThoiGianVaoLop { get; set; }
        }

        private BieuDoDiemModel GetBieuDoDiemModelFromDataRow(DataRow dr)
        {
            BieuDoDiemModel obj = new BieuDoDiemModel();
            foreach (PropertyInfo propertyInfo in obj.GetType().GetProperties())
            {
                if (dr.Table.Columns.IndexOf(propertyInfo.Name) >= 0)
                {

                    if (!string.IsNullOrWhiteSpace(dr[propertyInfo.Name].ToString()))
                    {
                        var value = Convert.ChangeType(dr[propertyInfo.Name], propertyInfo.PropertyType);
                        propertyInfo.SetValue(obj, value);
                    }
                    else
                    {
                        propertyInfo.SetValue(obj, null);
                    }
                }
                else
                {
                    propertyInfo.SetValue(obj, null);
                }
            }
            return obj;
        }

        public List<BieuDoDiemModel> GetBieuDoDiem(int ID_Lop, int ID_HocSinh, DateTime from, DateTime to)
        {
            try
            {
                List<BieuDoDiemModel> result = new List<BieuDoDiemModel>();
                SqlParameter[] pars = new SqlParameter[]
                {
                    new SqlParameter("@ID_Lop",ID_Lop),
                    new SqlParameter("@ID_HocSinh",ID_HocSinh),
                    new SqlParameter("@from",from),
                    new SqlParameter("@to",to)
                };
                DataSet ds = helper.ExecuteDataSet("sp_BaoCao_BieuDoDiem", pars);
                DataTable dt = ds.Tables[0];
                foreach (DataRow dr in dt.Rows)
                {
                    BieuDoDiemModel item = GetBieuDoDiemModelFromDataRow(dr);
                    result.Add(item);
                }
                return result;
            }
            catch (Exception ex)
            {
                log.Error("sp_BaoCao_BieuDoDiem " + ex.Message);
                return null;
            }
        }

        public List<BieuDoDiemModel> GetBieuDoDiemTrungBinh_TheoLop(int ID_Lop, DateTime from, DateTime to)
        {
            try
            {
                List<BieuDoDiemModel> result = new List<BieuDoDiemModel>();
                SqlParameter[] pars = new SqlParameter[]
                {
                    new SqlParameter("@ID_Lop",ID_Lop),
                    new SqlParameter("@from",from),
                    new SqlParameter("@to",to)
                };
                DataSet ds = helper.ExecuteDataSet("sp_BaoCao_BieuDoDiemTrungBinh_TheoLop", pars);
                DataTable dt = ds.Tables[0];
                foreach (DataRow dr in dt.Rows)
                {
                    BieuDoDiemModel item = GetBieuDoDiemModelFromDataRow(dr);
                    result.Add(item);
                }
                return result;
            }
            catch (Exception ex)
            {
                log.Error("sp_BaoCao_BieuDoDiemTrungBinh_TheoLop " + ex.Message);
                return null;
            }
        }

        private DiemDanhTheoNgayModel GetDiemDanhTheoNgayModelFromDataRow(DataRow dr)
        {
            DiemDanhTheoNgayModel obj = new DiemDanhTheoNgayModel();
            foreach (PropertyInfo propertyInfo in obj.GetType().GetProperties())
            {
                if (dr.Table.Columns.IndexOf(propertyInfo.Name) >= 0)
                {

                    if (!string.IsNullOrWhiteSpace(dr[propertyInfo.Name].ToString()))
                    {
                        var value = Convert.ChangeType(dr[propertyInfo.Name], propertyInfo.PropertyType);
                        propertyInfo.SetValue(obj, value);
                    }
                    else
                    {
                        propertyInfo.SetValue(obj, null);
                    }
                }
                else
                {
                    propertyInfo.SetValue(obj, null);
                }
            }
            return obj;
        }
        public List<DiemDanhTheoNgayModel> GetBaoCaoDiemDanhTheoNgay(DateTime from, DateTime to)
        {
            try
            {
                List<DiemDanhTheoNgayModel> result = new List<DiemDanhTheoNgayModel>();
                SqlParameter[] pars = new SqlParameter[]
                {
                    new SqlParameter("@from",from),
                    new SqlParameter("@to",to)
                };
                DataSet ds = helper.ExecuteDataSet("sp_BaoCao_BaoCaoDiemDanhTheoNgay", pars);
                DataTable dt = ds.Tables[0];
                foreach (DataRow dr in dt.Rows)
                {
                    DiemDanhTheoNgayModel item = GetDiemDanhTheoNgayModelFromDataRow(dr);
                    result.Add(item);
                }
                return result;
            }
            catch (Exception ex)
            {
                log.Error("sp_BaoCao_BaoCaoDiemDanhTheoNgay " + ex.Message);
                return null;
            }
        }
        public List<DiemDanhTheoNgayModel> GetBaoCaoDiemDanhTheoNgayVaLop(int ID_Lop, DateTime date)
        {
            try
            {
                List<DiemDanhTheoNgayModel> result = new List<DiemDanhTheoNgayModel>();
                SqlParameter[] pars = new SqlParameter[]
                {
                    new SqlParameter("@ID_Lop",ID_Lop),
                    new SqlParameter("@Date",date)
                };
                DataSet ds = helper.ExecuteDataSet("GetBaoCaoDiemDanhTheoNgayVaLop", pars);
                DataTable dt = ds.Tables[0];
                foreach (DataRow dr in dt.Rows)
                {
                    DiemDanhTheoNgayModel item = GetDiemDanhTheoNgayModelFromDataRow(dr);
                    result.Add(item);
                }
                return result;
            }
            catch (Exception ex)
            {
                log.Error("GetBaoCaoDiemDanhTheoNgayVaLop " + ex.Message);
                return null;
            }
        }

        public class DiemDanhTheoNgayModel
        {
            public DateTime NgayHoc { get; set; }
            public int ID_Lop { get; set; }
            public string MaHocSinh { get; set; }
            public string TenHocSinh { get; set; }
            public int CoPhep { get; set; }
            public int CoMat { get; set; }
            public int CoDiemDanh { get; set; }
            public string TenLop { get; set; }
            public string NguoiDiemDanh { get; set; }
            public DateTime NgayCapNhatDiemDanh { get; set; }
        }

        private DiemDanhTheoLopModel GetDiemDanhTheoLopModelFromDataRow(DataRow dr)
        {
            DiemDanhTheoLopModel obj = new DiemDanhTheoLopModel();
            foreach (PropertyInfo propertyInfo in obj.GetType().GetProperties())
            {
                if (dr.Table.Columns.IndexOf(propertyInfo.Name) >= 0)
                {

                    if (!string.IsNullOrWhiteSpace(dr[propertyInfo.Name].ToString()))
                    {
                        var value = Convert.ChangeType(dr[propertyInfo.Name], propertyInfo.PropertyType);
                        propertyInfo.SetValue(obj, value);
                    }
                    else
                    {
                        propertyInfo.SetValue(obj, null);
                    }
                }
                else
                {
                    propertyInfo.SetValue(obj, null);
                }
            }
            return obj;
        }
        public List<DiemDanhTheoLopModel> GetBaoCaoDiemDanhTheoLop(DateTime from, DateTime to)
        {
            try
            {
                List<DiemDanhTheoLopModel> result = new List<DiemDanhTheoLopModel>();
                SqlParameter[] pars = new SqlParameter[]
                {
                    new SqlParameter("@from",from),
                    new SqlParameter("@to",to)
                };
                DataSet ds = helper.ExecuteDataSet("sp_BaoCao_BaoCaoDiemDanhTungNgayTheoLop", pars);
                DataTable dt = ds.Tables[0];
                foreach (DataRow dr in dt.Rows)
                {
                    DiemDanhTheoLopModel item = GetDiemDanhTheoLopModelFromDataRow(dr);
                    result.Add(item);
                }
                return result;
            }
            catch (Exception ex)
            {
                log.Error("sp_BaoCao_BaoCaoDiemDanhTungNgayTheoLop " + ex.Message);
                return null;
            }
        }

        public class DiemDanhTheoLopModel
        {
            public DateTime NgayHoc { get; set; }
            public int ID_Lop { get; set; }
            public string TenLop { get; set; }
            public int SiSoTong { get; set; }
            public int SiSo { get; set; }
        }
    }
}