class CreateGenres < ActiveRecord::Migration[5.2]
  def change
    create_table :genres do |t|
      t.string :genre_name

      t.timestamps
    end

    add_reference :articles, :genre, foreign_key: true
  end
end
