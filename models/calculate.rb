# -*- encoding : utf-8 -*-
class Calculate
  def initialize(items)
    @items = items
  end

  def start_promote
    saving_money,total_money = 0,0
    @items.each do |item|
      num = item.get_num()
      price = item.get_price()
      if item.get_promoted()
        if num > 2
          item.set_totalmoney(price * (num - num/3))
          item.set_savingmoney(price)
        end
      elsif
        item.set_totalmoney(price * num)
      end
      saving_money += item.get_savingmoney()
      total_money += item.get_totalmoney()

    end
    return saving_money, total_money
  end
end