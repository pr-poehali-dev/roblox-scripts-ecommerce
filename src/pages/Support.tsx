import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';
import { useToast } from '@/hooks/use-toast';

const Support: React.FC = () => {
  const [contactForm, setContactForm] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    await new Promise(resolve => setTimeout(resolve, 1000));

    toast({
      title: "Сообщение отправлено!",
      description: "Мы свяжемся с вами в течение 24 часов",
    });

    setContactForm({ name: '', email: '', subject: '', message: '' });
    setIsSubmitting(false);
  };

  const faqItems = [
    {
      question: "Как установить скрипт?",
      answer: "Скачайте скрипт после покупки, откройте ваш executor (Synapse X, KRNL и др.), загрузите файл скрипта и нажмите Execute. Подробная инструкция приходит на email после покупки."
    },
    {
      question: "Какие executor'ы поддерживаются?",
      answer: "Мы поддерживаем все популярные executor'ы: Synapse X, Script-Ware, KRNL, Fluxus, Delta и другие. Совместимость указана на странице каждого скрипта."
    },
    {
      question: "Можно ли вернуть деньги?",
      answer: "Да, мы предоставляем возврат в течение 7 дней с момента покупки, если скрипт не работает по техническим причинам. Возврат не предоставляется, если аккаунт был заблокирован за использование читов."
    },
    {
      question: "Безопасны ли ваши скрипты?",
      answer: "Все скрипты проходят проверку на безопасность. Мы не включаем вредоносный код, логеры или стилеры. Однако помните, что использование любых модификаций в Roblox запрещено правилами игры."
    },
    {
      question: "Как часто обновляются скрипты?",
      answer: "Скрипты обновляются регулярно при обновлениях игр или обнаружении багов. Все обновления бесплатны для владельцев скриптов. Уведомления об обновлениях приходят на email."
    },
    {
      question: "Можно ли использовать скрипт на нескольких аккаунтах?",
      answer: "Одна лицензия действует для одного аккаунта Roblox. Для использования на нескольких аккаунтах необходимо приобрести дополнительные лицензии."
    },
    {
      question: "Что делать, если скрипт не работает?",
      answer: "Сначала убедитесь, что используете последнюю версию скрипта и поддерживаемый executor. Если проблема остается, обратитесь в поддержку с описанием ошибки."
    },
    {
      question: "Как получить техническую поддержку?",
      answer: "Техническая поддержка доступна 24/7 через форму обратной связи, Telegram или Discord. Обычно отвечаем в течение 2-4 часов."
    }
  ];

  const contactMethods = [
    {
      icon: "MessageCircle",
      title: "Telegram",
      description: "Быстрые ответы в чате",
      contact: "@roscript_support",
      available: "24/7"
    },
    {
      icon: "MessageSquare",
      title: "Discord",
      description: "Сообщество и поддержка",
      contact: "discord.gg/roscript",
      available: "24/7"
    },
    {
      icon: "Mail",
      title: "Email",
      description: "Подробные вопросы",
      contact: "support@roscript.store",
      available: "2-4 часа"
    },
    {
      icon: "Phone",
      title: "WhatsApp",
      description: "Срочные вопросы",
      contact: "+7 (999) 123-45-67",
      available: "10:00 - 22:00"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-roblox-gray to-white">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-roblox-dark mb-4">Поддержка</h1>
            <p className="text-xl text-gray-600">Мы здесь, чтобы помочь вам 24/7</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-12">
            {contactMethods.map((method, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="w-12 h-12 bg-gradient-to-br from-roblox-blue to-roblox-orange rounded-full flex items-center justify-center mx-auto mb-4">
                    <Icon name={method.icon as any} size={24} className="text-white" />
                  </div>
                  <h3 className="font-bold text-roblox-dark mb-2">{method.title}</h3>
                  <p className="text-sm text-gray-600 mb-3">{method.description}</p>
                  <p className="text-sm font-medium text-roblox-blue mb-2">{method.contact}</p>
                  <Badge variant="outline" className="text-xs">
                    {method.available}
                  </Badge>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Icon name="HelpCircle" size={24} className="mr-2 text-roblox-blue" />
                  Часто задаваемые вопросы
                </CardTitle>
                <CardDescription>
                  Ответы на самые популярные вопросы
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Accordion type="single" collapsible className="w-full">
                  {faqItems.map((item, index) => (
                    <AccordionItem key={index} value={`item-${index}`}>
                      <AccordionTrigger className="text-left">
                        {item.question}
                      </AccordionTrigger>
                      <AccordionContent className="text-gray-600">
                        {item.answer}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Icon name="Send" size={24} className="mr-2 text-roblox-orange" />
                  Связаться с нами
                </CardTitle>
                <CardDescription>
                  Не нашли ответ? Напишите нам напрямую
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleContactSubmit} className="space-y-4">
                  <div>
                    <Label htmlFor="name">Имя</Label>
                    <Input
                      id="name"
                      value={contactForm.name}
                      onChange={(e) => setContactForm({...contactForm, name: e.target.value})}
                      required
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={contactForm.email}
                      onChange={(e) => setContactForm({...contactForm, email: e.target.value})}
                      required
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="subject">Тема</Label>
                    <Input
                      id="subject"
                      value={contactForm.subject}
                      onChange={(e) => setContactForm({...contactForm, subject: e.target.value})}
                      required
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="message">Сообщение</Label>
                    <Textarea
                      id="message"
                      rows={4}
                      value={contactForm.message}
                      onChange={(e) => setContactForm({...contactForm, message: e.target.value})}
                      required
                    />
                  </div>

                  <Button
                    type="submit"
                    className="w-full bg-roblox-orange hover:bg-roblox-orange/90 text-white"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <Icon name="Loader2" size={16} className="mr-2 animate-spin" />
                        Отправка...
                      </>
                    ) : (
                      <>
                        <Icon name="Send" size={16} className="mr-2" />
                        Отправить сообщение
                      </>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

          <Card className="mt-8">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Icon name="Clock" size={24} className="mr-2 text-roblox-blue" />
                Время работы поддержки
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-bold mb-3">Автоматическая поддержка</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center">
                      <Icon name="Bot" size={16} className="mr-2 text-green-500" />
                      <span>Telegram бот: 24/7</span>
                    </div>
                    <div className="flex items-center">
                      <Icon name="FileText" size={16} className="mr-2 text-green-500" />
                      <span>База знаний: 24/7</span>
                    </div>
                    <div className="flex items-center">
                      <Icon name="Download" size={16} className="mr-2 text-green-500" />
                      <span>Автоматическая выдача: мгновенно</span>
                    </div>
                  </div>
                </div>
                <div>
                  <h4 className="font-bold mb-3">Живая поддержка</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center">
                      <Icon name="Users" size={16} className="mr-2 text-blue-500" />
                      <span>Чат поддержка: 10:00 - 02:00 МСК</span>
                    </div>
                    <div className="flex items-center">
                      <Icon name="Phone" size={16} className="mr-2 text-blue-500" />
                      <span>Срочные случаи: 24/7</span>
                    </div>
                    <div className="flex items-center">
                      <Icon name="Mail" size={16} className="mr-2 text-blue-500" />
                      <span>Email: ответ в течение 4 часов</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Support;