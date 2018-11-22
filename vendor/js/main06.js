var $msg = $('.messages')
var $msgContent = $('.messages-content');
var loading_html = '<div class="bubble loading robot"><div class="img"><img src="../vendor/img/ml_1272.png"></div><p><span><i></i><i></i><i></i></span></p></div>';



function returnAsJsonObject(source) {
    return typeof (source) === 'string' ? JSON.parse(source) : source;
}


function send() {
    var accessToken = "370565894dda458fb9d58d72f001f346";
    var baseUrl = "https://api.api.ai/v1/";
    var text = $(".msg-input").val();
    $.ajax({
        type: "POST",
        url: baseUrl + "query?v=20150910",
        contentType: "application/json; charset=utf-8",
        headers: {
            "Authorization": "Bearer " + accessToken,
        },
        data: JSON.stringify({
            query: text,
            lang: "zh-TW",
            sessionId: "somerandomthing"
        }),
        success: function (data) {
            //console.log(data)
            console.log(data.result.fulfillment.speech)
            anwserView(data.result.fulfillment.speech)
        },
        error: function () {
           // console.log('NONONO')
        }
    });
}

function updateScrollbar() {
    $msgContent.mCustomScrollbar("update").mCustomScrollbar('scrollTo', 'bottom', {
        scrollInertia: 10,
        scrollEasing: "easeIn",
        timeout: 0
    });
}


function welcome() {
    var $msgContent = $('.messages-content');
    $msgContent.children('.mCustomScrollBox').children('.mCSB_container').addClass('bubleContent');
    var bubble = $('<div>').addClass('bubble robot')
    var robot_html = '<p>今天想喝什麼飲料呢？紅茶、綠茶、奶茶？</p>'
    $(robot_html).appendTo(bubble)
    $(bubble).appendTo($('.bubleContent'))
    setTimeout(function () { 
        $(bubble).addClass('new')
        updateScrollbar()
    }, 1000)
}


function insertMsg() {
    var msg = $('.msg-input').val();
    var $msgContent = $('.messages-content');

    if ($.trim(msg) == '') {
        return false;
    }

    $msgContent.children('.mCustomScrollBox').children('.mCSB_container').addClass('bubleContent');
    var bubble = $('<div>').addClass('bubble user')
    var user_html = '<p>' + msg + '</p>'
    $(user_html).appendTo(bubble)
    $(bubble).appendTo($('.bubleContent'))
    setTimeout(function () { 
        $(bubble).addClass('new')
        updateScrollbar()
    }, 500)

    // var user_html = '<div class="bubble user"><p>' + msg + '</p></div>';
    // $(user_html).appendTo($('.bubleContent')).addClass('new');
    // updateScrollbar();

}

// function btnMsg(text) {
//     var $msgContent = $('.messages-content');
//     $msgContent.children('.mCustomScrollBox').children('.mCSB_container').addClass('bubleContent');

//     var user_html = '<div class="bubble user"><p>' + text + '</p></div>';
//     $(user_html).appendTo($('.bubleContent')).addClass('new');
//     updateScrollbar();
// }

function anwserView(data) {
    var $msgContent = $('.messages-content');
    $msgContent.children('.mCustomScrollBox').children('.mCSB_container').addClass('bubleContent');
    var bubble = $('<div>').addClass('bubble robot')
    var robot_html = '<p>' + data + '</p>'
    $(robot_html).appendTo(bubble)
    $(bubble).appendTo($('.bubleContent'))
    setTimeout(function () { 
        $(bubble).addClass('new')
        updateScrollbar()
    }, 1000)
}

function init() {
    $('.messages-content').mCustomScrollbar({
        mouseWheelPixels: 100
    });


    $('.msg-send').on('click', function () {
        insertMsg();
        send()
        $('.msg-input').val('')
    })

    $('.msg-input').on('keydown', function (e) {
        if (e.which === 13) {
            insertMsg();
            send()
            $(this).val('')
            return false;
        }
    })

    $('.circleBtn').on('click',function(){
        $('.chatBot').addClass('on')
        $('.circleBtn').addClass('off')
        welcome()
    })

    $('.closetX').on('click',function(){
        $('.chatBot').removeClass('on')
        $('.bubleContent').html('')
        setTimeout(function(){
            $('.circleBtn').removeClass('off')
        },500)
        
    })

}

$(function () {
    init()
})