import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import Icon from '@/components/ui/icon';
import { useCart } from '@/context/CartContext';
import { useAuth } from '@/context/AuthContext';
import { useToast } from '@/hooks/use-toast';

const Checkout: React.FC = () => {
  const { cartItems, getTotalPrice, clearCart } = useCart();
  const { user, isAuthenticated, addPurchase, updateBalance } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [isProcessing, setIsProcessing] = useState(false);
  const [promoCode, setPromoCode] = useState('');
  const [discount, setDiscount] = useState(0);

  const [cardData, setCardData] = useState({
    number: '',
    name: '',
    expiry: '',
    cvv: ''
  });

  const [billingData, setBillingData] = useState({
    email: user?.email || '',
    country: 'RU',
    city: '',
    address: '',
    zip: ''
  });

  const totalAmount = getTotalPrice();
  const finalAmount = totalAmount - discount;

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-roblox-gray to-white flex items-center justify-center">
        <Card className="max-w-md mx-auto text-center">
          <CardHeader>
            <Icon name="Lock" size={48} className="text-gray-300 mx-auto mb-4" />
            <CardTitle>Необходима авторизация</CardTitle>
            <CardDescription>Войдите в систему для оформления заказа</CardDescription>
          </CardHeader>
          <CardContent>
            <Button onClick={() => navigate('/login')} className="bg-roblox-blue hover:bg-roblox-blue/90">
              Войти в аккаунт
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  const applyPromoCode = () => {
    if (promoCode.toLowerCase() === 'save10') {
      setDiscount(Math.floor(totalAmount * 0.1));
      toast({
        title: "Промокод применен!",
        description: "Скидка 10% была применена к вашему заказу",
      });
    } else {
      toast({
        title: "Неверный промокод",
        description: "Проверьте правильность введенного промокода",
        variant: "destructive",
      });
    }
  };

  const handlePayment = async () => {
    setIsProcessing(true);
    
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      cartItems.forEach(item => addPurchase(item.id));
      
      clearCart();
      
      toast({
        title: "Оплата прошла успешно!",
        description: `Спасибо за покупку! Скрипты добавлены в ваш аккаунт.`,
      });
      
      navigate('/profile');
    } catch (error) {
      toast({
        title: "Ошибка оплаты",
        description: "Произошла ошибка при обработке платежа",
        variant: "destructive",
      });
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-roblox-gray to-white">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold text-roblox-dark mb-8">Оформление заказа</h1>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Icon name="CreditCard" size={20} className="mr-2" />
                    Способ оплаты
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod}>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="card" id="card" />
                      <Label htmlFor="card" className="flex items-center cursor-pointer">
                        <Icon name="CreditCard" size={16} className="mr-2" />
                        Банковская карта
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="yandex" id="yandex" />
                      <Label htmlFor="yandex" className="flex items-center cursor-pointer">
                        <Icon name="Wallet" size={16} className="mr-2" />
                        ЮMoney
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="qiwi" id="qiwi" />
                      <Label htmlFor="qiwi" className="flex items-center cursor-pointer">
                        <Icon name="Smartphone" size={16} className="mr-2" />
                        QIWI
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="crypto" id="crypto" />
                      <Label htmlFor="crypto" className="flex items-center cursor-pointer">
                        <Icon name="Bitcoin" size={16} className="mr-2" />
                        Криптовалюта
                      </Label>
                    </div>
                  </RadioGroup>
                </CardContent>
              </Card>

              {paymentMethod === 'card' && (
                <Card>
                  <CardHeader>
                    <CardTitle>Данные карты</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label htmlFor="cardNumber">Номер карты</Label>
                      <Input
                        id="cardNumber"
                        placeholder="1234 5678 9012 3456"
                        value={cardData.number}
                        onChange={(e) => setCardData({...cardData, number: e.target.value})}
                      />
                    </div>
                    <div>
                      <Label htmlFor="cardName">Имя на карте</Label>
                      <Input
                        id="cardName"
                        placeholder="IVAN PETROV"
                        value={cardData.name}
                        onChange={(e) => setCardData({...cardData, name: e.target.value})}
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="expiry">Срок действия</Label>
                        <Input
                          id="expiry"
                          placeholder="MM/YY"
                          value={cardData.expiry}
                          onChange={(e) => setCardData({...cardData, expiry: e.target.value})}
                        />
                      </div>
                      <div>
                        <Label htmlFor="cvv">CVV</Label>
                        <Input
                          id="cvv"
                          placeholder="123"
                          value={cardData.cvv}
                          onChange={(e) => setCardData({...cardData, cvv: e.target.value})}
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}

              <Card>
                <CardHeader>
                  <CardTitle>Платежная информация</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={billingData.email}
                      onChange={(e) => setBillingData({...billingData, email: e.target.value})}
                    />
                  </div>
                  <div>
                    <Label htmlFor="country">Страна</Label>
                    <Select value={billingData.country} onValueChange={(value) => setBillingData({...billingData, country: value})}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="RU">Россия</SelectItem>
                        <SelectItem value="BY">Беларусь</SelectItem>
                        <SelectItem value="KZ">Казахстан</SelectItem>
                        <SelectItem value="UA">Украина</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="city">Город</Label>
                      <Input
                        id="city"
                        value={billingData.city}
                        onChange={(e) => setBillingData({...billingData, city: e.target.value})}
                      />
                    </div>
                    <div>
                      <Label htmlFor="zip">Индекс</Label>
                      <Input
                        id="zip"
                        value={billingData.zip}
                        onChange={(e) => setBillingData({...billingData, zip: e.target.value})}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div>
              <Card className="sticky top-24">
                <CardHeader>
                  <CardTitle>Ваш заказ</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    {cartItems.map((item) => (
                      <div key={item.id} className="flex justify-between items-center">
                        <div className="flex-1">
                          <h4 className="font-medium text-sm">{item.title}</h4>
                          <p className="text-xs text-gray-500">Количество: {item.quantity}</p>
                        </div>
                        <span className="font-medium">
                          {parseInt(item.price.replace('₽', '')) * item.quantity}₽
                        </span>
                      </div>
                    ))}
                  </div>

                  <Separator />

                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Сумма:</span>
                      <span>{totalAmount}₽</span>
                    </div>
                    {discount > 0 && (
                      <div className="flex justify-between text-green-600">
                        <span>Скидка:</span>
                        <span>-{discount}₽</span>
                      </div>
                    )}
                    <div className="flex justify-between font-bold text-lg">
                      <span>Итого:</span>
                      <span className="text-roblox-blue">{finalAmount}₽</span>
                    </div>
                  </div>

                  <Separator />

                  <div className="space-y-2">
                    <Label htmlFor="promo">Промокод</Label>
                    <div className="flex gap-2">
                      <Input
                        id="promo"
                        placeholder="Введите промокод"
                        value={promoCode}
                        onChange={(e) => setPromoCode(e.target.value)}
                      />
                      <Button variant="outline" onClick={applyPromoCode}>
                        Применить
                      </Button>
                    </div>
                    <p className="text-xs text-gray-500">Попробуйте: SAVE10</p>
                  </div>

                  <Separator />

                  <Button
                    onClick={handlePayment}
                    size="lg"
                    className="w-full bg-roblox-orange hover:bg-roblox-orange/90 text-white"
                    disabled={isProcessing}
                  >
                    {isProcessing ? (
                      <>
                        <Icon name="Loader2" size={20} className="mr-2 animate-spin" />
                        Обработка...
                      </>
                    ) : (
                      <>
                        <Icon name="Lock" size={20} className="mr-2" />
                        Оплатить {finalAmount}₽
                      </>
                    )}
                  </Button>

                  <div className="text-xs text-gray-500 text-center space-y-1">
                    <div className="flex items-center justify-center">
                      <Icon name="Shield" size={12} className="mr-1" />
                      Безопасная оплата
                    </div>
                    <div className="flex items-center justify-center">
                      <Icon name="RefreshCw" size={12} className="mr-1" />
                      Возврат в течение 7 дней
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;