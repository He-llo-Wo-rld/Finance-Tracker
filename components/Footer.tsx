export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <h3 className="text-xl font-bold mb-4">Finance Tracker</h3>
            <p className="text-gray-400 mb-4">
              Simple and powerful personal finance management. Take control of
              your money with our comprehensive analytics and tracking tools.
            </p>
            <p className="text-sm text-gray-500">
              © {currentYear} Finance Tracker. All rights reserved.
            </p>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">Features</h4>
            <ul className="space-y-2 text-gray-400">
              <li>Income Tracking</li>
              <li>Expense Management</li>
              <li>Category Analysis</li>
              <li>Monthly Reports</li>
              <li>Trend Analysis</li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">Support</h4>
            <ul className="space-y-2 text-gray-400">
              <li>Help Center</li>
              <li>Privacy Policy</li>
              <li>Terms of Service</li>
              <li>Contact Us</li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}
