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
                        GiaVon: { type: "number" },
                        GiaBanLe: { type: "number" },
                    }
                },

            },
            aggregate: [
                { field: "GiaVon", aggregate: "sum" },
                { field: "GiaBanLe", aggregate: "sum" }
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
            sheet.title = "Danh sách combo";
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
                        let src = '../Images/AnhCombo/' + dataItem.HinhAnhSanPham;
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
                field: "MaCombo",
                title: "Mã Combo",
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
                field: "TenCombo",
                title: "Tên Combo",
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
                field: "GiaVon",
                title: "Giá Vốn",
                format: "{0:n0}",
                aggregates: ["sum"],
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
                footerTemplate: "<div>Tổng: #= kendo.toString(sum, 'n0') #</div>"

            },
            {
                field: "GiaBanLe",
                title: "Giá Bán Lẻ",
                format: "{0:n0}",
                aggregates: ["sum"],
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
                footerTemplate: "<div>Tổng: #= kendo.toString(sum, 'n0') #</div>"

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
                field: "NoiDung",
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
    $("#gridChiTiet").kendoGrid({
        height: function () {
            var height = $(window).height() - 380;
            return height;
        },
        dataSource: new kendo.data.DataSource({
            data: [],
            schema: {
                model: {
                    id: "ID",
                    
                },

            },
            pageSize: 50,
        }),
        scrollable: true,
        persistSelection: true,
        autoFitColumn: true,
        resizable: true,
        pageable: pageableShort,
        editable: true,
        filterable: {
            mode: "row",
        },
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
                field: "Name_DanhMucHangHoa",
                title: "Tên hàng hóa",
                template: function (e) {
                    if (e.Name_DanhMucHangHoa) {
                        return e.Name_DanhMucHangHoa;
                    } else {
                        return "";
                    }
                },
                width: "250px",
                filterable: {
                    cell: {
                        operator: "contains",
                        showOperators: false,
                        template: function (e) {
                            e.element.parent().html("<a class='k-button' title='Thêm' style='width:100%; height:25px;' onclick='AddNewRow()'><i class='fa fa-plus'></i></a>")
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

                                options.model.ID = model.ID;
                                options.model.GiaBanCombo = model.GiaBanBuon;
                                options.model.GiaBanLe = model.GiaBanLe;
                                options.model.Name_DanhMucHangHoa = model.Ten;
                                setTimeout(function () {
                                    $("#gridChiTiet").data("kendoGrid").refresh();
                                })
                            }
                        });
                },
            },
            {
                field: "SoLuong",
                title: "Số lượng",
                width: "100px",
                format: "{0:N0}",
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
                editor: function (container, options) {
                    var numericTextBox = $('<input name="' + options.field + '"/>').appendTo(container).kendoNumericTextBox({
                        culture: "vi-VN",
                        change: function (e) {
                            updateGiaCombo();
                            updateGiaNhap();
                        }
                    }).data("kendoNumericTextBox");

                    numericTextBox.element.on("keydown", function (e) {
                        if (e.keyCode === 13) {
                            e.preventDefault();
                            updateGiaCombo();
                            updateGiaNhap();
                        }
                    });
                },
            },
            {
                field: "GiaBanCombo",
                title: "Giá phân bổ trong Combo",
                format: "{0:N0}",
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
                field: "GiaBanLe",
                title: "Giá Nhập Sản Phẩm",
                format: "{0:N0}",
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

        ]
    });
    $("#grid").on("dblclick", "tr[role='row']", function () {
        $("#grid").data("kendoGrid").clearSelection();
        var row = $("#grid").data("kendoGrid").table.find("[data-uid=" + $(this).attr("data-uid") + "]");
        $("#grid").data("kendoGrid").select(row);
        Sua();
    })

    $("#fileDMCB").kendoUpload({
        multiple: false,
        localization: {
            select: 'Tải file ảnh danh mục combo',
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
    LoadGridData();
    $.ajax({
        url: '/DanhMucComboHangHoa/GetAllDonViTinh',
        type: 'GET',
    }).done(function (response) {
        if (response && response.length > 0) {
            $("#DonViTinh").kendoComboBox({
                dataSource: response.map(function (item) {
                    return item.DonViTinh;
                })
            });
        }
    });

    $("#dialogRoot").kendoDialog().data("kendoDialog").close();

})
function PushFormDataFile(file, callback) {
    var data = new FormData();
    data.append('file', file.rawFile, file.name);

    var t = $.ajax({
        url: '/DanhMucComboHangHoa/UploadAnh',
        processData: false,
        contentType: false,
        data: data,
        type: 'POST'
    }).done(function successCallback(response) {
        path = response.fileName;
        callback(path)
    });
}
function updateGiaCombo() {
    var grid = $("#gridChiTiet").data("kendoGrid");
    var dataItems = grid.dataSource.data();
    var giaVon = 0;

    for (var i = 0; i < dataItems.length; i++) {
        var giaVon = giaVon + dataItems[i].GiaBanCombo * dataItems[i].SoLuong; 
    }

    $("#GiaVon").val(giaVon.toLocaleString('vi-VN'));
}
function updateGiaNhap() {
    var grid = $("#gridChiTiet").data("kendoGrid");
    var dataItems = grid.dataSource.data();
    var giaNhap = 0;

    for (var i = 0; i < dataItems.length; i++) {
        var giaNhap = giaNhap + dataItems[i].GiaBanLe * dataItems[i].SoLuong;
    }

    $("#GiaBanLe").val(giaNhap.toLocaleString('vi-VN'));
}
function LoadGridData() {
    $.ajax({
        url: '/DanhMucComboHangHoa/GetAll',
        type: 'GET',
    }).done(function successCallback(response) {
        kendo.ui.progress($("#grid"), true);
        var dataSource = new kendo.data.DataSource({
            data: response,
            schema: {
                model: {
                    id: "ID",
                    fields: {
                        GiaVon: { type: "number" },
                        GiaBanLe: { type: "number" },
                    }
                },

            },
            aggregate: [
                { field: "GiaVon", aggregate: "sum" },
                { field: "GiaBanLe", aggregate: "sum" }
            ],
            pageSize: 50,
        });

        $("#grid").data("kendoGrid").setDataSource(dataSource);
        kendo.ui.progress($("#grid"), false);
    });
}
function LoadGridDataDetail(ID) {
    $.ajax({
        url: '/DanhMucComboHangHoa/GetAllChiTiet?ID=' + ID,
        type: 'GET',
    }).done(function successCallback(response) {
        kendo.ui.progress($("#gridChiTiet"), true);
        var dataSource = new kendo.data.DataSource({
            data: response,
            schema: {
                model: {
                    id: "ID",
                },
            },
            pageSize: 50,
        });

        $("#gridChiTiet").data("kendoGrid").setDataSource(dataSource);
        kendo.ui.progress($("#gridChiTiet"), false);
    });
}
function ThemMoi() {
    document.getElementById("formChiTiet").reset();
    $("#ID").val(0);
    $("#window").data("kendoWindow").center().maximize().open();

    LoadGridDataDetail(-1);
    $("#preview").empty();
    $("#buttomXoa").hide();
    $("#HinhAnh").val("khongcohinhanh.jpg");
    $("#grid").data("kendoGrid").clearSelection();
}
function XemDMCB(HinhAnhSanPham) {
    let src = '../Images/AnhCombo/' + HinhAnhSanPham;
    $('<img src="' + src + '" alt="" style="width: 100px;height: 100px;">').appendTo($("#preview"));
}
function Sua() {
    var arr = $("#grid").data("kendoGrid").selectedKeyNames();
    if (arr.length != 1) {
        openDialog($("#dialogRoot").data("kendoDialog"), "Vui lòng chọn 1 bản ghi để sửa");
    } else {
        $("#window").data("kendoWindow").center().maximize().open();


        var selectedItem = $("#grid").data("kendoGrid").dataItem($("#grid").data("kendoGrid").select());

        $("#ID").val(selectedItem.ID);
        $("#MaCombo").val(selectedItem.MaCombo);
        $("#TenCombo").val(selectedItem.TenCombo);
        $("#DonViTinh").data("kendoComboBox").value(selectedItem.DonViTinh);

        $("#preview").empty();
        $("#HinhAnh").val(selectedItem.HinhAnhSanPham);
        XemDMCB(selectedItem.HinhAnhSanPham);

        if (selectedItem.HinhAnhSanPham === "khongcohinhanh.jpg") {
            $("#buttomXoa").hide();
        } else {
            $("#buttomXoa").show();
        }

        $("#GiaVon").val(selectedItem.GiaVon.toLocaleString('vi-VN'));
        $("#GiaBanLe").val(selectedItem.GiaBanLe.toLocaleString('vi-VN'));
        $("#MoTaSanPham").val(selectedItem.NoiDung);
    }
    LoadGridDataDetail(selectedItem.ID);
    $("#grid").data("kendoGrid").clearSelection();
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
        notification.show({ kValue: 'Vui lòng chọn combo!!!' }, "error");
    }
    else {
        $.ajax({
            url: '/DanhMucComboHangHoa/Delete?ID=' + selectedIdsString,
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
function LuuCombo() {
    var validmc = SetValidate("MaCombo");
    var validtc = SetValidate("TenCombo");
    var validgv = SetValidate("GiaVon");
    var validgbl = SetValidate("GiaBanLe");
    var validdvt = SetValidate("DonViTinh");
    
    var upload = $("#fileDMCB").getKendoUpload().getFiles();
    if (validmc && validtc && validgv && validgbl && validdvt != null) {
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
function LuuData(path) {
    var listChiTiet = [];
    $.each($("#gridChiTiet").data("kendoGrid").dataSource.data(), function (index, item) {
        listChiTiet.push({
            ID_DanhMucCombo: $("#ID").val(),
            ID_DanhMucHangHoa: item.ID === undefined ? item.ID_DanhMucHangHoa : item.ID,
            SoLuong: item.SoLuong,
            GiaBanLe: item.GiaBanLe,
            GiaBanCombo: item.GiaBanCombo,
        })
    });

    if ($("#ID").val() == 0) {
        var model = {
            MaCombo: $("#MaCombo").val(),
            TenCombo: $("#TenCombo").val(),
            GiaVon: parseFloat($("#GiaVon").val().replace(/\D/g, '')),
            GiaBanLe: parseFloat($("#GiaBanLe").val().replace(/\D/g, '')),
            DonViTinh: $("#DonViTinh").val(),
            HinhAnhSanPham: path,
            NoiDung: ($("#MoTaSanPham").val() !== null && $("#MoTaSanPham").val() !== "") ? $("#MoTaSanPham").val() : "Mô tả",
            DanhMucComboHangHoa: listChiTiet,
        }
        $.ajax({
            url: '/DanhMucComboHangHoa/Create',
            data: model,
            type: 'POST',
        }).done(function successCallback(response) {
            if (response.status) {
                notification.show({ kValue: response.msg }, "success");
                HuyCombo();
                LoadGridData();
            } else {
                notification.show({ kValue: response.msg }, "error");
            }
        });
    }
    else {
        var model = {
            ID: $("#ID").val(),
            MaCombo: $("#MaCombo").val(),
            TenCombo: $("#TenCombo").val(),
            GiaVon: parseFloat($("#GiaVon").val().replace(/\D/g, '')),
            GiaBanLe: parseFloat($("#GiaBanLe").val().replace(/\D/g, '')),
            DonViTinh: $("#DonViTinh").val(),
            HinhAnhSanPham: path,
            NoiDung: ($("#MoTaSanPham").val() !== null && $("#MoTaSanPham").val() !== "") ? $("#MoTaSanPham").val() : "Mô tả",
            DanhMucComboHangHoa: listChiTiet,
        }

        $.ajax({
            url: '/DanhMucComboHangHoa/Update',
            data: model,
            type: 'POST',
        }).done(function successCallback(response) {
            if (response.status) {
                notification.show({ kValue: response.msg }, "success");
                HuyCombo();
                LoadGridData();
            } else {
                notification.show({ kValue: response.msg }, "error");
            }
        });
    }
}
function HuyCombo() {
    document.getElementById("formChiTiet").reset();
    $("#ID").val('');
    $("#preview").empty();
    $("#window").data("kendoWindow").close();
}
function AddNewRow() {
    var grid = $("#gridChiTiet").data("kendoGrid");
    grid.addRow();
}
function clearImage() {
    event.preventDefault();
    $("#preview").empty();
    $("#HinhAnh").val("khongcohinhanh.jpg");
    $("#fileDMCB").val("");
};