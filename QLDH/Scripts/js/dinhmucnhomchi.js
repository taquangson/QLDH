$(document).ready(function () {
    $("#window").kendoWindow({
        width: "800px",
        height: "500px",
        title: "Chi tiết",
        visible: false,
        modal: true,
        resizable: false,
        actions: [
            "Close"
        ]
    });


    $("#grid").kendoGrid({
        height: function () {
            var height = $(window).height() - 160;
            return height;
        },
        scrollable: true,
        persistSelection: true,
        autoFitColumn: true,
        resizable: true,
        sortable: true,
        excel: {
            filterable: true
        },
        excelExport: function (e) {
            var columns = e.workbook.sheets[0].columns;
            var sheet = e.workbook.sheets[0];
            sheet.title = "Danh sách học sinh";
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
        filterable: {
            mode: "row",
        },
        pageable: pageableShort,
        dataBinding: function () {
            record = (this.dataSource.page() - 1) * this.dataSource.pageSize();
        },
        columns: [
            {
                width: "26px",
                selectable: true,
                headerAttributes: {
                    style: "text-align:left",
                    class: "table-header-cell "
                },
            },
            {
                template: function (e) {
                    return "<i onclick='openCopyWindow(\"" + e.uid + "\")' style='color:red' class='fa fa-copy'></i>";
                },
                width: "30px",
                attributes: {
                    class: "text-center"
                },
                headerAttributes: {
                    style: "text-align: center; font-size: 12px; ",
                    class: "table-header-cell"
                },
                
            },
            {
                title: "STT",
                template: "#= ++record #",
                width: "40px",
                attributes: {
                    class: "text-center"
                },
                headerAttributes: {
                    style: "text-align: center; font-size: 12px; font-weight:bold",
                    class: "table-header-cell"
                }
            },
            {
                field: "TenKeHoach",
                title: "Tên kế hoạch",
                width: "150px",
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
                }
            },
            {
                field: "TenLoaiKeHoach",
                title: "Loại kế hoạch",
                width: "100px",
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
                    style: "text-align: center;",
                }
            },
            {
                field: "TenNhomChi",
                title: "Nhóm chi",
                width: "200px",
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
                    style: "text-align: center;",
                }
            },
            {
                field: "TongTienDinhMuc",
                format: "{0:n0}",
                title: "Tổng tiền",
                width: "100px",
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
                    style: "text-align: center;",
                }
            },
            {
                field: "SoLuot",
                title: "Số lần",
                width: "100px",
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
                    style: "text-align: center;",
                }
            },
            {
                field: "NgayBatDau",
                title: "Ngày bắt đầu",
                template: function (e) {
                    var dateString = e.NgayBatDau.substr(6);
                    var currentTime = new Date(parseInt(dateString));
                    if (currentTime.getFullYear() != 1) {
                        return kendo.toString(currentTime, "dd/MM/yyyy");
                    } else {
                        return "";
                    }
                },
                width: "100px",
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
                    style: "text-align: center;",
                }
            },
            {
                field: "NgayKetThuc",
                title: "Ngày kết thúc",
                template: function (e) {
                    var dateString = e.NgayKetThuc.substr(6);
                    var currentTime = new Date(parseInt(dateString));
                    if (currentTime.getFullYear() != 1) {
                        return kendo.toString(currentTime, "dd/MM/yyyy");
                    } else {
                        return "";
                    }
                },
                width: "100px",
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
                    style: "text-align: center;",
                }
            },
            {
                field: "MoTa",
                title: "Mô tả",
                width: "100px",
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
                    style: "text-align: center;",
                }
            },
        ]

    });

    $("#grid").on("dblclick", "tr[role='row']", function () {
        $("#grid").data("kendoGrid").clearSelection();
        var row = $("#grid").data("kendoGrid").table.find("[data-uid=" + $(this).attr("data-uid") + "]");
        $("#grid").data("kendoGrid").select(row);
        openEditWindow();
    })
    LoadGridData();
    $("#dialogRoot").kendoDialog().data("kendoDialog").close();

    $("#TrangThai").kendoComboBox({
        dataTextField: "text",
        dataValueField: "value",
        filter: "contains",
        suggest: true,
        delay: 500,
        dataSource: new kendo.data.DataSource({
            data: [{ text: "Hoạt động", value: 1 }, { text: 'Tạm ngừng', value: 0 }],
        })
    });
    $("#LoaiKeHoach").kendoComboBox({
        dataTextField: "text",
        dataValueField: "value",
        filter: "contains",
        suggest: true,
        delay: 500,
        dataSource: new kendo.data.DataSource({
            data: [
                { text: "Năm", value: 1 },
                { text: 'Quý', value: 2 },
                { text: 'Tháng', value: 3 },
                { text: 'Tuần', value: 4 },
                { text: 'Ngày', value: 5 },
                { text: 'Lượt', value: 6 }
            ],
        })
    });

    $("#NgayBatDau").kendoDatePicker({
        value: new Date(),
        format: "dd/MM/yyyy"
    });
    $("#NgayKetThuc").kendoDatePicker({
        value: new Date(),
        format: "dd/MM/yyyy"
    });

    LoadDanhMucNhomChi();


})

