class CreateInputs < ActiveRecord::Migration
  def change
    create_table :inputs do |t|
      t.string :address
      t.float :latitude
      t.float :longitude

      t.timestamps
    end
  end
end
