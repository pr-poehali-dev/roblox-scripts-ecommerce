import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import Icon from '@/components/ui/icon';
import { scriptsData, categories } from '@/data/scripts';
import { useCart } from '@/context/CartContext';

const Catalog: React.FC = () => {
  const { addToCart } = useCart();
  const [selectedCategory, setSelectedCategory] = useState('Все');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredScripts = scriptsData.filter(script => {
    const matchesCategory = selectedCategory === 'Все' || script.category === selectedCategory;
    const matchesSearch = script.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         script.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         script.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-roblox-gray to-white">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          <aside className="lg:w-64 flex-shrink-0">
            <div className="bg-white rounded-lg shadow-md p-6 sticky top-24">
              <h3 className="text-lg font-bold text-roblox-dark mb-4">Фильтры</h3>
              
              <div className="mb-6">
                <label className="text-sm font-medium text-gray-700 mb-2 block">Поиск</label>
                <div className="relative">
                  <Icon name="Search" size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <Input
                    placeholder="Найти скрипт..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700 mb-3 block">Категории</label>
                <div className="space-y-2">
                  {categories.map((category) => (
                    <button
                      key={category}
                      onClick={() => setSelectedCategory(category)}
                      className={`w-full text-left px-3 py-2 rounded-md transition-colors ${
                        selectedCategory === category
                          ? 'bg-roblox-blue text-white'
                          : 'text-gray-700 hover:bg-gray-100'
                      }`}
                    >
                      {category}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </aside>

          <main className="flex-1">
            <div className="mb-6">
              <h1 className="text-3xl font-bold text-roblox-dark mb-2">Каталог скриптов</h1>
              <p className="text-gray-600">
                Найдено {filteredScripts.length} скрипт(ов) 
                {selectedCategory !== 'Все' && ` в категории "${selectedCategory}"`}
                {searchQuery && ` по запросу "${searchQuery}"`}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredScripts.map((script) => (
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
                    <div className="flex flex-wrap gap-1 mb-4">
                      {script.tags.slice(0, 3).map((tag) => (
                        <Badge key={tag} variant="outline" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
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

            {filteredScripts.length === 0 && (
              <div className="text-center py-12">
                <Icon name="Search" size={48} className="text-gray-300 mx-auto mb-4" />
                <h3 className="text-xl font-medium text-gray-500 mb-2">Скрипты не найдены</h3>
                <p className="text-gray-400 mb-4">Попробуйте изменить параметры поиска или фильтры</p>
                <Button 
                  variant="outline" 
                  onClick={() => {
                    setSearchQuery('');
                    setSelectedCategory('Все');
                  }}
                >
                  Сбросить фильтры
                </Button>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
};

export default Catalog;