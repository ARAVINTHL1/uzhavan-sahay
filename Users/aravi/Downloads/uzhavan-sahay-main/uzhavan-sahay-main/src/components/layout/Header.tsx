import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { useLanguage } from '@/contexts/LanguageContext';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Sprout, User, LogOut, Globe, MapPin } from 'lucide-react';

export const Header = () => {
  const { user, logout, isAuthenticated } = useAuth();
  const { language, setLanguage, t } = useLanguage();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-black/80 backdrop-blur-lg border-b border-white/10 shadow-md h-16 flex items-center">
        <div className="container mx-auto px-6 py-2">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div className="flex items-center space-x-2">
              <div className="bg-emerald-500/20 p-2 rounded-lg border border-emerald-500/30">
                <Sprout className="h-5 w-5 text-emerald-400" />
              </div>
              <span className="font-extrabold text-xl text-white tracking-tight drop-shadow-md">
                Kisan <span className="text-emerald-400">Ai</span>
              </span>
            </div>

            {/* Navigation & Actions */}
            <div className="flex items-center space-x-4">
              {/* Location Badge - Moved to Left of Language */}
              {isAuthenticated && (
                <div className="hidden md:flex items-center gap-1.5 text-sm text-white font-medium">
                  <MapPin className="h-4 w-4 text-emerald-400" />
                  {user?.state === 'TN' ? t('tamilNadu') : user?.state === 'KL' ? t('kerala') : ''}
                </div>
              )}

              {/* Language Selector */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="outline"
                    size="sm"
                    className="gap-2 bg-white/5 border-white/10 text-white hover:bg-white/10 hover:text-white hover:border-emerald-500/50"
                  >
                    <Globe className="h-4 w-4 text-emerald-400" />
                    {language.toUpperCase()}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="bg-emerald-950/95 backdrop-blur-xl border-white/10">
                  <DropdownMenuItem
                    onClick={() => setLanguage('en')}
                    className="text-white hover:bg-emerald-500/20 focus:bg-emerald-500/20 focus:text-white"
                  >
                    🇬🇧 English
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => setLanguage('ta')}
                    className="text-white hover:bg-emerald-500/20 focus:bg-emerald-500/20 focus:text-white"
                  >
                    🇮🇳 தமிழ் (Tamil)
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => setLanguage('ml')}
                    className="text-white hover:bg-emerald-500/20 focus:bg-emerald-500/20 focus:text-white"
                  >
                    🇮🇳 മലയാളം (Malayalam)
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => setLanguage('hi')}
                    className="text-white hover:bg-emerald-500/20 focus:bg-emerald-500/20 focus:text-white"
                  >
                    🇮🇳 हिंदी (Hindi)
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              {isAuthenticated ? (
                /* User Menu */
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="relative h-10 w-10 rounded-full hover:bg-white/10">
                      <Avatar>
                        <AvatarFallback className="bg-emerald-500 text-white">
                          {user?.name?.charAt(0) || 'U'}
                        </AvatarFallback>
                      </Avatar>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="bg-emerald-950/95 backdrop-blur-xl border-white/10">
                    <DropdownMenuItem
                      onClick={() => navigate('/dashboard')}
                      className="text-white hover:bg-emerald-500/20 focus:bg-emerald-500/20 focus:text-white"
                    >
                      <User className="mr-2 h-4 w-4" />
                      {t('dashboard')}
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={handleLogout}
                      className="text-white hover:bg-emerald-500/20 focus:bg-emerald-500/20 focus:text-white"
                    >
                      <LogOut className="mr-2 h-4 w-4" />
                      {t('logout')}
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                /* Login/Register Buttons */
                <div className="flex items-center space-x-3">
                  <Button
                    variant="ghost"
                    asChild
                    className="text-white hover:bg-white/10 hover:text-white"
                  >
                    <Link to="/login">{t('login')}</Link>
                  </Button>
                  <Button
                    asChild
                    className="bg-gradient-to-r from-emerald-600 to-lime-600 hover:from-emerald-500 hover:to-lime-500 text-white border-0 shadow-lg shadow-emerald-900/30"
                  >
                    <Link to="/register">{t('register')}</Link>
                  </Button>
                </div>
              )}


            </div>
          </div>
        </div>
      </header>
      {/* Spacer to prevent overlap */}
      <div className="h-16" aria-hidden="true" />
    </>
  );
};