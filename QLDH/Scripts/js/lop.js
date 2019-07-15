var lstHocSinhTrongLop = [];
$(document).ready(function () {
    $("#window").kendoWindow({
        width: "400px",
        height: "250px",
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

    $("#LichHocCombo").kendoMultiSelect({
        dataTextField: "text",
        dataValueField: "value",
        autoBind: false,
        dataSource: new kendo.data.DataSource({
            data: [{ text: "Thứ 2", value: 2 },
                { text: "Thứ 3", value: 3 },
                { text: "Thứ 4", value: 4 },
                { text: "Thứ 5", value: 5 },
                { text: "Thứ 6", value: 6 },
                { text: "Thứ 7", value: 7 },
                { text: "Chủ nhật", value: 1 },
            ]
        }),
    })

    $("#windowChitiet").kendoWindow({
        title: "Chi tiết danh sách học sinh thuộc lớp",
        visible: false,
        modal: true,
        resizable: false,
        actions: [
            "Close"
        ]
    });

    $("#files").kendoUpload({
        validation: {
            allowedExtensions: [".jpg", ".png", ".jpeg"]
        },
        localization: {
            select: 'Tải sơ đồ lớp',
            remove: '',
            cancel: ''
        },
        multiple: false,
        select: function (e) {
            var fileInfo = e.files[0];
            var wrapper = this.wrapper;

            setTimeout(function () {
                addPreview(fileInfo, wrapper);
            });
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
                width: "130px",
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
                field: "TenGiaoVien",
                title: "Giáo viên",
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
                field: "SiSo",
                title: "Sĩ số",
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
                 field: "NamHoc",
                 title: "Năm học",
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
            var height = $(window).height() - 120;
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
            }
        ]
    });

    $("#gridHocSinhNgoaiLop").kendoGrid({
        height: function () {
            var height = $(window).height() - 120;
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
        change: function (e) {
            var grid = e.sender;
            var items = grid.items();
            items.each(function (idx, row) {
                var IDHocSinh = grid.dataItem(row).get("ID");
                var existedindex = -1;
                try {
                    $.each(lstHocSinhTrongLop, function (index, item) {
                        if (item.ID == IDHocSinh) {
                            existedindex = index;
                        }
                    })
                } catch (e) {
                    existedindex = -1;
                }
                if (row.className.indexOf("k-state-selected") >= 0 && IDHocSinh > 0) {
                    if (existedindex < 0) {
                        var itemselected = grid.dataItem(row);
                        lstHocSinhTrongLop.push({
                            ID: itemselected.ID,
                            TenHocSinh: itemselected.TenHocSinh,
                            DiaChi: itemselected.DiaChi,
                            PhuHuynh: itemselected.PhuHuynh,
                            DienThoaiMacDinh: itemselected.DienThoaiMacDinh,
                            TenTruong: itemselected.TenTruong,
                        });
                    }
                } else {
                    if (existedindex >= 0) {
                        lstHocSinhTrongLop.splice(existedindex, 1);
                    }
                }
            });

            var dataSource = new kendo.data.DataSource({
                data: lstHocSinhTrongLop,
                schema: {
                    model: {
                        id: "ID"
                    }
                },
                pageSize: 20,
            });
            $("#gridHocSinhTrongLop").data("kendoGrid").setDataSource(dataSource);
        },
        dataBound: function (e) {
            console.log("bound - " + lstHocSinhTrongLop.length);
            var grid = e.sender;
            var items = grid.items();
            var itemsToSelect = [];
            items.each(function (idx, row) {
                var IDHocSinh = grid.dataItem(row).get("ID");
                var existedindex = lstHocSinhTrongLop.findIndex(x => x.ID == IDHocSinh);
                if (existedindex >= 0) {
                    itemsToSelect.push(row);
                }
            });
            e.sender.select(itemsToSelect);
        },
        dataBinding: function () {
            record = (this.dataSource.page() - 1) * this.dataSource.pageSize();
        },
        columns: [
             {
                 selectable: true,
                 width: 30,
                 headerAttributes: {
                     style: "text-align: left; font-size: 12px; ",
                     class: "table-header-cell"
                 },
                 attributes: {
                     class: "text-left"
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
                field: "TenHocSinh",
                title: "Tên học sinh",
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

    LoadComboGiaoVien();

    $("#dialogRoot").kendoDialog().data("kendoDialog").close();

})


function openEditWindow() {
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
        $("#TenLop").val(selectedItem.TenLop);
        $("#GiaoVienCombo").data("kendoComboBox").value(selectedItem.GiaoVien);
        //$(".image-preview").remove();
        //if (selectedItem.SoDoLop != null) {
        //    var preview = $("<img class='image-preview'>").attr("src", "../Images/SoDoLop/" + selectedItem.SoDoLop);
        //    var wrapper = $("#files").data("kendoUpload").wrapper;
        //}
        //wrapper.append(preview);
        if (selectedItem.LichHoc != null) {
            $("#LichHocCombo").data("kendoMultiSelect").value(selectedItem.LichHoc.split(','))
        } else {
            $("#LichHocCombo").data("kendoMultiSelect").value([])
        }
    }
}

function openChiTietLop(id) {
    $("#windowChitiet").data("kendoWindow").open().maximize();
    $("#gridHocSinhNgoaiLop").data("kendoGrid").clearSelection();
    lstHocSinhTrongLop = [];
    LoadHocSinhTrongLop(id);
    $("#IDLop").val(id);
}

function toDate(value) {
    var dateRegExp = /^\/Date\((.*?)\)\/$/;
    var date = dateRegExp.exec(value);
    return new Date(parseInt(date[1]));
}


function LoadGridData() {
    $.ajax({
        url: '/Lop/GetAll',
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

function LoadComboGiaoVien() {
    $.ajax({
        url: '/User/GetAllUser',
        type: 'GET',
    }).done(function successCallback(response) {
        var dataSource = new kendo.data.DataSource({
            data: response
        });
        $("#GiaoVienCombo").kendoComboBox({
            dataTextField: 'TenDayDu',
            dataValueField: 'ID',
            dataSource: dataSource
        });
    });
}

function ThemMoi() {
    document.getElementById("formChiTiet").reset();
    $("#ID").val('0');
    if ($(window).width() > 800) {
        $("#window").data("kendoWindow").center().open();
    } else {
        $("#window").data("kendoWindow").center().maximize().open();
    }
}

function Luu() {
    var validten = SetValidate("TenLop");
    var validgv = SetValidate("GiaoVienCombo");
    var valid = validten && validgv;
    if (valid) {
        var data = new FormData();
        //var file = $("#files").data("kendoUpload").getFiles()[0];
        //var filename = kendo.toString(new Date(), "yyyymmddhhmmss") + (file ? file.name : "");
        var model = {
            ID: $("#ID").val(),
            TenLop: $("#TenLop").val(),
            GiaoVien: $("#GiaoVienCombo").data("kendoComboBox").value(),
            LichHoc: $("#LichHocCombo").data("kendoMultiSelect").value().toString(),
            SoDoLop: ""
        }
        data.append("model", JSON.stringify(model));
        //if (file) {
        //    data.append('file', file.rawFile, filename);
        //}
        $.ajax({
            url: '/Lop/CreateOrUpdate',
            processData: false,
            contentType: false,
            data: data,
            type: 'POST'
        }).done(function successCallback(response) {
            if (response.status) {
                notification.show({ kValue: response.msg }, "success");
                Huy();
                LoadGridData();
            } else {
                notification.show({ kValue: response.msg }, "error");
            }
        });
    }
}

function Huy() {
    document.getElementById("formChiTiet").reset();
    $("#ID").val('0');
    $("#window").data("kendoWindow").close();
}

function Xoa() {
    var bangDuLieu = $("#grid").data("kendoGrid");
    if (bangDuLieu.select().length > 0) {
        openConfirm(dialogRoot, "<b style='line-height:40px;'>Bạn có chắc chắn muốn xóa " + bangDuLieu.select().length + " lớp?</b>", function () { XoaDuLieu(bangDuLieu); }, function () { });
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
        url: '/Lop/Delete?ID=' + ids.join(','),
        type: 'POST'
    }).done(function (response) {
        if (response.status) {
            LoadGridData();
            notification.show({ kValue: response.msg }, "success");
        } else {
            notification.show({ kValue: response.msg }, "error");
        }
    })
}

function LoadHocSinhNgoaiLop(id) {
    $.ajax({
        url: '/HocSinh/GetAllNgoaiLop?ID_Lop=' + id,
        type: 'GET',
    }).done(function successCallback(response) {
        kendo.ui.progress($("#gridHocSinhNgoaiLop"), true);
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
        $("#gridHocSinhNgoaiLop").data("kendoGrid").setDataSource(dataSource);
        kendo.ui.progress($("#gridHocSinhNgoaiLop"), false);
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
        LoadHocSinhNgoaiLop(id);
        kendo.ui.progress($("#gridHocSinhTrongLop"), false);
    });
}

function LuuChiTietLop() {
    $.ajax({
        url: '/Lop/ThemHocSinhVaoLop',
        type: 'POST',
        data: {
            ID_Lop: $("#IDLop").val(),
            lstHocSinh: lstHocSinhTrongLop
        }
    }).done(function successCallback(response) {
        if (response.status) {
            notification.show({ kValue: response.msg }, "success");
            HuyChiTietLop();
        } else {
            notification.show({ kValue: response.msg }, "error");
        }
    });
}

function HuyChiTietLop() {
    $("#windowChitiet").data("kendoWindow").close();
    $("#IDLop").val(0);
}

function addPreview(file, wrapper) {
    var raw = file.rawFile;
    var reader = new FileReader();

    if (raw) {
        reader.onloadend = function () {
            var preview = $("<img class='image-preview'>").attr("src", this.result);

            wrapper.find(".k-file[data-uid='" + file.uid + "'] .k-file-extension-wrapper")
              .replaceWith(preview);
        };

        reader.readAsDataURL(raw);
    }
}

function XuatExcelHocSinh() {
    var grid = $('#gridHocSinhTrongLop').data('kendoGrid');

    grid.options.excel = {
        fileName: "Danh_Sach_Hoc_Sinh.xlsx",
        filterable: true,
        allPages: true
    }
    grid.saveAsExcel();
}