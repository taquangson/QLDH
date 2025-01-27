$(document).ready(function () {
    $("#rootContainer").show();

    $("#gridData").kendoGrid({
        dataSource: new kendo.data.DataSource({
            data: [],
            pageSize: 50,
            schema: {
                model: {
                    fields: {
                        NgayDangKy: { type: "date" }
                    }
                }
            }
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
                title: "Tài khoản",
                field: "User_DangKy",
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
            },
            {
                title: "Tên học sinh",
                field: "TenHocSinh",
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
            },
            {
                title: "Ngày đăng ký",
                field: "NgayDangKy",
                width: "100px",
                format: "{0:dd/MM/yyyy}",
                //template: function (e) {
                //    var date = new Date(parseInt(e.NgayTao.replace("/Date(", "").replace(")/", ""), 10))
                //    return kendo.toString(date, "dd/MM/yyyy HH:mm");
                //},
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
                title: "Tên lớp",
                field: "TenLop",
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
            },
            {
                title: "Trạng thái",
                field: "ID",
                width: "180px",
                template: function (e) {
                    if (e.TrangThai == 2) {
                        return "Đã xử lý <button class='k-button k-success text-center' onclick='updateTrangThai(" + e.ID + ")'><i class='fa fa-pencil'></i> Cập nhật chưa xử lý</button>";
                    } else if (e.TrangThai == 1) {
                        return "Chưa xử lý <button class='k-button k-success text-center' onclick='updateTrangThai(" + e.ID + ")'><i class='fa fa-pencil'></i> Cập nhật đã xử lý</button>";
                    }
                },
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
    //$("#DenNgay").kendoDatePicker({
    //    format: "dd/MM/yyyy",
    //    value: new Date()
    //})
    //$("#TuNgay").kendoDatePicker({
    //    format: "dd/MM/yyyy",
    //    value: new Date(new Date().getFullYear() + "/" + (new Date().getMonth() + 1) + "/01")
    //})
    TimKiem();  
})


function TimKiem() {
    $.ajax({
        url: '/DangKy/GetDSDangKyHoc',
        type: 'GET',
    }).done(function successCallback(response) {
        var dataSource = new kendo.data.DataSource({
            data: response,
            pageSize: 50,
            schema: {
                model: {
                    fields: {
                        NgayDangKy: { type: "date" }
                    }
                }
            }
        });

        $("#gridData").data("kendoGrid").setDataSource(dataSource);
    });
}

function updateTrangThai(ID) {
    $.ajax({
        url: '/DangKy/UpdateTrangThai_DangKyHoc?ID=' + ID,
        type: 'GET',
    }).done(function successCallback(response) {
        TimKiem();
    });
}