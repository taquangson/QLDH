$(document).ready(function () {
    $("#window").kendoWindow({
        width: "600px",
        height: "415px",
        title: "Chi tiết",
        visible: false,
        modal: true,
        resizable: true,
        actions: [
            "close"
        ]
    });

    $("#grid").kendoGrid({
        height: function () {
            var height = $(window).height() - 170;
            return height;
        },
        scrollable: true,
        persistSelection: true,
        autoFitColumn: true,
        resizable: true,
        sortable: true,
        filterable: {
            mode: "row",
        },
        pageable: pageableShort,
        dataBinding: function () {
            record = (this.dataSource.page() - 1) * this.dataSource.pageSize();
        },
        excel: {
            filterable: true,
        },
        excelExport: function (e) {
            var columns = e.workbook.sheets[0].columns;
            var sheet = e.workbook.sheets[0];
            sheet.title = "Danh sách quỹ";
            //"từ" + kendo.toString($("#TuNgay").data("kendoDatePicker").value(), "dd/MM/yyyy") + " đến " + kendo.toString($("#DenNgay").data("kendoDatePicker").value(), "dd/MM/yyyy");
            for (var rowIndex = 0; rowIndex < sheet.rows.length; rowIndex++) {
                var row = sheet.rows[rowIndex];
                var flag = false;
                if (rowIndex == 0) {
                    flag = true;
                }
                for (var cellIndex = 0; cellIndex < row.cells.length; cellIndex++) {

                    if (flag) {
                        row.cells[cellIndex].textAlign = 'center';
                        row.cells[cellIndex].bold = true;
                    }
                    row.cells[cellIndex].borderBottom = { color: "#000", size: 1 };
                    row.cells[cellIndex].borderTop = { color: "#000", size: 1 };
                    row.cells[cellIndex].borderRight = { color: "#000", size: 1 };
                    row.cells[cellIndex].borderleft = { color: "#000", size: 1 };
                }
            }
        },
        columns: [
            {
                width: "12px",
                selectable: true,
                headerAttributes: {
                    style: "text-align:left",
                    class: "table-header-cell-checkbox"
                }
            },
            {
                title: "STT",
                template: "#= ++record #",
                width: "20px",
                attributes: {
                    class: "text-center"
                },
                headerAttributes: {
                    style: "text-align: center; font-size: 12px; font-weight:bold",
                    class: "table-header-cell"
                }
            },
            {
                field: "ID",
                title: "ID",
                width: "10px",
                hidden: true,
                filterable: {
                    cell: {
                        operator: "contains",
                        showOperator: false,
                        template: function (e) {
                            e.element.addClass("k-textbox").css("width", "100%")
                        },
                    }
                },
                headerAttributes: {
                    style: "text-align: center; font-size: 12px; font-weight:bold",
                    class: "table-header-cell"
                },
            },
            {
                field: "TenQuy",
                title: "Tên Quỹ",
                width: "100px",
                filterable: {
                    cell: {
                        operator: "contains",
                        showOperator: false,
                        template: function (e) {
                            e.element.addClass("k-textbox").css("width", "100%")
                        },
                    }
                },
                headerAttributes: {
                    style: "text-align: center; font-size: 12px; font-weight:bold",
                    class: "table-header-cell"
                },                
            },
            {
                field: "TenNganHang",
                title: "Tên Ngân Hàng",
                width: "100px",
                filterable: {
                    cell: {
                        operator: "contains",
                        showOperator: false,
                        template: function (e) {
                            e.element.addClass("k-textbox").css("width", "100%")
                        },
                    }
                },
                headerAttributes: {
                    style: "text-align: center; font-size: 12px; font-weight:bold",
                    class: "table-header-cell"
                },
            },
            //{
            //    field: "TrangThai",
            //    title: "Trạng Thái",
            //    width: "100px",
            //    filterable: {
            //        cell: {
            //            operator: "contains",
            //            showOperator: false,
            //            template: function (e) {
            //                e.element.addClass("k-textbox").css("width", "100%")
            //            },
            //        }
            //    },
            //    headerAttributes: {
            //        style: "text-align: center; font-size: 12px; font-weight:bold",
            //        class: "table-header-cell"
            //    },
            //    template: function (e) {
            //        if (e.TrangThai === 1) {
            //            return "<span style='color: green;'>Đang hoạt động</span>";
            //        }
            //        else if (e.TrangThai === 2) {
            //            return "<span style='color: red;'>Không hoạt động</span>";
            //        }                    
            //    }
            //},
            {
                field: "NgayTao",
                title: "Ngày Tạo",
                width: "100px",
                template: function (e) {
                    var dateString = e.NgayTao.substr(6);
                    var currentTime = new Date(parseInt(dateString));
                    if (currentTime.getFullYear() != 1) {
                        return kendo.toString(currentTime, "HH:mm dd/MM/yyyy");
                    } else {
                        return "";
                    }
                },
                filterable: {
                    cell: {
                        operator: "contains",
                        showOperator: false,
                        template: function (e) {
                            e.element.addClass("k-textbox").css("width", "100%")
                        },
                    }
                },
                headerAttributes: {
                    style: "text-align: center; font-size: 12px; font-weight:bold",
                    class: "table-header-cell"
                },
                attributes: {
                    class: "text-center"
                },
            },
            {
                field: "BankCode",
                title: "Bank Code",
                width: "100px",
                filterable: {
                    cell: {
                        operator: "contains",
                        showOperator: false,
                        template: function (e) {
                            e.element.addClass("k-textbox").css("width", "100%")
                        },
                    }
                },
                headerAttributes: {
                    style: "text-align: center; font-size: 14px; font-weight:bold",
                    class: "table-header-cell"
                },
                attributes: {
                    class: "text-center"
                },
            },            
            {
                field: "SoTaiKhoan",
                title: "Số Tài Khoản",
                width: "100px",
                filterable: {
                    cell: {
                        operator: "contains",
                        showOperator: false,
                        template: function (e) {
                            e.element.addClass("k-textbox").css("width", "100%")
                        },
                    }
                },
                headerAttributes: {
                    style: "text-align: center; font-size: 12px; font-weight:bold",
                    class: "table-header-cell"
                },
                attributes: {

                    class: "text-center"
                },
            },
            {
                field: "TongTien",
                title: "Tổng tiền",
                format: "{0:n0}",
                aggregates: ["sum"],
                width: "80px",
                filterable: {
                    cell: {
                        operator: "contains",
                        showOperators: false,
                        template: function (e) {
                            e.element.addClass("k-textbox").css("width", "100%")
                        }
                    }
                },
                headerAttributes: {
                    style: "text-align: center; font-size: 12px; font-weight:bold",
                    class: "table-header-cell"
                },
                attributes: {
                    style: "font-weight:bold",
                    class: "text-center"
                },
            },
        ]
    });
    $("#grid").on("dblclick", "tr[role='row']", function () {
        $("#grid").data("kendoGrid").clearSelection();
        var row = $("#grid").data("kendoGrid").table.find("[data-uid=" + $(this).attr("data-uid") + "]");
        $("#grid").data("kendoGrid").select(row);
        openEditWindow();
    })
    
    $("#NgayTao").kendoDatePicker({
        format: "dd-MM-yyyy",
    });
    LoadGridData();
    $("#dialogRoot").kendoDialog().data("kendoDialog").close();
});

