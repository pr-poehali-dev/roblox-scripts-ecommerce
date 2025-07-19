import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import Icon from '@/components/ui/icon';
import { useAuth } from '@/context/AuthContext';
import { scriptsData } from '@/data/scripts';
import { useToast } from '@/hooks/use-toast';

const Profile: React.FC = () => {
  const { user, logout } = useAuth();
  const { toast } = useToast();
  const [isEditing, setIsEditing] = useState(false);
  const [userInfo, setUserInfo] = useState({
    username: user?.username || '',
    email: user?.email || ''
  });

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-roblox-gray to-white flex items-center justify-center">
        <Card className="max-w-md mx-auto text-center">
          <CardHeader>
            <Icon name="Lock" size={48} className="text-gray-300 mx-auto mb-4" />
            <CardTitle>Необходима авторизация</CardTitle>
            <CardDescription>Войдите в систему для доступа к профилю</CardDescription>
          </CardHeader>
          <CardContent>
            <Link to="/login">
              <Button className="bg-roblox-blue hover:bg-roblox-blue/90">
                Войти в аккаунт
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }

  const purchasedScripts = scriptsData.filter(script => user.purchases.includes(script.id));

  const handleSaveProfile = () => {
    toast({
      title: "Профиль обновлен",
      description: "Ваши данные успешно сохранены",
    });
    setIsEditing(false);
  };

  const handleLogout = () => {
    logout();
    toast({
      title: "Выход выполнен",
      description: "До свидания!",
    });
  };

  const downloadScript = (scriptTitle: string) => {
    toast({
      title: "Скачивание началось",
      description: `Скрипт "${scriptTitle}" загружается`,
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-roblox-gray to-white">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-3xl font-bold text-roblox-dark">Личный кабинет</h1>
            <Button variant="outline" onClick={handleLogout}>
              <Icon name="LogOut" size={16} className="mr-2" />
              Выйти
            </Button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-8">
            <Card className="text-center">
              <CardContent className="p-6">
                <div className="w-16 h-16 bg-gradient-to-br from-roblox-blue to-roblox-orange rounded-full flex items-center justify-center mx-auto mb-4">
                  <Icon name="User" size={32} className="text-white" />
                </div>
                <h3 className="font-bold text-roblox-dark mb-1">{user.username}</h3>
                <p className="text-sm text-gray-600">Участник с {user.joinDate}</p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardContent className="p-6">
                <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Icon name="Download" size={32} className="text-white" />
                </div>
                <h3 className="text-2xl font-bold text-roblox-dark mb-1">{user.purchases.length}</h3>
                <p className="text-sm text-gray-600">Купленных скриптов</p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardContent className="p-6">
                <div className="w-16 h-16 bg-gradient-to-br from-yellow-500 to-yellow-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Icon name="Wallet" size={32} className="text-white" />
                </div>
                <h3 className="text-2xl font-bold text-roblox-dark mb-1">{user.balance}₽</h3>
                <p className="text-sm text-gray-600">Баланс</p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardContent className="p-6">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Icon name="Star" size={32} className="text-white" />
                </div>
                <h3 className="text-2xl font-bold text-roblox-dark mb-1">VIP</h3>
                <p className="text-sm text-gray-600">Статус</p>
              </CardContent>
            </Card>
          </div>

          <Tabs defaultValue="purchases" className="space-y-6">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="purchases">Мои скрипты</TabsTrigger>
              <TabsTrigger value="profile">Профиль</TabsTrigger>
              <TabsTrigger value="orders">История</TabsTrigger>
              <TabsTrigger value="settings">Настройки</TabsTrigger>
            </TabsList>

            <TabsContent value="purchases">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Icon name="Download" size={24} className="mr-2 text-roblox-blue" />
                    Купленные скрипты ({purchasedScripts.length})
                  </CardTitle>
                  <CardDescription>
                    Все ваши скрипты доступны для скачивания 24/7
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {purchasedScripts.length === 0 ? (
                    <div className="text-center py-12">
                      <Icon name="ShoppingCart" size={48} className="text-gray-300 mx-auto mb-4" />
                      <h3 className="text-xl font-medium text-gray-500 mb-2">Нет купленных скриптов</h3>
                      <p className="text-gray-400 mb-4">Посетите каталог и выберите подходящие скрипты</p>
                      <Link to="/catalog">
                        <Button className="bg-roblox-blue hover:bg-roblox-blue/90">
                          Перейти в каталог
                        </Button>
                      </Link>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {purchasedScripts.map((script) => (
                        <div key={script.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                          <div className="flex items-center space-x-4">
                            <div className="w-16 h-12 bg-gradient-to-br from-roblox-blue to-roblox-orange rounded-lg overflow-hidden">
                              <img 
                                src={script.image} 
                                alt={script.title}
                                className="w-full h-full object-cover"
                              />
                            </div>
                            <div>
                              <h4 className="font-bold text-roblox-dark">{script.title}</h4>
                              <p className="text-sm text-gray-600">{script.description}</p>
                              <div className="flex items-center mt-1">
                                <Badge variant="secondary" className="text-xs mr-2">
                                  {script.category}
                                </Badge>
                                <span className="text-xs text-gray-500">Обновлено: {script.lastUpdate}</span>
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Button 
                              size="sm" 
                              className="bg-roblox-orange hover:bg-roblox-orange/90"
                              onClick={() => downloadScript(script.title)}
                            >
                              <Icon name="Download" size={16} className="mr-1" />
                              Скачать
                            </Button>
                            <Link to={`/script/${script.id}`}>
                              <Button variant="outline" size="sm">
                                <Icon name="ExternalLink" size={16} />
                              </Button>
                            </Link>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="profile">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Icon name="User" size={24} className="mr-2 text-roblox-blue" />
                    Профиль пользователя
                  </CardTitle>
                  <CardDescription>
                    Управление личной информацией
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-medium">Основная информация</h3>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => setIsEditing(!isEditing)}
                    >
                      <Icon name={isEditing ? "X" : "Edit"} size={16} className="mr-1" />
                      {isEditing ? "Отмена" : "Редактировать"}
                    </Button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="username">Имя пользователя</Label>
                      <Input
                        id="username"
                        value={userInfo.username}
                        onChange={(e) => setUserInfo({...userInfo, username: e.target.value})}
                        disabled={!isEditing}
                      />
                    </div>
                    <div>
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        value={userInfo.email}
                        onChange={(e) => setUserInfo({...userInfo, email: e.target.value})}
                        disabled={!isEditing}
                      />
                    </div>
                  </div>

                  {isEditing && (
                    <div className="flex space-x-2">
                      <Button onClick={handleSaveProfile} className="bg-roblox-blue hover:bg-roblox-blue/90">
                        <Icon name="Save" size={16} className="mr-2" />
                        Сохранить
                      </Button>
                      <Button variant="outline" onClick={() => setIsEditing(false)}>
                        Отмена
                      </Button>
                    </div>
                  )}

                  <Separator />

                  <div>
                    <h3 className="text-lg font-medium mb-4">Статистика аккаунта</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="p-4 bg-gray-50 rounded-lg">
                        <div className="text-2xl font-bold text-roblox-blue">{user.purchases.length}</div>
                        <div className="text-sm text-gray-600">Всего покупок</div>
                      </div>
                      <div className="p-4 bg-gray-50 rounded-lg">
                        <div className="text-2xl font-bold text-green-600">{user.balance}₽</div>
                        <div className="text-sm text-gray-600">Текущий баланс</div>
                      </div>
                      <div className="p-4 bg-gray-50 rounded-lg">
                        <div className="text-2xl font-bold text-purple-600">VIP</div>
                        <div className="text-sm text-gray-600">Статус</div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="orders">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Icon name="History" size={24} className="mr-2 text-roblox-blue" />
                    История заказов
                  </CardTitle>
                  <CardDescription>
                    Все ваши покупки и транзакции
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {purchasedScripts.map((script) => (
                      <div key={script.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                        <div>
                          <h4 className="font-medium">{script.title}</h4>
                          <p className="text-sm text-gray-600">Куплено: {script.lastUpdate}</p>
                        </div>
                        <div className="text-right">
                          <div className="font-bold text-roblox-blue">{script.price}</div>
                          <Badge variant="outline" className="text-xs">Завершен</Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="settings">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Icon name="Settings" size={24} className="mr-2 text-roblox-blue" />
                    Настройки
                  </CardTitle>
                  <CardDescription>
                    Настройки аккаунта и уведомлений
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <h3 className="text-lg font-medium mb-4">Уведомления</h3>
                    <div className="space-y-3">
                      <label className="flex items-center space-x-3 cursor-pointer">
                        <input type="checkbox" defaultChecked className="rounded" />
                        <span>Email уведомления о новых скриптах</span>
                      </label>
                      <label className="flex items-center space-x-3 cursor-pointer">
                        <input type="checkbox" defaultChecked className="rounded" />
                        <span>Уведомления об обновлениях</span>
                      </label>
                      <label className="flex items-center space-x-3 cursor-pointer">
                        <input type="checkbox" className="rounded" />
                        <span>Маркетинговые рассылки</span>
                      </label>
                    </div>
                  </div>

                  <Separator />

                  <div>
                    <h3 className="text-lg font-medium mb-4">Безопасность</h3>
                    <div className="space-y-3">
                      <Button variant="outline" className="w-full justify-start">
                        <Icon name="Key" size={16} className="mr-2" />
                        Изменить пароль
                      </Button>
                      <Button variant="outline" className="w-full justify-start">
                        <Icon name="Shield" size={16} className="mr-2" />
                        Двухфакторная аутентификация
                      </Button>
                      <Button variant="outline" className="w-full justify-start text-red-600 hover:bg-red-50">
                        <Icon name="Trash2" size={16} className="mr-2" />
                        Удалить аккаунт
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default Profile;