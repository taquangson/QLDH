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
    $("#gridData").kendoGrid({
        dataSource: new kendo.data.DataSource({
            data: [],
            pageSize: 50,
            schema: {
                model: {
                    fields: {
                        TongChi: { type: "number" }
                    }
                }
            },
            aggregate: [
                { field: "TongChi", aggregate: "sum" }
            ]
        }),
        height: function () {
            var height = $(window).height() - 280;
            if (isMobile.any()) {
                height = height - 50;
            }
            return height;
        },
        excel: {
            filterable: true
        },
        excelExport: function (e) {
            var columns = e.workbook.sheets[0].columns;
            var sheet = e.workbook.sheets[0];
            sheet.title = "Báo cáo chi tiêu"
                + "từ" + kendo.toString($("#TuNgay").data("kendoDatePicker").value(), "dd/MM/yyyy") + " đến " + kendo.toString($("#DenNgay").data("kendoDatePicker").value(), "dd/MM/yyyy");
            for (var rowIndex = 1; rowIndex < sheet.rows.length; rowIndex++) {
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
                    if (cellIndex == 1 || cellIndex == 2) {
                        try {
                            var value = row.cells[cellIndex].value;
                            var date = new Date(parseInt(value.replace("/Date(", "").replace(")/", ""), 10))
                            row.cells[cellIndex].value = kendo.toString(date, "dd/MM/yyyy HH:mm");;
                        } catch (ex) {

                        }
                    }

                }
            }
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
                width: "30px",
                attributes: {
                    class: "text-center"
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
                title: "Nhóm Chi",
                field: "TenNhomChi",
                width: "150px",
                headerAttributes: {
                    style: "text-align: center; font-size: 12px; font-weight:bold",
                    class: "table-header-cell"
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
                attributes: {
                    style: "text-align: center;",
                }
            },
            {
                title: "Tổng tiền",
                field: "TongChi",
                format: "{0:n0}",
                width: "150px",
                aggregates: ["sum"],
                footerTemplate: "Tổng: #=kendo.toString(sum,'n0')#",
                headerAttributes: {
                    style: "text-align: center; font-size: 12px; font-weight:bold",
                    class: "table-header-cell"
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
                attributes: {
                    style: "text-align: center;",
                }
            },
        ]

    });
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
})

function TimKiem() {
    $.ajax({
        url: '/BaoCaoChi/GetData_BaoCaoChiTheoNhomChi_Date?TuNgay=' + kendo.toString($("#TuNgay").data("kendoDatePicker").value(), "yyyy/MM/dd") + " 00:00:00"
            + "&DenNgay=" + kendo.toString($("#DenNgay").data("kendoDatePicker").value(), "yyyy/MM/dd") + " 23:59:59",
        type: 'GET',
    }).done(function successCallback(response) {
        var dataSource = new kendo.data.DataSource({
            data: response,
            pageSize: 50,
            schema: {
                model: {
                    fields: {
                        TongChi: { type: "number" }
                    }
                }
            },
            aggregate: [
                { field: "TongChi", aggregate: "sum" }
            ]
        });
        convertDataChart(response)

        $("#gridData").data("kendoGrid").setDataSource(dataSource);
    });
}
function TimKiemThang(TuThang, DenThang, callback) {
    $.ajax({
        url: '/BaoCaoChi/GetData_BaoCaoChiTheoNhomChi_Month?TuThang=' + TuThang + "&DenThang=" + DenThang + "&Nam=" + kendo.toString($("#Nam").data("kendoDatePicker").value(), "yyyy"),
        type: 'GET',
    }).done(function successCallback(response) {
        callback(response)
    });
}

function TimKiemNam() {
    var dataQuy1 = [];
    var dataQuy2 = [];
    var dataQuy3 = [];
    var dataQuy4 = [];

    TimKiemThang(1, 3, function (data1) {
        dataQuy1 = data1
        TimKiemThang(4, 6, function (data2) {
            dataQuy2 = data2
            TimKiemThang(7, 9, function (data3) {
                dataQuy3 = data3
                TimKiemThang(10, 12, function (data4) {
                    dataQuy4 = data4
                    console.log("dataQ4:", dataQuy4)
                    convertDataBarChart(dataQuy1, dataQuy2, dataQuy3, dataQuy4)


                })
            })
        }) 

    })
    
    
    

}

