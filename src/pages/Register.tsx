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

const Register: React.FC = () => {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [agreeToTerms, setAgreeToTerms] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { register } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (password !== confirmPassword) {
      toast({
        title: "Ошибка",
        description: "Пароли не совпадают",
        variant: "destructive",
      });
      return;
    }

    if (!agreeToTerms) {
      toast({
        title: "Ошибка",
        description: "Необходимо согласиться с условиями использования",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);

    try {
      const success = await register(email, username, password);
      if (success) {
        toast({
          title: "Регистрация завершена!",
          description: "Добро пожаловать в RoScript Store",
        });
        navigate('/');
      }
    } catch (error) {
      toast({
        title: "Ошибка",
        description: "Произошла ошибка при регистрации",
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
            <Icon name="UserPlus" size={32} className="text-white" />
          </div>
          <CardTitle className="text-2xl font-bold text-roblox-dark">Регистрация</CardTitle>
          <CardDescription>Создайте аккаунт в RoScript Store</CardDescription>
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
              <Label htmlFor="username">Имя пользователя</Label>
              <Input
                id="username"
                type="text"
                placeholder="Введите имя пользователя"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                className="w-full"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="password">Пароль</Label>
              <Input
                id="password"
                type="password"
                placeholder="Придумайте пароль"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Подтвердите пароль</Label>
              <Input
                id="confirmPassword"
                type="password"
                placeholder="Повторите пароль"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                className="w-full"
              />
            </div>

            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="terms"
                checked={agreeToTerms}
                onChange={(e) => setAgreeToTerms(e.target.checked)}
                className="rounded"
              />
              <Label htmlFor="terms" className="text-sm text-gray-600">
                Я согласен с{' '}
                <Link to="/terms" className="text-roblox-blue hover:underline">
                  условиями использования
                </Link>{' '}
                и{' '}
                <Link to="/privacy" className="text-roblox-blue hover:underline">
                  политикой конфиденциальности
                </Link>
              </Label>
            </div>

            <Button
              type="submit"
              size="lg"
              className="w-full bg-roblox-orange hover:bg-roblox-orange/90 text-white"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Icon name="Loader2" size={16} className="mr-2 animate-spin" />
                  Регистрация...
                </>
              ) : (
                <>
                  <Icon name="UserPlus" size={16} className="mr-2" />
                  Зарегистрироваться
                </>
              )}
            </Button>
          </form>

          <Separator />

          <div className="text-center">
            <p className="text-sm text-gray-600 mb-4">Или зарегистрируйтесь через</p>
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
              Уже есть аккаунт?{' '}
              <Link to="/login" className="text-roblox-blue hover:underline font-medium">
                Войти
              </Link>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Register;