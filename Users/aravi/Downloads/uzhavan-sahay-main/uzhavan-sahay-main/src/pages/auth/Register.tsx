import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { Sprout, User, Mail, Phone, MapPin, Crop, Lock } from 'lucide-react';
import tractorBg from '@/assets/kisanai-auth-bg.png';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    state: '',
    farmSize: '',
    mainCrops: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const { register } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (formData.password !== formData.confirmPassword) {
      toast({
        title: "Password Mismatch",
        description: "Passwords do not match. Please try again.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);

    try {
      const success = await register({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        password: formData.password,
        state: formData.state as 'TN' | 'KL',
        farmSize: formData.farmSize,
        mainCrops: formData.mainCrops.split(',').map(crop => crop.trim()),
      });

      if (success) {
        toast({
          title: "Registration Successful",
          description: "Your account has been created. Please login to continue.",
        });
        navigate('/login');
      } else {
        toast({
          title: "Registration Failed",
          description: "Please check your information and try again.",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "An error occurred during registration. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div 
      className="min-h-screen flex items-center justify-center relative overflow-hidden py-8"
      style={{
        backgroundImage: `url(${tractorBg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}
    >
      {/* Dark overlay with blur effect */}
      <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px]"></div>
      
      <div className="relative z-10 w-full max-w-3xl mx-4">
        {/* Logo and Title */}
        <div className="text-center mb-6">
          <div className="flex items-center justify-center gap-3 mb-3">
            <div className="bg-emerald-500 p-2 rounded-lg">
              <Sprout className="h-6 w-6 text-white" />
            </div>
            <h1 className="text-4xl font-bold text-white">
              Kisan <span className="text-emerald-400">Ai</span>
            </h1>
          </div>
          <p className="text-gray-300 text-sm">Intelligent Agriculture for the Future</p>
        </div>

        {/* Register Card */}
        <div className="bg-gradient-to-br from-[#4a5442]/95 to-[#3d4538]/95 backdrop-blur-md rounded-2xl shadow-2xl p-8 border border-white/10">
          <div className="text-center mb-6">
            <h2 className="text-2xl font-semibold text-white mb-2">
              Create Your Agricultural Account
            </h2>
            <p className="text-gray-400 text-sm">Join farmers using smart agriculture technology</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Name and Email Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label htmlFor="name" className="text-sm font-medium text-gray-300">
                  Full Name *
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <Input
                    id="name"
                    placeholder="Enter your full name"
                    value={formData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    className="pl-11 h-12 bg-white/10 border-white/20 text-white placeholder:text-gray-500 focus:border-emerald-500 focus:ring-emerald-500/30"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium text-gray-300">
                  Email Address *
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="farmer@example.com"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    className="pl-11 h-12 bg-white/10 border-white/20 text-white placeholder:text-gray-500 focus:border-emerald-500 focus:ring-emerald-500/30"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Phone and State Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label htmlFor="phone" className="text-sm font-medium text-gray-300">
                  Phone Number
                </label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <Input
                    id="phone"
                    placeholder="+91 9876543210"
                    value={formData.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    className="pl-11 h-12 bg-white/10 border-white/20 text-white placeholder:text-gray-500 focus:border-emerald-500 focus:ring-emerald-500/30"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="state" className="text-sm font-medium text-gray-300">
                  State *
                </label>
                <Select value={formData.state} onValueChange={(value) => handleInputChange('state', value)}>
                  <SelectTrigger className="h-12 bg-white/10 border-white/20 text-white focus:border-emerald-500 focus:ring-emerald-500/30">
                    <SelectValue placeholder="Select your state" className="text-gray-500" />
                  </SelectTrigger>
                  <SelectContent className="bg-[#4a5442] border-white/20">
                    <SelectItem value="TN" className="text-white hover:bg-white/10">Tamil Nadu</SelectItem>
                    <SelectItem value="KL" className="text-white hover:bg-white/10">Kerala</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Farm Size and Main Crops Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label htmlFor="farmSize" className="text-sm font-medium text-gray-300">
                  Farm Size
                </label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <Input
                    id="farmSize"
                    placeholder="e.g., 5 acres"
                    value={formData.farmSize}
                    onChange={(e) => handleInputChange('farmSize', e.target.value)}
                    className="pl-11 h-12 bg-white/10 border-white/20 text-white placeholder:text-gray-500 focus:border-emerald-500 focus:ring-emerald-500/30"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="mainCrops" className="text-sm font-medium text-gray-300">
                  Main Crops
                </label>
                <div className="relative">
                  <Crop className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <Input
                    id="mainCrops"
                    placeholder="e.g., Paddy, Groundnut"
                    value={formData.mainCrops}
                    onChange={(e) => handleInputChange('mainCrops', e.target.value)}
                    className="pl-11 h-12 bg-white/10 border-white/20 text-white placeholder:text-gray-500 focus:border-emerald-500 focus:ring-emerald-500/30"
                  />
                </div>
              </div>
            </div>

            {/* Password and Confirm Password Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label htmlFor="password" className="text-sm font-medium text-gray-300">
                  Password *
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <Input
                    id="password"
                    type="password"
                    placeholder="Create a password"
                    value={formData.password}
                    onChange={(e) => handleInputChange('password', e.target.value)}
                    className="pl-11 h-12 bg-white/10 border-white/20 text-white placeholder:text-gray-500 focus:border-emerald-500 focus:ring-emerald-500/30"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="confirmPassword" className="text-sm font-medium text-gray-300">
                  Confirm Password *
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <Input
                    id="confirmPassword"
                    type="password"
                    placeholder="Confirm your password"
                    value={formData.confirmPassword}
                    onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                    className="pl-11 h-12 bg-white/10 border-white/20 text-white placeholder:text-gray-500 focus:border-emerald-500 focus:ring-emerald-500/30"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Register Button */}
            <Button 
              type="submit" 
              className="w-full h-12 bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white font-semibold rounded-lg shadow-lg shadow-emerald-500/30 transition-all duration-200"
              disabled={isLoading}
            >
              {isLoading ? 'Creating Account...' : (
                <span className="flex items-center justify-center gap-2">
                  Create Account <Sprout className="h-4 w-4" />
                </span>
              )}
            </Button>
          </form>

          {/* Login Link */}
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-400">
              Already have an account?{' '}
              <Link to="/login" className="text-emerald-400 hover:text-emerald-300 font-medium">
                Login
              </Link>
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-6 text-center">
          <p className="text-xs text-gray-400">
            ©2025 KisanAi Technologies. Secure & Encrypted
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;