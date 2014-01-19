class InputController < ApplicationController
  def new
    @input = Input.new
  end
  def show
    @input = Input.find(params[:id])
  end
  def create
    @input = Input.new(input_params)
    if @input.save
      redirect_to '/new'
    else
      render 'new'
    end
  end
  def edit
  end
  def update
  end
  def destroy
  end

  private
  def input_params
    params.require(:input).permit(:address)
  end
end
