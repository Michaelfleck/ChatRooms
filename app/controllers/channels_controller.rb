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
        channel = Channel.find(params[:id])
        json_object = ChannelSerializer.new(channel).as_json
    end

    def create
        newchannel = Channel.create!(channel_params)
        new_user_channel = UserChannel.create(channel_id: newchannel.id, user_id: @current_user.id)
        puts "---------"
        puts new_user_channel
        puts "---------"
        render json: {channel:newchannel, user_channel:new_user_channel}, status: :created
        logger.debug ""
        
    rescue ActiveRecord::RecordInvalid => invalid
        render json: { errors: invalid.record.errors.full_messages }, status: :unprocessable_entity
    end

    # GET /channels/list
    # Get all messages by channel ID
    def list
        # filtered_channel = Channel.joins(:messages).where(id: params[:id])
        # render json: filtered_channel

        channel = Channel.where(id: params[:id])[0]
        messages = Message.where(channel_id: params[:id]).order(created_at: :desc)

        render json: { channel:channel, messages:messages }
    end

    private
    def channel_params
        params.require(:channel).permit(:title)
    end
end



