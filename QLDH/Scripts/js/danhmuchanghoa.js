var path = "";
$(document).ready(function () {
    $("#window").kendoWindow({
        width: "800px",
        height: "500px",
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
        dataSource: new kendo.data.DataSource({
            data: [],
            schema: {
                model: {
                    id: "ID",
                    fields: {
                        GiaBanLe: { type: "number" },
                        GiaNhap: { type: "number" },
                        GiaBanBuon: { type: "number" },
                        TongNhap: { type: "number" },
                        TongBanLe: { type: "number" },
                    }
                },

            },
            aggregate: [
                { field: "GiaBanLe", aggregate: "sum" },
                { field: "GiaNhap", aggregate: "sum" },
                { field: "GiaBanBuon", aggregate: "sum" },
                { field: "TongNhap", aggregate: "sum" },
                { field: "TongBanLe", aggregate: "sum" },
            ],
            pageSize: 50,
        }),
        pageable: pageableShort,
        dataBinding: function () {
            record = (this.dataSource.page() - 1) * this.dataSource.pageSize();
        },
        excel: {
            filterable: true
        },
        excelExport: function (e) {
            var columns = e.workbook.sheets[0].columns;
            var sheet = e.workbook.sheets[0];
            sheet.title = "Danh sách hàng hóa";
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
                field: "HinhAnhSanPham",
                title: "Hình Ảnh Sản Phẩm",
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
                    class: "text-center"
                },
                template: function (dataItem) {
                    if (dataItem.HinhAnhSanPham == null || dataItem.HinhAnhSanPham == '')
                        return ''
                    else {
                        let src = '../Images/AnhHangHoa/' + dataItem.HinhAnhSanPham;
                        return '<img src="' + src + '" alt="" class="rounded-circle" style="width: 100px;height: 100px;">';
                    }
                },
            },
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
                field: "MaHang",
                title: "Mã Hàng",
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
                field: "Ten",
                title: "Tên Hàng Hóa",
                width: "150",
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
            },           
            {
                field: "DonViTinh",
                title: "Đơn Vị Tính",
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
            },
            {
                field: "LoaiSanPham",
                title: "Loại Sản Phẩm",
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
                    class: "text-center"
                },
            },
            {
                field: "SoLuongTonToiThieu",
                title: "Số Lượng Tồn",
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
                field: "GiaBanLe",
                title: "Giá Bán Lẻ",
                format: "{0:n0}",
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
                },
                attributes: {
                    class: "text-center"
                },
            },
            {
                field: "GiaNhap",
                title: "Giá Nhập",
                format: "{0:n0}",
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
                },
                attributes: {
                    class: "text-center"
                },
            },
            {
                field: "GiaBanBuon",
                title: "Giá Bán Buôn",
                format: "{0:n0}",
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
                },
                attributes: {
                    class: "text-center"
                },
            },
            {
                field: "TongNhap",
                title: "Giá trị tồn kho",
                format: "{0:n0}",
                aggregates: ["sum"],
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
                },
                attributes: {
                    class: "text-center"
                },
                footerTemplate: "<div>Tổng: #= kendo.toString(sum, 'n0') #</div>"

            }, {
                field: "TongBanLe",
                title: "Giá trị bán lẻ dự kiến",
                format: "{0:n0}",
                aggregates: ["sum"],
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
                },
                attributes: {
                    class: "text-center"
                },
                footerTemplate: "<div>Tổng: #= kendo.toString(sum, 'n0') #</div>"

            },           
            {
                field: "MoTaSanPham",
                title: "Mô Tả Sản Phẩm",
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
                },
                attributes: {
                    class: "text-center"
                },
            },
        ]

    });
    $("#grid").on("dblclick", "tr[role='row']", function () {
        $("#grid").data("kendoGrid").clearSelection();
        var row = $("#grid").data("kendoGrid").table.find("[data-uid=" + $(this).attr("data-uid") + "]");
        $("#grid").data("kendoGrid").select(row);
        Sua();
    })

    LoadGridData();

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
    

    $("#dialogRoot").kendoDialog().data("kendoDialog").close();

})
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
function LoadGridData() {
    $.ajax({
        url: '/DanhMucHangHoa/GetAll',
        type: 'GET',
    }).done(function successCallback(response) {
        kendo.ui.progress($("#grid"), true);
        var dataSource = new kendo.data.DataSource({
            data: response,
            schema: {              
                model: {
                    id: "ID",
                    fields: {
                        GiaBanLe: { type: "number" },
                        GiaNhap: { type: "number" },
                        GiaBanBuon: { type: "number" },
                        TongNhap: { type: "number" },
                        TongBanLe: { type: "number" },
                    }
                },
                
            },         
            aggregate: [
                { field: "GiaBanLe", aggregate: "sum" },
                { field: "GiaNhap", aggregate: "sum" },
                { field: "GiaBanBuon", aggregate: "sum" },
                { field: "TongNhap", aggregate: "sum" },
                { field: "TongBanLe", aggregate: "sum" }
            ],
            pageSize: 50,
        });

        $("#grid").data("kendoGrid").setDataSource(dataSource);
        kendo.ui.progress($("#grid"), false);
    });
}
function ThemMoi() {
    document.getElementById("formChiTiet").reset();
    $("#ID").val(0);
    if ($(window).width() > 800) {
        $("#window").data("kendoWindow").center().open();
    } else {
        $("#window").data("kendoWindow").center().maximize().open();
    }

    $("#preview").empty();
    $("#HinhAnh").val("khongcohinhanh.jpg");
    $("#buttomXoa").hide();
}
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
function XemDMHH(HinhAnhSanPham) {
    let src = '../Images/AnhHangHoa/' + HinhAnhSanPham;
    $('<img src="' + src + '" alt="" style="width: 100px;height: 100px;">').appendTo($("#preview"));
}
function Sua() {
    var arr = $("#grid").data("kendoGrid").selectedKeyNames();
    if (arr.length != 1) {
        openDialog($("#dialogRoot").data("kendoDialog"), "Vui lòng chọn 1 bản ghi để sửa");
    } else {
        if ($(window).width() > 800) {
            $("#window").data("kendoWindow").center().open();
        } else {
            $("#window").data("kendoWindow").center().maximize().open();
        }
        
        var selectedItem = $("#grid").data("kendoGrid").dataItem($("#grid").data("kendoGrid").select());

        $("#ID").val(selectedItem.ID);
        $("#MaHang").val(selectedItem.MaHang);
        $("#TenHangHoa").val(selectedItem.Ten);
        $("#DonViTinh").data("kendoComboBox").value(selectedItem.ID_DonViTinh);
        $("#LoaiSanPham").data("kendoComboBox").value(selectedItem.ID_LoaiSanPham);
        $("#SoLuongTonToiThieu").val(selectedItem.SoLuongTonToiThieu);
        $("#GiaBanLe").val(selectedItem.GiaBanLe.toLocaleString('vi-VN'));
        $("#GiaNhap").val(selectedItem.GiaNhap.toLocaleString('vi-VN'));
        $("#preview").empty();
        $("#HinhAnh").val(selectedItem.HinhAnhSanPham);

        if (selectedItem.HinhAnhSanPham === "khongcohinhanh.jpg") {
            $("#buttomXoa").hide();
        } else {
            $("#buttomXoa").show();
        }

        XemDMHH(selectedItem.HinhAnhSanPham);
        $("#GiaBanBuon").val(selectedItem.GiaBanBuon.toLocaleString('vi-VN'));
        $("#MoTaSanPham").val(selectedItem.MoTaSanPham);
    }
}
function Xoa() {
    var selectedIds = [];
    var grid = $("#grid").data("kendoGrid");
    var selectedDataItems = grid.select();

    selectedDataItems.each(function (index, element) {
        var dataItem = grid.dataItem(element);
        selectedIds.push(dataItem.ID);
    });
    var selectedIdsString = selectedIds.join(',');

    if (selectedIdsString.length === 0) {
        notification.show({ kValue: 'Vui lòng chọn danh mục hàng hóa!!!' }, "error");
    }
    else {
        $.ajax({
            url: '/DanhMucHangHoa/Delete?ID=' + selectedIdsString,
            type: 'POST'
        }).done(function (response) {
            if (response.status) {
                LoadGridData();
                grid.clearSelection();
                notification.show({ kValue: response.msg }, "success");           
            } else {          
                notification.show({ kValue: response.msg }, "error");
            }
        })
    }
}
function XuatExcel() {
    var grid = $('#grid').data('kendoGrid');

    grid.options.excel = {
        fileName: "DanhMucHangHoa.xlsx",
        filterable: true,
        allPages: true
    }
    grid.saveAsExcel();
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
                LuuData(path)
            });
        }
        else {
            LuuData($("#HinhAnh").val());
        }
    }  
}
function HuyHangHoa() {
    document.getElementById("formChiTiet").reset();
    $("#ID").val('');
    $("#preview").empty();
    $("#window").data("kendoWindow").close();
}
function LuuData(path) {
    console.log
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