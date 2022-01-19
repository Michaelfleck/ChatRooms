class MessageSerializer < ActiveModel::Serializer
  attributes :id, :channel_id, :user_id, :body
end
