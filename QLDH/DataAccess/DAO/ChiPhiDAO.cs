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

    public class ChiPhiDAO
    {
        log4net.ILog log = log4net.LogManager.GetLogger(typeof(ChiPhiDAO));
        private DataHelper helper;
        public ChiPhiDAO()
        {
            helper = new DataHelper();
        }

        private ChiPhiModel GetObjFromDataRow(DataRow dr)
        {
            ChiPhiModel obj = new ChiPhiModel();
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

        public List<ChiPhiModel> GetAll_ChiPhi()
        {
            List<ChiPhiModel> result = new List<ChiPhiModel>();
            try
            {
                DataSet ds = helper.ExecuteDataSet("sp_ChiPhi_GetAll");
                DataTable dt = ds.Tables[0];
                foreach (DataRow dr in dt.Rows)
                {
                    result.Add(GetObjFromDataRow(dr));
                }
            }
            catch (Exception ex)
            {
                log.Error("sp_ChiPhi_GetAll " + ex.Message);
            }

            return result;
        }

        public List<ChiPhiModel> GetByIdPhieuChi(int ID)
        {
            List<ChiPhiModel> result = new List<ChiPhiModel>();
            try
            {
                SqlParameter[] pars = new SqlParameter[] {
                    new SqlParameter("@ID_PhieuChi", ID)
                };
                DataSet ds = helper.ExecuteDataSet("sp_ChiPhi_GetByIDPhieuChi", pars);
                DataTable dt = ds.Tables[0];
                foreach (DataRow dr in dt.Rows)
                {
                    result.Add(GetObjFromDataRow(dr));
                }
            }
            catch (Exception ex)
            {
                log.Error("sp_ChiPhi_GetAll " + ex.Message);
            }

            return result;
        }



        public int InsertOrUpdate(ChiPhiModel model)
        {
            try
            {
                SqlParameter[] pars = new SqlParameter[] {
                new SqlParameter("@ID", model.ID),
                new SqlParameter("@TenChiPhi", model.TenChiPhi),
                new SqlParameter("@MaChiPhi", model.MaChiPhi),
                new SqlParameter("@SoTien", model.SoTien),
                new SqlParameter("@TongTien", model.TongTien),
                new SqlParameter("@SoLuong", model.SoLuong),
                new SqlParameter("@ID_PhieuChi", model.ID_PhieuChi),
                new SqlParameter("@MoTa", model.MoTa),
                new SqlParameter("@DanhMucNhomChi", model.DanhMucNhomChi)
                };

                object id = helper.ExecuteScalar("sp_ChiPhi_InsertOrUpdate", pars);
                if (id != null)
                {
                    return int.Parse(id.ToString());
                }
            }
            catch (Exception ex)
            {
                log.Error("sp_ChiPhi_InsertOrUpdate " + ex.Message);
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
                int rowaff = helper.ExecuteNonQuery("sp_ChiPhi_Delete", pars);
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
                log.Error("sp_ChiPhi_Delete " + ex.Message);
                return false;
            }
        }

        public bool DeleteByIDPhieuChi(int ID)
        {
            try
            {
                SqlParameter[] pars = new SqlParameter[]
                {
                    new SqlParameter("@ID",ID )
                };
                int rowaff = helper.ExecuteNonQuery("sp_ChiPhi_Delete_PhieuChi", pars);
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
                log.Error("sp_ChiPhi_Delete_PhieuChi " + ex.Message);
                return false;
            }
        }
    }
}