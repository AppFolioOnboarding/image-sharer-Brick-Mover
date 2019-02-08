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

  test 'new image form has link and tags input' do
    get new_image_url
    assert_response :ok
    assert_select 'body h1', 'New Image'
    assert_select '#image_link'
    assert_select '#image_tag_list'
    assert_select '.btn', count: 1, value: 'Create Image'
  end

  test 'create' do
    params = { image: { link: 'www.example.gif' } }
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
    created_image = Image.create!(link: 'http://www.example.com/1.png')
    get image_url(created_image.id)
    assert_response :ok
    assert_select 'body img[src="http://www.example.com/1.png"]'
    assert_select 'body h1', 'Show something'
  end

  test 'index displays the most recent images' do
    image1 = Image.create!(link: 'http://www.example.com/1.png', created_at: Time.zone.now - 1.day)
    image2 = Image.create!(link: 'http://www.example.com/2.png')

    get images_url

    assert_response :ok
    displayed_images = assert_select 'body img[src]'
    assert_equal image2.link, displayed_images[0].attr('src')
    assert_equal image1.link, displayed_images[1].attr('src')
  end

  test 'database is empty' do
    get images_url

    assert_response :ok
    assert_select 'body img[src="http://www.example.com/1.png"]', false, 'There should be no image here'
  end

  test 'test image tags in show' do
    created_image = Image.create!(link: 'http://www.example.com/1.png', tag_list: 'tag1, tag2')
    get image_url(created_image.id)
    assert_response :ok
    assert_select 'body span', 'Tags: tag1, tag2'
  end

  test 'test image tags in index' do
    Image.create!(link: 'http://www.example.com/1.png', tag_list: 'tag1.1, tag2.1')
    Image.create!(link: 'http://www.example.com/2.png', tag_list: 'tag2.1, tag2.2')

    get images_url

    assert_response :ok

    assert_select 'a[href=?]', images_url('selected_tag': 'tag1.1'), text: 'tag1.1,'
    assert_select 'a[href=?]', images_url('selected_tag': 'tag2.1'), text: 'tag2.1'
    assert_select 'a[href=?]', images_url('selected_tag': 'tag2.1'), text: 'tag2.1,'
    assert_select 'a[href=?]', images_url('selected_tag': 'tag2.2'), text: 'tag2.2'
  end

  test 'test filtering image tags' do
    Image.create!(link: 'http://www.example.com/1.png', tag_list: 'x, y')
    Image.create!(link: 'http://www.example.com/2.png', tag_list: 'x, z')
    Image.create!(link: 'http://www.example.com/3.png', tag_list: 's, t')

    get images_url('selected_tag': 'x')

    assert_response :ok
    assert_select 'a[href=?]', images_url('selected_tag': 'x'), text: 'x,'
    assert_select 'a[href=?]', images_url('selected_tag': 'z'), text: 'z'
    assert_select 'a[href=?]', images_url('selected_tag': 'y'), text: 'y'
    assert_select 'a[href=?]', images_url('selected_tag': 't'), text: 't', count: 0
    assert_select 'a[href=?]', images_url('selected_tag': 's'), text: 's', count: 0
  end
end
