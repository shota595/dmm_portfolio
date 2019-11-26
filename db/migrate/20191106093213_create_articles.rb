class CreateArticles < ActiveRecord::Migration[5.2]
  def change
    create_table :articles do |t|
      t.string :title
      t.text :content
      t.text :article_image
      t.text :article_url
      t.string :author
      t.string :published_at

      t.timestamps
    end
  end
end