function LoadGridData() {
    $.ajax({
        url: '/Quy/GetAllQuy',
        type: 'GET',
    }).done(function successCallback(response) {
        kendo.ui.progress($("#grid"), true);
        var dataSource = new kendo.data.DataSource({
            data: response,
            schema: {
                model: {
                    id: "ID",
                    field: {
                        TrangThai: {
                            type: "number",
                        },
                        NgayTao: {
                            type: "date",
                        },
                        TongTien: {
                            type: "number",
                        },
                    }
                }
            },
            aggregate: [
                { field: "TongTien", aggregate: "sum" },
            ],
            pageSize: 50,
        });
        $("#grid").data("kendoGrid").setDataSource(dataSource);
        $('#grid').data("kendoGrid").dataSource.read();
        $('#grid').data("kendoGrid").refresh();
        $('#grid').data("kendoGrid").dataSource.fetch(function () {
        });
        kendo.ui.progress($("#grid"), false);
    });
};

function ThemMoi() {
    document.getElementById("formChiTiet").reset();
    $("#ID").val(0);
    $("#NgayTao").data("kendoDatePicker").value(new Date());
    $("#window").data("kendoWindow").center().open();
};

function Huy() {
    document.getElementById("formChiTiet").reset();
    $("#ID").val('0');
    $("#window").data("kendoWindow").close();
};

