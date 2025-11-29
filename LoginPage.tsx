import { useState } from 'react';
import { Mail, GraduationCap } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Alert, AlertDescription } from './ui/alert';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface LoginPageProps {
  onLogin: (email: string) => { success: boolean; message?: string };
}

export function LoginPage({ onLogin }: LoginPageProps) {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (!email) {
      setError('Please enter your student email address');
      return;
    }

    if (!email.includes('@')) {
      setError('Please enter a valid email address');
      return;
    }

    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      const result = onLogin(email);
      if (!result.success) {
        setError(result.message || 'Login failed. Please try again.');
      }
      setLoading(false);
    }, 800);
  };

  return (
    <div className="min-h-screen flex flex-col lg:flex-row">
      {/* Left side - Hero Image */}
      <div className="hidden lg:block lg:w-1/2 relative">
        <ImageWithFallback
          src="https://images.unsplash.com/photo-1693011142814-aa33d7d1535c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb2xsZWdlJTIwY2FtcHVzJTIwc3R1ZGVudHN8ZW58MXx8fHwxNzYyMTc2NjU5fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
          alt="College campus"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/70 to-blue-600/50 flex items-center justify-center">
          <div className="text-white text-center px-8">
            <GraduationCap className="w-20 h-20 mx-auto mb-6" />
            <h1 className="text-white mb-4">Campus Fee Portal</h1>
            <p className="text-xl opacity-90">Manage your educational fees with ease</p>
          </div>
        </div>
      </div>

      {/* Right side - Login Form */}
      <div className="flex-1 flex items-center justify-center p-6 lg:p-12 bg-gradient-to-br from-cream-50 to-blue-50">
        <div className="w-full max-w-md">
          {/* Mobile Logo */}
          <div className="lg:hidden text-center mb-8">
            <GraduationCap className="w-16 h-16 mx-auto mb-4 text-blue-600" />
            <h2 className="mb-2">Campus Fee Portal</h2>
            <p className="text-gray-600">Student Login</p>
          </div>

          {/* Login Card */}
          <div className="bg-white rounded-2xl shadow-xl p-8 lg:p-10">
            <div className="mb-8">
              <h2 className="mb-3">Student Login</h2>
              <p className="text-gray-600">
                Enter your student email to access your fee information and make payments
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="email">Student Email Address</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="your.name@college.edu"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-11 h-12"
                    disabled={loading}
                  />
                </div>
              </div>

              {error && (
                <Alert variant="destructive">
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              <Button 
                type="submit" 
                className="w-full h-12 bg-blue-600 hover:bg-blue-700"
                disabled={loading}
              >
                {loading ? 'Signing in...' : 'Sign In'}
              </Button>
            </form>

            {/* Demo credentials */}
            <div className="mt-8 p-4 bg-blue-50 rounded-lg border border-blue-200">
              <p className="text-sm text-blue-800 mb-2">
                <strong>Demo Accounts:</strong>
              </p>
              <ul className="text-sm text-blue-700 space-y-1">
                <li>• student@college.edu</li>
                <li>• sarah.williams@college.edu</li>
                <li>• mike.chen@college.edu</li>
              </ul>
            </div>

            <div className="mt-6 text-center text-sm text-gray-500">
              <p>For assistance, contact the registrar's office</p>
            </div>
          </div>

          <div className="mt-6 text-center text-sm text-gray-500">
            <p>© 2025 Campus Fee Portal. All rights reserved.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
