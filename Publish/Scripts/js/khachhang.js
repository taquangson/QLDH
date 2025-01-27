$(document).ready(function () {
    $("#grid").kendoGrid({
        height: function () {
            var height = $(window).height - 160;
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
                width: "30px",
                selectable: true,
                headerAttributes: {
                    style: "text-align:left",
                    class: "table-header-cell-checkbox"
                }
            },
            {
                title: "STT",
                template: "#= ++record #",
                width: "60px",
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
                field: "Ten",
                title: "Tên",
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
                field: "DiaChi",
                title: "Địa chỉ",
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
                field: "SoDienThoai",
                title: "Số điện thoại",
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
                field: "TrangThai",
                title: "Trạng Thái",
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
            //    field: "AnhDaiDien",
            //    title: "Ảnh đại diện",
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
            //},
            {
                field: "Email",
                title: "Email",
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
                field: "GhiChu",
                title: "Ghi Chú",
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
                title: "Đổi Mật Khẩu",
                width: "50px",
                template: function (e) {
                    return "<button class='k-button k-success text-center' onclick='openDoiMatKhau(" + e.ID + ")'> <i class='fa fa-refresh'> Đổi Mật Khẩu </i></button>";
                },
                headerAttributes: {
                    style: "text-align: center; font-size: 12px; font-weight:bold",
                    class: "table-header-cell"
                },
            },
        ]
    });
    LoadGridData();
    $("#grid").on("dblclick", "tr[role='row']", function () {
        $("#grid").data("kendoGrid").clearSelection();
        var row = $("#grid").data("kendoGrid").table.find("[data-uid=" + $(this).attr("data-uid") + "]");
        $("#grid").data("kendoGrid").select(row);
        openEditWindow();
    });
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
    $("#dialogRoot").kendoDialog().data("kendoDialog").close();
});

function LoadGridData() {
    $.ajax({
        url: '/KhachHang/GetAllKhachHang',
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
                    }
                }
            },
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

function makeMatKhau(length) {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    let counter = 0;
    while (counter < length) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
        counter += 1;
    }
    return result;
}

function ThemMoi() {
    document.getElementById("formChiTiet").reset();
    $("#window").data("kendoWindow").center().open();
    $("#ID").val(0);
    $("#MatKhau").val(makeMatKhau(8));
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
    $("#Ten").val(selectedItem.Ten);
    $("#DiaChi").val(selectedItem.DiaChi);
    $("#SoDienThoai").val(selectedItem.SoDienThoai);
    $("#TrangThai").val(selectedItem.TrangThai);
    $("#Email").val(selectedItem.Email);
    $("#GhiChu").val(selectedItem.GhiChu);
};

function Huy() {
    document.getElementById("formChiTiet").reset();
    $("#ID").val('0');
    $("#window").data("kendoWindow").close();
};

function Luu() {
    var validTen = SetValidate("Ten");
    var validDiaChi = SetValidate("DiaChi");
    var validSoDienThoai = SetValidate("SoDienThoai");
    var validEmail = SetValidate("Email");
    var validGhiChu = SetValidate("GhiChu");
    var valid = validTen && validDiaChi && validSoDienThoai && validEmail && validGhiChu;
    console.log(valid);
    if (valid) {
        var model = {
            ID: $("#ID").val(),
            Ten: $("#Ten").val(),
            DiaChi: $("#DiaChi").val(),
            SoDienThoai: $("#SoDienThoai").val(),
            TrangThai: $("#TrangThai").val(),
            Email: $("#Email").val(),
            GhiChu: $("#GhiChu").val(),
            MatKhau: $("#MatKhau").val(),
        };
        console.log(model);
        $.ajax({
            url: '/KhachHang/InsertOrUpdateKhachHang',
            data: model,
            type: 'POST',
        }).done(function successCallback(response) {
            if (response != '0') {
                notification.show(response.msg);
                console.log(response);
                Huy();
                LoadGridData();
            } else {
                notification.show(response.msg);
                console.log(response);
            }
        });
    }
};

function openDoiMatKhau(ID) {
    openConfirm(dialogRoot, "<b style='line-height:40px;'>Bạn có chắc chắn muốn đổi mật khẩu?</b>", function () { doiMatKhau(ID); }, function () { });
}

function doiMatKhau(ID) {
    var model = {
        ID: ID,
        MatKhau: makeMatKhau(8),
    };
    console.log(model);
    $.ajax({
        url: '/KhachHang/UpdateMatKhauKhachHang',
        data: model,
        type: 'POST',
    }).done(function successCallback(response) {
        if (response) {
            notification.show(response);
            console.log(response);
            LoadGridData();
        } else {
            notification.show(response);
            console.log(response);
        }
    });
}

function Xoa() {
    var bangDuLieu = $("#grid").data("kendoGrid");
    if (bangDuLieu.select().length > 0) {
        openConfirm(dialogRoot, "<b style='line-height:40px;'>Bạn có chắc chắn muốn xóa " + bangDuLieu.select().length + " lớp?</b>", function () { XoaDuLieu(bangDuLieu); }, function () { });
        console.log(bangDuLieu.select().length);
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
        url: '/KhachHang/DeleteKhachHang?ID=' + ids.join(','),
        type: 'POST'
    }).done(function (response) {
        if (response.status) {
            LoadGridData();
            console.log(response);
        } else {
            console.log(response);
        }
    })
}

function XuatExcel() {
    var grid = $('#grid').data('kendoGrid');

    grid.options.excel = {
        fileName: "DanhSanhKhachHang.xlsx",
        filterable: true,
        allPages: true
    }
    grid.saveAsExcel();
}