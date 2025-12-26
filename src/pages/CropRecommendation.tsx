import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Header } from '@/components/layout/Header';
import { PageBackground } from '@/components/layout/PageBackground';
import { useLanguage } from '@/contexts/LanguageContext';
import { Sparkles, TrendingUp, Droplets, DollarSign, Calendar, MapPin, Leaf } from 'lucide-react';

const CropRecommendation = () => {
    const { t } = useLanguage();
    const [selectedRegion, setSelectedRegion] = useState('tamilnadu');
    const [selectedSeason, setSelectedSeason] = useState('summer');
    const [selectedSoilType, setSelectedSoilType] = useState('clay');
    const [waterAvailability, setWaterAvailability] = useState('high');

    const recommendations = {
        tamilnadu: {
            summer: {
                clay: {
                    high: [
                        {
                            crop: 'paddy',
                            profitPotential: 'high',
                            waterNeed: 'high',
                            duration: '120-150',
                            investment: 'medium',
                            marketDemand: 'high',
                            yieldPerAcre: '25-30',
                            roi: '40-50%'
                        },
                        {
                            crop: 'sugarcane',
                            profitPotential: 'high',
                            waterNeed: 'high',
                            duration: '300-365',
                            investment: 'high',
                            marketDemand: 'high',
                            yieldPerAcre: '30-40',
                            roi: '50-60%'
                        },
                        {
                            crop: 'banana',
                            profitPotential: 'medium',
                            waterNeed: 'high',
                            duration: '300-365',
                            investment: 'medium',
                            marketDemand: 'high',
                            yieldPerAcre: '20-25',
                            roi: '35-45%'
                        }
                    ],
                    medium: [
                        {
                            crop: 'tomato',
                            profitPotential: 'high',
                            waterNeed: 'medium',
                            duration: '90-120',
                            investment: 'medium',
                            marketDemand: 'high',
                            yieldPerAcre: '15-20',
                            roi: '45-55%'
                        },
                        {
                            crop: 'chili',
                            profitPotential: 'medium',
                            waterNeed: 'medium',
                            duration: '150-180',
                            investment: 'low',
                            marketDemand: 'high',
                            yieldPerAcre: '8-12',
                            roi: '40-50%'
                        }
                    ],
                    low: [
                        {
                            crop: 'groundnut',
                            profitPotential: 'medium',
                            waterNeed: 'low',
                            duration: '100-120',
                            investment: 'low',
                            marketDemand: 'medium',
                            yieldPerAcre: '10-15',
                            roi: '30-40%'
                        }
                    ]
                }
            }
        },
        kerala: {
            summer: {
                clay: {
                    high: [
                        {
                            crop: 'paddy',
                            profitPotential: 'high',
                            waterNeed: 'high',
                            duration: '120-150',
                            investment: 'medium',
                            marketDemand: 'high',
                            yieldPerAcre: '22-28',
                            roi: '38-48%'
                        },
                        {
                            crop: 'coconutCrop',
                            profitPotential: 'high',
                            waterNeed: 'medium',
                            duration: '1800-2190',
                            investment: 'high',
                            marketDemand: 'high',
                            yieldPerAcre: '60-80',
                            roi: '55-65%'
                        }
                    ]
                }
            }
        }
    };

    const getCurrentRecommendations = () => {
        try {
            return recommendations[selectedRegion as keyof typeof recommendations]?.[selectedSeason as 'summer']?.[selectedSoilType as 'clay']?.[waterAvailability as keyof typeof recommendations.tamilnadu.summer.clay] || [];
        } catch {
            return [];
        }
    };

    const getProfitColor = (profit: string) => {
        switch (profit) {
            case 'high': return 'bg-emerald-500/20 text-emerald-200 border border-emerald-500/30';
            case 'medium': return 'bg-yellow-500/20 text-yellow-200 border border-yellow-500/30';
            default: return 'bg-blue-500/20 text-blue-200 border border-blue-500/30';
        }
    };

    return (
        <PageBackground>
            <Header />
            <div className="container mx-auto px-4 py-8">
                <div className="max-w-6xl mx-auto">
                    <div className="text-center mb-8">
                        <h1 className="section-title-glow flex items-center justify-center gap-2">
                            <Sparkles className="h-8 w-8 text-emerald-400" />
                            {t('smartCropRecommendation')}
                        </h1>
                        <p className="text-white mt-2">
                            {t('cropRecommendationDesc')}
                        </p>
                    </div>

                    {/* Filters */}
                    <Card className="glass-card mb-8">
                        <CardContent className="p-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-emerald-200 mb-2 flex items-center gap-2">
                                        <MapPin className="h-4 w-4" />
                                        {t('region')}
                                    </label>
                                    <select
                                        value={selectedRegion}
                                        onChange={(e) => setSelectedRegion(e.target.value)}
                                        className="w-full bg-black/20 border border-white/10 text-white rounded-lg px-4 py-2 focus:border-emerald-400/50 focus:outline-none"
                                    >
                                        <option value="tamilnadu">{t('tamilNadu')}</option>
                                        <option value="kerala">{t('kerala')}</option>
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-emerald-200 mb-2 flex items-center gap-2">
                                        <Calendar className="h-4 w-4" />
                                        {t('season')}
                                    </label>
                                    <select
                                        value={selectedSeason}
                                        onChange={(e) => setSelectedSeason(e.target.value)}
                                        className="w-full bg-black/20 border border-white/10 text-white rounded-lg px-4 py-2 focus:border-emerald-400/50 focus:outline-none"
                                    >
                                        <option value="summer">{t('summer')}</option>
                                        <option value="monsoon">{t('monsoon')}</option>
                                        <option value="winter">{t('winter')}</option>
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-emerald-200 mb-2 flex items-center gap-2">
                                        <Leaf className="h-4 w-4" />
                                        {t('soilType')}
                                    </label>
                                    <select
                                        value={selectedSoilType}
                                        onChange={(e) => setSelectedSoilType(e.target.value)}
                                        className="w-full bg-black/20 border border-white/10 text-white rounded-lg px-4 py-2 focus:border-emerald-400/50 focus:outline-none"
                                    >
                                        <option value="clay">{t('claySoil')}</option>
                                        <option value="sandy">{t('sandySoil')}</option>
                                        <option value="loamy">{t('loamySoil')}</option>
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-emerald-200 mb-2 flex items-center gap-2">
                                        <Droplets className="h-4 w-4" />
                                        {t('waterAvailability')}
                                    </label>
                                    <select
                                        value={waterAvailability}
                                        onChange={(e) => setWaterAvailability(e.target.value)}
                                        className="w-full bg-black/20 border border-white/10 text-white rounded-lg px-4 py-2 focus:border-emerald-400/50 focus:outline-none"
                                    >
                                        <option value="high">{t('highWater')}</option>
                                        <option value="medium">{t('mediumWater')}</option>
                                        <option value="low">{t('lowWater')}</option>
                                    </select>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Recommendations */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {getCurrentRecommendations().map((rec, index) => (
                            <Card key={index} className="glass-card-hover border-white/5">
                                <CardHeader>
                                    <div className="flex items-center justify-between">
                                        <CardTitle className="flex items-center gap-3 text-white text-xl">
                                            <div className="p-2 bg-emerald-500/10 rounded-lg">
                                                <Sparkles className="h-6 w-6 text-emerald-400" />
                                            </div>
                                            {t(rec.crop)}
                                        </CardTitle>
                                        <Badge className={`${getProfitColor(rec.profitPotential)} px-3 py-1`}>
                                            <TrendingUp className="h-3 w-3 mr-1" />
                                            {t(rec.profitPotential + 'Profit')}
                                        </Badge>
                                    </div>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="bg-emerald-900/10 p-3 rounded-lg border border-emerald-500/10">
                                            <p className="text-xs text-gray-400 mb-1">{t('duration')}</p>
                                            <p className="text-sm font-semibold text-white">{rec.duration} {t('days')}</p>
                                        </div>
                                        <div className="bg-emerald-900/10 p-3 rounded-lg border border-emerald-500/10">
                                            <p className="text-xs text-gray-400 mb-1">{t('yieldPerAcre')}</p>
                                            <p className="text-sm font-semibold text-white">{rec.yieldPerAcre} {t('quintals')}</p>
                                        </div>
                                        <div className="bg-emerald-900/10 p-3 rounded-lg border border-emerald-500/10">
                                            <p className="text-xs text-gray-400 mb-1">{t('investment')}</p>
                                            <p className="text-sm font-semibold text-white">{t(rec.investment + 'Investment')}</p>
                                        </div>
                                        <div className="bg-emerald-900/10 p-3 rounded-lg border border-emerald-500/10">
                                            <p className="text-xs text-gray-400 mb-1">{t('expectedROI')}</p>
                                            <p className="text-sm font-semibold text-emerald-300">{rec.roi}</p>
                                        </div>
                                    </div>

                                    <div className="flex gap-2">
                                        <Badge variant="outline" className="text-xs border-blue-500/30 text-blue-200">
                                            <Droplets className="h-3 w-3 mr-1" />
                                            {t(rec.waterNeed + 'Water')}
                                        </Badge>
                                        <Badge variant="outline" className="text-xs border-yellow-500/30 text-yellow-200">
                                            <DollarSign className="h-3 w-3 mr-1" />
                                            {t(rec.marketDemand + 'Demand')}
                                        </Badge>
                                    </div>

                                    <Button
                                        className="w-full bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white"
                                    >
                                        {t('viewCultivationGuide')}
                                    </Button>
                                </CardContent>
                            </Card>
                        ))}
                    </div>

                    {getCurrentRecommendations().length === 0 && (
                        <Card className="glass-card">
                            <CardContent className="p-12 text-center">
                                <Sparkles className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                                <h3 className="text-xl font-semibold mb-2 text-white">{t('noRecommendations')}</h3>
                                <p className="text-muted-foreground">
                                    {t('noRecommendationsDesc')}
                                </p>
                            </CardContent>
                        </Card>
                    )}
                </div>
            </div>
        </PageBackground>
    );
};

export default CropRecommendation;
