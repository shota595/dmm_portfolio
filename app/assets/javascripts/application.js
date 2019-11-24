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

        var selectedStr;
        if(window.getSelection){  //selectionオブジェクト取得
            selectedStr = window.getSelection().toString();  //文章取得
            // $('#description').text('');
            // $('#description').text('');
            if(selectedStr !== '' && selectedStr !== '\n'){  //文章チェック
                const translation = translate_word(selectedStr,true); //翻訳の関数を呼び出す(※trueは関数のdisplayFlagを実行するために使用)
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
function save_translatedword(meaning, selected_word) {
    var id = $(".articleID").val();　//ビューからarticlesのIDを取得
    console.log("/articles/" + id + "/save");
    $.ajax({
        url: "/articles/" + id + "/save",
        type: "get",
        data: {word: selected_word,
                meaning: meaning},
        dataType: "html"
    });
}

//Microsoft Translator Text APIを使って
//指定した単語を翻訳する関数（英語to日本語）
function translate_word(selectedStr, displayFlag) {
    let translation = "";
    const getToken = function() {
        const defer =$.Deferred();
        const KEY = gon.translate_key; //環境変数
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
        });
        return defer.promise();
    };
    $.when(getToken()).done(function(token) {　//トークン取得時に発火
        const key = 'Bearer ' + token;
        const text = selectedStr;
        const response = $.ajax({
            url: 'https://api.microsofttranslator.com/v2/http.svc/Translate',
            type: 'GET',
            data: {
                'appid': key,
                'Accept': 'application/xml',
                'text': text,
                'to': 'ja',},
            async: false,
        });
        const data = response.responseText;
        translation = data.replace(/<("[^"]*"|'[^']*'|[^'">])*>/g, '');

        if(displayFlag === true){  //一番初めに指定した単語・文章は選択文、翻訳ともに画面に表示
            if (!(translation.match(/[a-zA-Z]/))) {
                $(".popup, .popup-content").addClass("active");
                $('#word').text(selectedStr);
                $('#description').text(translation);
            }
        }
        
        if(selectedStr.match(/^[^ ]+[^ ]$/)) {　　//選択した範囲にスペースを含んでいると分割して保存する
            save_translatedword(translation, selectedStr);
        } else if (selectedStr.match(/[a-zA-Z]/)) {

        } else {
            save_splitword(selectedStr);
        }
    });
}

function save_splitword(selectedStr) {　　//選択した範囲に複数単語が入っている場合
    var array = [];                    //別々でＤＢに保存する
    separate_words = array.push(selectedStr.split(/ +/));
    console.log(array);
    for(var i=0; i<=array.length; i++){
        translate_word(array[0][i],false);
    }
}

$(document).on('turbolinks:load', function() {
    $(".close").on("click", function() {
        $(".popup, .popup-content").removeClass("active");
    });
});

$(function() {
    $('.quiz').on('click', function() {
        var array = [];
        var hoge = gon.words;
        alert(hoge);
    });
});