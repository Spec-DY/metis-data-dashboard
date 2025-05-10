import React, { useState, useEffect } from "react";
import Card from "@components/common/Card";
import HorizontalBarChart from "@components/view/ProfileCharts/HorizontalBarChart";
import BarChart from "@components/view/ProfileCharts/BarChart";
import DataTable from "@components/view/ProfileCharts/DataTable";
import housingData from "@data/housing.json";

const HousingSection = () => {
  const [province, setProvince] = useState("ON");
  const [city, setCity] = useState("All");
  const [cities, setCities] = useState(
    housingData["ON"] ? Object.keys(housingData["ON"]) : []
  );
  const [selectedRegion, setSelectedRegion] = useState({
    province: "ON",
    city: "All",
    data: housingData["ON"]["All"],
  });
  const [dataType, setDataType] = useState("dwellingCondition"); // "dwellingCondition" or "housingSuitability"

  // Update cities list when province changes
  useEffect(() => {
    if (province && housingData[province]) {
      setCities(Object.keys(housingData[province]));
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
    if (province && city && housingData[province][city]) {
      setSelectedRegion({
        province,
        city,
        data: housingData[province][city],
      });
    }
  };

  const handleDataTypeChange = (e) => {
    setDataType(e.target.value);
  };

  // Get the current data based on selected region and data type
  const getCurrentData = () => {
    if (
      !selectedRegion ||
      !selectedRegion.data ||
      !selectedRegion.data.categories ||
      !selectedRegion.data.categories[dataType]
    ) {
      return null;
    }
    return selectedRegion.data.categories[dataType];
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
              {Object.keys(housingData).map((p) => (
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

                if (province && newCity && housingData[province][newCity]) {
                  setSelectedRegion({
                    province,
                    city: newCity,
                    data: housingData[province][newCity],
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

      {/* Data type selector - appears only after region selection */}
      {selectedRegion && (
        <div className="mb-4">
          <label className="mr-2 font-medium">Data Type:</label>
          <select
            value={dataType}
            onChange={handleDataTypeChange}
            className="px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="dwellingCondition">Dwelling Condition</option>
            <option value="housingSuitability">Housing Suitability</option>
          </select>
        </div>
      )}

      {/* Chart and table display area */}
      {selectedRegion && currentData ? (
        <Card>
          <div className="flex flex-col">
            {dataType === "dwellingCondition" ? (
              <>
                {/* Dwelling Condition Content */}
                <div className="w-full mx-auto p-8">
                  <HorizontalBarChart
                    labels={currentData.chartData.labels}
                    datasets={currentData.chartData.datasets}
                    title={`${getRegionDisplayName()} - Dwelling Condition`}
                    maxPercentage={100}
                  />
                </div>
                <div className="w-full mx-auto p-6 mt-4">
                  <DataTable
                    data={currentData.tableData}
                    labelField="identityGroup"
                    columns={[
                      "total",
                      "regularMaintenance",
                      "minorRepairs",
                      "majorRepairs",
                    ]}
                    columnLabels={{
                      total: "Total",
                      regularMaintenance: "Regular Maintenance",
                      minorRepairs: "Minor Repairs",
                      majorRepairs: "Major Repairs",
                    }}
                    labelHeader="Identity Group"
                  />
                </div>
              </>
            ) : (
              <>
                {/* Housing Suitability Content */}
                <div className="w-full mx-auto p-8">
                  <BarChart
                    labels={currentData.chartData.labels}
                    datasets={currentData.chartData.datasets.map((dataset) => ({
                      ...dataset,
                      data: dataset.data.map((value) => Math.round(value)),
                    }))}
                    title={`${getRegionDisplayName()} - Housing Suitability`}
                    maxPercentage={100}
                  />
                </div>
                <div className="w-full mx-auto p-8 mt-4">
                  <HorizontalBarChart
                    labels={currentData.chartData.labels}
                    datasets={[
                      {
                        label: "One bedroom shortfall",
                        data: currentData.tableData.map(
                          (item) =>
                            (
                              (item.oneBedroomShortfall / item.notSuitable) *
                              100
                            ).toFixed(2) * 1
                        ),
                        backgroundColor: "#FFD700", // Yellow
                      },
                      {
                        label: "Two bedroom shortfall",
                        data: currentData.tableData.map(
                          (item) =>
                            (
                              (item.twoBedroomShortfall / item.notSuitable) *
                              100
                            ).toFixed(2) * 1
                        ),
                        backgroundColor: "#FFA500", // Orange
                      },
                      {
                        label: "3+ bedroom shortfall",
                        data: currentData.tableData.map(
                          (item) =>
                            (
                              (item.threeOrMoreBedroomShortfall /
                                item.notSuitable) *
                              100
                            ).toFixed(2) * 1
                        ),
                        backgroundColor: "#FF6384", // Pink/Red
                      },
                    ]}
                    maxPercentage={100}
                    title="Bedroom Shortfall by Identity Group"
                  />
                </div>
                <div className="w-full mx-auto p-6 mt-4">
                  <DataTable
                    data={currentData.tableData}
                    labelField="identityGroup"
                    columns={[
                      "totalHousing",
                      "suitable",
                      "notSuitable",
                      "oneBedroomShortfall",
                      "twoBedroomShortfall",
                      "threeOrMoreBedroomShortfall",
                    ]}
                    columnLabels={{
                      totalHousing: "Total Housing",
                      suitable: "Suitable",
                      notSuitable: "Not Suitable",
                      oneBedroomShortfall: "One Bedroom Shortfall",
                      twoBedroomShortfall: "Two Bedroom Shortfall",
                      threeOrMoreBedroomShortfall: "3+ Bedroom Shortfall",
                    }}
                    labelHeader="Identity Group"
                  />
                </div>
              </>
            )}
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

export default HousingSection;
