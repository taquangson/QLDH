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
    public class BaiGiangDAO
    {
        log4net.ILog log = log4net.LogManager.GetLogger(typeof(BaiGiangDAO));
        private DataHelper helper;
        public BaiGiangDAO()
        {
            helper = new DataHelper();
        }

        private BaiGiangModel GetObjFromDataRow(DataRow dr)
        {
            BaiGiangModel obj = new BaiGiangModel();
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

        public List<BaiGiangModel> GetAll()
        {
            try
            {
                DataSet ds = helper.ExecuteDataSet("sp_BaiGiang_GetAll");
                System.Data.DataTable dt = ds.Tables[0];
                List<BaiGiangModel> result = new List<BaiGiangModel>();
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

        public BaiGiangModel GetById(int ID)
        {
            try
            {
                SqlParameter[] pars = new SqlParameter[] {
                    new SqlParameter("@ID", ID),
                };
                DataSet ds = helper.ExecuteDataSet("sp_BaiGiang_GetById", pars);
                System.Data.DataTable dt = ds.Tables[0];
                return GetObjFromDataRow(dt.Rows[0]);
            }
            catch (Exception ex)
            {
                return null;
            }
        }


        public int InsertOrUpdate_BaiGiang(BaiGiangModel model)
        {
            try
            {
                SqlParameter[] pars = new SqlParameter[] {
                new SqlParameter("@ID", model.ID),
                new SqlParameter("@TenBai", model.TenBai),
                new SqlParameter("@TenBuoi", model.TenBuoi),
                new SqlParameter("@BaiHoc", model.BaiHoc),
                new SqlParameter("@ID_NhanVien", model.ID_NhanVien),
                new SqlParameter("@TrangThai", model.TrangThai),
                new SqlParameter("@CapDo", model.CapDo)
                };

                object id = helper.ExecuteScalar("sp_BaiGiang_InsertOrUpdate", pars);
                if (id != null)
                {
                    return int.Parse(id.ToString());
                }
            }
            catch (Exception ex)
            {
                log.Error("sp_BaiGiang_InsertOrUpdate " + ex.Message);
            }

            return 0;
        }


        public bool Delete_BaiGiang(int ID_BaiGiang)
        {
            try
            {
                SqlParameter[] pars = new SqlParameter[]
                {
                    new SqlParameter("@ID",ID_BaiGiang )
                };
                int rowaff = helper.ExecuteNonQuery("sp_BaiGiang_Delete", pars);
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
                log.Error("sp_BaiGiang_Delete " + ex.Message);
                return false;
            }
        }

        public List<BaiGiangModel> GetBaiGiangTrongChuongTrinh(int ID_ChuongTrinh)
        {
            try
            {
                SqlParameter[] pars = new SqlParameter[] {
                new SqlParameter("@ID_ChuongTrinh", ID_ChuongTrinh),
                };
                DataSet ds = helper.ExecuteDataSet("sp_BaiGiang_GetAllByChuongTrinh", pars);
                DataTable dt = ds.Tables[0];
                List<BaiGiangModel> result = new List<BaiGiangModel>();
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

        public List<BaiGiangModel> GetBaiGiangNgoaiChuongTrinh(int ID_ChuongTrinh)
        {
            try
            {
                SqlParameter[] pars = new SqlParameter[] {
                new SqlParameter("@ID_ChuongTrinh", ID_ChuongTrinh),
                };
                DataSet ds = helper.ExecuteDataSet("sp_BaiGiang_GetAllNgoaiChuongTrinh", pars);
                DataTable dt = ds.Tables[0];
                List<BaiGiangModel> result = new List<BaiGiangModel>();
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

        public bool ThemChuongTrinhBaiGiang(int ID_ChuongTrinh, int ID_BaiGiang, int ThuTu)
        {
            try
            {
                SqlParameter[] pars = new SqlParameter[]
                {
                    new SqlParameter("@ID_ChuongTrinh",ID_ChuongTrinh ),
                    new SqlParameter("@ID_BaiGiang",ID_BaiGiang ),
                    new SqlParameter("@ThuTu",ThuTu )
                };
                int rowaff = helper.ExecuteNonQuery("sp_ChuongTrinhBaiGiang_ThemChuongTrinhBaiGiang", pars);
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
                log.Error("sp_ChuongTrinhBaiGiang_ThemChuongTrinhBaiGiang " + ex.Message);
                return false;
            }
        }

        public bool XoaChuongTrinhBaiGiang(int ID_ChuongTrinh, int ID_BaiGiang)
        {
            try
            {
                SqlParameter[] pars = new SqlParameter[]
                {
                    new SqlParameter("@ID_ChuongTrinh",ID_ChuongTrinh ),
                    new SqlParameter("@ID_BaiGiang",ID_BaiGiang )
                };
                int rowaff = helper.ExecuteNonQuery("sp_ChuongTrinhBaiGiang_XoaChuongTrinhBaiGiang", pars);
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
                log.Error("sp_ChuongTrinhBaiGiang_XoaChuongTrinhBaiGiang " + ex.Message);
                return false;
            }
        }
    }
}