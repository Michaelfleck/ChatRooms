class ChannelsController < ApplicationController
    before_action :authorize_request

    def index
        channels = Channel.joins(:messages).where(messages: { user_id: @current_user.id }).uniq
        # channel filter by @current_user
        # https://edgeguides.rubyonrails.org/active_record_querying.html
        # Channel.joins(:messages).where(messages: { user_id: 1 }).uniq
        render json: channels
    end

    def create
        
        newchannel = Channel.create!(channel_params)
        render json: newchannel, status: :created
        logger.debug ""
        
    rescue ActiveRecord::RecordInvalid => invalid
        render json: { errors: invalid.record.errors.full_messages }, status: :unprocessable_entity
    end

    private
    def channel_params
        params.require(:channel).permit(:title)
    end
end
