var myInterval, AttemptedAns = [], questionTime = [], startTime,
    TotalTime = 0, runningTime = 0;

function NextQuestion(e) {
    var t = $(".test-questions").find("li.active");

    addTime(t.index());


    if (CheckNextPrevButtons(), t.is(":last-child")) return !1;
    $(".test-questions").find("li").removeClass("active"), t.next().addClass("active"), OpenCurrentQue(t.next().find("a")), e && (t.find("a").addClass("que-not-answered"), t.find("a").removeClass("que-not-attempted"));

    var a = t.attr("data-seq");
    $(".nav-tab-sections").find("li").removeClass("active"), $(".nav-tab-sections").find("li[data-id=" + a + "]").addClass("active"), CheckQueAttemptStatus()

}
function addTime(index) {

    var lastTime = questionTime[index]["Time"].split(':');

    var lastTimeSeconds = (+lastTime[0]) * 60 * 60 + (+lastTime[1]) * 60 + (+lastTime[2]);
    var endTime = "00:00:00";
    if ($(".timer-title").text() != "Time Out")
        endTime = $(".timer-title").text();

    var tdiff = diff(endTime, startTime);

    var totalT = lastTimeSeconds + tdiff;
    questionTime[index]["Time"] = new Date(totalT * 1000).toISOString().substr(11, 8);
    startTime = endTime;

}
function diff(end, start) {
    start = start.split(":");
    end = end.split(":");
    var startDate = new Date(0, 0, 0, start[0], start[1], start[2]);
    var endDate = new Date(0, 0, 0, end[0], end[1], end[2]);
    var diff = startDate - endDate;
    return diff / 1000;
}

function PrevQuestion(e) {
    var t = $(".test-questions").find("li.active");
    addTime(t.index());
    if (CheckNextPrevButtons(), t.is(":first-child")) return !1;
    $(".test-questions").find("li").removeClass("active"), t.prev().addClass("active"), OpenCurrentQue(t.prev().find("a"));
    var a = t.attr("data-seq");
    $(".nav-tab-sections").find("li").removeClass("active"), $(".nav-tab-sections").find("li[data-id=" + a + "]").addClass("active"), CheckQueAttemptStatus()
}

function CheckNextPrevButtons() {
    var e = $(".test-questions").find("li.active");
    $("#btnPrevQue").removeAttr("disabled"), $("#btnNextQue").removeAttr("disabled"), e.is(":first-child") ? $("#btnPrevQue").attr("disabled", "disabled") : e.is(":last-child") && $("#btnNextQue").attr("disabled", "disabled")
}

function pad(e, t) {
    for (var a = e + ""; a.length < t;) a = "0" + a;
    return a
}

function OpenCurrentQue(e) {
    $(".tab-content").hide(), $("#lblQueNumber").text(e.text()), $("#" + e.attr("data-href")).show();
    var t = e.parent().attr("data-seq");
    $(".nav-tab-sections").find("li").removeClass("active"), $(".nav-tab-sections").find("li[data-id=" + t + "]").addClass("active"), CheckQueAttemptStatus()
}

function CoundownTimer(e) {
    var t = 60 * e;
    myInterval = setInterval(function () {
        myTimeSpan = 1e3 * t, $(".timer-title").text(GetTime(myTimeSpan)), t < 600 ? ($(".timer-title").addClass("time-ending"), $(".timer-title").removeClass("time-started")) : ($(".timer-title").addClass("time-started"), $(".timer-title").removeClass("time-ending")), t > 0 ? t -= 1 : CleartTimer()
        runningTime = GetTime(myTimeSpan);
    }, 1e3)
}

function CleartTimer() {
    addTime($(".test-questions").find("li.active").index()), CheckQueAttemptStatus(), $(".exam-paper").hide(),
    $(".stream_1").hide(), $("#divdrplngcng").hide(), 
    clearInterval(myInterval), $(".timer-title").text("Time Out"), $("#btnYesSubmitConfirm").trigger("click")
    




}

function GetTime(e) {
    parseInt(e % 1e3 / 100);
    var t = parseInt(e / 1e3 % 60),
        a = parseInt(e / 6e4 % 60),
        n = parseInt(e / 36e5 % 24);
    return (n = n < 10 ? "0" + n : n) + ":" + (a = a < 10 ? "0" + a : a) + ":" + (t < 10 ? "0" + t : t)
}

function pretty_time_string(e) {
    return (e < 10 ? "0" : "") + e
}

function CheckQueExists(e) {
    $.each(AttemptedAns, function (t, a) {
        void 0 !== a && a[1] == e && AttemptedAns.splice(t, 1)
    })
}

