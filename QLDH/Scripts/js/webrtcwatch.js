$(document).ready(function () {
    $("#tabstrip").kendoTabStrip({
        animation: {
            open: {
                effects: "fadeIn"
            }
        }
    });

    var chat = $("#chat").kendoChat({
        post: function (e) {
            if (yourId) {
                console.log(e.text);
                $.ajax({
                    url: '/LiveClass/InitCallSession',
                    type: 'POST',
                    data: { senderId: yourId, message: e.text, hubname: 'chat' }
                }).done(function (response) {

                })
            } else {
                return false;
            }
        },
        sendMessage: function (e) {
            return false;
        }
    }).data("kendoChat");


    //var mess =
    //    '<div class="k-message-group ">'
    //    + '<p class="k-author" > HealthCareBotService</p >'
    //    + '<img src="../Images/img.png" alt="HealthCareBotService" class="k-avatar">'
    //    + '<div class="k-message k-first">'
    //    + '<time class="k-message-time">12:26:36</time>'
    //    + '<div class="k-bubble">Hello,</div>'
    //    + '</div>'
    //    + '<div class="k-message k-middle">'
    //    + '<time class="k-message-time">12:26:36</time>'
    //    + '<div class="k-bubble">I am your Virtual Assistant at BioMed appointment management system.</div>'
    //    + '</div>'
    //    + '<div class="k-message k-middle">'
    //    + '<time class="k-message-time">12:26:36</time>'
    //    + '<div class="k-bubble">I am y.</div>'
    //    + '</div>'
    //    + '<div class="k-message k-last">'
    //    + '<time class="k-message-time">12:26:37</time>'
    //    + '<div class="k-bubble">I will assist you in finding a schedule for a check-up:'
    //    + '</div>'
    //    + '</div>'

    //    + '<div class="k-quick-replies">'
    //    + '<span class="k-quick-reply" data-value="A. 123123">A. 123123'
    //    + '</span>'
    //    + '<span class="k-quick-reply" data-value=">B. 123323">B. 123323'
    //    + '</span>'
    //    + '<span class="k-quick-reply" data-value="C. 123234">C. 123234'
    //    + '</span>'
    //    + '<span class="k-quick-reply" data-value="D. 123124">D. 123124'
    //    + '</span>'
    //    + '</div>';
    //$(".k-message-list-content").append(mess);
});