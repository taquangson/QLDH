$(document).ready(function () {
    $("#rootContainer").show();
    $("#comboKhoi").kendoComboBox({
        dataTextField: 'text',
        dataValueField: 'value',
        clearButton: false,
        dataSource: new kendo.data.DataSource({
            data: [
                { text: 'Tất cả', value: 0 },
                { text: '1', value: 1 },
                { text: '2', value: 2 },
                { text: '3', value: 3 },
                { text: '4', value: 4 },
                { text: '5', value: 5 },
                { text: '6', value: 6 },
                { text: '7', value: 7 },
                { text: '8', value: 8 },
                { text: '9', value: 9 },
                { text: '10', value: 10 },
                { text: '11', value: 11 },
                { text: '12', value: 12 },
            ]
        }),
        change: function (e) {
            LoadComboLop(e.sender.value());
            $("#comboLop").data("kendoComboBox").value('');
        }
    });

    $("#comboCa").kendoComboBox({
        dataTextField: 'text',
        dataValueField: 'value',
        clearButton: false,
        dataSource: new kendo.data.DataSource({
            data: [
                { text: 'Ca 1 (7h-9h sáng)', value: 1 },
                { text: 'Ca 2 (9h-11h sáng)', value: 2 },
                { text: 'Ca 3 (2h-4h chiều)', value: 3 },
                { text: 'Ca 4 (4h-7h chiều)', value: 4 },
                { text: 'Ca 5 (7h-9h tối)', value: 5 },
            ]
        }),
        change: function (e) {
            LoadHocSinhTrongLop($("#comboKhoi").data("kendoComboBox").value());
        }
    });
    $("#comboCa").data("kendoComboBox").value(1);

    $("#comboKhoi").data("kendoComboBox").value(0);
    LoadComboLop(0);

    $("#windowSoDo").kendoWindow({
        title: "Sơ đồ chỗ ngồi học sinh trong lớp",
        modal: true,
        visible: false
    })

    $("#gridDiemDanh").kendoGrid({
        height: function () {
            var height = $(window).height() - 200;
            if (isMobile.any()) {
                height = height - 50;
            }
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
                title: "<span title='Có mặt'>C</span>",
                width: "50px",
                headerAttributes: {
                    style: "text-align: center; font-size: 12px; font-weight:bold",
                    class: "table-header-cell"
                },
                attributes: {
                    style: "text-align: center;",
                },
                template: function (e) {
                    if (e.QuaGioDiemDanh == 1) {
                        return '';
                    }
                    else {
                        if (e.ID_DiemDanh > 0 && e.CoPhep == 0) {
                            return '<input type="checkbox" id="comat' + e.ID + '" onchange="DiemDanh(' + e.ID + ',' + e.IsHocDuoi + ')" checked="checked" class="k-checkbox">'
                                + '<label class="k-checkbox-label" for="comat' + e.ID + '"></label>';
                        } else {
                            return '<input type="checkbox" id="comat' + e.ID + '" onchange="DiemDanh(' + e.ID + ',' + e.IsHocDuoi + ')" class="k-checkbox">'
                                + '<label class="k-checkbox-label" for="comat' + e.ID + '"></label>';
                        }
                    }
                }
            },
            {
                title: "<span title='Vắng mặt'>V</span>",
                width: "50px",
                headerAttributes: {
                    style: "text-align: center; font-size: 12px; font-weight:bold",
                    class: "table-header-cell"
                },
                attributes: {
                    style: "text-align: center;",
                },
                template: function (e) {
                    if (e.QuaGioDiemDanh == 1) {
                        return '';
                    }
                    else {
                        if (e.ID_DiemDanh > 0 && e.CoPhep == -1) {
                            return '<input type="checkbox" id="vangmat' + e.ID + '" onchange="VangMat(' + e.ID + ',' + e.IsHocDuoi + ')" checked="checked" class="k-checkbox">'
                                + '<label class="k-checkbox-label" for="vangmat' + e.ID + '"></label>';
                        } else {
                            return '<input type="checkbox" id="vangmat' + e.ID + '" onchange="VangMat(' + e.ID + ',' + e.IsHocDuoi + ')" class="k-checkbox">'
                                + '<label class="k-checkbox-label" for="vangmat' + e.ID + '"></label>';
                        }
                    }
                }
            },
            {
                title: "<span title='Nghỉ có phép'>P</span>",
                width: "50px",
                headerAttributes: {
                    style: "text-align: center; font-size: 12px; font-weight:bold",
                    class: "table-header-cell"
                },
                attributes: {
                    style: "text-align: center;",
                },
                template: function (e) {
                    if (e.QuaGioDiemDanh == 1) {
                        return '';
                    }
                    else {
                        if (e.ID_DiemDanh > 0 && e.CoPhep == 1) {
                            return '<input type="checkbox" id="cophep' + e.ID + '"  onchange="CoPhep(' + e.ID + ',' + e.IsHocDuoi + ')" checked="checked" class="k-checkbox">'
                                + '<label class="k-checkbox-label" for="cophep' + e.ID + '"></label>';
                        } else {
                            return '<input type="checkbox" id="cophep' + e.ID + '"  onchange="CoPhep(' + e.ID + ',' + e.IsHocDuoi + ')" class="k-checkbox">'
                                + '<label class="k-checkbox-label" for="cophep' + e.ID + '"></label>';
                        }
                    }
                }
            },
            {
                field: "TenHocSinh",
                title: "Tên học sinh",
                width: "150px",
                template: function (e) {
                    if (e.IsHocDuoi) {
                        return "<span>" + e.TenHocSinh + " <i title='Học sinh học bồi dưỡng hoặc học đuổi' class='fa fa-exclamation-circle'/></span>";
                    } else {
                        return "<span>" + e.TenHocSinh + "</span>";
                    }
                },
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
                field: "NgaySinh",
                title: "Ngày sinh",
                template: function (e) {
                    var dateString = e.NgaySinh.substr(6);
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
                field: "DienThoaiMacDinh",
                title: "Điện thoại",
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
})

function CheckKhoi(khoi) {
    if (khoi.TenLop.indexOf(khoi) > 0) {
        return true;
    }
}

function LoadComboLop(khoi) {
    $.ajax({
        url: '/Lop/GetAll',
        type: 'GET',
    }).done(function successCallback(response) {
        var ds = [];
        if (khoi > 0) {
            ds = response.filter(x => parseInt(x.TenLop.substring(0, 2)) == parseInt(khoi));
        } else {
            ds = response;
        }
        var dataSource = new kendo.data.DataSource({
            data: ds
        });
        $("#comboLop").kendoComboBox({
            dataTextField: 'TenLop',
            dataValueField: 'ID',
            clearButton: false,
            dataSource: dataSource,
            change: function (e) {
                LoadHocSinhTrongLop(e.sender.value());
            }
        })
    });
}

function LoadHocSinhTrongLop(id) {
    if (id > 0) {
        $.ajax({
            url: '/DiemDanh/GetDSHocSinh_DiemDanh?ID_Lop=' + id + "&Ca=" + $("#comboCa").data("kendoComboBox").value(),
            type: 'GET',
        }).done(function successCallback(response) {
            kendo.ui.progress($("#gridDiemDanh"), true);
            var dataSource = new kendo.data.DataSource({
                data: response,
                schema: {
                    model: {
                        id: "ID",
                        field: {
                            NgaySinh: {
                                type: 'date'
                            }
                        }
                    }
                },
                pageSize: 100,
            });
            $("#gridDiemDanh").data("kendoGrid").setDataSource(dataSource);
            kendo.ui.progress($("#gridDiemDanh"), false);
        });
    }
}

function DiemDanh(ID_HocSinh, HocDuoi) {

    $.ajax({
        url: '/DiemDanh/DiemDanhHocSinh',
        type: 'POST',
        data: {
            ID: 0,
            ID_Lop: $("#comboLop").data("kendoComboBox").value(),
            ID_HocSinh: ID_HocSinh,
            CoPhep: 0,
            GhiChu: '',
            HocDuoi: HocDuoi ? 1 : 0,
            Ca: $("#comboCa").data("kendoComboBox").value()
        }
    }).done(function successCallback(response) {
        $("#cophep" + ID_HocSinh).removeAttr("checked");
        $("#vangmat" + ID_HocSinh).removeAttr("checked");
    })
}
function CoPhep(ID_HocSinh, HocDuoi) {
    $.ajax({
        url: '/DiemDanh/DiemDanhHocSinh',
        type: 'POST',
        data: {
            ID: 0,
            ID_Lop: $("#comboLop").data("kendoComboBox").value(),
            ID_HocSinh: ID_HocSinh,
            CoPhep: 1,
            GhiChu: '',
            HocDuoi: HocDuoi ? 1 : 0,
            Ca: $("#comboCa").data("kendoComboBox").value()
        }
    }).done(function successCallback(response) {
        if (($("#comat" + ID_HocSinh + ":checked")[0]) || ($("#vangmat" + ID_HocSinh + ":checked")[0])) {
            $("#comat" + ID_HocSinh).removeAttr("checked");
            $("#vangmat" + ID_HocSinh).removeAttr("checked");

        } else {
        }
    })

}
function VangMat(ID_HocSinh, HocDuoi) {
    $.ajax({
        url: '/DiemDanh/DiemDanhHocSinh',
        type: 'POST',
        data: {
            ID: 0,
            ID_Lop: $("#comboLop").data("kendoComboBox").value(),
            ID_HocSinh: ID_HocSinh,
            CoPhep: -1,
            GhiChu: '',
            HocDuoi: HocDuoi ? 1 : 0,
            Ca: $("#comboCa").data("kendoComboBox").value()
        }
    }).done(function successCallback(response) {
        $("#cophep" + ID_HocSinh).removeAttr("checked");
        $("#comat" + ID_HocSinh).removeAttr("checked");
    })

}
function XemSoDo() {
    $("#anhsodo").css("background-image", "");
    $.ajax({
        url: '/Lop/GetById?ID=' + $("#comboLop").data("kendoComboBox").value(),
        type: 'GET',

    }).done(function successCallback(response) {
        $("#anhsodo").css("background-image", "url(../Images/SoDoLop/" + response.SoDoLop + ")");
        $("#windowSoDo").data("kendoWindow").maximize().open();
    })
}