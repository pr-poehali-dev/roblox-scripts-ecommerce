import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import Icon from '@/components/ui/icon';
import { useAuth } from '@/context/AuthContext';
import { useToast } from '@/hooks/use-toast';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const success = await login(email, password);
      if (success) {
        toast({
          title: "Успешный вход!",
          description: "Добро пожаловать в RoScript Store",
        });
        navigate('/');
      } else {
        toast({
          title: "Ошибка входа",
          description: "Неверный email или пароль",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Ошибка",
        description: "Произошла ошибка при входе",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-roblox-gray to-white flex items-center justify-center p-4">
      <Card className="w-full max-w-md bg-white shadow-xl">
        <CardHeader className="text-center">
          <div className="w-16 h-16 bg-gradient-to-br from-roblox-blue to-roblox-orange rounded-full flex items-center justify-center mx-auto mb-4">
            <Icon name="Code" size={32} className="text-white" />
          </div>
          <CardTitle className="text-2xl font-bold text-roblox-dark">Добро пожаловать!</CardTitle>
          <CardDescription>Войдите в свой аккаунт RoScript Store</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="ваш@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="password">Пароль</Label>
              <Input
                id="password"
                type="password"
                placeholder="Введите пароль"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full"
              />
            </div>

            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center space-x-2 cursor-pointer">
                <input type="checkbox" className="rounded" />
                <span className="text-gray-600">Запомнить меня</span>
              </label>
              <Link to="/forgot-password" className="text-roblox-blue hover:underline">
                Забыли пароль?
              </Link>
            </div>

            <Button
              type="submit"
              size="lg"
              className="w-full bg-roblox-blue hover:bg-roblox-blue/90 text-white"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Icon name="Loader2" size={16} className="mr-2 animate-spin" />
                  Вход...
                </>
              ) : (
                <>
                  <Icon name="LogIn" size={16} className="mr-2" />
                  Войти
                </>
              )}
            </Button>
          </form>

          <div className="text-center text-sm text-gray-600">
            <p>Для тестирования используйте:</p>
            <p><strong>Email:</strong> test@example.com</p>
            <p><strong>Пароль:</strong> password</p>
          </div>

          <Separator />

          <div className="text-center">
            <p className="text-sm text-gray-600 mb-4">Или войдите через</p>
            <div className="space-y-2">
              <Button variant="outline" className="w-full">
                <Icon name="Github" size={16} className="mr-2" />
                GitHub
              </Button>
              <Button variant="outline" className="w-full">
                <Icon name="Mail" size={16} className="mr-2" />
                Google
              </Button>
            </div>
          </div>

          <Separator />

          <div className="text-center">
            <p className="text-sm text-gray-600">
              Нет аккаунта?{' '}
              <Link to="/register" className="text-roblox-blue hover:underline font-medium">
                Зарегистрироваться
              </Link>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;