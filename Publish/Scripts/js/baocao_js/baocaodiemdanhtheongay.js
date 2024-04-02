$(document).ready(function () {
    $("#DenNgay").kendoDatePicker({
        format: "dd/MM/yyyy",
        value: new Date()
    })
    $("#TuNgay").kendoDatePicker({
        format: "dd/MM/yyyy",
        value: new Date(new Date().getFullYear() + "/" + (new Date().getMonth() + 1) + "/01")
    })

    $("#gridData").kendoGrid({
        dataSource: new kendo.data.DataSource({
            data: [],
            schema: {
                model: {
                    fields: {
                        NgayHoc: { type: "date" },
                        TenLop: { type: "string" },
                        MaHocSinh: { type: "string" },
                        TenHocSinh: { type: "string" },
                        CoMat: { type: "number" },
                        CoDiemDanh: { type: "number" },
                        NguoiDiemDanh: { type: "string" },
                        //NgayCapNhatDiemDanh: { type: "date" }
                    },

                }
            },
            group: {
                field: "NgayHoc", aggregates: [
                    { field: "TenLop", aggregate: "count" },
                    { field: "MaHocSinh", aggregate: "count" },
                    { field: "TenHocSinh", aggregate: "count" },
                    { field: "CoMat", aggregate: "sum" },
                    { field: "CoDiemDanh", aggregate: "sum" },
                    { field: "NguoiDiemDanh", aggregate: "count" },
                    //{ field: "NgayCapNhatDiemDanh", aggregate: "count" }
                ]
            },
            aggregate: [
                { field: "CoMat", aggregate: "sum" },
                { field: "CoDiemDanh", aggregate: "sum" }
            ]


        }),
        height: function () {
            var height = $(window).height() - 230;
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
            sheet.title = "Báo cáo điểm danh theo ngày"
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
        dataBound: function (e) {
            var grid = this;
            $(".k-grouping-row").each(function (e) {
                grid.collapseGroup(this);
            });
        },
        columns: [
            {
                title: "    ",
                field: "NgayHoc",
                width: "150px",
                headerAttributes: {
                    style: "text-align: center; font-size: 12px; font-weight:bold",
                    class: "table-header-cell"
                },
                format: "{0:dd/MM/yyyy}",
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
                },
                aggregates: ["count"],
                groupHeaderTemplate: function (e) {
                    dataItem = e.items[0];
                    //console.log(dataItem);
                    return " - Ngày: <b style='color:#111'>" + kendo.toString(dataItem.items[0].NgayHoc, "dd/MM/yyyy") + "</b>";
                }
                //groupHeaderTemplate: "Ngày: #= value # (Count: #= count#)" 
            },
            {
                title: "Mã Học Sinh",
                field: "MaHocSinh",
                width: "200px",
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
                },
            },
            {
                title: "Tên Học Sinh",
                field: "TenHocSinh",
                width: "200px",
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
                },
            },
            {
                title: "Tên Lớp",
                field: "TenLop",
                width: "200px",
                headerAttributes: {
                    style: "text-align: center; font-size: 12px; font-weight:bold",
                    class: "table-header-cell"
                },
                //groupHeaderColumnTemplate: function (e) {    
                //    dataItem = e.items[0];
                //    console.log(dataItem);
                //    if (e.TenLop) {
                //        return '<p style="width:100%;text-align:center;font-weight:700;"> Số lớp: ' + kendo.toString(e.TenLop.count, "n0") +'</p>'
                //    } else if (e.aggregates.TenLop) {
                //        return '<p style="width:100%;text-align:center;font-weight:700;">Số lớp: ' + kendo.toString(e.aggregates.TenLop.count, "n0") + '</p>'
                //    } else {
                //        return "";
                //    }
                //},
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
                },
            },
            {
                title: "Tổng Số Lượng Đi Học",
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
                template: function (e) {
                    if (e.CoPhep == 0) {
                        return "<span style='color:green'>Đi học</span>";
                    }
                    if (e.CoPhep == 1) {
                        return "<span style='color:blue'>Vắng có phép</span>";
                    }
                    if (e.CoPhep == -1) {
                        return "<span style='color:red'>Vắng không phép</span>";
                    }


                },
                groupHeaderColumnTemplate: function (e) {
                    if (e.CoMat && e.CoDiemDanh) {
                        return '<p style="width:100%;text-align:center;font-weight:700;">' + kendo.toString(e.CoMat.sum, "n0") + "/" + kendo.toString(e.CoDiemDanh.sum, "n0") + '</p>'
                    } else if (e.aggregates.CoMat && e.aggregates.CoDiemDanh) {
                        return '<p style="width:100%;text-align:center;font-weight:700;color:green;">' + kendo.toString(e.aggregates.CoMat.sum, "n0") + "/" + kendo.toString(e.aggregates.CoDiemDanh.sum, "n0") + '</p>'
                    } else {
                        return "";
                    }
                },
                attributes: {
                    style: "text-align: center;",
                },
                aggregates: ["sum"],
                groupHeaderTemplate: "Sum: #= sum #",
            },
            {
                title: "Người Điểm Danh",
                field: "NguoiDiemDanh",
                width: "180px",
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
            }
            //{
            //    title: "Ngày Cập Nhật Điểm Danh",
            //    field: "NgayCapNhatDiemDanh",
            //    format: "{0:dd/MM/yyyy HH:mm}",
            //    width: "150px",
            //    headerAttributes: {
            //        style: "text-align: center; font-size: 12px; font-weight:bold",
            //        class: "table-header-cell"
            //    },
            //    filterable: {
            //        cell: {
            //            operator: "contains",
            //            showOperators: false,
            //            template: function (e) {
            //                e.element.addClass("k-textbox").css("width", "100%")
            //            }
            //        }
            //    },
            //    attributes: {
            //        style: "text-align: center;",
            //    }
            //}
        ]

    });
})


