var lstHocSinhTrongLop = [];
var lstCaHoc = []
$(document).ready(function () {

    $("#grid").kendoGrid({
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
                field: "NgaySinh",
                title: "Ngày sinh",
                template: function (e) {
                    var dateString = e.NgaySinh.substr(6);
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
                field: "NoiDungTinNhan",
                title: "Nội dung tin nhắn",
                filterable: false,
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

    //LoadGridData();
    LoadComboLop();
    //LoadComboMauTinNhan();

    $("#dialogRoot").kendoDialog().data("kendoDialog").close();

})

function toDate(value) {
    var dateRegExp = /^\/Date\((.*?)\)\/$/;
    var date = dateRegExp.exec(value);
    return new Date(parseInt(date[1]));
}

function ApDungTinNhan() {
    let Lop = $("#comboLop").data("kendoComboBox").value();
    let Nam = $("#comboNamSinh").data("kendoComboBox").value();
    let Loai = $("#comboDangHoc").data("kendoComboBox").value();
    let SDT = $("#soDienThoai").val();
    let dataRequest = {
        ID_Lop: Lop != "" ? Lop : 0,
        NamSinh: Nam != "" ? Nam : 0,
        DienThoai: SDT,
        Loai: Loai
    };
    $.ajax({
        url: '/HocSinh/GetByBoLocTinNhan',
        type: 'GET',
        data: dataRequest
    }).done(function successCallback(response) {
        $.each(response, function (index, item) {
            item.NoiDungTinNhan = $("#noiDungTinNhan").val();
        });
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
            pageSize: 50,
        });
        $("#grid").data("kendoGrid").setDataSource(dataSource);
        kendo.ui.progress($("#grid"), false);
    });
}


function LoadGridData() {
    $("#guithanhcong").text('');
    $("#guithatbai").text('');
    let Lop = $("#comboLop").data("kendoComboBox").value();
    let Nam = $("#comboNamSinh").data("kendoComboBox").value();
    let Loai = $("#comboDangHoc").data("kendoComboBox").value();
    let SDT = $("#soDienThoai").val();
    let dataRequest = {
        ID_Lop: Lop != "" ? Lop : 0,
        NamSinh: Nam != "" ? Nam : 0,
        DienThoai: SDT,
        Loai: Loai
    };
    $.ajax({
        url: '/HocSinh/GetByBoLocTinNhan',
        type: 'GET',
        data: dataRequest
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
            pageSize: 50,
        });
        $("#grid").data("kendoGrid").setDataSource(dataSource);
        kendo.ui.progress($("#grid"), false);
    });
}

function LoadComboLop() {
    $.ajax({
        url: '/Lop/GetAll',
        type: 'GET',
    }).done(function successCallback(response) {
        var dataSource = new kendo.data.DataSource({
            data: response
        });
        $("#comboLop").kendoComboBox({
            dataTextField: 'TenLop',
            dataValueField: 'ID',
            dataSource: dataSource,
            filter: "startswith"
        });
        let dataNamSinh = [];
        for (i = 0; i < 30; i++) {
            dataNamSinh.push({ text: 1994 + i, value: 1994 + i })
        }
        $("#comboNamSinh").kendoComboBox({
            dataTextField: 'text',
            dataValueField: 'value',
            dataSource: new kendo.data.DataSource({
                data: dataNamSinh
            })
        });
        $("#comboDangHoc").kendoComboBox({
            dataTextField: 'text',
            dataValueField: 'value',
            dataSource: new kendo.data.DataSource({
                data: [{ text: "Tất cả", value: 0 },
                    { text: "Có học tại trung tâm", value: 1 },
                    { text: "Không học tại trung tâm", value: 2 }]
            })
        });

        $("#comboMauTinNhan").kendoComboBox({
            dataTextField: 'TenDayDu',
            dataValueField: 'ID',
            dataSource: []
        });
    });
}

function GuiTinNhan() {
    $("#guithanhcong").text('');
    $("#guithatbai").text('');
    let requestData = [];
    let data = $("#grid").data("kendoGrid").dataSource.data();
    $.each(data, function (index, item) {
        requestData.push({
            SoDienThoai: item.DienThoaiMacDinh,
            ID_HocSinh: item.ID,
            NoiDungTinNhan: item.NoiDungTinNhan,
            TrangThai: 0
        })
    })
    $.ajax({
        url: '/TinNhan/GuiTinNhan',
        type: 'POST',
        data: { data: requestData }
    }).done(function successCallback(response) {
        if (response.thanhcong.length > 0) {
            var succ = [];
            $.each(response.thanhcong, function (index, item) {
                succ.push(item.SoDienThoai);
            })
            notification.show({ kValue: "Gửi thành công tới số: " + succ.join(', ') }, "success");
            $("#guithanhcong").text("Gửi thành công tới số: " + succ.join(', '));
        }
        if (response.thatbai.length > 0) {   
            var err = [];
            $.each(response.thatbai, function (index, item) {
                err.push(item.SoDienThoai);
            })
            notification.show({ kValue: "Gửi thất bại tới số: " + err.join(', ') }, "error");
            $("#guithatbai").text("Gửi thất bại tới số: " + err.join(', '));
        }
    })
}