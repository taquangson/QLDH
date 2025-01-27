var selectedDanhMuc;
$(document).ready(function () {

    $("#rootContainer").show();
    $("#dialogRoot").kendoDialog().data("kendoDialog").close();
    $("#gridCauHoi").kendoGrid({
        height: function () {
            var height = $(window).height() - 155;
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
                hidden: true,
                headerAttributes: {
                    style: "text-align:left",
                    class: "table-header-cell-checkbox"
                }
            },
            {
                title: " ",
                field: 'ID',
                template: function (e) {
                    return "<i onclick='XoaTroChoi(\"" + e.uid + "\"," + e.ID + ")' style='color:red;width:100%;height:15px;cursor:pointer' class='fa fa-trash'></i>";
                },
                width: 60,
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
                            e.element.parent().html("<a class='k-button' title='Thêm câu hỏi' style='width:100%; height:25px;' onclick='openWindowCauHoi()'><i class='fa fa-plus'></i></a>")
                        }
                    }
                },
            },
            {
                title: "STT",
                template: "#= ++record #",
                width: "80px",
                attributes: {
                    class: "text-center"
                },
                headerAttributes: {
                    style: "text-align: center; font-size: 12px; font-weight:bold",
                    class: "table-header-cell"
                }
            },
            {
                field: "TenTroChoi",
                title: "Tên trò chơi",
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
                field: "Loai",
                title: "Loại trò chơi",
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
                    switch (e.Loai) {
                        default: return "";
                        case 1: return "Sắp xếp";
                        case 2: return "Lắp ghép";
                        case 3: return "Điền vào chỗ trống";

                    }
                },
                headerAttributes: {
                    style: "text-align: center; font-size: 12px; font-weight:bold",
                    class: "table-header-cell"
                }
            },
            {
                field: "NoiDung",
                title: "Nội dung",
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
            }
        ]

    });
    $("#gridDapAn").kendoGrid({
        height: function () {
            var height = $(window).height() - 220;
            return height;
        },
        dataSource: new kendo.data.DataSource({
            data: [],
            schema: {
                model: {
                    id: "id",
                    fields: {
                        ID: { type: 'number', editable: false },
                        ID_TroChoi: { type: 'number', editable: false },
                        NoiDung: { type: 'text', editable: true },
                        DapAn: { type: 'text', editable: true },
                        HinhAnh: { type: 'text', editable: true },
                        AmThanh: { type: 'text', editable: true },
                        ThuTu: { type: 'number', min: 1, editable: true },
                        IsDapAnDung: { type: 'boolean', editablle: true }
                    }
                }
            },
            pageSize: 100
        }),
        editable: true,
        //editable: { mode: "row" },
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
            //var grid = this;
            //this.tbody.find("input[name=files]").kendoUpload({
            //    multiple: false,
            //    select: function (e) {
            //        console.log(e);
            //        var fileInfo = e.files[0];
            //        setTimeout(function () {
            //            var item = grid.dataItem(e.sender.element.closest("tr"));
            //            PushFormDataFileGrid(fileInfo, item);
            //        })
            //    },
            //    remove: function (e) {
            //        var item = grid.dataItem(e.sender.element.closest("tr"));
            //        item.HinhAnh = "";
            //    }
            //}).closest(".k-upload").find("span").text("Chọn ảnh");

            //this.tbody.find("input[name=files2]").kendoUpload({
            //    multiple: false,
            //    select: function (e) {
            //        console.log(e);
            //        var fileInfo = e.files[0];
            //        setTimeout(function () {
            //            var item = grid.dataItem(e.sender.element.closest("tr"));
            //            PushFormDataFileGrid2(fileInfo, item);
            //        })
            //    },
            //    remove: function (e) {
            //        var item = grid.dataItem(e.sender.element.closest("tr"));
            //        item.AmThanh = "";
            //    }
            //}).closest(".k-upload").find("span").text("Chọn âm thanh");
        },
        save: function (e) {
            setTimeout(function () {
                e.sender.refresh();
                e.sender.dataSource.fetch(function () {
                });
            });
        },
        columns: [
            {
                title: " ",
                field: 'ID',
                template: function (e) {
                    return "<i onclick='XoaDapAn(\"" + e.uid + "\"," + e.ID + ")' title='Xoá đáp án' style='color:red;width:100%;height:15px;cursor:pointer' class='fa fa-trash'></i>";
                },
                width: 30,
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
                            e.element.parent().html("<a class='k-button' title='Thêm đáp án' style='width:100%; height:25px;' onclick='ThemDapAn()'><i class='fa fa-plus'></i></a>")
                        }
                    }
                },
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
                field: "NoiDung",
                title: "Nội dung đáp án",
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
                editor: function (container, options) {
                    let html = "<textarea class='k-textbox' rows='2' name='" + options.field + "'></textarea>";
                    $(html).appendTo(container);
                }
            },
            {
                field: "DapAn",
                title: "Đáp án",
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
                editor: function (container, options) {
                    let html = "<textarea class='k-textbox' rows='2' name='" + options.field + "'></textarea>";
                    $(html).appendTo(container);
                }
            },
            {
                field: "HinhAnh",
                title: "Hình ảnh",
                width: "120px",
                template: function (e) {
                    if (e.HinhAnh != null && e.HinhAnh != "") {
                        return "<img src='" + e.HinhAnh + "' class='avatar' style ='float:none;'></a>";
                    } else {
                        return "";
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
                attributes: { class: "text-center" },
                headerAttributes: {
                    style: "text-align: center; font-size: 12px; font-weight:bold",
                    class: "table-header-cell"
                }
            },
            {
                field: "AmThanh",
                title: "Âm thanh",
                width: "120px",
                template: function (e) {
                    if (e.AmThanh != null && e.AmThanh != "") {
                        return "<a href='" + e.AmThanh + "' target='_blank'>Âm thanh</a>";
                    } else {
                        return "";
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
                attributes: { class: "text-center" },
                headerAttributes: {
                    style: "text-align: center; font-size: 12px; font-weight:bold",
                    class: "table-header-cell"
                }
            },
            {
                field: "ThuTu",
                title: "Thứ tự sắp xếp",
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
                field: "IsDapAnDung",
                title: "Đáp án đúng",
                width: "80px",
                template: function (e) {
                    if (e.IsDapAnDung) {
                        return "Đúng"
                    } else {
                        return "Sai"
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
                },
                attributes: {
                    style: "text-align: center;",
                }
            }

        ]

    });

    $("#gridCauHoi").on("dblclick", "tr[role='row']", function () {
        $("#gridCauHoi").data("kendoGrid").clearSelection();
        var row = $("#gridCauHoi").data("kendoGrid").table.find("[data-uid=" + $(this).attr("data-uid") + "]");
        $("#gridCauHoi").data("kendoGrid").select(row);
        openEditWindow();
    })


    $("#windowCauHoi").kendoWindow({
        modal: true,
        resizable: false,
        visible: false,
        title: "Thông tin trò chơi"
    });

    $("#NoiDung").kendoEditor({
        tools: [
            "bold",
            "italic",
            "underline",
            "strikethrough",
            "justifyLeft",
            "justifyCenter",
            "justifyRight",
            "justifyFull",
            "insertUnorderedList",
            "insertOrderedList",
            "indent",
            "outdent",
            "createLink",
            "unlink",
            "insertImage",
            "insertFile",
            "subscript",
            "superscript",
            "tableWizard",
            "createTable",
            "addRowAbove",
            "addRowBelow",
            "addColumnLeft",
            "addColumnRight",
            "deleteRow",
            "deleteColumn",
            "mergeCellsHorizontally",
            "mergeCellsVertically",
            "splitCellHorizontally",
            "splitCellVertically",
            "viewHtml",
            "formatting",
            "cleanFormatting",
            "copyFormat",
            "applyFormat",
            "fontName",
            "fontSize",
            "foreColor",
            "backColor",
            "print"
        ],
        messages: {
            bold: "Bold",
            italic: "Italic",
            underline: "Underline",
            strikethrough: "Strikethrough",
            superscript: "Superscript",
            subscript: "Subscript",
            justifyCenter: "Center text",
            justifyLeft: "Align text left",
            justifyRight: "Align text right",
            justifyFull: "Justify",
            insertUnorderedList: "Insert unordered list",
            insertOrderedList: "Insert ordered list",
            indent: "Indent",
            outdent: "Outdent",
            createLink: "Insert hyperlink",
            unlink: "Remove hyperlink",
            insertImage: "Thêm ảnh",
            insertFile: "Thêm file",
            insertHtml: "Thêm mã html",
            fontName: "Chọn font chữ",
            fontNameInherit: "(Mặc định)",
            fontSize: "Chọn cỡ chữ",
            fontSizeInherit: "(Mặc định)",
            formatBlock: "Định dạng",
            formatting: "Định dạng",
            style: "Styles",
            viewHtml: "Xem dưới dạng mã html",
            overwriteFile: "Tệp có tên \"{0}\" đã tồn tại trong thư mục. Bạn có muốn ghi đè?",
            imageWebAddress: "Địa chỉ ảnh",
            imageAltText: "Mô tả ảnh",
            fileWebAddress: "Địa chỉ file",
            fileTitle: "Mô tả file",
            linkWebAddress: "Link web",
            linkText: "Mô tả",
            linkToolTip: "Chữ nổi",
            linkOpenInNewWindow: "Mở link trên tab mới",
            dialogInsert: "Thêm",
            dialogUpdate: "Cập nhật",
            dialogCancel: "Hủy",
            dialogCancel: "Hủy",
            createTable: "Tạo bảng",
            addColumnLeft: "Thêm cột bên trái",
            addColumnRight: "Thêm cột bên phải",
            addRowAbove: "Thêm dòng bên trên",
            addRowBelow: "Thêm dòng bên dưới",
            deleteRow: "Xóa dòng",
            deleteColumn: "Xóa cột",
            imageWidth: "Độ rộng (px)",
            imageHeight: "Độ cao (px)"
        }
    });
    $("#HinhAnh").kendoUpload({
        multiple: false,
        localization: {
            select: 'Tải ảnh câu hỏi',
            remove: '',
            cancel: ''
        },
        allowedExtensions: [".jpg", ".png", ".jpeg", ".ico"],
        select: function (e) {
            let files = e.files[0];
            if (files.extension.toLowerCase() != ".jpg" && files.extension.toLowerCase() != ".png" && files.extension.toLowerCase() != ".jpeg") {
                e.preventDefault();
                notification.show({ kValue: "Vui lòng chọn đúng định dạng" + " .jpg;.png;.jpeg;.ico" }, "error");
            } else {
                PushFormDataFile(e.files[0]);
            }
        }
    });

    $("#AmThanh").kendoUpload({
        multiple: false,
        localization: {
            select: 'Tải file âm thanh',
            remove: '',
            cancel: ''
        },
        allowedExtensions: [".mp3"],
        select: function (e) {
            let files = e.files[0];
            if (files.extension.toLowerCase() != ".mp3") {
                e.preventDefault();
                notification.show({ kValue: "Vui lòng chọn đúng định dạng" + ".mp3" }, "error");
            } else {
                PushFormDataFile2(e.files[0]);
            }
        }
    });

    $("#LoaiTroChoi").kendoComboBox({
        dataTextField: 'text',
        dataValueField: 'value',
        dataSource: new kendo.data.DataSource({
            data: [
                { text: 'Sắp xếp', value: 1 },
                { text: 'Lắp ghép', value: 2 },
                { text: 'Điền vào chỗ trống', value: 3 },
            ]
        })
    });

    LoadGridTroChoi();
})

