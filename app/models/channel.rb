class Channel < ApplicationRecord
    has_many :messages, dependent: :destroy
    has_many :user_channels
    has_many :users, through: :user_channels
    validates :title, presence: true, uniqueness: true, length: { minimum: 3 }
end
