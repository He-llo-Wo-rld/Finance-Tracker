import { DollarSign, TrendingDown, TrendingUp } from "lucide-react"

type StatsCardsProps = {
  balance: number;
  totalIncome: number;
  totalExpenses: number;
};

export const StatsCards = ({ balance, totalIncome, totalExpenses }: StatsCardsProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Balance</p>
                <p
                  className={`text-3xl font-bold ${
                    balance >= 0 ? "text-green-600" : "text-rose-600"
                  }`}
                >
                  £{balance.toFixed(2)}
                </p>
              </div>
              <div
                className={`h-12 w-12 rounded-full flex items-center justify-center ${
                  balance >= 0 ? "bg-green-100" : "bg-rose-100"
                }`}
              >
                <DollarSign
                  className={`h-6 w-6 ${
                    balance >= 0 ? "text-green-600" : "text-rose-600"
                  }`}
                />
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Income</p>
                <p className="text-3xl font-bold text-green-600">
                  £{totalIncome.toFixed(2)}
                </p>
              </div>
              <div className="h-12 w-12 bg-green-100 rounded-full flex items-center justify-center">
                <TrendingUp className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Expenses</p>
                <p className="text-3xl font-bold text-rose-600">
                  £{totalExpenses.toFixed(2)}
                </p>
              </div>
              <div className="h-12 w-12 bg-rose-100 rounded-full flex items-center justify-center">
                <TrendingDown className="h-6 w-6 text-rose-600" />
              </div>
            </div>
          </div>
        </div>)}