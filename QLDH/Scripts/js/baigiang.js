var Ans = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I'];
var lstCauHoi, lstFlashCard, lstTroChoi;
$(document).ready(function () {
    $("#window").kendoWindow({
        width: "680px",
        height: "570px",
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


    $("#windowChitiet").kendoWindow({
        title: "Chi tiết bài giảng",
        visible: false,
        modal: true,
        resizable: false,
        actions: [
            "Close"
        ],
        close: function () {
            $("#ID_BaiGiang").val(0);
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
        excel: {
            filterable: true
        },
        excelExport: function (e) {
            var columns = e.workbook.sheets[0].columns;
            var sheet = e.workbook.sheets[0];
            sheet.title = "Danh sách lớp";
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
                field: "TenBai",
                title: "Unit",
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
                field: "TenBuoi",
                title: "Lession",
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
                field: "BaiHoc",
                title: "Nội dung",
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
                field: "CapDo",
                title: "Cấp độ",
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
                title: "Chi tiết bài giảng",
                width: "100px",
                headerAttributes: {
                    style: "text-align: center; font-size: 12px; font-weight:bold",
                    class: "table-header-cell"
                },
                attributes: {
                    style: "text-align:center"
                },
                template: function (e) {
                    return "<button class='k-button k-success text-center' onclick='openChiTiet(" + e.ID + ")'><i class='fa fa-pencil'/> Chi tiết</button>";
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

    $("#gridFlashcard").kendoGrid({
        height: function () {
            var height = $(window).height() / 4;
            return height;
        },
        dataSource: new kendo.data.DataSource({
            data: [],
            schema: {
                model: {
                    id: "id",
                    fields: {
                        ID: { type: 'number', editable: false },
                        Ten: { type: 'string', editable: true },
                        ChuDe: { type: 'string', editable: false },
                        The: { type: 'string', editable: false },
                        AnhThe: { type: 'string', editable: false },
                        AmThanh: { type: 'string', editable: false },
                    }
                }
            },
            pageSize: 100
        }),
        editable: {
            createAt: "bottom"
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
        save: function (e) {
            e.sender.dataSource.fetch(function () {
                setTimeout(function () {
                    e.sender.refresh();
                })
            });
        },
        columns: [
            {
                title: " ",
                field: 'ID',
                template: function (e) {
                    return "<i onclick='DeleteRowFlashcard(\"" + e.uid + "\")' title='Xoá flashcard' style='color:red' class='fa fa-trash'></i>";
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
                            e.element.parent().html("<a class='k-button' title='Thêm flashcard' style='width:100%; height:25px;' onclick='AddRowFlashcard()'><i class='fa fa-plus'></i></a>")
                        }
                    }
                },
            },
            {
                field: "ChuDe",
                title: "Chủ đề",
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
                field: "The",
                title: "Thẻ",
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
                field: "Ten",
                title: "Tên",
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
                editor: function (container, options) {
                    $('<input required name="' + options.field + '"/>').appendTo(container).kendoComboBox({
                        dataTextField: 'Ten',
                        dataValueField: 'ID',
                        autoBind: false,
                        valuePrimitive: false,
                        dataSource: new kendo.data.DataSource({
                            transport: {
                                read: {
                                    url: '/BaiGiang/GetAll_Flashcard',
                                }
                            },
                        }),
                        change: function (e) {
                            console.log(e.sender.dataItem());
                            let model = e.sender.dataItem()
                            options.model.ID = model.ID;
                            options.model.Ten = model.Ten;
                            options.model.AnhThe = model.AnhThe;
                            options.model.The = model.The;
                            options.model.ChuDe = model.ChuDe;
                            options.model.AmThanh = model.AmThanh;
                        },
                    })
                },
                headerAttributes: {
                    style: "text-align: center; font-size: 12px; font-weight:bold",
                    class: "table-header-cell"
                }
            },
            {
                field: "AnhThe",
                title: "Ảnh",
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
                template: function (e) {
                    return "<img class='k-avatar' src=" + e.AnhThe + "></img>";
                }
            },
            {
                title: "AmThanh",
                title: "Âm thanh",
                width: "100px",
                headerAttributes: {
                    style: "text-align: center; font-size: 12px; font-weight:bold",
                    class: "table-header-cell"
                },
                attributes: {
                    style: "text-align:center"
                },
                template: function (e) {
                    return "<a target='_blank' href=" + e.AmThanh + "><i class='fa fa-folder-open-o'/> Âm thanh</button>";
                }
            }

        ]

    });

    $("#gridCauHoi").kendoGrid({
        height: function () {
            var height = $(window).height() / 4;
            return height;
        },
        dataSource: new kendo.data.DataSource({
            data: [],
            schema: {
                model: {
                    id: "id",
                    fields: {
                        ID: { type: 'number', editable: false },
                        NoiDungCauHoi: { type: 'text', editable: true },
                        ID_DanhMuc: { type: 'number', editable: true },
                        TenDanhMuc: { type: 'text', editable: false }
                    }
                }
            },
            pageSize: 100
        }),
        editable: {
            createAt: "bottom"
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
        save: function (e) {
            e.sender.dataSource.fetch(function () {
                setTimeout(function () {
                    e.sender.refresh();
                })
            });
        },
        columns: [
            {
                title: " ",
                field: 'ID',
                template: function (e) {
                    return "<i onclick='DeleteRowCauHoi(\"" + e.uid + "\")' title='Xoá câu hỏi' style='color:red' class='fa fa-trash'></i>";
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
                            e.element.parent().html("<a class='k-button' title='Thêm câu hỏi' style='width:100%; height:25px;' onclick='AddRowCauHoi()'><i class='fa fa-plus'></i></a>")
                        }
                    }
                },
            },
            {
                field: "ID_DanhMuc",
                title: "Danh mục",
                template: function (e) {
                    if (e.TenDanhMuc)
                        return e.TenDanhMuc
                    else return "";
                },
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
                editor: function (container, options) {
                    $('<input required name="' + options.field + '"/>').appendTo(container).kendoComboBox({
                        dataTextField: "TenDanhMucCauHoi",
                        dataValueField: "ID",
                        valuePrimitive: false,
                        autoBind: true,
                        dataSource: new kendo.data.HierarchicalDataSource({
                            transport: {
                                read: {
                                    url: '/TracNghiem/GetAllDanhMucCauHoi',
                                }
                            },
                        }),
                        change: function (e) {
                            console.log(e);
                            options.model.ID_DanhMuc = e.sender.value();
                            options.model.TenDanhMuc = e.sender.text();
                        },
                    })
                },
                headerAttributes: {
                    style: "text-align: center; font-size: 12px; font-weight:bold",
                    class: "table-header-cell"
                }
            },
            {
                field: "NoiDungCauHoi",
                title: "Nội dung",
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
                editor: function (container, options) {
                    $('<input required name="' + options.field + '"/>').appendTo(container).kendoComboBox({
                        dataTextField: 'Ten',
                        dataValueField: 'ID',
                        autoBind: false,
                        valuePrimitive: false,
                        dataSource: new kendo.data.DataSource({
                            transport: {
                                read: {
                                    url: '/TracNghiem/GetCauHoiByDanhMuc?ID_DanhMuc=' + options.model.ID_DanhMuc,
                                }
                            },
                        }),
                        template: kendo.template($("#templateCauHoiTooltip").html()),
                        change: function (e) {
                            console.log(e.sender.dataItem());
                            let model = e.sender.dataItem()
                            options.model.ID = model.ID;
                            options.model.NoiDungCauHoi = model.NoiDungCauHoi;
                            options.model.lstDapAn = model.lstDapAn;
                        },
                    })
                },
                headerAttributes: {
                    style: "text-align: center; font-size: 12px; font-weight:bold",
                    class: "table-header-cell"
                }
            }
        ]

    });

    $("#gridCauHoi").kendoTooltip({
        autoHide: true,
        filter: "tr[role='row']",
        content: function (e) {
            var dataItem = $("#gridCauHoi").data("kendoGrid").dataItem(e.target.closest("tr"));
            var temp = kendo.template($("#templateCauHoiTooltip").html());
            return temp(dataItem);
        }
        //show: function () {
        //    //setTimeout(function () {
        //    //var tooltip = document.getElementById("content-answer");
        //    MathJax.Hub.Queue(["Typeset", MathJax.Hub, 'TFS']);
        //    //}, 1000)

        //}
    });

    $("#gridTroChoi").kendoGrid({
        height: function () {
            var height = $(window).height() / 4;
            return height;
        },
        dataSource: new kendo.data.DataSource({
            data: [],
            schema: {
                model: {
                    id: "id",
                    fields: {
                        ID: { type: 'number', editable: false },
                        TenTroChoi: { type: 'string', editable: true },
                        Loai: { type: 'number', editable: false },
                        NoiDung: { type: 'string', editable: false },
                    }
                }
            },
            pageSize: 100
        }),
        editable: {
            createAt: "bottom"
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
        save: function (e) {
            e.sender.dataSource.fetch(function () {
                setTimeout(function () {
                    e.sender.refresh();
                })
            });
        },
        columns: [
            {
                title: " ",
                field: 'ID',
                template: function (e) {
                    return "<i onclick='DeleteRowTroChoi(\"" + e.uid + "\")' title='Xoá trò chơi' style='color:red' class='fa fa-trash'></i>";
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
                            e.element.parent().html("<a class='k-button' title='Thêm trò chơi' style='width:100%; height:25px;' onclick='AddRowTroChoi()'><i class='fa fa-plus'></i></a>")
                        }
                    }
                },
            },
            {
                field: "TenTroChoi",
                title: "Tên trò chơi",
                width: "230px",
                filterable: {
                    cell: {
                        operator: "contains",
                        showOperators: false,
                        template: function (e) {
                            e.element.addClass("k-textbox").css("width", "100%")
                        }
                    }
                },
                editor: function (container, options) {
                    $('<input required name="' + options.field + '"/>').appendTo(container).kendoComboBox({
                        dataTextField: 'TenTroChoi',
                        dataValueField: 'ID',
                        autoBind: false,
                        valuePrimitive: false,
                        dataSource: new kendo.data.DataSource({
                            transport: {
                                read: {
                                    url: '/TroChoi/GetAllTroChoi',
                                }
                            },
                        }),
                        change: function (e) {
                            console.log(e.sender.dataItem());
                            let model = e.sender.dataItem()
                            options.model.ID = model.ID;
                            options.model.TenTroChoi = model.TenTroChoi;
                            options.model.Loai = model.Loai;
                            options.model.NoiDung = model.NoiDung;
                        },
                    })
                },
                headerAttributes: {
                    style: "text-align: center; font-size: 12px; font-weight:bold",
                    class: "table-header-cell"
                }
            },
            {
                field: "Loai",
                width: "230px",
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
                        case 3: return "Nối đường";

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
                width: "230px",
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
                width: "230px",
                title: "Chơi thử",
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
                        case 1: return "<a href='/TroChoi/GameSapXep?ID=" + e.ID + "' target='_blank'><i class='fa fa-controller'></i>Chơi thử</a>";
                        case 2: return "<a href='/TroChoi/GameLapGhep?ID=" + e.ID + "' target='_blank'><i class='fa fa-controller'></i>Chơi thử</a>";
                        case 3: return "<a href='/TroChoi/GameNoiDuong?ID=" + e.ID + "' target='_blank'><i class='fa fa-controller'></i>Chơi thử</a>";

                    }
                },
                headerAttributes: {
                    style: "text-align: center; font-size: 12px; font-weight:bold",
                    class: "table-header-cell"
                }
            },

        ]

    });

    LoadGridData();


    LoadComboCapDo();


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
        console.log(selectedItem);
        var selectedItem = $("#grid").data("kendoGrid").dataItem($("#grid").data("kendoGrid").select());
        $("#ID").val(selectedItem.ID);
        $("#TenBai").val(selectedItem.TenBai);
        $("#TenBuoi").val(selectedItem.TenBuoi);
        $("#BaiHoc").val(selectedItem.BaiHoc);
        $("#ComboCapDo").data("kendoComboBox").value(selectedItem.CapDo);
    }
}

function openChiTiet(id) {
    lstCauHoi = [];
    lstFlashCard = [];
    lstTroChoi = [];
    $("#windowChitiet").data("kendoWindow").open().maximize();
    $("#ID_BaiGiang").val(id);
    $.ajax({
        url: '/BaiGiang/GetAll_ChiTiet?ID_BaiGiang=' + id,
        type: 'GET',
    }).done(function successCallback(response) {
        $("#ID_ChiTietBaiGiang").val(response.ID);
        $("#gridFlashcard").data("kendoGrid").setDataSource(new kendo.data.DataSource({
            data: (response.ID ? response.lstFlashCard : []),
            schema: {
                model: {
                    id: "id",
                    fields: {
                        ID: { type: 'number', editable: false },
                        Ten: { type: 'string', editable: true },
                        ChuDe: { type: 'string', editable: false },
                        The: { type: 'string', editable: false },
                        AnhThe: { type: 'string', editable: false },
                        AmThanh: { type: 'string', editable: false },
                    }
                }
            },
            pageSize: 100
        }));

        $("#gridTroChoi").data("kendoGrid").setDataSource(new kendo.data.DataSource({
            data: (response.ID ? response.lstTroChoi : []),
            schema: {
                model: {
                    id: "id",
                    fields: {
                        ID: { type: 'number', editable: false },
                        TenTroChoi: { type: 'string', editable: true },
                        Loai: { type: 'number', editable: false },
                        NoiDung: { type: 'string', editable: false },
                    }
                }
            },
            pageSize: 100
        }));

        $("#gridCauHoi").data("kendoGrid").setDataSource(new kendo.data.DataSource({
            data: (response.ID ? response.lstCauHoi : []),
            schema: {
                model: {
                    id: "id",
                    fields: {
                        ID: { type: 'number', editable: false },
                        NoiDungCauHoi: { type: 'string', editable: true },
                        ID_DanhMuc: { type: 'number', editable: true },
                        TenDanhMuc: { type: 'string', editable: false }
                    }
                }
            },
            pageSize: 100
        }))
    })
}

function toDate(value) {
    var dateRegExp = /^\/Date\((.*?)\)\/$/;
    var date = dateRegExp.exec(value);
    return new Date(parseInt(date[1]));
}


function LoadGridData() {
    $.ajax({
        url: '/BaiGiang/GetAll',
        type: 'GET',
    }).done(function successCallback(response) {
        kendo.ui.progress($("#grid"), true);
        var dataSource = new kendo.data.DataSource({
            data: response,
            schema: {
                model: {
                    id: "ID",
                    fields: {
                        NgayTao: {
                            type: 'date'
                        }
                    }
                }
            },
            pageSize: 50,
        });
        $("#grid").data("kendoGrid").setDataSource(dataSource);
        kendo.ui.progress($("#grid"), false);
    });
}


function LoadComboCapDo() {
    //$.ajax({
    //    url: '/BaiGiang/GetAllCapDo',
    //    type: 'GET',
    //}).done(function successCallback(response) {
    var dataSource = new kendo.data.DataSource({
        //data: response
        data: [
            { text: "Cấp độ 1", value: 1 },
            { text: "Cấp độ 2", value: 2 },
            { text: "Cấp độ 3", value: 3 },
            { text: "Cấp độ 4", value: 4 },
            { text: "Cấp độ 5", value: 5 },
            { text: "Cấp độ 6", value: 6 },
            { text: "Cấp độ 7", value: 7 },
            { text: "Cấp độ 8", value: 8 }
        ]
    });
    $("#ComboCapDo").kendoComboBox({
        dataTextField: 'text',
        dataValueField: 'value',
        dataSource: dataSource
    });
    //});
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
    var validten = SetValidate("TenBai");
    var validkhoi = SetValidate("ComboCapDo");
    var valid = validten && validkhoi;
    if (valid) {
        var data = new FormData();
        var model = {
            ID: $("#ID").val(),
            TenBai: $("#TenBai").val(),
            TenBuoi: $("#TenBuoi").val(),
            BaiHoc: $("#BaiHoc").val(),
            CapDo: $("#ComboCapDo").data("kendoComboBox").value(),
        }
        //data.append("model", JSON.stringify(model));
        //if (file) {
        //    data.append('file', file.rawFile, filename);
        //}
        $.ajax({
            url: '/BaiGiang/CreateOrUpdate',
            //processData: false,
            //contentType: false,
            data: model,
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
        openConfirm(dialogRoot, "<b style='line-height:40px;'>Bạn có chắc chắn muốn xóa " + bangDuLieu.select().length + " bài giảng?</b>", function () { XoaDuLieu(bangDuLieu); }, function () { });
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
        url: '/BaiGiang/Delete?ID=' + ids.join(','),
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

function LuuChiTiet() {
    lstCauHoi = [];
    lstFlashCard = [];
    lstTroChoi = [];
    $.each($("#gridFlashcard").data("kendoGrid").dataSource.data(), function (index, item) {
        lstFlashCard.push(item.ID);
    });
    $.each($("#gridCauHoi").data("kendoGrid").dataSource.data(), function (index, item) {
        lstCauHoi.push(item.ID);
    });
    $.each($("#gridTroChoi").data("kendoGrid").dataSource.data(), function (index, item) {
        lstTroChoi.push(item.ID);
    });
    $.ajax({
        url: '/BaiGiang/CreateOrUpdate_ChiTiet',
        type: 'POST',
        data: {
            ID: $("#ID_ChiTietBaiGiang").val(),
            ID_BaiGiang: $("#ID_BaiGiang").val(),
            FlexCol1: lstFlashCard.toString(),
            FlexCol2: lstCauHoi.toString(),
            FlexCol3: lstTroChoi.toString(),
        }
    }).done(function successCallback(response) {
        if (response.status) {
            notification.show({ kValue: response.msg }, "success");
            //LoadHocSinhTrongLop($("#IDLop").val());
            LoadGridData();
            //HuyChiTietLop();
        } else {
            notification.show({ kValue: response.msg }, "error");
        }
    });
}

function HuyChiTiet() {
    $("#windowChitiet").data("kendoWindow").close();
    $("#ID_BaiGiang").val(0);
    $("#ID_ChiTietBaiGiang").val(0);
    lstCauHoi = null;
    lstFlashCard = null;
    lstTroChoi = null;
}

function AddRowFlashcard(e) {
    var grid = $("#gridFlashcard").data("kendoGrid");
    grid.addRow();
}

function DeleteRowFlashcard(uid) {
    var dataRow = $('#gridFlashcard').data("kendoGrid").dataSource.getByUid(uid);
    $('#gridFlashcard').data("kendoGrid").dataSource.remove(dataRow);
}

function AddRowCauHoi(e) {
    var grid = $("#gridCauHoi").data("kendoGrid");
    grid.addRow();
}

function DeleteRowCauHoi(uid) {
    var dataRow = $('#gridCauHoi').data("kendoGrid").dataSource.getByUid(uid);
    $('#gridCauHoi').data("kendoGrid").dataSource.remove(dataRow);
}
function htmlDecode(value) {
    return value.replace(/&lt;/g, "<").replace(/&gt;/g, ">");
}

function AddRowTroChoi(e) {
    var grid = $("#gridTroChoi").data("kendoGrid");
    grid.addRow();
}

function DeleteRowTroChoi(uid) {
    var dataRow = $('#gridTroChoi').data("kendoGrid").dataSource.getByUid(uid);
    $('#gridTroChoi').data("kendoGrid").dataSource.remove(dataRow);
}