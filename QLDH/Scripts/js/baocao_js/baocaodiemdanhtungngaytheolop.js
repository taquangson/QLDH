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
                    field: {
                        NgayHoc: { type: "date" },
                        SiSo: { type: "number" },
                        SiSoTong: { type: "number" },
                    },
                }
            },
            group: {
                field: "NgayHoc", aggregates: [
                    { field: "TenLop", aggregate: "count" },
                    { field: "SiSo", aggregate: "sum" },
                    { field: "SiSoTong", aggregate: "sum" },
                ]
            },
            aggregate: [
                { field: "SiSo", aggregate: "sum" },
                { field: "SiSoTong", aggregate: "sum" }
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
            sheet.title = "Báo cáo điểm danh theo lớp"
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
        detailTemplate: kendo.template($("#template").html()),
        detailInit: detailInit,
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
                title: "Ngày Học",
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
                    return "Ngày: <b style='color:#111'>" + kendo.toString(dataItem.NgayHoc, "dd/MM/yyyy") + "</b>";
                }
            },
            {
                title: "Tên Lớp",
                field: "TenLop",
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
                attributes: {
                    style: "text-align: center;",
                },
                aggregates: ["sum"],
                groupHeaderColumnTemplate: function (e) {
                    console.log(e.SiSo);
                    console.log(e.SiSoTong);
                    return '<p style="width:100%;text-align:center;font-weight:700;">' + kendo.toString(e.aggregates.SiSo.sum, "n0") + "/" + kendo.toString(e.aggregates.SiSoTong.sum, "n0") + '</p>';
                },
                template: function (e) {
                    return e.SiSo + '/' + e.SiSoTong;
                },
                
                groupHeaderTemplate: "Sum: #= sum #",
            }
        ]

    });
})

function detailInit(e) {
    var ID_Lop = e.data.ID_Lop;
    var date = kendo.toString(e.data.NgayHoc, "yyyy/MM/dd") + " 00:00:00";
    $.ajax({
        url: '/BaoCao/GetBaoCaoDiemDanhTheoNgayVaLop?ID_Lop=' + ID_Lop
            + "&date=" + date,
        type: 'GET',
    }).done(function successCallback(response) {
        var detailRow = e.detailRow;
        detailRow.find(".DetailTheoLop").kendoGrid({
            dataSource: response,
            schema: {
                model: {
                    fields: {
                        //NgayHoc: { type: "date" },
                        TenLop: { type: "string" },
                        CoMat: { type: "number" },
                        CoDiemDanh: { type: "number" },
                        NguoiDiemDanh: { type: "string" },
                    },

                }
            },
            scrollable: false,
            sortable: true,
            pageable: false,
            columns: [
                //{
                //    title: "Ngày",
                //    field: "NgayHoc",
                //    width: "150px",
                //    headerAttributes: {
                //        style: "text-align: center; font-size: 12px; font-weight:bold",
                //        class: "table-header-cell"
                //    },
                //    format: "{0:dd/MM/yyyy}",
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
                //},
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
                        if (e.CoPhep == -2) {
                            return "<span style='color:black'>Không có dữ liệu điểm danh</span>";
                        }


                    },
                    attributes: {
                        style: "text-align: center;",
                    },
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
            ]
        });
    });
}

function TimKiem() {
    $.ajax({
        url: '/BaoCao/GetBaoCaoDiemDanhTheoLop?from=' + kendo.toString($("#TuNgay").data("kendoDatePicker").value(), "yyyy/MM/dd") + " 00:00:00"
            + "&to=" + kendo.toString($("#DenNgay").data("kendoDatePicker").value(), "yyyy/MM/dd") + " 23:59:59",
        type: 'GET',
    }).done(function successCallback(response) {
        var dataSource = new kendo.data.DataSource({
            data: response,
            schema: {
                model: {
                    fields: {
                        NgayHoc: { type: "date" },
                        SiSo: { type: "number" },
                        SiSoTong: { type: "number" },
                    },                    
                }
            },
            group: {
                field: "NgayHoc", aggregates: [
                    { field: "TenLop", aggregate: "count" },
                    { field: "SiSo", aggregate: "sum" },
                    { field: "SiSoTong", aggregate: "sum" },
                ]
            },
            aggregate: [
                { field: "SiSo", aggregate: "sum" },
                { field: "SiSoTong", aggregate: "sum" }
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