var selectedChuongTrinh;
$(document).ready(function () {
    $("#rootContainer").show();
    $("#dialogRoot").kendoDialog().data("kendoDialog").close();
    $("#treeview").kendoTreeView({
        dataTextField: "TenChuongTrinh",
        dataValueField: "ID",
        select: function (e) {
            selectedChuongTrinh = $("#treeview").getKendoTreeView().dataItem(e.node)
            LoadGridBaiGiangTrongChuongTrinh();
        }
    });
    $("#tabstrip").kendoTabStrip({
        animation: {
            open: {
                effects: "fadeIn"
            }
        }
    });
    $("#gridBaiGiangTrongChuongTrinh").kendoGrid({
        height: function () {
            var height = $(window).height() - 195;
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
        columns: [
            {
                title: " ",
                field: 'ID',
                template: function (e) {
                    return "<i onclick='XoaBaiGiangKhoiNhom(\"" + e.uid + "\"," + e.ID + ")' style='color:red;width:100%;height:15px;cursor:pointer' class='fa fa-trash'></i>";
                },
                width: 30,
                attributes: {
                    class: "text-center"
                },
                headerAttributes: {
                    style: "text-align: center; font-size: 12px; ",
                    class: "table-header-cell"
                },
                filterable: {
                    cell: {
                        operator: "contains",
                        showOperators: false,
                        template: function (e) {
                            e.element.parent().html("<a class='k-button' title='Thêm nhân viên' style='width:100%; height:25px;' onclick='OpenGridBaiGiangNgoaiChuongTrinh()'><i class='fa fa-plus'></i></a>")
                        }
                    }
                },
            },
            {
                title: "STT",
                template: "#= ++record #",
                width: "50px",
                attributes: {
                    class: "text-center"
                },
                headerAttributes: {
                    style: "text-align: center; font-size: 12px; font-weight:bold",
                    class: "table-header-cell"
                }
            },
            {
                field: "TenBai",
                title: "Tên bài",
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
                }
            },
            {
                field: "CapDo",
                title: "Cấp độ",
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
                }
            }          
        ]

    });
    $("#gridBaiGiangNgoaiChuongTrinh").kendoGrid({
        height: 498,
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
                title: " ",
                field: 'ID',
                template: function (e) {
                    return "<i onclick='ThemBaiGiangVaoNhom(\"" + e.uid + "\"," + e.ID + ")' style='color:green;width:100%;height:15px;cursor:pointer' class='fa fa-plus'></i>";
                },
                width: 30,
                attributes: {
                    class: "text-center"
                },
                headerAttributes: {
                    style: "text-align: center; font-size: 12px; ",
                    class: "table-header-cell"
                },
                filterable: false
            },
            {
                title: "STT",
                template: "#= ++record #",
                width: "50px",
                attributes: {
                    class: "text-center"
                },
                headerAttributes: {
                    style: "text-align: center; font-size: 12px; font-weight:bold",
                    class: "table-header-cell"
                }
            },
            {
                field: "TenBai",
                title: "Tên bài",
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
                }
            },
            {
                field: "CapDo",
                title: "Cấp độ",
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
                }
            }            
        ]

    });
   
    $("#windowChonBaiGiang").kendoWindow({
        width: 700,
        height: 500,
        modal: true,
        resizable: false,
        visible: false,
        title: "Thêm bài giảng vào chuong trình"
    });
   
    $("#windowChuongTrinh").kendoWindow({
        width: 400,
        height: 250,
        modal: true,
        resizable: false,
        visible: false,
        title: "Thông tin chương trình"
    });
    $("#ChuongTrinhCha").kendoDropDownTree({
        placeholder: "Chọn chương trình...",
        dataTextField: "TenChuongTrinh",
        dataValueField: "ID",
        valuePrimitive: true,
        autoBind: true
    })
    loadTreeview();

})

function ThemChuongTrinh() {
    document.getElementById("formChuongTrinh").reset();
    $("#ID_ChuongTrinh").val(0);
    $("#windowChuongTrinh").data("kendoWindow").center().open();
}

function HuyChuongTrinh() {
    document.getElementById("formChuongTrinh").reset();
    $("#ID_ChuongTrinh").val(0);
    $("#windowChuongTrinh").data("kendoWindow").close();
}

function SuaChuongTrinh() {
    document.getElementById("formChuongTrinh").reset();
    $("#ID_ChuongTrinh").val(selectedChuongTrinh.ID);
    $("#TenChuongTrinh").val(selectedChuongTrinh.TenChuongTrinh);
    setTimeout(function () {
        $("#ChuongTrinhCha").data("kendoDropDownTree").value(selectedChuongTrinh.ID_Parent);
    })
    $("#windowChuongTrinh").data("kendoWindow").center().open();
}

