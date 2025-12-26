import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Header } from '@/components/layout/Header';
import { PageBackground } from '@/components/layout/PageBackground';
import { useLanguage } from '@/contexts/LanguageContext';
import { BookOpen, Sprout, Calendar, Droplets, Scissors } from 'lucide-react';

const CultivationGuide = () => {
  const { t } = useLanguage();
  const [selectedCrop, setSelectedCrop] = useState('paddy');

  const guides = {
    paddy: {
      nameKey: 'paddyRice',
      stages: [
        { titleKey: 'landPreparation', durationKey: 'landPreparationDuration', descKey: 'landPreparationDesc' },
        { titleKey: 'sowingTransplanting', durationKey: 'sowingTransplantingDuration', descKey: 'sowingTransplantingDesc' },
        { titleKey: 'vegetativeGrowth', durationKey: 'vegetativeGrowthDuration', descKey: 'vegetativeGrowthDesc' },
        { titleKey: 'reproductivePhase', durationKey: 'reproductivePhaseDuration', descKey: 'reproductivePhaseDesc' },
        { titleKey: 'maturation', durationKey: 'maturationDuration', descKey: 'maturationDesc' }
      ]
    },
    coconut: {
      nameKey: 'coconutCrop',
      stages: [
        { titleKey: 'siteSelection', durationKey: 'initial', descKey: 'siteSelectionDesc' },
        { titleKey: 'planting', durationKey: 'oneMonth', descKey: 'plantingDesc' },
        { titleKey: 'youngPalmCare', durationKey: 'threeToFiveYears', descKey: 'youngPalmCareDesc' },
        { titleKey: 'bearingStage', durationKey: 'fivePlusYears', descKey: 'bearingStageDesc' },
        { titleKey: 'maintenance', durationKey: 'ongoing', descKey: 'maintenanceDesc' }
      ]
    }
  };

  return (
    <PageBackground>
      <Header />
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="section-title-glow flex items-center justify-center gap-2">
              <BookOpen className="h-8 w-8 text-emerald-400" />
              {t('cultivationGuide')}
            </h1>
            <p className="text-white mt-2">
              {t('cultivationGuideDesc')}
            </p>
          </div>

          <Card className="glass-card mb-8">
            <CardContent className="p-6">
              <div className="flex gap-4">
                <Button
                  variant={selectedCrop === 'paddy' ? 'default' : 'outline'}
                  onClick={() => setSelectedCrop('paddy')}
                  className={selectedCrop === 'paddy'
                    ? 'bg-gradient-to-r from-emerald-500 to-emerald-600 text-white border-0 shadow-lg'
                    : 'bg-transparent border-emerald-500/30 text-emerald-100 hover:bg-emerald-500/20 hover:text-white hover:border-emerald-500/50'}
                >
                  {t('paddy')}
                </Button>
                <Button
                  variant={selectedCrop === 'coconut' ? 'default' : 'outline'}
                  onClick={() => setSelectedCrop('coconut')}
                  className={selectedCrop === 'coconut'
                    ? 'bg-gradient-to-r from-emerald-500 to-emerald-600 text-white border-0 shadow-lg'
                    : 'bg-transparent border-emerald-500/30 text-emerald-100 hover:bg-emerald-500/20 hover:text-white hover:border-emerald-500/50'}
                >
                  {t('coconutCrop')}
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card className="glass-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-white">
                <Sprout className="h-5 w-5 text-emerald-400" />
                {t(guides[selectedCrop as keyof typeof guides].nameKey)} {t('cultivationGuideTitle')}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {guides[selectedCrop as keyof typeof guides].stages.map((stage, index) => (
                <div key={index} className="flex gap-4 p-4 bg-emerald-800/40 rounded-lg border border-emerald-500/20">
                  <div className="bg-emerald-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">
                    {index + 1}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="font-semibold text-white">{t(stage.titleKey)}</h3>
                      <Badge variant="outline" className="text-xs border-emerald-400/50 text-emerald-200">
                        <Calendar className="h-3 w-3 mr-1" />
                        {t(stage.durationKey)}
                      </Badge>
                    </div>
                    <p className="text-sm text-emerald-200/80">{t(stage.descKey)}</p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </PageBackground>
  );
};

export default CultivationGuide;