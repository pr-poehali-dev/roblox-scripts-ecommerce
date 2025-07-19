import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import Icon from '@/components/ui/icon';
import { scriptsData } from '@/data/scripts';
import { useCart } from '@/context/CartContext';

const ScriptDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { addToCart } = useCart();
  const script = scriptsData.find(s => s.id === parseInt(id || '0'));

  if (!script) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-roblox-gray to-white flex items-center justify-center">
        <div className="text-center">
          <Icon name="AlertCircle" size={64} className="text-gray-300 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-gray-600 mb-2">Скрипт не найден</h1>
          <p className="text-gray-500 mb-4">Возможно, этот скрипт был удален или перемещен</p>
          <Link to="/catalog">
            <Button className="bg-roblox-blue hover:bg-roblox-blue/90 text-white">
              Вернуться в каталог
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-roblox-gray to-white">
      <div className="container mx-auto px-4 py-8">
        <nav className="mb-6">
          <div className="flex items-center text-sm text-gray-500">
            <Link to="/" className="hover:text-roblox-blue">Главная</Link>
            <Icon name="ChevronRight" size={16} className="mx-2" />
            <Link to="/catalog" className="hover:text-roblox-blue">Каталог</Link>
            <Icon name="ChevronRight" size={16} className="mx-2" />
            <span className="text-roblox-dark">{script.title}</span>
          </div>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <Card className="bg-white shadow-lg">
              <CardHeader className="p-0">
                <div className="aspect-video bg-gradient-to-br from-roblox-blue to-roblox-orange rounded-t-lg overflow-hidden">
                  <img 
                    src={script.image} 
                    alt={script.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              </CardHeader>
              <CardContent className="p-8">
                <div className="flex items-center justify-between mb-4">
                  <Badge variant="secondary" className="bg-roblox-orange/10 text-roblox-orange text-sm">
                    {script.category}
                  </Badge>
                  <div className="flex items-center text-yellow-500">
                    <Icon name="Star" size={20} className="fill-current" />
                    <span className="ml-1 font-medium">{script.rating}</span>
                    <span className="ml-2 text-gray-500">({script.downloads.toLocaleString()} скачиваний)</span>
                  </div>
                </div>

                <h1 className="text-3xl font-bold text-roblox-dark mb-4">{script.title}</h1>
                <p className="text-lg text-gray-600 mb-6">{script.fullDescription}</p>

                <div className="mb-6">
                  <h3 className="text-xl font-bold text-roblox-dark mb-3">Ключевые возможности</h3>
                  <ul className="space-y-2">
                    {script.features.map((feature, index) => (
                      <li key={index} className="flex items-center">
                        <Icon name="Check" size={16} className="text-green-500 mr-2 flex-shrink-0" />
                        <span className="text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <Separator className="my-6" />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-bold text-roblox-dark mb-3">Совместимость</h4>
                    <div className="flex flex-wrap gap-2">
                      {script.compatibility.map((executor) => (
                        <Badge key={executor} variant="outline" className="text-sm">
                          {executor}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h4 className="font-bold text-roblox-dark mb-3">Теги</h4>
                    <div className="flex flex-wrap gap-2">
                      {script.tags.map((tag) => (
                        <Badge key={tag} variant="outline" className="text-sm">
                          #{tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="lg:col-span-1">
            <Card className="bg-white shadow-lg sticky top-24">
              <CardHeader>
                <CardTitle className="text-2xl font-bold text-roblox-dark">Купить скрипт</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="text-center">
                  <div className="text-4xl font-bold text-roblox-blue mb-2">{script.price}</div>
                  <p className="text-gray-600 text-sm">Единоразовый платеж</p>
                </div>

                <Button 
                  size="lg" 
                  className="w-full bg-roblox-orange hover:bg-roblox-orange/90 text-white text-lg"
                  onClick={() => addToCart(script)}
                >
                  <Icon name="ShoppingCart" size={20} className="mr-2" />
                  Добавить в корзину
                </Button>

                <Button variant="outline" size="lg" className="w-full border-roblox-blue text-roblox-blue hover:bg-roblox-blue hover:text-white">
                  <Icon name="Heart" size={20} className="mr-2" />
                  В избранное
                </Button>

                <Separator />

                <div className="space-y-4 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Автор:</span>
                    <span className="font-medium text-roblox-dark">{script.author}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Обновлено:</span>
                    <span className="font-medium text-roblox-dark">{script.lastUpdate}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Скачано:</span>
                    <span className="font-medium text-roblox-dark">{script.downloads.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Рейтинг:</span>
                    <span className="font-medium text-roblox-dark">{script.rating}/5.0</span>
                  </div>
                </div>

                <Separator />

                <div className="space-y-3">
                  <div className="flex items-center text-green-600 text-sm">
                    <Icon name="Shield" size={16} className="mr-2" />
                    <span>Проверено на безопасность</span>
                  </div>
                  <div className="flex items-center text-green-600 text-sm">
                    <Icon name="RefreshCw" size={16} className="mr-2" />
                    <span>Регулярные обновления</span>
                  </div>
                  <div className="flex items-center text-green-600 text-sm">
                    <Icon name="HeartHandshake" size={16} className="mr-2" />
                    <span>Поддержка 24/7</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScriptDetail;