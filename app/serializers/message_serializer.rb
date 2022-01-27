class MessageSerializer < ActiveModel::Serializer
  attributes :id, :channel_id, :user_id, :body

  # belongs_to :user, serializer: UserSerializer

  # def written_at
  #   object.created_at.strftime('%H:%M:%S %d %B %Y')
  # end
  
end
