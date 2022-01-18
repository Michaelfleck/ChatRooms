class Channel < ApplicationRecord
    has_many :users, through: :messages
end
