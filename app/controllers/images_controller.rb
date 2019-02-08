class ImagesController < ApplicationController
  def index
    @recent_images = Image.order('created_at DESC')
    if params[:selected_tag].present?
      @recent_images = @recent_images.tagged_with([params[:selected_tag]], any: true)
    end
    @recent_images
  end

  def new
    @image = Image.new
  end

  def create
    @image = Image.new(image_params)
    if @image.save
      redirect_to @image
    else
      render :new
    end
  end

  def show
    @image = Image.find(params[:id])
  end

  private

  def image_params
    params.require(:image).permit(:link, :tag_list)
  end
end
