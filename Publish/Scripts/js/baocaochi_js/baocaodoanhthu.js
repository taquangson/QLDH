$(document).ready(function () {
    $("#rootContainer").show();
    $("#tabstrip").kendoTabStrip({
        animation: {
            open: {
                effects: "fadeIn"
            }
        }
    });
    //$("#tabstrip").kendoTabStrip().data("kendoTabStrip").select("li:first")
    createTreeData();
    createTreeYearData();
    $("#DenNgay").kendoDatePicker({
        format: "dd/MM/yyyy",
        value: new Date()
    })
    $("#TuNgay").kendoDatePicker({
        format: "dd/MM/yyyy",
        value: new Date(new Date().getFullYear() + "/" + (new Date().getMonth() + 1) + "/01")
    })
    //var years = Array.from(Array(new Date().getFullYear() - 2000), (_, i) => (i + 2000).toString())
    //console.log(years)
    //$("#monthpicker").kendoDatePicker({
    //    depth: "year",
    //    start: "year",
    //    format: "MM/yyyy",
    //    value: new Date()
    //})
    $("#Nam").kendoDatePicker({
        depth: "decade",
        start: "decade",
        format: "yyyy",
        value: new Date()
    })
    $("#Nam2").kendoDatePicker({
        depth: "decade",
        start: "decade",
        format: "yyyy",
        value: new Date()
    })
})

