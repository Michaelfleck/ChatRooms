class MessageSerializer < ActiveModel::Serializer
  attributes :id, :chatroom_id, :user_id, :body
end
