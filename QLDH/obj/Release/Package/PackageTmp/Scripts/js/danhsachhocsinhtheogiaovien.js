var lstHocSinhTrongLop = [];
$(document).ready(function () {

    $("#windowChitiet").kendoWindow({
        title: "Chi tiết danh sách học sinh thuộc lớp",
        visible: false,
        modal: true,
        resizable: false,
        actions: [
            "Close"
        ]
    });


    $("#windowBaiKiemTra").kendoWindow({
        title: "Các bài kiểm tra của học sinh",
        visible: false,
        modal: true,
        resizable: false,
        actions: [
            "Close"
        ]
    });

    $("#windowThemBKT").kendoWindow({
        title: "Thông tin bài kiểm tra",
        visible: false,

        width: 400,
        height: 120,
        modal: true,
        resizable: false,
        actions: [
            "Close"
        ]
    });

    $("#fileBKT").kendoUpload({
        multiple: false,
        localization: {
            select: 'Tải file ảnh bài kiểm tra',
            remove: '',
            cancel: ''
        },
        allowedExtensions: [".jpg", ".png", ".jpeg"],
        select: function (e) {
            PushFormDataFile(e.files[0], $("#ID_BaiKiemTra").val());
        }
    });

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
        filterable: {
            mode: "row",
        },
        pageable: pageableShort,
        dataBinding: function () {
            record = (this.dataSource.page() - 1) * this.dataSource.pageSize();
        },
        columns: [
            {
                width: "30px",
                selectable: true,
                headerAttributes: {
                    style: "text-align:left",
                    class: "table-header-cell-checkbox"
                }
            },
            {
                title: "STT",
                template: "#= ++record #",
                width: "60px",
                attributes: {
                    class: "text-center"
                },
                headerAttributes: {
                    style: "text-align: center; font-size: 12px; font-weight:bold",
                    class: "table-header-cell"
                }
            },
            {
                field: "TenLop",
                title: "Tên lớp",
                //width: "200px",
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
                 field: "NamHoc",
                 title: "Năm học",
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
                 title: "Chi tiết lớp",
                 width: "200px",
                 headerAttributes: {
                     style: "text-align: center; font-size: 12px; font-weight:bold",
                     class: "table-header-cell"
                 },
                 attributes: {
                     style: "text-align:center"
                 },
                 template: function (e) {
                     return "<button class='k-button k-success text-center' onclick='openChiTietLop(" + e.ID + ")'><i class='fa fa-pencil'/> Chi tiết</button>";
                 }
             }
        ]

    });
    $("#gridHocSinhTrongLop").kendoGrid({
        height: function () {
            var height = $(window).height() - 40;
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
                field: "TenHocSinh",
                title: "Tên học sinh",
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
                }
            },
             {
                 field: "DiaChi",
                 title: "Địa chỉ",
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
                 }
             },
            {
                field: "PhuHuynh",
                title: "Tên phụ huynh",
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
            {
                field: "TenTruong",
                title: "Tên trường học",
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
                    style: "text-align: center;",
                }
            },
            {
                title: "Bài kiểm tra",
                width: "200px",
                template: function (e) {
                    return "<button class='k-button k-success text-center' onclick='openBaiKiemTra(" + e.ID + ")'><i class='fa fa-pencil'/> Bài kiểm tra</button>";
                },
                headerAttributes: {
                    style: "text-align: center; font-size: 12px; font-weight:bold",
                    class: "table-header-cell"
                },
                attributes: {
                    style: "text-align: center;",
                }
            }
        ]

    });


    $("#grid").on("dblclick", "tr[role='row']", function () {
        $("#grid").data("kendoGrid").clearSelection();
        var row = $("#grid").data("kendoGrid").table.find("[data-uid=" + $(this).attr("data-uid") + "]");
        $("#grid").data("kendoGrid").select(row);
        openEditWindow();
    })
    LoadGridData();
    $("#dialogRoot").kendoDialog().data("kendoDialog").close();

})


function openChiTietLop(id) {
    $("#windowChitiet").data("kendoWindow").open().maximize();
    lstHocSinhTrongLop = [];
    LoadHocSinhTrongLop(id);
    $("#IDLop").val(id);
}



function LoadGridData() {
    $.ajax({
        url: '/Lop/GetByGiaoVien',
        type: 'GET',
    }).done(function successCallback(response) {
        kendo.ui.progress($("#grid"), true);
        var dataSource = new kendo.data.DataSource({
            data: response,
            schema: {
                model: {
                    id: "ID",
                    field: {
                        NgayTao: {
                            type: 'date'
                        }
                    }
                }
            },
            pageSize: 20,
        });
        $("#grid").data("kendoGrid").setDataSource(dataSource);
        kendo.ui.progress($("#grid"), false);
    });
}

function LoadHocSinhTrongLop(id) {
    $.ajax({
        url: '/HocSinh/GetByLop?ID_Lop=' + id,
        type: 'GET',
    }).done(function successCallback(response) {
        kendo.ui.progress($("#gridHocSinhTrongLop"), true);
        lstHocSinhTrongLop = response;
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
            pageSize: 20,
        });
        $("#gridHocSinhTrongLop").data("kendoGrid").setDataSource(dataSource);
        kendo.ui.progress($("#gridHocSinhTrongLop"), false);
    });
}

function openBaiKiemTra(id) {
    $("#ID_HocSinh").val(id);
    LoadDSBKT();
    $("#windowBaiKiemTra").data("kendoWindow").maximize().open();
}

