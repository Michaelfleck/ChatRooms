class UserChannelsController < ApplicationController

    before_action :authorize_request

    def create
        new_user_channel = UserChannel.create!({ 
            channel_id: user_channel_params[:channel_id],
            user_id: @current_user.id
        })
        render json: new_user_channel, status: :created
        
        rescue ActiveRecord::RecordInvalid => invalid
        render json: { errors: invalid.record.errors.full_messages }, status: :unprocessable_entity
    end


    def list_by_user
        user_channel_list = UserChannel.where(user_id: @current_user.id)
        render json: user_channel_list 
    end


    private
    def user_channel_params
        params.require(:user_channel).permit(:channel_id)
    end
end