function ThemDanhMuc() {
    document.getElementById("formDanhMuc").reset();
    $("#ID").val(0);
    $("#windowDanhMuc").data("kendoWindow").center().open();
}


function openWindowCauHoi() {
    HuyCauHoi();
    $("#windowCauHoi").data("kendoWindow").center().open().maximize();
}

function PushFormDataFile(file) {
    var data = new FormData();
    data.append('file', file.rawFile, file.name);
    var t = $.ajax({
        url: '/TracNghiem/UploadAnh',
        processData: false,
        contentType: false,
        data: data,
        type: 'POST'
    }).done(function successCallback(response) {
        if (response.status) {
            $("#HinhAnh").data("kendoUpload").clearAllFiles();
            $("#HinhAnhFile").val(response.msg);
        } else {
            notification.show({ kValue: response.msg }, "error");
        }
    });
}

function PushFormDataFile2(file) {
    var data = new FormData();
    data.append('file', file.rawFile, file.name);
    var t = $.ajax({
        url: '/TracNghiem/UploadAnh',
        processData: false,
        contentType: false,
        data: data,
        type: 'POST'
    }).done(function successCallback(response) {
        if (response.status) {
            $("#AmThanh").data("kendoUpload").clearAllFiles();
            $("#AmThanhFile").val(response.msg);
        } else {
            notification.show({ kValue: response.msg }, "error");
        }
    });
}

