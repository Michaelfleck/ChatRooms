class ChannelsController < ApplicationController

    def index
        channels = Channel.all
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
