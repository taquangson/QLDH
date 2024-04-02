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

    public class DinhMucNhomChiDAO
    {
        log4net.ILog log = log4net.LogManager.GetLogger(typeof(DinhMucNhomChiDAO));
        private DataHelper helper;
        public DinhMucNhomChiDAO()
        {
            helper = new DataHelper();
        }

        private DinhMucNhomChiModel GetObjFromDataRow(DataRow dr)
        {
            DinhMucNhomChiModel obj = new DinhMucNhomChiModel();
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

        public List<DinhMucNhomChiModel> GetAll_DinhMucNhomChi()
        {
            List<DinhMucNhomChiModel> result = new List<DinhMucNhomChiModel>();
            try
            {
                DataSet ds = helper.ExecuteDataSet("sp_DinhMucNhomChi_GetAll");
                DataTable dt = ds.Tables[0];
                foreach (DataRow dr in dt.Rows)
                {
                    result.Add(GetObjFromDataRow(dr));
                }
            }
            catch (Exception ex)
            {
                log.Error("sp_DinhMucNhomChi_GetAll " + ex.Message);
            }

            return result;
        }

        public DinhMucNhomChiModel GetById(int ID)
        {
            DinhMucNhomChiModel result = new DinhMucNhomChiModel();
            try
            {
                SqlParameter[] pars = new SqlParameter[] {
                new SqlParameter("@ID", ID)
                };
                DataSet ds = helper.ExecuteDataSet("sp_DinhMucNhomChi_GetByID",pars);
                DataTable dt = ds.Tables[0];
                if (dt.Rows.Count > 0)
                {
                    return GetObjFromDataRow(dt.Rows[0]);
                }
            }
            catch (Exception ex)
            {
                log.Error("sp_DinhMucNhomChi_GetAll " + ex.Message);
            }

            return result;
        }



        public int InsertOrUpdate(DinhMucNhomChiModel model)
        {
            try
            {
                SqlParameter[] pars = new SqlParameter[] {
                new SqlParameter("@ID", model.ID),
                new SqlParameter("@TenKeHoach", model.TenKeHoach),
                new SqlParameter("@LoaiKeHoach", model.LoaiKeHoach),
                new SqlParameter("@SoTien", model.SoTien),
                new SqlParameter("@PhanTramDoanhThu", model.PhanTramDoanhThu),
                new SqlParameter("@TongTienDinhMuc", model.TongTienDinhMuc),
                new SqlParameter("@SoLuot", model.SoLuot),
                new SqlParameter("@NgayBatDau", ((model.NgayBatDau.Year == 1 || model.NgayBatDau == null) ? (object)DBNull.Value : model.NgayBatDau)),
                new SqlParameter("@NgayKetThuc", ((model.NgayKetThuc.Year == 1 || model.NgayKetThuc == null) ? (object)DBNull.Value : model.NgayKetThuc)),
                new SqlParameter("@ID_NhomChi", model.ID_NhomChi),
                new SqlParameter("@MoTa", model.MoTa)
                };

                object id = helper.ExecuteScalar("sp_DinhMucNhomChi_InsertOrUpdate", pars);
                if (id != null)
                {
                    return int.Parse(id.ToString());
                }
            }
            catch (Exception ex)
            {
                log.Error("sp_DinhMucNhomChi_InsertOrUpdate " + ex.Message);
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
                int rowaff = helper.ExecuteNonQuery("sp_DinhMucNhomChi_Delete", pars);
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
                log.Error("sp_DinhMucNhomChi_Delete " + ex.Message);
                return false;
            }
        }
    }
}