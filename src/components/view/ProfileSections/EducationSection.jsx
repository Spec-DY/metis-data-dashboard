// Helper function to create simplified labels for chart display
const createSimplifiedLabels = (labels) => {
  return labels.map((label) => {
    // Create simplified versions of long education labels
    if (
      label.includes(
        "No high school diploma or equivalency certificate, no postsecondary"
      )
    ) {
      return "No high school diploma";
    }
    if (
      label.includes(
        "No high school diploma or equivalency certificate, with apprenticeship"
      )
    ) {
      return "No high school diploma + trade certificate";
    }
    if (
      label.includes(
        "No high school diploma or equivalency certificate, with college"
      )
    ) {
      return "No high school diploma + college certificate";
    }
    if (
      label.includes(
        "With high school diploma or equivalency certificate, no postsecondary"
      )
    ) {
      return "High school diploma only";
    }
    if (
      label.includes(
        "With high school diploma or equivalency certificate, with apprenticeship"
      )
    ) {
      return "High school diploma + trade certificate";
    }
    if (
      label.includes(
        "With high school diploma or equivalency certificate, with college"
      )
    ) {
      return "High school diploma + college certificate";
    }
    if (
      label.includes(
        "With high school diploma or equivalency certificate, with university certificate or diploma below bachelor"
      )
    ) {
      return "High school diploma + some university";
    }
    if (
      label.includes(
        "With high school diploma or equivalency certificate, with bachelor's degree"
      )
    ) {
      return "High school diploma + bachelor's degree";
    }
    if (
      label.includes(
        "With high school diploma or equivalency certificate, with university certificate, diploma or degree above bachelor"
      )
    ) {
      return "High school diploma + graduate degree";
    }
    return label;
  });
};

import { useState, useEffect } from "react";
import Card from "@components/common/Card";
import EducationChart from "@components/view/ProfileCharts/EducationChart";
import DataTable from "@components/view/ProfileCharts/DataTable";
import educationData from "@data/education.json";

