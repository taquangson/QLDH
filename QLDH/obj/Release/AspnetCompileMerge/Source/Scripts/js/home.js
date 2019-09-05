$(document).ready(function () {
    $.ajax({
        url: '/LichHoc/GetLichTuan',
        data: {
            GioBatDau: '00:00:00',
            GioKetThuc: '12:00:00'
        },
        type: 'GET',
    }).done(function successCallback(response) {
        for (var i = 1; i <= 7; i++) {
            html = "";
            var lstCa = []
            $.each(response.filter(function (st) { return st.Thu == i; }), function (index, item) {
                if (lstCa.indexOf(item.TenCa) < 0) {
                    lstCa.push(item.TenCa);
                }
            })

            $.each(lstCa, function (index, item) {
                html += "</br><b style='color:#466b90'>" + item + "</b>";
                $.each(response.filter(function (st) { return st.Thu == i; }), function (index2, item2) {
                    if (item2.TenCa == item) {
                        html += "</br> - " + item2.TenLop;
                    }
                })
            })
            $("#sang" + i).html(html);
        }
    })

    $.ajax({
        url: '/LichHoc/GetLichTuan',
        data: {
            GioBatDau: '12:00:00',
            GioKetThuc: '18:00:00'
        },
        type: 'GET',
    }).done(function successCallback(response) {
        for (var i = 1; i <= 7; i++) {
            html = "";
            var lstCa = []
            $.each(response.filter(function (st) { return st.Thu == i; }), function (index, item) {
                if (lstCa.indexOf(item.TenCa) < 0) {
                    lstCa.push(item.TenCa);
                }
            })

            $.each(lstCa, function (index, item) {
                html += "</br><b style='color:#466b90'>" + item + "</b>";
                $.each(response.filter(function (st) { return st.Thu == i; }), function (index2, item2) {
                    if (item2.TenCa == item) {
                        html += "</br> - " + item2.TenLop;
                    }
                })
            })
            $("#chieu" + i).html(html);
        }
    })

    $.ajax({
        url: '/LichHoc/GetLichTuan',
        data: {
            GioBatDau: '18:00:00',
            GioKetThuc: '23:00:00'
        },
        type: 'GET',
    }).done(function successCallback(response) {
        for (var i = 1; i <= 7; i++) {
            html = "";
            var lstCa = []
            $.each(response.filter(function (st) { return st.Thu == i; }), function (index, item) {
                if (lstCa.indexOf(item.TenCa) < 0) {
                    lstCa.push(item.TenCa);
                }
            })

            $.each(lstCa, function (index, item) {
                html += "</br><b style='color:#466b90'>" + item + "</b>";
                $.each(response.filter(function (st) { return st.Thu == i; }), function (index2, item2) {
                    if (item2.TenCa == item) {
                        html += "</br> - " + item2.TenLop;
                    }
                })
            })
            $("#toi" + i).html(html);
        }
    })
})