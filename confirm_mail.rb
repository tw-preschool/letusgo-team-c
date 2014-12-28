# -*- encoding : utf-8 -*-
require 'net/smtp'
require 'rubygems'
require 'mailfactory'

def sendmail(to,name)

mail = MailFactory.new()

mail.to = to
mail.from = "letusgo_team_c@163.com"
mail.subject = name + "，欢迎加入 Let's Go"
mail.text = "尊敬的" + name + "：\n\n　　　感谢您注册 Let's Go!\n\nLet's Go"

Net::SMTP.start('smtp.163.com', 25, '163.com', 'letusgo_team_c@163.com', 'letusgoteamc', :plain)  { |smtp|
  smtp.send_message(mail.to_s(),'letusgo_team_c@163.com', to)
}

end
