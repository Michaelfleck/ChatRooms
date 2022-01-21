class UserChannelsController < ApplicationController



    def create
        
        new_user_channel = UserChannel.create!(user_channel_params)
        render json: new_user_channel, status: :created
        logger.debug ""
        
    rescue ActiveRecord::RecordInvalid => invalid
        render json: { errors: invalid.record.errors.full_messages }, status: :unprocessable_entity
    end



    private
    def user_channel_params
        params.require(:user_channel).permit(:channel_id, :user_id)
    end
end
