class Image < ApplicationRecord
  validates :link,
            format: { with: %r{(?:([^:/?#]+):)?(?://([^/?#]*))?([^?#]*\.(?:jpe?g|gif|png))(?:\?([^#]*))?(?:#(.*))?},
                      message: 'is not an image URL' }
end
