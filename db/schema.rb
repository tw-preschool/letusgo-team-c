# encoding: UTF-8
# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20141224114153) do

  create_table "customer_informations", force: true do |t|
    t.string   "countname"
    t.string   "password"
    t.string   "name"
    t.string   "address"
    t.string   "phone"
    t.string   "guid"
    t.text     "details"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "items", force: true do |t|
    t.string   "name"
    t.float    "price"
    t.string   "unit"
    t.integer  "num"
    t.float    "total_money"
    t.string   "promoted"
    t.float    "saving_money"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.integer  "customer_information_id"
  end

  create_table "orders", force: true do |t|
    t.string   "guid"
    t.text     "details"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.string   "countname"
  end

  create_table "products", force: true do |t|
    t.string   "name"
    t.float    "price"
    t.string   "unit"
    t.string   "information"
    t.string   "promoted"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.integer  "number"
  end

end