function Luu() {
    var validTenQuy = SetValidate("TenQuy");
    var validBankCode = SetValidate("BankCode");
    var validTenNganHang = SetValidate("TenNganHang");
    var validSoTaiKhoan = SetValidate("SoTaiKhoan");
    var valid = validTenQuy && validBankCode && validTenNganHang && validSoTaiKhoan;
    if (valid) {
        var model = {
            ID: $("#ID").val(),
            TenQuy: $("#TenQuy").val(),
            TrangThai: $("#TrangThai").val(),
            BankCode: $("#BankCode").val(),
            TenNganHang: $("#TenNganHang").val(),
            SoTaiKhoan: $("#SoTaiKhoan").val(),
        };
        console.log(model);
        $.ajax({
            url: '/Quy/InsertOrUpdateQuy',
            data: model,
            type: 'POST',
        }).done(function successCallback(response) {
            if (response != '0') {
                notification.show(response.msg, "success");
                console.log(response);
                Huy();
                LoadGridData();
            } else {
                notification.show(response.msg, "error");
                console.log(response);
            }
        });
    }
};
    
function openEditWindow() {
    var selected = $("#grid").data("kendoGrid").select();
    if (selected.length != 1) {
        openDialog($("#dialogRoot").data("kendoDialog"), "Vui lòng chọn 1 bản ghi để sửa");
        return;
    } else {
        $("#window").data("kendoWindow").center().open();
    }
    var selectedItem = $("#grid").data("kendoGrid").dataItem($("#grid").data("kendoGrid").select());
    console.log(selectedItem);
    $("#ID").val(selectedItem.ID);
    $("#TenQuy").val(selectedItem.TenQuy);
    $("#TrangThai").val(selectedItem.TrangThai);
    $("#NgayTao").data("kendoDatePicker").value(selectedItem.NgayTao);
    $("#BankCode").val(selectedItem.BankCode);
    $("#TenNganHang").val(selectedItem.TenNganHang);
    $("#SoTaiKhoan").val(selectedItem.SoTaiKhoan);

};

function Xoa() {
    var bangDuLieu = $("#grid").data("kendoGrid");
    if (bangDuLieu.select().length > 0) {
        openConfirm(dialogRoot, "<b style='line-height:40px;'>Bạn có chắc chắn muốn xóa " + bangDuLieu.select().length + " lớp?</b>", function () { XoaDuLieu(bangDuLieu); }, function () { });
    } else {
        openDialog(dialogRoot, "<b style='line-height:40px;'>Bạn phải chọn dữ liệu cần xóa</b>");
        //notification.show({ kValue: "Bạn phải chọn dữ liệu cần xóa" }, "error");
    }
}

function XoaDuLieu(bangDuLieu) {
    var ids = [];
    bangDuLieu.select().each(function () {
        var dataItem = bangDuLieu.dataItem(this);
        var id = dataItem.id;
        ids.push(id);
    });
    $.ajax({
        url: '/Quy/DeleteQuy?ID=' + ids.join(','),
        type: 'POST'
    }).done(function (response) {
        if (response.status) {
            LoadGridData();
            notification.show({ kValue: response.msg }, "success");
        } else {
            notification.show({ kValue: response.msg }, "error");
        }
    })
}

function XuatExcel() {
    var grid = $('#grid').data('kendoGrid');

    grid.options.excel = {
        fileName: "DanhSanhQuy.xlsx",
        filterable: true,
        allPages: true
    }
    grid.saveAsExcel();
}