var $msg = $('.messages')
var $msgContent = $('.messages-content');
var loading_html = '<div class="bubble loading robot"><div class="img"><img src="../vendor/img/ml_1272.png"></div><p><span><i></i><i></i><i></i></span></p></div>';


function updateScrollbar() {
    $msgContent.mCustomScrollbar("update").mCustomScrollbar('scrollTo', 'bottom', {
        scrollInertia: 10,
        scrollEasing: "easeIn",
        timeout: 0
    });
}

function sliderBox(){
    var length = $('.bubleContent .ticketBox').length;
    $('.bubleContent .ticketBox').eq(length-1).find('.slider').addClass('goSlider'+(length-1));
    $('.goSlider'+(length-1)).slick({
        centerMode: true,
        infinite: false,
        centerPadding: '0',
        slidesToShow: 1,
        variableWidth: true,
        variableHeight: true,
        arrows:true,
        dots:true,
        nextArrow: '<button type="button" class="nextBtn"></button>',
        prevArrow: '<button type="button" class="prevBtn"></button>'    
    });

}
function welcome() {
    var welcome_html = '<div class="bubble robot"><div class="img"><img src="../vendor/img/ml_1272.png"></div><p>您好！我是搭機小幫手，請問我可以為您提供什麼服務呢?</p></div>'

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
    updateScrollbar();

    // setTimeout(function(){
    //     sendAnwser($('.msg-input').val())
    // },1000 + (Math.random() * 20) * 100)
}


function sendAnwser(inputText) {
     msg = $('.msg-input').val('');

     if (inputText == '查航班' || '查班機') {
        $.ajax({
            url: 'http://localhost:8080/chatTest_20171011/vendor/api/Argument.json',
            type: 'GET',
            success:function(data){
                //var parseData = JSON.parse(data)
                var parseData = data
                var ArgumentArr = parseData.Argument
                var object_html = $('<div>').addClass('ticketBox')
                var slider =$('<div>').addClass('slider')
                for (var i = 0; i < ArgumentArr.length; i++){
                     if (parseData.Argument[i].Type == "Text"){
                        var user_html = '<div class="bubble robot"><div class="img"><img src="../vendor/img/ml_1272.png"></div><p>' + parseData.Argument[i].Payload + '</p></div>'
                    }else if (parseData.Argument[i].Type == "DynamicObject"){
                        if (parseData.Argument[i].PayloadInfo == "ListSeatAvailableArray"){
                            var ListSeatAvailableArray = parseData.Argument[i].Payload.ListSeatAvailableArray
                            
                            for (var i = 0; i < ListSeatAvailableArray.length; i++){
                                 var registerBox = '<div class="registerBox"><div class="registerTop"><div class="date">'+ListSeatAvailableArray[i].ListSeatAvailable.DepartDate+'</div><div class="location"><span>'+ListSeatAvailableArray[i].ListSeatAvailable.DepartFrom.slice(-4,-1)+'</span><i> - </i><span>'+ListSeatAvailableArray[i].ListSeatAvailable.ArriveTo.slice(-4, -1)+'</span></div><div class="location-s"><span>'+ListSeatAvailableArray[i].ListSeatAvailable.DepartFrom.slice(0, -5)+'</span><i>✈</i><span>'+ListSeatAvailableArray[i].ListSeatAvailable.ArriveTo.slice(0, -5)+'</span></div><div class="info"><span class="num">'+ListSeatAvailableArray[i].ListSeatAvailable.AirlineCodeFlightNo+'</span><div class="time"><span>'+ListSeatAvailableArray[i].ListSeatAvailable.DepartTime+'</span><i>→</i><span>'+ListSeatAvailableArray[i].ListSeatAvailable.ArriveTime+'</span></div></div></div><div class="registerBottom"><div class="block ok"><div><span>商務艙</span>：<span>尚有</span><i>10</i></div><div><a href="javascript:;">登記</a></div></div><div class="block no"><div><span>經濟艙</span>：<i>-10</i></div><div><a href="javascript:;">登記</a></div></div></div></div>'
                                 $(registerBox).appendTo(slider)
                                 $(slider).appendTo(object_html)
                            }
                        }
                    }
                }
                anwserView(user_html,object_html)
            }
        })
     }

     if(inputText == '查資訊'){
        alert('找不到')
     }




}


function anwserView(txtHtml,objectHtml){
    $msgContent.children('.mCustomScrollBox').children('.mCSB_container').addClass('bubleContent');
    
    $(loading_html).appendTo($('.bubleContent'))
    updateScrollbar();
    setTimeout(function() {
        $('.bubble.loading').remove();
        $(txtHtml).appendTo($('.bubleContent')).addClass('new');
        $(objectHtml).appendTo($('.bubleContent')).addClass('new').delay(1000);
        sliderBox()
        updateScrollbar(); 
    }, 1000 + (Math.random() * 20) * 100)  
}

function send(){
    $.ajax({
        type:'',
        url:'',
        beforeSend:function(){

        },
        success:function(){

        },
        fail:function(){

        }
    })
}

$(window).load(function () {

    // $('.orderBtn').on('click', function () {
    //     $('.chatBot').addClass('on');
    //     welcome()
    //  })


    // $('.xx').on('click', function () {
    //     $('.chatBot').removeClass('on');
    // })
    


    setTimeout(function() {
     welcome();          
    }, 100);


    $msgContent.mCustomScrollbar();

    $('.msg-send').on('click', function () {
        var inputVal = $('.msg-input').val()
        insertMsg();
        sendAnwser($('.msg-input').val())
        
    })

    $(window).on('keydown', function (e) {
        if (e.which == 13) {
            insertMsg();
            sendAnwser($('.msg-input').val())
            return false;
        }
    })

 

})