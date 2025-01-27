var path = "";
$(document).ready(function () {
    //$("#window").kendoWindow({
    //    width: "800px",
    //    height: "500px",
    //    title: "Chi tiết",
    //    visible: false,
    //    modal: true,
    //    resizable: false,
    //    actions: [
    //        "Close"
    //    ],
    //    close: function (e) {
    //        $("#grid").data("kendoGrid").clearSelection();
    //    }
    //});

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
        save: function (e) {
            if (e.values.ID > 0) {
                Luu(e.values.ID, e.values.Ten)
            } else {
                Luu('', e.values.Ten)

            }
            
            e.sender.refresh();
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
                    row.cells[cellIndex].borderT
                    op = { color: "#000", size: 1 };
                    row.cells[cellIndex].borderRight = { color: "#000", size: 1 };
                    row.cells[cellIndex].borderleft = { color: "#000", size: 1 };
                }
            }
        },
        dataSource: new kendo.data.DataSource({
            data: [],
            schema: {
                model: {
                    id: "ID",
                    fields: {
                        SoTien: { type: "number" },
                    }
                },

            },
            aggregate: [
                { field: "SoTien", aggregate: "sum" },
            ],
        }),
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
                field: "Ten",
                title: "Tên",
                width: "250px",
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
        Sua();
    })

    LoadGridData();



    $("#dialogRoot").kendoDialog().data("kendoDialog").close();

})

function LoadGridData() {
    $.ajax({
        url: '/DanhMucDonViTinh/GetAll',
        type: 'GET',
    }).done(function successCallback(response) {
        kendo.ui.progress($("#grid"), true);
        var dataSource = new kendo.data.DataSource({
            data: response,
            schema: {
                model: {
                    id: "ID",
                    field: {
                        ID: { type: 'number', editable: false },
                        Ten: { type: 'text', editable: true },
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
    var grid = $("#grid").data("kendoGrid");
    grid.addRow();
}
function Luu(id, ten) {
    $.ajax({
        url: '/DanhMucDonViTinh/CreateOrUpdate',
        type: 'POST',
        data: {
            ID: id,
            Ten: ten,

        }
    }).done(function successCallback(response) {

        if (response.status) {
            notification.show({ kValue: response.msg }, "success");
            $("#grid").data("kendoGrid").clearSelection();

            LoadGridData()
        } else {
            notification.show({ kValue: response.msg }, "error");
        }
    });
}
function Sua() {
 
}
function Xoa() {
    var bangDuLieu = $("#grid").data("kendoGrid");
    if (bangDuLieu.select().length > 0) {
        openConfirm(dialogRoot, "<b style='line-height:40px;'>Bạn có chắc chắn muốn xóa " + bangDuLieu.select().length + " phiếu chi?</b>", function () { XoaDuLieu(bangDuLieu); }, function () { });
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
        url: '/DonViTinh/Delete?ID=' + ids.join(','),
        type: 'POST'
    }).done(function (response) {
        if (response.status) {
            LoadGridData()
            notification.show({ kValue: response.msg }, "success");
        } else {
            notification.show({ kValue: response.msg }, "error");
        }
    })
}
function XuatExcel() {
    var grid = $('#grid').data('kendoGrid');

    grid.options.excel = {
        fileName: "DanhMucDonviTinh.xlsx",
        filterable: true,
        allPages: true
    }
    grid.saveAsExcel();
}
