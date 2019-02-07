require 'test_helper'

class ImageTest < ActiveSupport::TestCase
  test 'non-image URL' do
    image = Image.new(link: 'www.foo.pdf')
    assert_not image.valid?
  end

  test 'image URL' do
    image = Image.new(link: 'www.foo.jpeg')
    assert image.valid?
  end
end
