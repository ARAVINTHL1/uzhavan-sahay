import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { useLanguage } from '@/contexts/LanguageContext';
// Image source: Unsplash (Indian Farmer in lush green paddy field)
const bgImage = 'https://images.unsplash.com/photo-1586771107445-d3ca888129ff?q=80&w=2940&auto=format&fit=crop';
import {
  Mic,
  Camera,
  Brain,
  Cloud,
  Leaf,
  TrendingUp,
  Users,
  Award,
  ArrowRight,
  CheckCircle
} from 'lucide-react';

const Home = () => {
  const { t } = useLanguage();

  const features = [
    {
      icon: <Mic className="h-8 w-8" />,
      title: t('voiceSupport'),
      description: t('voiceSupportDesc'),
    },
    {
      icon: <Camera className="h-8 w-8" />,
      title: t('diseaseDetection'),
      description: t('diseaseDetectionDesc'),
    },
    {
      icon: <Brain className="h-8 w-8" />,
      title: t('expertAdvice'),
      description: t('expertAdviceDesc'),
    },
    {
      icon: <Cloud className="h-8 w-8" />,
      title: t('weatherInsights'),
      description: t('weatherInsightsDesc'),
    },
    {
      icon: <Leaf className="h-8 w-8" />,
      title: t('soilHealthFeature'),
      description: t('soilHealthFeatureDesc'),
    },
    {
      icon: <TrendingUp className="h-8 w-8" />,
      title: t('governmentSchemesFeature'),
      description: t('governmentSchemesFeatureDesc'),
    },
  ];

  const stats = [
    { number: '10,000+', label: t('farmersHelped'), icon: <Users className="h-5 w-5" /> },
    { number: '95%', label: t('accuracyRate'), icon: <Award className="h-5 w-5" /> },
    { number: '24/7', label: t('supportAvailable'), icon: <CheckCircle className="h-5 w-5" /> },
  ];

  return (
    <div className="min-h-screen relative bg-emerald-900">
      {/* Full Page Background */}
      <div
        className="fixed inset-0 z-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url('${bgImage}')`,
        }}
      >
        <div className="absolute inset-0 bg-black/40"></div>
      </div>

      <div className="relative z-10">
        <Header />

        {/* Hero Section */}
        <section className="relative overflow-hidden min-h-[600px] flex items-center justify-center pt-16">
          <div className="container mx-auto px-4 py-20 relative text-white">
            <div className="max-w-4xl mx-auto text-center animate-fade-in">
              <h1 className="text-5xl md:text-7xl font-extrabold mb-6 leading-tight drop-shadow-2xl tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-emerald-200 via-white to-emerald-200">
                {t('welcomeTitle')}
              </h1>
              <p className="text-xl md:text-2xl text-gray-200 mb-8 max-w-2xl mx-auto drop-shadow-lg font-light leading-relaxed">
                {t('welcomeSubtitle')}
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
                <Button size="lg" asChild className="shadow-button text-lg px-8 py-6 bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-500 hover:to-emerald-400 text-white border-none transition-all hover:scale-105 active:scale-95">
                  <Link to="/register">
                    {t('getStarted')} <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
                <Button variant="outline" size="lg" asChild className="text-lg px-8 py-6 border-emerald-500/50 text-emerald-100 hover:bg-emerald-500/10 hover:text-white hover:border-emerald-400 bg-black/20 backdrop-blur-sm transition-all">
                  <Link to="/login">{t('login')}</Link>
                </Button>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12 px-4">
                {stats.map((stat, index) => (
                  <Card key={index} className="glass-card hover:border-emerald-500/40 animate-slide-up bg-black/40 backdrop-blur-md border-emerald-500/20" style={{ animationDelay: `${index * 0.15}s` }}>
                    <CardContent className="p-6 text-center text-white">
                      <div className="flex items-center justify-center mb-4">
                        <div className="p-4 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 shadow-lg shadow-emerald-500/10">
                          {stat.icon}
                        </div>
                      </div>
                      <div className="text-4xl font-bold mb-2 text-white tracking-tight">{stat.number}</div>
                      <div className="text-sm text-emerald-100/80 font-medium uppercase tracking-wider">{stat.label}</div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20 bg-transparent">
          <div className="container mx-auto px-4">
            <div className="max-w-2xl mx-auto text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white drop-shadow-md">
                {t('comprehensiveAgriSolutions')}
              </h2>
              <p className="text-lg text-white drop-shadow-md">
                {t('everythingInOnePlace')}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {features.map((feature, index) => (
                <Card
                  key={index}
                  className="glass-card-hover animate-slide-up"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <CardContent className="p-6">
                    <div className="mb-4 inline-block p-3 rounded-xl bg-emerald-500/20 border border-emerald-500/30 backdrop-blur-sm">
                      {feature.icon}
                    </div>
                    <h3 className="text-xl font-bold mb-2 text-white">{feature.title}</h3>
                    <p className="text-gray-100 leading-relaxed">{feature.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Footer */}
        <Footer />
      </div>
    </div>
  );
};

export default Home;