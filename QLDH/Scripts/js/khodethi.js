var selectedDanhMuc;
var lstCauHoiTrongDe = [];
var lstIDCauHoiTrongDe = [];
var dataSourceCombo;
var count = 1;
var Ans = ['A','B','C','D','E','F','G','H','I']
$(document).ready(function () {
    $("#rootContainer").show();
    $("#dialogRoot").kendoDialog().data("kendoDialog").close();
    $("#gridDeThi").kendoGrid({
        height: function () {
            var height = $(window).height() - 150;
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
                field: "TenDeThi",
                title: "Tên đề thi",
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
                field: "TenKhoi",
                title: "Khối",
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
                field: "TenMonHoc",
                title: "Môn học",
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
                field: "NgayTao",
                title: "Ngày tạo",
                template: function (e) {
                    var dateString = e.NgayTao.substr(6);
                    var currentTime = new Date(parseInt(dateString));
                    if (currentTime.getFullYear() != 1) {
                        return kendo.toString(currentTime, "dd/MM/yyyy");
                    } else {
                        return "";
                    }
                },
                width: "10%",
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
                field: "TenTaiKhoan",
                title: "Người tạo",
                width: "10%",
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
                field: "TrangThai",
                title: "Trạng thái",
                template: function (e) {
                    if (e.TrangThai == 1) {
                        return "Mở";
                    } else {
                        return "Đóng";
                    }
                },
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
                    style: "text-align: center;",
                }
            },
            {
                title: "Xem trước",
                template: function (e) {
                    return "<i onclick='XemTruocDeThi(\"" + e.uid + "\"," + e.ID + ")' style='color:red;width:100%;height:15px;cursor:pointer' class='fa fa-eye'></i>";
                },
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
                    style: "text-align: center;",
                }
            }
        ]

    });
    $("#gridCauHoi").kendoGrid({
        height: function () {
            var height = ($(window).height() - 280) / 2;
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
                field: 'ID_CauHoi',
                template: function (e) {
                    return "<i onclick='XoaCauHoi(\"" + e.uid + "\"," + e.ID_CauHoi + ")' style='color:red;width:100%;height:15px;cursor:pointer' class='fa fa-trash'></i>";
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
                field: "NoiDungCauHoi",
                title: "Nội dung câu hỏi",
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
                field: "TenDanhMucCauHoi",
                title: "Danh mục",
                width: "10%",
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
                field: "SoDapAn",
                title: "Số đáp án",
                width: "5%",
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
                field: "SoDapAnDung",
                title: "Đáp án đúng",
                width: "5%",
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
                field: "TenTaiKhoan",
                title: "Người tạo",
                width: "10%",
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
    $("#gridCauHoiTuDong").kendoGrid({
        height: function () {
            var height = ($(window).height() - 280) / 2;
            return height;
        },
        dataSource: new kendo.data.DataSource({
            data: [],
            schema: {
                model: {
                    id: "id",
                    fields: {
                        ID: { type: 'number', editable: false },
                        ID_DanhMucCauHoi: { type: 'number', editable: true },
                        SoLuongCauHoi: { type: 'number', editable: true },
                        SoDiem: { type: 'number', editable: true }
                    }
                }
            },
            pageSize: 100
        }),
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
        save: function (e) {
            setTimeout(function () {
                e.sender.refresh();
                e.sender.dataSource.fetch(function () {
                });
            })
        },
        editable: true,
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
                    return "<i onclick='XoaCauHoiTuDong(\"" + e.uid + "\"," + e.ID + ")' style='color:red;width:100%;height:15px;cursor:pointer' class='fa fa-trash'></i>";
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
                            e.element.parent().html("<a class='k-button' title='Thêm câu hỏi tự động' style='width:100%; height:25px;' onclick='ThemCauHoiTuDong()'><i class='fa fa-plus'></i></a>")
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
                field: "ID_DanhMucCauHoi",
                title: "Danh mục câu hỏi",
                template: function (e) {
                    return e.TenDanhMucCauHoi;
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
                    var control = $('<input />');
                    control.appendTo(container).kendoDropDownTree({
                        dataTextField: 'TenDanhMucCauHoi',
                        dataValueField: 'ID',
                        autoBind: false,
                        dataSource: new kendo.data.HierarchicalDataSource({
                            transport: {
                                read: {
                                    url: '/TracNghiem/GetTreeDanhMucCauHoi'
                                }
                            },
                            schema: {
                                model: {
                                    children: "lstDanhMuc"
                                }
                            },
                        }),
                        //dataSource: dataSourceCombo,
                        change: function (e) {
                            console.log(e);
                            options.model.TenDanhMucCauHoi = e.sender.text();
                            options.model.ID_DanhMucCauHoi = e.sender.value();
                        },
                    });
                    if (options.model.ID_DanhMucCauHoi > 0) {
                        control.data("kendoDropDownTree").value(options.model.ID_DanhMucCauHoi.toString());
                    }
                }
            },
            {
                field: "SoLuongCauHoi",
                title: "Số lượng câu",
                width: "30%",
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
                field: "Diem",
                title: "Số điểm",
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
            }
        ]

    });
    $("#gridChonCauHoi").kendoGrid({
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
                template: function (e) {
                    if (lstIDCauHoiTrongDe.includes(e.ID)) {
                        return "<i onclick='XoaCauHoiKhoiDe(\"" + e.uid + "\"," + e.ID + ")' style='color:red;width:100%;height:15px;cursor:pointer' class='fa fa-trash'></i>";
                    } else {
                        return "<i onclick='ThemCauHoiVaoDe(\"" + e.uid + "\"," + e.ID + ")' style='color:green;width:100%;height:15px;cursor:pointer' class='fa fa-plus'></i>";
                    }
                },
                width: 60,
                attributes: {
                    class: "text-center"
                },
                headerAttributes: {
                    style: "text-align: center; font-size: 12px; ",
                    class: "table-header-cell"
                }
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
                field: "NoiDungCauHoi",
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
            },
            {
                field: "SoDapAn",
                title: "Số đáp án",
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
                field: "SoDapAnDung",
                title: "Đáp án đúng",
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
                field: "TenTaiKhoan",
                title: "Người tạo",
                width: "10%",
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
    $("#treeview").kendoTreeView({
        dataTextField: "TenDanhMucCauHoi",
        dataValueField: "ID",
        select: function (e) {
            selectedDanhMuc = $("#treeview").getKendoTreeView().dataItem(e.node)
            LoadGridChonCauHoi();
        },
    });
    loadTreeview()
    $("#windowDeThi").kendoWindow({
        width: 400,
        height: 200,
        modal: true,
        resizable: false,
        visible: false,
        title: "Thông tin đề thi"
    });
    $("#windowChonCauHoi").kendoWindow({
        width: 400,
        height: 200,
        modal: true,
        resizable: false,
        visible: false,
        title: "Thông tin đề thi"
    });
    $("#windowXemDeThi").kendoWindow({
        width: 400,
        height: 200,
        modal: true,
        resizable: false,
        visible: false,
        title: "Xem đề thi"
    });
    
    $("#comboKhoi").kendoComboBox({
        dataTextField: 'text',
        dataValueField: 'value',
        clearButton: false,
        dataSource: new kendo.data.DataSource({
            data: [
                { text: '1', value: 1 },
                { text: '2', value: 2 },
                { text: '3', value: 3 },
                { text: '4', value: 4 },
                { text: '5', value: 5 },
                { text: '6', value: 6 },
                { text: '7', value: 7 },
                { text: '8', value: 8 },
                { text: '9', value: 9 },
                { text: '10', value: 10 },
                { text: '11', value: 11 },
                { text: '12', value: 12 },
            ]
        })
    });
    $("#ThangDiem").kendoNumericTextBox({
        format: 'n0'
    })
    $("#ThoiGian").kendoNumericTextBox({
        format: 'n0'
    })
    $.ajax({
        url: '/DanhMuc/GetAll_DanhMuc?TenBang=MonHoc',
        type: 'POST',
    }).done(function successCallback(response) {
        var dataSource = new kendo.data.DataSource({
            data: response
        });
        if ($("#comboMonHoc").data("kendoComboBox") == undefined) {
            $("#comboMonHoc").kendoComboBox({
                dataTextField: 'text',
                dataValueField: 'value',
                dataSource: dataSource,
                filter: "contains"
            })
        } else {
            $("#comboMonHoc").data("kendoComboBox").setDataSource(dataSource);
        }

    })
    LoadGridDeThi();
    $("#gridDeThi").on("dblclick", "tr[role='row']", function () {
        $("#gridDeThi").data("kendoGrid").clearSelection();
        var row = $("#gridDeThi").data("kendoGrid").table.find("[data-uid=" + $(this).attr("data-uid") + "]");
        $("#gridDeThi").data("kendoGrid").select(row);
        openEditWindow();
    });

    $("#gridChonCauHoi").kendoTooltip({
        autoHide: true,
        filter: "tr[role='row']",
        content: function (e) {
            var dataItem = $("#gridCauHoi").data("kendoGrid").dataItem(e.target.closest("tr"));
            var temp = kendo.template($("#templateCauHoiTooltip").html());
            return temp(dataItem);
        }
    });
    $("#gridCauHoi").kendoTooltip({
        autoHide: true,
        filter: "tr[role='row']",
        content: function (e) {
            var dataItem = $("#gridCauHoi").data("kendoGrid").dataItem(e.target.closest("tr"));
            var temp = kendo.template($("#templateCauHoiTooltip").html());
            return temp(dataItem);
        }
    });
})

function openEditWindow() {
    var arr = $("#gridDeThi").data("kendoGrid").selectedKeyNames();
    if (arr.length != 1) {
        openDialog($("#dialogRoot").data("kendoDialog"), "Vui lòng chọn 1 bản ghi để sửa");
    } else {
        $("#windowDeThi").data("kendoWindow").center().maximize().open();
        var selectedItem = $("#gridDeThi").data("kendoGrid").dataItem($("#gridDeThi").data("kendoGrid").select());
        $("#ID_DeThi").val(selectedItem.ID);
        $("#TenDeThi").val(selectedItem.TenDeThi);
        $("#ThoiGian").data("kendoNumericTextBox").value(selectedItem.ThoiGian);
        $("#ThangDiem").data("kendoNumericTextBox").value(selectedItem.Diem);
        $("#comboKhoi").data("kendoComboBox").value(selectedItem.ID_Khoi);
        $("#comboMonHoc").data("kendoComboBox").value(selectedItem.ID_MonHoc);

        var datachitiet = [];
        $.each(selectedItem.lstChiTiet, function (index, item) {
            datachitiet.push(item)
        })
        let ds = new kendo.data.DataSource({
            data: datachitiet,
            schema: {
                model: {
                    id: "id",
                    fields: {
                        ID: { type: 'number', editable: false },
                        ID_DanhMucCauHoi: { type: 'number', editable: true },
                        SoLuongCauHoi: { type: 'number', editable: true },
                        SoDiem: { type: 'number', editable: true }
                    }
                }
            },
            pageSize: 100
        });
        $("#gridCauHoiTuDong").data("kendoGrid").setDataSource(ds);

        $.each(selectedItem.lstCauHoi, function (index, item) {
            var ch = {
                ID_CauHoi: item.ID,
                ID_DanhMucCauHoi: item.ID_DanhMucCauHoi,
                ID_TaiKhoan: item.ID_TaiKhoan,
                NoiDungCauHoi: item.NoiDungCauHoi,
                SoDapAn: item.SoDapAn,
                SoDapAnDung: item.SoDapAnDung,
                TenDanhMucCauHoi: item.TenDanhMucCauHoi,
                TenTaiKhoan: item.TenTaiKhoan,
                TrangThai: item.TrangThai,
                lstDapAn: item.lstDapAn
            }
            lstCauHoiTrongDe.push(ch);
        })
        LoadDataGridCauHoi();
    }
}


function LoadGridChonCauHoi() {
    $.ajax({
        url: '/TracNghiem/GetCauHoiByDanhMuc?ID_DanhMuc=' + selectedDanhMuc.ID,
        type: 'GET',
    }).done(function successCallback(response) {
        kendo.ui.progress($("#gridChonCauHoi"), true);
        var dataSource = new kendo.data.DataSource({
            data: response,
            schema: {
                model: {
                    id: "ID"
                }
            },
            pageSize: 20,
        });
        $("#gridChonCauHoi").data("kendoGrid").setDataSource(dataSource);
        kendo.ui.progress($("#gridChonCauHoi"), false);
    });
}


function ThemDeThi() {
    document.getElementById("formDeThi").reset();
    $("#ID_DeThi").val(0);
    lstCauHoiTrongDe = [];
    lstIDCauHoiTrongDe = [];
    LoadDataGridCauHoi();
    let ds = new kendo.data.DataSource({
        data: [],
        schema: {
            model: {
                id: "id",
                fields: {
                    ID: { type: 'number', editable: false },
                    ID_DanhMucCauHoi: { type: 'number', editable: true },
                    SoLuongCauHoi: { type: 'number', editable: true },
                    SoDiem: { type: 'number', editable: true }
                }
            }
        },
        pageSize: 100
    });
    $("#gridCauHoiTuDong").data("kendoGrid").setDataSource(ds);
    $("#ThangDiem").data('kendoNumericTextBox').value(10);
    $("#windowDeThi").data("kendoWindow").center().maximize().open();
}

function openWindowCauHoi() {
    $("#windowChonCauHoi").data("kendoWindow").center().open().maximize();
}
function loadTreeview() {
    $.ajax({
        url: '/TracNghiem/GetTreeDanhMucCauHoi',
        type: 'GET'
    }).done(function (response) {
        var dataSource = new kendo.data.HierarchicalDataSource({
            data: response,
            schema: {
                model: {
                    children: "lstDanhMuc"
                }
            }
        })

        dataSourceCombo = new kendo.data.HierarchicalDataSource({
            data: response,
            schema: {
                model: {
                    children: "lstDanhMuc"
                }
            }
        })
        $("#treeview").data("kendoTreeView").setDataSource(dataSource);
        $("#treeview").data("kendoTreeView").expand(".k-item");
    })
}

function ThemCauHoiVaoDe(uid, id) {
    if (!lstIDCauHoiTrongDe.includes(id)) {
        lstIDCauHoiTrongDe.push(id);
        var dataRow = $('#gridChonCauHoi').data("kendoGrid").dataSource.getByUid(uid);
        var item = {
            ID: 0,
            ID_CauHoi: dataRow.ID,
            ID_DanhMucCauHoi: dataRow.ID_DanhMucCauHoi,
            ID_TaiKhoan: dataRow.ID_TaiKhoan,
            NoiDungCauHoi: dataRow.NoiDungCauHoi,
            SoDapAn: dataRow.SoDapAn,
            SoDapAnDung: dataRow.SoDapAnDung,
            TenDanhMucCauHoi: dataRow.TenDanhMucCauHoi,
            TenTaiKhoan: dataRow.TenTaiKhoan,
            TrangThai: dataRow.TrangThai,
            lstDapAn: dataRow.lstDapAn
        }
        lstCauHoiTrongDe.push(item);
    }
    setTimeout(function () {
        $("#gridChonCauHoi").data("kendoGrid").refresh();
        LoadDataGridCauHoi()
    })
}

function XoaCauHoiKhoiDe(id) {
    if (lstIDCauHoiTrongDe.includes(id)) {
        let index = lstIDCauHoiTrongDe.indexOf(id);
        lstIDCauHoiTrongDe.splice(index);
        lstCauHoiTrongDe.splice(index);
    }
    setTimeout(function () {
        $("#gridChonCauHoi").data("kendoGrid").refresh();
        LoadDataGridCauHoi();
    })
}

function XoaCauHoi(uid, id) {
    if (lstIDCauHoiTrongDe.includes(id)) {
        let index = lstIDCauHoiTrongDe.indexOf(id);
        lstIDCauHoiTrongDe.splice(index);
        lstCauHoiTrongDe.splice(index);
    }
    setTimeout(function () {
        var dataRow = $('#gridCauHoi').data("kendoGrid").dataSource.getByUid(uid);
        $('#gridCauHoi').data("kendoGrid").dataSource.remove(dataRow);
        $("#gridChonCauHoi").data("kendoGrid").refresh();
    })
}

function LoadDataGridCauHoi() {
    var dataSource = new kendo.data.DataSource({
        data: lstCauHoiTrongDe,
        schema: {
            model: {
                id: "ID"
            }
        },
        pageSize: 20,
    });
    $("#gridCauHoi").data("kendoGrid").setDataSource(dataSource);
}

function ThemCauHoiTuDong() {
    var grid = $("#gridCauHoiTuDong").data("kendoGrid");
    grid.addRow();
}
function XoaCauHoiTuDong(uid, id) {
    var dataRow = $('#gridCauHoiTuDong').data("kendoGrid").dataSource.getByUid(uid);
    $('#gridCauHoiTuDong').data("kendoGrid").dataSource.remove(dataRow);
}

function HuyDeThi() {
    document.getElementById("formDeThi").reset();
    $("#windowDeThi").data("kendoWindow").close();
}

function LuuDeThi() {
    var validten = SetValidate("TenDeThi");
    var validkhoi = SetValidate("comboKhoi");
    var validmon = SetValidate("comboMonHoc");
    var validthoigian = SetValidate("ThoiGian");
    var validthangdiem = SetValidate("ThangDiem");
    var valid = validten && validkhoi && validmon && validthoigian && validthangdiem;
    if (valid) {
        var dethi = {
            ID: $("#ID_DeThi").val(),
            TenDeThi: $("#TenDeThi").val(),
            ID_MonHoc: $("#comboMonHoc").data("kendoComboBox").value(),
            ID_Khoi: $("#comboKhoi").data("kendoComboBox").value(),
            ThoiGian: $("#ThoiGian").data("kendoNumericTextBox").value(),
            Diem: $("#ThangDiem").data("kendoNumericTextBox").value()
        };
        var dschitiet = [];
        $.each($("#gridCauHoiTuDong").data("kendoGrid").dataSource.data(), function (index, item) {
            dschitiet.push({
                ID: item.ID,
                ID_DeThi: $("ID_DeThi").val(),
                ID_DanhMucCauHoi: item.ID_DanhMucCauHoi,
                SoLuongCauHoi: item.SoLuongCauHoi,
                Diem: item.Diem
            })
        })

        var dscauhoi = [];
        $.each($("#gridCauHoi").data("kendoGrid").dataSource.data(), function (index, item) {
            dscauhoi.push({
                ID: item.ID,
                ID_DeThi: $("ID_DeThi").val(),
                ID_CauHoi: item.ID_CauHoi
            })
        })
        dethi.lstDeThiCauHoi = dscauhoi;
        dethi.lstChiTiet = dschitiet;
        console.log(dethi);
        $.ajax({
            url: '/TracNghiem/DeThi_InsertOrUpdate',
            type: 'POST',
            data: dethi
        }).done(function successCallback(response) {
            if (response.status) {
                notification.show({ kValue: response.msg }, "success");
                HuyDeThi();
                LoadGridDeThi();
            } else {
                notification.show({ kValue: response.msg }, "error");
            }
        });
    }
}

function LoadGridDeThi() {
    $.ajax({
        url: '/TracNghiem/GetAllDeThi',
        type: 'GET',
    }).done(function successCallback(response) {
        kendo.ui.progress($("#gridDeThi"), true);
        var dataSource = new kendo.data.DataSource({
            data: response,
            schema: {
                model: {
                    id: "ID"
                }
            },
            pageSize: 20,
        });
        $("#gridDeThi").data("kendoGrid").setDataSource(dataSource);
        kendo.ui.progress($("#gridDeThi"), false);
    });
}

function XemTruocDeThi(uid, id) {
    $("#windowXemDeThi").data("kendoWindow").center().open().maximize();
    var dataRow = $('#gridDeThi').data("kendoGrid").dataSource.getByUid(uid);
    $("#TenDe").text(dataRow.TenDeThi);
    $("#TenMon").text(dataRow.TenMonHoc);
    $("#ThoiGianLamBai").text(dataRow.ThoiGian);
    console.log(dataRow);
    count = 1;
    var dataSource = new kendo.data.DataSource({
        data: dataRow.lstCauHoi,
        schema: {
            model: {
                id: "ID",
                fields: {
                    NgayTao: {
                        type: 'date'
                    }
                }
            }
        }
    });
    $("#listviewcauhoi").data("kendoListView").setDataSource(dataSource);
    kendo.ui.progress($("#rootContainer"), false);
}

function htmlDecode(value) {
    return value.replace(/&lt;/g, "<").replace(/&gt;/g, ">");
}