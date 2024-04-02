var __dataDeXuat = [];
var __isSelectedDeXuat = false;
var __isCopy = false;
$(document).ready(function () {
    $("#window").kendoWindow({
        title: "Chi tiết",
        visible: false,
        modal: true,
        resizable: false,
        actions: [
            "Close"
        ]
    });

    $("#windowThemHangHoa").kendoWindow({
        width: "800px",
        height: "500px",
        title: "Thêm mới hàng hóa",
        visible: false,
        modal: true,
        resizable: false,
        actions: [
            "Close"
        ],
    });

    $("#LoaiPhieu").kendoComboBox({
        dataTextField: "text",
        dataValueField: "value",
        filter: "contains",
        suggest: true,
        delay: 500,
        dataSource: new kendo.data.DataSource({
            data: [
                { text: "Tạm ứng", value: 1 },
                { text: 'Thanh toán', value: 2 },
                { text: 'Quyết toán', value: 3 },
                { text: 'Thanh toán cho Đề Xuất', value: 4 }
            ],
        }),
    });
    //$("#HinhThuc").kendoComboBox({
    //    dataTextField: 'text',
    //    dataValueField: 'value',
    //    dataSource: new kendo.data.DataSource({
    //        data: [
    //            { text: 'Tiền mặt', value: 0 },
    //            { text: 'Chuyển khoản', value: 1 }
    //        ]
    //    }),
    //});

    var currentDate = new Date();
    $("#FromDate").kendoDatePicker({
        value: new Date(currentDate.getFullYear(), currentDate.getMonth(), 1),
        format: "dd-MM-yyyy"
    });

    $("#ToDate").kendoDatePicker({
        value: new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0),
        format: "dd-MM-yyyy"
    });

    $("#NgaySuDung").kendoDateTimePicker({
        format: "dd/MM/yyyy",
        parseFormats: ["dd/MM/yyyy"]
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
        excel: {
            filterable: true 
        },
        detailTemplate: kendo.template($("#template").html()),
        detailInit: detailInit,
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
                    },
                    DanhMucNhomChi: {
                        type: "string"
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
            $("#grid").data("kendoGrid").clearSelection();
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
                template: function (e) {
                    if (e.LoaiPhieu != 4) {
                        return "<i onclick='openCopyWindow(\"" + e.uid + "\")' style='color:red' class='fa fa-copy'></i>";
                    }
                    else
                        return "";
                },
                width: "30px",
                attributes: {
                    class: "text-center"
                },
                headerAttributes: {
                    style: "text-align: center; font-size: 12px; ",
                    class: "table-header-cell"
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
                field: "NgayTao",
                title: "Ngày tạo",
                template: function (e) {
                    var dateString = e.NgayTao.substr(6);
                    var currentTime = new Date(parseInt(dateString));
                    if (currentTime.getFullYear() != 1) {
                        return kendo.toString(currentTime, "HH:mm dd/MM/yyyy");
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
                field: "NgaySuDung",
                title: "Ngày Sử Dụng",
                template: function (e) {
                    var dateString = e.NgaySuDung.substr(6);
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
                field: "MaPhieu",
                title: "Mã phiếu chi",
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
                field: "DanhMucNhomChi",
                title: "Danh mục nhóm chi",
                width: "150px",
                template: function (dataItem) {
                    return dataItem.DanhMucNhomChi.replace(/\n/g, "<br>");
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
                field: "NoiDungChi",
                title: "Nội dung chi",
                template: function (dataItem) {
                    return dataItem.NoiDungChi.replace(/\n/g, "<br>");
                },
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
                field: "TenNguoiNhan",
                title: "Tên người nhận",
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
                field: "TenNguoiTao",
                title: "Tên người tạo",
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
                field: "TenLoaiPhieu",
                title: "Loại phiếu",
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
                field: "SoTien",
                format: "{0:n0}",
                title: "Tổng tiền",
                width: "100px",
                aggregates: ["sum"],
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
                },
                footerTemplate: "<div>Tổng tiền: #= kendo.toString(sum, 'n0') #</div>"
            },
            {
                field: "LyDo",
                title: "Lý do",
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
        openEditWindow();
    })

    $('#grid').data('kendoGrid').pager.bind('change', function (e) {
        console.log(e)
        $("#grid").data("kendoGrid").clearSelection();
    });


    LoadGridData($("#FromDate").data("kendoDatePicker").value(), $("#ToDate").data("kendoDatePicker").value());
    $("#dialogRoot").kendoDialog().data("kendoDialog").close();

    createGridChiPhi();
    LoadDanhMucKhuVuc();
    LoadDanhMucNhanVien();
    LoadDanhMucHinhThucThanhToan();

    $("#fileDMHH").kendoUpload({
        multiple: false,
        localization: {
            select: 'Tải file ảnh danh mục hàng hóa',
            remove: '',
            cancel: ''
        },
        allowedExtensions: [".jpg", ".png", ".jpeg"],
        select: function (e) {
            var files = e.files[0];

            if (files.extension.toLowerCase() != ".jpg" && files.extension.toLowerCase() != ".png" && files.extension.toLowerCase() != ".jpeg") {
                e.preventDefault();
                notification.show({ kValue: "Vui lòng chọn đúng định dạng" + " .jpg;.png;.jpeg" }, "error");
            }
            $("#preview").empty();
            for (var i = 0; i < e.files.length; i++) {
                var file = e.files[i].rawFile;

                if (file) {
                    var reader = new FileReader();

                    reader.onloadend = function () {
                        $("<img width=100 height=100>").attr("src", this.result).appendTo($("#preview"));
                    };

                    reader.readAsDataURL(file);
                }
            }
        }
    });
    LoadDonViTinh();
    LoadLoaiSanPham();

})
function LoadDanhMucNhanVien() {
    $.ajax({
        url: '/User/GetAllUser',
        type: 'GET',
        contentType: "application/json; charset=utf-8",
        dataType: 'json',

    }).done(function successCallback(response) {
        var dataSource = new kendo.data.DataSource({
            data: response,
        });
        if ($("#TenNguoiNhan").data("kendoComboBox") == undefined) {
            $("#TenNguoiNhan").kendoComboBox({
                dataTextField: "TenDayDu",
                dataValueField: "ID",
                filter: "contains",
                suggest: true,
                delay: 1000,
                dataSource: dataSource,
            })
        } else {
            $("#TenNguoiNhan").data("kendoComboBox").setDataSource(dataSource);
        }
    });
}
function LoadDanhMucHinhThucThanhToan() {
    $.ajax({
        url: '/Quy/GetAllQuy',
        type: 'GET',
        contentType: "application/json; charset=utf-8",
        dataType: 'json',

    }).done(function successCallback(response) {
        var dataSource = new kendo.data.DataSource({
            data: response,
        });
        if ($("#HinhThuc").data("kendoComboBox") == undefined) {
            $("#HinhThuc").kendoComboBox({
                dataTextField: "TenQuy",
                dataValueField: "ID",
                filter: "contains",
                suggest: true,
                delay: 1000,
                dataSource: dataSource,
            })
        } else {
            $("#HinhThuc").data("kendoComboBox").setDataSource(dataSource);
        }
    });
}
function LoadDanhMucKhuVuc() {
    $.ajax({
        url: '/DanhMucKhuVuc/GetAll',
        type: 'GET',
        contentType: "application/json; charset=utf-8",
        dataType: 'json',
        
    }).done(function successCallback(response) {
        var dataSource = new kendo.data.DataSource({
            data: response,
        });
        if ($("#KhuVuc").data("kendoComboBox") == undefined) {
            $("#KhuVuc").kendoComboBox({
                dataTextField: "TenKhuVuc",
                dataValueField: "ID",
                filter: "contains",
                suggest: true,
                delay: 1000,
                dataSource: dataSource
            })
        } else {
            $("#KhuVuc").data("kendoComboBox").setDataSource(dataSource);
        }
    });
}
function LoadDanhMucDeXuat(id_dx) {
    $.ajax({
        url: '/QuanLyDeXuat/GetNotInPhieuChi?ID_DeXuat=' + id_dx,
        type: 'GET',
        contentType: "application/json; charset=utf-8",
        dataType: 'json',
    }).done(function successCallback(response) {
        var dataSource = new kendo.data.DataSource({
            data: response,
            schema: {
                parse: function (data) {
                    for (var i = 0; i < data.length; i++) {
                        data[i].HienThi = data[i].TenDeXuat + " - " + data[i].NameDinhMucChi;
                    }
                    return data;
                },
                model: {
                    id: "ID",
                    fields: {
                        ID_DanhMucNhomChi: { type: "number" },
                        NameDanhMucNhomChi: { type: "text" },
                        HienThi: { type: "text" },
                    }
                }
            }
        });

        if ($("#DeXuat").data("kendoMultiColumnComboBox") == undefined) {
            $("#DeXuat").kendoMultiColumnComboBox({
                dataTextField: "HienThi",
                dataValueField: "ID",
                height: 400,
                columns: [
                    {
                        field: "TenDeXuat",
                        title: "Tên Đề Xuất",
                        width: 200
                    },
                    {
                        field: "NgayTao",
                        title: "Ngày Tạo",
                        width: 200,
                        template: function (dataItem) {
                            var ngayTao = new Date(parseInt(dataItem.NgayTao.substr(6)));
                            return kendo.toString(ngayTao, "d/M/yyyy h:mm tt");
                        }
                    },
                    {
                        field: "NoiDung",
                        title: "Nội dung",
                        width: 250
                    },
                    {
                        field: "NguoiTao",
                        title: "Người tạo",
                        width: 100
                    },
                    {
                        field: "ThoiGianKhauHao",
                        title: "Thời gian khấu hao",
                        width: 150
                    },
                    {
                        field: "ThoiGianDuKienSuDung",
                        title: "Thời gian sử dụng dự kiến",
                        width: 200,
                        template: function (dataItem) {
                            var thoiGianDuKienSuDung = new Date(parseInt(dataItem.ThoiGianDuKienSuDung.substr(6)));
                            return kendo.toString(thoiGianDuKienSuDung, "d/M/yyyy h:mm tt");
                        }
                    },
                    {
                        field: "TongTien",
                        title: "Tổng tiền",
                        format: "{0:n0}",
                        width: 200,
                        template: function (dataItem) {
                            return kendo.format("{0:n0}", dataItem.TongTien);
                        }
                    }
                ],
                footerTemplate: 'Total #: instance.dataSource.total() # items found',
                filter: "contains",
                dataSource: dataSource,
                change: function (e) {
                    if (e.sender.value() > 0) {
                        __isSelectedDeXuat = true;

                        var selectedData = this.dataItem();
                        var selectedID_DanhMucNhomChi = selectedData.ID_DanhMucNhomChi;
                        var selectedNameDanhMucNhomChi = selectedData.NameDanhMucNhomChi;
                        var selectedNgaySuDung = selectedData.ThoiGianDuKienSuDung;
                        var selectedKhuVucSuDung = selectedData.KhuVucSuDung;

                        $.ajax({
                            url: '/PhieuChi/GetChiPhiByDeXuat?ID_PhieuChi=' + e.sender.value(),
                            type: 'GET',
                            contentType: "application/json; charset=utf-8",
                            dataType: 'json',
                        }).done(function successCallback(response2) {

                            var lstChiPhi = [];
                            var TongTienPhieuChi = 0

                            $.each(response2, function (index, item) {
                                lstChiPhi.push({
                                    ID: '',
                                    DanhMucNhomChi: selectedID_DanhMucNhomChi,
                                    TenDanhMucNhomChi: selectedNameDanhMucNhomChi,
                                    TenChiPhi: item.TenHangHoa,
                                    MaChiPhi: item.TenHangHoa,
                                    SoTien: item.SoTien,
                                    SoLuong: item.SoLuong,
                                    TongTien: item.SoTien * item.SoLuong,
                                    MoTa: item.QuyCachSuDung ? item.QuyCachSuDung : ""
                                })
                                TongTienPhieuChi = TongTienPhieuChi + item.SoTien * item.SoLuong
                            })
                            $("#SoTien").val(TongTienPhieuChi.toLocaleString('vi-VN')); 
                            $("#NgaySuDung").data("kendoDateTimePicker").value(kendo.parseDate(selectedNgaySuDung, "dd/MM/yyyy"));
                            $("#KhuVuc").data("kendoComboBox").value(selectedKhuVucSuDung);
                            LoadGridChiPhiDeXuat(lstChiPhi);

                        });
                        var grid = $("#gridChiPhi").data("kendoGrid");
                        $("#LoaiPhieu").data("kendoComboBox").value(4);
                        grid.setOptions({
                            editable: false
                        });
                    } else {
                        LoadGridChiPhiDeXuat([]);
                        __isSelectedDeXuat = false;
                        var currentDate = new Date();
                        $("#NgaySuDung").data("kendoDateTimePicker").value(kendo.parseDate(currentDate, "dd/MM/yyyy"));
                        $("#KhuVuc").data("kendoComboBox").value("");
                        $("#LoaiPhieu").data("kendoComboBox").value(2);
                        var grid = $("#gridChiPhi").data("kendoGrid");
                        grid.setOptions({
                            editable: true
                        });
                    }                                   
                }
            })
        }
        else {
            $("#DeXuat").data("kendoMultiColumnComboBox").setDataSource(dataSource);
        }
        

        if (id_dx > 0) {
            $("#DeXuat").data("kendoMultiColumnComboBox").value(id_dx);
        }
    });
}
function openEditWindow() {
    __isCopy = false;
    var arr = $("#grid").data("kendoGrid").selectedKeyNames();
    $("#MaPhieuChi").show()
    if (arr.length != 1) {
        openDialog($("#dialogRoot").data("kendoDialog"), "Vui lòng chọn 1 bản ghi để sửa");
    } else {
        $("#window").data("kendoWindow").center().maximize().open();
        var selectedItem = $("#grid").data("kendoGrid").dataItem($("#grid").data("kendoGrid").select());
        LoadDanhMucDeXuat(selectedItem.ID_DeXuat);
        if (selectedItem.ID_DeXuat == 0) {
            setTimeout(function () {
                $("#DeXuat").data("kendoMultiColumnComboBox").readonly(true);
            }, 50);
        }

        $("#ID").val(selectedItem.ID);
        $("#MaPhieu").val(selectedItem.MaPhieu);
        $("#SoTien").val(selectedItem.SoTien.toLocaleString('vi-VN'));
        $("#LyDo").val(selectedItem.LyDo);

        var NgaySuDungFormat = new Date(parseInt(selectedItem.NgaySuDung.substr(6)));

        $("#NgaySuDung").data("kendoDateTimePicker").value(kendo.parseDate(NgaySuDungFormat, "dd/MM/yyyy"));
        $("#KhuVuc").data("kendoComboBox").value(selectedItem.ID_KhuVuc);
        $("#LoaiPhieu").data("kendoComboBox").value(selectedItem.LoaiPhieu);
        $("#TenNguoiNhan").data("kendoComboBox").value(selectedItem.ID_NhanVien);
        $("#HinhThuc").data("kendoComboBox").value(selectedItem.HinhThuc);

        LoadGridChiPhi(selectedItem.ID);
    }
}
function openCopyWindow(uid) {  
    var row = $("#grid").data("kendoGrid").selectedKeyNames();
    $("#MaPhieuChi").hide()

    var selectedItem = $('#grid').data("kendoGrid").dataSource.getByUid(uid);
    //if ($(window).width() > 800) {
    //    $("#window").data("kendoWindow").center().open();
    //} else {
        $("#window").data("kendoWindow").center().maximize().open();
    //}
    $("#ID").val('0');
    LoadDanhMucDeXuat(0);  
    getMaPhieu();
    $("#SoTien").val(selectedItem.SoTien.toLocaleString('vi-VN'));
    $("#LyDo").val(selectedItem.LyDo);

    var currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0);
    $("#NgaySuDung").data("kendoDateTimePicker").value(kendo.parseDate(currentDate, "dd/MM/yyyy"));

    $("#KhuVuc").data("kendoComboBox").value(selectedItem.ID_KhuVuc);
    $("#LoaiPhieu").data("kendoComboBox").value(selectedItem.LoaiPhieu);
    $("#HinhThuc").data("kendoComboBox").value(selectedItem.HinhThuc);
    $("#TenNguoiNhan").data("kendoComboBox").value(selectedItem.ID_NhanVien);
    __isCopy = true;
    setTimeout(function () {
        $("#DeXuat").data("kendoMultiColumnComboBox").readonly(true);
    }, 50);  
    LoadGridChiPhi(selectedItem.ID);
}
function toDate(value) {
    var dateRegExp = /^\/Date\((.*?)\)\/$/;
    var date = dateRegExp.exec(value);
    return new Date(parseInt(date[1]));
}
function LoadGridData(FromDate, ToDate) {
    var fromDate = kendo.toString(FromDate, "yyyy-MM-dd")
    var toDate = kendo.toString(ToDate, "yyyy-MM-dd")
    $.ajax({
        url: '/PhieuChi/GetAllByThang?FromDate=' + fromDate + '&ToDate=' + toDate,
        type: 'GET',
    }).done(function successCallback(response) {         
        kendo.ui.progress($("#grid"), true);
        var dataSource = new kendo.data.DataSource({
            data: response,
            schema: {
                parse: function (data) {
                    for (var i = 0; i < data.length; i++){
                        data[i].DanhMucNhomChi = "";
                        data[i].NoiDungChi = "";
                        for (var j = 0; j < data[i].lstChiPhi.length; j++) {
                            if (!data[i].DanhMucNhomChi.includes(data[i].lstChiPhi[j].TenDanhMucNhomChi)) {
                                data[i].DanhMucNhomChi += "- " + data[i].lstChiPhi[j].TenDanhMucNhomChi + "\n";
                            }                       
                            data[i].NoiDungChi += "- " + data[i].lstChiPhi[j].TenChiPhi + "\n";
                        }
                    }
                    
                    return data;
                },
                model: {                  
                    id: "ID",                   
                    field: {
                        NgaySuDung: {
                            type: 'date'
                        },  
                        SoTien: {
                            type: "number"
                        },
                        DanhMucNhomChi: {
                            type: "string"
                        }
                    }
                }
            },
            aggregate: [
                { field: "SoTien", aggregate: "sum" },
            ],
            pageSize: 20,
        });
        $("#grid").data("kendoGrid").setDataSource(dataSource);
        kendo.ui.progress($("#grid"), false);
    });
}
function btnLoadGrid() {
    LoadGridData($("#FromDate").data("kendoDatePicker").value(), $("#ToDate").data("kendoDatePicker").value());
}
function ThemMoi() {
    __isCopy = false;
    document.getElementById("formChiTiet").reset();   
    LoadGridChiPhiDeXuat([]);
    $("#ID").val('');
    $("#MaPhieuChi").hide();
    LoadDanhMucDeXuat(0);
    setTimeout(function () {
        $("#DeXuat").data("kendoMultiColumnComboBox").readonly(false);
    }, 50);
    getMaPhieu();   
   
    var currentDate = new Date();
    $("#NgaySuDung").data("kendoDateTimePicker").value(kendo.parseDate(currentDate, "dd/MM/yyyy"));
    $("#window").data("kendoWindow").center().maximize().open();
    setTimeout(function () {
        $("#TenNguoiNhan").data("kendoComboBox").value(2006);
        $("#HinhThuc").data("kendoComboBox").value(2);
        $("#LoaiPhieu").data("kendoComboBox").value(2);
    }, 50);

    
}
function getMaPhieu() {
    var stt = $("#grid").data("kendoGrid").dataSource.data().length + 1
    var maphieu = "PC" + kendo.toString(new Date(), "ddMMyyyy")
    $("#MaPhieu").val(maphieu);
}
function Luu() {

    var validten = SetValidate("TenNguoiNhan");
    var validma = SetValidate("MaPhieu");
    var validloai = SetValidate("LoaiPhieu");
    var NgaySuDung = kendo.toString($("#NgaySuDung").data("kendoDateTimePicker").value(), "yyyy-MM-dd");

    $.ajax({
        url: '/Quy/GetQuyById?id=' + $("#HinhThuc").data("kendoComboBox").value(),
        type: 'GET',
        contentType: "application/json; charset=utf-8",
        dataType: 'json',
    }).done(function successCallback(response) {
        //if (response.TongTien < parseFloat($("#SoTien").val().replace(/\D/g, ''))) {
            var valid = validten;
            if (valid && validloai) {
                var lstChiPhi = [];
                if (__isCopy == true) {
                    $.each($("#gridChiPhi").data("kendoGrid").dataSource.data(), function (index, item) {
                        lstChiPhi.push({
                            ID: 0,
                            TenChiPhi: item.TenChiPhi,
                            MaChiPhi: item.MaChiPhi,
                            SoTien: item.SoTien,
                            SoLuong: item.SoLuong,
                            TongTien: item.TongTien,
                            MoTa: item.MoTa ? item.MoTa : "",
                            DanhMucNhomChi: item.DanhMucNhomChi
                        })
                    })
                }
                else {
                    $.each($("#gridChiPhi").data("kendoGrid").dataSource.data(), function (index, item) {
                        lstChiPhi.push({
                            ID: item.ID,
                            TenChiPhi: item.TenChiPhi,
                            MaChiPhi: item.MaChiPhi,
                            SoTien: item.SoTien,
                            SoLuong: item.SoLuong,
                            TongTien: item.TongTien,
                            MoTa: item.MoTa ? item.MoTa : "",
                            DanhMucNhomChi: item.DanhMucNhomChi
                        })
                    })
                }

                $.ajax({
                    url: '/PhieuChi/CreateOrUpdate',
                    type: 'POST',
                    data: {
                        ID: $("#ID").val(),
                        TenNguoiNhan: $("#TenNguoiNhan").data("kendoComboBox").text(),
                        MaPhieu: $("#MaPhieu").val(),
                        SoTien: parseFloat($("#SoTien").val().replace(/\D/g, '')),
                        LyDo: $("#LyDo").val(),
                        NgaySuDung: NgaySuDung,
                        ID_KhuVuc: $("#KhuVuc").data("kendoComboBox").value(),
                        ID_DeXuat: $("#DeXuat").data("kendoMultiColumnComboBox").value(),
                        LoaiPhieu: $("#LoaiPhieu").data("kendoComboBox").value(),
                        HinhThuc: $("#HinhThuc").data("kendoComboBox").value(),
                        ID_NhanVien: $("#TenNguoiNhan").data("kendoComboBox").value(),


                        lstChiPhi: lstChiPhi,

                    }
                }).done(function successCallback(response) {

                    if (response.status) {
                        notification.show({ kValue: response.msg }, "success");
                        Huy();
                        $("#grid").data("kendoGrid").clearSelection();

                        LoadGridData($("#FromDate").data("kendoDatePicker").value(), $("#ToDate").data("kendoDatePicker").value());
                    } else {
                        notification.show({ kValue: response.msg }, "error");
                    }
                });
            }
        //}
        //else {
        //    notification.show({ kValue: "Số tiền hiện tại trong quỹ không đủ!!!" }, "error");
        //}
    });
}
function Huy() {
    document.getElementById("formChiTiet").reset();
    $("#ID").val('');
    $("#window").data("kendoWindow").close();

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
        url: '/PhieuChi/Delete?ID=' + ids.join(','),
        type: 'POST'
    }).done(function (response) {
        if (response.status) {
            LoadGridData($("#FromDate").data("kendoDatePicker").value(), $("#ToDate").data("kendoDatePicker").value());
            notification.show({ kValue: response.msg }, "success");
            bangDuLieu.clearSelection();
        } else {
            notification.show({ kValue: response.msg }, "error");
        }
    })
}
function XuatExcel() {
    var grid = $('#grid').data('kendoGrid');

    grid.options.excel = {
        fileName: "Dinh_Muc_Ngan_Sach_Nhom_Chi.xlsx",
        filterable: true,
        allPages: true
    }
    grid.saveAsExcel();
}
function createGridChiPhi() {
    
        $("#gridChiPhi").kendoGrid({
            dataSource: new kendo.data.DataSource({
                data: [],
                schema: {
                    model: {
                        id: "id",
                        fields: {
                            ID: { type: 'number', editable: false },
                            DanhMucNhomChi: { type: 'number', editable: true },
                            TenDanhMucNhomChi: { type: 'text', editable: true },
                            TenChiPhi: { type: 'text', editable: true },
                            MaChiPhi: { type: 'text', editable: true },
                            SoTien: { type: 'number', editable: true },
                            SoLuong: { type: 'number', editable: true },
                            TongTien: { type: 'number', editable: false },
                            MoTa: { type: 'text', editablle: true }
                        }
                    }
                },
                pageSize: 100
            }),
            dataBinding: function () {
                record = (this.dataSource.page() - 1) * this.dataSource.pageSize();
            },
            height: 250,
            editable: true,
            save: function (e) {            
                if (e.values.SoLuong) {
                    e.model.TongTien = e.values.SoLuong * e.model.SoTien;
                    var TongTienPhieuChi = 0
                    $.each($("#gridChiPhi").data("kendoGrid").dataSource.data(), function (index, item) {
                        TongTienPhieuChi = TongTienPhieuChi + item.TongTien
                    })
                    $("#SoTien").val(TongTienPhieuChi.toLocaleString('vi-VN'));
                }
                if (e.values.SoTien > 0) {
                    e.model.TongTien = e.model.SoLuong * e.values.SoTien;
                    var TongTienPhieuChi = 0
                    $.each($("#gridChiPhi").data("kendoGrid").dataSource.data(), function (index, item) {
                        TongTienPhieuChi = TongTienPhieuChi + item.TongTien
                    })
                    $("#SoTien").val(TongTienPhieuChi.toLocaleString('vi-VN'));
                }
                e.sender.refresh();
            },
            persistSelection: true,
            resizable: true,
            pageable: false,
            sortable: false,
            filterable: {
                mode: "row",
            },
            scrollable: true,
            columns: [
                {
                    title: " ",
                    field: 'ID',
                    template: function (e) {
                        return "<i onclick='DeleteRowChiPhi(\"" + e.uid + "\")' style='color:red' class='fa fa-trash'></i>";
                    },
                    width: 50,
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
                                e.element.parent().html("<a class='k-button' id='buttomThemMoiRowChiPhi' title='Thêm' style='width:100%; height:25px;' onclick='AddRowChiPhi()'><i class='fa fa-plus'></i></a>")
                            }
                        }
                    },
                },
                {
                    field: "TenDanhMucNhomChi",
                    title: "Danh mục nhóm chi",
                    template: function (e) {
                        if (e.TenDanhMucNhomChi) {
                            return e.TenDanhMucNhomChi;
                        } else {
                            return "";
                        }
                    },
                    width: 200,
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
                    },
                    editor: function (container, options) {
                        $('<input name="' + options.field + '"/>')
                            .appendTo(container)
                            .kendoComboBox({
                                dataSource: {
                                    transport: {
                                        read: {
                                            url: '/DanhMuc/GetAllNhomChi',
                                            type: 'GET',
                                            dataType: 'json'
                                        }
                                    }
                                },
                                dataTextField: "TenNhomChi",
                                autoBind: false,
                                valuePrimitive: true,
                                change: function (e) {
                                    let model = e.sender.dataItem()

                                    options.model.TenDanhMucNhomChi = model.TenNhomChi;
                                    options.model.DanhMucNhomChi = model.ID;
                                    setTimeout(function () {
                                        $("#gridChiPhi").data("kendoGrid").refresh();
                                    })
                                }
                            });
                    },
                }, 
                {
                    field: "DanhMucNhomChi",
                    title: "Danh Mục Nhóm Chi",
                    width: 200,
                    hidden: true,
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
                    },
                }, 
                {
                    field: "TenChiPhi",
                    title: "Hàng Hóa",
                    template: function (e) {
                        if (e.TenChiPhi) {
                            return e.TenChiPhi;
                        } else {
                            return "";
                        }
                    },
                    width: 200,
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
                    },
                    editor: function (container, options) {
                        $('<input name="' + options.field + '"/>')
                            .appendTo(container)
                            .kendoComboBox({
                                dataSource: {
                                    transport: {
                                        read: {
                                            url: '/DanhMucHangHoa/GetAll',
                                            type: 'GET',
                                            dataType: 'json'
                                        }
                                    }
                                },
                                dataTextField: "Ten",
                                autoBind: false,
                                valuePrimitive: true,
                                change: function (e) {
                                    let model = e.sender.dataItem()

                                    options.model.TenChiPhi = model.Ten;
                                    options.model.MaChiPhi = model.MaHang;
                                    options.model.SoTien = model.GiaNhap;
                                    setTimeout(function () {
                                        $("#gridChiPhi").data("kendoGrid").refresh();
                                    })
                                },
                                footerTemplate: '<button class="k-button bg-blue" onclick="themMoiHangHoa()"><i class="fa fa-plus-square"> Thêm mới</i></button>'
                            });
                    },                    
                },  
                {
                    field: "MaChiPhi",
                    hidden: true,
                    width: 200,
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
                    },                  
                },   
                {
                    field: "SoTien",
                    title: "Số tiền",
                    format: "{0:n0}",
                    width: 100,
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
                    },
                },
                {
                    field: "SoLuong",
                    title: "Số lượng",
                    width: 100,
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
                    },
                },
                {
                    field: "TongTien",
                    title: "Tổng tiền",
                    format: "{0:n0}",
                    width: 100,
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
                    },
                },
                {
                    field: "GhiChu",
                    title: "Ghi chú",
                    width: 230,
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
                    },
                },

            ]
        });
    
}
function LoadGridChiPhi(ID_PhieuChi) {
    $.ajax({
        url: '/PhieuChi/GetChiPhiByPhieu?ID_PhieuChi=' + ID_PhieuChi,
        type: 'GET'
    }).done(function (response) {
        var ds = new kendo.data.DataSource({
            data: response,
            schema: {
                model: {
                    id: "id",
                    fields: {
                        ID: { type: 'number', editable: false },
                        TenDanhMucNhomChi: { type: 'text', editable: true },
                        DanhMucNhomChi: { type: 'number', editable: true },
                        TenChiPhi: { type: 'text', editable: true },
                        MaChiPhi: { type: 'text', editable: true },
                        SoTien: { type: 'number', editable: true },
                        SoLuong: { type: 'number', editable: true },
                        TongTien: { type: 'number', editable: false },
                        MoTa: { type: 'text', editablle: true }
                    }
                }
            },
            pageSize: 100
        });
        $("#gridChiPhi").data("kendoGrid").setDataSource(ds);
    })

}
function LoadGridChiPhiDeXuat(response) {
    var ds = new kendo.data.DataSource({
        data: response,
        schema: {
            model: {
                id: "id",
                fields: {
                    ID: { type: 'number', editable: false },
                    DanhMucNhomChi: { type: 'number', editable: true },
                    TenDanhMucNhomChi: { type: 'text', editable: true },
                    TenChiPhi: { type: 'text', editable: true },
                    MaChiPhi: { type: 'text', editable: true },
                    SoTien: { type: 'number', editable: true },
                    SoLuong: { type: 'number', editable: true },
                    TongTien: { type: 'number', editable: false },
                    MoTa: { type: 'text', editablle: true }
                }
            }
        },
        pageSize: 100
    });
    $("#gridChiPhi").data("kendoGrid").setDataSource(ds);

}
function AddRowChiPhi(e) {
    if (__isSelectedDeXuat) {
        e.preventDefault();
    }
    var grid = $("#gridChiPhi").data("kendoGrid");
    grid.addRow();
    $("#DeXuat").data("kendoMultiColumnComboBox").readonly(true);
}
function DeleteRowChiPhi(uid) {
    var grid = $("#grid").data("kendoGrid");
    var selectedItem = grid.dataItem(grid.select());
    if (selectedItem) {
        if (selectedItem.trangThai > 0) {
            openDialog(dialogRoot, "Vui lòng liên hệ bộ phân văn phòng để sửa lịch học");
            return;
        }
    }
    var dataRow = $('#gridChiPhi').data("kendoGrid").dataSource.getByUid(uid);
    $('#gridChiPhi').data("kendoGrid").dataSource.remove(dataRow);
    $("#DeXuat").data("kendoMultiColumnComboBox").readonly(false);
}


