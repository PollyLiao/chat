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

function scrollBox(){
    myScroll = new IScroll('#iscroll', {
        eventPassthrough: true,
        scrollX: true,
        scrollY: false,
        preventDefault: false,
        eventPassthrough: true,
        scrollbars: true,
        fadeScrollbars: true,
        interactiveScrollbars: true,
    });
}

function msgHeight(){
    var iscroll = $('.messages').find('#iscroll').length
    if(iscroll > 0){
        $('.messages-content').addClass('on')
        scrollBox()
    }else{
        $('.messages-content').removeClass('on')
    }
    updateScrollbar()
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
    }, 1000)
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

}

function btnMsg(text){
    $msgContent.children('.mCustomScrollBox').children('.mCSB_container').addClass('bubleContent');

    var user_html = '<div class="bubble user"><p>' + text + '</p></div>';
    $(user_html).appendTo($('.bubleContent')).addClass('new');
    updateScrollbar();
}


function inserTime(){
    today = new Date();
    today_year = today.getFullYear();
    today_month = today.getMonth()+1;
    today_date = today.getDate(); 
    today_hours = today.getHours();
    today_minutes = today.getMinutes();
    today_seconds = today.getSeconds();
    
    nowDate = today_year+"-"+today_month+"-"+today_date+"  "+today_hours+":"+today_minutes+":"+today_seconds;
    return nowDate
}

function sendAnwser(inputText) {
     msg = $('.msg-input').val('');

     if (inputText == '我要登記') {
        $.ajax({
            url: 'http://localhost:5555/chatTest_20171011/vendor/api/Argument.json',
            type: 'GET',
            success:function(data){
                var parseData = JSON.parse(data)
                checkType(parseData)
            }
        })
     }

    if(inputText == '選擇票種' ){
        $.ajax({
            url:'http://localhost:5555/chatTest_20171011/vendor/api/Argument01.json',
            type:'GET',
            success:function(data){
                var parseData = JSON.parse(data)
                checkType(parseData)
            }
        })
    }

    if(inputText == '確認變更'){
        $.ajax({
            url:'http://localhost:5555/chatTest_20171011/vendor/api/Argument02.json',
            type:'GET',
            success:function(data){
                var parseData = JSON.parse(data)
                checkType(parseData)
            }
        })
    }

    if(inputText == '航廈資訊'){
        $.ajax({
            url:'http://localhost:5555/chatTest_20171011/vendor/api/Argument04.json',
            type:'GET',
            success:function(data){
                var parseData = JSON.parse(data)
                checkType(parseData)
            }
        })
    }
}