function CheckQueAttemptStatus() {
    var e = 0,
        t = 0,
        a = 0,
        n = 0,
        s = 0,
        i = 0;
    $(".test-questions").find("li").each(function () {
        var r = $(this);
        e += 1, r.children().hasClass("que-save") ? a += 1 : r.children().hasClass("que-save-mark") ? n += 1 : r.children().hasClass("que-mark") ? s += 1 : r.children().hasClass("que-not-answered") ? t += 1 : i += 1
    }), $(".lblTotalQuestion").text(e), $(".lblNotAttempted").text(t), $(".lblTotalSaved").text(a), $(".lblTotalSaveMarkForReview").text(n), $(".lblTotalMarkForReview").text(s), $(".lblNotVisited").text(i)
}


function CheckResult() {
    var n = 0
    $('#tbodyResult').html();
    var score = 0;
    var TotalQuestion = 0;
    var TotalAttempted = 0;
    var TotalCorrect = 0;
    var TotalWrong = 0;

    $(".test-questions").find("li").each(function (ind) {

        var r = $(this);
        var a = r.find("a").attr("data-href");
        var currectAns = $("#" + a).find(".hdfCurrectAns").val();
        var currectQue = $("#" + a).find(".question-title").text();
        TotalQuestion = TotalQuestion + 1;
        var tr = $('<tr></tr>');
        tr.append('<td>' + currectQue + '</td>');
        var ansStatus = "Wrong";
        var selectedAns = '';
		var mcscore = 0;
        var wrong = 0;
        if (r.children().hasClass("que-save") || r.children().hasClass("que-save-mark")) {

           if ((ind <= 200) || (ind > 194 && ind <= 1144) || (ind > 1149 && ind <= 1169)) {

                $("#" + a).find("input[name='radios" + a + "']").each(function () {
                    var e = $(this);
                    if (e.is(':checked')) {
                        selectedAns = e.val();
                        if (e.val() == currectAns) {
                            ansStatus = "Correct";
                        }
                    }
                });
            }
            else {
                selectedAns = $(".inline" + a).val();
                if (parseFloat(selectedAns) == parseFloat(currectAns))
                    ansStatus = "Correct";
            }

            if (ansStatus == 'Correct') {
                score = score + 4;
                TotalCorrect = TotalCorrect + 1;
            } else {
             if ((ind <= 200) || (ind > 194 && ind <= 1144) || (ind > 1149 && ind <=1169))
                    score = score - 1;
                TotalWrong = TotalWrong + 1;
            }
            TotalAttempted = TotalAttempted + 1;
        }
        if (r.children().hasClass("que-save") || r.children().hasClass("que-save-mark")) {
            tr.append('<td>' + selectedAns + '</td>');
        } else {
            tr.append('<td>---</td>');
        }
        if (r.children().hasClass("que-save") || r.children().hasClass("que-save-mark")) {
            if (ansStatus == 'Correct') {
                tr.append('<td><span class="label label-success">' + ansStatus + '</span></td>');
            } else {
                tr.append('<td><span class="label label-danger">' + ansStatus + '</span></td>');
            }
        } else {
            tr.append('<td>N/A</td>');
        }
        tr.append('<td>' + currectAns + '</td>');
        tr.append('<td>' + questionTime[ind]["Time"] + '</td>');
        $('#tbodyResult').append(tr);
    });
    $('#lblRTotalQuestion').text(TotalQuestion);
    $('#lblRTotalAttempted').text(TotalAttempted);
    $('#lblRTotalCorrect').text(TotalCorrect);
    $('#lblRTotalWrong').text(TotalWrong);
    $('#lblRScore').text(score);
    var ti = 60 * parseInt($("#hdfTestDuration").val());
    var s = 1e3 * ti;
    var ttotal = new Date(diff(startTime, GetTime(s)) * 1000).toISOString().substr(11, 8);
    $('#lblRTotalTime').text(ttotal);
}

function checkValue(e) {
    e = e || window.event;
    //console.log(e);
    if (!e.shiftKey) {
        var charCode = (typeof e.which == "undefined") ? e.which : e.keyCode;
        if (charCode == 290 || charCode == 210) {

            if (e.target.value.indexOf('.') === -1) {
                if (e.target.value.indexOf('-') != -1) {

                    if ($(this).caret() == 0) {
                        return false;
                    }
                }
                return true;
            } else {
                return false;
            }
        } else {
            if (charCode > 31 && (charCode < 48 || charCode > 57)) {
                if (charCode == 37 || charCode == 39 || (charCode > 95 && charCode < 106) || charCode == 289 || charCode == 209) {
                    if (charCode == 289 || charCode == 209) {
                        var pos = $(this).caret();
                        if (e.target.value.indexOf('-') === -1) {
                            e.target.value = '-' + e.target.value;
                            $(this).caret(pos + 1);
                            return false;
                        } else {
                            e.target.value = -e.target.value;
                            $(this).caret(pos - 1);
                            return false;
                        }
                    }
                    else
                        return true;
                }
                else
                    return false;
            }
            else {
                if (e.target.value.indexOf('-') === -1)
                    return true;
                else {

                    if ($(this).caret() > 0)
                        return true;
                    else
                        return false;
                }
            }

        }


    }
    else
        return false;
}

