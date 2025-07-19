import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import Icon from '@/components/ui/icon';
import { useCart } from '@/context/CartContext';

const Cart: React.FC = () => {
  const { cartItems, removeFromCart, updateQuantity, clearCart, getTotalPrice, getTotalItems } = useCart();

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-roblox-gray to-white">
        <div className="container mx-auto px-4 py-12">
          <div className="text-center max-w-md mx-auto">
            <Icon name="ShoppingCart" size={64} className="text-gray-300 mx-auto mb-6" />
            <h1 className="text-3xl font-bold text-roblox-dark mb-4">Корзина пуста</h1>
            <p className="text-gray-600 mb-6">Добавьте скрипты в корзину, чтобы продолжить покупку</p>
            <Link to="/catalog">
              <Button className="bg-roblox-blue hover:bg-roblox-blue/90 text-white">
                <Icon name="ArrowLeft" size={16} className="mr-2" />
                Перейти в каталог
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-roblox-gray to-white">
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-roblox-dark">Корзина</h1>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={clearCart}
            className="text-red-600 hover:bg-red-50"
          >
            <Icon name="Trash2" size={16} className="mr-2" />
            Очистить корзину
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-4">
            {cartItems.map((item) => (
              <Card key={item.id} className="bg-white shadow-md">
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4">
                    <div className="w-24 h-16 bg-gradient-to-br from-roblox-blue to-roblox-orange rounded-lg overflow-hidden flex-shrink-0">
                      <img 
                        src={item.image} 
                        alt={item.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h3 className="text-lg font-bold text-roblox-dark mb-1">{item.title}</h3>
                          <Badge variant="secondary" className="bg-roblox-orange/10 text-roblox-orange text-xs">
                            {item.category}
                          </Badge>
                        </div>
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="text-gray-400 hover:text-red-500 transition-colors"
                        >
                          <Icon name="X" size={20} />
                        </button>
                      </div>
                      
                      <p className="text-gray-600 text-sm mb-4 line-clamp-2">{item.description}</p>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            disabled={item.quantity <= 1}
                            className="w-8 h-8 p-0"
                          >
                            <Icon name="Minus" size={14} />
                          </Button>
                          <span className="font-medium text-roblox-dark min-w-[2rem] text-center">
                            {item.quantity}
                          </span>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="w-8 h-8 p-0"
                          >
                            <Icon name="Plus" size={14} />
                          </Button>
                        </div>
                        
                        <div className="text-right">
                          <div className="text-xl font-bold text-roblox-blue">
                            {parseInt(item.price.replace('₽', '')) * item.quantity}₽
                          </div>
                          <div className="text-sm text-gray-500">
                            {item.price} за штуку
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="lg:col-span-1">
            <Card className="bg-white shadow-lg sticky top-24">
              <CardHeader>
                <CardTitle className="text-xl font-bold text-roblox-dark">Итого к оплате</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Товаров:</span>
                    <span className="font-medium text-roblox-dark">{getTotalItems()}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Сумма:</span>
                    <span className="font-medium text-roblox-dark">{getTotalPrice()}₽</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Скидка:</span>
                    <span className="font-medium text-green-600">-0₽</span>
                  </div>
                </div>

                <Separator />

                <div className="flex justify-between text-lg font-bold">
                  <span className="text-roblox-dark">Итого:</span>
                  <span className="text-roblox-blue">{getTotalPrice()}₽</span>
                </div>

                <Link to="/checkout">
                  <Button 
                    size="lg" 
                    className="w-full bg-roblox-orange hover:bg-roblox-orange/90 text-white text-lg"
                  >
                    <Icon name="CreditCard" size={20} className="mr-2" />
                    Оформить заказ
                  </Button>
                </Link>

                <Button 
                  variant="outline" 
                  size="lg" 
                  className="w-full border-roblox-blue text-roblox-blue hover:bg-roblox-blue hover:text-white"
                >
                  <Icon name="Gift" size={20} className="mr-2" />
                  Промокод
                </Button>

                <Separator />

                <div className="space-y-3 text-sm">
                  <div className="flex items-center text-green-600">
                    <Icon name="Shield" size={16} className="mr-2" />
                    <span>Безопасная оплата</span>
                  </div>
                  <div className="flex items-center text-green-600">
                    <Icon name="Download" size={16} className="mr-2" />
                    <span>Мгновенная загрузка</span>
                  </div>
                  <div className="flex items-center text-green-600">
                    <Icon name="RefreshCw" size={16} className="mr-2" />
                    <span>Возврат в течение 7 дней</span>
                  </div>
                </div>

                <Separator />

                <Link to="/catalog">
                  <Button variant="ghost" className="w-full text-roblox-blue hover:bg-roblox-blue/10">
                    <Icon name="ArrowLeft" size={16} className="mr-2" />
                    Продолжить покупки
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;