function checkType(data) {
    var parseData = data
    var ArgumentArr = parseData.Argument
    var object_html = $('<div>').addClass('ticketBox')
    var slider = $('<div>').addClass('slider')

    for (var i = 0; i < ArgumentArr.length; i++) {
        if (parseData.Argument[i].Type == "Text") {
            var user_html = '<div class="bubble robot"><div class="img"><img src="../vendor/img/ml_1272.png"></div><p>' + parseData.Argument[i].Payload + '</p></div>'
        
        } else if (parseData.Argument[i].Type == "DynamicObject") {

            if (parseData.Argument[i].PayloadInfo == "ListSeatAvailableArray") {
                var ListSeatAvailable = parseData.Argument[i].Payload.ListSeatAvailable
                for(var x=0; x<ListSeatAvailable.length; x++){
                     var registerBox ='<div class="registerBox"><div class="registerTop"><div class="info">'
                         registerBox +='<span class="date">'+ListSeatAvailable[x].FlightInfo.DepartDate +'</span>'     
                         registerBox +='<span class="num">'+ListSeatAvailable[x].FlightInfo.AirlineCodeFlightNo+'</span></div>'       
                         registerBox +='<div class="location"><span>'+ ListSeatAvailable[x].FlightInfo.DepartFrom.slice(-4, -1) +'</span><i></i><span>'+ ListSeatAvailable[x].FlightInfo.ArriveTo.slice(-4, -1)+'</span></div>'         
                         registerBox +='<div class="location-s"><span>'+ ListSeatAvailable[x].FlightInfo.DepartFrom.slice(0, -5)+'</span><span>'+ListSeatAvailable[x].FlightInfo.ArriveTo.slice(0, -5)+'</span></div>'     
                         registerBox +='<div class="time">'       
                         registerBox +='<span>'+ ListSeatAvailable[x].FlightInfo.DepartTime+'</span>'      
                         registerBox +='<span>'+ListSeatAvailable[x].FlightInfo.ArriveTime +'</span>'      
                         registerBox +='</div></div><div class="registerBottom">'   
                         var block =""        

                    for (var a = 0; a < ListSeatAvailable[x].FlightCabininfo.length; a++) {
                        block += '<div class="block'
                        if (ListSeatAvailable[x].FlightCabininfo[a].SeatAvailable > 0) {
                            block += ' ok'

                        } else {
                            block += ' no'
                        }
                        block += '">';
                        if (ListSeatAvailable[x].FlightCabininfo[a].CabinClass == 'Y') {
                            block += '<div><span>商務艙</span>：'
                        } else if (ListSeatAvailable[x].FlightCabininfo[a].CabinClass == 'V') {
                            block += '<div><span>經濟艙</span>：'
                        }
                        if (ListSeatAvailable[x].FlightCabininfo[a].SeatAvailable > 0) {
                            block += '<span>尚有</span><i>' + ListSeatAvailable[x].FlightCabininfo[a].SeatAvailable + '</i></div>'
                        } else {
                            block += '<span></span><i>' + ListSeatAvailable[x].FlightCabininfo[a].SeatAvailable + '</i></div>'
                        }
                        block += '<div><a href="javascript:;" class="registerBtn" data-text="'+ListSeatAvailable[x].FlightCabininfo[a].CabinClass
                        block += '">登記</a></div>'
                        block += '</div>'
                    }  
                    registerBox += block
                    registerBox += '</div></div>'
                }

            }else if (parseData.Argument[i].PayloadInfo == "QuickReply") {
                var ButtonText = parseData.Argument[i].Payload.ButtonText
                var offsetScroll = $('<div id="iscroll">')
                var btn_html = $('<div>').addClass('opctionBox')
                var btnList = $('<ul>').addClass('opctionList')

                for (var x = 0; x < ButtonText.length; x++) {
                    var list_html = '<li><a href="javascript:;">' + ButtonText[x] + '</a></li>'
                    $(list_html).appendTo(btnList)                    
                }

                $(btnList).appendTo(btn_html)
                $(btn_html).appendTo(offsetScroll)


            }else if(parseData.Argument[i].PayloadInfo == "MemberTickets"){
                var MemberTickets = parseData.Argument[i].Payload.MemberTickets
                var ConfirmBtn = '<a href="javascript:;" class="confirmBtn checkBtn sure">確認</a>'
                for(var x = 0; x<MemberTickets.length; x++){
                    var checkBox = '<div class="checkBox"><div class="registerTop checkBoxTop">'
                    checkBox +='<div class="date">'+MemberTickets[x].FlightInfo.DepartDate+'</div>'        
                    checkBox +='<div class="location"><span>'+MemberTickets[x].FlightInfo.DepartFrom.slice(-4, -1)+'</span><i>✈</i><span>'+MemberTickets[x].FlightInfo.ArriveTo.slice(-4, -1)+'</span></div>'
                    checkBox +='<div class="location-s"><span>'+MemberTickets[x].FlightInfo.DepartFrom.slice(0, -5)+'</span><i> - </i><span>'+MemberTickets[x].FlightInfo.ArriveTo.slice(0, -5)+'</span></div>'
                    checkBox +='<div class="info">'   
                    checkBox +='<span class="num">'+MemberTickets[x].FlightInfo.AirlineCodeFlightNo+'</span>'        
                    checkBox +='<div class="time"><span>'+MemberTickets[x].FlightInfo.DepartTime+'</span><i> - </i><span>'+MemberTickets[x].FlightInfo.ArriveTime+'</span></div>'            
                    checkBox +='</div></div>'           
                    checkBox +='<div class="passengerInfo"><div class="inn"><ul>'
                    checkBox +='<li><label>訂位艙等：</label><span>'+MemberTickets[x].Tickets.CabinClass+'</span></li>'
                    checkBox +='<li><label>乘客姓名：</label><div><span>'+MemberTickets[x].Tickets.SurName+'</span><span>'+MemberTickets[x].Tickets.GivenName+'</span><span>空白</span></div></li>'                
                    checkBox +='<li><label>機票號碼：</label><span class="ticketNum">'+MemberTickets[x].Tickets.TicketNumber+'</span></li>'                
                    checkBox +='<li><label>訂位票種：</label><span>空白</span></li>'                
                    checkBox +='<li><label>開票日期：</label><span>'+MemberTickets[x].Tickets.IssueDate+'</span></li>'                               
                    checkBox +='</ul></div>'            
                    checkBox +='<div class="checkCube"><i></i><p>選擇本機票</p></div>'        
                    checkBox +='</div></div>' 

                    $(checkBox).appendTo(slider)
                   
                }
                $(slider).appendTo(object_html)
                $(ConfirmBtn).appendTo(object_html)


            }else if(parseData.Argument[i].PayloadInfo == "TicketChangeConfirm"){
                var TicketChangeConfirm = parseData.Argument[i].Payload.TicketChangeConfirm
                var ConfirmBtn = '<a href="javascript:;" class="confirmBtn sure">確認無誤</a>'
                for(var x =0; x<TicketChangeConfirm.length; x++){
                    var ConfirmInfo = '<div class="registerBox"><div class="registerTop">'
                        ConfirmInfo +='<div class="location"><span>'+TicketChangeConfirm[x].FlightAfter.DepartFrom.slice(-4, -1)+'</span><i>✈</i><span>'+TicketChangeConfirm[x].FlightAfter.ArriveTo.slice(-4, -1)+'</span></div>'
                        ConfirmInfo +='<div class="location-s"><span>'+TicketChangeConfirm[x].FlightAfter.DepartFrom.slice(0, -5)+'</span><i>-</i><span>'+TicketChangeConfirm[x].FlightAfter.ArriveTo.slice(0, -5)+'</span></div></div>'
                        ConfirmInfo +='<div class="changeBox"><ul>'
                        ConfirmInfo +='<li><span>變更前</span></li>'
                        ConfirmInfo +='<li><label>班機代號：</label><span>'+TicketChangeConfirm[x].FlightBefore.AirlineCodeFlightNo+'</span></li>'            
                        ConfirmInfo +='<li><label>班機時間：</label><span>'+TicketChangeConfirm[x].FlightBefore.DepartDate+'</span></li>'

                        if(TicketChangeConfirm[x].CabinClassBefore=="Y"){
                           ConfirmInfo +='<li><label>訂位艙等：</label><span>商務艙</span></li>' 
                        }else if(TicketChangeConfirm[x].CabinClassBefore=="V"){
                            ConfirmInfo +='<li><label>訂位艙等</label><span>經濟艙</span></li>' 
                        }
           
                        ConfirmInfo +='<li><label>訂位票種：</label><span>空白</span></li>'            
                        ConfirmInfo +='</ul><ul>'        
                        ConfirmInfo +='<li><span class="pink">變更後</span></li>'            
                        ConfirmInfo +='<li><label>班機代號：</label><span>'+TicketChangeConfirm[x].FlightAfter.AirlineCodeFlightNo+'</span></li>'            
                        ConfirmInfo +='<li><label>班機時間：</label><span>'+TicketChangeConfirm[x].FlightAfter.DepartDate+'</span></li>'            

                        if(TicketChangeConfirm[x].CabinClassAfter=="Y"){
                            ConfirmInfo +='<li><label>訂位艙等：</label><span>商務艙</span></li>'
                        }else if(TicketChangeConfirm[x].CabinClassAfter=="V"){
                            ConfirmInfo +='<li><label>訂位艙等：</label><span>經濟艙</span></li>'
                        }
           
                        ConfirmInfo +='<li><label>訂位票種：</label><span>空白</span></li>'            
                        ConfirmInfo +='</ul></div></div>'  
                    $(ConfirmInfo).appendTo(slider)                       
                }
                $(slider).appendTo(object_html)
                $(ConfirmBtn).appendTo(object_html)

            }else if(parseData.Argument[i].PayloadInfo == "BoardingTerminal"){
              var  BoardingTerminalInfo = parseData.Argument[i].Payload.BoardingTerminal
              for(var x = 0; x<BoardingTerminalInfo.length; x++){
                var BoardingTermina='<div class="checkBox"><div class="registerTop checkBoxTop">'
                    BoardingTermina+='<div class="date">'+BoardingTerminalInfo[x].FlightInfo.DepartDate+'</div>'            
                    BoardingTermina+='<div class="location"><span>'+BoardingTerminalInfo[x].FlightInfo.DepartFrom.slice(-4, -1)+'</span><i>✈</i><span>'+BoardingTerminalInfo[x].FlightInfo.ArriveTo.slice(-4, -1)+'</span></div>'            
                    BoardingTermina+='<div class="location-s"><span>'+BoardingTerminalInfo[x].FlightInfo.DepartFrom.slice(0, -5)+'</span><i>-</i><span>'+BoardingTerminalInfo[x].FlightInfo.ArriveTo.slice(0, -5)+'</span></div>'            
                    BoardingTermina+='<div class="info">'            
                    BoardingTermina+='<span class="num">'+BoardingTerminalInfo[x].FlightInfo.AirlineCodeFlightNo+'</span>'                
                    BoardingTermina+='<div class="time"><span>'+BoardingTerminalInfo[x].FlightInfo.DepartTime+'</span><i>-</i><span>'+BoardingTerminalInfo[x].FlightInfo.ArriveTime+'</span></div>'                
                    BoardingTermina+='</div></div><div class="infoBox"><ul>'            
                    BoardingTermina+='<li><label>報到處：</label><div>' 
                    BoardingTermina+='<span>'+BoardingTerminalInfo[x].BoardingTerminalInfo+'</span>' 
                    BoardingTermina+='</div></li></ul></div></div>'   
                    $(BoardingTermina).appendTo(slider)           
                }
                $(slider).appendTo(object_html)
            }
        }
    }
    anwserView(user_html, object_html, offsetScroll)
}

