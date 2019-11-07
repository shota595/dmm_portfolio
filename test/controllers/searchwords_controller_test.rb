require 'test_helper'

class SearchwordsControllerTest < ActionDispatch::IntegrationTest
  test "should get index" do
    get searchwords_index_url
    assert_response :success
  end

  test "should get create" do
    get searchwords_create_url
    assert_response :success
  end

  test "should get destroy" do
    get searchwords_destroy_url
    assert_response :success
  end

end