function TimKiem() {
    $.ajax({
        url: '/BaoCao/GetBaoCaoDiemDanhTheoNgay?from=' + kendo.toString($("#TuNgay").data("kendoDatePicker").value(), "yyyy/MM/dd") + " 00:00:00"
            + "&to=" + kendo.toString($("#DenNgay").data("kendoDatePicker").value(), "yyyy/MM/dd") + " 23:59:59",
        type: 'GET',
    }).done(function successCallback(response) {
        var dataSource = new kendo.data.DataSource({
            data: response,
            schema: {
                model: {
                    fields: {
                        NgayHoc: { type: "date" },
                        TenLop: { type: "string" },
                        CoMat: { type: "number" },
                        CoDiemDanh: { type: "number" },
                        NguoiDiemDanh: { type: "string" },
                        //NgayCapNhatDiemDanh: { type: "date" }
                    },

                }
            },
            group: [
                {
                    field: "NgayHoc", aggregates: [
                        { field: "TenLop", aggregate: "count" },
                        { field: "CoMat", aggregate: "sum" },
                        { field: "CoDiemDanh", aggregate: "sum" },
                        { field: "NguoiDiemDanh", aggregate: "count" },
                        //{ field: "NgayCapNhatDiemDanh", aggregate: "count" }
                    ]
                },
                {
                    field: "TenLop", aggregates: [
                        { field: "CoMat", aggregate: "sum" },
                        { field: "CoDiemDanh", aggregate: "sum" },
                        { field: "NguoiDiemDanh", aggregate: "count" },
                        //{ field: "NgayCapNhatDiemDanh", aggregate: "count" }
                    ]
                },
            ],
            aggregate: [
                { field: "CoMat", aggregate: "sum" },
                { field: "CoDiemDanh", aggregate: "sum" }
            ]
        });

        $("#gridData").data("kendoGrid").setDataSource(dataSource);
    });
}

function XuatExcel() {
    var grid = $('#gridData').data('kendoGrid');

    grid.options.excel = {
        fileName: "BaoCaoDiemDanhTheoNgay.xlsx",
        filterable: true,
        allPages: true
    }
    grid.saveAsExcel();
}