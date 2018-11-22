var $msg = $('.messages')
var $msgContent = $('.messages-content');
var loading_html = '<div class="bubble loading robot"><div class="img"><img src="../Content/ml_1272.png"></div><p><span><i></i><i></i><i></i></span></p></div>';


$.ajax({
    url: '/Content/optionSelect.json',
    dataType: 'json'
})
    .done(function (res) {
        optionUp(res);
    })

function updateScrollbar() {
    $msgContent.mCustomScrollbar("update").mCustomScrollbar('scrollTo', 'bottom', {
        scrollInertia: 10,
        scrollEasing: "easeIn",
        timeout: 0
    });
}

function horizontalScroll(test) {
    $(test).mousewheel(function (e, delta) {
        this.scrollLeft -= (delta * 40);
        e.preventDefault();
    });
}

function welcome() {

    var welcome_html = '<div class="bubble robot"><div class="img"><img src="../Content/ml_1272.png"></div><p>您好！我是搭機小幫手，請問我可以為您提供什麼服務呢?</p></div>'

    $msgContent.children('.mCustomScrollBox').children('.mCSB_container').addClass('bubleContent');
    $(loading_html).appendTo($('.bubleContent'))
    updateScrollbar();

    setTimeout(function () {
        $('.bubble.loading').remove();
        $(welcome_html).appendTo($('.bubleContent')).addClass('new');
        updateScrollbar()

    }, 500)
}


function insertMsg() {
    var msg = $('.msg-input').val();

    if ($.trim(msg) == '') {
        return false;
    }

    $msgContent.children('.mCustomScrollBox').children('.mCSB_container').addClass('bubleContent');


    var user_html = '<div class="bubble user"><p>' + msg + '</p></div>';
    $(user_html).appendTo($('.bubleContent')).addClass('new');
    msg = $('.msg-input').val('');

    updateScrollbar();
}



function selectOption(data, that) {
    var optionName = $(that).attr('id');

    var trend_html = '<div class="bubble robot"><div class="img"><img src="../Content/ml_1272.png"></div><p>以下是為您查詢的結果</p></div>'

    var temp = "";

    $.each(data, function (i, item) {
        var ticketBox_html = '<div class="ticketBox"><div class="ticketTop"><div class="date">' + item.date + '</div><div class="location"><span>' + item.fromE + '</span><i>✈</i><span>' + item.destinationE + '</span></div><div class="location-s"><span>' + item.form + '</span><i>✈</i><span>' + item.destination + '</span></div><div class="info"><span class="num">' + item.number + '</span><div class="time"><span>' + item.timeF + '</span><i>→</i><span>' + item.timeD + '</span></div></div></div><div class="ticketBottom"><div class="block left"><span>頭等 / 商務</span>：<i>F</i><a href="javascript:;">登記</a></div><div class="block right"><span>經濟</span>：機會良好<i></i><a href="javascript:;">登記</a></div></div></div>';
        temp += ticketBox_html;
        //$(ticketBox_html).appendTo(ticket_html);
    })

    var ticket_html = '<div class="ticket"><div class="inner">';
    ticket_html += temp;
    ticket_html += '</div></div>'

    var user_html = '<div class="bubble user"><p>我要查動態</p></div>';
    var user_html2 = '<div class="bubble user"><p>我要查航班</p></div>';

    $msgContent.children('.mCustomScrollBox').children('.mCSB_container').addClass('bubleContent');

    if (optionName == 'option01') {

        $(user_html).appendTo($('.bubleContent')).addClass('new');
        $(loading_html).appendTo($('.bubleContent'))
        updateScrollbar();

        setTimeout(function () {
            $('.bubble.loading').remove();
            $(trend_html).appendTo($('.bubleContent')).addClass('new');
            $(ticket_html).appendTo($('.bubleContent'));


            $('.ticket .inner').mCustomScrollbar({
                axis: "x",
                scrollbarPosition: "outside",
                scrollInertia: 0,
                mouseWheel: false
            })
            $('.ticket .inner').dragOn();
            updateScrollbar();

        }, 1000 + (Math.random() * 20) * 100)
    } else if (optionName == 'option02') {
        $(user_html2).appendTo($('.bubleContent')).addClass('new');

        $(loading_html).appendTo($('.bubleContent'))
        updateScrollbar();

        setTimeout(function () {
            $('.bubble.loading').remove();
            $(trend_html).appendTo($('.bubleContent')).addClass('new');

            updateScrollbar()
        }, 1000 + (Math.random() * 20) * 100)
    }
}



function optionUp(data) {

    var temp = "";
    $.each(data, function (i, item) {
        var option_html = '<li><a href="javascript:;" id=\"' + item.id + '\">' + item.list + '</a></li>'
        temp += option_html;
    })

    var opctionBox = '<div class="opctionBox"><ul class="opctionList">';
    opctionBox += temp;
    opctionBox += '</ul></div>';
    $(opctionBox).appendTo($msg);


    $('.opctionBox').mCustomScrollbar({
        axis: "x",
        scrollbarPosition: "outside",
        scrollInertia: 0,
        mouseWheel: false
    })

    $('.opctionBox').dragOn();

    $('.opctionList').on('click', 'a', function () {
        var that = this;
        $.ajax({
            url: '/Content/register.json',
            dataType: 'json'
        })
            .done(function (res) {
                //alert(res)
                selectOption(res, that)
            })


    })
}


$(window).load(function () {

    $('.orderBtn').on('click', function () {
        $('.chatBot').addClass('on');
        welcome();

    })

    $('.xx').on('click', function () {
        $('.chatBot').removeClass('on');
    })


    // setTimeout(function() {
    // 	welcome();			
    // }, 300);


    $msgContent.mCustomScrollbar();

    $('.msg-send').on('click', function () {
        insertMsg();
    })

    $(window).on('keydown', function (e) {
        if (e.which == 13) {
            insertMsg();
            return false;
        }
    })



})