function PushFormDataFileGrid(fileInfo, item) {
    var data = new FormData();
    data.append('file', fileInfo.rawFile, fileInfo.name);
    var t = $.ajax({
        url: "/TroChoi/UploadAnhDapAn",
        processData: false,
        contentType: false,
        data: data,
        type: 'POST'
    }).done(function successCallback(response) {
        if (response.status) {
            notification.show({ kValue: "Upload thành công" }, "success");
            item.HinhAnh = response.msg;
            //$("#gridDapAn").data("kendoGrid").refresh();
        } else {
            notification.show({ kValue: "Upload thất bại, vui lòng thử lại" }, "error");
        }
    });
}

function PushFormDataFileGrid2(fileInfo, item) {
    var data = new FormData();
    data.append('file', fileInfo.rawFile, fileInfo.name);
    var t = $.ajax({
        url: "/TroChoi/UploadAnhDapAn",
        processData: false,
        contentType: false,
        data: data,
        type: 'POST'
    }).done(function successCallback(response) {
        if (response.status) {
            notification.show({ kValue: "Upload thành công" }, "success");
            item.AmThanh = response.msg;
            //$("#gridDapAn").data("kendoGrid").refresh();
        } else {
            notification.show({ kValue: "Upload thất bại, vui lòng thử lại" }, "error");
        }
    });
}

