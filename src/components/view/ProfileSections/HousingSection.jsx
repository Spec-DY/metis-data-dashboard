import React from "react";
import Card from "@components/common/Card";
import HorizontalBarChart from "../ProfileCharts/HorizontalBarChart";
import BarChart from "../ProfileCharts/BarChart";

export default function HousingSection() {
  return (
    <div>
      <Card>
        {/* Part A this part is Dwelling Condition */}
        <HorizontalBarChart />
        <BarChart />
        <HorizontalBarChart
          labels={["Aboriginal identity", "Métis", "Non-Aboriginal identity"]}
          datasets={[
            {
              label: "One bedroom shortfall",
              data: [88.1, 80.0, 89.25],
              backgroundColor: "#FFD700", // Yellow
            },
            {
              label: "Two bedroom shortfall",
              data: [9.52, 13.33, 8.83],
              backgroundColor: "#FFA500", // Orange
            },
            {
              label: "3+ bedroom shortfall",
              data: [4.76, 0.0, 2.09],
              backgroundColor: "#FF6384", // Pink/Red
            },
          ]}
          maxPercentage={100}
          title="Bedroom Shortfall by Identity Group"
        />
      </Card>
    </div>
  );
}
