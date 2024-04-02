var __dataDeXuat = [];
$(document).ready(function () {
    $("#window").kendoWindow({
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
            var height = $(window).height() - 300;
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
                field: "NgayTao",
                title: "Ngày tạo",
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
                },
                attributes: {
                    style: "text-align: center;",
                }
            },
            {
                field: "MaPhieu",
                title: "Mã phiếu",
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
                field: "TenPhieu",
                title: "Tên phiếu",
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
                field: "SoTien",
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
                field: "GhiChu",
                title: "Ghi chú",
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

    $("#HinhThuc").kendoComboBox({
        dataTextField: 'text',
        dataValueField: 'value',
        dataSource: new kendo.data.DataSource({
            data: [
                { text: 'Tiền mặt', value: 0 },
                { text: 'Chuyển khoản', value: 1 }
            ]
        })
    })
    
})
async function getTien(tienVon0, tienVon1) {
    var tongSoDu = 0;
    var soDu0 = 0;
    var soSu1 = 0;
    var soTienChi_0 = 0;
    var soTienChi_1 = 0;
    var soTienThu_0 = 0;
    var soTienThu_1 = 0;
    GetTienChi(0, function (tienChi0) {
        soTienChi_0 = tienChi0
        GetTienChi(1, function (tienChi1) {
            soTienChi_1 = tienChi1
            GetTienThu(0, function (tienThu0) {
                soTienThu_0 = tienThu0
                GetTienThu(1, function (tienThu1) {
                    soTienThu_1 = tienThu1
                    console.log("tien: ", soTienChi_0, " - ", soTienChi_1, " - ", soTienThu_0, " - ", soTienThu_1)
                    soDu0 = soTienThu_0 + tienVon0 - tienChi0;
                    soDu1 = soTienThu_1 + tienVon1 - tienChi1;
                    tongSoDu = soDu0 + soDu1
                    $("#TongSoDu").text(kendo.toString(tongSoDu, 'n0'))
                    $("#SoDu0").text(kendo.toString(soDu0, 'n0'))
                    $("#SoDu1").text(kendo.toString(soDu1, 'n0'))

                })
            })
        })
    })


}
function openEditWindow() {
    var arr = $("#grid").data("kendoGrid").selectedKeyNames();
    $("#MaPhieuCanQuy").show()
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
        $("#TenPhieu").val(selectedItem.TenPhieu);
        $("#MaPhieu").val(selectedItem.MaPhieu);
        $("#SoTien").val(selectedItem.SoTien);
        $("#LyDo").val(selectedItem.LyDo);

        $("#HinhThuc").data("kendoComboBox").value(selectedItem.HinhThuc);

    }

}

function openCopyWindow(uid) {
    var row = $("#grid").data("kendoGrid").table.find("[data-uid=" + $(this).attr("data-uid") + "]");
    $("#MaPhieuCanQuy").hide()

    var selectedItem = $('#grid').data("kendoGrid").dataSource.getByUid(uid);
    if ($(window).width() > 800) {
        $("#window").data("kendoWindow").center().open();
    } else {
        $("#window").data("kendoWindow").center().maximize().open();
    }
    $("#ID").val('');
    $("#TenPhieu").val(selectedItem.TenPhieu);
    $("#SoTien").val(selectedItem.SoTien);
    $("#GhiChu").val(selectedItem.GhiChu);

    $("#HinhThuc").data("kendoComboBox").value(selectedItem.HinhThuc);


}

function toDate(value) {
    var dateRegExp = /^\/Date\((.*?)\)\/$/;
    var date = dateRegExp.exec(value);
    return new Date(parseInt(date[1]));
}


function LoadGridData() {
    $.ajax({
        url: '/PhieuCanQuy/GetAll',
        type: 'GET',
    }).done(function successCallback(response) {

         
        kendo.ui.progress($("#grid"), true);
        var dataSource = new kendo.data.DataSource({
            data: response,
            schema: {
                parse: function (data) {
                    for (var i = 0; i < data.length; i++) {
                        var ngayTao = new Date(parseInt(data[i].NgayTao.substr(6)));
                        data[i].NgayTao = kendo.toString(ngayTao, "dd/MM/yyyy hh:mm tt");
                    }
                    return data;
                },
                model: {
                    id: "ID",
                    field: {
                        NgayBatDau: {
                            type: 'date'
                        }, 
                        NgayKetThuc: {
                            type: 'date'
                        },
                        NgayTao: {
                            type: 'string'
                        }, 
                    }
                }
            },
            pageSize: 20,
        });
        var tienVon0 = 0;
        var tienVon1 = 0;
        $.each(response, function (index, item) {
            if (item.HinhThuc == 0) {
                tienVon0 = tienVon0 + item.SoTien
            } else {
                tienVon1 = tienVon1 + item.SoTien
            }
        })
        $("#grid").data("kendoGrid").setDataSource(dataSource);
        kendo.ui.progress($("#grid"), false);
        getTien(tienVon0, tienVon1);
    });
}

function ThemMoi() {
    document.getElementById("formChiTiet").reset();
    $("#ID").val('');
    $("#MaPhieuCanQuy").hide()

    getMaPhieu();

    if ($(window).width() > 800) {
        $("#window").data("kendoWindow").center().open();
    } else {
        $("#window").data("kendoWindow").center().maximize().open();
    }
}
function getMaPhieu() {
    var stt = $("#grid").data("kendoGrid").dataSource.data().length + 1
    var maphieu = "PC" + kendo.toString(new Date(), "ddMMyyyy")
    $("#MaPhieu").val(maphieu);
}
function Luu() {
    var validten = SetValidate("TenPhieu");

    var valid = validten;
    if (valid ) {
        var lstChiPhi = [];

        $.ajax({
            url: '/PhieuCanQuy/CreateOrUpdate',
            type: 'POST',
            data: {
                ID: $("#ID").val(),
                TenPhieu: $("#TenPhieu").val(),
                SoTien: $("#SoTien").val(),
                GhiChu: $("#GhiChu").val(),
                HinhThuc: $("#HinhThuc").data("kendoComboBox").value()
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
        openConfirm(dialogRoot, "<b style='line-height:40px;'>Bạn có chắc chắn muốn xóa " + bangDuLieu.select().length + " phiếu?</b>", function () { XoaDuLieu(bangDuLieu); }, function () { });
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
        url: '/PhieuCanQuy/Delete?ID=' + ids.join(','),
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

async function GetTienChi(hinhThuc, callback) {
    $.ajax({
        url: '/PhieuCanQuy/GetTongChi?HinhThuc=' + hinhThuc,
        type: 'GET',
        
    }).done(function successCallback(response) {
        if (response.status) {
            callback(response.data)

        } else {
            callback(0)
        }
    });
}
async function GetTienThu(hinhThuc, callback) {
    $.ajax({
        url: '/PhieuCanQuy/GetTongThu?HinhThuc=' + hinhThuc,
        type: 'GET',

    }).done(function successCallback(response) {
        if (response.status) {
            callback(response.data)

        } else {
            callback(0)
        }
    });
}