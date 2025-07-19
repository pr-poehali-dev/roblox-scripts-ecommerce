import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import Icon from "@/components/ui/icon";
import { useState } from "react";

const Index = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const featuredScripts = [
    {
      id: 1,
      title: "Auto Farm Ultimate",
      description: "Автоматическая ферма для большинства игр Roblox. Поддержка 50+ игр.",
      price: "199₽",
      rating: 4.9,
      downloads: 15420,
      category: "Фарм",
      image: "/img/939b498d-7469-4e05-b301-8906d7ba67ab.jpg"
    },
    {
      id: 2,
      title: "Speed Hack Pro",
      description: "Увеличение скорости персонажа с защитой от античитов.",
      price: "149₽",
      rating: 4.7,
      downloads: 8930,
      category: "Читы",
      image: "/img/92188542-8aaf-46b6-a50d-61289001a14a.jpg"
    },
    {
      id: 3,
      title: "ESP Vision",
      description: "Видение сквозь стены и обнаружение игроков в радиусе.",
      price: "299₽",
      rating: 4.8,
      downloads: 12100,
      category: "Визуализация",
      image: "/img/5dff4155-03c9-495a-b283-e5e195cffe1c.jpg"
    },
    {
      id: 4,
      title: "GUI Builder",
      description: "Конструктор интерфейсов для создания собственных меню.",
      price: "399₽",
      rating: 4.6,
      downloads: 5670,
      category: "Инструменты",
      image: "/img/5dff4155-03c9-495a-b283-e5e195cffe1c.jpg"
    }
  ];

  const categories = [
    { name: "Фарм", icon: "Wheat", count: 45 },
    { name: "Читы", icon: "Zap", count: 32 },
    { name: "Визуализация", icon: "Eye", count: 28 },
    { name: "Инструменты", icon: "Wrench", count: 19 },
    { name: "GUI", icon: "Layout", count: 15 },
    { name: "Боты", icon: "Bot", count: 12 }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-roblox-blue text-white py-4 px-6">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Icon name="Gamepad2" size={32} className="text-white" />
            <h1 className="text-2xl font-bold">ROBLOX SCRIPTS STORE</h1>
          </div>
          <nav className="hidden md:flex items-center space-x-6">
            <a href="#" className="hover:text-roblox-orange transition-colors">Главная</a>
            <a href="#" className="hover:text-roblox-orange transition-colors">Новые</a>
            <a href="#" className="hover:text-roblox-orange transition-colors">Популярные</a>
            <a href="#" className="hover:text-roblox-orange transition-colors">Категории</a>
            <Button variant="outline" className="border-white text-white hover:bg-white hover:text-roblox-blue">
              <Icon name="ShoppingCart" size={16} className="mr-2" />
              Корзина (0)
            </Button>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-roblox-blue to-roblox-orange py-16 px-6">
        <div className="max-w-7xl mx-auto text-center text-white">
          <h2 className="text-5xl font-bold mb-6">Лучшие скрипты для Roblox</h2>
          <p className="text-xl mb-8 opacity-90">Более 150+ проверенных скриптов для всех популярных игр</p>
          
          {/* Search Bar */}
          <div className="max-w-2xl mx-auto relative">
            <Input
              type="text"
              placeholder="Поиск скриптов..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full py-3 px-4 pr-12 text-black text-lg"
            />
            <Button className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-roblox-orange hover:bg-orange-600">
              <Icon name="Search" size={20} />
            </Button>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-12 px-6 bg-roblox-gray">
        <div className="max-w-7xl mx-auto">
          <h3 className="text-3xl font-bold text-center mb-8 text-roblox-dark">Категории скриптов</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {categories.map((category, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow cursor-pointer hover:scale-105 transform transition-transform">
                <CardContent className="p-6 text-center">
                  <Icon name={category.icon} size={32} className="mx-auto mb-3 text-roblox-blue" />
                  <h4 className="font-semibold text-roblox-dark">{category.name}</h4>
                  <p className="text-sm text-gray-600">{category.count} скриптов</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Scripts */}
      <section className="py-12 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-3xl font-bold text-roblox-dark">Популярные скрипты</h3>
            <Button variant="outline" className="border-roblox-blue text-roblox-blue hover:bg-roblox-blue hover:text-white">
              Смотреть все
              <Icon name="ArrowRight" size={16} className="ml-2" />
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredScripts.map((script) => (
              <Card key={script.id} className="hover:shadow-xl transition-shadow group cursor-pointer">
                <div className="aspect-video bg-gradient-to-br from-roblox-blue to-roblox-orange rounded-t-lg overflow-hidden">
                  <img 
                    src={script.image} 
                    alt={script.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                
                <CardHeader className="pb-2">
                  <div className="flex items-start justify-between">
                    <CardTitle className="text-lg text-roblox-dark group-hover:text-roblox-blue transition-colors">
                      {script.title}
                    </CardTitle>
                    <Badge variant="secondary" className="bg-roblox-orange text-white">
                      {script.category}
                    </Badge>
                  </div>
                  <CardDescription className="text-sm">
                    {script.description}
                  </CardDescription>
                </CardHeader>
                
                <CardContent>
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-1">
                      <Icon name="Star" size={16} className="text-yellow-400 fill-current" />
                      <span className="text-sm font-medium">{script.rating}</span>
                    </div>
                    <div className="flex items-center space-x-1 text-gray-600">
                      <Icon name="Download" size={16} />
                      <span className="text-sm">{script.downloads.toLocaleString()}</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold text-roblox-blue">{script.price}</span>
                    <Button className="bg-roblox-orange hover:bg-orange-600 text-white">
                      <Icon name="ShoppingCart" size={16} className="mr-2" />
                      Купить
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 px-6 bg-roblox-dark text-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-roblox-orange mb-2">150+</div>
              <div className="text-lg">Скриптов</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-roblox-orange mb-2">25K+</div>
              <div className="text-lg">Загрузок</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-roblox-orange mb-2">500+</div>
              <div className="text-lg">Довольных клиентов</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-roblox-orange mb-2">24/7</div>
              <div className="text-lg">Поддержка</div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-roblox-blue text-white py-8 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <Icon name="Gamepad2" size={24} />
              <span className="text-xl font-bold">ROBLOX SCRIPTS</span>
            </div>
            <p className="text-sm opacity-80">
              Надежный магазин скриптов для Roblox с проверенным качеством и безопасностью.
            </p>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Категории</h4>
            <ul className="space-y-2 text-sm opacity-80">
              <li><a href="#" className="hover:text-roblox-orange transition-colors">Фарм скрипты</a></li>
              <li><a href="#" className="hover:text-roblox-orange transition-colors">Читы</a></li>
              <li><a href="#" className="hover:text-roblox-orange transition-colors">GUI инструменты</a></li>
              <li><a href="#" className="hover:text-roblox-orange transition-colors">Боты</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Поддержка</h4>
            <ul className="space-y-2 text-sm opacity-80">
              <li><a href="#" className="hover:text-roblox-orange transition-colors">FAQ</a></li>
              <li><a href="#" className="hover:text-roblox-orange transition-colors">Инструкции</a></li>
              <li><a href="#" className="hover:text-roblox-orange transition-colors">Контакты</a></li>
              <li><a href="#" className="hover:text-roblox-orange transition-colors">Discord</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Связь</h4>
            <div className="flex space-x-3">
              <Button variant="outline" size="icon" className="border-white text-white hover:bg-white hover:text-roblox-blue">
                <Icon name="MessageCircle" size={16} />
              </Button>
              <Button variant="outline" size="icon" className="border-white text-white hover:bg-white hover:text-roblox-blue">
                <Icon name="Mail" size={16} />
              </Button>
              <Button variant="outline" size="icon" className="border-white text-white hover:bg-white hover:text-roblox-blue">
                <Icon name="Github" size={16} />
              </Button>
            </div>
          </div>
        </div>
        
        <div className="border-t border-blue-400 mt-8 pt-6 text-center text-sm opacity-80">
          © 2024 Roblox Scripts Store. Все права защищены.
        </div>
      </footer>
    </div>
  );
};

export default Index;