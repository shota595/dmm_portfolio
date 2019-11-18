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
    //閲覧した記事を保存する（articlesのコントローラーを叩く）
    // $.ajax({
    //     url: 'articles/:id',
    //     type: 'POST',
        

    // })


    $('#textarea').on('mouseup', function(){ //mouseupでイベント発火（クリックを離すと発火）

        var selectedStr;
        if(window.getSelection){  //selectionオブジェクト取得
            selectedStr = window.getSelection().toString();  //文章取得
            if(selectedStr !== '' && selectedStr !== '\n'){  //文章チェック
                $('#word').text(selectedStr);


                //microsoft translator text APIの記述
                const getToken = function() {
                    const defer =$.Deferred();
                    const KEY = gon.translate_key; //環境変数
                    // const arr = JSON.parse(sessionStorage.getItem("tdata"));
                    // if (arr === null || arr.time + 1000 * 60 * 8 < nowtime) { //トークンの利用可能時間8分、sessionstorageに保存して再利用する分岐
                        $.ajax({
                            url: 'https://api.cognitive.microsoft.com/sts/v1.0/issueToken',
                            type: 'POST',
                            headers: {
                                'Content-Type': 'application/json',
                                'Accept': 'application/jwt',
                                'Ocp-Apim-Subscription-Key': KEY,
                            }
                        }).done(function(data) {
                            const token = data;
                            defer.resolve(token);
                            console.log(data);
                            // sessionStorage.setItem('tdata', JSON.stringify(datalist));
                        });
                        return defer.promise();
                    // };
                };


                //token取得後の処理
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
                    $('#description').text(translation);
                });
                //microsoft translator text APIの記述終了

                //translationのpopup用
                // $('.list').magnificPopup({
                //     type:'inline'
                // });
            }
        }
    });
});

//メニューバー
$(function() {
    $('.navbar_toggle').on('click', function() {
        $(this).toggleClass('open');
        $('.menu').toggleClass('open');
    });
});

//検索した単語の保存（articleのコントローラーを叩く）
$(function() {
    $('#description').on('DOMSubtreeModified propertychange', function() {
        var id = $(".articleID").val();　//ビューからarticlesのIDを取得
        console.log("/articles/" + id + "/save");
        $.ajax({
            url: "/articles/" + id + "/save",
            type: "get",
            data: {word: $('#word').html(),
                    meaning: $('#description').html()
        },
        dataType: "html"
        });
    });
});