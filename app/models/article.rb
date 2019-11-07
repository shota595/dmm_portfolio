class Article < ApplicationRecord
  belongs_to :genre
  has_many :browsing_histories
  has_many :favorites
end
