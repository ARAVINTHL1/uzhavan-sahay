import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Header } from '@/components/layout/Header';
import { PageBackground } from '@/components/layout/PageBackground';
import { useLanguage } from '@/contexts/LanguageContext';
import { useAuth } from '@/contexts/AuthContext';
import {
  Sprout,
  MapPin,
  Calendar,
  Thermometer,
  Droplets,
  TrendingUp,
  CheckCircle,
  AlertCircle,
  Leaf,
  Search,
  Filter
} from 'lucide-react';

interface CropRecommendation {
  id: string;
  name: string;
  suitability: number;
  season: string;
  expectedYield: string;
  investmentRange: string;
  marketDemand: 'high' | 'medium' | 'low';
  riskLevel: 'low' | 'medium' | 'high';
  soilTypes: string[];
  description: string;
  advantages: string[];
  challenges: string[];
}

const CropAdvisory = () => {
  const [location, setLocation] = useState('');
  const [soilType, setSoilType] = useState('');
  const [farmSize, setFarmSize] = useState('');
  const [season, setSeason] = useState('');
  const [waterSource, setWaterSource] = useState('');
  const [recommendations, setRecommendations] = useState<CropRecommendation[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { t } = useLanguage();
  const { user } = useAuth();

  const cropDatabase: CropRecommendation[] = [
    {
      id: '1',
      name: 'Paddy (Rice)',
      suitability: 95,
      season: 'Kharif (June-October)',
      expectedYield: '5-8 tons/hectare',
      investmentRange: '₹40,000 - ₹60,000/hectare',
      marketDemand: 'high',
      riskLevel: 'low',
      soilTypes: ['clayey', 'loamy'],
      description: 'Staple crop ideal for monsoon season with consistent water supply',
      advantages: ['High market demand', 'Government support', 'Water-efficient varieties available'],
      challenges: ['Pest management required', 'Water dependency', 'Storage issues']
    },
    {
      id: '2',
      name: 'Coconut',
      suitability: 88,
      season: 'Perennial',
      expectedYield: '80-120 nuts/palm/year',
      investmentRange: '₹25,000 - ₹40,000/hectare',
      marketDemand: 'high',
      riskLevel: 'low',
      soilTypes: ['sandy', 'laterite', 'alluvial'],
      description: 'Long-term perennial crop with multiple income sources',
      advantages: ['Multiple products (oil, water, fiber)', 'Long productive life', 'Consistent income'],
      challenges: ['Initial waiting period', 'Cyclone damage risk', 'Market price fluctuations']
    },
    {
      id: '3',
      name: 'Groundnut',
      suitability: 82,
      season: 'Rabi (October-March)',
      expectedYield: '2-3 tons/hectare',
      investmentRange: '₹30,000 - ₹45,000/hectare',
      marketDemand: 'medium',
      riskLevel: 'medium',
      soilTypes: ['sandy', 'red', 'black'],
      description: 'Oil seed crop suitable for well-drained soils',
      advantages: ['Good protein source', 'Nitrogen fixation', 'Export potential'],
      challenges: ['Pest attacks', 'Moisture sensitivity', 'Storage requirements']
    },
    {
      id: '4',
      name: 'Banana',
      suitability: 85,
      season: 'Year-round',
      expectedYield: '40-60 tons/hectare',
      investmentRange: '₹50,000 - ₹75,000/hectare',
      marketDemand: 'high',
      riskLevel: 'medium',
      soilTypes: ['alluvial', 'loamy', 'clayey'],
      description: 'High-value fruit crop with good market demand',
      advantages: ['Quick returns', 'High nutritional value', 'Processing opportunities'],
      challenges: ['Disease susceptibility', 'Wind damage risk', 'Perishable nature']
    },
    {
      id: '5',
      name: 'Pepper (Black)',
      suitability: 90,
      season: 'Perennial',
      expectedYield: '2-4 kg/vine',
      investmentRange: '₹60,000 - ₹90,000/hectare',
      marketDemand: 'high',
      riskLevel: 'medium',
      soilTypes: ['laterite', 'forest', 'red'],
      description: 'High-value spice crop ideal for Kerala climate',
      advantages: ['Export demand', 'High market price', 'Medicinal properties'],
      challenges: ['Disease management', 'Support structures needed', 'Long gestation period']
    }
  ];

  const generateRecommendations = () => {
    setIsLoading(true);

    setTimeout(() => {
      // Filter crops based on user inputs
      let filtered = cropDatabase;

      if (soilType) {
        filtered = filtered.filter(crop =>
          crop.soilTypes.includes(soilType.toLowerCase())
        );
      }

      if (season) {
        filtered = filtered.filter(crop =>
          crop.season.toLowerCase().includes(season.toLowerCase()) ||
          crop.season === 'Perennial' ||
          crop.season === 'Year-round'
        );
      }

      // Sort by suitability
      filtered.sort((a, b) => b.suitability - a.suitability);

      setRecommendations(filtered);
      setIsLoading(false);
    }, 1500);
  };

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'high': return 'bg-red-100 text-red-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-green-100 text-green-800';
    }
  };

  const getDemandColor = (demand: string) => {
    switch (demand) {
      case 'high': return 'bg-green-100 text-green-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
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
              <Sprout className="h-8 w-8 text-emerald-400" />
              {t('cropAdvisory')}
            </h1>
            <p className="text-white mt-2">
              {t('getCropAdvisoryRecommendations')}
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Input Form */}
            <div className="lg:col-span-1">
              <Card className="glass-card sticky top-8">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-white">
                    <Filter className="h-5 w-5 text-emerald-400" />
                    {t('farmDetails')}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="location" className="text-white">{t('locationDistrict')}</Label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-3 h-4 w-4 text-emerald-400" />
                      <Input
                        id="location"
                        placeholder={t('locationPlaceholder')}
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                        className="pl-10 h-10 bg-black/20 border-white/10 text-white placeholder:text-white/50 focus:bg-black/40 focus:border-emerald-400/50"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="soilType" className="text-white">{t('soilType')}</Label>
                    <Select value={soilType} onValueChange={setSoilType}>
                      <SelectTrigger className="h-10 bg-black/20 border-white/10 text-white focus:ring-emerald-400/50">
                        <SelectValue placeholder={t('selectSoilType')} />
                      </SelectTrigger>
                      <SelectContent className="bg-emerald-950 border-emerald-800 text-white">
                        <SelectItem value="clayey" className="focus:bg-emerald-800 focus:text-white">{t('clayey')}</SelectItem>
                        <SelectItem value="sandy" className="focus:bg-emerald-800 focus:text-white">{t('sandy')}</SelectItem>
                        <SelectItem value="loamy" className="focus:bg-emerald-800 focus:text-white">{t('loamy')}</SelectItem>
                        <SelectItem value="red" className="focus:bg-emerald-800 focus:text-white">{t('redSoil')}</SelectItem>
                        <SelectItem value="black" className="focus:bg-emerald-800 focus:text-white">{t('blackSoil')}</SelectItem>
                        <SelectItem value="laterite" className="focus:bg-emerald-800 focus:text-white">{t('laterite')}</SelectItem>
                        <SelectItem value="alluvial" className="focus:bg-emerald-800 focus:text-white">{t('alluvial')}</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="farmSize" className="text-white">{t('farmSize')}</Label>
                    <Input
                      id="farmSize"
                      placeholder={t('farmSizePlaceholder')}
                      value={farmSize}
                      onChange={(e) => setFarmSize(e.target.value)}
                      className="h-10 bg-black/20 border-white/10 text-white placeholder:text-white/50 focus:bg-black/40 focus:border-emerald-400/50"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="season" className="text-white">{t('preferredSeason')}</Label>
                    <Select value={season} onValueChange={setSeason}>
                      <SelectTrigger className="h-10 bg-black/20 border-white/10 text-white focus:ring-emerald-400/50">
                        <SelectValue placeholder={t('selectSeason')} />
                      </SelectTrigger>
                      <SelectContent className="bg-emerald-950 border-emerald-800 text-white">
                        <SelectItem value="kharif" className="focus:bg-emerald-800 focus:text-white">{t('kharif')}</SelectItem>
                        <SelectItem value="rabi" className="focus:bg-emerald-800 focus:text-white">{t('rabi')}</SelectItem>
                        <SelectItem value="summer" className="focus:bg-emerald-800 focus:text-white">{t('summer')}</SelectItem>
                        <SelectItem value="perennial" className="focus:bg-emerald-800 focus:text-white">{t('perennialCrops')}</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="waterSource" className="text-white">{t('waterSource')}</Label>
                    <Select value={waterSource} onValueChange={setWaterSource}>
                      <SelectTrigger className="h-10 bg-black/20 border-white/10 text-white focus:ring-emerald-400/50">
                        <SelectValue placeholder={t('selectWaterSource')} />
                      </SelectTrigger>
                      <SelectContent className="bg-emerald-950 border-emerald-800 text-white">
                        <SelectItem value="rain" className="focus:bg-emerald-800 focus:text-white">{t('rainFed')}</SelectItem>
                        <SelectItem value="irrigation" className="focus:bg-emerald-800 focus:text-white">{t('irrigationSource')}</SelectItem>
                        <SelectItem value="borewell" className="focus:bg-emerald-800 focus:text-white">{t('borewell')}</SelectItem>
                        <SelectItem value="canal" className="focus:bg-emerald-800 focus:text-white">{t('canal')}</SelectItem>
                        <SelectItem value="river" className="focus:bg-emerald-800 focus:text-white">{t('river')}</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <Button
                    onClick={generateRecommendations}
                    disabled={isLoading}
                    className="w-full h-12 bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-400 hover:to-emerald-500 text-white shadow-lg shadow-emerald-500/20 text-lg font-medium transition-all hover:scale-[1.02] active:scale-95 border-none mt-6"
                  >
                    {isLoading ? (
                      <>
                        <Search className="mr-2 h-4 w-4 animate-spin" />
                        {t('analyzingCrops')}
                      </>
                    ) : (
                      <>
                        <Search className="mr-2 h-4 w-4" />
                        {t('getRecommendations')}
                      </>
                    )}
                  </Button>

                  {/* Current Conditions */}
                  <div className="mt-6 p-4 bg-emerald-900/30 border border-emerald-500/10 rounded-lg text-white">
                    <h4 className="font-semibold mb-3 flex items-center gap-2">
                      <Thermometer className="h-4 w-4 text-emerald-400" />
                      {t('currentConditions')}
                    </h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-300">{t('temperatureLabel')}</span>
                        <span className="font-medium text-emerald-300">28-35°C</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-300">{t('humidityLabel')}</span>
                        <span className="font-medium text-blue-300">75-85%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-300">{t('rainfallLabel')}</span>
                        <span className="font-medium text-emerald-300">{t('expected')}</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Recommendations */}
            <div className="lg:col-span-2">
              {recommendations.length > 0 ? (
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <h2 className="text-2xl font-semibold">{t('cropRecommendations')}</h2>
                    <Badge variant="outline">{recommendations.length} {t('cropsFound')}</Badge>
                  </div>

                  <div className="space-y-4">
                    {recommendations.map((crop) => (
                      <Card key={crop.id} className="glass-card-content hover:border-emerald-400/50 transition-all duration-300">
                        <CardContent className="p-6">
                          <div className="flex items-start justify-between mb-4">
                            <div>
                              <h3 className="text-xl font-semibold mb-2 flex items-center gap-2">
                                <Leaf className="h-5 w-5 text-primary" />
                                {crop.name}
                              </h3>
                              <p className="text-muted-foreground mb-3">{crop.description}</p>
                            </div>
                            <div className="text-right">
                              <div className="text-2xl font-bold text-primary mb-1">
                                {crop.suitability}%
                              </div>
                              <p className="text-xs text-muted-foreground">{t('suitability')}</p>
                            </div>
                          </div>

                          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                            <div>
                              <p className="text-sm font-medium text-muted-foreground">Season</p>
                              <p className="text-sm flex items-center gap-1">
                                <Calendar className="h-3 w-3" />
                                {crop.season}
                              </p>
                            </div>
                            <div>
                              <p className="text-sm font-medium text-muted-foreground">Expected Yield</p>
                              <p className="text-sm flex items-center gap-1">
                                <TrendingUp className="h-3 w-3" />
                                {crop.expectedYield}
                              </p>
                            </div>
                            <div>
                              <p className="text-sm font-medium text-muted-foreground">Investment</p>
                              <p className="text-sm">{crop.investmentRange}</p>
                            </div>
                            <div>
                              <p className="text-sm font-medium text-muted-foreground">Soil Types</p>
                              <p className="text-sm">{crop.soilTypes.join(', ')}</p>
                            </div>
                          </div>

                          <div className="flex gap-2 mb-4">
                            <Badge className={getDemandColor(crop.marketDemand)}>
                              {crop.marketDemand} demand
                            </Badge>
                            <Badge className={getRiskColor(crop.riskLevel)}>
                              {crop.riskLevel} risk
                            </Badge>
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                              <h4 className="font-semibold mb-2 flex items-center gap-1 text-green-600">
                                <CheckCircle className="h-4 w-4" />
                                {t('advantages')}
                              </h4>
                              <ul className="text-sm space-y-1">
                                {crop.advantages.map((advantage, index) => (
                                  <li key={index} className="flex items-center gap-2">
                                    <div className="w-1 h-1 bg-green-600 rounded-full"></div>
                                    {advantage}
                                  </li>
                                ))}
                              </ul>
                            </div>
                            <div>
                              <h4 className="font-semibold mb-2 flex items-center gap-1 text-orange-600">
                                <AlertCircle className="h-4 w-4" />
                                {t('challenges')}
                              </h4>
                              <ul className="text-sm space-y-1">
                                {crop.challenges.map((challenge, index) => (
                                  <li key={index} className="flex items-center gap-2">
                                    <div className="w-1 h-1 bg-orange-600 rounded-full"></div>
                                    {challenge}
                                  </li>
                                ))}
                              </ul>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              ) : (
                <Card className="glass-card-content">
                  <CardContent className="p-12 text-center">
                    <Sprout className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-xl font-semibold mb-2">{t('readyForRecommendations')}</h3>
                    <p className="text-muted-foreground mb-6">
                      {t('readyForRecommendationsDesc')}
                    </p>
                    <Button onClick={() => document.querySelector('form')?.scrollIntoView({ behavior: 'smooth' })}>
                      {t('startNow')}
                    </Button>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </div>
      </div>
    </PageBackground>
  );
};

export default CropAdvisory;