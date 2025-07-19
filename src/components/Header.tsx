import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';
import { useCart } from '@/context/CartContext';

const Header: React.FC = () => {
  const { getTotalItems } = useCart();

  return (
    <header className="bg-white shadow-md border-b-2 border-roblox-blue sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-gradient-to-br from-roblox-blue to-roblox-orange rounded-lg flex items-center justify-center">
              <Icon name="Code" size={24} className="text-white" />
            </div>
            <span className="text-2xl font-bold text-roblox-dark">RoScript Store</span>
          </Link>

          <nav className="hidden md:flex items-center space-x-6">
            <Link to="/" className="text-roblox-dark hover:text-roblox-blue transition-colors font-medium">
              Главная
            </Link>
            <Link to="/catalog" className="text-roblox-dark hover:text-roblox-blue transition-colors font-medium">
              Каталог
            </Link>
            <Link to="/categories" className="text-roblox-dark hover:text-roblox-blue transition-colors font-medium">
              Категории
            </Link>
            <Link to="/support" className="text-roblox-dark hover:text-roblox-blue transition-colors font-medium">
              Поддержка
            </Link>
          </nav>

          <div className="flex items-center space-x-4">
            <div className="relative">
              <Button variant="outline" size="sm" className="hidden md:flex items-center space-x-2">
                <Icon name="Search" size={16} />
                <span>Поиск</span>
              </Button>
            </div>

            <Link to="/cart">
              <Button variant="outline" size="sm" className="relative">
                <Icon name="ShoppingCart" size={16} />
                {getTotalItems() > 0 && (
                  <span className="absolute -top-2 -right-2 bg-roblox-orange text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {getTotalItems()}
                  </span>
                )}
              </Button>
            </Link>

            <Button className="bg-roblox-blue hover:bg-roblox-blue/90 text-white">
              <Icon name="User" size={16} className="mr-2" />
              Войти
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;