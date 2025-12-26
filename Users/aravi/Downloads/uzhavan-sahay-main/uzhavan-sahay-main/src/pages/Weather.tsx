import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Header } from '@/components/layout/Header';
import { PageBackground } from '@/components/layout/PageBackground';
import { useLanguage } from '@/contexts/LanguageContext';
import { useToast } from '@/hooks/use-toast';
import {
  Cloud,
  Sun,
  CloudRain,
  Wind,
  Thermometer,
  Droplets,
  Eye,
  MapPin,
  Calendar,
  AlertTriangle,
  TrendingUp,
  Search,
  Umbrella,
  CloudSnow
} from 'lucide-react';

const WEATHER_API_KEY = 'cad304ffce3c345bf187858bd21ac0e7';
const WEATHER_API_URL = 'https://api.openweathermap.org/data/2.5';

interface WeatherData {
  location: string;
  current: {
    temperature: number;
    condition: string;
    humidity: number;
    windSpeed: number;
    visibility: number;
    uvIndex: number;
    icon: string;
  };
  forecast: Array<{
    date: string;
    high: number;
    low: number;
    condition: string;
    precipitation: number;
    humidity: number;
    icon: string;
  }>;
  alerts: Array<{
    type: 'warning' | 'watch' | 'advisory';
    title: string;
    description: string;
    expires: string;
  }>;
  farmingAdvice: Array<{
    activity: string;
    recommendation: string;
    priority: 'high' | 'medium' | 'low';
  }>;
}

import { useAuth } from '@/contexts/AuthContext';