function XuatExcel() {
    var grid = $('#gridData').data('kendoGrid');

    grid.options.excel = {
        fileName: "BaoCaoChiTieu.xlsx",
        filterable: true,
        allPages: true
    }
    grid.saveAsExcel();
}

function convertDataChart(data) {
    var dataChart = [];
    var tongChiPhi = 0;
    var dataColor = ["#0048BA", "#B0BF1A", "#7CB9E8", "#DB2D43", "#C46210", "#EED9C4", "#9F2B68", "#F19CBB", "#AB274F", "#3B7A57", "#FFBF00", "#9966CC", "#3DDC84", "#C88A65", "#665D1E", "#915C83"]
    $.each(data, function (index, item) {
        tongChiPhi = tongChiPhi + item.TongChi
    })
    var i = 0;
    $.each(data, function (index, item) {
        if (i < dataColor.length) {
            i = i + 1
        }

        dataChart.push({
            source: item.TenNhomChi,
            percentage: item.TongChi / tongChiPhi * 100,
        })
    })
    createChart(dataChart)
}

function convertDataBarChart(quy1, quy2, quy3, quy4) {
    var dataColor = ["#0048BA", "#B0BF1A", "#7CB9E8", "#DB2D43", "#C46210", "#EED9C4", "#9F2B68", "#F19CBB", "#AB274F", "#3B7A57", "#FFBF00", "#9966CC", "#3DDC84", "#C88A65", "#665D1E", "#915C83"]
    var dataChart = [];
    var dataNam = [];
    dataNam = dataNam.concat(quy1)
    dataNam = dataNam.concat(quy2)
    dataNam = dataNam.concat(quy3)
    dataNam = dataNam.concat(quy4)
    console.log("dataNam:", dataNam)
    var dataNhomChi = [];
    var tongChiPhi = 0
    $.each(quy1, function (index, item) {
        dataNhomChi.push({
            id: item.ID_NhomChi,
            name: item.TenNhomChi
        })
    })
    $.each(dataNam, function (index, item) {
        tongChiPhi = tongChiPhi + item.TongChi
    })
    for (let i = 0; i < dataNhomChi.length; i++) {
        var dataChi = [];
        $.each(dataNam, function (index, item) {

            if (dataNhomChi[i].id == item.ID_NhomChi) {
                dataChi.push(item.TongChi)
            }
        })
        dataChart.push({
            name: dataNhomChi[i].name,
            data: dataChi,
            color: dataColor[i],
        })
    }
    console.log("dataChart:", dataChart)
    createBarChart(dataChart, tongChiPhi)

}

function createChart(dataChart) {
    $("#pieChart").kendoChart({
        title: {
            position: "bottom",
            text: "Biểu đồ chi tiêu theo nhóm  chi"
        },
        legend: {
            position: "right"
        },
        dataSource: {
            data: dataChart
        },
        chartArea: {
            height: $(window).height() - 300
        },
        series: [{
            type: "pie",
            field: "percentage",
            categoryField: "source",
            explodeField: "explode"
        }],
        seriesColors: ["#0048BA", "#B0BF1A", "#7CB9E8", "#DB2D43", "#C46210", "#EED9C4", "#9F2B68", "#F19CBB", "#AB274F", "#3B7A57", "#FFBF00", "#9966CC", "#3DDC84", "#C88A65", "#665D1E", "#915C83"],
        tooltip: {
            visible: true,
            template: "#= category # - #= kendo.format('{0:P}', percentage) #"
        }
    });
}

function createBarChart(dataChart, tongChiPhi) {
    $("#barChartStack").kendoChart({
        title: {
            text: "Biểu đồ chi tiêu theo nhóm  chi trong năm"
        },
        legend: {
            visible: false
        },
        seriesDefaults: {
            type: "bar",
            stack: true
        },
        series: dataChart,
        valueAxis: {
            line: {
                visible: false
            },
            minorGridLines: {
                visible: true
            }
        },

        categoryAxis: {
            categories: ["Quý 1", "Quý 2", "Quý 3", "Quý 4"],
            majorGridLines: {
                visible: false
            }
        },
        tooltip: {
            visible: true,
            template: "#= series.name #: #= value #"
        }
    });
}