//Them moi hang hoa
function themMoiHangHoa() {
    if ($(window).width() > 800) {
        $("#windowThemHangHoa").data("kendoWindow").center().open();
    } else {
        $("#windowThemHangHoa").data("kendoWindow").center().maximize().open();
    }

    $("#preview").empty();
    $("#HinhAnh").val("khongcohinhanh.jpg");
    $("#buttomXoa").hide();
}
function LuuHangHoa() {
    var validmh = SetValidate("MaHang");
    var validthh = SetValidate("TenHangHoa");
    var validdvt = SetValidate("DonViTinh");
    var validlsp = SetValidate("LoaiSanPham");
    var validgbl = SetValidate("GiaBanLe");
    var validgn = SetValidate("GiaNhap");
    var validgbb = SetValidate("GiaBanBuon");

    var upload = $("#fileDMHH").getKendoUpload().getFiles();
    if (validmh && validthh && validdvt && validlsp && validgbl && validgn && validgbb != null) {
        if (upload.length > 0) {
            PushFormDataFile(upload[0], function (path) {
                $("#HinhAnh").val(path);
                LuuData(path);
                //setTimeout(function () {
                //    $("#gridChiPhi").data("kendoGrid").refresh();
                //})

            });
        }
        else {
            LuuData($("#HinhAnh").val());
            //setTimeout(function () {
            //    $("#gridChiPhi").data("kendoGrid").refresh();
            //})
        }
    }
}
function HuyHangHoa() {
    $("#preview").empty();
    $("#windowThemHangHoa").data("kendoWindow").close();
}
function LuuData(path) {
    if ($("#ID").val() == 0) {
        var model = {
            MaHang: $("#MaHang").val(),
            Ten: $("#TenHangHoa").val(),
            DonViTinh: $("#DonViTinh").data("kendoComboBox").text(),
            LoaiSanPham: $("#LoaiSanPham").data("kendoComboBox").text(),
            GiaBanBuon: parseFloat($("#GiaBanBuon").val().replace(/\D/g, '')),
            GiaBanLe: parseFloat($("#GiaBanLe").val().replace(/\D/g, '')),
            GiaNhap: parseFloat($("#GiaNhap").val().replace(/\D/g, '')),
            HinhAnhSanPham: path,
            MoTaSanPham: ($("#MoTaSanPham").val() !== null && $("#MoTaSanPham").val() !== "") ? $("#MoTaSanPham").val() : "Mô tả",
            SoLuongTonToiThieu: 1,
            SoLuongBanBuonToiThieu: 5,
            ID_DonViTinh: $("#DonViTinh").data("kendoComboBox").value(),
            ID_LoaiSanPham: $("#LoaiSanPham").data("kendoComboBox").value(),

        }

        $.ajax({
            url: '/DanhMucHangHoa/Create',
            data: model,
            type: 'POST',
        }).done(function successCallback(response) {
            if (response.status) {
                notification.show({ kValue: response.msg }, "success");
                HuyHangHoa();
                LoadGridData();
            } else {
                notification.show({ kValue: response.msg }, "error");
            }
        });

    }
    else {
        var model = {
            ID: $("#ID").val(),
            MaHang: $("#MaHang").val(),
            Ten: $("#TenHangHoa").val(),
            DonViTinh: $("#DonViTinh").data("kendoComboBox").text(),
            LoaiSanPham: $("#LoaiSanPham").data("kendoComboBox").text(),
            GiaBanBuon: parseFloat($("#GiaBanBuon").val().replace(/\D/g, '')),
            GiaBanLe: parseFloat($("#GiaBanLe").val().replace(/\D/g, '')),
            GiaNhap: parseFloat($("#GiaNhap").val().replace(/\D/g, '')),
            HinhAnhSanPham: path,
            MoTaSanPham: ($("#MoTaSanPham").val() !== null && $("#MoTaSanPham").val() !== "") ? $("#MoTaSanPham").val() : "Mô tả",
            SoLuongTonToiThieu: 1,
            SoLuongBanBuonToiThieu: 5,
            ID_DonViTinh: $("#DonViTinh").data("kendoComboBox").value(),
            ID_LoaiSanPham: $("#LoaiSanPham").data("kendoComboBox").value(),
        }

        $.ajax({
            url: '/DanhMucHangHoa/Update',
            data: model,
            type: 'POST',
        }).done(function successCallback(response) {
            if (response.status) {
                notification.show({ kValue: response.msg }, "success");
                HuyHangHoa();
                LoadGridData();
            } else {
                notification.show({ kValue: response.msg }, "error");
            }
        });
    }
}
function clearImage() {
    event.preventDefault();
    $("#preview").empty();
    $("#HinhAnh").val("khongcohinhanh.jpg");
    $("#fileDMCB").val("");
};
function PushFormDataFile(file, callback) {
    var data = new FormData();
    data.append('file', file.rawFile, file.name);

    var t = $.ajax({
        url: '/DanhMucHangHoa/UploadAnh',
        processData: false,
        contentType: false,
        data: data,
        type: 'POST'
    }).done(function successCallback(response) {
        path = response.fileName;
        callback(path)
    });
}
function LoadDonViTinh() {
    $.ajax({
        url: '/DanhMucDonViTinh/GetAll',
        type: 'GET',
    }).done(function (response) {
        //if (response && response.length > 0) {
        //    $("#DonViTinh").kendoComboBox({
        //        dataSource: response.map(function (item) {
        //            return item.DonViTinh;
        //        })
        //    });
        //}
        var dataSource = new kendo.data.DataSource({
            data: response,
        });
        if ($("#DonViTinh").data("kendoComboBox") == undefined) {
            $("#DonViTinh").kendoComboBox({
                dataTextField: "Ten",
                dataValueField: "ID",
                filter: "contains",
                suggest: true,
                delay: 1000,
                dataSource: dataSource
            })
        } else {
            $("#DonViTinh").data("kendoComboBox").setDataSource(dataSource);
        }
    });
}
function LoadLoaiSanPham() {
    $.ajax({
        url: '/DanhMucLoaiSanPham/GetAll',
        type: 'GET',
    }).done(function (response) {
        //if (response && response.length > 0) {
        //    $("#LoaiSanPham").kendoComboBox({
        //        dataSource: response.map(function (item) {
        //            return item.TenNhomChi;
        //        })
        //    });
        //}
        var dataSource = new kendo.data.DataSource({
            data: response,
        });
        if ($("#LoaiSanPham").data("kendoComboBox") == undefined) {
            $("#LoaiSanPham").kendoComboBox({
                dataTextField: "Ten",
                dataValueField: "ID",
                filter: "contains",
                suggest: true,
                delay: 1000,
                dataSource: dataSource
            })
        } else {
            $("#LoaiSanPham").data("kendoComboBox").setDataSource(dataSource);
        }
    });
}