function TimKiem() {
    GetTienChi(function (dataGrid, tongChiPhi, tongKhauHao) {
        GetTienThu(function (tienThu) {
            GetTienThanhToan(function (tienThanhToan) {
                dataGrid.push({
                    STT: "1",
                    SoTien: tienThu,
                    TenMuc: "Doanh thu bán hàng",
                    ID_Cha: null,
                    ID: 1,
                }, {
                    STT: "2",
                    SoTien: tienThu - tienThanhToan,
                    TenMuc: "Công nợ khách hàng",
                    ID_Cha: null,
                    ID: 2,
                }, {
                    STT: "3",
                    SoTien: tienThanhToan,
                    TenMuc: "Doanh thu thuần",
                    ID_Cha: null,
                    ID: 3,
                }, {
                    STT: "5",
                    SoTien: tienThanhToan - tongChiPhi,
                    TenMuc: "Lợi nhuận",
                    ID_Cha: null,
                    ID: 5,
                }, {
                    STT: "6",
                    SoTien: tongKhauHao,
                    TenMuc: "Khấu hao",
                    ID_Cha: null,
                    ID: 6,
                })
                var dataChart = []
                dataChart.push({
                    SoTien: tongChiPhi,
                    TenMuc: "Tổng chi phí",
                }, {
                    SoTien: tienThanhToan,
                    TenMuc: "Doanh thu thuần",

                })
                convertDataChart(dataChart)
                console.log(dataGrid)
                var dataSource = new kendo.data.TreeListDataSource({
                    data: dataGrid.sort(compare),
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
                });


                $("#gridData").data("kendoTreeList").setDataSource(dataSource);
            })
        })
    })
}
function compare(a, b) {
    if (a.STT < b.STT) {
        return -1;
    }
    if (a.STT > b.STT) {
        return 1;
    }
    return 0;
}
function createTreeData() {
    $("#gridData").kendoTreeList({
        height: function () {
            var height = $(window).height() - 300;
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
        columns: [
            {
                field: "STT",
                title: "STT",
                width: "50px",
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
                field: "TenMuc",
                title: "Tên",
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
                field: "SoTien",
                format: "{0:n0}",
                title: "Số tiền",
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

}
function createTreeYearData() {
    $("#gridDataNam").kendoTreeList({
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
            sheet.title = "Báo cáo doanh thu";
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
                field: "Ten",
                title: "Tên",
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
                field: "Thang1",
                format: "{0:n0}",
                title: "Tháng 1",
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
                field: "Thang2",
                format: "{0:n0}",
                title: "Tháng 2",
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
                field: "Thang3",
                format: "{0:n0}",
                title: "Tháng 3",
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
                field: "Thang4",
                format: "{0:n0}",
                title: "Tháng 4",
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
                field: "Thang5",
                format: "{0:n0}",
                title: "Tháng 5",
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
                field: "Thang6",
                format: "{0:n0}",
                title: "Tháng 6",
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
                field: "Thang7",
                format: "{0:n0}",
                title: "Tháng 7",
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
                field: "Thang8",
                format: "{0:n0}",
                title: "Tháng 8",
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
                field: "Thang9",
                format: "{0:n0}",
                title: "Tháng 9",
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
                field: "Thang10",
                format: "{0:n0}",
                title: "Tháng 10",
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
                field: "Thang11",
                format: "{0:n0}",
                title: "Tháng 11",
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
                field: "Thang12",
                format: "{0:n0}",
                title: "Tháng 12",
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
                field: "Nam",
                format: "{0:n0}",
                title: "Cả năm",
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

}

function GetTienChi(callback) {
    $.ajax({
        url: '/BaoCaoChi/GetData_BaoCaoChiTheoNhomChi_Date?TuNgay=' + kendo.toString($("#TuNgay").data("kendoDatePicker").value(), "yyyy/MM/dd") + " 00:00:00"
            + "&DenNgay=" + kendo.toString($("#DenNgay").data("kendoDatePicker").value(), "yyyy/MM/dd") + " 23:59:59",
        type: 'GET',
    }).done(function successCallback(response) {
        var dataChi = []
        var tongChiPhi = 0
        var tongKhauHao = 0
        var i = 0 
        $.each(response, function (index, item) {
            i++
            tongChiPhi = tongChiPhi + item.TongChi;
            tongKhauHao = tongKhauHao + item.TongKhauHao;
            dataChi.push({
                STT: "4." + i,
                SoTien: item.TongChi,
                TenMuc: item.TenNhomChi,
                ID_Cha: 4,
                ID: 10 + item.ID_NhomChi,
            })
        })
        dataChi.push({
            STT: "4",
            SoTien: tongChiPhi,
            TenMuc: "Tổng chi phí",
            ID_Cha: null,
            ID: 4,
        })
        callback(dataChi, tongChiPhi, tongKhauHao)
    });
}

function GetTienThu(callback) {
    $.ajax({
        url: '/BaoCaoChi/GetData_BaoCaoThu_Date?TuNgay=' + kendo.toString($("#TuNgay").data("kendoDatePicker").value(), "yyyy/MM/dd") + " 00:00:00"
            + "&DenNgay=" + kendo.toString($("#DenNgay").data("kendoDatePicker").value(), "yyyy/MM/dd") + " 23:59:59",
        type: 'GET',

    }).done(function successCallback(response) {
        if (response.status) {
            callback(response.data)

        } else {
            callback(0)
        }
    });
}

function GetTienThanhToan(callback) {
    $.ajax({
        url: '/BaoCaoChi/GetData_BaoCaoThanhToan_Date?TuNgay=' + kendo.toString($("#TuNgay").data("kendoDatePicker").value(), "yyyy/MM/dd") + " 00:00:00"
            + "&DenNgay=" + kendo.toString($("#DenNgay").data("kendoDatePicker").value(), "yyyy/MM/dd") + " 23:59:59",
        type: 'GET',

    }).done(function successCallback(response) {
        if (response.status) {
            callback(response.data)

        } else {
            callback(0)
        }
    });
}

function GetTienChi_Thang(TuThang, DenThang, callback) {
    $.ajax({
        url: '/BaoCaoChi/GetData_BaoCaoChiTheoNhomChi_Month?TuThang=' + TuThang + "&DenThang=" + DenThang + "&Nam=" + kendo.toString($("#Nam").data("kendoDatePicker").value(), "yyyy"),
        type: 'GET',
    }).done(function successCallback(response) {
        callback(response)
    });
}
function GetTienThu_Thang(TuThang, DenThang, callback) {
    $.ajax({
        url: '/BaoCaoChi/GetData_BaoCaoChiTheoNhomChi_Month?TuThang=' + TuThang + "&DenThang=" + DenThang + "&Nam=" + kendo.toString($("#Nam").data("kendoDatePicker").value(), "yyyy"),
        type: 'GET',
    }).done(function successCallback(response) {
        if (response.status) {
            callback(response.data)

        } else {
            callback(0)
        }
    });
}
function GetTienThanhToan_Thang(TuThang, DenThang, callback) {
    $.ajax({
        url: '/BaoCaoChi/GetData_BaoCaoChiTheoNhomChi_Month?TuThang=' + TuThang + "&DenThang=" + DenThang + "&Nam=" + kendo.toString($("#Nam").data("kendoDatePicker").value(), "yyyy"),
        type: 'GET',
    }).done(function successCallback(response) {
        if (response.status) {
            callback(response.data)

        } else {
            callback(0)
        }
    });
}

function TimKiemNam() {

    $.ajax({
        url: '/BaoCaoChi/GetData_BaoCaoDoanhThu_Year?Nam=' + kendo.toString($("#Nam").data("kendoDatePicker").value(), "yyyy"),
        type: 'GET',
    }).done(function successCallback(response) {
        console.log(response)
        var dataTree = []
        $.each(response, function (index, item) {
            if (item.ID_Cha == 0) {
                item.ID_Cha = null
            }
            dataTree.push(item)
        })
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


        $("#gridDataNam").data("kendoTreeList").setDataSource(dataSource);
    });



}
function TimKiemNam2() {

    $.ajax({
        url: '/BaoCaoChi/GetData_BieuDoDoanhThu_Year?Nam=' + kendo.toString($("#Nam2").data("kendoDatePicker").value(), "yyyy"),
        type: 'GET',
    }).done(function successCallback(response) {
        var dataThang = []
        $.each(response, function (index, item) {

            dataThang.push("Tháng " + item.Thang)
        })
        createBarChart(response, dataThang)
    });



}

function XuatExcel() {
    var grid = $('#gridData').data('kendoGrid');

    grid.options.excel = {
        fileName: "BaoCaoDoanhThu.xlsx",
        filterable: true,
        allPages: true
    }
    grid.saveAsExcel();
}

function convertDataChart(data) {
    var dataChart = [];
    var tongChiPhi = 0;
    $.each(data, function (index, item) {
        tongChiPhi = tongChiPhi + item.SoTien
    })
    var i = 0;
    $.each(data, function (index, item) {

        dataChart.push({
            source: item.TenMuc,
            percentage: item.SoTien / tongChiPhi * 100,
        })
    })
    createChart(dataChart)
}

//function convertDataBarChart(quy1, quy2, quy3, quy4) {
//    var dataColor = ["#0048BA", "#B0BF1A", "#7CB9E8", "#DB2D43", "#C46210", "#EED9C4", "#9F2B68", "#F19CBB", "#AB274F", "#3B7A57", "#FFBF00", "#9966CC", "#3DDC84", "#C88A65", "#665D1E", "#915C83"]
//    var dataChart = [];
//    var dataNam = [];
//    dataNam = dataNam.concat(quy1)
//    dataNam = dataNam.concat(quy2)
//    dataNam = dataNam.concat(quy3)
//    dataNam = dataNam.concat(quy4)
//    console.log("dataNam:", dataNam)
//    var dataNhomChi = [];
//    var tongChiPhi = 0
//    $.each(quy1, function (index, item) {
//        dataNhomChi.push({
//            id: item.ID_NhomChi,
//            name: item.TenNhomChi
//        })
//    })
//    $.each(dataNam, function (index, item) {
//        tongChiPhi = tongChiPhi + item.TongChi
//    })
//    for (let i = 0; i < dataNhomChi.length; i++) {
//        var dataChi = [];
//        $.each(dataNam, function (index, item) {

//            if (dataNhomChi[i].id == item.ID_NhomChi) {
//                dataChi.push(item.TongChi)
//            }
//        })
//        dataChart.push({
//            name: dataNhomChi[i].name,
//            data: dataChi,
//            color: dataColor[i],
//        })
//    }
//    console.log("dataChart:", dataChart)
//    createBarChart(dataChart, tongChiPhi)

//}

function createChart(dataChart) {
    $("#pieChart").kendoChart({
        title: {
            position: "bottom",
            text: "Biểu đồ kết quả kinh doanh"
        },
        legend: {
            position: "bottom"
        },
        dataSource: {
            data: dataChart
        },
        chartArea: {
            height: $(window).height() - 300
        },
        seriesDefaults: {
            labels: {
                template: "#= category #",
                position: "outsideEnd",
                visible: true,
                background: "transparent"
            }
        },
        series: [{
            type: "pie",
            field: "percentage",
            categoryField: "source",
            explodeField: "explode"
        }],
        seriesColors: ["#fc2403", "#28fc03"],
        tooltip: {
            visible: false,
            template: "#= category # - #= kendo.format('{0:P}', percentage) #"
        }
    });
}

function createBarChart(dataChart, dataThang) {

    $("#chartDataNam").kendoChart({
        dataSource: {
            data: dataChart
        },
        legend: {
            position: "bottom"
        },
        title: {
            text: "Biểu đồ kết quả kinh doanh cả năm"
        },
        seriesDefaults: {
            type: "line",
            style: "smooth",
        },
        series: [{
            field: "LoiNhuan",
            name: "Lợi nhuận",
            color: "#e3e336"
        },
            {
                field: "TienThu",
                name: "Doanh thu thuần",
                color: "#3096c9"
            },
            {
                field: "TienChi",
                name: "Tổng chi phí",
                color: "#c96030"
            }],
        valueAxis: {
            labels: {
                format: "{0:n0}"
            },
        },
        categoryAxis: {
            majorGridLines: {
                visible: false
            },
            line: {
                visible: false
            },
            //categories: ["Tháng 1", "Tháng 2", "Tháng 3", "Tháng 4", "Tháng 5", "Tháng 6", "Tháng 7", "Tháng 8", "Tháng 9", "Tháng 10", "Tháng 11", "Tháng 12"],

            categories: dataThang,

        },
        tooltip: {
            visible: true,
            shared: true,
            format: "N0"
        }
    });
}