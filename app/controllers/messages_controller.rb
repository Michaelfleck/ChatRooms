class MessagesController < ApplicationController


    # channels = Channel.joins(:user_channels).where(user_channels: { user_id: @current_user.id }).uniq
        
    # POST /messages
    def create
        new_message = Message.create!(message_params)
        render json: new_message, status: :created
        logger.debug ""
        
    rescue ActiveRecord::RecordInvalid => invalid
        render json: { errors: invalid.record.errors.full_messages }, status: :unprocessable_entity
    end

    

    private
    def message_params
        params.require(:message).permit(:channel_id, :user_id, :body)
    end

end
