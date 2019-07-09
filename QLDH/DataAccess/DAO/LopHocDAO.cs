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

    public class LopHocDAO
    {
        log4net.ILog log = log4net.LogManager.GetLogger(typeof(LopHocDAO));
        private DataHelper helper;
        public LopHocDAO()
        {
            helper = new DataHelper();
        }

        private LopHocModel GetObjFromDataRow(DataRow dr)
        {
            LopHocModel obj = new LopHocModel();
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

        public List<LopHocModel> GetAll_LopHoc()
        {
            List<LopHocModel> result = new List<LopHocModel>();
            try
            {
                DataSet ds = helper.ExecuteDataSet("sp_LopHoc_GetAll");
                DataTable dt = ds.Tables[0];
                foreach (DataRow dr in dt.Rows)
                {
                    result.Add(GetObjFromDataRow(dr));
                }
            }
            catch (Exception ex)
            {
                log.Error("sp_LopHoc_GetAll " + ex.Message);
            }

            return result;
        }

        public LopHocModel GetById_LopHoc(int ID)
        {
            LopHocModel result = new LopHocModel();
            try
            {
                SqlParameter[] pars = new SqlParameter[]
                {
                    new SqlParameter("@ID", ID)
                };
                DataSet ds = helper.ExecuteDataSet("sp_LopHoc_GetById", pars);
                DataTable dt = ds.Tables[0];
                foreach (DataRow dr in dt.Rows)
                {
                    result = GetObjFromDataRow(dr);
                }
            }
            catch (Exception ex)
            {
                log.Error("sp_LopHoc_GetById " + ex.Message);
            }

            return result;
        }

        public List<LopHocModel> GetByGiaoVien(int ID_GiaoVien)
        {
            List<LopHocModel> result = new List<LopHocModel>();
            try
            {
                SqlParameter[] pars = new SqlParameter[]{
                    new SqlParameter("@ID_GiaoVien", ID_GiaoVien)
                };
                DataSet ds = helper.ExecuteDataSet("sp_LopHoc_GetByGiaoVien", pars);
                DataTable dt = ds.Tables[0];
                foreach (DataRow dr in dt.Rows)
                {
                    result.Add(GetObjFromDataRow(dr));
                }
            }
            catch (Exception ex)
            {
                log.Error("sp_LopHoc_GetByGiaoVien " + ex.Message);
            }

            return result;
        }

        public List<LopHocModel> GetAll_ByHocSinh(int ID_HocSinh)
        {
            List<LopHocModel> result = new List<LopHocModel>();
            try
            {
                SqlParameter[] pars = new SqlParameter[] {
                new SqlParameter("@ID_HocSinh", ID_HocSinh),
                };
                DataSet ds = helper.ExecuteDataSet("sp_LopHoc_GetByHocSinh", pars);
                DataTable dt = ds.Tables[0];
                foreach (DataRow dr in dt.Rows)
                {
                    result.Add(GetObjFromDataRow(dr));
                }
            }
            catch (Exception ex)
            {
                log.Error("sp_LopHoc_GetByHocSinh " + ex.Message);
            }

            return result;
        }

        public int InsertOrUpdate(LopHocModel model)
        {
            try
            {
                SqlParameter[] pars = new SqlParameter[] {
                new SqlParameter("@ID", model.ID),
                new SqlParameter("@TenLop", model.TenLop),
                new SqlParameter("@GiaoVien", model.GiaoVien),
                new SqlParameter("@SoDoLop", model.SoDoLop),
                new SqlParameter("@LichHoc", model.LichHoc)
                };

                object id = helper.ExecuteScalar("sp_LopHoc_InsertOrUpdate", pars);
                if (id != null)
                {
                    return int.Parse(id.ToString());
                }
            }
            catch (Exception ex)
            {
                log.Error("sp_TaiKhoan_InsertOrUpdate " + ex.Message);
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
                int rowaff = helper.ExecuteNonQuery("sp_LopHoc_Delete", pars);
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
                log.Error("sp_LopHoc_Delete " + ex.Message);
                return false;
            }
        }
    }
}