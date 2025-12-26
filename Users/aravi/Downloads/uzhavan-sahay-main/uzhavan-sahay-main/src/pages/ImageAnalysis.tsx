import { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Header } from '@/components/layout/Header';
import { PageBackground } from '@/components/layout/PageBackground';
import { useLanguage } from '@/contexts/LanguageContext';
import { useToast } from '@/hooks/use-toast';
import {
  Camera,
  Upload,
  Image as ImageIcon,
  Loader2,
  CheckCircle,
  AlertTriangle,
  Info,
  Zap,
  Eye,
  X
} from 'lucide-react';

interface AnalysisResult {
  diseaseDetected: boolean;
  diseaseName?: string;
  confidence: number;
  severity: 'low' | 'medium' | 'high';
  description: string;
  treatment: string;
  prevention: string;
}

const ImageAnalysis = () => {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [cropType, setCropType] = useState('');
  const [additionalNotes, setAdditionalNotes] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { t } = useLanguage();
  const { toast } = useToast();

  const handleImageSelect = (file: File) => {
    if (file && file.type.startsWith('image/')) {
      setSelectedImage(file);
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);
      setAnalysisResult(null);
    } else {
      toast({
        title: "Invalid File",
        description: "Please select a valid image file.",
        variant: "destructive",
      });
    }
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleImageSelect(file);
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) {
      handleImageSelect(file);
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const removeImage = () => {
    setSelectedImage(null);
    setImagePreview(null);
    setAnalysisResult(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const mockAnalysis = (cropType: string): AnalysisResult => {
    const diseases = [
      {
        diseaseDetected: true,
        diseaseName: 'Brown Leaf Spot',
        confidence: 85,
        severity: 'medium' as const,
        description: 'A fungal disease affecting rice leaves, causing brown spots with yellow halos.',
        treatment: 'Apply copper-based fungicides. Remove infected leaves. Improve drainage and reduce leaf wetness.',
        prevention: 'Use resistant varieties. Maintain proper plant spacing. Avoid overhead irrigation.'
      },
      {
        diseaseDetected: true,
        diseaseName: 'Coconut Leaf Blight',
        confidence: 92,
        severity: 'high' as const,
        description: 'A serious fungal infection causing premature leaf death in coconut palms.',
        treatment: 'Spray with Bordeaux mixture or copper sulfate. Remove and burn infected fronds.',
        prevention: 'Ensure proper drainage. Apply organic manure. Use disease-free seedlings.'
      },
      {
        diseaseDetected: false,
        diseaseName: 'Healthy Plant',
        confidence: 95,
        severity: 'low' as const,
        description: 'The plant appears healthy with no visible signs of disease or pest damage.',
        treatment: 'Continue current care practices. Monitor regularly for any changes.',
        prevention: 'Maintain good agricultural practices. Regular fertilization and proper irrigation.'
      }
    ];

    return Math.random() > 0.3 ? diseases[Math.floor(Math.random() * diseases.length)] : {
      diseaseDetected: false,
      confidence: 98,
      severity: 'low' as const,
      description: 'No disease detected. The crop appears healthy.',
      treatment: 'No treatment required. Continue regular monitoring.',
      prevention: 'Maintain current care practices for optimal plant health.'
    };
  };

  const analyzeImage = async () => {
    if (!selectedImage) {
      toast({
        title: "No Image Selected",
        description: "Please select an image to analyze.",
        variant: "destructive",
      });
      return;
    }

    setIsAnalyzing(true);

    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 3000));

      const result = mockAnalysis(cropType);
      setAnalysisResult(result);

      toast({
        title: "Analysis Complete",
        description: "Image has been successfully analyzed for diseases.",
      });
    } catch (error) {
      toast({
        title: "Analysis Failed",
        description: "Unable to analyze image. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsAnalyzing(false);
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high': return 'text-red-600 bg-red-50';
      case 'medium': return 'text-yellow-600 bg-yellow-50';
      default: return 'text-green-600 bg-green-50';
    }
  };

  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case 'high': return <AlertTriangle className="h-5 w-5" />;
      case 'medium': return <Info className="h-5 w-5" />;
      default: return <CheckCircle className="h-5 w-5" />;
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
              <Camera className="h-8 w-8 text-emerald-400" />
              {t('imageAnalysis')}
            </h1>
            <p className="text-white mt-2">
              {t('uploadCropImagesAnalysis')}
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Image Upload Section */}
            <div className="space-y-6">
              <Card className="glass-card">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-white">
                    <Upload className="h-5 w-5 text-emerald-300" />
                    {t('uploadCropImages')}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {!imagePreview ? (
                    <div
                      className="border-2 border-dashed border-emerald-500/40 rounded-lg p-8 text-center cursor-pointer hover:border-emerald-400/60 transition-colors bg-emerald-800/20"
                      onDrop={handleDrop}
                      onDragOver={handleDragOver}
                      onClick={() => fileInputRef.current?.click()}
                    >
                      <ImageIcon className="h-12 w-12 text-emerald-300/70 mx-auto mb-4" />
                      <p className="text-lg font-medium mb-2 text-white">{t('dragDropImage')}</p>
                      <p className="text-sm text-emerald-200/70 mb-4">
                        {t('or')} {t('browseFiles')}
                      </p>
                      <Button
                        variant="outline"
                        className="bg-black/20 border-emerald-500/30 text-emerald-100 hover:bg-emerald-500/20 hover:text-white hover:border-emerald-500/50 transition-all font-medium"
                      >
                        {t('browseFiles')}
                      </Button>
                      <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/*"
                        onChange={handleFileInput}
                        className="hidden"
                      />
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <div className="relative">
                        <img
                          src={imagePreview}
                          alt="Selected crop"
                          className="w-full h-64 object-cover rounded-lg border border-emerald-500/20"
                        />
                        <Button
                          variant="destructive"
                          size="sm"
                          className="absolute top-2 right-2 rounded-full h-8 w-8 p-0 shadow-lg hover:bg-red-600"
                          onClick={removeImage}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          onClick={() => fileInputRef.current?.click()}
                          className="bg-black/20 border-emerald-500/30 text-emerald-100 hover:bg-emerald-500/20 hover:text-white hover:border-emerald-500/50 transition-all font-medium"
                        >
                          {t('changeImage')}
                        </Button>
                        <input
                          ref={fileInputRef}
                          type="file"
                          accept="image/*"
                          onChange={handleFileInput}
                          className="hidden"
                        />
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Additional Information */}
              <Card className="glass-card">
                <CardHeader>
                  <CardTitle className="text-white">{t('additionalInformation')}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="cropType" className="text-white">{t('cropTypeOptional')}</Label>
                    <Input
                      id="cropType"
                      placeholder={t('cropTypePlaceholder')}
                      value={cropType}
                      onChange={(e) => setCropType(e.target.value)}
                      className="bg-black/20 border-white/10 text-white placeholder:text-white/50 focus:bg-black/40 focus:border-emerald-400/50"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="notes" className="text-white">{t('symptomsNotesOptional')}</Label>
                    <Textarea
                      id="notes"
                      placeholder={t('symptomsPlaceholder')}
                      value={additionalNotes}
                      onChange={(e) => setAdditionalNotes(e.target.value)}
                      rows={3}
                      className="bg-black/20 border-white/10 text-white placeholder:text-white/50 focus:bg-black/40 focus:border-emerald-400/50"
                    />
                  </div>

                  <Button
                    onClick={analyzeImage}
                    disabled={!selectedImage || isAnalyzing}
                    className="w-full h-12 bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-400 hover:to-emerald-500 text-white shadow-lg shadow-emerald-500/20 text-lg font-medium transition-all hover:scale-[1.02] active:scale-95 border-none mt-4"
                  >
                    {isAnalyzing ? (
                      <>
                        <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                        {t('analyzingImage')}
                      </>
                    ) : (
                      <>
                        <Zap className="mr-2 h-5 w-5" />
                        {t('analyzeImage')}
                      </>
                    )}
                  </Button>
                </CardContent>
              </Card>
            </div>

            {/* Analysis Results */}
            <div>
              {analysisResult ? (
                <Card className="glass-card-content">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-white">
                      <Eye className="h-5 w-5 text-emerald-400" />
                      {t('analysisResults')}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {/* Confidence Score */}
                    <div className="text-center">
                      <div className="text-4xl font-bold text-emerald-400 mb-2">
                        {analysisResult.confidence}%
                      </div>
                      <p className="text-sm text-gray-300">{t('confidenceScore')}</p>
                    </div>

                    {/* Disease Status */}
                    <div className={`p-4 rounded-lg bg-emerald-900/30 border border-emerald-500/20 text-white`}>
                      <div className="flex items-center gap-2 mb-2">
                        {getSeverityIcon(analysisResult.severity)}
                        <h3 className="font-semibold text-lg text-emerald-300">
                          {analysisResult.diseaseName || t('healthStatus')}
                        </h3>
                      </div>
                      <p className="text-sm text-gray-200 leading-relaxed">{analysisResult.description}</p>
                    </div>

                    {/* Treatment Recommendations */}
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-semibold mb-2 flex items-center gap-2 text-white">
                          <Zap className="h-4 w-4 text-emerald-400" />
                          {t('recommendedTreatment')}
                        </h4>
                        <p className="text-sm text-gray-200 bg-emerald-900/20 border border-emerald-500/10 p-4 rounded-lg">
                          {analysisResult.treatment}
                        </p>
                      </div>

                      <div>
                        <h4 className="font-semibold mb-2 flex items-center gap-2 text-white">
                          <CheckCircle className="h-4 w-4 text-emerald-400" />
                          {t('preventionTips')}
                        </h4>
                        <p className="text-sm text-gray-200 bg-emerald-900/20 border border-emerald-500/10 p-4 rounded-lg">
                          {analysisResult.prevention}
                        </p>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex gap-2">
                      <Button className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white">{t('saveReport')}</Button>
                      <Button variant="outline" className="flex-1 border-white/20 text-white hover:bg-white/10 bg-transparent">{t('shareResults')}</Button>
                    </div>
                  </CardContent>
                </Card>
              ) : (
                <Card className="glass-card-content">
                  <CardContent className="p-12 text-center">
                    <div className="bg-emerald-900/20 p-4 rounded-full inline-block mb-4">
                      <Camera className="h-12 w-12 text-emerald-400" />
                    </div>
                    <h3 className="text-xl font-semibold mb-2 text-white">{t('readyToAnalyze')}</h3>
                    <p className="text-gray-300">
                      {t('readyToAnalyzeDesc')}
                    </p>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>

          {/* Tips Section */}
          <Card className="glass-card mt-8">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Info className="h-5 w-5 text-emerald-400" />
                {t('tipsForBetterAnalysis')}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center p-4 rounded-xl bg-emerald-900/10 border border-emerald-500/10">
                  <div className="p-3 rounded-full inline-block mb-3 bg-emerald-500/10">
                    <Camera className="h-8 w-8 text-emerald-400" />
                  </div>
                  <h4 className="font-semibold mb-2 text-white">{t('clearImages')}</h4>
                  <p className="text-sm text-gray-300">
                    {t('clearImagesDesc')}
                  </p>
                </div>

                <div className="text-center p-4 rounded-xl bg-emerald-900/10 border border-emerald-500/10">
                  <div className="p-3 rounded-full inline-block mb-3 bg-emerald-500/10">
                    <Eye className="h-8 w-8 text-emerald-400" />
                  </div>
                  <h4 className="font-semibold mb-2 text-white">{t('closeUpShots')}</h4>
                  <p className="text-sm text-gray-300">
                    {t('closeUpShotsDesc')}
                  </p>
                </div>

                <div className="text-center p-4 rounded-xl bg-emerald-900/10 border border-emerald-500/10">
                  <div className="p-3 rounded-full inline-block mb-3 bg-emerald-500/10">
                    <Info className="h-8 w-8 text-emerald-400" />
                  </div>
                  <h4 className="font-semibold mb-2 text-white">{t('additionalInfo')}</h4>
                  <p className="text-sm text-gray-300">
                    {t('additionalInfoDesc')}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </PageBackground>
  );
};

export default ImageAnalysis;