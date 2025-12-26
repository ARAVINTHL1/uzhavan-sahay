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
        { titleKey: 'maturation', durationKey: 'maturationDuration', descKey: 'maturationDesc' },
        { titleKey: 'harvesting', durationKey: 'fiveTenDays', descKey: 'paddyHarvestingDesc' }
      ]
    },
    coconut: {
      nameKey: 'coconutCrop',
      stages: [
        { titleKey: 'siteSelection', durationKey: 'initial', descKey: 'siteSelectionDesc' },
        { titleKey: 'planting', durationKey: 'oneMonth', descKey: 'plantingDesc' },
        { titleKey: 'youngPalmCare', durationKey: 'threeToFiveYears', descKey: 'youngPalmCareDesc' },
        { titleKey: 'bearingStage', durationKey: 'fivePlusYears', descKey: 'bearingStageDesc' },
        { titleKey: 'maintenance', durationKey: 'ongoing', descKey: 'maintenanceDesc' },
        { titleKey: 'harvesting', durationKey: 'every45Days', descKey: 'coconutHarvestingDesc' }
      ]
    },
    tomato: {
      nameKey: 'tomato',
      stages: [
        { titleKey: 'landPreparation', durationKey: 'sevenTenDays', descKey: 'tomatoLandPrepDesc' },
        { titleKey: 'nurseryPreparation', durationKey: 'twentyFiveDays', descKey: 'tomatoNurseryDesc' },
        { titleKey: 'transplanting', durationKey: 'threeFiveDays', descKey: 'tomatoTransplantingDesc' },
        { titleKey: 'vegetativeGrowth', durationKey: 'thirtyFortyDays', descKey: 'tomatoVegetativeDesc' },
        { titleKey: 'flowering', durationKey: 'fifteenTwentyDays', descKey: 'tomatoFloweringDesc' },
        { titleKey: 'fruitDevelopment', durationKey: 'twentyThirtyDays', descKey: 'tomatoFruitDesc' },
        { titleKey: 'harvesting', durationKey: 'thirtyFortyDays', descKey: 'tomatoHarvestingDesc' }
      ]
    },
    groundnut: {
      nameKey: 'groundnut',
      stages: [
        { titleKey: 'landPreparation', durationKey: 'tenFifteenDays', descKey: 'groundnutLandPrepDesc' },
        { titleKey: 'sowing', durationKey: 'threeFiveDays', descKey: 'groundnutSowingDesc' },
        { titleKey: 'vegetativeGrowth', durationKey: 'thirtyFortyDays', descKey: 'groundnutVegetativeDesc' },
        { titleKey: 'flowering', durationKey: 'twentyThirtyDays', descKey: 'groundnutFloweringDesc' },
        { titleKey: 'pegging', durationKey: 'fifteenTwentyDays', descKey: 'groundnutPeggingDesc' },
        { titleKey: 'podDevelopment', durationKey: 'thirtyFortyDays', descKey: 'groundnutPodDesc' },
        { titleKey: 'harvesting', durationKey: 'fiveTenDays', descKey: 'groundnutHarvestingDesc' }
      ]
    },
    sugarcane: {
      nameKey: 'sugarcane',
      stages: [
        { titleKey: 'landPreparation', durationKey: 'fifteenTwentyDays', descKey: 'sugarcaneLandPrepDesc' },
        { titleKey: 'planting', durationKey: 'tenFifteenDays', descKey: 'sugarcanePlantingDesc' },
        { titleKey: 'germination', durationKey: 'twentyThirtyDays', descKey: 'sugarcaneGerminationDesc' },
        { titleKey: 'tillering', durationKey: 'sixtyNinetyDays', descKey: 'sugarcaneTilleringDesc' },
        { titleKey: 'grandGrowth', durationKey: 'fourFiveMonths', descKey: 'sugarcaneGrandGrowthDesc' },
        { titleKey: 'maturation', durationKey: 'twoThreeMonths', descKey: 'sugarcaneMaturationDesc' },
        { titleKey: 'harvesting', durationKey: 'fifteenThirtyDays', descKey: 'sugarcaneHarvestingDesc' }
      ]
    },
    wheat: {
      nameKey: 'wheat',
      stages: [
        { titleKey: 'landPreparation', durationKey: 'tenFifteenDays', descKey: 'wheatLandPrepDesc' },
        { titleKey: 'sowing', durationKey: 'threeFiveDays', descKey: 'wheatSowingDesc' },
        { titleKey: 'germination', durationKey: 'sevenTenDays', descKey: 'wheatGerminationDesc' },
        { titleKey: 'tillering', durationKey: 'thirtyFortyDays', descKey: 'wheatTilleringDesc' },
        { titleKey: 'stemElongation', durationKey: 'twentyThirtyDays', descKey: 'wheatStemDesc' },
        { titleKey: 'heading', durationKey: 'tenFifteenDays', descKey: 'wheatHeadingDesc' },
        { titleKey: 'grainFilling', durationKey: 'twentyFiveDays', descKey: 'wheatGrainFillingDesc' },
        { titleKey: 'harvesting', durationKey: 'fiveTenDays', descKey: 'wheatHarvestingDesc' }
      ]
    },
    banana: {
      nameKey: 'banana',
      stages: [
        { titleKey: 'landPreparation', durationKey: 'fifteenTwentyDays', descKey: 'bananaLandPrepDesc' },
        { titleKey: 'planting', durationKey: 'fiveTenDays', descKey: 'bananaPlantingDesc' },
        { titleKey: 'vegetativeGrowth', durationKey: 'fourFiveMonths', descKey: 'bananaVegetativeDesc' },
        { titleKey: 'flowering', durationKey: 'twoThreeMonths', descKey: 'bananaFloweringDesc' },
        { titleKey: 'fruitDevelopment', durationKey: 'threeMonths', descKey: 'bananaFruitDesc' },
        { titleKey: 'harvesting', durationKey: 'tenFifteenDays', descKey: 'bananaHarvestingDesc' }
      ]
    },
    chili: {
      nameKey: 'chili',
      stages: [
        { titleKey: 'nurseryPreparation', durationKey: 'thirtyFiveFortyDays', descKey: 'chiliNurseryDesc' },
        { titleKey: 'landPreparation', durationKey: 'tenFifteenDays', descKey: 'chiliLandPrepDesc' },
        { titleKey: 'transplanting', durationKey: 'threeFiveDays', descKey: 'chiliTransplantingDesc' },
        { titleKey: 'vegetativeGrowth', durationKey: 'thirtyFortyDays', descKey: 'chiliVegetativeDesc' },
        { titleKey: 'flowering', durationKey: 'twentyThirtyDays', descKey: 'chiliFloweringDesc' },
        { titleKey: 'fruitDevelopment', durationKey: 'thirtyFortyDays', descKey: 'chiliFruitDesc' },
        { titleKey: 'harvesting', durationKey: 'sixtyNinetyDays', descKey: 'chiliHarvestingDesc' }
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
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {['paddy', 'coconut', 'tomato', 'groundnut', 'sugarcane', 'wheat', 'banana', 'chili'].map((crop) => (
                  <Button
                    key={crop}
                    variant={selectedCrop === crop ? 'default' : 'outline'}
                    onClick={() => setSelectedCrop(crop)}
                    className={selectedCrop === crop
                      ? 'bg-gradient-to-r from-emerald-500 to-emerald-600 text-white border-0 shadow-lg'
                      : 'bg-transparent border-emerald-500/30 text-emerald-100 hover:bg-emerald-500/20 hover:text-white hover:border-emerald-500/50'}
                  >
                    {t(crop === 'paddy' ? 'paddy' : crop === 'coconut' ? 'coconutCrop' : crop)}
                  </Button>
                ))}
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