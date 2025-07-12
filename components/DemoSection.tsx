import DemoAnalytics from "./DemoAnalytics";

export const DemoSection = () => {
  return (
    <section id="demo" className="py-20 px-4 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            See It In Action
          </h2>
          <p className="text-xl text-gray-600">
            Explore our analytics dashboard with sample data
          </p>
        </div>

        <DemoAnalytics />
      </div>
    </section>
  );
};
