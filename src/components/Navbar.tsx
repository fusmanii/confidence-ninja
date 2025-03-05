
import React from 'react';
import { Button } from './ui/button';
import { DollarSign, HelpCircle, Menu } from 'lucide-react';
import { Link, useNavigate, useLocation } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  const scrollToHowItWorks = () => {
    if (location.pathname !== '/') {
      navigate('/?scrollTo=how-it-works');
      return;
    }
    
    const element = document.getElementById('how-it-works');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };
  
  return (
    <nav className="border-b bg-white/50 backdrop-blur-sm fixed w-full top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex items-center">
            <Link to="/" className="text-xl font-semibold text-gray-800">
              DevInterviewPro
            </Link>
          </div>

          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm" onClick={scrollToHowItWorks}>
              <HelpCircle className="w-4 h-4 mr-2" />
              How it Works
            </Button>
            <Button onClick={() => navigate('/pricing')}>
              <DollarSign className="w-4 h-4 mr-2" />
              Upgrade Plan
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
