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

    # GET /channels/:id/messages
    # Get all messages by channel ID
    def index_by_channel
        # filtered_channel = Channel.joins(:messages).where(id: params[:id])
        # render json: filtered_channel

        channel = Channel.where(id: params[:id])[0]
        messages = Message.where(channel_id: params[:id]).order(created_at: :desc)

        render json: { channel:channel, messages:messages }
    end

    

    private
    def message_params
        params.require(:message).permit(:channel_id, :user_id, :body)
    end

end
