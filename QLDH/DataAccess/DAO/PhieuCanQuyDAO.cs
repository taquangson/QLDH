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

    public class PhieuCanQuyDAO
    {
        log4net.ILog log = log4net.LogManager.GetLogger(typeof(PhieuCanQuyDAO));
        private DataHelper helper;
        public PhieuCanQuyDAO()
        {
            helper = new DataHelper();
        }

        private PhieuCanQuyModel GetObjFromDataRow(DataRow dr)
        {
            PhieuCanQuyModel obj = new PhieuCanQuyModel();
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

        public List<PhieuCanQuyModel> GetAll_PhieuCanQuy()
        {
            List<PhieuCanQuyModel> result = new List<PhieuCanQuyModel>();
            try
            {
                DataSet ds = helper.ExecuteDataSet("sp_PhieuCanQuy_GetAll");
                DataTable dt = ds.Tables[0];
                foreach (DataRow dr in dt.Rows)
                {
                    result.Add(GetObjFromDataRow(dr));
                }
            }
            catch (Exception ex)
            {
                log.Error("sp_PhieuCanQuy_GetAll " + ex.Message);
            }

            return result;
        }

        public PhieuCanQuyModel GetById(int ID)
        {
            PhieuCanQuyModel result = new PhieuCanQuyModel();
            try
            {
                SqlParameter[] pars = new SqlParameter[] {
                new SqlParameter("@ID", ID)
                };
                DataSet ds = helper.ExecuteDataSet("sp_PhieuCanQuy_GetByID", pars);
                DataTable dt = ds.Tables[0];
                if (dt.Rows.Count > 0)
                {
                    return GetObjFromDataRow(dt.Rows[0]);
                }
            }
            catch (Exception ex)
            {
                log.Error("sp_PhieuCanQuy_GetByID " + ex.Message);
            }

            return result;
        }



        public int InsertOrUpdate(PhieuCanQuyModel model)
        {
            try
            {
                SqlParameter[] pars = new SqlParameter[] {
                new SqlParameter("@ID", model.ID),
                new SqlParameter("@TenPhieu", model.TenPhieu),
                new SqlParameter("@HinhThuc", model.HinhThuc),
                new SqlParameter("@SoTien", model.SoTien),
                new SqlParameter("@GhiChu", model.GhiChu)
                };

                object id = helper.ExecuteScalar("sp_PhieuCanQuy_InsertOrUpdate", pars);
                if (id != null)
                {
                    return int.Parse(id.ToString());
                }
            }
            catch (Exception ex)
            {
                log.Error("sp_PhieuCanQuy_InsertOrUpdate " + ex.Message);
            }

            return 0;
        }

        public bool Delete(string ID)
        {
            try
            {
                SqlParameter[] pars = new SqlParameter[]
                {
                    new SqlParameter("@ID",ID )
                };
                int rowaff = helper.ExecuteNonQuery("sp_PhieuCanQuy_Delete", pars);
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
                log.Error("sp_PhieuCanQuy_Delete " + ex.Message);
                return false;
            }
        }
    }
}