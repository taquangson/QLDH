var dataKhuVuc = [];
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


    $("#grid").kendoTreeList({
        height: function () {
            var height = $(window).height() - 160;
            return height;
        },
        selectable: true,
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
                field: "MaKhuVuc",
                title: "Mã khu vực",
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
                field: "TenKhuVuc",
                title: "Tên khu vực",
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
                field: "TenTrangThai",
                title: "Trạng thái",
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
                field: "MoTa",
                title: "Mô tả",
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
        ]

    });

    $("#grid").on("dblclick", "tr[role='row']", function () {
        $("#grid").data("kendoTreeList").clearSelection();
        var row = $("#grid").data("kendoTreeList").table.find("[data-uid=" + $(this).attr("data-uid") + "]");
        $("#grid").data("kendoTreeList").select(row);
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
            data: [{ text: "Chưa sử dụng", value: 1 }, { text: 'Đã sử dụng', value: 2 }, { text: "Đã full công suất", value: 3 }, { text: 'Đang setup', value: 4 }],
        })
    });


    //LoadDanhMucNhomChi();


})

//function LoadDanhMucNhomChi() {
//    $.ajax({
//        url: '/DanhMuc/GetAllNhomChi',
//        type: 'GET',
//        contentType: "application/json; charset=utf-8",
//        dataType: 'json',
        
//    }).done(function successCallback(response) {
//        var dataSource = new kendo.data.DataSource({
//            data: response,
//        });
//        if ($("#NhomChi").data("kendoComboBox") == undefined) {
//            $("#NhomChi").kendoComboBox({
//                dataTextField: "TenNhomChi",
//                dataValueField: "ID",
//                filter: "contains",
//                suggest: true,
//                delay: 1000,
//                dataSource: dataSource
//            })
//        } else {
//            $("#NhomChi").data("kendoComboBox").setDataSource(dataSource);
//        }
//    });
//}


function openEditWindow() {
    //var arr = $("#grid").data("kendoTreeList").selectedKeyNames();
    //if (arr.length != 1) {
    //    openDialog($("#dialogRoot").data("kendoDialog"), "Vui lòng chọn 1 bản ghi để sửa");
    //} else {
    //    if ($(window).width() > 800) {
    //        $("#window").data("kendoWindow").center().open();
    //    } else {
    //        $("#window").data("kendoWindow").center().maximize().open();
    //    }
    //    var selectedItem = $("#grid").data("kendoTreeList").dataItem($("#grid").data("kendoTreeList").select());
    //    $("#ID").val(selectedItem.ID);
    //    $("#TenKhuVuc").val(selectedItem.TenKhuVuc);
    //    $("#MaKhuVuc").val(selectedItem.MaKhuVuc);
    //    $("#MoTa").val(selectedItem.MoTa);
    //    $("#KhuVuc").data("kendoComboBox").value(selectedItem.ID_Cha);

    //    $("#TrangThai").data("kendoComboBox").value(selectedItem.TrangThai);

    //}
    if ($(window).width() > 800) {
        $("#window").data("kendoWindow").center().open();
    } else {
        $("#window").data("kendoWindow").center().maximize().open();
    }
    var selectedItem = $("#grid").data("kendoTreeList").dataItem($("#grid").data("kendoTreeList").select());
    $("#ID").val(selectedItem.ID);
    GetKhuVucCha(selectedItem.ID);
    $("#TenKhuVuc").val(selectedItem.TenKhuVuc);
    $("#MaKhuVuc").val(selectedItem.MaKhuVuc);
    $("#MoTa").val(selectedItem.MoTa);
    $("#KhuVuc").data("kendoComboBox").value(selectedItem.ID_Cha);

    $("#TrangThai").data("kendoComboBox").value(selectedItem.TrangThai);

}



function toDate(value) {
    var dateRegExp = /^\/Date\((.*?)\)\/$/;
    var date = dateRegExp.exec(value);
    return new Date(parseInt(date[1]));
}


function LoadGridData() {
    $.ajax({
        url: '/DanhMucKhuVuc/GetAll',
        type: 'GET',
    }).done(function successCallback(response) {
        console.log(response);
        var dataTree = []
        dataKhuVuc = response;
        $.each(response, function (index, item) {
            if (item.ID_Cha == 0) {
                item.ID_Cha = null
            }
            dataTree.push(item)
        })
        console.log(dataTree);

        kendo.ui.progress($("#grid"), true);
        var dataSource = new kendo.data.TreeListDataSource({
            data: dataTree,
            schema: {
                model: {
                    id: "ID",
                    parentId: "ID_Cha",
                    expanded: true,
                    fields: {
                        ID_Cha: { field: "ID_Cha", nullable: true },
                        ID: { field: "ID", type: "number" }
                    }
                }
            },
            pageSize: 20,
        });
        
        
        $("#grid").data("kendoTreeList").setDataSource(dataSource);
        kendo.ui.progress($("#grid"), false);
    });
}

function ThemMoi() {
    document.getElementById("formChiTiet").reset();
    $("#ID").val('');
    GetKhuVucCha(0);
    if ($(window).width() > 800) {
        $("#window").data("kendoWindow").center().open();
    } else {
        $("#window").data("kendoWindow").center().maximize().open();
    }
}

function GetKhuVucCha(ID_KhuVuc) {
    var data = []
    $.each(dataKhuVuc, function (index, item) {
        if (ID_KhuVuc != item.ID) {
            data.push(item)
        }
    })
    if ($("#KhuVuc").data("kendoComboBox") == undefined) {
        $("#KhuVuc").kendoComboBox({
            dataTextField: "TenKhuVuc",
            dataValueField: "ID",
            filter: "contains",
            suggest: true,
            delay: 1000,
            dataSource: data
        })
    } else {
        $("#KhuVuc").data("kendoComboBox").setDataSource(data);
    }
}

function Luu() {
    var validten = SetValidate("TenKhuVuc");
    var validma = SetValidate("MaKhuVuc");
    var validtrangthai = SetValidate("TrangThai");

    if (validten && validma && validtrangthai) {
        $.ajax({
            url: '/DanhMucKhuVuc/CreateOrUpdate',
            type: 'POST',
            data: {
                ID: $("#ID").val(),
                TenKhuVuc: $("#TenKhuVuc").val(),
                MaKhuVuc: $("#MaKhuVuc").val(),
                ID_Cha: $("#KhuVuc").data("kendoComboBox").value(),
                Mota: $("#MoTa").val(),
                TrangThai: $("#TrangThai").data("kendoComboBox").value()

            }
        }).done(function successCallback(response) {

            if (response.status) {
                notification.show({ kValue: response.msg }, "success");
                Huy();
                $("#grid").data("kendoTreeList").clearSelection();
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
    var bangDuLieu = $("#grid").data("kendoTreeList");
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
        url: '/DanhMucKhuVuc/Delete?ID=' + ids.join(','),
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
        fileName: "Danh_Muc_Phong.xlsx",
        filterable: true,
        allPages: true
    }
    grid.saveAsExcel();
}