function ThemDapAn(e) {
    var grid = $("#gridDapAn").data("kendoGrid");
    grid.addRow();
}

function XoaDapAn(uid, id) {
    var dataRow = $('#gridDapAn').data("kendoGrid").dataSource.getByUid(uid);
    $('#gridDapAn').data("kendoGrid").dataSource.remove(dataRow);
}

function HuyCauHoi() {
    document.getElementById("formCauHoi").reset();
    var ds = new kendo.data.DataSource({
        data: [],
        schema: {
            model: {
                id: "id",
                fields: {
                    ID: { type: 'number', editable: false },
                    ID_CauHoi: { type: 'number', editable: false },
                    DapAn: { type: 'text', editable: true },
                    AnhDapAn: { type: 'text', editable: false },
                    IsDapAnDung: { type: 'boolean', editablle: true },
                    ThuTu: { type: 'number', min: 1, editablle: true }
                }
            }
        },
        pageSize: 100
    });
    $("#gridDapAn").data("kendoGrid").setDataSource(ds);
    $("#NoiDung").data("kendoEditor").value("");
    $("#ID_TroChoi").val('0');
    $("#windowCauHoi").data("kendoWindow").close();
}

function LuuCauHoi() {
    var validnoidung = SetValidate("NoiDung");
    var validten = SetValidate("TenTroChoi");
    var validloai = SetValidate("LoaiTroChoi");
    var valid = validten && validnoidung && validloai;
    if (valid) {
        var cauhoi = {
            ID: $("#ID_TroChoi").val(),
            TenTroChoi: $("#TenTroChoi").val(),
            Loai: $("#LoaiTroChoi").data("kendoComboBox").value(),
            HinhAnh: $("#HinhAnhFile").val(),
            AmThanh: $("#AmThanhFile").val(),
            NoiDung: $("#NoiDung").data("kendoEditor").value(),
        };
        var dsdapan = [];
        $.each($("#gridDapAn").data("kendoGrid").dataSource.data(), function (index, item) {
            dsdapan.push({
                ID: item.ID,
                ID_TroChoi: $("#ID_CauHoi").val(),
                DapAn: item.DapAn,
                NoiDung: item.NoiDung,
                HinhAnh: item.HinhAnh,
                AmThanh: item.AmThanh,
                ThuTu: item.ThuTu,
                IsDapAnDung: item.IsDapAnDung ? 1 : 0,
            })
        })
        cauhoi.lstDapAn = dsdapan;
        $.ajax({
            url: '/TroChoi/TroChoi_InsertOrUpdate',
            type: 'POST',
            data: cauhoi
        }).done(function successCallback(response) {
            if (response.status) {
                notification.show({ kValue: response.msg }, "success");
                HuyCauHoi();
                LoadGridTroChoi();
            } else {
                notification.show({ kValue: response.msg }, "error");
            }
        });
    }
    //}
}

