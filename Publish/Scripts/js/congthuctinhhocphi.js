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
            $("#grid").data("kendoGrid").clearSelection();
        }
    });

    $("#DonVi").kendoComboBox({
        dataTextField: "text",
        dataValueField: "value",
        autoBind: false,
        dataSource: new kendo.data.DataSource({
            data: [
                { text: 'Buổi', value: 1 },
                { text: 'Tuần', value: 2 },
                { text: 'Tháng', value: 3 },
                { text: 'Năm', value: 4 },
            ]
        }),
    });
    $("#LichThanhToan").kendoComboBox({
        dataTextField: "text",
        dataValueField: "value",
        autoBind: false,
        dataSource: new kendo.data.DataSource({
            data: [
                //{ text: 'Ngày', value: 1 },
                //{ text: 'Tuần', value: 2 },
                { text: 'Tháng', value: 3 },
                { text: 'Năm', value: 4 },
            ]
        }),
    });
    $("#HocPhi").kendoNumericTextBox({
        culture: "vi-VN",
        min: 0
    });
    $("#Block").kendoNumericTextBox({
        culture: "vi-VN",
        min: 0
    });

    $("#grid").kendoGrid({
        height: function () {
            var height = $(window).height() - 180;
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
                field: "TenCongThuc",
                title: "Tên",
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
        url: '/DanhMuc/GetAllCongThucTinhHocPhi',
        type: 'GET',
    }).done(function successCallback(response) {

        kendo.ui.progress($("#grid"), true);
        var dataSource = new kendo.data.DataSource({
            data: response,
            schema: {
                model: {
                    id: "ID",
                    fields: {
                        ID: { field: "ID", type: "number" },
                        HocPhi: { field: "HocPhi", type: "number" }
                    }
                }
            },
            pageSize: 50,
        });
        $("#grid").data("kendoGrid").setDataSource(dataSource);
        kendo.ui.progress($("#grid"), false);
    });
}

function ThemMoi() {
    document.getElementById("formChiTiet").reset();
    $("#ID").val('0');
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
    var selectedItem = $("#grid").data("kendoGrid").dataItem($("#grid").data("kendoGrid").select());

    $("#ID").val(selectedItem.ID);
    $("#TenCongThuc").val(selectedItem.TenCongThuc);
    $("#MoTa").val(selectedItem.MoTa);
    $("#DonVi").data("kendoComboBox").value(selectedItem.DonVi);
    $("#LichThanhToan").data("kendoComboBox").value(selectedItem.LichThanhToan);
    $("#HocPhi").data("kendoNumericTextBox").value(selectedItem.HocPhi);
    $("#Block").data("kendoNumericTextBox").value(selectedItem.Block);
}

function Xoa() {
    var bangDuLieu = $("#grid").data("kendoTreeList");
    if (bangDuLieu.select().length > 0) {
        openConfirm(dialogRoot, "<b style='line-height:40px;'>Bạn có chắc chắn muốn xóa " + bangDuLieu.select().length + " công thức?</b>", function () { XoaDuLieu(bangDuLieu); }, function () { });
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
        url: '/DanhMuc/Delete_CongThucHocPhi?ID=' + ids.join(','),
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

function Luu() {
    var validten = SetValidate("TenCongThuc");
    var validblock = SetValidate("LichThanhToan");
    var validdonvi = SetValidate("Block");
    var validlichtt = SetValidate("DonVi");
    var validhocphi = SetValidate("HocPhi");
    if (validten && validblock && validdonvi && validlichtt && validhocphi) {
        var model = {
            ID: $("#ID").val(),
            TenCongThuc: $("#TenCongThuc").val(),
            DonVi: $("#DonVi").data("kendoComboBox").value(),
            LichThanhToan: $("#LichThanhToan").data("kendoComboBox").value(),
            HocPhi: $("#HocPhi").data("kendoNumericTextBox").value(),
            Block: $("#Block").data("kendoNumericTextBox").value(),
            MoTa: $("#MoTa").val(),
        }
        console.log(model);
        $.ajax({
            url: '/DanhMuc/CreateOrUpdate_CongThucHocPhi',
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