function checkNumpadValue(key, value, inst) {

    if (key == '.') {

        if (value.indexOf('.') === value.lastIndexOf('.')) {
            if ($(this).val().indexOf('-') != -1) {
                if ($(this).caret() == 1) {
                    $(this).val(value.substring(1, value.length));
                    $(this).caret(0);
                }
            }
        }
        else {

            var pos = $(this).caret();
            var part1 = "";
            if ((pos - 1) != 0)
                part1 = value.substring(0, pos - 1);
            var part2 = "";
            if (pos != value.length)
                part2 = value.substring(pos, value.length);
            //console.log("p1:" + part1 + ",p2:" + part2);
            $(this).val(part1 + part2);
            $(this).caret(pos - 1);

        }

    }
    else if (!(key == '-' || key == $.keypad.BS || key == $.keypad.DEL)) {

        if ($(this).val().indexOf('-') != -1) {


            if ($(this).caret() == 1) {
                $(this).val(value.substring(1, value.length));
                $(this).caret(0);
            }
        }

    }

}

$.keypad.addKeyDef('NEG', 'negation', function (inst) {
    var pos = $(this).caret();
    if ($(this).val().indexOf('-') === -1) {

        $(this).val(-$(this).val());
        $(this).caret(pos + 1);
    } else {
        $(this).val(-$(this).val());
        $(this).caret(pos - 1);
    }
});

$.keypad.addKeyDef('LARROW', 'leftArrow', function (inst) {
    var pos = $(this).caret();
    if (pos > 0)
        $(this).caret(pos - 1);
    else
        $(this).caret(0);

});
$.keypad.addKeyDef('RARROW', 'rightArrow', function (inst) {
    var pos = $(this).caret();

    if (pos <= $(this).val().length)
        $(this).caret(pos + 1);

});

function initializeKeypad() {
    var i = 199;
    while (i <= 200) {
        for (var j = 0; j < 5; j++) {
            $('#inlineKeypad' + i).keypad({
                target: $('.inlinepage' + i),
                prompt: '',
                negationText: "&#177;",
                negationStatus: "Negation",
                leftArrowText: "&#8592;",
                leftArrowStatus: "Left Arrow or move left",
                rightArrowText: "&#8594;",
                rightArrowStatus: "Right Arrow or move right",
                layout: [$.keypad.BACK, '789', '456',
                    '123', '0.' + $.keypad.NEG, $.keypad.LARROW + $.keypad.RARROW, $.keypad.CLEAR],
                clearText: 'Clear All',
                backText: 'Backspace',
                keypadClass: 'numKeypad',
                onKeypress: checkNumpadValue
            });
            $('.inlinepage' + i).on('keydown', checkValue);
            i++;
        }
        i += 20;
    }
}

function initializeQuestion() {
    for (var i = 0; i < qansPaper.length; i++) {

        $("#" + qansPaper[i].question).find(".hdfCurrectAns").val(qansPaper[i].ans);


    }

}