function LoadGridTroChoi() {
    $.ajax({
        url: '/TroChoi/GetAllTroChoi',
        type: 'GET',
    }).done(function successCallback(response) {
        kendo.ui.progress($("#gridCauHoi"), true);
        var dataSource = new kendo.data.DataSource({
            data: JSON.parse(response),
            schema: {
                model: {
                    id: "ID"
                }
            },
            pageSize: 20,
        });
        $("#gridCauHoi").data("kendoGrid").setDataSource(dataSource);
        kendo.ui.progress($("#gridCauHoi"), false);
    });
}



function openEditWindow() {
    var arr = $("#gridCauHoi").data("kendoGrid").selectedKeyNames();
    if (arr.length != 1) {
        openDialog($("#dialogRoot").data("kendoDialog"), "Vui lòng chọn 1 bản ghi để sửa");
    } else {
        $("#windowCauHoi").data("kendoWindow").center().maximize().open();
        var selectedItem = $("#gridCauHoi").data("kendoGrid").dataItem($("#gridCauHoi").data("kendoGrid").select());
        console.log(selectedItem);

        $("#ID_TroChoi").val(selectedItem.ID);
        $("#TenTroChoi").val(selectedItem.TenTroChoi);
        $("#LoaiTroChoi").data("kendoComboBox").value(selectedItem.Loai),
            $("#NoiDung").data("kendoEditor").value(selectedItem.NoiDung);
        var data = [];
        $.each(selectedItem.lstDapAn, function (index, item) {
            data.push({
                ID: item.ID,
                ID_CauHoi: item.ID_TroChoi,
                DapAn: item.DapAn,
                NoiDung: item.NoiDung,
                HinhAnh: item.HinhAnh,
                AmThanh: item.AmThanh,
                ThuTu: item.ThuTu,
                IsDapAnDung: item.IsDapAnDung == 1 ? true : false
            })
        })
        var ds = new kendo.data.DataSource({
            data: data,
            schema: {
                model: {
                    id: "id",
                    fields: {
                        ID: { type: 'number', editable: false },
                        ID_TroChoi: { type: 'number', editable: false },
                        DapAn: { type: 'text', editable: true },
                        NoiDung: { type: 'text', editable: true },
                        HinhAnh: { type: 'text', editable: true },
                        AmThanh: { type: 'text', editable: true },
                        IsDapAnDung: { type: 'boolean', editablle: true },
                        ThuTu: { type: 'number', min: 1, editablle: true }
                    }
                }
            },
            pageSize: 100
        });
        $("#gridDapAn").data("kendoGrid").setDataSource(ds);
    }
}

function htmlDecode(value) {
    return value.replace(/&lt;/g, "<").replace(/&gt;/g, ">");
}