function detailInit(e) {
    var detailRow = e.detailRow;
    var idphieuchi = e.data.ID;
    $.ajax({
        url: '/QuanLyDeXuat/GetByPhieuChi?ID_PhieuChi=' + idphieuchi,
        type: 'GET',
    }).done(function successCallback(response) {
        kendo.ui.progress($("#grid"), true);
        console.log(response);
        var dataSource = new kendo.data.DataSource({
            data: response,
            schema: {
                parse: function (data) {
                    for (var i = 0; i < data.length; i++) {
                        var thoiGianDuKienSuDung = new Date(parseInt(data[i].ThoiGianDuKienSuDung.substr(6)));
                        data[i].ThoiGianDuKienSuDung = kendo.toString(thoiGianDuKienSuDung, "d/M/yyyy HH:mm");

                        var ngayTao = new Date(parseInt(data[i].NgayTao.substr(6)));
                        data[i].NgayTao = kendo.toString(ngayTao, "d/M/yyyy HH:mm");

                        data[i].TenHangHoa = "";
                        data[i].TenNguoiDuyet = "";

                        for (var j = 0; j < data[i].ChiTiet.length; j++) {
                            data[i].TenHangHoa += "- " + data[i].ChiTiet[j].TenHangHoa + "\n";
                        }

                        for (var j = 0; j < data[i].NguoiDuyet.length; j++) {
                            data[i].TenNguoiDuyet += "- " + data[i].NguoiDuyet[j].NguoiDuyet + "\n";
                        }
                    }
                    return data;
                },
                model: {
                    id: "ID",
                    fields: {
                        ThoiGianDuKienSuDung: { type: "string" },
                        NgayTao: { type: "string" },
                        TongTien: { type: "number" },
                        TenHangHoa: { type: 'string' },
                        TenNguoiDuyet: { type: 'string' },

                    }
                },

            },
            //aggregate: { field: "TongTien", aggregate: "sum" }
        });
        kendo.ui.progress($("#grid"), false);
        detailRow.find(".orders").kendoGrid({
            dataSource: dataSource,
            //scrollable: true,
            persistSelection: true,
            autoFitColumn: true,
            resizable: true,
            //sortable: true,
            //filterable: {
            //    mode: "row",
            //},
            //pageable: pageableShort,
            dataBinding: function () {
                record = (this.dataSource.page() - 1) * this.dataSource.pageSize();
            },
            //excel: {
            //    filterable: true
            //},
            //excelExport: function (e) {
            //    var columns = e.workbook.sheets[0].columns;
            //    var sheet = e.workbook.sheets[0];
            //    sheet.title = "Danh sách đề xuất các khoản chi";
            //    for (var rowIndex = 0; rowIndex < sheet.rows.length; rowIndex++) {
            //        var row = sheet.rows[rowIndex];
            //        var flag = false;
            //        if (rowIndex == 0) {
            //            flag = true;
            //        }
            //        for (var cellIndex = 0; cellIndex < row.cells.length; cellIndex++) {

            //            if (flag) {
            //                row.cells[cellIndex].textAlign = 'center';
            //                row.cells[cellIndex].bold = true;
            //            }
            //            row.cells[cellIndex].borderBottom = { color: "#000", size: 1 };
            //            row.cells[cellIndex].borderTop = { color: "#000", size: 1 };
            //            row.cells[cellIndex].borderRight = { color: "#000", size: 1 };
            //            row.cells[cellIndex].borderleft = { color: "#000", size: 1 };
            //        }
            //    }
            //},
            columns: [
                //{
                //    width: "30px",
                //    selectable: true,
                //    headerAttributes: {
                //        style: "text-align:left",
                //        class: "table-header-cell-checkbox"
                //    }
                //},
                //{
                //    title: "STT",
                //    template: "#= ++record #",
                //    width: "40px",
                //    attributes: {
                //        class: "text-center"
                //    },
                //    headerAttributes: {
                //        style: "text-align: center; font-size: 12px; font-weight:bold",
                //        class: "table-header-cell"
                //    }
                //},
                //{
                //    field: "ID",
                //    title: "ID",
                //    width: "50px",
                //    hidden: true,
                //    filterable: {
                //        cell: {
                //            operator: "contains",
                //            showOperators: false,
                //            template: function (e) {
                //                e.element.addClass("k-textbox").css("width", "100%")
                //            }
                //        }
                //    },
                //    headerAttributes: {
                //        style: "text-align: center; font-size: 12px; font-weight:bold",
                //        class: "table-header-cell"
                //    }
                //},
                {
                    field: "MaDeXuat",
                    title: "Mã Đề Xuất",
                    width: "120px",
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
                    field: "TenDeXuat",
                    title: "Tên Đề Xuất",
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
                    field: "NgayTao",
                    title: "Ngày Tạo",
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
                        class: "text-center"
                    }
                },
                //{
                //    field: "MaPhieuChi",
                //    title: "Mã Phiếu Chi",
                //    width: "120px",
                //    filterable: {
                //        cell: {
                //            operator: "contains",
                //            showOperators: false,
                //            template: function (e) {
                //                e.element.addClass("k-textbox").css("width", "100%")
                //            }
                //        }
                //    },
                //    headerAttributes: {
                //        style: "text-align: center; font-size: 12px; font-weight:bold",
                //        class: "table-header-cell"
                //    }
                //},
                {
                    field: "NoiDung",
                    title: "Nội dung",
                    width: "300",
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
                    field: "TenNhomChi",
                    title: "Danh mục chi",
                    width: "200",
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
                    field: "TenHangHoa",
                    title: "Hàng hóa đề xuất",
                    width: "200",
                    template: function (dataItem) {
                        return dataItem.TenHangHoa.replace(/\n/g, "<br>");
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
                //{
                //    field: "NguoiTao",
                //    title: "Người tạo",
                //    width: "60px",
                //    filterable: {
                //        cell: {
                //            operator: "contains",
                //            showOperators: false,
                //            template: function (e) {
                //                e.element.addClass("k-textbox").css("width", "100%")
                //            }
                //        }
                //    },
                //    headerAttributes: {
                //        style: "text-align: center; font-size: 12px; font-weight:bold",
                //        class: "table-header-cell"
                //    }
                //},
                //{
                //    field: "TenNguoiDuyet",
                //    title: "Người duyệt",
                //    width: "60px",
                //    template: function (dataItem) {
                //        return dataItem.TenNguoiDuyet.replace(/\n/g, "<br>");
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
                //    headerAttributes: {
                //        style: "text-align: center; font-size: 12px; font-weight:bold",
                //        class: "table-header-cell"
                //    },
                //},
                {
                    field: "ThoiGianPhanBo",
                    title: "Th/gian phân bổ",
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
                        class: "text-center"
                    },
                    template: function (e) {
                        return e.ThoiGianPhanBo + " tháng";
                    }
                },
                {
                    field: "ThoiGianKhauHao",
                    title: "Th/gian khấu hao",
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
                        class: "text-center"
                    },
                    template: function (e) {
                        return e.ThoiGianKhauHao + " tháng";
                    }
                },
                {
                    field: "ThoiGianDuKienSuDung",
                    title: "Thời gian sử dụng dự kiến",
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
                        class: "text-center"
                    }
                },
                {
                    field: "TongTien",
                    title: "Tổng tiền",
                    format: "{0:n0}",
                    aggregates: ["sum"],
                    width: "80px",
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
                        class: "text-center"
                    },
                }
                //{
                //    field: "TrangThaiDuyet",
                //    title: "Trạng thái duyệt",
                //    width: "100px",
                //    filterable: {
                //        cell: {
                //            operator: "contains",
                //            showOperators: false,
                //            template: function (e) {
                //                e.element.addClass("k-textbox").css("width", "100%");
                //            },
                //        }
                //    },
                //    headerAttributes: {
                //        style: "text-align: center; font-size: 12px; font-weight:bold",
                //        class: "table-header-cell"
                //    },
                //    attributes: {
                //        style: "text-align:center"
                //    },
                //    template: function (e) {
                //        if (e.TrangThaiDuyet === 3) {
                //            return "<span style='color: blue;'>Đề xuất đang chờ phê duyệt</span>";
                //        }
                //        else if (e.TrangThaiDuyet === 1) {
                //            return "<span style='color: green;'>Đề xuất đã được duyệt</span>";
                //        }
                //        else if (e.TrangThaiDuyet === 2) {
                //            return "<span style='color: red;'>Đề xuất đã bị từ chối!!!</span>";
                //        }
                //    }
                //}

            ]
        })
    })
}