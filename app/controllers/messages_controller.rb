class MessagesController < ApplicationController
    before_action :authorize_request

    # channels = Channel.joins(:user_channels).where(user_channels: { user_id: @current_user.id }).uniq
        
    # POST /messages
    def create
        new_message = Message.create!({
            channel_id: message_params[:channel_id], 
            body: message_params[:body], 
            user_id: @current_user.id
        })
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
        messages = Message.where(channel_id: params[:id]).joins(:user).order(created_at: :asc)
    messages_output = messages.map do |message|
        user = User.where(id: message.user_id)[0]
        {
            id: message.id,
            created_at: message.created_at,
            body: message.body,
            user: {
                id: user.id,
                username: user.username,
                name: user.name,
                email: user.email
            }
        }
    end


        render json: { channel:channel, messages: messages_output}
    end

    

    private
    def message_params
        params.require(:message).permit(:channel_id, :body)
    end

end
