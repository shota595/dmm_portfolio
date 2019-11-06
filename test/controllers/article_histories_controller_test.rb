require 'test_helper'

class ArticleHistoriesControllerTest < ActionDispatch::IntegrationTest
  test "should get index" do
    get article_histories_index_url
    assert_response :success
  end

end
