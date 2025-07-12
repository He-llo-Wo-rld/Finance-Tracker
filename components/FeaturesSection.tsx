import { BarChart3, Calculator, PieChart, TrendingUp } from "lucide-react";

export const FeaturesSection = () => {
  return (
    <section className="py-20 px-4 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Powerful Features
          </h2>
          <p className="text-xl text-gray-600">
            Everything you need to manage your personal finances
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="text-center p-6">
            <div className="bg-blue-100 w-16 h-16 rounded-xl flex items-center justify-center mx-auto mb-4">
              <BarChart3 className="h-8 w-8 text-blue-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Monthly & Yearly Analysis
            </h3>
            <p className="text-gray-600">
              Track your income and expenses with detailed monthly and yearly
              breakdowns
            </p>
          </div>

          <div className="text-center p-6">
            <div className="bg-green-100 w-16 h-16 rounded-xl flex items-center justify-center mx-auto mb-4">
              <PieChart className="h-8 w-8 text-green-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Category Insights
            </h3>
            <p className="text-gray-600">
              Visualize your spending patterns with detailed category breakdowns
            </p>
          </div>

          <div className="text-center p-6">
            <div className="bg-purple-100 w-16 h-16 rounded-xl flex items-center justify-center mx-auto mb-4">
              <TrendingUp className="h-8 w-8 text-purple-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Trend Analysis
            </h3>
            <p className="text-gray-600">
              Monitor your financial trends and identify patterns over time
            </p>
          </div>

          <div className="text-center p-6">
            <div className="bg-orange-100 w-16 h-16 rounded-xl flex items-center justify-center mx-auto mb-4">
              <Calculator className="h-8 w-8 text-orange-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Smart Calculations
            </h3>
            <p className="text-gray-600">
              Automatic calculations with real-time balance updates
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
