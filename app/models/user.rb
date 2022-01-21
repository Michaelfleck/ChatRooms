class User < ApplicationRecord
    has_many :messages, dependent: :destroy
    has_many :channels, through: :user_channels, dependent: :destroy
    has_secure_password
    # mount_uploader :avatar, AvatarUploader
    validates :email, presence: true, uniqueness: true
    validates :email, format: { with: URI::MailTo::EMAIL_REGEXP }
    validates :username, presence: true, uniqueness: true
    validates :name, presence: true
    validates :password,
            length: { minimum: 6},
            if: -> { new_record? || !password.nil? }
end
