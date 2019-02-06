require 'test_helper'

class ImagesControllerTest < ActionDispatch::IntegrationTest
  test 'response and html' do
    get images_url
    assert_response :ok
    assert_select 'title', { count: 1, text: 'Hello, world!' },
                  'Wrong title or more than one title element'
    assert_select 'body h1', 'Hello'
    assert_select 'body p', 'World'
  end
end
