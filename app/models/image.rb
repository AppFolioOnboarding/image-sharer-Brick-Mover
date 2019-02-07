class Image < ApplicationRecord
  validates :link,
            # rubocop:disable LineLength
            format: { with: %r{(?:([^:/?#]+):)?(?://([^/?#]*))?([^?#]*\.(?:jpe?g|gif|png))(?:\?([^#]*))?(?:#(.*))?},
                      # rubocop:enable LineLength
                      message: 'is not an image URL' }
end
