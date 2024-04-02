using QLDH.DataAccess.Helper;
using QLDH.DataAccess.Models;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Reflection;
using System.Text;
using System.Threading.Tasks;

namespace QLDH.DataAccess.DAO
{
    public class DanhMucDonViTinhDAO
    {
        log4net.ILog log = log4net.LogManager.GetLogger(typeof(HocSinhDAO));
        private DataHelper helper;
        public DanhMucDonViTinhDAO()
        {
            helper = new DataHelper();
        }
        private DanhMucDonViTinhModel GetObjFromDataRow(DataRow dr)
        {
            DanhMucDonViTinhModel obj = new DanhMucDonViTinhModel();
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

        public List<DanhMucDonViTinhModel> GetAll()
        {
            List<DanhMucDonViTinhModel> result = new List<DanhMucDonViTinhModel>();
            try
            {

                DataSet ds = helper.ExecuteDataSet("sp_DanhMucDonViTinh_GetAll");
                DataTable dt = ds.Tables[0];

                foreach (DataRow dr in dt.Rows)
                {
                    DanhMucDonViTinhModel data = GetObjFromDataRow(dr);
                    result.Add(data);
                }
            }
            catch (Exception ex)
            {
                log.Error("sp_DanhMucDonViTinh_GetAll " + ex.Message);
            }

            return result;
        }
        public int InsertOrUpdate(DanhMucDonViTinhModel model)
        {
            try
            {
                SqlParameter[] pars = new SqlParameter[] {
                new SqlParameter("@ID", model.ID),
                new SqlParameter("@Ten", model.Ten),

                };

                object id = helper.ExecuteScalar("sp_DanhMucDonViTinh_InsertOrUpdate", pars);
                if (id != null)
                {
                    return int.Parse(id.ToString());
                }
            }
            catch (Exception ex)
            {
                log.Error("sp_DanhMucDonViTinh_InsertOrUpdate " + ex.Message);
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
                int rowaff = helper.ExecuteNonQuery("sp_DanhMucDonViTinh_Delete", pars);
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
                log.Error("sp_DanhMucDonViTinh_Delete " + ex.Message);
                return false;
            }
        }

    }
}
