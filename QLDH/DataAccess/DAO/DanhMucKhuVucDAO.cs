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

    public class DanhMucKhuVucDAO
    {
        log4net.ILog log = log4net.LogManager.GetLogger(typeof(DanhMucKhuVucDAO));
        private DataHelper helper;
        public DanhMucKhuVucDAO()
        {
            helper = new DataHelper();
        }

        private DanhMucKhuVucModel GetObjFromDataRow(DataRow dr)
        {
            DanhMucKhuVucModel obj = new DanhMucKhuVucModel();
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

        public List<DanhMucKhuVucModel> GetAll_DanhMucKhuVuc()
        {
            List<DanhMucKhuVucModel> result = new List<DanhMucKhuVucModel>();
            try
            {
                DataSet ds = helper.ExecuteDataSet("sp_DanhMucKhuVuc_GetAll");
                DataTable dt = ds.Tables[0];
                foreach (DataRow dr in dt.Rows)
                {
                    result.Add(GetObjFromDataRow(dr));
                }
            }
            catch (Exception ex)
            {
                log.Error("sp_DanhMucKhuVuc_GetAll " + ex.Message);
            }

            return result;
        }

        public DanhMucKhuVucModel GetById(int ID)
        {
            DanhMucKhuVucModel result = new DanhMucKhuVucModel();
            try
            {
                SqlParameter[] pars = new SqlParameter[] {
                new SqlParameter("@ID", ID)
                };
                DataSet ds = helper.ExecuteDataSet("sp_DanhMucKhuVuc_GetByID",pars);
                DataTable dt = ds.Tables[0];
                if (dt.Rows.Count > 0)
                {
                    return GetObjFromDataRow(dt.Rows[0]);
                }
            }
            catch (Exception ex)
            {
                log.Error("sp_DanhMucKhuVuc_GetAll " + ex.Message);
            }

            return result;
        }



        public int InsertOrUpdate(DanhMucKhuVucModel model)
        {
            try
            {
                SqlParameter[] pars = new SqlParameter[] {
                new SqlParameter("@ID", model.ID),
                new SqlParameter("@TenKhuVuc", model.TenKhuVuc),
                new SqlParameter("@MaKhuVuc", model.MaKhuVuc),
                new SqlParameter("@TrangThai", model.TrangThai),
                new SqlParameter("@ID_Cha", model.ID_Cha),
                new SqlParameter("@MoTa", model.MoTa)
                };

                object id = helper.ExecuteScalar("sp_DanhMucKhuVuc_InsertOrUpdate", pars);
                if (id != null)
                {
                    return int.Parse(id.ToString());
                }
            }
            catch (Exception ex)
            {
                log.Error("sp_DanhMucKhuVuc_InsertOrUpdate " + ex.Message);
            }

            return 0;
        }

        public bool Delete(string ID)
        {
            try
            {
                SqlParameter[] pars = new SqlParameter[]
                {
                    new SqlParameter("@ID",ID ),

                };
                int rowaff = helper.ExecuteNonQuery("sp_DanhMucKhuVuc_Delete", pars);
                if (rowaff > 0)
                {
                    return true;
                }
                else
                {
                    return false;
                }
            }
            catch (Exception ex)
            {
                log.Error("sp_DanhMucKhuVuc_Delete " + ex.Message);
                return false;
            }
        }
    }
}