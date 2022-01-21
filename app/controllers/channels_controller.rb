class ChannelsController < ApplicationController
    before_action :authorize_request

    def index

        @channel_decor = ChannelDecorator.decorate_collection(Channel.all)

        channels = Channel.joins(:user_channels).where(user_channels: { user_id: @current_user.id }).uniq
        # channel filter by @current_user
        # https://edgeguides.rubyonrails.org/active_record_querying.html
        # Channel.joins(:messages).where(messages: { user_id: 1 }).uniq
        render json: channels
    end

    def show
        @channel = Channel.find(params[:id])
        @json_object = ChatRoomSerializer.new(@chat_room).as_json
    end

    def create
        
        newchannel = Channel.create!(channel_params)
        render json: newchannel, status: :created
        logger.debug ""
        
    rescue ActiveRecord::RecordInvalid => invalid
        render json: { errors: invalid.record.errors.full_messages }, status: :unprocessable_entity
    end

    # GET /channels/list
    # Get all messages by channel ID
    def list
        filtered_channel = Channel.joins(:messages).where(channel_id: filtered_channel_params)
    end

    private
    def channel_params
        params.require(:channel).permit(:title)
    end

    def filtered_channel_params
        params.require(:channel).permit(:channel_id)
    end
end