$(document).ready(function () {

    for (var qt = 1; qt <= 200; qt++)
        questionTime.push({ "SNo": qt, "Time": "00:00:00" });

    $("#page01").show();
    $(".exam-paper").show();
    CoundownTimer(parseInt($("#hdfTestDuration").val()));
    CheckNextPrevButtons();
    CheckQueAttemptStatus();
    initializeKeypad();
    initializeQuestion();

    setTimeout(function () {
        startTime = runningTime;
        //console.log(new Date(30000 * 1000).toISOString().substr(11, 8));
    }, 1000);




    $("#btnPrevQue").click(function () {
        PrevQuestion(!0)
    });
    $("#btnNextQue").click(function () {
        NextQuestion(!0)
    });
    $(".test-ques").click(function () {
        var e = $(".test-questions").find("li.active").find("a");
        addTime($(".test-questions").find("li.active").index());
        $(".test-questions").find("li").removeClass("active"),
            $(this).parent().addClass("active"),
            $(this).hasClass("que-save") || $(this).hasClass("que-save-mark") || $(this).hasClass("que-mark") || ($(this).addClass("que-not-answered"), $(this).removeClass("que-not-attempted")), e.hasClass("que-save") || e.hasClass("que-save-mark") || e.hasClass("que-mark") || (e.addClass("que-not-answered"), e.removeClass("que-not-attempted")), OpenCurrentQue($(this))

    });

    localStorage.removeItem("clickCount");
    localStorage.removeItem("phyclickCount");
    localStorage.removeItem("checlickCount");
    localStorage.removeItem("ZooclickCount");
    $(".btn-save-answer").click(function (e) {
        e.preventDefault();

        if(parseInt(localStorage.getItem("clickCount")) >= 10 && $(".test-questions li.active").hasClass("MS2")){      
            $(".mdllblcls").html("You cannot attempt more than 10 question in this section.")
            $('#myModal1').click();
            return false;                
        }
        if(parseInt(localStorage.getItem("phyclickCount")) >= 10 && $(".test-questions li.active").hasClass("PS2")){      
            $(".mdllblcls").html("You cannot attempt more than 10 question in this section.")
            $('#myModal1').click();
            return false;                
        }
        if(parseInt(localStorage.getItem("checlickCount")) >= 10 && $(".test-questions li.active").hasClass("CS2")){      
            $(".mdllblcls").html("You cannot attempt more than 10 question in this section.")
            $('#myModal1').click();
            return false;                
        }
        if(parseInt(localStorage.getItem("ZooclickCount")) >= 10 && $(".test-questions li.active").hasClass("ZS2")){      
            $(".mdllblcls").html("You cannot attempt more than 10 question in this section.")
            $('#myModal1').click();
            return false;                
        }
        var t = $(".test-questions").find("li.active"),
            a = t.find("a").attr("data-href"),
            n = ($("#" + a).find(".hdfQuestionID").val(), $("#" + a).find(".hdfPaperSetID").val(), $("#" + a).find(".hdfCurrectAns").val(), !1);

        var ind = t.index();
        if ((ind <= 200) || (ind > 1124 && ind <= 1144) || (ind > 1149 && ind <= 1169)) {
            if ($("input[name='radios" + a + "']").each(function () {
                $(this).is(":checked") && (n = !0)
            }), 0 == n) { alert("Please choose an option"); return !1 };
            $("input[name='radios" + a + "']:checked").val(), t.find("a").removeClass("que-save-mark"), t.find("a").removeClass("que-mark"), t.find("a").addClass("que-save"), t.find("a").removeClass("que-not-answered"), t.find("a").removeClass("que-not-attempted"), NextQuestion(!1), CheckQueAttemptStatus()
        }
        else {
            if ($(".inline" + a).val().trim() == "") {
                alert("Please enter a value.");
                $(".inline" + a).focus();
                return !1;
            }
            t.find("a").removeClass("que-save-mark"), t.find("a").removeClass("que-mark"), t.find("a").addClass("que-save"), t.find("a").removeClass("que-not-answered"), t.find("a").removeClass("que-not-attempted"), NextQuestion(!1), CheckQueAttemptStatus()
        }
// Bio
var listItems = $(".test-questions li.MS2 a");         
let currentClick = t.find("a").text();
let cnt = 0;                 
listItems.each(function(ddd, li) {
     if( ( currentClick >=136 && currentClick <=150 )){ 
       if($(li).hasClass("que-save")){
            
        if(parseInt(localStorage.getItem("clickCount")) > 0){
            let updateCnt = parseInt(localStorage.getItem("clickCount"));
            localStorage.setItem("clickCount",(updateCnt+ 1)); 
            return false;
        } else {                    
            cnt++;
            localStorage.setItem("clickCount", cnt); 
        } 
    }
                                              
    }           
});
//ekd of Bio
 //Physics
 var listItemsphy = $(".test-questions li.PS2 a");         
 let currentphyClick = t.find("a").text();
 
 let phycnt =0 ;       
 listItemsphy.each(function(ddd, li) {
     if( ( currentphyClick >=36 && currentphyClick <=50 )){   
        console.log(currentphyClick)              
         if($(li).hasClass("que-save")){
             if(localStorage.getItem("phyclickCount")){
                 let phyupdateCnt = parseInt(localStorage.getItem("phyclickCount"));
                 localStorage.setItem("phyclickCount",(phyupdateCnt+ 1)); 
                 return false;
             } else {                        
                 phycnt++;
                 localStorage.setItem("phyclickCount", phycnt); 
             }                     
         }                                                        
     } 
 }); //End of Physics 
 //Chemistry
 var listItemsche = $(".test-questions li.CS2 a");         
 let currentCheClick = t.find("a").text();
 let checnt =0 ;       
 listItemsche.each(function(ddd, li) {
     if( ( currentCheClick >=86 && currentCheClick <=100 )){                 
         if($(li).hasClass("que-save")){
             if(localStorage.getItem("checlickCount")){
                 let cheupdateCnt = parseInt(localStorage.getItem("checlickCount"));
                 localStorage.setItem("checlickCount",(cheupdateCnt+ 1)); 
                 return false;
             } else {
                 checnt++;
                 localStorage.setItem("checlickCount", checnt); 
             }                     
         }                                                        
     } 
 }); //End of Chemistry

 //ZOOL
 var listItemsZOOL = $(".test-questions li.ZS2 a");         
 let currentZOOLClick = t.find("a").text();
 let ZOOLcnt =0 ;       
 listItemsZOOL.each(function(ddd, li) {
     if( ( currentZOOLClick >=186 && currentZOOLClick <=200 )){                 
         if($(li).hasClass("que-save")){
             if(localStorage.getItem("ZooclickCount")){
                 let ZooupdateCnt = parseInt(localStorage.getItem("ZooclickCount"));
                 localStorage.setItem("ZooclickCount",(ZooupdateCnt+ 1)); 
                 return false;
             } else {
                ZOOLcnt++;
                 localStorage.setItem("ZooclickCount", ZOOLcnt); 
             }                     
         }                                                        
     } 
 }); //End of ZOOL

    });
    $(".btn-save-mark-answer").click(function (e) {
        e.preventDefault();
        if(parseInt(localStorage.getItem("clickCount")) >= 10 && $(".test-questions li.active").hasClass("MS2")){      
            $(".mdllblcls").html("You cannot attempt more than 10 question in this section.")
            $('#myModal1').click();
            return false;                
        }
        if(parseInt(localStorage.getItem("phyclickCount")) >= 10 && $(".test-questions li.active").hasClass("PS2")){      
            $(".mdllblcls").html("You cannot attempt more than 10 question in this section.")
            $('#myModal1').click();
            return false;                
        }
        if(parseInt(localStorage.getItem("checlickCount")) >= 10 && $(".test-questions li.active").hasClass("CS2")){      
            $(".mdllblcls").html("You cannot attempt more than 10 question in this section.")
            $('#myModal1').click();
            return false;                
        }
        if(parseInt(localStorage.getItem("ZooclickCount")) >= 10 && $(".test-questions li.active").hasClass("ZS2")){      
            $(".mdllblcls").html("You cannot attempt more than 10 question in this section.")
            $('#myModal1').click();
            return false;                
        }
        var t = $(".test-questions").find("li.active"),
            a = t.find("a").attr("data-href"),
            n = ($("#" + a).find(".hdfQuestionID").val(),
                $("#" + a).find(".hdfPaperSetID").val(),
                $("#" + a).find(".hdfCurrectAns").val(),
                $("#" + a).find(".hdfCurrectAns").val(), !1);
        var ind = t.index();
        if ((ind <= 200) || (ind > 1124 && ind <= 1144) || (ind > 1149 && ind <= 1169)) {
            if ($("input[name='radios" + a + "']").each(function () {
                $(this).is(":checked") && (n = !0)
            }), 0 == n) { alert("Please choose an option"); return !1 };;
            $("input[name='radios" + a + "']:checked").val(), t.find("a").removeClass("que-save"), t.find("a").removeClass("que-mark"), t.find("a").addClass("que-save-mark"), t.find("a").removeClass("que-not-answered"), t.find("a").removeClass("que-not-attempted"), NextQuestion(!1), CheckQueAttemptStatus()
        }
        else {
            if ($(".inline" + a).val().trim() == "") {
                alert("Please enter a value.");
                $(".inline" + a).focus();
                return !1;
            }
            t.find("a").removeClass("que-save"), t.find("a").removeClass("que-mark"), t.find("a").addClass("que-save-mark"), t.find("a").removeClass("que-not-answered"), t.find("a").removeClass("que-not-attempted"), NextQuestion(!1), CheckQueAttemptStatus()
        }
        //Bio
        var listItems = $(".test-questions li.MS2 a");         
        let currentClick = t.find("a").text();
        let cnt =0 ;       
        listItems.each(function(ddd, li) {
            if( ( currentClick >=136 && currentClick <=150 )){ 
                if($(li).hasClass("que-save-mark")){
                    if(localStorage.getItem("clickCount")){
                        let updateCnt = parseInt(localStorage.getItem("clickCount"));
                        localStorage.setItem("clickCount",(updateCnt+ 1)); 
                        return false;
                    } else {
                        cnt++;
                        localStorage.setItem("clickCount", cnt); 
                    }                     
                }                                                        
            } 
        }); //End of Bio 
        //Physics
        var listItemsphy = $(".test-questions li.PS2 a");         
        let currentphyClick = t.find("a").text();
        let phycnt =0 ;       
        listItemsphy.each(function(ddd, li) {
            if( ( currentphyClick >=36 && currentphyClick <=50 )){                 
                if($(li).hasClass("que-save-mark")){
                    if(localStorage.getItem("phyclickCount")){
                        let phyupdateCnt = parseInt(localStorage.getItem("phyclickCount"));
                        localStorage.setItem("phyclickCount",(phyupdateCnt+ 1)); 
                        return false;
                    } else {
                        phycnt++;
                        localStorage.setItem("phyclickCount", phycnt); 
                    }                     
                }                                                        
            } 
        }); //End of Physics 
        //Chemistry
        var listItemsche = $(".test-questions li.CS2 a");         
        let currentCheClick = t.find("a").text();
        let checnt =0 ;       
        listItemsche.each(function(ddd, li) {
            if( ( currentCheClick >=86 && currentCheClick <=100 )){                 
                if($(li).hasClass("que-save-mark")){
                    console.log(currentCheClick)
                    if(localStorage.getItem("checlickCount")){
                        let cheupdateCnt = parseInt(localStorage.getItem("checlickCount"));
                        localStorage.setItem("checlickCount",(cheupdateCnt+ 1)); 
                        return false;
                    } else {
                        checnt++;                        
                        localStorage.setItem("checlickCount", checnt); 
                    }                     
                }                                                        
            } 
        }); //End of Chemistry 
        

 //ZOOL
 var listItemsZOOL = $(".test-questions li.ZS2 a");         
 let currentZOOLClick = t.find("a").text();
 let ZOOLcnt =0 ;       
 listItemsZOOL.each(function(ddd, li) {
     if( ( currentZOOLClick >=186 && currentZOOLClick <=200 )){                 
         if($(li).hasClass("que-save-mark")){
             if(localStorage.getItem("ZooclickCount")){
                 let ZooupdateCnt = parseInt(localStorage.getItem("ZooclickCount"));
                 localStorage.setItem("ZooclickCount",(ZooupdateCnt+ 1)); 
                 return false;
             } else {
                ZOOLcnt++;
                 localStorage.setItem("ZooclickCount", ZOOLcnt); 
             }                     
         }                                                        
     } 
 }); //End of ZOOL

    });
    $(".btn-mark-answer").click(function (e) {
        e.preventDefault();
        var t = $(".test-questions").find("li.active"),
            a = t.find("a").attr("data-href");
        $("#" + a).find(".hdfQuestionID").val(), $("#" + a).find(".hdfPaperSetID").val(), $("#" + a).find(".hdfCurrectAns").val(), $("#" + a).find(".hdfCurrectAns").val(), t.find("a").removeClass("que-save-mark"), t.find("a").removeClass("que-save"), t.find("a").addClass("que-mark"), t.find("a").removeClass("que-not-answered"), t.find("a").removeClass("que-not-attempted"), NextQuestion(!1), CheckQueAttemptStatus()
    });
    $(".btn-reset-answer").click(function (e) {
        e.preventDefault();
        if( localStorage.getItem("clickCount")){
            let msupdateCnt = parseInt(localStorage.getItem("clickCount"));
            localStorage.setItem("clickCount",(msupdateCnt-1));
        }
        if( localStorage.getItem("phyclickCount")){
            let phyupdateCnt = parseInt(localStorage.getItem("phyclickCount"));
            localStorage.setItem("phyclickCount",(phyupdateCnt-1));
        }
        if( localStorage.getItem("checlickCount")){
            let cheupdateCnt = parseInt(localStorage.getItem("checlickCount"));
            localStorage.setItem("checlickCount",(cheupdateCnt-1));
        }
        if( localStorage.getItem("ZooclickCount")){
            let ZooupdateCnt = parseInt(localStorage.getItem("ZooclickCount"));
            localStorage.setItem("ZooclickCount",(ZooupdateCnt-1));
        }
        var t = $(".test-questions").find("li.active"),
            a = t.find("a").attr("data-href");

        $("#" + a).attr("data-queid"), t.find("a").removeClass("saved-que"),
            $("input[name='radios" + a + "']:checked").each(function () {
                $(this).prop("checked", !1).change()
            }), $("input[name='chk" + a + "']").each(function () {
                $(this).prop("checked", !1).change()
            }), $("input[type=checkbox]").prop("checked", !1).change(),
            $(".inline" + a).val(""), a = t.find("a").attr("data-href"),
            $("#" + a).find(".hdfQuestionID").val(), $("#" + a).find(".hdfPaperSetID").val(),
            $("#" + a).find(".hdfCurrectAns").val(), $("#" + a).find(".hdfCurrectAns").val(),
            t.find("a").removeClass("que-save-mark"),
            t.find("a").removeClass("que-mark"),
            t.find("a").removeClass("que-save"),
            t.find("a").removeClass("que-not-attempted"),
            t.find("a").addClass("que-not-answered"),
            //NextQuestion(!1),
            CheckQueAttemptStatus()
    });
    $(".btn-submit-all-answers").click(function (e) {
        e.preventDefault(), $(this),
            $(".test-questions").find("li").each(function () {
                var e = $(this),
                    t = !1;

                if (e.children().hasClass("que-save") ? t = !0 : e.children().hasClass("que-save-mark") && (t = !0), t) {
                    var a = e.find("a").attr("data-href");
                    //console.log(a), $("#" + a);
                    $("#" + a).find(".hdfCurrectAns").val();
                    $("#" + a).find("input[name='radios" + a + "']").each(function () {
                        var e = $(this);
                        e.is(":checked") && e.val()
                    });
                }
            }),
            $(".exam-paper").hide(),
            $(".stream_1").hide(),
            $("#divdrplngcng").hide(),
            $(".exam-summery").show(),
            CheckQueAttemptStatus(),
            addTime($(".test-questions").find("li.active").index())
    });
    $("#btnYesSubmit").on("click", function (e) {
        e.preventDefault(), $(".exam-confirm").show(), $("#divdrplngcng").hide(), $(".exam-summery").hide()
    });
    $("#btnNoSubmit").on("click", function (e) {
        e.preventDefault(), $(".exam-paper").show(), $(".stream_1").show(), $(".exam-summery").hide(), $("#divdrplngcng").show()
    });
    $("#btnYesSubmitConfirm").on("click", function (e) {
        e.preventDefault(), $(".exam-thankyou").show(), $("#divdrplngcng").hide(), $(".exam-confirm").hide()
    });
    $("#btnNoSubmitConfirm").on("click", function (e) {
        e.preventDefault(), $(".exam-paper").show(), $(".stream_1").show(), $(".exam-confirm").hide(), $("#divdrplngcng").show()
    });
    $('.drplanguage').on('change', function (e) {
        e.preventDefault();
        var newlang = 'English';

        if ($(this).val() == 'english') {
            newlang = 'English';
        } else if ($(this).val() == 'hindi') {
            newlang = 'Hindi';
        } else if ($(this).val() == 'gujarati') {
            newlang = 'Gujarati';
        }
        var currentLang = $('#hdfCurrentLng').val();
        $('.question-height img').each(function (index, item) {
            var currentImg = $(this);
            var currentImgSrc = currentImg.attr('src');
            if (currentImgSrc) {
                var isLangImg = /[\\/](English|Hindi|Gujarati)[\\/]/i.test(currentImgSrc);
                if (isLangImg) {
                    var baseSrc = currentImgSrc.split('?')[0];
                    var newSrc = baseSrc.replace(/([\\/])(English|Hindi|Gujarati)([\\/])/i, '$1' + newlang + '$3');
                    currentImg.attr('src', newSrc + '?' + Date.now());
                }
            }
        });
        $('#hdfCurrentLng').val(newlang);
    });

    // Parse language from URL query string and auto-select on load
    try {
        var urlParams = new URLSearchParams(window.location.search);
        var lngParam = urlParams.get('lng');
        if (lngParam) {
            var selectVal = 'english';
            if (lngParam === 'hi') {
                selectVal = 'hindi';
            } else if (lngParam === 'gj') {
                selectVal = 'gujarati';
            }
            var $drp = $('.drplanguage');
            if ($drp.length > 0) {
                $drp.val(selectVal).trigger('change');
            }
        }
    } catch (e) {
        console.error("Failed to auto-select language:", e);
    }

    // Global interceptor for question image load errors (handles case mismatches & missing assets gracefully)
    if (!window.hasGlobalLanguageErrorInterceptor) {
        window.hasGlobalLanguageErrorInterceptor = true;
        document.addEventListener('error', function (event) {
            var element = event.target;
            if (element.tagName === 'IMG') {
                var $img = $(element);
                if ($img.closest('.question-height').length > 0) {
                    var src = $img.attr('src');
                    if (!src) return;
                    
                    // 1. Try to resolve case mismatch (.png vs .PNG)
                    if (!$img.data('retry-extension')) {
                        var parts = src.split('?');
                        var urlWithoutQuery = parts[0];
                        var query = parts[1] ? '?' + parts[1] : '';
                        
                        var newSrc = null;
                        if (urlWithoutQuery.endsWith('.png')) {
                            newSrc = urlWithoutQuery.slice(0, -4) + '.PNG' + query;
                        } else if (urlWithoutQuery.endsWith('.PNG')) {
                            newSrc = urlWithoutQuery.slice(0, -4) + '.png' + query;
                        }
                        
                        if (newSrc) {
                            $img.data('retry-extension', true);
                            element.src = newSrc;
                            return;
                        }
                    }
                    
                    // 2. Try to fallback to English version of the image
                    if (!$img.data('fallback-english')) {
                        var isHindi = src.toLowerCase().includes('/hindi/');
                        var isGujarati = src.toLowerCase().includes('/gujarati/');
                        if (isHindi || isGujarati) {
                            var parts = src.split('?');
                            var urlWithoutQuery = parts[0];
                            var query = parts[1] ? '?' + parts[1] : '';
                            
                            var newSrc = urlWithoutQuery.replace(/([\\/])(hindi|gujarati)([\\/])/i, '$1English$3');
                            if (newSrc !== urlWithoutQuery) {
                                $img.data('fallback-english', true);
                                element.src = newSrc + (query ? query : '?' + Date.now());
                                return;
                            }
                        }
                    }
                }
            }
        }, true);
    }
    $('.stream_1').on('click', function (e) {
        e.preventDefault();
        var current_herf = $(this).attr('data-href');
        var a = $(".test-questions").find("li").find("a[data-href=" + current_herf + "]");
        a.trigger('click');
    });

    function generate(final, userid, qnaTable) {
        XlsxPopulate.fromBlankAsync()
            .then(workbook => {
                var cols = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"];
                var i = 0;
                for (key in final[0]) {
                    if (i >= 0 && i < 8) {
                        workbook.sheet("Sheet1").column(cols[i]).width(17);
                        workbook.sheet("Sheet1").cell(cols[i] + "1").value(key);
                        workbook.sheet("Sheet1").cell(cols[i] + "1").style("fill", "00b0f0");
                        workbook.sheet("Sheet1").cell(cols[i] + "1").style("border", true);

                        workbook.sheet("Sheet1").cell(cols[i] + "2").value(final[0][key]);
                        workbook.sheet("Sheet1").cell(cols[i] + "2").style("fill", "f2f2f2");
                        workbook.sheet("Sheet1").cell(cols[i] + "2").style("border", true);
                        i++;

                    }
                    else
                        break;
                }
                i = 0;
                for (key in qnaTable[0]) {
                    const r = workbook.sheet(0).range(cols[i] + "7:" + cols[i + 1] + "7").merged(true);
                    r.value(key);
                    r.style("fill", "ffc000");
                    r.style("border", true);
                    i = i + 2;
                }
                var k = 8;
                for (var j = 0; j < qnaTable.length; j++) {
                    i = 0;
                    for (key in qnaTable[j]) {
                        const r = workbook.sheet(0).range(cols[i] + k + ":" + cols[i + 1] + k).merged(true);

                        r.value(qnaTable[j][key]);
                        if (key == "Status") {
                            r.style("fontColor", "ffffff");
                            r.style("border", true);
                            if (qnaTable[j][key] == "Correct") {
                                r.style("fill", "08a810");

                            }
                            else if (qnaTable[j][key] == "Wrong") {
                                r.style("fill", "ff0000");

                            }
                            else
                                r.style("fill", "ffaa00");
                        }
                        i = i + 2;
                    }
                    k++;
                }

                var today = new Date();
                var monthNames = [
                    "Jan", "Feb", "Mar",
                    "Apr", "May", "Jun", "Jul",
                    "Aug", "Sept", "Oct",
                    "Nov", "Dec"
                ];
                var date = today.getDate() + '-' + monthNames[today.getMonth()] + '-' + today.getFullYear();
                return workbook.outputAsync({ type: "blob", password: "bluesky" })
                    .then(function (blob) {
                        if (window.navigator && window.navigator.msSaveOrOpenBlob) {
                            window.navigator.msSaveOrOpenBlob(blob, userid + "-" + date + ".xlsx");
                        } else {
                            var url = window.URL.createObjectURL(blob);
                            var a = document.createElement("a");
                            document.body.appendChild(a);
                            a.href = url;
                            a.download = userid + "-" + date + ".xlsx";
                            a.click();
                            window.URL.revokeObjectURL(url);
                            document.body.removeChild(a);
                        }
                    })
                    .catch(function (err) {
                        console.log(err.message || err);
                        throw err;
                    });
            });
    }



    function downloadResult() {
        var user = [];

        user = JSON.parse(localStorage.getItem('student'));

        if (user != null) {
            var userid1 = user[0].userId;


            var rows = [];
            $('#tableResult tbody tr').each(function (i, n) {

                var $row = $(n);
                rows.push({
                    col1: $row.find('th:eq(0)').text(),
                    col2: $row.find('th:eq(1)').text()
                });

            });

            //console.log(JSON.stringify(rows));
            var final = [];
            var today = new Date();
            var date = today.getDate() + '-' + (today.getMonth() + 1) + '-' + today.getFullYear();
            var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();



            final.push({
                "Student Name": user[0].firstName + " " + user[0].lastName,
                "Test Date": date + " " + time,
                "Total Question": rows[0].col1,
                "Total Attempted": rows[0].col2,
                "Correct Answers": rows[1].col1,
                "Incorrect Answers": rows[1].col2,
                "Score": $('#lblRScore').text(),
                "Total Time Taken": rows[2].col1
            });
            var qnaTable = $('#qResTable').tableToJSON();


            generate(final, userid, qnaTable);
        }

    }



    $('#btnViewResult').on('click', function (e) {
        e.preventDefault();
        CheckResult();
        $('.exam-result').show();
        downloadResult();
        $(".exam-thankyou").hide();
    });

    $('#btnResDownload').on('click', function (e) {
        e.preventDefault();
        downloadResult();
    });

    $('#btnRBack').on('click', function (e) {
        e.preventDefault();
        window.location.href = "../index.html";
    });
});