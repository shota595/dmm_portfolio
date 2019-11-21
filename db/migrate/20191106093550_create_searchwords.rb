class CreateSearchwords < ActiveRecord::Migration[5.2]
  def change
    create_table :searchwords do |t|
      t.string :word_name
      t.string :word_meaning
      t.references :user, foreign_key: true

      t.timestamps
    end
  end
end