const Weather = () => {
  const { user } = useAuth();
  const [location, setLocation] = useState('Coimbatore, Tamil Nadu');
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { t, language } = useLanguage();
  const { toast } = useToast();

  // Helper function to translate weather conditions from API
  const translateWeatherCondition = (condition: string): string => {
    const conditionMap: { [key: string]: string } = {
      'Clouds': t('weatherClouds'),
      'Clear': t('weatherClear'),
      'Rain': t('weatherRain'),
      'Drizzle': t('weatherDrizzle'),
      'Thunderstorm': t('weatherThunderstorm'),
      'Snow': t('weatherSnow'),
      'Mist': t('weatherMist'),
      'Haze': t('weatherHaze'),
      'Fog': t('weatherFog'),
      'Dust': t('weatherDust'),
      'Smoke': t('weatherSmoke'),
      'Partly Cloudy': t('partlyCloudy'),
    };
    return conditionMap[condition] || condition;
  };

  const mockWeatherData: WeatherData = {
    location: 'Coimbatore, Tamil Nadu',
    current: {
      temperature: 29,
      condition: 'Partly Cloudy',
      humidity: 78,
      windSpeed: 12,
      visibility: 8,
      uvIndex: 7,
      icon: 'partly-cloudy'
    },
    forecast: [
      {
        date: 'Today',
        high: 32,
        low: 24,
        condition: 'Partly Cloudy',
        precipitation: 20,
        humidity: 75,
        icon: 'partly-cloudy'
      },
      {
        date: 'Tomorrow',
        high: 28,
        low: 22,
        condition: 'Light Rain',
        precipitation: 80,
        humidity: 85,
        icon: 'light-rain'
      },
      {
        date: 'Thu',
        high: 26,
        low: 20,
        condition: 'Heavy Rain',
        precipitation: 95,
        humidity: 90,
        icon: 'heavy-rain'
      },
      {
        date: 'Fri',
        high: 30,
        low: 23,
        condition: 'Cloudy',
        precipitation: 40,
        humidity: 70,
        icon: 'cloudy'
      },
      {
        date: 'Sat',
        high: 33,
        low: 25,
        condition: 'Sunny',
        precipitation: 10,
        humidity: 65,
        icon: 'sunny'
      },
      {
        date: 'Sun',
        high: 34,
        low: 26,
        condition: 'Hot',
        precipitation: 5,
        humidity: 60,
        icon: 'sunny'
      },
      {
        date: 'Mon',
        high: 31,
        low: 24,
        condition: 'Partly Cloudy',
        precipitation: 25,
        humidity: 70,
        icon: 'partly-cloudy'
      }
    ],
    alerts: [
      {
        type: 'warning',
        title: 'Heavy Rain Warning',
        description: 'Heavy rainfall expected on Thursday. Farmers should postpone pesticide applications and prepare drainage systems.',
        expires: '2024-01-03T18:00:00Z'
      },
      {
        type: 'advisory',
        title: 'Heat Wave Advisory',
        description: 'High temperatures expected over the weekend. Increase irrigation frequency and provide shade for livestock.',
        expires: '2024-01-06T20:00:00Z'
      }
    ],
    farmingAdvice: [
      {
        activity: 'Irrigation',
        recommendation: 'Reduce watering before expected rain on Thursday',
        priority: 'high'
      },
      {
        activity: 'Pest Control',
        recommendation: 'Avoid spraying pesticides during rain period',
        priority: 'high'
      },
      {
        activity: 'Harvesting',
        recommendation: 'Complete harvesting before Thursday rain',
        priority: 'medium'
      },
      {
        activity: 'Fertilization',
        recommendation: 'Good time for fertilizer application before rain',
        priority: 'medium'
      },
      {
        activity: 'Planting',
        recommendation: 'Ideal conditions for rice transplanting after rain',
        priority: 'low'
      }
    ]
  };



  useEffect(() => {
    // Attempt to fetch weather using device location first
    const initWeather = async () => {
      try {
        const position = await new Promise<GeolocationPosition>((resolve, reject) => {
          navigator.geolocation.getCurrentPosition(resolve, reject);
        });
        // Fetch using coordinates
        await fetchWeatherData(`lat=${position.coords.latitude}&lon=${position.coords.longitude}`);
      } catch (error) {
        console.log("Geolocation denied or failed, falling back to default location");
        // Fallback to user state or default
        let defaultLoc = 'Coimbatore, Tamil Nadu';
        if (user?.state === 'TN') defaultLoc = 'Chennai, Tamil Nadu';
        if (user?.state === 'KL') defaultLoc = 'Kochi, Kerala';

        setLocation(defaultLoc);
        fetchWeatherData(`q=${encodeURIComponent(defaultLoc)}`);
      }
    };

    initWeather();
  }, [user?.state, language]); // Add dependency on user state and language

  const fetchWeatherData = async (queryParams?: string) => {
    setIsLoading(true);

    try {
      // Use provided queryParams or construct from current location state
      const query = queryParams || `q=${encodeURIComponent(location)}`;

      // Fetch current weather
      const currentResponse = await fetch(
        `${WEATHER_API_URL}/weather?${query}&units=metric&appid=${WEATHER_API_KEY}`
      );

      if (!currentResponse.ok) {
        const errorData = await currentResponse.json();
        throw new Error(errorData.message || 'Failed to fetch weather data');
      }

      const currentData = await currentResponse.json();

      // Update location state to reflect the fetched city name if using coordinates
      if (queryParams && queryParams.includes('lat=')) {
        setLocation(`${currentData.name}, ${currentData.sys.country}`);
      }

      // Fetch forecast
      // We need to use the same query method (coords or city) for consistency
      // If we looked up by city name initially, reuse that. If by coords, reuse those.
      // Easiest is to use the coords returned by the Current Weather API for the forecast to ensure match
      const lat = currentData.coord.lat;
      const lon = currentData.coord.lon;

      const forecastResponse = await fetch(
        `${WEATHER_API_URL}/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${WEATHER_API_KEY}`
      );

      if (!forecastResponse.ok) {
        const errorData = await forecastResponse.json();
        throw new Error(errorData.message || 'Failed to fetch forecast data');
      }

      const forecastData = await forecastResponse.json();

      // Process the data
      const processedData: WeatherData = {
        location: `${currentData.name}, ${currentData.sys.country}`,
        current: {
          temperature: Math.round(currentData.main.temp),
          condition: currentData.weather[0].main,
          humidity: currentData.main.humidity,
          windSpeed: Math.round(currentData.wind.speed * 3.6), // Convert m/s to km/h
          visibility: Math.round(currentData.visibility / 1000), // Convert to km
          uvIndex: 7, // UV index not available in free tier
          icon: currentData.weather[0].main.toLowerCase()
        },
        forecast: [],
        alerts: [],
        farmingAdvice: []
      };

      // Process 7-day forecast (take one reading per day at noon)
      const dailyForecasts = new Map();
      forecastData.list.forEach((item: any) => {
        const date = new Date(item.dt * 1000);
        const dateKey = date.toDateString();

        if (!dailyForecasts.has(dateKey) || date.getHours() === 12) {
          dailyForecasts.set(dateKey, {
            date: date.toLocaleDateString('en-US', { weekday: 'short' }),
            high: Math.round(item.main.temp_max),
            low: Math.round(item.main.temp_min),
            condition: item.weather[0].main,
            precipitation: Math.round((item.pop || 0) * 100),
            humidity: item.main.humidity,
            icon: item.weather[0].main.toLowerCase()
          });
        }
      });

      processedData.forecast = Array.from(dailyForecasts.values()).slice(0, 7);

      // Add farming advice based on detailed weather data
      // Add farming advice based on detailed weather data
      // Add farming advice based on detailed weather data
      processedData.farmingAdvice = generateSmartAdvice(processedData.current, processedData.forecast);

      // Update local state first
      setWeatherData({ ...processedData });

      // Enhance with AI Advice (Multilingual)
      try {
        const aiResponse = await fetch('/api/ai/weather-advice', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            weatherData: {
              current: processedData.current,
              forecast: processedData.forecast
            },
            userCrops: user?.mainCrops,
            farmSize: user?.farmSize,
            language: language // Pass current language
          })
        });

        if (aiResponse.ok) {
          const data = await aiResponse.json();
          if (data.advice && Array.isArray(data.advice)) {
            processedData.farmingAdvice = data.advice;
            setWeatherData({ ...processedData });
          }
        }
      } catch (aiError) {
        console.warn('AI Advice unavailable:', aiError);
      }
    } catch (error: any) {
      console.error('Error fetching weather:', error);

      // If API key is invalid or not activated, use mock data as fallback
      if (error.message && error.message.includes('Invalid API key')) {
        toast({
          title: "Using Demo Data",
          description: "API key not activated yet. Showing sample weather data. Your key may take 10 minutes to 2 hours to activate.",
          variant: "default",
        });
        setWeatherData(mockWeatherData);
      } else {
        toast({
          title: "Weather Data Error",
          description: error.message || "Unable to fetch weather data. Please check the location or try again.",
          variant: "destructive",
        });
      }
    } finally {
      setIsLoading(false);
    }
  };

  const getWeatherIcon = (condition: string) => {
    const cond = condition.toLowerCase();
    if (cond.includes('clear') || cond.includes('sun')) {
      return <Sun className="h-6 w-6 text-yellow-500" />;
    } else if (cond.includes('cloud')) {
      return <Cloud className="h-6 w-6 text-gray-500" />;
    } else if (cond.includes('rain') || cond.includes('drizzle')) {
      return <CloudRain className="h-6 w-6 text-blue-500" />;
    } else if (cond.includes('snow')) {
      return <CloudSnow className="h-6 w-6 text-blue-300" />;
    } else if (cond.includes('thunder')) {
      return <CloudRain className="h-6 w-6 text-purple-500" />;
    } else {
      return <Cloud className="h-6 w-6 text-gray-500" />;
    }
  };

  // Helper to generate smart farming advice
  const generateSmartAdvice = (current: any, forecast: any[]) => {
    const advice: { activity: string; recommendation: string; priority: 'high' | 'medium' | 'low' }[] = [];

    // Translation Helper
    const tr = (key: string, defaultText: string, params: any = {}) => {
      if (language === 'en') return defaultText;

      const dict: any = {
        ta: {
          'irrigation_stop': 'நீர்ப்பாசனத்தை உடனடியாக நிறுத்தவும். மழை எதிர்பார்க்கப்படுகிறது.',
          'irrigation_heat': `அதிக வெப்பம் (${params.temp}°C). ஆவியாதலைக் குறைக்க மாலையில் நீர் பாய்ச்சவும்.`,
          'irrigation_stress': 'வறண்ட வெப்பத்தால் பயிர்கள் வாடக்கூடும். மண் ஈரப்பதத்தை உறுதி செய்யவும்.',
          'irrigation_standard': 'வழக்கமான நீர்ப்பாசன அட்டவணையைப் பின்பற்றலாம்.',
          'disease_alert': 'அதிக ஈரப்பதம் பூஞ்சை நோய்களை பரப்பும். பயிர்களைக் கண்காணிக்கவும்.',
          'wind_strong': `பலத்த காற்று (${params.wind} km/h). வாழை மற்றும் கரும்புக்கு முட்டு கொடுக்கவும்.`,
          'spray_alert': 'பூச்சிக்கொல்லி தெளிக்க வேண்டாம். காற்று வீசுவதால் மருந்து வீணாகும்.',
          'spray_ideal': 'பூச்சிக்கொல்லி தெளிக்க உகந்த வானிலை.',
          'fert_postpone': 'உரம் இடுவதைத் தள்ளிவைக்கவும். மழை வரக்கூடும்.',
          'fert_optimal': 'உரம் இட உகந்த சூழ்நிலை.',
          'harvest_rush': 'கனமழைக்கு முன் முதிர்ந்த பயிர்களை அறுவடை செய்யவும்.',
          'post_harvest': 'தானியங்களை உலர்த்தவும் விதைக்கவும் சிறந்த வானிலை.',
          'activity_irrigation': 'நீர்ப்பாசனம்',
          'activity_water_mgmt': 'நீர் மேலாண்மை',
          'activity_disease': 'நோய் எச்சரிக்கை',
          'activity_crop_support': 'பயிர் பாதுகாப்பு',
          'activity_spraying': 'மருந்து தெளித்தல்',
          'activity_fert': 'உரம் இடுதல்',
          'activity_harvest': 'அறுவடை',
          'activity_post_harvest': 'அறுவடைக்கு பின்'
        },
        ml: {
          'irrigation_stop': 'ജലസേചനം ഉടൻ നിർത്തിവയ്ക്കുക. മഴ പ്രതീക്ഷിക്കുന്നു.',
          'irrigation_heat': `കഠിനമായ ചൂട് (${params.temp}°C). ബാഷ്പീകരണം കുറയ്ക്കാൻ വൈകുന്നേരം നനയ്ക്കുക.`,
          'irrigation_stress': 'വരണ്ട ചൂട് കാരണം വിളകൾ വാടാൻ സാധ്യതയുണ്ട്. മണ്ണിന്റെ ഈർപ്പം ഉറപ്പാക്കുക.',
          'irrigation_standard': 'സാധാരണ ജലസേചന ക്രമം തുടരാം.',
          'disease_alert': 'അന്തരീക്ഷ ഈർപ്പം കൂടുന്നത് ഫംഗസ് രോഗങ്ങൾക്ക് കാരണമാകും. വിളകൾ പരിശോധിക്കുക.',
          'wind_strong': `ശക്തമായ കാറ്റ് (${params.wind} km/h). വാഴയ്ക്കും കരിമ്പിനും താങ്ങ് നൽകുക.`,
          'spray_alert': 'ഇന്ന് കീടനാശിനി തളിക്കരുത്. കാറ്റ് കാരണം മരുന്ന് നഷ്ടപ്പെടും.',
          'spray_ideal': 'കീടനാശിനി തളിക്കാൻ അനുയോജ്യമായ കാലാവസ്ഥ.',
          'fert_postpone': 'വളം പ്രയോഗിക്കുന്നത് മാറ്റിവയ്ക്കുക. മഴ വരാൻ സാധ്യതയുണ്ട്.',
          'fert_optimal': 'വളം ചെയ്യാൻ അനുയോജ്യമായ സാഹചര്യം.',
          'harvest_rush': 'കനത്ത മഴയ്ക്ക് മുമ്പ് വിളവെടുപ്പ് പൂർത്തിയാക്കുക.',
          'post_harvest': 'ധാന്യങ്ങൾ ഉണക്കാനും വിതയ്ക്കാനും അനുയോജ്യമായ കാലാവസ്ഥ.',
          'activity_irrigation': 'ജലസേചനം',
          'activity_water_mgmt': 'ജല പരിപാലനം',
          'activity_disease': 'രോഗ മുന്നറിയിപ്പ്',
          'activity_crop_support': 'വിള സംരക്ഷണം',
          'activity_spraying': 'മരുന്ന് തളിക്കൽ',
          'activity_fert': 'വളപ്രയോഗം',
          'activity_harvest': 'വിളവെടുപ്പ്',
          'activity_post_harvest': 'വിളവെടുപ്പിന് ശേഷം'
        },
        hi: {
          'irrigation_stop': 'सिंचाई तुरंत रोक दें। बारिश का अनुमान है।',
          'irrigation_heat': `तेज गर्मी (${params.temp}°C)। वाष्पीकरण कम करने के लिए शाम को सिंचाई करें।`,
          'irrigation_stress': 'सूखी गर्मी के कारण फसलें मुरझा सकती हैं। मिट्टी में नमी सुनिश्चित करें।',
          'irrigation_standard': 'मानक सिंचाई कार्यक्रम का पालन किया जा सकता है।',
          'disease_alert': 'अधिक नमी और गर्मी से फंगल रोग फैल सकते हैं। फसलों की जांच करें।',
          'wind_strong': `तेज हवाएं (${params.wind} km/h)। गन्ना और केले के पौधों को सहारा दें।`,
          'spray_alert': 'कीटनाशक का छिड़काव न करें। तेज हवा से दवा बर्बाद हो जाएगी।',
          'spray_ideal': 'कीटनाशक छिड़काव के लिए मौसम अनुकूल है।',
          'fert_postpone': 'उर्वरक प्रयोग टाल दें। बारिश होने की संभावना है।',
          'fert_optimal': 'उर्वरक प्रयोग के लिए अनुकूल स्थिति।',
          'harvest_rush': 'भारी बारिश से पहले पकी हुई फसलों की कटाई पूरी करें।',
          'post_harvest': 'अनाज सुखाने और बुवाई के लिए बेहतरीन मौसम।',
          'activity_irrigation': 'सिंचाई',
          'activity_water_mgmt': 'जल प्रबंधन',
          'activity_disease': 'रोग चेतावनी',
          'activity_crop_support': 'फसल सुरक्षा',
          'activity_spraying': 'छिड़काव',
          'activity_fert': 'उर्वरक',
          'activity_harvest': 'कटाई',
          'activity_post_harvest': 'कटाई के बाद'
        }
      };

      const langDict = dict[language];
      if (langDict && langDict[key]) return langDict[key];
      return defaultText;
    };


    const temp = current.temperature;
    const wind = current.windSpeed;
    const humidity = current.humidity;
    const rainChance = forecast.slice(0, 3).some(f => f.precipitation > 50);
    const heavyRain = forecast.some(f => f.precipitation > 80);
    const isSunny = current.condition.toLowerCase().includes('clear') || current.condition.toLowerCase().includes('sun');

    // 1. Irrigation Management
    if (rainChance || heavyRain) {
      advice.push({
        activity: tr('activity_irrigation', 'Irrigation'),
        recommendation: tr('irrigation_stop', 'Suspend irrigation immediately. Rain is forecast, which will provide necessary soil moisture.'),
        priority: 'high'
      });
    } else if (temp > 34) {
      advice.push({
        activity: tr('activity_water_mgmt', 'Water Management'),
        recommendation: tr('irrigation_heat', `High heat (${temp}°C) detected. Apply irrigation in early morning or late evening to prevent evaporation loss.`, { temp }),
        priority: 'high'
      });
    } else if (temp > 30 && humidity < 50) {
      advice.push({
        activity: tr('activity_irrigation', 'Irrigation'),
        recommendation: tr('irrigation_stress', 'Crops may experience water stress due to dry heat. Ensure soil moisture is adequate.'),
        priority: 'medium'
      });
    } else {
      advice.push({
        activity: tr('activity_irrigation', 'Irrigation'),
        recommendation: tr('irrigation_standard', 'Standard irrigation schedule can be followed. No immediate weather risks.'),
        priority: 'low'
      });
    }

    // 2. Crop Protection (Pest & Disease)
    if (humidity > 85 && temp > 25) {
      advice.push({
        activity: tr('activity_disease', 'Disease Alert'),
        recommendation: tr('disease_alert', 'High humidity and warmth favor fungal blast and blight. Inspect crops daily for spots or lesions.'),
        priority: 'high'
      });
    } else if (wind > 20) {
      advice.push({
        activity: tr('activity_crop_support', 'Crop Support'),
        recommendation: tr('wind_strong', `Strong winds (${wind} km/h) detected. Provide propping for Banana and Sugarcane to prevent lodging.`, { wind }),
        priority: 'high'
      });
      advice.push({
        activity: tr('activity_spraying', 'Spraying'),
        recommendation: tr('spray_alert', 'Do NOT spray pesticides today. Wind will cause drift and wastage.'),
        priority: 'high'
      });
    } else if (isSunny && wind < 10 && !rainChance) {
      advice.push({
        activity: tr('activity_spraying', 'Spraying'),
        recommendation: tr('spray_ideal', 'Weather is ideal for foliar sprays and pesticide application if needed.'),
        priority: 'low'
      });
    }

    // 3. Fertilizer Application
    if (rainChance) {
      advice.push({
        activity: tr('activity_fert', 'Fertilization'),
        recommendation: tr('fert_postpone', 'Postpone fertilizer application. Upcoming rain may wash away nutrients (leaching).'),
        priority: 'medium'
      });
    } else if (temp < 30 && !rainChance && humidity > 50) {
      advice.push({
        activity: tr('activity_fert', 'Fertilization'),
        recommendation: tr('fert_optimal', 'Optimal conditions for fertilizer application (Top dressing). Soil moisture is likely sufficient.'),
        priority: 'medium'
      });
    }

    // 4. Harvest
    if (heavyRain) {
      advice.push({
        activity: tr('activity_harvest', 'Harvesting'),
        recommendation: tr('harvest_rush', 'Rush harvest for mature crops to avoid damage from incoming heavy rains.'),
        priority: 'high'
      });
    } else if (isSunny && humidity < 60) {
      advice.push({
        activity: tr('activity_post_harvest', 'Post-Harvest'),
        recommendation: tr('post_harvest', 'Excellent weather for drying grains and sowing operations.'),
        priority: 'low'
      });
    }

    return advice.slice(0, 6);
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-500/20 text-red-200 border-red-500/30';
      case 'medium': return 'bg-yellow-500/20 text-yellow-200 border-yellow-500/30';
      default: return 'bg-emerald-500/20 text-emerald-200 border-emerald-500/30';
    }
  };

  return (
    <PageBackground>
      <Header />

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="section-title-glow flex items-center justify-center gap-2">
              <Cloud className="h-8 w-8 text-emerald-400" />
              {t('weather')}
            </h1>
            <p className="text-white mt-2">
              {t('realTimeWeatherData')}
            </p>
          </div>

          {/* Location Search */}
          <Card className="glass-card mb-8 overflow-hidden relative border-white/10">
            <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/5 to-blue-500/5 pointer-events-none" />
            <CardContent className="p-8 relative">
              <div className="flex flex-col md:flex-row gap-4 items-center">
                <div className="w-full relative group">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none z-10">
                    <MapPin className="h-5 w-5 text-emerald-400 group-hover:text-emerald-300 transition-colors" />
                  </div>
                  <Input
                    placeholder={t('enterLocation')}
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="pl-12 h-14 bg-black/20 border-white/10 text-white placeholder:text-white/50 focus:bg-black/40 focus:border-emerald-400/50 text-lg rounded-xl transition-all shadow-inner backdrop-blur-sm ring-offset-0 focus-visible:ring-1 focus-visible:ring-emerald-400"
                  />
                </div>
                <Button
                  onClick={() => fetchWeatherData()}
                  disabled={isLoading}
                  className="h-14 px-8 bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-400 hover:to-emerald-500 text-white shadow-lg shadow-emerald-500/20 rounded-xl text-lg font-medium min-w-[160px] transition-all hover:scale-[1.02] active:scale-95 border-none"
                >
                  {isLoading ? (
                    <Search className="h-6 w-6 animate-spin" />
                  ) : (
                    <>
                      <Search className="mr-2 h-5 w-5" />
                      {t('getWeather')}
                    </>
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>

          {weatherData && (
            <div className="space-y-8">
              {/* Current Weather */}
              <Card className="glass-card">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-white">
                    <Thermometer className="h-5 w-5 text-emerald-300" />
                    {t('currentWeather')} - {weatherData.location}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {/* Main Weather */}
                    <div className="md:col-span-2 lg:col-span-1">
                      <div className="text-center">
                        <div className="mb-4">
                          {getWeatherIcon(weatherData.current.icon)}
                        </div>
                        <div className="text-4xl font-bold mb-2 text-white">
                          {weatherData.current.temperature}°C
                        </div>
                        <p className="text-emerald-200/80">
                          {translateWeatherCondition(weatherData.current.condition)}
                        </p>
                      </div>
                    </div>

                    {/* Weather Details */}
                    <div className="grid grid-cols-2 lg:grid-cols-1 gap-4 lg:col-span-3">
                      <div className="flex items-center gap-3 p-4 bg-emerald-800/40 rounded-lg border border-emerald-500/20">
                        <Droplets className="h-5 w-5 text-blue-300" />
                        <div>
                          <p className="text-sm text-emerald-200/70">{t('humidity')}</p>
                          <p className="font-semibold text-white">{weatherData.current.humidity}%</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-3 p-4 bg-emerald-800/40 rounded-lg border border-emerald-500/20">
                        <Wind className="h-5 w-5 text-gray-300" />
                        <div>
                          <p className="text-sm text-emerald-200/70">{t('windSpeed')}</p>
                          <p className="font-semibold text-white">{weatherData.current.windSpeed} km/h</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-3 p-4 bg-emerald-800/40 rounded-lg border border-emerald-500/20">
                        <Eye className="h-5 w-5 text-purple-300" />
                        <div>
                          <p className="text-sm text-emerald-200/70">{t('visibility')}</p>
                          <p className="font-semibold text-white">{weatherData.current.visibility} km</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-3 p-4 bg-emerald-800/40 rounded-lg border border-emerald-500/20">
                        <Sun className="h-5 w-5 text-orange-300" />
                        <div>
                          <p className="text-sm text-emerald-200/70">{t('uvIndex')}</p>
                          <p className="font-semibold text-white">{weatherData.current.uvIndex}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Weather Alerts */}
              {weatherData.alerts.length > 0 && (
                <Card className="glass-card">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-white">
                      <AlertTriangle className="h-5 w-5 text-orange-400" />
                      {t('weatherAlerts')}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {weatherData.alerts.map((alert, index) => (
                      <div key={index} className={`p-4 rounded-lg border ${getAlertColor(alert.type)}`}>
                        <div className="flex items-start justify-between mb-2">
                          <h4 className="font-semibold text-white">{alert.title}</h4>
                          <Badge variant="outline" className="text-xs border-emerald-400/50 text-emerald-200">
                            {alert.type.toUpperCase()}
                          </Badge>
                        </div>
                        <p className="text-sm text-emerald-100/80">{alert.description}</p>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              )}

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* 7-Day Forecast */}
                <div className="lg:col-span-2">
                  <Card className="glass-card">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2 text-white">
                        <Calendar className="h-5 w-5 text-emerald-300" />
                        {t('sevenDayForecast')}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {weatherData.forecast.map((day, index) => (
                          <div key={index} className="flex items-center justify-between p-4 bg-emerald-800/40 rounded-lg border border-emerald-500/20">
                            <div className="flex items-center gap-4">
                              <div className="w-20 text-sm font-medium text-white">
                                {day.date}
                              </div>
                              <div className="flex items-center gap-2">
                                {getWeatherIcon(day.icon)}
                                <span className="text-sm text-emerald-200/80">{translateWeatherCondition(day.condition)}</span>
                              </div>
                            </div>

                            <div className="flex items-center gap-6">
                              <div className="flex items-center gap-2 text-sm text-emerald-200/80">
                                <Umbrella className="h-4 w-4 text-blue-300" />
                                {day.precipitation}%
                              </div>
                              <div className="flex items-center gap-2 text-sm text-emerald-200/80">
                                <Droplets className="h-4 w-4 text-blue-300" />
                                {day.humidity}%
                              </div>
                              <div className="text-right">
                                <div className="font-semibold text-white">{day.high}°</div>
                                <div className="text-sm text-emerald-300/70">{day.low}°</div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Farming Advice */}
                <div>
                  <Card className="glass-card">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2 text-white">
                        <TrendingUp className="h-5 w-5 text-emerald-300" />
                        {t('farmingAdvice')}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {weatherData.farmingAdvice.map((advice, index) => (
                        <div key={index} className="p-4 bg-emerald-800/40 rounded-lg border border-emerald-500/20">
                          <div className="flex items-center justify-between mb-2">
                            <h4 className="font-medium text-sm text-white">{advice.activity}</h4>
                            <Badge className={getPriorityColor(advice.priority)}>
                              {advice.priority}
                            </Badge>
                          </div>
                          <p className="text-sm text-emerald-200/80">
                            {advice.recommendation}
                          </p>
                        </div>
                      ))}
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </PageBackground>
  );
};

export default Weather;