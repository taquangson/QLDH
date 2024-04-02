var dataNhomChi = [];
$(document).ready(function () {
    $("#window").kendoWindow({
        width: "680px",
        height: "570px",
        title: "Chi tiết",
        visible: false,
        modal: true,
        resizable: false,
        actions: [
            "Close"
        ],
        close: function (e) {
            $("#grid").data("kendoTreeList").clearSelection();
        }
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
        filterable: {
            mode: "row",
        },
        pageable: pageableShort,
        dataBinding: function () {
            record = (this.dataSource.page() - 1) * this.dataSource.pageSize();
        },
        excel: {
            filterable: true
        },
        excelExport: function (e) {
            var columns = e.workbook.sheets[0].columns;
            var sheet = e.workbook.sheets[0];
            sheet.title = "Danh sách nhóm chi";
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
                field: "ID",
                title: "ID",
                width: "10px",
                hidden: true,
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
                field: "TenNhomChi",
                title: "Tên nhóm chi",
                width: "300px",
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
                field: "MaNhomChi",
                title: "Mã nhóm chi",
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
                field: "TrangThai",
                title: "Trạng Thái",
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
                    class: "text-center"
                }
            },
            {
                field: "MoTa",
                title: "Mô Tả",
                width: "250",
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
            }
        ]

    });

    $("#grid").on("dblclick", "tr[role='row']", function () {
        $("#grid").data("kendoTreeList").clearSelection();
        var row = $("#grid").data("kendoTreeList").table.find("[data-uid=" + $(this).attr("data-uid") + "]");
        $("#grid").data("kendoTreeList").select(row);
        Sua();
    })

    LoadGridData();

    $("#dialogRoot").kendoDialog().data("kendoDialog").close();

})

function LoadGridData() {
    $.ajax({
        url: '/DanhMuc/GetAllNhomChi',
        type: 'GET',
    }).done(function successCallback(response) {
        var dataTree = []
        dataNhomChi = response;
        $.each(response, function (index, item) {
            if (item.ID_Cha == 0) {
                item.ID_Cha = null
            }
            dataTree.push(item)
        })


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
            pageSize: 50,
        });
        $("#grid").data("kendoTreeList").setDataSource(dataSource);
        kendo.ui.progress($("#grid"), false);
    });
}

function ThemMoi() {
    document.getElementById("formChiTiet").reset();
    $("#ID").val('0');
    GetNhomChiCha(0);
    if ($(window).width() > 800) {
        $("#window").data("kendoWindow").center().open();
    } else {
        $("#window").data("kendoWindow").center().maximize().open();
    }
}

function Sua() {

        if ($(window).width() > 800) {
            $("#window").data("kendoWindow").center().open();
        } else {
            $("#window").data("kendoWindow").center().maximize().open();
        }
        console.log(selectedItem);
        var selectedItem = $("#grid").data("kendoTreeList").dataItem($("#grid").data("kendoTreeList").select());

        $("#ID").val(selectedItem.ID);
        GetNhomChiCha(selectedItem.ID)
        $("#TenNhomChi").val(selectedItem.TenNhomChi);
        $("#MaNhomChi").val(selectedItem.MaNhomChi);
        $("#TrangThai").val(selectedItem.TrangThai);
        $("#MoTa").val(selectedItem.MoTa);
        $("#NhomChi").data("kendoComboBox").value(selectedItem.ID_Cha);
} 

function Xoa() {
    var bangDuLieu = $("#grid").data("kendoTreeList");
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
        url: '/DanhMuc/Delete?ID=' + ids.join(','),
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

function GetNhomChiCha(ID_Cha) {
    var data = []
    $.each(dataNhomChi, function (index, item) {
        if (ID_Cha != item.ID) {
            data.push(item)
        }
    })
    if ($("#NhomChi").data("kendoComboBox") == undefined) {
        $("#NhomChi").kendoComboBox({
            dataTextField: "TenNhomChi",
            dataValueField: "ID",
            filter: "contains",
            suggest: true,
            delay: 1000,
            dataSource: data
        })
    } else {
        $("#NhomChi").data("kendoComboBox").setDataSource(data);
    }
}

function XuatExcel() {
    var grid = $('#grid').data('kendoGrid');

    grid.options.excel = {
        fileName: "DanhMucMoTa.xlsx",
        filterable: true,
        allPages: true
    }
    grid.saveAsExcel();
}

function Luu() {
    var validten = SetValidate("TenNhomChi");
    if (validten) {

        var model = {
            ID: $("#ID").val(),
            ID_Cha: $("#NhomChi").data("kendoComboBox").value(),
            TenNhomChi: $("#TenNhomChi").val(),
            MaNhomChi: $("#MaNhomChi").val(),
            TrangThai: $("#TrangThai").val(),
            MoTa: $("#MoTa").val(),
        }
        console.log(model);
        $.ajax({
            url: '/DanhMuc/CreateOrUpdate',
            data: model,
            type: 'POST'
        }).done(function successCallback(response) {
            if (response.status) {
                notification.show({ kValue: response.msg }, "success");
                Huy();
                LoadGridData();
            } else {
                notification.show({ kValue: response.msg }, "error");
            }
        });
    }
}

function Huy() {
    document.getElementById("formChiTiet").reset();
    $("#ID").val('0');
    $("#window").data("kendoWindow").close();
}