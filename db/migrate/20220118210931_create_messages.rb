class CreateMessages < ActiveRecord::Migration[6.1]
  def change
    create_table :messages do |t|
      t.integer :channel_id
      t.integer :user_id
      t.string :body

      t.timestamps
    end
  end
end
