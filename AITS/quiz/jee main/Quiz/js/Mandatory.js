function mandy(){
    var t = $(".test-questions").find("li.active"),
    a = t.find("a").attr("data-href"),
    n = ($("#" + a).find(".hdfQuestionID").val(), $("#" + a).find(".hdfPaperSetID").val(), $("#" + a).find(".hdfCurrectAns").val(), !1);
    // var listItems = $(".test-questions li a");         
    // let currentClick = t.find("a").text();
     let cnt;            
    listItems.each(function(ddd, li) {
        if((ddd >= 21 && ddd<=30) && ( currentClick >=21 && currentClick <=30 )){ 
           console.log('aaa'+ cnt);  
           if($(li).hasClass("que-save")){
               cnt++;   
            }                                                 
        }           
    });  
    alert()

    $(".MS2").find("a").each(function () {
        if($().hasClass("que-save")){
            cnt++
            console.log(cnt)
        }
    })
    


    if(cnt >= 4){     ;
        $('#myModal1').click();
        return false;                
    }    
}