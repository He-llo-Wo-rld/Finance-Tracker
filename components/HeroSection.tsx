import { BarChart3, DollarSign, Shield, TrendingUp } from "lucide-react";

export default function HeroSection() {
  return (
    <div className="relative bg-gradient-to-br from-blue-50 to-indigo-100 rounded-xl p-8 mb-8 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-4 right-4">
          <BarChart3 className="h-16 w-16 text-blue-600" />
        </div>
        <div className="absolute bottom-4 left-4">
          <TrendingUp className="h-12 w-12 text-blue-600" />
        </div>
        <div className="absolute top-1/2 right-1/3">
          <DollarSign className="h-8 w-8 text-blue-600" />
        </div>
      </div>

      <div className="relative z-10">
        <div className="max-w-3xl">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Take control of your <span className="text-blue-600">finances</span>
          </h1>
          <p className="text-xl text-gray-600 mb-6 leading-relaxed">
            Simple and convenient way to track your income and expenses. Analyze
            your financial habits and make smart decisions.
          </p>

          {/* Features */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
            <div className="flex items-center space-x-3 bg-white/50 rounded-lg p-4">
              <div className="h-10 w-10 bg-blue-100 rounded-full flex items-center justify-center">
                <TrendingUp className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Analytics</h3>
                <p className="text-sm text-gray-600">Charts and reports</p>
              </div>
            </div>

            <div className="flex items-center space-x-3 bg-white/50 rounded-lg p-4">
              <div className="h-10 w-10 bg-green-100 rounded-full flex items-center justify-center">
                <DollarSign className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Categories</h3>
                <p className="text-sm text-gray-600">Expense organization</p>
              </div>
            </div>

            <div className="flex items-center space-x-3 bg-white/50 rounded-lg p-4">
              <div className="h-10 w-10 bg-purple-100 rounded-full flex items-center justify-center">
                <Shield className="h-5 w-5 text-purple-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Security</h3>
                <p className="text-sm text-gray-600">Protected data</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