const EducationSection = () => {
  const [province, setProvince] = useState("ON");
  const [city, setCity] = useState("Cornwall");
  const [cities, setCities] = useState(
    educationData["ON"] ? Object.keys(educationData["ON"]) : []
  );
  const [selectedRegion, setSelectedRegion] = useState({
    province: "ON",
    city: "Cornwall",
    data: educationData["ON"]["Cornwall"],
  });

  // Update cities list when province changes
  useEffect(() => {
    if (province && educationData[province]) {
      setCities(Object.keys(educationData[province]));
      // Only reset city and selectedRegion when province changes
      if (selectedRegion && province !== selectedRegion.province) {
        setCity("");
        setSelectedRegion(null);
      }
    } else {
      setCities([]);
      setCity("");
      setSelectedRegion(null);
    }
  }, [province, selectedRegion]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (province && city && educationData[province][city]) {
      setSelectedRegion({
        province,
        city,
        data: educationData[province][city],
      });
    }
  };

  // Get the current data based on selected region and calculate percentages
  const getCurrentData = () => {
    if (
      !selectedRegion ||
      !selectedRegion.data ||
      !selectedRegion.data.categories ||
      !selectedRegion.data.categories.highestEducation
    ) {
      return null;
    }

    const rawData = selectedRegion.data.categories.highestEducation;

    // Find the total population row (first row)
    const totalRow = rawData.tableData.find(
      (row) => row.educationLevel === "Total Population"
    );
    if (!totalRow) return rawData;

    // Filter out the total population row for chart calculations
    const educationRows = rawData.tableData.filter(
      (row) => row.educationLevel !== "Total Population"
    );

    // Get original and simplified labels
    const originalLabels = educationRows.map((row) => row.educationLevel);
    const simplifiedLabels = createSimplifiedLabels(originalLabels);

    // Calculate percentages for each dataset
    const datasets = [
      {
        label: "Aboriginal",
        data: educationRows.map((row) =>
          totalRow.aboriginal > 0
            ? ((row.aboriginal / totalRow.aboriginal) * 100).toFixed(2)
            : 0
        ),
        backgroundColor: "#90EE90",
      },
      {
        label: "Métis",
        data: educationRows.map((row) =>
          totalRow.metis > 0
            ? ((row.metis / totalRow.metis) * 100).toFixed(2)
            : 0
        ),
        backgroundColor: "#4285F4",
      },
      {
        label: "Non-Aboriginal",
        data: educationRows.map((row) =>
          totalRow.nonAboriginal > 0
            ? ((row.nonAboriginal / totalRow.nonAboriginal) * 100).toFixed(2)
            : 0
        ),
        backgroundColor: "#FF6384",
      },
    ];

    // Create chart data dynamically
    const chartData = {
      labels: simplifiedLabels,
      originalLabels: originalLabels,
      datasets: datasets,
    };

    return {
      tableData: rawData.tableData,
      chartData: chartData,
    };
  };

  const currentData = getCurrentData();

  // Get the display name for the selected region
  const getRegionDisplayName = () => {
    if (!selectedRegion) return "";

    if (selectedRegion.city === "All") {
      return `${selectedRegion.province} Province`;
    }

    return `${selectedRegion.city}, ${selectedRegion.province}`;
  };

  return (
    <div>
      {/* Province and city selection form */}
      <form
        onSubmit={handleSubmit}
        className="mb-4 p-4 bg-gray-50 rounded-lg shadow-sm"
      >
        <div className="flex flex-col md:flex-row md:space-x-4 space-y-4 md:space-y-0">
          <div className="flex-1">
            <label
              htmlFor="province"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Province
            </label>
            <select
              id="province"
              value={province}
              onChange={(e) => setProvince(e.target.value)}
              className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              required
            >
              <option value="">Select Province</option>
              {Object.keys(educationData).map((p) => (
                <option key={p} value={p}>
                  {p}
                </option>
              ))}
            </select>
          </div>

          <div className="flex-1">
            <label
              htmlFor="city"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              City
            </label>
            <select
              id="city"
              value={city}
              onChange={(e) => {
                const newCity = e.target.value;
                setCity(newCity);

                if (province && newCity && educationData[province][newCity]) {
                  setSelectedRegion({
                    province,
                    city: newCity,
                    data: educationData[province][newCity],
                  });
                }
              }}
              className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              disabled={!province}
              required
            >
              <option value="">Select City</option>
              {cities.map((c) => (
                <option key={c} value={c}>
                  {c === "All" ? "Entire Province" : c}
                </option>
              ))}
            </select>
          </div>
        </div>
      </form>

      {/* Chart and table display area */}
      {selectedRegion && currentData ? (
        <Card>
          <div className="flex flex-col">
            {/* Education Chart */}
            <div className="w-full mx-auto p-8">
              <EducationChart
                labels={currentData.chartData.labels}
                originalLabels={currentData.chartData.originalLabels}
                datasets={currentData.chartData.datasets}
                title={`${getRegionDisplayName()} - Highest Education Level`}
                maxPercentage={35}
              />
            </div>
            {/* Education Data Table */}
            <div className="w-full mx-auto p-6 mt-4">
              <DataTable
                data={currentData.tableData}
                labelField="educationLevel"
                columns={[
                  "totalPopulation",
                  "aboriginal",
                  "metis",
                  "nonAboriginal",
                ]}
                columnLabels={{
                  totalPopulation: "Total Population",
                  aboriginal: "Aboriginal",
                  metis: "Métis",
                  nonAboriginal: "Non-Aboriginal",
                }}
                labelHeader="Highest Education"
              />
            </div>
          </div>
        </Card>
      ) : (
        <Card>
          <div className="p-8 text-center text-gray-500">
            Please select a province and city to view the data.
          </div>
        </Card>
      )}
    </div>
  );
};

export default EducationSection;
