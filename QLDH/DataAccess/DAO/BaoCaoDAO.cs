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
            public  string TenHocSinh { get; set; }
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
                foreach(DataRow dr in dt.Rows)
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
            public int ID_NhanVien { get; set; }
            public string TenNhanVien { get; set; }
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
    }
}