function ThemBaiKiemTra() {
    HuyBKT();
    $("#windowThemBKT").data("kendoWindow").center().open();
}

function LoadDSBKT() {
    var html = '<div class="itemBKT">'
            + '<div class="addnewfoler" onclick="ThemBaiKiemTra()"></div>'
            + '<label class="BKTname">Tạo bài kiểm tra mới</label>'
            + '</div>'
    $.ajax({
        url: '/BaiKiemTra/GetBaiKiemTraByHocSinh?ID_HocSinh=' + $("#ID_HocSinh").val(),
        type: 'GET',
    }).done(function successCallback(response) {
        $.each(response, function (index, item) {
            html += '<div class="itemBKT">'
                    + '<div class="folericon">'
                    + '<button onclick="SuaBKT(' + item.ID + ',\'' + item.TenBaiKiemTra + '\')" class="k-button   BKTbtnedit" title="Sửa tên bài kiểm tra"><i class="fa fa-pencil"></i></button>'
                    + '<button onclick="XemBKT(' + item.ID + ')" class="k-button BKTbtnedit" title="Xem ảnh bài kiểm tra"><i class="fa fa-eye"></i></button>'
                    + '<button onclick="DeleteBKT(' + item.ID + ')" class="k-button BKTbtnedit" title="Xóa bài kiểm tra"><i class="fa fa-trash"></i></button>'
                    + '</div>'
                    + '<label class="BKTname">' + item.TenBaiKiemTra + '</label>'
                    + '</div>'
        })
        $("#lstBaiKiemTra").html(html);
    });
}

function LuuBKT() {
    var validten = SetValidate("TenBKT");
    if (validten) {
        $.ajax({
            url: '/BaiKiemTra/ThemBaiKiemTra',
            type: 'POST',
            data: {
                ID: $("#ID_BaiKiemTra").val(),
                ID_HocSinh: $("#ID_HocSinh").val(),
                TenBaiKiemTra: $("#TenBKT").val()
            }
        }).done(function successCallback(response) {

            if (response.status) {
                notification.show({ kValue: response.msg }, "success");
                HuyBKT();
                LoadDSBKT();
            } else {
                notification.show({ kValue: response.msg }, "error");
            }
        });
    }
}

function SuaBKT(id, ten) {
    $("#ID_BaiKiemTra").val(id);
    $("#TenBKT").val(ten);
    $("#windowThemBKT").data("kendoWindow").center().open();
}

function HuyBKT() {
    $("#ID_BaiKiemTra").val("");
    $("#TenBKT").val("");
    $("#windowThemBKT").data("kendoWindow").close();
}

function XemBKT(ID) {
    $("#ID_BaiKiemTra").val(ID);
    var html = "";
    $.ajax({
        url: '/BaiKiemTra/GetBaiKiemTraByID?ID=' + ID,
        type: 'GET',
    }).done(function successCallback(response) {
        if (response.lstAnh) {
            $.each(response.lstAnh, function (index, item) {
                html += '<div class="photo" style="background-image: url(../Images/BaiKiemTra/' + item.DuongDan + ')" data-role="page">'
                        + '<button type="button" onclick="DeleteImage(' + item.ID + ')" class="k-button k-upload-action BKTremovebtn" aria-label="">'
                        + '<span class="k-icon k-i-close k-i-x" title=""></span>'
                        + '</button>'
                        + '</div>'
            })

            $("#scrollView").html(html);
            if ($("#scrollView").data("kendoMobileScrollView")) {
                $("#scrollView").data("kendoMobileScrollView").destroy();
            }
            $("#scrollView").kendoMobileScrollView({
                enablePager: true,
                contentHeight: "100%"
            });
        }

    });
}

function DeleteBKT(ID) {
    openConfirm(dialogRoot, "<b style='line-height:40px;'>Bạn có chắc chắn muốn xóa bài kiểm tra?</b>", function () { XoaBKT(ID); }, function () { });
}

function XoaBKT(ID) {
    $.ajax({
        url: '/BaiKiemTra/XoaBaiKiemTra?ID=' + ID,
        type: 'POST'
    }).done(function successCallback(response) {
        if (response.status) {
            notification.show({ kValue: response.msg }, "success");
            LoadDSBKT();
        } else {
            notification.show({ kValue: response.msg }, "error");
        }
    });
}

function DeleteImage(ID) {
    openConfirm(dialogRoot, "<b style='line-height:40px;'>Bạn có chắc chắn muốn xóa ảnh?</b>", function () { XoaImage(ID); }, function () { });
}

function XoaImage(ID) {
    $.ajax({
        url: '/BaiKiemTra/XoaAnh?ID=' + ID,
        type: 'POST'
    }).done(function successCallback(response) {
        if (response.status) {
            notification.show({ kValue: response.msg }, "success");
            XemBKT($("#ID_BaiKiemTra").val());
        } else {
            notification.show({ kValue: response.msg }, "error");
        }
    });
}

function PushFormDataFile(file, id_baikiemtra) {
    var data = new FormData();
    data.append("ID_BaiKiemTra", id_baikiemtra);
    data.append('file', file.rawFile, file.name);
    var t = $.ajax({
        url: '/BaiKiemTra/UploadAnh',
        processData: false,
        contentType: false,
        data: data,
        type: 'POST'
    }).done(function successCallback(response) {
        if (response.status) {
            notification.show({ kValue: response.msg }, "success");
            XemBKT(id_baikiemtra);
            $("#fileBKT").data("kendoUpload").clearAllFiles();
        } else {
            notification.show({ kValue: response.msg }, "error");
        }

    });
}