function LoadDanhMucNhomChi() {
    $.ajax({
        url: '/DanhMuc/GetAllNhomChi',
        type: 'GET',
        contentType: "application/json; charset=utf-8",
        dataType: 'json',
        
    }).done(function successCallback(response) {
        var dataSource = new kendo.data.DataSource({
            data: response,
        });
        if ($("#NhomChi").data("kendoComboBox") == undefined) {
            $("#NhomChi").kendoComboBox({
                dataTextField: "TenNhomChi",
                dataValueField: "ID",
                filter: "contains",
                suggest: true,
                delay: 1000,
                dataSource: dataSource
            })
        } else {
            $("#NhomChi").data("kendoComboBox").setDataSource(dataSource);
        }
    });
}


function openEditWindow() {
    var arr = $("#grid").data("kendoGrid").selectedKeyNames();
    if (arr.length != 1) {
        openDialog($("#dialogRoot").data("kendoDialog"), "Vui lòng chọn 1 bản ghi để sửa");
    } else {
        if ($(window).width() > 800) {
            $("#window").data("kendoWindow").center().open();
        } else {
            $("#window").data("kendoWindow").center().maximize().open();
        }
        var selectedItem = $("#grid").data("kendoGrid").dataItem($("#grid").data("kendoGrid").select());
        $("#ID").val(selectedItem.ID);
        $("#TenKeHoach").val(selectedItem.TenKeHoach);
        $("#LoaiKehoach").val(selectedItem.LoaiKehoach);
        $("#SoTien").val(selectedItem.SoTien);
        $("#SoLuot").val(selectedItem.SoLuot);
        $("#PhanTramDoanhThu").val(selectedItem.PhanTramDoanhThu);
        $("#TongTienDinhMuc").val(selectedItem.TongTienDinhMuc);
        $("#MoTa").val(selectedItem.MoTa);

        $("#NhomChi").data("kendoComboBox").value(selectedItem.ID_NhomChi);
        $("#LoaiKeHoach").data("kendoComboBox").value(selectedItem.LoaiKeHoach);
        $("#NgayBatDau").data("kendoDatePicker").value(toDate(selectedItem.NgayBatDau));
        $("#NgayKetThuc").data("kendoDatePicker").value(toDate(selectedItem.NgayKetThuc));

    }

}

function openCopyWindow(uid) {
    var row = $("#grid").data("kendoGrid").table.find("[data-uid=" + $(this).attr("data-uid") + "]");
    var dataRow = $('#grid').data("kendoGrid").dataSource.getByUid(uid);
    if ($(window).width() > 800) {
        $("#window").data("kendoWindow").center().open();
    } else {
        $("#window").data("kendoWindow").center().maximize().open();
    }
    $("#ID").val('');
    $("#TenKeHoach").val(dataRow.TenKeHoach);
    $("#LoaiKehoach").val(dataRow.LoaiKehoach);
    $("#SoTien").val(dataRow.SoTien);
    $("#SoLuot").val(dataRow.SoLuot);
    $("#PhanTramDoanhThu").val(dataRow.PhanTramDoanhThu);
    $("#TongTienDinhMuc").val(dataRow.TongTienDinhMuc);
    $("#MoTa").val(dataRow.MoTa);

    $("#NhomChi").data("kendoComboBox").value(dataRow.ID_NhomChi);
    $("#LoaiKeHoach").data("kendoComboBox").value(dataRow.LoaiKeHoach);
    $("#NgayBatDau").data("kendoDatePicker").value(toDate(dataRow.NgayBatDau));
    $("#NgayKetThuc").data("kendoDatePicker").value(toDate(dataRow.NgayKetThuc));


}

