using QLDH.DataAccess.Helper;
using QLDH.DataAccess.Models;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Reflection;

namespace QLDH.DataAccess.DAO
{
    public class DanhMucNhomChiDAO
    {
        log4net.ILog log = log4net.LogManager.GetLogger(typeof(Lop_HocSinhDAO));
        private DataHelper helper;
        public DanhMucNhomChiDAO()
        {
            helper = new DataHelper();
        }

        private DanhMucNhomChiModel GetObjFromDataRow(DataRow dr)
        {
            DanhMucNhomChiModel obj = new DanhMucNhomChiModel();
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

        public List<DanhMucNhomChiModel> GetAll_NhomChi()
        {
            List<DanhMucNhomChiModel> result = new List<DanhMucNhomChiModel>();
            try
            {
                DataSet ds = helper.ExecuteDataSet("sp_DanhMucNhomChi_GetAll");
                DataTable dt = ds.Tables[0];
                foreach (DataRow dr in dt.Rows)
                {
                    DanhMucNhomChiModel model = GetObjFromDataRow(dr);
                    result.Add(model);
                }
            }
            catch (Exception ex)
            {
                log.Error("sp_DanhMucNhomChi_GetAll " + ex.Message);
            }

            return result;
        }

        public List<DanhMucNhomChiModel> QuanLyDeXuat_GetAllNhomChi()
        {
            List<DanhMucNhomChiModel> result = new List<DanhMucNhomChiModel>();
            try
            {
                DataSet ds = helper.ExecuteDataSet("sp_QuanLyDeXuat_DetAllNhomChi");
                DataTable dt = ds.Tables[0];
                foreach (DataRow dr in dt.Rows)
                {
                    DanhMucNhomChiModel model = GetObjFromDataRow(dr);
                    result.Add(model);
                }
            }
            catch (Exception ex)
            {
                log.Error("sp_QuanLyDeXuat_DetAllNhomChi " + ex.Message);
            }

            return result;
        }

        public int InsertOrUpdate_NhomChi(DanhMucNhomChiModel obj)
        {
            try
            {
                SqlParameter[] pars = new SqlParameter[]
                {
                    new SqlParameter("@ID", obj.ID),
                    new SqlParameter("@ID_Cha", obj.ID_Cha),
                    new SqlParameter("@TenNhomChi", obj.TenNhomChi),
                    new SqlParameter("@MaNhomChi", (!string.IsNullOrWhiteSpace(obj.MaNhomChi) ? obj.MaNhomChi : "")),
                    new SqlParameter("@TrangThai", obj.TrangThai),
                    new SqlParameter("@MoTa", (!string.IsNullOrWhiteSpace(obj.MoTa) ? obj.MoTa : "")),
                };

                int query = helper.ExecuteNonQuery("sp_DanhMucNhomChi_InsertOrUpdate", pars);
                if (query > 0)
                {
                    return query;
                }
            }
            catch (Exception ex)
            {
                log.Error("sp_DanhMucNhomChi_InsertOrUpdate " + ex.Message);
            }

            return 0;
        }

        public int Delete_NhomChi(int ID)
        {
            try
            {
                SqlParameter[] pars = new SqlParameter[]
                {
                    new SqlParameter("@ID", ID),
                };

                int query = helper.ExecuteNonQuery("sp_DanhMucNhomChi_Delete", pars);
                if (query > 0)
                {
                    return query;
                }
            }
            catch (Exception ex)
            {
                log.Error("sp_DanhMucNhomChi_Delete " + ex.Message);
            }

            return 0;
        }
    }
}
