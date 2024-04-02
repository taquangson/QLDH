using QLDH.DataAccess.Helper;
using QLDH.DataAccess.Models;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Reflection;


namespace QLDH.DataAccess.DAO
{
    public class CongThucTinhHocPhiDAO
    {
        log4net.ILog log = log4net.LogManager.GetLogger(typeof(CongThucTinhHocPhiDAO));
        private DataHelper helper;
        public CongThucTinhHocPhiDAO()
        {
            helper = new DataHelper();
        }

        private CongThucTinhHocPhiModel GetObjFromDataRow(DataRow dr)
        {
            CongThucTinhHocPhiModel obj = new CongThucTinhHocPhiModel();
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

        public List<CongThucTinhHocPhiModel> GetAll()
        {
            try
            {
                DataSet ds = helper.ExecuteDataSet("sp_CongThucTinhHocPhi_GetAll");
                DataTable dt = ds.Tables[0];
                List<CongThucTinhHocPhiModel> result = new List<CongThucTinhHocPhiModel>();
                foreach (DataRow dr in dt.Rows)
                {
                    CongThucTinhHocPhiModel model = GetObjFromDataRow(dr);
                    result.Add(model);
                }
                return result;
            }
            catch (Exception ex)
            {
                log.Error("sp_CongThucTinhHocPhi_GetAll " + ex.Message);
                return null;
            }
        }

        public CongThucTinhHocPhiModel GetByID(int ID)
        {
            try
            {
                SqlParameter[] pars = new SqlParameter[] {
                new SqlParameter("@ID", ID),
                };
                DataSet ds = helper.ExecuteDataSet("sp_CongThucTinhHocPhi_GetByID", pars);
                DataTable dt = ds.Tables[0];
                List<CongThucTinhHocPhiModel> result = new List<CongThucTinhHocPhiModel>();
                foreach (DataRow dr in dt.Rows)
                {
                    CongThucTinhHocPhiModel model = GetObjFromDataRow(dr);
                    result.Add(model);
                }
                return result.FirstOrDefault();
            }
            catch (Exception ex)
            {
                log.Error("sp_CongThucTinhHocPhi_GetByID " + ex.Message);
                return null;
            }
        }

        public int InsertOrUpdate(CongThucTinhHocPhiModel model)
        {
            try
            {
                SqlParameter[] pars = new SqlParameter[] {
                new SqlParameter("@ID", model.ID),
                new SqlParameter("@TenCongThuc", model.TenCongThuc),
                new SqlParameter("@DonVi", model.DonVi),
                new SqlParameter("@Block", model.Block),
                new SqlParameter("@LichThanhToan", model.LichThanhToan),
                new SqlParameter("@HocPhi", model.HocPhi),
                new SqlParameter("@MoTa", model.MoTa)
                };

                object id = helper.ExecuteScalar("sp_CongThucTinhHocPhi_InsertOrUpdate", pars);
                if (id != null)
                {
                    return int.Parse(id.ToString());
                }
            }
            catch (Exception ex)
            {
                log.Error("sp_CongThucTinhHocPhi_InsertOrUpdate " + ex.Message);
            }

            return 0;
        }

        public bool Delete(int ID)
        {
            try
            {
                SqlParameter[] pars = new SqlParameter[]
                {
                    new SqlParameter("@ID",ID ),
                };
                int rowaff = helper.ExecuteNonQuery("sp_CongThucTinhHocPhi_Delete", pars);
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
                log.Error("sp_CongThucTinhHocPhi_Delete " + ex.Message);
                return false;
            }
        }
    }
}