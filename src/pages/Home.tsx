import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';
import { scriptsData } from '@/data/scripts';
import { useCart } from '@/context/CartContext';

const Home: React.FC = () => {
  const { addToCart } = useCart();
  const featuredScripts = scriptsData.slice(0, 3);

  return (
    <div className="min-h-screen bg-gradient-to-br from-roblox-gray to-white">
      <div className="container mx-auto px-4 py-12">
        <section className="text-center mb-16">
          <div className="bg-gradient-to-r from-roblox-blue to-roblox-orange bg-clip-text text-transparent mb-6">
            <h1 className="text-5xl font-bold mb-4">RoScript Store</h1>
            <p className="text-xl text-roblox-dark max-w-2xl mx-auto">
              Лучшие скрипты для Roblox. Безопасно, надежно, эффективно.
            </p>
          </div>
          
          <div className="flex justify-center gap-4 mt-8">
            <Link to="/catalog">
              <Button size="lg" className="bg-roblox-blue hover:bg-roblox-blue/90 text-white">
                <Icon name="ShoppingCart" size={20} className="mr-2" />
                Перейти в каталог
              </Button>
            </Link>
            <Button variant="outline" size="lg" className="border-roblox-orange text-roblox-orange hover:bg-roblox-orange hover:text-white">
              <Icon name="Play" size={20} className="mr-2" />
              Смотреть демо
            </Button>
          </div>
        </section>

        <section className="mb-16">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-roblox-blue to-roblox-orange rounded-full flex items-center justify-center mx-auto mb-4">
                <Icon name="Shield" size={32} className="text-white" />
              </div>
              <h3 className="text-xl font-bold text-roblox-dark mb-2">Безопасность</h3>
              <p className="text-gray-600">Все скрипты проверены на безопасность и обновляются регулярно</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-roblox-blue to-roblox-orange rounded-full flex items-center justify-center mx-auto mb-4">
                <Icon name="Zap" size={32} className="text-white" />
              </div>
              <h3 className="text-xl font-bold text-roblox-dark mb-2">Производительность</h3>
              <p className="text-gray-600">Оптимизированные скрипты для максимальной производительности</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-roblox-blue to-roblox-orange rounded-full flex items-center justify-center mx-auto mb-4">
                <Icon name="HeartHandshake" size={32} className="text-white" />
              </div>
              <h3 className="text-xl font-bold text-roblox-dark mb-2">Поддержка</h3>
              <p className="text-gray-600">Круглосуточная техническая поддержка и помощь в настройке</p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-3xl font-bold text-roblox-dark mb-8 text-center">Популярные скрипты</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredScripts.map((script) => (
              <Card key={script.id} className="hover:shadow-lg transition-shadow bg-white border-2 border-gray-100">
                <CardHeader className="p-0">
                  <div className="aspect-video bg-gradient-to-br from-roblox-blue to-roblox-orange rounded-t-lg overflow-hidden">
                    <img 
                      src={script.image} 
                      alt={script.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-2">
                    <Badge variant="secondary" className="bg-roblox-orange/10 text-roblox-orange">
                      {script.category}
                    </Badge>
                    <div className="flex items-center text-yellow-500">
                      <Icon name="Star" size={16} className="fill-current" />
                      <span className="ml-1 text-sm font-medium">{script.rating}</span>
                    </div>
                  </div>
                  <CardTitle className="text-lg font-bold text-roblox-dark mb-2">{script.title}</CardTitle>
                  <CardDescription className="text-gray-600 mb-4">{script.description}</CardDescription>
                  <div className="flex items-center text-sm text-gray-500 mb-4">
                    <Icon name="Download" size={16} className="mr-1" />
                    <span>{script.downloads.toLocaleString()} скачиваний</span>
                  </div>
                </CardContent>
                <CardFooter className="p-6 pt-0 flex items-center justify-between">
                  <span className="text-2xl font-bold text-roblox-blue">{script.price}</span>
                  <div className="flex gap-2">
                    <Link to={`/script/${script.id}`}>
                      <Button variant="outline" size="sm">
                        Подробнее
                      </Button>
                    </Link>
                    <Button 
                      size="sm" 
                      className="bg-roblox-orange hover:bg-roblox-orange/90 text-white"
                      onClick={() => addToCart(script)}
                    >
                      В корзину
                    </Button>
                  </div>
                </CardFooter>
              </Card>
            ))}
          </div>
          <div className="text-center mt-8">
            <Link to="/catalog">
              <Button variant="outline" size="lg" className="border-roblox-blue text-roblox-blue hover:bg-roblox-blue hover:text-white">
                Смотреть все скрипты
                <Icon name="ArrowRight" size={20} className="ml-2" />
              </Button>
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Home;