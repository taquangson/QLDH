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
    public class DanhMucComboDAO
    {
        log4net.ILog log = log4net.LogManager.GetLogger(typeof(HocSinhDAO));
        private DataHelper helper;
        public DanhMucComboDAO()
        {
            helper = new DataHelper();
        }
        private DanhMucComboModel GetObjFromDataRow(DataRow dr)
        {
            DanhMucComboModel obj = new DanhMucComboModel();
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
        public List<DanhMucComboModel> GetAll()
        {
            List<DanhMucComboModel> result = new List<DanhMucComboModel>();
            try
            {

                DataSet ds = helper.ExecuteDataSet("sp_DanhMucCombo_GetAll");
                DataTable dt = ds.Tables[0];

                foreach (DataRow dr in dt.Rows)
                {
                    DanhMucComboModel data = GetObjFromDataRow(dr);
                    result.Add(data);
                }
            }
            catch (Exception ex)
            {
                log.Error("sp_DanhMucCombo_GetAll " + ex.Message);
            }

            return result;
        }

        public int Create(DanhMucComboModel model)
        {
            try
            {
                SqlParameter[] pars = new SqlParameter[]
                {
                    new SqlParameter("@MaCombo", model.MaCombo),
                    new SqlParameter("@TenCombo", model.TenCombo),
                    new SqlParameter("@GiaVon", model.GiaVon),
                    new SqlParameter("@GiaBanLe", model.GiaBanLe),
                    new SqlParameter("@DonViTinh", model.DonViTinh),
                    new SqlParameter("@NoiDung", model.NoiDung),
                    new SqlParameter("@HinhAnhSanPham", model.HinhAnhSanPham),
                };

                int query = Int32.Parse(helper.ExecuteScalar("sp_DanhMucCombo_Insert", pars).ToString());
                if (query > 0)
                {
                    return query;
                }
            }
            catch (Exception ex)
            {
                log.Error("sp_DanhMucCombo_Insert " + ex.Message);
            }

            return 0;
        }

        public int Update(DanhMucComboModel model)
        {
            try
            {
                SqlParameter[] pars = new SqlParameter[]
                {
                    new SqlParameter("@ID", model.ID),
                    new SqlParameter("@MaCombo", model.MaCombo),
                    new SqlParameter("@TenCombo", model.TenCombo),
                    new SqlParameter("@GiaVon", model.GiaVon),
                    new SqlParameter("@GiaBanLe", model.GiaBanLe),
                    new SqlParameter("@DonViTinh", model.DonViTinh),
                    new SqlParameter("@NoiDung", model.NoiDung),
                    new SqlParameter("@HinhAnhSanPham", model.HinhAnhSanPham),

                };

                int query = helper.ExecuteNonQuery("sp_DanhMucCombo_Update", pars);
                if (query > 0)
                {
                    return query;
                }
            }
            catch (Exception ex)
            {
                log.Error("sp_DanhMucCombo_Update " + ex.Message);
            }

            return 0;
        }

        public int Delete(int ID)
        {
            try
            {
                SqlParameter[] pars = new SqlParameter[]
                {
                    new SqlParameter("@ID", ID),
                };

                int query = helper.ExecuteNonQuery("sp_DanhMucCombo_Delete", pars);
                if (query > 0)
                {
                    return query;
                }
            }
            catch (Exception ex)
            {
                log.Error("sp_DanhMucCombo_Delete " + ex.Message);
            }

            return 0;
        }

        public List<DanhMucComboModel> GetAllDonViTinh()
        {
            List<DanhMucComboModel> result = new List<DanhMucComboModel>();
            try
            {
                DataSet ds = helper.ExecuteDataSet("sp_DanhMucCombo_GetAllDonViTinh");
                DataTable dt = ds.Tables[0];

                foreach (DataRow dr in dt.Rows)
                {
                    DanhMucComboModel data = GetObjFromDataRow(dr);
                    result.Add(data);
                }
            }
            catch (Exception ex)
            {
                log.Error("sp_DanhMucCombo_GetAllDonViTinh " + ex.Message);
            }

            return result;
        }
    }
}
