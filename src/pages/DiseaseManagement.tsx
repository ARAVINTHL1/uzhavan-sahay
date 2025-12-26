import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Header } from '@/components/layout/Header';
import { PageBackground } from '@/components/layout/PageBackground';
import { useLanguage } from '@/contexts/LanguageContext';
import { Bug, Search, Leaf, AlertTriangle, CheckCircle, Camera, Book } from 'lucide-react';

const DiseaseManagement = () => {
  const { t } = useLanguage();
  const [searchTerm, setSearchTerm] = useState('');

  const diseases = [
    {
      id: '1',
      nameKey: 'riceBlast',
      crop: 'Paddy',
      severity: 'high',
      symptomsKey: 'riceBlastSymptoms',
      treatmentKey: 'riceBlastTreatment',
      preventionKey: 'riceBlastPrevention'
    },
    {
      id: '2',
      nameKey: 'coconutRootWilt',
      crop: 'Coconut',
      severity: 'high',
      symptomsKey: 'coconutRootWiltSymptoms',
      treatmentKey: 'coconutRootWiltTreatment',
      preventionKey: 'coconutRootWiltPrevention'
    }
  ];

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high': return 'bg-red-500/20 text-red-200 border border-red-500/30';
      case 'medium': return 'bg-yellow-500/20 text-yellow-200 border border-yellow-500/30';
      default: return 'bg-emerald-500/20 text-emerald-200 border border-emerald-500/30';
    }
  };

  const getSeverityLabel = (severity: string) => {
    switch (severity) {
      case 'high': return t('highRisk');
      case 'medium': return t('mediumRisk');
      default: return t('lowRisk');
    }
  };

  return (
    <PageBackground>
      <Header />
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="section-title-glow flex items-center justify-center gap-2">
              <Bug className="h-8 w-8 text-emerald-400" />
              {t('diseaseManagement')}
            </h1>
            <p className="text-white mt-2">
              {t('diseaseManagementDesc')}
            </p>
          </div>

          <Card className="glass-card mb-8">
            <CardContent className="p-8">
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none z-10">
                  <Search className="h-5 w-5 text-emerald-400 group-hover:text-emerald-300 transition-colors" />
                </div>
                <Input
                  placeholder={t('searchDiseasesPlaceholder')}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-12 h-14 bg-black/20 border-white/10 text-white placeholder:text-white/50 focus:bg-black/40 focus:border-emerald-400/50 text-lg rounded-xl transition-all shadow-inner backdrop-blur-sm ring-offset-0 focus-visible:ring-1 focus-visible:ring-emerald-400"
                />
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 gap-6">
            {diseases.map((disease) => (
              <Card key={disease.id} className="glass-card-hover border-white/5">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center gap-3 text-white text-xl">
                      <div className="p-2 bg-emerald-500/10 rounded-lg">
                        <Leaf className="h-6 w-6 text-emerald-400" />
                      </div>
                      {t(disease.nameKey)}
                    </CardTitle>
                    <Badge className={`${getSeverityColor(disease.severity)} px-3 py-1`}>
                      {getSeverityLabel(disease.severity)}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
                  <div className="bg-emerald-900/10 p-4 rounded-xl border border-emerald-500/10">
                    <h4 className="font-semibold mb-3 flex items-center gap-2 text-white">
                      <AlertTriangle className="h-4 w-4 text-red-400" />
                      {t('symptoms')}
                    </h4>
                    <p className="text-sm text-gray-300 leading-relaxed">{t(disease.symptomsKey)}</p>
                  </div>
                  <div className="bg-emerald-900/10 p-4 rounded-xl border border-emerald-500/10">
                    <h4 className="font-semibold mb-3 flex items-center gap-2 text-white">
                      <CheckCircle className="h-4 w-4 text-emerald-400" />
                      {t('treatment')}
                    </h4>
                    <p className="text-sm text-gray-300 leading-relaxed">{t(disease.treatmentKey)}</p>
                  </div>
                  <div className="bg-emerald-900/10 p-4 rounded-xl border border-emerald-500/10">
                    <h4 className="font-semibold mb-3 flex items-center gap-2 text-white">
                      <Bug className="h-4 w-4 text-sky-400" />
                      {t('prevention')}
                    </h4>
                    <p className="text-sm text-gray-300 leading-relaxed">{t(disease.preventionKey)}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </PageBackground>
  );
};

export default DiseaseManagement;