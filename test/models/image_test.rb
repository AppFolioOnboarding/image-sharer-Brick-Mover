require 'test_helper'

class ImageTest < ActiveSupport::TestCase
  test 'non-image URL' do
    non_image_urls = %w[https://github.com/AppFolioOnboarding/image-sharer-Brick-Mover/pull/9
                        www.foo.com/files/1.pdf'
                        https://guides.rubyonrails.org/action_controller_overview.html]
    non_image_urls.each do |url|
      image = Image.new(link: url)
      assert_not_predicate image, :valid?
      assert_equal ['is not an image URL'], image.errors.messages[:link]
    end
  end

  test 'valid image URLs' do
    image_urls = %w[www.foo.com/2.jpeg
                    www.foo.com/3.jpg
                    www.bar.com/4.png
                    www.baz.com/5.gif]
    image_urls.each do |url|
      image = Image.new(link: url)
      assert_predicate image, :valid?
    end
  end
end
