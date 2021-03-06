# == Schema Information
#
# Table name: articles
#
#  id            :integer          not null, primary key
#  title         :string
#  content       :text
#  article_image :text
#  article_url   :text
#  author        :string
#  published_at  :string
#  genre_id      :integer
#  created_at    :datetime         not null
#  updated_at    :datetime         not null
#
# Indexes
#
#  index_articles_on_genre_id  (genre_id)
#

class Article < ApplicationRecord
  validates :title, uniqueness: true, presence: true
  belongs_to :genre
  has_many :browsing_histories, dependent: :destroy
  has_many :favorites, dependent: :destroy
  has_many :liking_users, through: :likes, source: :user

  paginates_per 10

  attachment :image


  def self.get_news
    require "open-uri"
    require "news-api"
    news_API = ENV["news_API"]
    url = 'https://newsapi.org/v2/top-headlines?sources=abc-news&apiKey=' + news_API
    article_serialized = open(url).read
    articles = JSON.parse(article_serialized)
    # News APIから取得したデータをデータベースに保存
    #実装したいコード：データベースに検索をかけてあればsaveをしない、なければsaveをする
    articles["articles"].each do |item|
      begin
        article =Article.create!(
          {author:item["author"],title:item["title"],content:item["content"],
          article_image:item["urlToImage"] ,article_url:item["url"] ,
          published_at:item["publishedAt"],genre_id:1})
      rescue
        next
      end
    end
  end 

  def self.get_technologynews
    require "open-uri"
    require "news-api"
    news_API = ENV["news_API"]
    url = 'https://newsapi.org/v2/top-headlines?sources=techcrunch&apiKey=' + news_API
    article_serialized = open(url).read
    articles = JSON.parse(article_serialized)
    # News APIから取得したデータをデータベースに保存
    #実装したいコード：データベースに検索をかけてあればsaveをしない、なければsaveをする
    articles["articles"].each do |item|
      begin
        article =Article.create!(
          {author:item["author"],title:item["title"],content:item["content"],
          article_image:item["urlToImage"] ,article_url:item["url"] ,
          published_at:item["publishedAt"],genre_id:2})
      rescue
        next
      end
    end
  end 

  def favorited_by?(user)
    favorites.where(user_id: user.id).exists?
  end
end
