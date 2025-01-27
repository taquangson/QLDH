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
    public class BaoCaoChiDAO
    {
        log4net.ILog log = log4net.LogManager.GetLogger(typeof(TaiKhoanDAO));
        private DataHelper helper;
        public BaoCaoChiDAO()
        {
            helper = new DataHelper();
        }



        public class BaoCaoChiModel
        {
            public DateTime NgayTao { get; set; }
            public string MaPhieu { get; set; }
            public double TongChi { get; set; }
            public string TenLoaiPhieu { get; set; }
            public string HinhThucThanhToan { get; set; }
            public string TenNhomChi { get; set; }
            public string TenNguoiNhan { get; set; }



        }

        private BaoCaoChiModel GetBaoCaoChiModelFromDataRow(DataRow dr)
        {
            BaoCaoChiModel obj = new BaoCaoChiModel();
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

        public List<BaoCaoChiModel> GetBaoCaoChiTieu(DateTime TuNgay, DateTime DenNgay)
        {
            try
            {
                List<BaoCaoChiModel> result = new List<BaoCaoChiModel>();
                SqlParameter[] pars = new SqlParameter[]
                {
                    new SqlParameter("@TuNgay",TuNgay),
                    new SqlParameter("@DenNgay",DenNgay)
                };
                DataSet ds = helper.ExecuteDataSet("sp_BaoCao_BaoCaoChi_GetByDate", pars);
                DataTable dt = ds.Tables[0];
                foreach (DataRow dr in dt.Rows)
                {
                    BaoCaoChiModel item = GetBaoCaoChiModelFromDataRow(dr);
                    result.Add(item);
                }
                return result;
            }
            catch (Exception ex)
            {
                log.Error("sp_BaoCao_BaoCaoChi_GetByDate " + ex.Message);
                return null;
            }
        }

        public List<BaoCaoChiModel> GetBaoCaoChiTieu_Thang(int TuThang, int DenThang, int TuNam, int DenNam)
        {
            try
            {
                List<BaoCaoChiModel> result = new List<BaoCaoChiModel>();
                SqlParameter[] pars = new SqlParameter[]
                {
                    new SqlParameter("@TuThang",TuThang),
                    new SqlParameter("@DenThang",DenThang),
                    new SqlParameter("@TuNam",TuNam),
                    new SqlParameter("@DenNam",DenNam),
                };
                DataSet ds = helper.ExecuteDataSet("sp_BaoCao_BaoCaoChi_GetByMonth", pars);
                DataTable dt = ds.Tables[0];
                foreach (DataRow dr in dt.Rows)
                {
                    BaoCaoChiModel item = GetBaoCaoChiModelFromDataRow(dr);
                    result.Add(item);
                }
                return result;
            }
            catch (Exception ex)
            {
                log.Error("sp_BaoCao_BaoCaoChi_GetByMonth " + ex.Message);
                return null;
            }
        }
        public class BaoCaoChiNhomChiModel
        {
            public double TongChi { get; set; }
            public double TongKhauHao { get; set; }
            public string TenNhomChi { get; set; }
            public int ID_NhomChi { get; set; }


        }

        private BaoCaoChiNhomChiModel GetBaoCaoChiNhomChiModelFromDataRow(DataRow dr)
        {
            BaoCaoChiNhomChiModel obj = new BaoCaoChiNhomChiModel();
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
        public List<BaoCaoChiNhomChiModel> GetBaoCaoChiTieuTheoNhomChi_Date(DateTime TuNgay, DateTime DenNgay)
        {
            try
            {
                List<BaoCaoChiNhomChiModel> result = new List<BaoCaoChiNhomChiModel>();
                SqlParameter[] pars = new SqlParameter[]
                {
                    new SqlParameter("@TuNgay",TuNgay),
                    new SqlParameter("@DenNgay",DenNgay)
                };
                DataSet ds = helper.ExecuteDataSet("sp_BaoCao_BaoCaoChi_NhomChi_GetByDate", pars);
                DataTable dt = ds.Tables[0];
                foreach (DataRow dr in dt.Rows)
                {
                    BaoCaoChiNhomChiModel item = GetBaoCaoChiNhomChiModelFromDataRow(dr);
                    result.Add(item);
                }
                return result;
            }
            catch (Exception ex)
            {
                log.Error("sp_BaoCao_BaoCaoChi_NhomChi_GetByDate " + ex.Message);
                return null;
            }
        }

        public List<BaoCaoChiNhomChiModel> GetBaoCaoChiTieuTheoNhomChi_Month(int TuThang, int DenThang, int Nam)
        {
            try
            {
                List<BaoCaoChiNhomChiModel> result = new List<BaoCaoChiNhomChiModel>();
                SqlParameter[] pars = new SqlParameter[]
                {
                    new SqlParameter("@TuThang",TuThang),
                    new SqlParameter("@DenThang",DenThang),
                    new SqlParameter("@Nam",Nam)
                };
                DataSet ds = helper.ExecuteDataSet("sp_BaoCao_BaoCaoChi_NhomChi_GetByMonth", pars);
                DataTable dt = ds.Tables[0];
                foreach (DataRow dr in dt.Rows)
                {
                    BaoCaoChiNhomChiModel item = GetBaoCaoChiNhomChiModelFromDataRow(dr);
                    result.Add(item);
                }
                return result;
            }
            catch (Exception ex)
            {
                log.Error("sp_BaoCao_BaoCaoChi_NhomChi_GetByMonth " + ex.Message);
                return null;
            }
        }

        public decimal GetTongTienThu_Date(DateTime TuNgay, DateTime DenNgay)
        {
            try
            {
                SqlParameter[] pars = new SqlParameter[] {
                    new SqlParameter("@TuNgay",TuNgay),
                    new SqlParameter("@DenNgay",DenNgay),
                };

                object id = helper.ExecuteScalar("sp_BaoCao_BaoCaoThu_GetByDate", pars);
                if (id != null)
                {
                    return decimal.Parse(id.ToString());
                }
            }
            catch (Exception ex)
            {
                log.Error("sp_BaoCao_BaoCaoThu_GetByDate " + ex.Message);
            }

            return 0;
        }

        public decimal GetTongTienThanhToan_Date(DateTime TuNgay, DateTime DenNgay)
        {
            try
            {
                SqlParameter[] pars = new SqlParameter[] {
                    new SqlParameter("@TuNgay",TuNgay),
                    new SqlParameter("@DenNgay",DenNgay),
                };

                object id = helper.ExecuteScalar("sp_BaoCao_BaoCaoThanhToan_GetByDate", pars);
                if (id != null)
                {
                    return decimal.Parse(id.ToString());
                }
            }
            catch (Exception ex)
            {
                log.Error("sp_BaoCao_BaoCaoThanhToan_GetByDate " + ex.Message);
            }

            return 0;
        }
        public decimal GetTongTienThu_Month(int TuThang, int DenThang, int Nam)
        {
            try
            {
                SqlParameter[] pars = new SqlParameter[] {
                    new SqlParameter("@TuThang",TuThang),
                    new SqlParameter("@DenThang",DenThang),
                    new SqlParameter("@Nam",Nam)
                };

                object id = helper.ExecuteScalar("sp_BaoCao_BaoCaoThu_GetByMonth", pars);
                if (id != null)
                {
                    return decimal.Parse(id.ToString());
                }
            }
            catch (Exception ex)
            {
                log.Error("sp_BaoCao_BaoCaoThu_GetByMonth " + ex.Message);
            }

            return 0;
        }

        public decimal GetTongTienThanhToan_Month(int TuThang, int DenThang, int Nam)
        {
            try
            {
                SqlParameter[] pars = new SqlParameter[] {
                    new SqlParameter("@TuThang",TuThang),
                    new SqlParameter("@DenThang",DenThang),
                    new SqlParameter("@Nam",Nam)
                };

                object id = helper.ExecuteScalar("sp_BaoCao_BaoCaoThanhToan_GetByMonth", pars);
                if (id != null)
                {
                    return decimal.Parse(id.ToString());
                }
            }
            catch (Exception ex)
            {
                log.Error("sp_BaoCao_BaoCaoThanhToan_GetByMonth " + ex.Message);
            }

            return 0;
        }

        public class BaoCaoDoanhThuModel
        {
            public decimal Thang1 { get; set; }
            public decimal Thang2 { get; set; }
            public decimal Thang3 { get; set; }
            public decimal Thang4 { get; set; }
            public decimal Thang5 { get; set; }
            public decimal Thang6 { get; set; }
            public decimal Thang7 { get; set; }
            public decimal Thang8 { get; set; }
            public decimal Thang9 { get; set; }
            public decimal Thang10 { get; set; }
            public decimal Thang11 { get; set; }
            public decimal Thang12 { get; set; }
            public decimal Nam { get; set; }



            public string Ten { get; set; }
            public int ID{ get; set; }
            public int ID_Cha { get; set; }


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

        public List<BaoCaoDoanhThuModel> GetBaoCaoDoanhThu_Year(int Nam)
        {
            try
            {
                List<BaoCaoDoanhThuModel> result = new List<BaoCaoDoanhThuModel>();
                SqlParameter[] pars = new SqlParameter[]
                {
  
                    new SqlParameter("@Nam",Nam)
                };
                DataSet ds = helper.ExecuteDataSet("sp_BaoCao_BaoCaoDoanhThu_GetByYear", pars);
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
                log.Error("sp_BaoCao_BaoCaoDoanhThu_GetByYear " + ex.Message);
                return null;
            }
        }
        public class BieuDoDoanhThuModel
        {
            public decimal LoiNhuan { get; set; }
            public decimal TienThu { get; set; }
            public decimal TienChi { get; set; }

            public int Thang { get; set; }

        }
        private BieuDoDoanhThuModel GetBieuDoDoanhThuModelFromDataRow(DataRow dr)
        {
            BieuDoDoanhThuModel obj = new BieuDoDoanhThuModel();
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

        public List<BieuDoDoanhThuModel> GetBieuDoDoanhThu_Year(int Nam)
        {
            try
            {
                List<BieuDoDoanhThuModel> result = new List<BieuDoDoanhThuModel>();
                SqlParameter[] pars = new SqlParameter[]
                {

                    new SqlParameter("@Nam",Nam)
                };
                DataSet ds = helper.ExecuteDataSet("sp_BaoCao_BieuDoDoanhThu_GetByYear", pars);
                DataTable dt = ds.Tables[0];
                foreach (DataRow dr in dt.Rows)
                {
                    BieuDoDoanhThuModel item = GetBieuDoDoanhThuModelFromDataRow(dr);
                    result.Add(item);
                }
                return result;
            }
            catch (Exception ex)
            {
                log.Error("sp_BaoCao_BieuDoDoanhThu_GetByYear " + ex.Message);
                return null;
            }
        }
    }
}