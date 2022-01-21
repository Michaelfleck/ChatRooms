class Message < ApplicationRecord
    belongs_to :channel
    belongs_to :user
    validates :body, presence: true, length: {minimum: 0, maximum: 1000}
end
