class UsersController < ApplicationController
    before_action :configure_permitted_parameters, if: :devise_controller?
    before_action :authenticate_user!

    def index
    end

    def show
        @user = User.find(params[:id])
    end

    def favo_article
        @favos = current_user.favorites.all
    end

    def quiz
    #     words = current_user.searchwords.where(user_id: current_user.id)
    #     @selects  = []
    #     words.each do |w|
    #         selects << {quiz: w, }
        # array = []
        # words = Searchword.pluck(user_id: current_user.id, :)
        # array << words
        # @hoge = array
        search = Searchword.where(user_id: current_user.id)
        words = search.pluck(:word_name, :word_meaning)
        word = words.sample
        array = []
        array << word
        @q = array[0][0]
        @a = array[0][1]
        gon.correct_answer = array[0][1]
    end 
end