function anwserView(txtHtml,objectHtml,btn_html){
    var $msgContent = $('.messages-content');
    $msgContent.children('.mCustomScrollBox').children('.mCSB_container').addClass('bubleContent');
    
    $(loading_html).appendTo($('.bubleContent'))
    updateScrollbar();
    setTimeout(function() {
        $('.bubble.loading').remove();
        $(txtHtml).appendTo($('.bubleContent')).addClass('new');
        $(objectHtml).appendTo($('.bubleContent')).addClass('new')
        $(btn_html).appendTo($msg)
        sliderBox()   
        updateScrollbar();
        msgHeight()
    }, 1000)  
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

    $('.orderBtn').on('click', function () {
        $('.chatBot').addClass('on');
        welcome()
     })


    $('.xBtn').on('click', function () {
        $('.chatBot').removeClass('on');
    })
    
    $('.minus').on('click',function(){
        $('.chatBot').toggleClass('upDown');
    })

    // setTimeout(function() {
    //  welcome();          
    // }, 100);


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


    $(document).on('click', '.checkCube i', function() {
        $(this).toggleClass('on')
        if ($('.checkCube i').hasClass('on')) {
            $('.confirmBtn.checkBtn').addClass('on')
        } else {
            $('.confirmBtn.checkBtn').removeClass('on')
        }
        updateScrollbar()
    })

    $(document).on('click', '.sure', function() {
        var arr = []
        $('.checkBox').each(function() {
            if ($(this).find('.checkCube').children('i').hasClass('on')) {
                arr.push({"機票號碼":$(this).find('.ticketNum').text()})
            }
        })
        console.log(arr)

        btnMsg($(this).text())
    })

    $(document).one('click','.registerBtn',function(){
        $('.registerBtn').addClass('on')
        if($(this).data('text') == 'Y'){
            btnMsg('登記商務艙')
        }else if($(this).data('text') == 'V'){
            btnMsg('登記經濟艙')
        }
    })


})