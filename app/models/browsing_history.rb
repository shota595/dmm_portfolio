# == Schema Information
#
# Table name: browsing_histories
#
#  id         :integer          not null, primary key
#  user_id    :integer
#  article_id :integer
#  created_at :datetime         not null
#  updated_at :datetime         not null
#
# Indexes
#
#  index_browsing_histories_on_article_id  (article_id)
#  index_browsing_histories_on_user_id     (user_id)
#

class BrowsingHistory < ApplicationRecord
  belongs_to :user
  belongs_to :article
end