function LuuChuongTrinh() {
    var validten = SetValidate("TenChuongTrinh");
    var validcha = SetValidate("ChuongTrinhCha");
    var valid = validten && validcha;
    if (valid) {
        $.ajax({
            url: '/ChuongTrinh/CreateOrUpdate',
            data: {
                ID: $("#ID_ChuongTrinh").val(),
                TenChuongTrinh: $("#TenChuongTrinh").val(),
                ID_Parent: $("#ChuongTrinhCha").data("kendoDropDownTree").value()
            },
            type: 'POST'
        }).done(function successCallback(response) {
            if (response.status) {
                notification.show({ kValue: response.msg }, "success");
                HuyChuongTrinh();
                loadTreeview();
            } else {
                notification.show({ kValue: response.msg }, "error");
            }
        });
    }

}

function loadTreeview() {
    $.ajax({
        url: '/ChuongTrinh/GetTreeChuongTrinh',
        type: 'GET'
    }).done(function (response) {
        var dataSource = new kendo.data.HierarchicalDataSource({
            data: response,
            schema: {
                model: {
                    children: "lstChild"
                }
            }
        })

        var dataSourceCombo = new kendo.data.HierarchicalDataSource({
            data: response,
            schema: {
                model: {
                    children: "lstChild"
                }
            }
        })

        $("#treeview").data("kendoTreeView").setDataSource(dataSource);

        $("#treeview").data("kendoTreeView").expand(".k-item");

        $("#ChuongTrinhCha").data("kendoDropDownTree").setDataSource(dataSourceCombo);

        //$("#treeview").data("kendoTreeView").select(".k-first");
    })
}

function OpenGridBaiGiangNgoaiChuongTrinh() {
    $("#windowChonBaiGiang").data("kendoWindow").center().open();
    $.ajax({
        url: '/ChuongTrinh/GetBaiGiangNgoaiChuongTrinh?ID_ChuongTrinh=' + selectedChuongTrinh.ID,
        type: 'GET',
    }).done(function successCallback(response) {
        kendo.ui.progress($("#gridBaiGiangNgoaiChuongTrinh"), true);
        var dataSource = new kendo.data.DataSource({
            data: response,
            schema: {
                model: {
                    id: "ID"
                }
            },
            pageSize: 20,
        });
        $("#gridBaiGiangNgoaiChuongTrinh").data("kendoGrid").setDataSource(dataSource);
        kendo.ui.progress($("#gridBaiGiangNgoaiChuongTrinh"), false);
    });
}


function LoadGridBaiGiangTrongChuongTrinh() {
    $.ajax({
        url: '/ChuongTrinh/GetBaiGiangTrongChuongTrinh?ID_ChuongTrinh=' + selectedChuongTrinh.ID,
        type: 'GET',
    }).done(function successCallback(response) {
        kendo.ui.progress($("#gridBaiGiangTrongChuongTrinh"), true);
        var dataSource = new kendo.data.DataSource({
            data: response,
            schema: {
                model: {
                    id: "ID"
                }
            },
            pageSize: 20,
        });
        $("#gridBaiGiangTrongChuongTrinh").data("kendoGrid").setDataSource(dataSource);
        kendo.ui.progress($("#gridBaiGiangTrongChuongTrinh"), false);
    });
}

function ThemBaiGiangVaoNhom(uid, idtaikhoan) {
    var dataRow = $('#gridBaiGiangNgoaiChuongTrinh').data("kendoGrid").dataSource.getByUid(uid);
    $.ajax({
        url: '/ChuongTrinh/ThemBaiGiangVaoChuongTrinh?ID_ChuongTrinh=' + selectedChuongTrinh.ID + "&ID_BaiGiang=" + idtaikhoan + "&STT=0",
        type: 'POST',
    }).done(function successCallback(response) {
        if (response.status) {
            notification.show({ kValue: response.msg }, "success");
            $('#gridBaiGiangNgoaiChuongTrinh').data("kendoGrid").dataSource.remove(dataRow);
            LoadGridBaiGiangTrongChuongTrinh();
        } else {
            notification.show({ kValue: response.msg }, "error");
        }
    })
}


function XoaBaiGiangKhoiNhom(uid, idtaikhoan) {
    var dataRow = $('#gridBaiGiangTrongChuongTrinh').data("kendoGrid").dataSource.getByUid(uid);
    $.ajax({
        url: '/ChuongTrinh/XoaBaiGiangKhoiChuongTrinh?ID_ChuongTrinh=' + selectedChuongTrinh.ID + "&ID_BaiGiang=" + idtaikhoan,
        type: 'POST',
    }).done(function successCallback(response) {
        if (response.status) {
            notification.show({ kValue: response.msg }, "success");
            $('#gridBaiGiangTrongChuongTrinh').data("kendoGrid").dataSource.remove(dataRow);
        } else {
            notification.show({ kValue: response.msg }, "error");
        }
    })
}