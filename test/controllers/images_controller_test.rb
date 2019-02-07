require 'test_helper'

class ImagesControllerTest < ActionDispatch::IntegrationTest
  test 'index has valid response' do
    get images_url
    assert_response :ok
    assert_select 'title', { count: 1, text: 'Hello, world!' },
                  'Wrong title or more than one title element'
    assert_select 'body h1', 'Hello'
    assert_select 'body p', 'World'
    assert_select 'a[href="http://www.example.com/images/new"]'
  end

  test 'new image' do
    get new_image_url
    assert_response :ok
    assert_select 'body h1', 'New Image'
    assert_select '#image_link'
    assert_select '.btn', count: 1, value: 'Create Image'
  end

  test 'create' do
    params = { image: { link: 'www.example.gif' } }v
    assert_difference 'Image.count' do
      post images_url params
    end
    created_image = Image.last
    assert_redirected_to action: :show, id: created_image.id
    assert_equal 'www.example.gif', created_image.link
  end

  test 'create invalid URL' do
    params = { image: { link: 'www.example.pdf' } }
    assert_no_difference 'Image.count' do
      post images_url params
    end
    assert_response :ok
    assert_select '.invalid-feedback', text: 'Link is not an image URL'
  end

  test 'show' do
    created_image = Image.create!(link: 'http://www.example.png')
    get image_url(created_image.id)
    assert_response :ok
    assert_select 'body img[src="http://www.example.png"]'
    assert_select 'body h1', 'Show something'
  end
end
