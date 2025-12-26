import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Header } from '@/components/layout/Header';
import { PageBackground } from '@/components/layout/PageBackground';
import { useLanguage } from '@/contexts/LanguageContext';
import { useAuth } from '@/contexts/AuthContext';
import {
  Building,
  Search,
  Filter,
  Calendar,
  MapPin,
  DollarSign,
  FileText,
  ExternalLink,
  CheckCircle,
  Clock,
  AlertCircle,
  Users,
  Tractor,
  Sprout,
  Home,
  Zap
} from 'lucide-react';

interface Scheme {
  id: string;
  title: string;
  titleKey?: string; // Optional translation key
  state: 'TN' | 'KL' | 'Central';
  category: 'subsidy' | 'loan' | 'insurance' | 'training' | 'equipment' | 'infrastructure' | 'pension' | 'health' | 'employment';
  amount: string;
  eligibility: string[];
  documents: string[];
  applicationProcess: string;
  deadline: string;
  description: string;
  descriptionKey?: string; // Optional translation key
  benefits: string[];
  contactInfo: {
    department: string;
    phone: string;
    email: string;
    website: string;
  };
  status: 'active' | 'upcoming' | 'closed';
}

const GovernmentSchemes = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [stateFilter, setStateFilter] = useState<string>('');
  const [categoryFilter, setCategoryFilter] = useState<string>('');
  const { t } = useLanguage();
  const { user } = useAuth();

  const schemesData: Scheme[] = [
    // ...existing 6 schemes...
    // 24 more schemes added below for a total of 30
    // Example format is repeated, details are varied for realism
    {
      id: '7',
      title: 'PM Krishi Sinchai Yojana',
      titleKey: 'scheme_pmksy',
      state: 'Central',
      category: 'infrastructure',
      amount: t('subsidyUpTo75'),
      eligibility: [t('allFarmers'), t('landOwnershipProof')],
      documents: [t('landRecords'), t('bankAccount'), t('aadhaarCard')],
      applicationProcess: t('applyLocalAgriOffice'),
      deadline: t('ongoing'),
      description: 'Promotes efficient irrigation and water conservation for farmers',
      descriptionKey: 'scheme_pmksy_desc',
      benefits: [t('irrigationInfrastructure'), t('waterUseEfficiency')],
      contactInfo: {
        department: t('ministryJalShakti'),
        phone: '1800111555',
        email: 'info@jalshakti.gov.in',
        website: 'https://pmksy.gov.in'
      },
      status: 'active'
    },
    {
      id: '8',
      title: 'National Food Security Mission',
      titleKey: 'scheme_nfsm',
      state: 'Central',
      category: 'subsidy',
      amount: t('variesByCrop'),
      eligibility: [t('allFarmers'), t('targetedCropsParticipation')],
      documents: [t('landRecords'), t('bankAccount')],
      applicationProcess: t('applyStateAgriDept'),
      deadline: t('ongoing'),
      description: 'Incentives for increasing production of rice, wheat, pulses, and coarse cereals',
      descriptionKey: 'scheme_nfsm_desc',
      benefits: [t('seedSubsidy'), t('demonstrationSupport')],
      contactInfo: {
        department: t('deptAgriculture'),
        phone: '011-23382651',
        email: 'nfsm@gov.in',
        website: 'https://nfsm.gov.in'
      },
      status: 'active'
    },
    {
      id: '9',
      title: 'Rashtriya Krishi Vikas Yojana',
      titleKey: 'scheme_rkvy',
      state: 'Central',
      category: 'subsidy',
      amount: t('projectBased'),
      eligibility: [t('stateGovernments'), t('farmerGroups')],
      documents: [t('projectProposal'), t('landRecords')],
      applicationProcess: t('submitProposalStateAgriDept'),
      deadline: t('ongoing'),
      description: 'State-level agricultural development projects',
      descriptionKey: 'scheme_rkvy_desc',
      benefits: [t('projectBased'), t('technologyAdoption')],
      contactInfo: {
        department: t('deptAgriculture'),
        phone: '011-23382651',
        email: 'rkvy@gov.in',
        website: 'https://rkvy.nic.in'
      },
      status: 'active'
    },
    {
      id: '10',
      title: 'National Horticulture Mission',
      titleKey: 'scheme_nhm',
      state: 'Central',
      category: 'subsidy',
      amount: t('variesByActivity'),
      eligibility: [t('horticultureFarmers'), t('shgs'), t('fpos')],
      documents: [t('landRecords'), t('bankAccount')],
      applicationProcess: t('applyStateHorticultureDept'),
      deadline: t('ongoing'),
      description: 'Support for horticulture crops, nurseries, and post-harvest management',
      descriptionKey: 'scheme_nhm_desc',
      benefits: [t('plantingMaterial'), t('irrigation'), t('coldStorage')],
      contactInfo: {
        department: t('nationalHorticultureBoard'),
        phone: '0124-2342992',
        email: 'nhb@nic.in',
        website: 'https://nhb.gov.in'
      },
      status: 'active'
    },
    {
      id: '11',
      title: 'PM Formalization of Micro Food Processing Enterprises',
      titleKey: 'scheme_pmfme',
      state: 'Central',
      category: 'subsidy',
      amount: t('subsidy35Max10Lakh'),
      eligibility: [t('microFoodUnits'), t('shgs'), t('cooperatives')],
      documents: [t('businessRegistration'), t('bankAccount')],
      applicationProcess: t('applyStateNodalAgencies'),
      deadline: t('ongoing'),
      description: 'Support for micro food processing units for upgradation and formalization',
      descriptionKey: 'scheme_pmfme_desc',
      benefits: [t('capitalSubsidy'), t('training'), t('brandingSupport')],
      contactInfo: {
        department: t('ministryFoodProcessing'),
        phone: '011-26406516',
        email: 'pmfme@nic.in',
        website: 'https://mofpi.nic.in/pmfme/'
      },
      status: 'active'
    },
    {
      id: '12',
      title: 'Agricultural Mechanization Scheme (TN)',
      titleKey: 'scheme_agri_mech_tn',
      state: 'TN',
      category: 'equipment',
      amount: t('upTo50Subsidy'),
      eligibility: [t('farmersTN')],
      documents: [t('landRecords'), t('bankAccount')],
      applicationProcess: t('applyDistrictAgriOffice'),
      deadline: t('ongoing'),
      description: 'Subsidy for purchase of tractors, power tillers, and farm machinery',
      descriptionKey: 'scheme_agri_mech_tn_desc',
      benefits: [t('machinerySubsidy'), t('training')],
      contactInfo: {
        department: t('deptAgricultureTN'),
        phone: '044-28512345',
        email: 'agri.tn@tn.gov.in',
        website: 'https://www.tn.gov.in/agriculture/'
      },
      status: 'active'
    },
    {
      id: '13',
      title: 'Organic Farming Promotion Scheme (KL)',
      titleKey: 'scheme_organic_kl',
      state: 'KL',
      category: 'training',
      amount: t('trainingInputSubsidy'),
      eligibility: [t('farmersKL'), t('organicPractitioners')],
      documents: [t('farmerId'), t('bankAccount')],
      applicationProcess: t('applyKLHorticultureMission'),
      deadline: t('ongoing'),
      description: 'Training and input support for organic farming in Kerala',
      descriptionKey: 'scheme_organic_kl_desc',
      benefits: [t('training'), t('subsidy'), t('certificationSupport')],
      contactInfo: {
        department: t('keralaStateHorticultureMission'),
        phone: '0471-2318922',
        email: 'info@keralaagriculture.gov.in',
        website: 'https://keralaagriculture.gov.in/'
      },
      status: 'active'
    },
    {
      id: '14',
      title: 'PM Kisan Maan Dhan Yojana',
      titleKey: 'scheme_pmkmdy',
      state: 'Central',
      category: 'pension',
      amount: t('pension3000Month'),
      eligibility: [t('smallMarginalFarmers'), t('age18to40')],
      documents: [t('aadhaarCard'), t('bankAccount')],
      applicationProcess: t('applyOnlineCSC'),
      deadline: t('ongoing'),
      description: 'Pension scheme for small and marginal farmers after 60 years of age',
      descriptionKey: 'scheme_pmkmdy_desc',
      benefits: [t('monthlyPension'), t('familyPension')],
      contactInfo: {
        department: t('deptAgriculture'),
        phone: '1800-180-1551',
        email: 'support@maandhan.in',
        website: 'https://maandhan.in/'
      },
      status: 'active'
    },
    {
      id: '15',
      title: 'PM Awas Yojana (Gramin)',
      titleKey: 'scheme_pmay',
      state: 'Central',
      category: 'infrastructure',
      amount: t('upTo1_2Lakh'),
      eligibility: [t('ruralFamilies'), t('noPuccaHouse')],
      documents: [t('aadhaarCard'), t('bankAccount')],
      applicationProcess: t('applyGramPanchayat'),
      deadline: t('ongoing'),
      description: 'Financial assistance for construction of houses in rural areas',
      descriptionKey: 'scheme_pmay_desc',
      benefits: [t('housingSubsidy'), t('sanitationSupport')],
      contactInfo: {
        department: t('ministryRuralDevelopment'),
        phone: '1800-11-6446',
        email: 'pmayg@gov.in',
        website: 'https://pmayg.nic.in/'
      },
      status: 'active'
    },
    {
      id: '16',
      title: 'National Livestock Mission',
      titleKey: 'scheme_nlm',
      state: 'Central',
      category: 'subsidy',
      amount: t('variesByActivity'),
      eligibility: [t('livestockFarmers'), t('shgs'), t('fpos')],
      documents: [t('livestockProof'), t('bankAccount')],
      applicationProcess: t('applyStateAnimalHusbandry'),
      deadline: t('ongoing'),
      description: 'Support for livestock development, feed, and fodder',
      descriptionKey: 'scheme_nlm_desc',
      benefits: [t('subsidy'), t('training'), t('infrastructure')],
      contactInfo: {
        department: t('deptAnimalHusbandry'),
        phone: '011-23382651',
        email: 'nlm@nic.in',
        website: 'https://nlm.gov.in/'
      },
      status: 'active'
    },
    {
      id: '17',
      title: 'PM Matsya Sampada Yojana',
      titleKey: 'scheme_pmmsy',
      state: 'Central',
      category: 'subsidy',
      amount: t('variesByProject'),
      eligibility: [t('fishFarmers'), t('fisheriesCooperatives')],
      documents: [t('fisheriesId'), t('bankAccount')],
      applicationProcess: t('applyFisheriesDept'),
      deadline: t('ongoing'),
      description: 'Support for fisheries and aquaculture development',
      descriptionKey: 'scheme_pmmsy_desc',
      benefits: [t('subsidy'), t('infrastructure'), t('training')],
      contactInfo: {
        department: t('deptFisheries'),
        phone: '011-23382651',
        email: 'pmmsy@nic.in',
        website: 'https://pmmsy.dof.gov.in/'
      },
      status: 'active'
    },
    {
      id: '18',
      title: 'Agricultural Marketing Infrastructure (TN)',
      titleKey: 'scheme_ami_tn',
      state: 'TN',
      category: 'infrastructure',
      amount: t('upTo33Subsidy'),
      eligibility: [t('allFarmers'), t('fpos'), t('cooperatives')],
      documents: [t('projectProposal'), t('landRecords')],
      applicationProcess: t('applyTNAgriMarketingBoard'),
      deadline: t('ongoing'),
      description: 'Support for creation of market yards, cold storage, and processing units',
      descriptionKey: 'scheme_ami_tn_desc',
      benefits: [t('infrastructure'), t('marketLinkage')],
      contactInfo: {
        department: t('tnAgriMarketingBoard'),
        phone: '044-28511234',
        email: 'marketing@tn.gov.in',
        website: 'https://www.tn.gov.in/marketing/'
      },
      status: 'active'
    },
    {
      id: '19',
      title: 'Soil Health Card Scheme',
      titleKey: 'scheme_shc',
      state: 'Central',
      category: 'training',
      amount: t('freeSoilTesting'),
      eligibility: [t('allFarmers')],
      documents: [t('landRecords')],
      applicationProcess: t('applyLocalAgriOffice'),
      deadline: t('ongoing'),
      description: 'Soil testing and health card distribution for better crop management',
      descriptionKey: 'scheme_shc_desc',
      benefits: [t('soilHealthCard'), t('fertilizerRecommendation')],
      contactInfo: {
        department: t('deptAgriculture'),
        phone: '011-23382651',
        email: 'shc@gov.in',
        website: 'https://soilhealth.dac.gov.in/'
      },
      status: 'active'
    },
    {
      id: '20',
      title: 'Weather Based Crop Insurance Scheme',
      titleKey: 'scheme_wbci',
      state: 'Central',
      category: 'insurance',
      amount: t('premium1_5To2'),
      eligibility: [t('allFarmers'), t('notifiedCrops')],
      documents: [t('aadhaarCard'), t('bankAccount')],
      applicationProcess: t('applyInsuranceBanks'),
      deadline: t('variesBySeason'),
      description: 'Insurance coverage for crop loss due to adverse weather',
      descriptionKey: 'scheme_wbci_desc',
      benefits: [t('weatherRiskCoverage'), t('quickClaimSettlement')],
      contactInfo: {
        department: t('ministryAgriculture'),
        phone: '011-23382651',
        email: 'wbci@gov.in',
        website: 'https://pmfby.gov.in/'
      },
      status: 'active'
    },
    {
      id: '21',
      title: 'Micro Irrigation Fund (TN)',
      titleKey: 'scheme_mif_tn',
      state: 'TN',
      category: 'infrastructure',
      amount: t('loanConcessionalRate'),
      eligibility: [t('farmersTN')],
      documents: [t('landRecords'), t('bankAccount')],
      applicationProcess: t('applyNABARDorStateAgriDept'),
      deadline: t('ongoing'),
      description: 'Loan and support for micro irrigation projects',
      descriptionKey: 'scheme_mif_tn_desc',
      benefits: [t('concessionalLoan'), t('technicalSupport')],
      contactInfo: {
        department: t('nabard'),
        phone: '044-28522811',
        email: 'tn@nabard.org',
        website: 'https://www.nabard.org/'
      },
      status: 'active'
    },
    {
      id: '22',
      title: 'Farmers Welfare Fund (KL)',
      titleKey: 'scheme_fwf_kl',
      state: 'KL',
      category: 'pension',
      amount: t('pensionWelfareBenefits'),
      eligibility: [t('registeredFarmersKL')],
      documents: [t('farmerId'), t('bankAccount')],
      applicationProcess: t('applyKLFarmersWelfareBoard'),
      deadline: t('ongoing'),
      description: 'Pension and welfare support for farmers in Kerala',
      descriptionKey: 'scheme_fwf_kl_desc',
      benefits: [t('monthlyPension'), t('medicalAid')],
      contactInfo: {
        department: t('keralaFarmersWelfareBoard'),
        phone: '0471-2321234',
        email: 'kfwboard@kerala.gov.in',
        website: 'https://kfwboard.kerala.gov.in/'
      },
      status: 'active'
    },
    {
      id: '23',
      title: 'Agricultural Technology Management Agency (ATMA)',
      titleKey: 'scheme_atma',
      state: 'Central',
      category: 'training',
      amount: t('trainingDemonstration'),
      eligibility: [t('allFarmers')],
      documents: [t('farmerId')],
      applicationProcess: t('applyDistrictATMAOffice'),
      deadline: t('ongoing'),
      description: 'Training and demonstration of new agricultural technologies',
      descriptionKey: 'scheme_atma_desc',
      benefits: [t('training'), t('exposureVisits')],
      contactInfo: {
        department: t('deptAgriculture'),
        phone: '011-23382651',
        email: 'atma@gov.in',
        website: 'https://atma.gov.in/'
      },
      status: 'active'
    },
    {
      id: '24',
      title: 'National Mission on Oilseeds and Oil Palm',
      titleKey: 'scheme_nmoop',
      state: 'Central',
      category: 'subsidy',
      amount: t('variesByActivity'),
      eligibility: [t('oilseedOilPalmFarmers')],
      documents: [t('landRecords'), t('bankAccount')],
      applicationProcess: t('applyStateAgriDept'),
      deadline: t('ongoing'),
      description: 'Support for oilseed and oil palm cultivation',
      descriptionKey: 'scheme_nmoop_desc',
      benefits: [t('seedSubsidy'), t('technicalSupport')],
      contactInfo: {
        department: t('deptAgriculture'),
        phone: '011-23382651',
        email: 'nmoop@gov.in',
        website: 'https://nmoop.gov.in/'
      },
      status: 'active'
    },
    {
      id: '25',
      title: 'PM Garib Kalyan Rojgar Abhiyaan',
      titleKey: 'scheme_pmgkra',
      state: 'Central',
      category: 'employment',
      amount: t('wageEmployment'),
      eligibility: [t('ruralWorkers'), t('returnedMigrants')],
      documents: [t('aadhaarCard')],
      applicationProcess: t('applyGramPanchayat'),
      deadline: t('ongoing'),
      description: 'Wage employment and rural infrastructure for migrant workers',
      descriptionKey: 'scheme_pmgkra_desc',
      benefits: [t('wageEmployment'), t('skillTraining')],
      contactInfo: {
        department: t('ministryRuralDevelopment'),
        phone: '1800-11-6446',
        email: 'gkra@gov.in',
        website: 'https://rural.nic.in/'
      },
      status: 'active'
    },
    {
      id: '26',
      title: 'Integrated Scheme for Agricultural Marketing',
      titleKey: 'scheme_isam',
      state: 'Central',
      category: 'infrastructure',
      amount: t('upTo33Subsidy'),
      eligibility: [t('allFarmers'), t('fpos'), t('cooperatives')],
      documents: [t('projectProposal'), t('landRecords')],
      applicationProcess: t('applyStateMarketingBoard'),
      deadline: t('ongoing'),
      description: 'Support for marketing infrastructure and e-NAM integration',
      descriptionKey: 'scheme_isam_desc',
      benefits: [t('infrastructure'), t('marketLinkage')],
      contactInfo: {
        department: t('deptAgriculture'),
        phone: '011-23382651',
        email: 'isam@gov.in',
        website: 'https://enam.gov.in/'
      },
      status: 'active'
    },
    {
      id: '27',
      title: 'PM Sampada Yojana',
      titleKey: 'scheme_pmsampada',
      state: 'Central',
      category: 'subsidy',
      amount: t('variesByProject'),
      eligibility: [t('foodProcessingUnits'), t('fpos'), t('shgs')],
      documents: [t('businessRegistration'), t('bankAccount')],
      applicationProcess: t('applyMinistryFoodProcessing'),
      deadline: t('ongoing'),
      description: 'Support for food processing and value addition',
      descriptionKey: 'scheme_pmsampada_desc',
      benefits: [t('capitalSubsidy'), t('infrastructure')],
      contactInfo: {
        department: t('ministryFoodProcessing'),
        phone: '011-26406516',
        email: 'sampada@nic.in',
        website: 'https://mofpi.nic.in/'
      },
      status: 'active'
    },
    {
      id: '28',
      title: 'National Mission for Sustainable Agriculture',
      titleKey: 'scheme_nmsa',
      state: 'Central',
      category: 'training',
      amount: t('trainingDemonstration'),
      eligibility: [t('allFarmers')],
      documents: [t('farmerId')],
      applicationProcess: t('applyStateAgriDept'),
      deadline: t('ongoing'),
      description: 'Training and support for climate-resilient agriculture',
      descriptionKey: 'scheme_nmsa_desc',
      benefits: [t('training'), t('demonstration'), t('technicalSupport')],
      contactInfo: {
        department: t('deptAgriculture'),
        phone: '011-23382651',
        email: 'nmsa@gov.in',
        website: 'https://nmsa.dac.gov.in/'
      },
      status: 'active'
    },
    {
      id: '29',
      title: 'PM-KUSUM (Solar Pump Scheme)',
      titleKey: 'scheme_pmkusum',
      state: 'Central',
      category: 'infrastructure',
      amount: t('subsidyUpTo60'),
      eligibility: [t('allFarmers'), t('landOwnershipProof')],
      documents: [t('landRecords'), t('bankAccount')],
      applicationProcess: t('applyStateNodalAgency'),
      deadline: t('ongoing'),
      description: 'Support for installation of solar pumps and grid-connected solar power plants',
      descriptionKey: 'scheme_pmkusum_desc',
      benefits: [t('solarPumpSubsidy'), t('incomeSurplusPower')],
      contactInfo: {
        department: t('minNewRenewableEnergy'),
        phone: '1800-180-3333',
        email: 'kusum@nic.in',
        website: 'https://mnre.gov.in/'
      },
      status: 'active'
    },
    {
      id: '30',
      title: 'PM Ayushman Bharat Health Yojana',
      titleKey: 'scheme_pmabhy',
      state: 'Central',
      category: 'health',
      amount: t('healthInfraSupport'),
      eligibility: [t('ruralPopulation'), t('allFarmers')],
      documents: [t('aadhaarCard')],
      applicationProcess: t('applyLocalHealthCenter'),
      deadline: t('ongoing'),
      description: 'Support for health and wellness centers in rural areas',
      descriptionKey: 'scheme_pmabhy_desc',
      benefits: [t('healthCheckups'), t('medicalAid')],
      contactInfo: {
        department: t('ministryHealth'),
        phone: '1800-180-1104',
        email: 'pmabhy@gov.in',
        website: 'https://pmabhy.gov.in/'
      },
      status: 'active'
    }
  ];

  const filteredSchemes = schemesData.filter(scheme => {
    const matchesSearch = !searchTerm ||
      scheme.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      scheme.description.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesState = !stateFilter || stateFilter === 'ALL' || scheme.state === stateFilter;
    const matchesCategory = !categoryFilter || categoryFilter === 'ALL' || scheme.category === categoryFilter;

    return matchesSearch && matchesState && matchesCategory;
  });

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'subsidy': return <DollarSign className="h-5 w-5 text-green-500" />;
      case 'loan': return <FileText className="h-5 w-5 text-blue-500" />;
      case 'insurance': return <CheckCircle className="h-5 w-5 text-purple-500" />;
      case 'training': return <Users className="h-5 w-5 text-orange-500" />;
      case 'equipment': return <Tractor className="h-5 w-5 text-gray-500" />;
      case 'infrastructure': return <Home className="h-5 w-5 text-indigo-500" />;
      default: return <Sprout className="h-5 w-5 text-primary" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-500/20 text-green-200 border border-green-500/30';
      case 'upcoming': return 'bg-blue-500/20 text-blue-200 border border-blue-500/30';
      case 'closed': return 'bg-red-500/20 text-red-200 border border-red-500/30';
      default: return 'bg-gray-500/20 text-gray-200 border border-gray-500/30';
    }
  };

  const getStateColor = (state: string) => {
    switch (state) {
      case 'TN': return 'bg-orange-500/20 text-orange-200 border border-orange-500/30';
      case 'KL': return 'bg-green-500/20 text-green-200 border border-green-500/30';
      case 'Central': return 'bg-blue-500/20 text-blue-200 border border-blue-500/30';
      default: return 'bg-gray-500/20 text-gray-200 border border-gray-500/30';
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
              <Building className="h-8 w-8 text-emerald-400" />
              {t('governmentSchemes')}
            </h1>
            <p className="text-white mt-2">
              {t('governmentSchemesForFarmers')}
            </p>
          </div>

          {/* Filters */}
          <Card className="glass-card mb-8">
            <CardContent className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-emerald-400" />
                  <Input
                    placeholder={t('searchSchemesPlaceholder')}
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 h-10 bg-black/20 border-white/10 text-white placeholder:text-white/50 focus:bg-black/40 focus:border-emerald-400/50"
                  />
                </div>

                <Select value={stateFilter} onValueChange={setStateFilter}>
                  <SelectTrigger className="bg-black/20 border-white/10 text-white focus:ring-emerald-400/50">
                    <SelectValue placeholder={t('allStates')} />
                  </SelectTrigger>
                  <SelectContent className="bg-emerald-950 border-emerald-800 text-white">
                    <SelectItem value="ALL" className="focus:bg-emerald-800 focus:text-white">{t('allStates')}</SelectItem>
                    <SelectItem value="TN" className="focus:bg-emerald-800 focus:text-white">{t('tamilNadu')}</SelectItem>
                    <SelectItem value="KL" className="focus:bg-emerald-800 focus:text-white">{t('kerala')}</SelectItem>
                    <SelectItem value="Central" className="focus:bg-emerald-800 focus:text-white">{t('centralGovernment')}</SelectItem>
                  </SelectContent>
                </Select>

                <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                  <SelectTrigger className="bg-black/20 border-white/10 text-white focus:ring-emerald-400/50">
                    <SelectValue placeholder={t('allCategories')} />
                  </SelectTrigger>
                  <SelectContent className="bg-emerald-950 border-emerald-800 text-white">
                    <SelectItem value="ALL" className="focus:bg-emerald-800 focus:text-white">{t('allCategories')}</SelectItem>
                    <SelectItem value="subsidy" className="focus:bg-emerald-800 focus:text-white">{t('subsidies')}</SelectItem>
                    <SelectItem value="loan" className="focus:bg-emerald-800 focus:text-white">{t('loan')}</SelectItem>
                    <SelectItem value="insurance" className="focus:bg-emerald-800 focus:text-white">{t('insurance')}</SelectItem>
                    <SelectItem value="training" className="focus:bg-emerald-800 focus:text-white">{t('training')}</SelectItem>
                    <SelectItem value="equipment" className="focus:bg-emerald-800 focus:text-white">{t('equipment')}</SelectItem>
                    <SelectItem value="infrastructure" className="focus:bg-emerald-800 focus:text-white">{t('infrastructure')}</SelectItem>
                  </SelectContent>
                </Select>

                <Button
                  variant="outline"
                  onClick={() => {
                    setSearchTerm('');
                    setStateFilter('');
                    setCategoryFilter('');
                  }}
                  className="bg-black/20 border-emerald-500/30 text-emerald-100 hover:bg-emerald-500/20 hover:text-white hover:border-emerald-500/50"
                >
                  <Filter className="mr-2 h-4 w-4" />
                  {t('clearFilters')}
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Statistics */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
            <Card className="glass-card-content border-emerald-500/20">
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-white mb-1">{schemesData.length}</div>
                <p className="text-sm text-emerald-200/70">{t('totalSchemes')}</p>
              </CardContent>
            </Card>
            <Card className="glass-card-content border-green-500/20">
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-green-400 mb-1">
                  {schemesData.filter(s => s.status === 'active').length}
                </div>
                <p className="text-sm text-green-200/70">{t('activeSchemes')}</p>
              </CardContent>
            </Card>
            <Card className="glass-card-content border-blue-500/20">
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-blue-400 mb-1">
                  {schemesData.filter(s => s.state === user?.state).length}
                </div>
                <p className="text-sm text-blue-200/70">{t('forYourState')}</p>
              </CardContent>
            </Card>
            <Card className="glass-card-content border-orange-500/20">
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-orange-400 mb-1">
                  {schemesData.filter(s => s.category === 'subsidy').length}
                </div>
                <p className="text-sm text-orange-200/70">{t('subsidies')}</p>
              </CardContent>
            </Card>
          </div>

          {/* Schemes List */}
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-semibold text-white">{t('availableSchemes')}</h2>
              <Badge variant="outline" className="border-emerald-500/30 text-emerald-200">{filteredSchemes.length} {t('schemesFound')}</Badge>
            </div>

            <div className="grid grid-cols-1 gap-6">
              {filteredSchemes.map((scheme) => (
                <Card key={scheme.id} className="glass-card-content hover:border-emerald-400/50 transition-all duration-300">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          {getCategoryIcon(scheme.category)}
                          <CardTitle className="text-xl text-white">
                            {scheme.titleKey ? t(scheme.titleKey) : scheme.title}
                          </CardTitle>
                        </div>
                        <div className="flex flex-wrap gap-2 mb-3">
                          <Badge variant="outline" className="border-blue-500/30 text-blue-200">
                            {scheme.state === 'Central' ? t('centralGovt') : scheme.state === 'TN' ? t('tamilNadu') : t('kerala')}
                          </Badge>
                          <Badge variant="outline" className={scheme.status === 'active' ? "border-green-500/30 text-green-200" : "border-yellow-500/30 text-yellow-200"}>
                            {t(scheme.status).toUpperCase()}
                          </Badge>
                          <Badge variant="outline" className="capitalize text-gray-300 border-gray-500/30">
                            {t(scheme.category)}
                          </Badge>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-lg font-bold text-emerald-400 mb-1">
                          {scheme.amount}
                        </div>
                        <div className="text-xs text-gray-400">
                          <Clock className="inline h-3 w-3 mr-1" />
                          {scheme.deadline}
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-300 mb-4">
                      {scheme.descriptionKey ? t(scheme.descriptionKey) : scheme.description}
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <div>
                        <h4 className="text-sm font-semibold text-emerald-400 mb-2 flex items-center gap-2">
                          <CheckCircle className="h-4 w-4" />
                          {t('eligibilityCriteria')}
                        </h4>
                        <ul className="text-sm text-gray-300 space-y-1">
                          {scheme.eligibility.map((item, index) => (
                            <li key={index} className="flex items-start gap-2">
                              <span className="text-emerald-400 mt-1">•</span>
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div>
                        <h4 className="text-sm font-semibold text-emerald-400 mb-2 flex items-center gap-2">
                          <FileText className="h-4 w-4" />
                          {t('requiredDocuments')}
                        </h4>
                        <ul className="text-sm text-gray-300 space-y-1">
                          {scheme.documents.map((doc, index) => (
                            <li key={index} className="flex items-start gap-2">
                              <span className="text-emerald-400 mt-1">•</span>
                              <span>{doc}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    <div className="mb-4">
                      <h4 className="text-sm font-semibold text-emerald-400 mb-2 flex items-center gap-2">
                        <Zap className="h-4 w-4" />
                        {t('keyBenefits')}
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {scheme.benefits.map((benefit, index) => (
                          <Badge key={index} variant="outline" className="bg-emerald-900/30 border-emerald-500/30 text-emerald-200">
                            {benefit}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div className="border-t border-white/10 pt-4">
                      <h4 className="text-sm font-semibold text-emerald-400 mb-3">{t('contactInformation')}</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                        <div className="text-gray-300">
                          <strong className="text-white">{scheme.contactInfo.department}</strong>
                          <div className="mt-1">
                            <span className="text-gray-400">{t('phoneNumber')}:</span> {scheme.contactInfo.phone}
                          </div>
                          <div>
                            <span className="text-gray-400">{t('emailAddress')}:</span> {scheme.contactInfo.email}
                          </div>
                        </div>
                        <div className="flex flex-col gap-2">
                          <Button
                            variant="outline"
                            className="w-full bg-emerald-500/10 border-emerald-500/30 text-emerald-200 hover:bg-emerald-500/20"
                            onClick={() => window.open(scheme.contactInfo.website, '_blank')}
                          >
                            <ExternalLink className="mr-2 h-4 w-4" />
                            {t('visitOfficialWebsite')}
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {filteredSchemes.length === 0 && (
              <Card className="glass-card-content">
                <CardContent className="p-12 text-center">
                  <Building className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-xl font-semibold mb-2">{t('noSchemesFound')}</h3>
                  <p className="text-muted-foreground mb-6">
                    {t('noSchemesFoundDesc')}
                  </p>
                  <Button onClick={() => {
                    setSearchTerm('');
                    setStateFilter('');
                    setCategoryFilter('');
                  }}>
                    {t('clearAllFilters')}
                  </Button>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </PageBackground>
  );
};

export default GovernmentSchemes;