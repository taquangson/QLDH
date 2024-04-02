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
    public class LichSuThanhToanDAO
    {
        log4net.ILog log = log4net.LogManager.GetLogger(typeof(HocSinhDAO));
        private DataHelper helper;
        public LichSuThanhToanDAO()
        {
            helper = new DataHelper();
        }

        private LichSuThanhToanModel GetObjFromDataRow(DataRow dr)
        {
            LichSuThanhToanModel obj = new LichSuThanhToanModel();
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
        public List<LichSuThanhToanModel> GetByPhieuThu(int ID_PhieuThu)
        {
            try
            {
                SqlParameter[] pars = new SqlParameter[] {
                new SqlParameter("@ID_PhieuThu", ID_PhieuThu),
                };
                DataSet ds = helper.ExecuteDataSet("sp_LichSuThanhToan_GetByPhieuThu", pars);
                DataTable dt = ds.Tables[0];
                List<LichSuThanhToanModel> result = new List<LichSuThanhToanModel>();
                foreach (DataRow dr in dt.Rows)
                {
                    result.Add(GetObjFromDataRow(dr));
                }
                return result;
            }
            catch (Exception ex)
            {
                return null;
            }
        }

        public List<LichSuThanhToanModel> GetByDate(int ID_ChiNhanh, int ID_NhanVien, DateTime From, DateTime To)
        {
            try
            {
                SqlParameter[] pars = new SqlParameter[] {
                new SqlParameter("@from", From),
                new SqlParameter("@to", To),
                new SqlParameter("@ID_ChiNhanh", ID_ChiNhanh),
                new SqlParameter("@ID_NhanVien", ID_NhanVien),
                };
                DataSet ds = helper.ExecuteDataSet("sp_LichSuThanhToan_GetByDate", pars);
                DataTable dt = ds.Tables[0];
                List<LichSuThanhToanModel> result = new List<LichSuThanhToanModel>();
                foreach (DataRow dr in dt.Rows)
                {
                    result.Add(GetObjFromDataRow(dr));
                }
                return result;
            }
            catch (Exception ex)
            {
                return null;
            }
        }

        public int Insert(LichSuThanhToanModel model)
        {
            try
            {
                SqlParameter[] pars = new SqlParameter[] {
                new SqlParameter("@ID_PhieuThu", model.ID_PhieuThu),
                new SqlParameter("@ID_NhanVien", model.ID_NhanVien),
                new SqlParameter("@TongTien", model.TongTien),
                new SqlParameter("@ConLai", model.ConLai),
                new SqlParameter("@HinhThucThanhToan", model.HinhThucThanhToan),
                new SqlParameter("@NgayTao", model.NgayTao),
                new SqlParameter("@GhiChu", model.GhiChu)
                };

                object id = helper.ExecuteScalar("sp_LichSuThanhToan_Insert", pars);
                if (id != null)
                {
                    return int.Parse(id.ToString());
                }
            }
            catch (Exception ex)
            {
                log.Error("sp_LichSuThanhToan_Insert " + ex.Message);
            }

            return 0;
        }
       
    }
}