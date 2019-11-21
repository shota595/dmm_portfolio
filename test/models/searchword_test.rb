# == Schema Information
#
# Table name: searchwords
#
#  id           :integer          not null, primary key
#  word_name    :string
#  word_meaning :string
#  user_id      :integer
#  created_at   :datetime         not null
#  updated_at   :datetime         not null
#
# Indexes
#
#  index_searchwords_on_user_id  (user_id)
#

require 'test_helper'

class SearchwordTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
end
