import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Header } from '@/components/layout/Header';
import { PageBackground } from '@/components/layout/PageBackground';
import { useAuth } from '@/contexts/AuthContext';
import { useLanguage } from '@/contexts/LanguageContext';
import {
  Mic,
  Camera,
  Sprout,
  Cloud,
  TestTube,
  Building,
  Bug,
  BookOpen,
  User,
  MapPin,
  Crop,
  TrendingUp,
  ArrowRight,
  Thermometer,
  Droplets
} from 'lucide-react';

const WEATHER_API_KEY = 'cad304ffce3c345bf187858bd21ac0e7';
const WEATHER_API_URL = 'https://api.openweathermap.org/data/2.5';

interface WeatherData {
  temp: string;
  humidity: string;
  condition: string;
  rainfall: string;
}

const Dashboard = () => {
  const { user } = useAuth();
  const { t } = useLanguage();
  const [todayWeather, setTodayWeather] = useState<WeatherData>({
    temp: '28°C',
    humidity: '75%',
    condition: t('partlyCloudy'),
    rainfall: `12mm ${t('rainfallExpected')}`
  });
  const [isLoadingWeather, setIsLoadingWeather] = useState(true);

  const quickActions = [
    {
      title: t('voiceAssistant'),
      description: t('askQuestionsVoice'),
      icon: <Mic className="h-6 w-6" />,
      link: '/voice-assistant',
      color: 'text-blue-600'
    },
    {
      title: t('imageAnalysis'),
      description: t('uploadCropImages'),
      icon: <Camera className="h-6 w-6" />,
      link: '/image-analysis',
      color: 'text-green-600'
    },
    {
      title: t('cropAdvisory'),
      description: t('getCropRecommendations'),
      icon: <Sprout className="h-6 w-6" />,
      link: '/crop-advisory',
      color: 'text-emerald-600'
    },
    {
      title: t('weather'),
      description: t('weatherForecastAlerts'),
      icon: <Cloud className="h-6 w-6" />,
      link: '/weather',
      color: 'text-sky-600'
    },
  ];

  const additionalServices = [
    {
      title: t('soilHealth'),
      icon: <TestTube className="h-5 w-5" />,
      link: '/soil-health',
    },
    {
      title: t('governmentSchemes'),
      icon: <Building className="h-5 w-5" />,
      link: '/government-schemes',
    },
    {
      title: t('diseaseManagement'),
      icon: <Bug className="h-5 w-5" />,
      link: '/disease-management',
    },
    {
      title: t('cultivationGuide'),
      icon: <BookOpen className="h-5 w-5" />,
      link: '/cultivation-guide',
    },
  ];

  // Fetch weather data on component mount
  useEffect(() => {
    const fetchWeatherData = async () => {
      setIsLoadingWeather(true);
      try {
        // Initialize query parameters
        let queryParams = 'q=Coimbatore,IN'; // Default

        // Try getting device location
        try {
          const position = await new Promise<GeolocationPosition>((resolve, reject) => {
            navigator.geolocation.getCurrentPosition(resolve, reject);
          });
          queryParams = `lat=${position.coords.latitude}&lon=${position.coords.longitude}`;
        } catch (e) {
          console.log("Geolocation denied or failed, using fallback");
          // Fallback logic based on user state
          if (user?.state === 'TN') {
            queryParams = 'q=Chennai,IN';
          } else if (user?.state === 'KL') {
            queryParams = 'q=Kochi,IN';
          }
        }

        // Fetch current weather
        const currentResponse = await fetch(
          `${WEATHER_API_URL}/weather?${queryParams}&units=metric&appid=${WEATHER_API_KEY}`
        );

        if (!currentResponse.ok) {
          throw new Error('Failed to fetch weather data');
        }

        const currentData = await currentResponse.json();

        // Fetch forecast for rainfall prediction
        const forecastResponse = await fetch(
          `${WEATHER_API_URL}/forecast?${queryParams}&units=metric&appid=${WEATHER_API_KEY}`
        );

        let rainfallText = t('rainfallExpected');
        if (forecastResponse.ok) {
          const forecastData = await forecastResponse.json();
          // Check for rain in the next forecast periods
          const nextPeriods = forecastData.list.slice(0, 3);
          const rainyPeriods = nextPeriods.filter((period: any) =>
            period.weather[0].main.toLowerCase().includes('rain')
          );

          if (rainyPeriods.length > 0) {
            const avgRain = rainyPeriods.reduce((sum: number, period: any) =>
              sum + (period.rain?.['3h'] || 0), 0) / rainyPeriods.length;
            rainfallText = `${Math.round(avgRain)}mm ${t('rainfallExpected')}`;
          } else {
            rainfallText = t('noRainExpected') || 'No rain expected';
          }
        }

        // Get condition in the appropriate language
        const conditionMap: { [key: string]: string } = {
          'Clear': t('clear') || 'Clear',
          'Clouds': t('cloudy') || 'Cloudy',
          'Rain': t('rainy') || 'Rainy',
          'Drizzle': t('drizzle') || 'Drizzle',
          'Thunderstorm': t('thunderstorm') || 'Thunderstorm',
          'Snow': t('snowy') || 'Snowy',
          'Mist': t('misty') || 'Misty',
          'Smoke': t('smoky') || 'Smoky',
          'Haze': t('hazy') || 'Hazy',
          'Fog': t('foggy') || 'Foggy',
        };

        const condition = conditionMap[currentData.weather[0].main] || currentData.weather[0].description;

        setTodayWeather({
          temp: `${Math.round(currentData.main.temp)}°C`,
          humidity: `${currentData.main.humidity}%`,
          condition: condition,
          rainfall: rainfallText
        });
      } catch (error) {
        console.error('Error fetching weather:', error);
        // Keep the default values if fetch fails
      } finally {
        setIsLoadingWeather(false);
      }
    };

    fetchWeatherData();
  }, [user?.state, t]);

  const todayWeather_old = {
    temp: '28°C',
    humidity: '75%',
    condition: t('partlyCloudy'),
    rainfall: `12mm ${t('rainfallExpected')}`
  };

  return (
    <PageBackground>
      <Header />

      <div className="container mx-auto px-4 py-8">
        {/* Welcome Section */}
        <div className="mb-8 animate-slide-up">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div>
              <h1 className="text-4xl font-extrabold mb-2 text-white tracking-tight drop-shadow-md">
                {t('welcomeBack')}, <span className="text-white">{user?.name || t('farmer')}</span>! 👋
              </h1>
              <p className="text-white font-medium drop-shadow-md text-lg">
                {t('agriculturalDashboard')}
              </p>
            </div>
          </div>
        </div>

        {/* User Info Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="glass-card hover:border-emerald-400/50 transition-all duration-300 hover:-translate-y-1">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="icon-container p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20">
                  <User className="h-6 w-6 text-emerald-400" />
                </div>
                <div>
                  <p className="text-sm text-gray-400 mb-1">{t('farmerName')}</p>
                  <p className="font-bold text-lg text-white tracking-wide">{user?.name}</p>
                  <p className="text-xs text-emerald-400/70 hidden sm:block">{user?.email}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="glass-card hover:border-emerald-400/50 transition-all duration-300 hover:-translate-y-1">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="icon-container p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20">
                  <Crop className="h-6 w-6 text-emerald-400" />
                </div>
                <div>
                  <p className="text-sm text-gray-400 mb-1">{t('farmSize')}</p>
                  <p className="font-bold text-lg text-white tracking-wide">{user?.farmSize || t('notSpecified')}</p>
                  {user?.phone && (
                    <p className="text-xs text-emerald-400/70 hidden sm:block">{user.phone}</p>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="glass-card hover:border-emerald-400/50 transition-all duration-300 hover:-translate-y-1">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="icon-container p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20">
                  <Sprout className="h-6 w-6 text-emerald-400" />
                </div>
                <div>
                  <p className="text-sm text-gray-400 mb-1">{t('mainCrops')}</p>
                  <p className="font-bold text-lg text-white tracking-wide truncate max-w-[150px]">{user?.mainCrops?.join(', ') || t('notSpecified')}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="glass-card hover:border-emerald-400/50 transition-all duration-300 hover:-translate-y-1">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="icon-container p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20">
                  <MapPin className="h-6 w-6 text-emerald-400" />
                </div>
                <div>
                  <p className="text-sm text-gray-400 mb-1">{t('location')}</p>
                  <p className="font-bold text-lg text-white tracking-wide">
                    {user?.state === 'TN' ? t('tamilNadu') : user?.state === 'KL' ? t('kerala') : t('notSpecified')}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Actions */}
          <div className="lg:col-span-2 space-y-8">
            <div>
              <h2 className="section-title-glow mb-6 flex items-center gap-2">
                <TrendingUp className="h-6 w-6 text-emerald-400" />
                {t('quickActions')}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {quickActions.map((action, index) => (
                  <Card
                    key={index}
                    className="glass-card hover:border-emerald-400/60 hover:-translate-y-2 transition-all duration-300 cursor-pointer group relative overflow-hidden"
                  >
                    <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 rounded-full blur-2xl -mr-16 -mt-16 group-hover:bg-emerald-500/20 transition-all"></div>
                    <Link to={action.link} className="relative z-10">
                      <CardContent className="p-6">
                        <div className="flex items-start gap-5">
                          <div className={`icon-container p-4 rounded-2xl bg-black/20 border border-white/10 group-hover:scale-110 transition-transform duration-300 ${action.color.replace('text-', 'text-')}`}>
                            {action.icon}
                          </div>
                          <div className="flex-1">
                            <h3 className="font-bold text-xl mb-2 text-white group-hover:text-emerald-300 transition-colors">{action.title}</h3>
                            <p className="text-sm text-gray-300 mb-4 leading-relaxed">
                              {action.description}
                            </p>
                            <div className="flex items-center text-emerald-400 text-sm font-bold tracking-wide group-hover:text-emerald-300 transition-colors">
                              {t('startNow')} <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Link>
                  </Card>
                ))}
              </div>
            </div>

            {/* Additional Services */}
            <div>
              <h3 className="text-xl font-bold mb-6 text-white flex items-center gap-2">
                <BookOpen className="h-5 w-5 text-emerald-400" />
                {t('moreServices')}
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {additionalServices.map((service, index) => (
                  <Card key={index} className="glass-card hover:bg-emerald-500/10 cursor-pointer hover:border-emerald-500/30 transition-all duration-300 hover:-translate-y-1">
                    <Link to={service.link} className="h-full block">
                      <CardContent className="p-5 text-center flex flex-col items-center justify-center h-full gap-3">
                        <div className="p-3 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-300">
                          {service.icon}
                        </div>
                        <p className="text-sm font-semibold text-gray-200">{service.title}</p>
                      </CardContent>
                    </Link>
                  </Card>
                ))}
              </div>
            </div>
          </div>

          {/* Right Sidebar */}
          <div className="space-y-6">
            {/* Today's Weather */}
            <Card className="glass-card border-emerald-500/20 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-900/10 to-transparent pointer-events-none"></div>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-white relative z-10">
                  <Cloud className="h-5 w-5 text-emerald-400" />
                  {t('todayWeather')}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6 relative z-10">
                {isLoadingWeather ? (
                  <div className="flex items-center justify-center py-10">
                    <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-emerald-400"></div>
                  </div>
                ) : (
                  <>
                    <div className="text-center py-4">
                      <div className="text-5xl font-bold text-white mb-2 tracking-tighter">{todayWeather.temp}</div>
                      <div className="text-lg text-emerald-300 font-medium">{todayWeather.condition}</div>
                    </div>

                    <div className="grid grid-cols-2 gap-4 bg-black/20 p-4 rounded-xl border border-white/5">
                      <div className="text-center">
                        <div className="flex items-center justify-center gap-1 text-gray-400 text-xs mb-1 uppercase tracking-wider">
                          <Droplets className="h-3 w-3" /> {t('humidity')}
                        </div>
                        <div className="text-xl font-semibold text-white">{todayWeather.humidity}</div>
                      </div>
                      <div className="text-center border-l border-white/10">
                        <div className="flex items-center justify-center gap-1 text-gray-400 text-xs mb-1 uppercase tracking-wider">
                          <Cloud className="h-3 w-3" /> Rain
                        </div>
                        <div className="text-sm font-semibold text-white mt-1">{todayWeather.rainfall.split(' ')[0]}</div>
                      </div>
                    </div>

                    <Button asChild className="w-full h-12 bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-500 hover:to-emerald-400 text-white shadow-lg shadow-emerald-900/20 border-0 text-md font-medium">
                      <Link to="/weather">{t('viewFullForecast')}</Link>
                    </Button>
                  </>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </PageBackground>
  );
};

export default Dashboard;