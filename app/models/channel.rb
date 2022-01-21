class Channel < ApplicationRecord
    has_many :messages
    has_many :users, through: :user_channels
end