function toDate(value) {
    var dateRegExp = /^\/Date\((.*?)\)\/$/;
    var date = dateRegExp.exec(value);
    return new Date(parseInt(date[1]));
}


function LoadGridData() {
    $.ajax({
        url: '/DinhMucNhomChi/GetAll',
        type: 'GET',
    }).done(function successCallback(response) {

         
        kendo.ui.progress($("#grid"), true);
        var dataSource = new kendo.data.DataSource({
            data: response,
            schema: {
                model: {
                    id: "ID",
                    field: {
                        NgayBatDau: {
                            type: 'date'
                        }, 
                        NgayKetThuc: {
                            type: 'date'
                        }, 
                    }
                }
            },
            pageSize: 20,
        });
        $("#grid").data("kendoGrid").setDataSource(dataSource);
        kendo.ui.progress($("#grid"), false);
    });
}

function ThemMoi() {
    document.getElementById("formChiTiet").reset();
    $("#ID").val('');
    if ($(window).width() > 800) {
        $("#window").data("kendoWindow").center().open();
    } else {
        $("#window").data("kendoWindow").center().maximize().open();
    }
}

function Luu() {
    var validten = SetValidate("TenKeHoach");
    var validnhomchi = SetValidate("NhomChi");
    var validloaikh = SetValidate("LoaiKeHoach");

    var valid = validten;
    if (valid && validnhomchi && validloaikh) {
        $.ajax({
            url: '/DinhMucNhomChi/CreateOrUpdate',
            type: 'POST',
            data: {
                ID: $("#ID").val(),
                TenKeHoach: $("#TenKeHoach").val(),
                SoTien: $("#SoTien").val(),
                PhanTramDoanhThu: $("#PhanTramDoanhThu").val(),
                TongTienDinhMuc: $("#TongTienDinhMuc").val(),
                SoLuot: $("#SoLuot").val(),
                Mota: $("#MoTa").val(),
                ID_NhomChi: $("#NhomChi").data("kendoComboBox").value(),
                LoaiKeHoach: $("#LoaiKeHoach").data("kendoComboBox").value(),
                NgayBatDau: kendo.toString($("#NgayBatDau").data("kendoDatePicker").value(), 'yyyy-MM-dd hh:mm:ss'),
                NgayKetThuc: kendo.toString($("#NgayKetThuc").data("kendoDatePicker").value(), 'yyyy-MM-dd hh:mm:ss')

            }
        }).done(function successCallback(response) {

            if (response.status) {
                notification.show({ kValue: response.msg }, "success");
                Huy();
                $("#grid").data("kendoGrid").clearSelection();
                LoadGridData();
            } else {
                notification.show({ kValue: response.msg }, "error");
            }
        });
    }
}


function Huy() {
    document.getElementById("formChiTiet").reset();
    $("#ID").val('');
    $("#window").data("kendoWindow").close();
}

function Xoa() {
    var bangDuLieu = $("#grid").data("kendoGrid");
    if (bangDuLieu.select().length > 0) {
        openConfirm(dialogRoot, "<b style='line-height:40px;'>Bạn có chắc chắn muốn xóa " + bangDuLieu.select().length + " học sinh?</b>", function () { XoaDuLieu(bangDuLieu); }, function () { });
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
        url: '/DinhMucNhomChi/Delete?ID=' + ids.join(','),
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
        fileName: "Dinh_Muc_Ngan_Sach_Nhom_Chi.xlsx",
        filterable: true,
        allPages: true
    }
    grid.saveAsExcel();
}
