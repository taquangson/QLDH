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
    public class PhieuHocDAO
    {
        log4net.ILog log = log4net.LogManager.GetLogger(typeof(HocSinhDAO));
        private DataHelper helper;
        public PhieuHocDAO()
        {
            helper = new DataHelper();
        }

        private PhieuHocModel GetObjFromDataRow(DataRow dr)
        {
            PhieuHocModel obj = new PhieuHocModel();
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

        public List<PhieuHocModel> GetByHocSinh(int ID_HocSinh)
        {
            List<PhieuHocModel> result = new List<PhieuHocModel>();
            try
            {
                SqlParameter[] pars = new SqlParameter[] {
                new SqlParameter("@ID_HocSinh", ID_HocSinh)
                };
                DataSet ds = helper.ExecuteDataSet("sp_PhieuHoc_GetByHocSinh", pars);
                DataTable dt = ds.Tables[0];
                foreach (DataRow dr in dt.Rows)
                {
                    result.Add(GetObjFromDataRow(dr));
                }
            }
            catch (Exception ex)
            {
                log.Error("sp_PhieuHoc_GetByHocSinh " + ex.Message);
            }

            return result;
        }

        public List<PhieuHocModel> GetByPhieuThuTemp(int ID_PhieuThu)
        {
            List<PhieuHocModel> result = new List<PhieuHocModel>();
            try
            {
                SqlParameter[] pars = new SqlParameter[] {
                new SqlParameter("@ID_PhieuThu", ID_PhieuThu)
                };
                DataSet ds = helper.ExecuteDataSet("sp_PhieuHocTemp_GetByPhieuThuTemp", pars);
                DataTable dt = ds.Tables[0];
                foreach (DataRow dr in dt.Rows)
                {
                    result.Add(GetObjFromDataRow(dr));
                }
            }
            catch (Exception ex)
            {
                log.Error("sp_PhieuHocTemp_GetByPhieuThuTemp " + ex.Message);
            }

            return result;
        }

        public List<PhieuHocModel> GetByPhieuThu(int ID_PhieuThu)
        {
            List<PhieuHocModel> result = new List<PhieuHocModel>();
            try
            {
                SqlParameter[] pars = new SqlParameter[] {
                new SqlParameter("@ID_PhieuThu", ID_PhieuThu)
                };
                DataSet ds = helper.ExecuteDataSet("sp_PhieuHoc_GetByPhieuThu", pars);
                DataTable dt = ds.Tables[0];
                CongThucTinhHocPhiDAO ctdao = new CongThucTinhHocPhiDAO();
                LichHocDAO lich = new LichHocDAO();
                HocSinhDAO hsdao = new HocSinhDAO();

                foreach (DataRow dr in dt.Rows)
                {
                    PhieuHocModel phieuHocModel = GetObjFromDataRow(dr);
                    HocSinhModel hs = hsdao.GetById(phieuHocModel.ID_HocSinh);
                    phieuHocModel.CongThucTinhHocPhi = ctdao.GetByID(phieuHocModel.ID_CongThucTinhHocPhi);
                    if (phieuHocModel.CongThucTinhHocPhi != null)
                        if (hs.GiamGia > 0 && phieuHocModel.CongThucTinhHocPhi.ApDungCK == 1)
                        {
                            phieuHocModel.CongThucTinhHocPhi.HocPhi = phieuHocModel.CongThucTinhHocPhi.HocPhi / 100 * (100 - (decimal)hs.GiamGia);
                        }
                    phieuHocModel.LichHoc = lich.GetByLop(phieuHocModel.ID_Lop);
                    result.Add(phieuHocModel);
                }
            }
            catch (Exception ex)
            {
                log.Error("sp_PhieuHoc_GetByPhieuThu " + ex.Message);
            }

            return result;
        }

        public List<PhieuHocModel> GetCTPHByPhieuThu(int ID_PhieuThu)
        {
            List<PhieuHocModel> result = new List<PhieuHocModel>();
            try
            {
                SqlParameter[] pars = new SqlParameter[] {
                new SqlParameter("@ID_PhieuThu", ID_PhieuThu)
                };
                DataSet ds = helper.ExecuteDataSet("sp_PhieuThu_CTPH_GetByPhieuThu", pars);
                DataTable dt = ds.Tables[0];
                CongThucTinhHocPhiDAO ctdao = new CongThucTinhHocPhiDAO();
                LichHocDAO lich = new LichHocDAO();
                HocSinhDAO hsdao = new HocSinhDAO();

                foreach (DataRow dr in dt.Rows)
                {
                    PhieuHocModel phieuHocModel = GetObjFromDataRow(dr);
                    HocSinhModel hs = hsdao.GetById(phieuHocModel.ID_HocSinh);
                    phieuHocModel.CongThucTinhHocPhi = ctdao.GetByID(phieuHocModel.ID_CongThucTinhHocPhi);
                    if (phieuHocModel.CongThucTinhHocPhi != null)
                        if (hs.GiamGia > 0 && phieuHocModel.CongThucTinhHocPhi.ApDungCK == 1)
                        {
                            phieuHocModel.CongThucTinhHocPhi.HocPhi = phieuHocModel.CongThucTinhHocPhi.HocPhi / 100 * (100 - (decimal)hs.GiamGia);
                        }
                    phieuHocModel.LichHoc = lich.GetByLop(phieuHocModel.ID_Lop);
                    result.Add(phieuHocModel);
                }
            }
            catch (Exception ex)
            {
                log.Error("sp_PhieuThu_CTPH_GetByPhieuThu " + ex.Message);
            }

            return result;
        }


        public List<PhieuHocModel> GetByHocSinh_Thang(int ID_HocSinh, int Thang)
        {
            List<PhieuHocModel> result = new List<PhieuHocModel>();
            try
            {
                SqlParameter[] pars = new SqlParameter[] {
                new SqlParameter("@ID_HocSinh", ID_HocSinh),
                new SqlParameter("@Thang", Thang)
                };
                DataSet ds = helper.ExecuteDataSet("sp_PhieuHoc_GetByHocSinh_Thang", pars);
                DataTable dt = ds.Tables[0];
                foreach (DataRow dr in dt.Rows)
                {
                    result.Add(GetObjFromDataRow(dr));
                }
            }
            catch (Exception ex)
            {
                log.Error("sp_PhieuHoc_GetByHocSinh " + ex.Message);
            }

            return result;
        }

        public PhieuHocModel GetByHocSinh_Thang_Nam(int ID_HocSinh, int ID_Lop, int Thang, int Nam, int HocDuoi)
        {
            PhieuHocModel result = new PhieuHocModel();
            try
            {
                SqlParameter[] pars = new SqlParameter[] {
                new SqlParameter("@ID_HocSinh", ID_HocSinh),
                new SqlParameter("@ID_Lop", ID_Lop),
                new SqlParameter("@Thang", Thang),
                new SqlParameter("@NamHoc", Nam),
                new SqlParameter("@HocDuoi", HocDuoi)
                };
                DataSet ds = helper.ExecuteDataSet("sp_PhieuHoc_GetByHocSinh_Thang_Nam", pars);
                DataTable dt = ds.Tables[0];
                foreach (DataRow dr in dt.Rows)
                {
                    result = GetObjFromDataRow(dr);
                }
            }
            catch (Exception ex)
            {
                log.Error("sp_PhieuHoc_GetByHocSinh_Thang_Nam " + ex.Message);
            }

            return result;
        }

        public PhieuHocModel GetByID(int ID)
        {
            PhieuHocModel result = new PhieuHocModel();
            try
            {
                SqlParameter[] pars = new SqlParameter[] {
                new SqlParameter("@ID", ID)
                };
                DataSet ds = helper.ExecuteDataSet("sp_PhieuHoc_GetByIDPhieu", pars);
                DataTable dt = ds.Tables[0];
                foreach (DataRow dr in dt.Rows)
                {
                    result = GetObjFromDataRow(dr);
                }
            }
            catch (Exception ex)
            {
                log.Error("sp_PhieuHoc_GetByIDPhieu " + ex.Message);
            }

            return result;
        }

        public int CountBuoiHocTrongThang(int ID_HocSinh, int ID_Lop, int Thang, int Nam)
        {
            int result = 0;
            try
            {
                SqlParameter[] pars = new SqlParameter[] {
                new SqlParameter("@ID_HocSinh", ID_HocSinh),
                new SqlParameter("@ID_Lop", ID_Lop),
                new SqlParameter("@Thang", Thang),
                new SqlParameter("@Nam", Nam)
                };
                object x = helper.ExecuteScalar("sp_PhieuHoc_CountBuoiHocTrongThang", pars);
                result = int.Parse(x.ToString());
            }
            catch (Exception ex)
            {
                log.Error("sp_PhieuHoc_CountBuoiHocTrongThang " + ex.Message);
            }

            return result;
        }

        public int InsertOrUpdate(PhieuHocModel model)
        {
            try
            {
                SqlParameter[] pars = new SqlParameter[] {
                new SqlParameter("@ID", model.ID),
                new SqlParameter("@ID_HocSinh", model.ID_HocSinh),
                new SqlParameter("@ID_NhanVien", model.ID_NhanVien),
                new SqlParameter("@ID_Lop", model.ID_Lop),
                new SqlParameter("@HocDuoi", model.HocDuoi),
                new SqlParameter("@SoBuoi", model.SoBuoi),
                new SqlParameter("@SoTien", model.SoTien),
                new SqlParameter("@GhiChu", model.GhiChu),
                new SqlParameter("@Thang", model.Thang),
                new SqlParameter("@NamHoc", model.NamHoc),
                new SqlParameter("@SoBuoiDaHoc", model.SoBuoiDaHoc),
                new SqlParameter("@ID_ChiNhanh", model.ID_ChiNhanh),
                new SqlParameter("@ID_PhieuThu", model.ID_PhieuThu)

                };

                object id = helper.ExecuteScalar("sp_PhieuHoc_InsertOrUpdate", pars);
                if (id != null)
                {
                    return int.Parse(id.ToString());
                }
            }
            catch (Exception ex)
            {
                log.Error("sp_PhieuHoc_InsertOrUpdate " + ex.Message);
            }

            return 0;
        }

        public int InsertOrUpdateTemp(PhieuHocModel model)
        {
            try
            {
                SqlParameter[] pars = new SqlParameter[] {
                new SqlParameter("@ID", model.ID),
                new SqlParameter("@ID_HocSinh", model.ID_HocSinh),
                new SqlParameter("@ID_NhanVien", model.ID_NhanVien),
                new SqlParameter("@ID_Lop", model.ID_Lop),
                new SqlParameter("@HocDuoi", model.HocDuoi),
                new SqlParameter("@SoBuoi", model.SoBuoi),
                new SqlParameter("@SoTien", model.SoTien),
                new SqlParameter("@GhiChu", model.GhiChu),
                new SqlParameter("@Thang", model.Thang),
                new SqlParameter("@NamHoc", model.NamHoc),
                new SqlParameter("@SoBuoiDaHoc", model.SoBuoiDaHoc),
                new SqlParameter("@ID_ChiNhanh", model.ID_ChiNhanh),
                new SqlParameter("@ID_PhieuThu", model.ID_PhieuThu)

                };

                object id = helper.ExecuteScalar("sp_PhieuHocTemp_InsertOrUpdate", pars);
                if (id != null)
                {
                    return int.Parse(id.ToString());
                }
            }
            catch (Exception ex)
            {
                log.Error("sp_PhieuHocTemp_InsertOrUpdate " + ex.Message);
            }

            return 0;
        }

        public int InsertOrUpdate_PhieuThu_CTPH(PhieuHocModel model)
        {
            try
            {
                SqlParameter[] pars = new SqlParameter[] {
                new SqlParameter("@ID", model.ID),
                new SqlParameter("@ID_HocSinh", model.ID_HocSinh),
                new SqlParameter("@ID_NhanVien", model.ID_NhanVien),
                new SqlParameter("@ID_Lop", model.ID_Lop),
                new SqlParameter("@HocDuoi", model.HocDuoi),
                new SqlParameter("@SoBuoi", model.SoBuoi),
                new SqlParameter("@SoTien", model.SoTien),
                new SqlParameter("@DaThanhToan", model.DaThanhToan),
                new SqlParameter("@GhiChu", model.GhiChu),
                new SqlParameter("@Thang", model.Thang),
                new SqlParameter("@NamHoc", model.NamHoc),
                new SqlParameter("@SoBuoiDaHoc", model.SoBuoiDaHoc),
                new SqlParameter("@ID_ChiNhanh", model.ID_ChiNhanh),
                new SqlParameter("@ID_PhieuThu", model.ID_PhieuThu),
                new SqlParameter("@PhanTramKhuyenMai", model.PhanTramKhuyenMai)

                };

                object id = helper.ExecuteScalar("sp_PhieuThu_CTPH_InsertOrUpdate", pars);
                if (id != null)
                {
                    return int.Parse(id.ToString());
                }
            }
            catch (Exception ex)
            {
                log.Error("sp_PhieuThu_CTPH_InsertOrUpdate " + ex.Message);
            }

            return 0;
        }

        public bool DeletePhieuHoc(int ID)
        {
            try
            {
                SqlParameter[] pars = new SqlParameter[] {
                new SqlParameter("@ID", ID),
                };

                int rowaff = helper.ExecuteNonQuery("sp_PhieuHoc_Delete", pars);
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
                log.Error("sp_PhieuHoc_InsertOrUpdate " + ex.Message);
            }

            return false;
        }

        public bool DeletePhieuThu_CTPH(int ID)
        {
            try
            {
                SqlParameter[] pars = new SqlParameter[] {
                new SqlParameter("@ID", ID),
                };

                int rowaff = helper.ExecuteNonQuery("sp_PhieuThu_CTPH_Delete", pars);
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
                log.Error("sp_PhieuThu_CTPH_Delete " + ex.Message);
            }

            return false;
        }
    }
}