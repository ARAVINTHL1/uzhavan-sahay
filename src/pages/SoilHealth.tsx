import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Header } from '@/components/layout/Header';
import { PageBackground } from '@/components/layout/PageBackground';
import { useLanguage } from '@/contexts/LanguageContext';
import { useToast } from '@/hooks/use-toast';
import {
  TestTube,
  Leaf,
  Droplets,
  TrendingUp,
  AlertCircle,
  CheckCircle,
  Upload,
  Download,
  BarChart,
  Zap,
  Target,
  Activity
} from 'lucide-react';

interface SoilAnalysis {
  ph: number;
  nitrogen: number;
  phosphorus: number;
  potassium: number;
  organicMatter: number;
  moisture: number;
  salinity: number;
  overallHealth: number;
  recommendations: Array<{
    nutrient: string;
    status: 'low' | 'optimal' | 'high';
    action: string;
    products: string[];
  }>;
  suitableCrops: string[];
  improvements: string[];
}

const SoilHealth = () => {
  const [testData, setTestData] = useState({
    location: '',
    sampleDate: '',
    depth: '',
    ph: '',
    nitrogen: '',
    phosphorus: '',
    potassium: '',
    organicMatter: '',
    moisture: '',
    salinity: '',
    cropPlanned: '',
    notes: ''
  });
  const [analysis, setAnalysis] = useState<SoilAnalysis | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const { t } = useLanguage();
  const { toast } = useToast();

  const handleInputChange = (field: string, value: string) => {
    setTestData(prev => ({ ...prev, [field]: value }));
  };

  const generateAnalysis = (): SoilAnalysis => {
    const ph = parseFloat(testData.ph) || Math.random() * 3 + 6;
    const nitrogen = parseFloat(testData.nitrogen) || Math.random() * 300 + 200;
    const phosphorus = parseFloat(testData.phosphorus) || Math.random() * 50 + 20;
    const potassium = parseFloat(testData.potassium) || Math.random() * 200 + 150;
    const organicMatter = parseFloat(testData.organicMatter) || Math.random() * 3 + 2;
    const moisture = parseFloat(testData.moisture) || Math.random() * 30 + 20;
    const salinity = parseFloat(testData.salinity) || Math.random() * 2 + 0.5;

    // Calculate overall health score
    const phScore = ph >= 6.0 && ph <= 7.5 ? 100 : Math.max(0, 100 - Math.abs(6.75 - ph) * 20);
    const nScore = nitrogen >= 200 ? 100 : (nitrogen / 200) * 100;
    const pScore = phosphorus >= 20 ? 100 : (phosphorus / 20) * 100;
    const kScore = potassium >= 150 ? 100 : (potassium / 150) * 100;
    const omScore = organicMatter >= 2.5 ? 100 : (organicMatter / 2.5) * 100;

    const overallHealth = Math.round((phScore + nScore + pScore + kScore + omScore) / 5);

    const getStatus = (value: number, optimal: number, tolerance: number = 0.2) => {
      if (value < optimal * (1 - tolerance)) return 'low';
      if (value > optimal * (1 + tolerance)) return 'high';
      return 'optimal';
    };

    return {
      ph,
      nitrogen,
      phosphorus,
      potassium,
      organicMatter,
      moisture,
      salinity,
      overallHealth,
      recommendations: [
        {
          nutrient: 'Nitrogen',
          status: getStatus(nitrogen, 250),
          action: nitrogen < 200 ? 'Apply urea or organic compost' : nitrogen > 300 ? 'Reduce nitrogen input' : 'Maintain current levels',
          products: nitrogen < 200 ? ['Urea', 'Vermicompost', 'Neem cake'] : ['Balanced NPK fertilizer']
        },
        {
          nutrient: 'Phosphorus',
          status: getStatus(phosphorus, 25),
          action: phosphorus < 20 ? 'Apply phosphate fertilizers' : 'Maintain adequate levels',
          products: phosphorus < 20 ? ['Single Super Phosphate', 'Rock phosphate', 'Bone meal'] : ['Balanced fertilizer']
        },
        {
          nutrient: 'Potassium',
          status: getStatus(potassium, 180),
          action: potassium < 150 ? 'Apply potash or wood ash' : 'Continue current practices',
          products: potassium < 150 ? ['Muriate of Potash', 'Wood ash', 'Banana peel compost'] : ['NPK complex']
        },
        {
          nutrient: 'pH Level',
          status: ph >= 6.0 && ph <= 7.5 ? 'optimal' : ph < 6.0 ? 'low' : 'high',
          action: ph < 6.0 ? 'Apply lime to increase pH' : ph > 7.5 ? 'Add organic matter to lower pH' : 'pH is optimal',
          products: ph < 6.0 ? ['Agricultural lime', 'Dolomite'] : ph > 7.5 ? ['Sulfur', 'Organic compost'] : []
        }
      ],
      suitableCrops: overallHealth > 70 ?
        ['Rice', 'Coconut', 'Banana', 'Pepper', 'Cardamom'] :
        ['Groundnut', 'Millets', 'Pulses', 'Vegetables'],
      improvements: [
        'Regular soil testing every 6 months',
        'Add organic matter through composting',
        'Practice crop rotation to maintain soil health',
        'Use cover crops during fallow periods',
        'Implement drip irrigation for water efficiency'
      ]
    };
  };

  const analyzeData = async () => {
    if (!testData.location) {
      toast({
        title: t('missingInformation'),
        description: t('enterSampleLocation'),
        variant: "destructive",
      });
      return;
    }

    setIsAnalyzing(true);

    setTimeout(() => {
      const result = generateAnalysis();
      setAnalysis(result);
      setIsAnalyzing(false);
      toast({
        title: t('soilAnalysisComplete'),
        description: t('soilAnalysisSuccess'),
      });
    }, 2000);
  };

  const getHealthColor = (score: number) => {
    if (score >= 80) return 'text-green-600 bg-green-50';
    if (score >= 60) return 'text-yellow-600 bg-yellow-50';
    return 'text-red-600 bg-red-50';
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'optimal': return 'bg-green-100 text-green-800';
      case 'low': return 'bg-red-100 text-red-800';
      case 'high': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getNutrientScore = (value: number, nutrient: string) => {
    switch (nutrient) {
      case 'ph':
        return value >= 6.0 && value <= 7.5 ? 100 : Math.max(0, 100 - Math.abs(6.75 - value) * 20);
      case 'nitrogen':
        return Math.min(100, (value / 250) * 100);
      case 'phosphorus':
        return Math.min(100, (value / 30) * 100);
      case 'potassium':
        return Math.min(100, (value / 200) * 100);
      case 'organicMatter':
        return Math.min(100, (value / 3) * 100);
      default:
        return 0;
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
              <TestTube className="h-8 w-8 text-emerald-400" />
              {t('soilHealth')}
            </h1>
            <p className="text-white mt-2">
              {t('soilHealthDesc')}
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Input Form */}
            <div>
              <Card className="glass-card sticky top-8">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-white">
                    <Upload className="h-5 w-5 text-emerald-400" />
                    {t('soilTestData')}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="location" className="text-white">{t('sampleLocation')} *</Label>
                    <Input
                      id="location"
                      placeholder={t('sampleLocationPlaceholder')}
                      value={testData.location}
                      onChange={(e) => handleInputChange('location', e.target.value)}
                      className="bg-black/20 border-white/10 text-white placeholder:text-white/50 focus:bg-black/40 focus:border-emerald-400/50 input-dark"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="sampleDate" className="text-white">{t('sampleDate')}</Label>
                      <Input
                        id="sampleDate"
                        type="date"
                        value={testData.sampleDate}
                        onChange={(e) => handleInputChange('sampleDate', e.target.value)}
                        className="bg-black/20 border-white/10 text-white placeholder:text-white/50 focus:bg-black/40 focus:border-emerald-400/50"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="depth" className="text-white">{t('depthCm')}</Label>
                      <Input
                        id="depth"
                        placeholder="15"
                        value={testData.depth}
                        onChange={(e) => handleInputChange('depth', e.target.value)}
                        className="bg-black/20 border-white/10 text-white placeholder:text-white/50 focus:bg-black/40 focus:border-emerald-400/50"
                      />
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h4 className="font-semibold text-sm text-emerald-300">{t('nutrientLevelsOptional')}</h4>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="ph" className="text-white">{t('phLevel')}</Label>
                        <Input
                          id="ph"
                          placeholder="6.8"
                          type="number"
                          step="0.1"
                          value={testData.ph}
                          onChange={(e) => handleInputChange('ph', e.target.value)}
                          className="bg-black/20 border-white/10 text-white placeholder:text-white/50 focus:bg-black/40 focus:border-emerald-400/50"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="organicMatter" className="text-white">{t('organicMatterPercent')}</Label>
                        <Input
                          id="organicMatter"
                          placeholder="2.5"
                          type="number"
                          step="0.1"
                          value={testData.organicMatter}
                          onChange={(e) => handleInputChange('organicMatter', e.target.value)}
                          className="bg-black/20 border-white/10 text-white placeholder:text-white/50 focus:bg-black/40 focus:border-emerald-400/50"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="nitrogen" className="text-white">{t('nitrogenKgHa')}</Label>
                      <Input
                        id="nitrogen"
                        placeholder="250"
                        type="number"
                        value={testData.nitrogen}
                        onChange={(e) => handleInputChange('nitrogen', e.target.value)}
                        className="bg-black/20 border-white/10 text-white placeholder:text-white/50 focus:bg-black/40 focus:border-emerald-400/50"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="phosphorus" className="text-white">{t('phosphorusKgHa')}</Label>
                        <Input
                          id="phosphorus"
                          placeholder="25"
                          type="number"
                          value={testData.phosphorus}
                          onChange={(e) => handleInputChange('phosphorus', e.target.value)}
                          className="bg-black/20 border-white/10 text-white placeholder:text-white/50 focus:bg-black/40 focus:border-emerald-400/50"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="potassium" className="text-white">{t('potassiumKgHa')}</Label>
                        <Input
                          id="potassium"
                          placeholder="180"
                          type="number"
                          value={testData.potassium}
                          onChange={(e) => handleInputChange('potassium', e.target.value)}
                          className="bg-black/20 border-white/10 text-white placeholder:text-white/50 focus:bg-black/40 focus:border-emerald-400/50"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="cropPlanned" className="text-white">{t('cropPlanned')}</Label>
                    <Select value={testData.cropPlanned} onValueChange={(value) => handleInputChange('cropPlanned', value)}>
                      <SelectTrigger className="bg-black/20 border-white/10 text-white focus:ring-emerald-400/50">
                        <SelectValue placeholder={t('selectCropPlaceholder')} />
                      </SelectTrigger>
                      <SelectContent className="bg-emerald-950 border-emerald-800 text-white">
                        <SelectItem value="rice" className="focus:bg-emerald-800 focus:text-white">{t('ricePaddy')}</SelectItem>
                        <SelectItem value="coconut" className="focus:bg-emerald-800 focus:text-white">{t('coconut')}</SelectItem>
                        <SelectItem value="groundnut" className="focus:bg-emerald-800 focus:text-white">{t('groundnut')}</SelectItem>
                        <SelectItem value="banana" className="focus:bg-emerald-800 focus:text-white">{t('banana')}</SelectItem>
                        <SelectItem value="pepper" className="focus:bg-emerald-800 focus:text-white">{t('pepper')}</SelectItem>
                        <SelectItem value="vegetables" className="focus:bg-emerald-800 focus:text-white">{t('vegetables')}</SelectItem>
                        <SelectItem value="millets" className="focus:bg-emerald-800 focus:text-white">{t('millets')}</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="notes" className="text-white">{t('additionalNotes')}</Label>
                    <Textarea
                      id="notes"
                      placeholder={t('additionalNotesPlaceholder')}
                      value={testData.notes}
                      onChange={(e) => handleInputChange('notes', e.target.value)}
                      rows={3}
                      className="bg-black/20 border-white/10 text-white placeholder:text-white/50 focus:bg-black/40 focus:border-emerald-400/50"
                    />
                  </div>

                  <Button
                    onClick={analyzeData}
                    disabled={isAnalyzing}
                    className="w-full h-12 bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-400 hover:to-emerald-500 text-white shadow-lg shadow-emerald-500/20 text-lg font-medium transition-all hover:scale-[1.02] active:scale-95 border-none mt-4"
                  >
                    {isAnalyzing ? (
                      <>
                        <Activity className="mr-2 h-5 w-5 animate-spin" />
                        {t('analyzingSoil')}
                      </>
                    ) : (
                      <>
                        <Zap className="mr-2 h-5 w-5" />
                        {t('analyzeSoil')}
                      </>
                    )}
                  </Button>
                </CardContent>
              </Card>
            </div>

            {/* Analysis Results */}
            <div className="lg:col-span-2">
              {analysis ? (
                <div className="space-y-6">
                  {/* Overall Health Score */}
                  <Card className="glass-card-content">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2 text-white">
                        <BarChart className="h-5 w-5 text-emerald-400" />
                        {t('overallSoilHealthScore')}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-center mb-6">
                        <div className={`text-4xl font-bold mb-2 p-4 rounded-lg inline-block ${getHealthColor(analysis.overallHealth)}`}>
                          {analysis.overallHealth}%
                        </div>
                        <p className="text-gray-300 mt-2">
                          {analysis.overallHealth >= 80 ? t('excellent') :
                            analysis.overallHealth >= 60 ? t('good') : t('needsImprovement')}
                        </p>
                      </div>

                      {/* Nutrient Breakdown */}
                      <div className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                          <div className="bg-emerald-900/10 p-4 rounded-lg border border-emerald-500/10">
                            <div className="flex justify-between mb-2">
                              <span className="text-sm text-white">{t('phLevel')}</span>
                              <span className="text-sm font-medium text-emerald-300">{analysis.ph.toFixed(1)}</span>
                            </div>
                            <Progress value={getNutrientScore(analysis.ph, 'ph')} className="h-2 bg-emerald-950" />
                          </div>
                          <div className="bg-emerald-900/10 p-4 rounded-lg border border-emerald-500/10">
                            <div className="flex justify-between mb-2">
                              <span className="text-sm text-white">{t('organicMatter')}</span>
                              <span className="text-sm font-medium text-emerald-300">{analysis.organicMatter.toFixed(1)}%</span>
                            </div>
                            <Progress value={getNutrientScore(analysis.organicMatter, 'organicMatter')} className="h-2 bg-emerald-950" />
                          </div>
                        </div>

                        <div className="grid grid-cols-3 gap-4">
                          <div className="bg-emerald-900/10 p-4 rounded-lg border border-emerald-500/10">
                            <div className="flex justify-between mb-2">
                              <span className="text-sm text-white">{t('nitrogen')}</span>
                              <span className="text-sm font-medium text-emerald-300">{analysis.nitrogen.toFixed(0)}</span>
                            </div>
                            <Progress value={getNutrientScore(analysis.nitrogen, 'nitrogen')} className="h-2 bg-emerald-950" />
                          </div>
                          <div className="bg-emerald-900/10 p-4 rounded-lg border border-emerald-500/10">
                            <div className="flex justify-between mb-2">
                              <span className="text-sm text-white">{t('phosphorus')}</span>
                              <span className="text-sm font-medium text-emerald-300">{analysis.phosphorus.toFixed(0)}</span>
                            </div>
                            <Progress value={getNutrientScore(analysis.phosphorus, 'phosphorus')} className="h-2 bg-emerald-950" />
                          </div>
                          <div className="bg-emerald-900/10 p-4 rounded-lg border border-emerald-500/10">
                            <div className="flex justify-between mb-2">
                              <span className="text-sm text-white">{t('potassium')}</span>
                              <span className="text-sm font-medium text-emerald-300">{analysis.potassium.toFixed(0)}</span>
                            </div>
                            <Progress value={getNutrientScore(analysis.potassium, 'potassium')} className="h-2 bg-emerald-950" />
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Recommendations */}
                  <Card className="glass-card-content">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2 text-white">
                        <Target className="h-5 w-5 text-emerald-400" />
                        {t('nutrientRecommendations')}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {analysis.recommendations.map((rec, index) => (
                        <div key={index} className="p-4 bg-emerald-900/30 rounded-lg border border-emerald-500/20">
                          <div className="flex items-center justify-between mb-2">
                            <h4 className="font-semibold text-white">{rec.nutrient}</h4>
                            <Badge className={`${getStatusColor(rec.status)} border-0`}>
                              {rec.status.toUpperCase()}
                            </Badge>
                          </div>
                          <p className="text-sm text-gray-300 mb-3">{rec.action}</p>
                          {rec.products.length > 0 && (
                            <div>
                              <p className="text-xs font-medium mb-2 text-emerald-300">{t('recommendedProducts')}</p>
                              <div className="flex flex-wrap gap-2">
                                {rec.products.map((product, idx) => (
                                  <Badge key={idx} variant="outline" className="text-xs border-emerald-500/30 text-emerald-200">
                                    {product}
                                  </Badge>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      ))}
                    </CardContent>
                  </Card>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Suitable Crops */}
                    <Card className="glass-card-content">
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2 text-white">
                          <Leaf className="h-5 w-5 text-emerald-400" />
                          {t('suitableCrops')}
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-2">
                          {analysis.suitableCrops.map((crop, index) => (
                            <div key={index} className="flex items-center gap-2 p-3 bg-emerald-900/20 rounded border border-emerald-500/10">
                              <CheckCircle className="h-4 w-4 text-emerald-500" />
                              <span className="text-sm text-gray-200">{crop}</span>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>

                    {/* Improvement Tips */}
                    <Card className="glass-card-content">
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2 text-white">
                          <TrendingUp className="h-5 w-5 text-emerald-400" />
                          {t('improvementTips')}
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-2">
                          {analysis.improvements.map((tip, index) => (
                            <div key={index} className="flex items-start gap-2 p-2">
                              <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full mt-2"></div>
                              <span className="text-sm text-gray-300">{tip}</span>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-4">
                    <Button className="flex-1 shadow-lg bg-emerald-600 hover:bg-emerald-700 text-white border-0 h-10">
                      <Download className="mr-2 h-4 w-4" />
                      {t('downloadReport')}
                    </Button>
                    <Button variant="outline" className="flex-1 border-emerald-500/30 text-emerald-100 hover:bg-emerald-500/20 hover:text-white h-10 bg-transparent">
                      {t('shareResults')}
                    </Button>
                  </div>
                </div>
              ) : (
                <Card className="glass-card-content h-fit">
                  <CardContent className="p-12 text-center">
                    <div className="bg-emerald-900/20 p-4 rounded-full inline-block mb-4">
                      <TestTube className="h-12 w-12 text-emerald-400" />
                    </div>
                    <h3 className="text-xl font-semibold mb-2 text-white">{t('readyToAnalyzeSoil')}</h3>
                    <p className="text-gray-300 mb-6">
                      {t('readyToAnalyzeSoilDesc')}
                    </p>
                    <div className="text-sm text-gray-400 p-4 bg-emerald-950/30 rounded-lg border border-emerald-500/10 inline-block">
                      <p className="mb-2 text-emerald-200">💡 <strong>{t('dontHaveTestData')}</strong></p>
                      <p>{t('generalRecommendationsNote')}</p>
                    </div>
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

export default SoilHealth;