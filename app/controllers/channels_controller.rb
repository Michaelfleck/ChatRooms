class ChannelsController < ApplicationController
    before_action :authorize_request

    def index

        channels = Channel.all
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

    def mychannels
        # @channel_decor = ChannelDecorator.decorate_collection(Channel.all)

        channels = Channel.joins(:user_channels).where(user_channels: { user_id: @current_user.id }).uniq
        puts "-------123"
        puts channels.inspect
        # channel filter by @current_user
        # https://edgeguides.rubyonrails.org/active_record_querying.html
        # Channel.joins(:messages).where(messages: { user_id: 1 }).uniq
        render json: channels
    end

    private
    def channel_params
        params.require(:channel).permit(:title)
    end
end



