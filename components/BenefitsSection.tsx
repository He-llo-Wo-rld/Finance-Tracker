import {
  BarChart3,
  Shield,
  Smartphone,
  TrendingUp,
  Users,
  Zap,
} from "lucide-react";

export const BenefitsSection = () => {
  return (
    <section className="py-20 px-4 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Why Choose Finance Tracker?
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="flex items-start space-x-4">
            <div className="bg-blue-100 w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0">
              <Shield className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Secure & Private
              </h3>
              <p className="text-gray-600">
                Your financial data is encrypted and stored securely. We never
                share your information.
              </p>
            </div>
          </div>

          <div className="flex items-start space-x-4">
            <div className="bg-green-100 w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0">
              <Smartphone className="h-6 w-6 text-green-600" />
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Mobile Friendly
              </h3>
              <p className="text-gray-600">
                Access your finances on any device. Responsive design works
                perfectly on mobile.
              </p>
            </div>
          </div>

          <div className="flex items-start space-x-4">
            <div className="bg-purple-100 w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0">
              <Zap className="h-6 w-6 text-purple-600" />
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Fast & Simple
              </h3>
              <p className="text-gray-600">
                Add transactions quickly and get instant insights into your
                spending habits.
              </p>
            </div>
          </div>

          <div className="flex items-start space-x-4">
            <div className="bg-orange-100 w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0">
              <Users className="h-6 w-6 text-orange-600" />
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Multi-User Support
              </h3>
              <p className="text-gray-600">
                Each user has their own secure account with personal financial
                data.
              </p>
            </div>
          </div>

          <div className="flex items-start space-x-4">
            <div className="bg-red-100 w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0">
              <BarChart3 className="h-6 w-6 text-red-600" />
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Rich Analytics
              </h3>
              <p className="text-gray-600">
                Comprehensive charts and graphs to visualize your financial
                journey.
              </p>
            </div>
          </div>

          <div className="flex items-start space-x-4">
            <div className="bg-indigo-100 w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0">
              <TrendingUp className="h-6 w-6 text-indigo-600" />
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Financial Goals
              </h3>
              <p className="text-gray-600">
                Track your progress and make informed decisions about your
                financial future.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
