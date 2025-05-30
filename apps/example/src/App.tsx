import React from "react";
import { LeadCard, AnalyticsCard } from "@salesflow/ui-components";

const App: React.FC = () => {
  return (
    <div className="p-8 max-w-4xl mx-auto">  
      <h1 className="text-3xl font-bold mb-8">SalesFlow Demo</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <AnalyticsCard
          title="Total Sales"   
          value={125000}
          change={12.5}      
          format="currency"
        />
        <AnalyticsCard
          title="Conversion Rate"
          value={24.5}
          change={-2.1}
          format="percentage"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <LeadCard
          name="John Doe"  
          status="qualified"  
          email="john@example.com"
          company="Tech Corp"  
          value={50000}
          lastContact="2024-03-15"
        />
        <LeadCard
          name="Jane Smith"
          status="new"
          email="jane@example.com"
          company="Digital Solutions"
          value={75000}
        />
      </div>
    </div>
  );
};

export default App;
