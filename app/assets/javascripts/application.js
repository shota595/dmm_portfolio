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
    $('#textarea').on('mouseup', function(){  //mouseupでイベント発火（クリックを離すと発火）
        var selectedStr;
        if(window.getSelection){  //selectionオブジェクト取得
            selectedStr = window.getSelection().toString();  //文章取得
            if(selectedStr !== '' && selectedStr !== '\n'){  //文章チェック
            $('h1').prepend('<p>' + selectedStr + '</p>');
            }
        }
    });
});



