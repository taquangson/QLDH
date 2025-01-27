using QLDH.DataAccess.Models;
using System.Data;
using System.Reflection;
using System;
using System.Data.SqlClient;
using QLDH.DataAccess.Helper;

namespace QLDH.DataAccess.DAO
{
    public class BienDongSoDuTaiKhoanDAO
    {
        log4net.ILog log = log4net.LogManager.GetLogger(typeof(HocSinhDAO));
        private DataHelper helper;
        public BienDongSoDuTaiKhoanDAO()
        {
            helper = new DataHelper();
        }

        private BienDongSoDuTaiKhoanModel GetObjFromDataRow(DataRow dr)
        {
            BienDongSoDuTaiKhoanModel obj = new BienDongSoDuTaiKhoanModel();
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

        public int Insert(BienDongSoDuTaiKhoanModel model)
        {
            try
            {
                SqlParameter[] pars = new SqlParameter[]
                {
                    new SqlParameter("@ID_TaiKhoan", model.ID_TaiKhoan),
                    new SqlParameter("@LoaiBienDong", model.LoaiBienDong),
                    new SqlParameter("@KieuBienDong", model.KieuBienDong),
                    new SqlParameter("@ID_PhieuThu", model.ID_PhieuThu),
                    new SqlParameter("@ID_PhieuHoc", model.ID_PhieuHoc),
                    new SqlParameter("@ID_PhuThuGiamTru", model.ID_PhuThuGiamTru),
                    new SqlParameter("@ID_LenhRutTien", model.ID_LenhRutTien),
                    new SqlParameter("@SoTien", model.SoTien),
                    new SqlParameter("@TrangThai", model.TrangThai),
                    new SqlParameter("@GhiChu", model.GhiChu),
                    new SqlParameter("@NgayTao", model.NgayTao),
                };

                object query = helper.ExecuteScalar("sp_BienDongSoDuTaiKhoan_Insert", pars);
                if (query != null)
                {
                    return int.Parse(query.ToString());
                }

            }
            catch (Exception ex)
            {
                log.Error("sp_BienDongSoDuTaiKhoan_Insert " + ex.Message);
            }

            return 0;
        }
    }
}