class CreateUserChannels < ActiveRecord::Migration[6.1]
  def change
    create_table :user_channels do |t|
      t.integer :channel_id
      t.integer :user_id

      t.timestamps
    end
  end
end
