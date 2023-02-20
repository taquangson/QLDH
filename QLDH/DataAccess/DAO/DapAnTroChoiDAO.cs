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
    public class DapAnTroChoiDAO
    {
        log4net.ILog log = log4net.LogManager.GetLogger(typeof(DapAnTroChoiDAO));
        private DataHelper helper;
        public DapAnTroChoiDAO()
        {
            helper = new DataHelper();
        }       

        private DapAnTroChoiModel GetDapAnFromDataRow(DataRow dr)
        {
            DapAnTroChoiModel obj = new DapAnTroChoiModel();
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

        public List<DapAnTroChoiModel> GetDapAn_ByTroChoi(long ID_CauHoi)
        {
            List<DapAnTroChoiModel> result = new List<DapAnTroChoiModel>();
            try
            {
                SqlParameter[] pars = new SqlParameter[]
                {
                    new SqlParameter("@ID_TroChoi", ID_CauHoi)
                };
                DataSet ds = helper.ExecuteDataSet("sp_DapAnTroChoi_ByTroChoi", pars);
                DataTable dt = ds.Tables[0];
                foreach (DataRow dr in dt.Rows)
                {
                    result.Add(GetDapAnFromDataRow(dr));
                }
            }
            catch (Exception ex)
            {
                log.Error("sp_DapAnTroChoi_ByTroChoi " + ex.Message);
            }

            return result;
        }


        public int InsertOrUpdate_DapAn(DapAnTroChoiModel model)
        {
            try
            {
                SqlParameter[] pars = new SqlParameter[] {
                new SqlParameter("@ID", model.ID),
                new SqlParameter("@ID_TroChoi", model.ID_TroChoi),
                new SqlParameter("@HinhAnh", model.HinhAnh),
                new SqlParameter("@AmThanh", model.AmThanh),
                new SqlParameter("@NoiDung", model.NoiDung),
                new SqlParameter("@IsDapAnDung", model.IsDapAnDung),
                new SqlParameter("@ThuTu", model.ThuTu),
                new SqlParameter("@DapAn", model.DapAn)
                };

                object id = helper.ExecuteScalar("sp_DapAnTroChoi_InsertOrUpdate", pars);
                if (id != null)
                {
                    return int.Parse(id.ToString());
                }
            }
            catch (Exception ex)
            {
                log.Error("sp_DapAnTroChoi_InsertOrUpdate " + ex.Message);
            }

            return 0;
        }
     
        public bool Delete_DapAn(long ID_DapAn)
        {
            try
            {
                SqlParameter[] pars = new SqlParameter[]
                {
                    new SqlParameter("@ID",ID_DapAn )
                };
                int rowaff = helper.ExecuteNonQuery("sp_DapAnTroChoi_Delete", pars);
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
                log.Error("sp_DapAnTroChoi_Delete " + ex.Message);
                return false;
            }
        }


    }
}