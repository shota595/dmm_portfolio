class Article < ApplicationRecord
  validates :title, uniqueness: true, presence: true
  belongs_to :genre
  has_many :browsing_histories
  has_many :favorites
end
