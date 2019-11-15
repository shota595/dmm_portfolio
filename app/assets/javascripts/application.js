// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, or any plugin's
// vendor/assets/javascripts directory can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file. JavaScript code in this file should be added after the last require_* statement.
//
// Read Sprockets README (https://github.com/rails/sprockets#sprockets-directives) for details
// about supported directives.
//
//= require rails-ujs
//= require activestorage
//= require turbolinks
//= require_tree .
//= require jquery3
//= require jquery_ujs
//= require popper
//= require bootstrap-sprockets

$(document).on('turbolinks:load', function() {
    $('#textarea').on('mouseup', function(){ //mouseupでイベント発火（クリックを離すと発火）
        // $.ajax({
        //     url: 'http://public.dejizo.jp/NetDicV09.asmx/SearchDicItemLite?Dic=EJdict&Word=apple&Scope=HEADWORD&Match=EXACT&Merge=AND&Prof=XML&PageSize=1&PageIndex=0',
        //     type: 'get',
        //     dataType: 'xml',
        //     cache: false,
        //     success: function(data) {
        //         $(data).find("TitleList").find("DicItemTitle").find("ItemID").alert();
        //     }
        // }); 
        var selectedStr;
        if(window.getSelection){  //selectionオブジェクト取得
            selectedStr = window.getSelection().toString();  //文章取得
            if(selectedStr !== '' && selectedStr !== '\n'){  //文章チェック
                $('h1').prepend('<p>' + selectedStr + '</p>');
                // var xmlhttp = new XMLHttpRequest();
                // var searchID = "http://public.dejizo.jp/NetDicV09.asmx/SearchDicItemLite?Dic=EJdict&Word=" + selectedStr + "&Scope=HEADWORD&Match=EXACT&Merge=AND&Prof=XML&PageSize=1&PageIndex=0";
                // var docelem = xmlhttp.open("GET", url).getElementsByTagName('ItemID');
                // var docelem = xmlhttp.responseXML.documentElement;
                // window.alert(docelem);
                // var url2 = window.open(searchID)
                // var nodes = docelem.getElementsByTagName('ItemID');
                // console.log(ItemID);
                // window.alert(nodes[0].innerHTML);
                // $('h1').prepend('<p>' + nodes.html(nodes) + '</p>')
                // var xml = xmlRead(url)
                // $(xml).find("ItemId", function() {
                //     $('h1').prepend('<p>' + xml.html() + '</p>'
                // var search1 = xmlToJson.parse(searchID);
                // $('#result2').html('');
                
                // $.ajax({
                //     url: search1,
                //     type: 'GET',
                //     dataType: 'jsonp',
                // }).done(function(data){
                //     alert('s');
                // }).fail(function(data){
                //     alert('f');
                //     console.log(data)
                // });



                //microsoft translator text APIの記述
                const getToken = function() {
                    const defer =$.Deferred();

                    const arr = JSON.parse(sessionStorage.getItem("tdata"));
                    
                    if (arr === null || arr.time + 1000 * 60 * 8 < nowtime) { //トークンの利用可能時間8分、sessionstorageに保存して再利用するための記述
                        $.ajax({
                            url: 'https://api.cognitive.microsoft.com/sts/v1.0/issueToken',
                            type: 'POST',
                            headers: {
                                'Content-Type': 'application/json',
                                'Accept': 'application/jwt',
                                'Ocp-Apim-Subscription-Key': '9bd3c52b30fc4a2a8f16faa5bff5971f',
                            }
                        }).done(function(data) {
                            // const datalist = {
                            //     time: nowtime,
                            //     token: data,
                            // }
                            const token = data;
                            defer.resolve(token);
                            console.log(data);
                            // sessionStorage.setItem('tdata', JSON.stringify(datalist));
                        });
                            return defer.promise();
                    };

                    // const arr2 = JSON.parse(sessionStorage.getItem("tdata"));
                    // const token = arr2.token;
                    // // defer.resolve(token);
                    // // return defer.promise();
                    // return console.log(token);
                };

                $.when(getToken()).done(function(token) {
                    const key = 'Bearer ' + token;
                    const text = selectedStr;
                    const response = $.ajax({
                        url: 'https://api.microsofttranslator.com/v2/http.svc/Translate',
                        type: 'GET',
                        data: {
                            'appid': key,
                            'Accept': 'application/xml',
                            'text': text,
                            'to': 'ja',
                        },
                    async: false,
                    })

                    const data = response.responseText;
                    const translation = data.replace(/<("[^"]*"|'[^']*'|[^'">])*>/g, '');
      
                    $('h1').prepend().text(translation);
                });
                //microsoft translator text APIの記述終了


                //microsoft API 記述②
                // var settings = {
                //     "async": true,
                //     "crossDomain": true,
                //     "url": "https://microsoft-azure-microsoft-text-translation-3-0-v1.p.rapidapi.com/dictionary/examples?api-version=3.0",
                //     "method": "POST",
                //     "headers": {
                //         "x-rapidapi-host": "microsoft-azure-microsoft-text-translation-3-0-v1.p.rapidapi.com",
                //         "x-rapidapi-key": "9bd3c52b30fc4a2a8f16faa5bff5971f",
                //         "content-type": "application/json",
                //         "accept": "application/json"
                //     },
                //     "processData": false,
                //     "data": selectedStr
                // }
                
                // $.ajax(settings).done(function (response) {
                //     window.open(response);
                // });
                //microsoft API 記述②終了



                    // crossDomain: true, //外部サイトのファイルを参照                    }
                    
                        // $(xml).find("DicItemTitle").each(function() {
                        //     $('h1').append('$(this).find("ItemID").text()')
                        //     var id = $(this).find("ItemID").text();
                        // });
                        // alert("成功");
            }
        }
    });

    
});

$(function() {
    $('.navbar_toggle').on('click', function() {
        $(this).toggleClass('open');
        $('.menu').toggleClass('open');
    });
});