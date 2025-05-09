import React, { useState, useEffect } from "react";
import Card from "@components/common/Card";
import HorizontalStackedBarChart from "@components/view/ProfileCharts/HorizontalStackedBarChart";
import DataTable from "@components/view/ProfileCharts/DataTable";
import demographicsData from "@data/demographics.json";

const DemographicSection = () => {
  const [province, setProvince] = useState("ON");
  const [city, setCity] = useState("All");
  const [cities, setCities] = useState(
    demographicsData["ON"] ? Object.keys(demographicsData["ON"]) : []
  );
  const [selectedRegion, setSelectedRegion] = useState({
    province: "ON",
    city: "All",
    data: demographicsData["ON"]["All"],
  });
  const [dataType, setDataType] = useState("ageDistribution"); // "ageDistribution" or "familyStatus"

  // Initialize the cities state with the list of cities in the ON province

  // Then modify the useEffect that depends on the province
  useEffect(() => {
    // Update the city list only on non-initial renders
    if (province && demographicsData[province]) {
      setCities(Object.keys(demographicsData[province]));
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
    if (province && city && demographicsData[province][city]) {
      setSelectedRegion({
        province,
        city,
        data: demographicsData[province][city],
      });
    }
  };

  const handleDataTypeChange = (e) => {
    setDataType(e.target.value);
  };

  // based on the selected region and data type, get the current data
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

  // get the display name for the selected region
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
              {Object.keys(demographicsData).map((p) => (
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

                if (
                  province &&
                  newCity &&
                  demographicsData[province][newCity]
                ) {
                  setSelectedRegion({
                    province,
                    city: newCity,
                    data: demographicsData[province][newCity],
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
            <option value="ageDistribution">Age Distribution</option>
            <option value="familyStatus">Family Status</option>
          </select>
        </div>
      )}

      {/* Chart and table display area */}
      {selectedRegion && currentData ? (
        <Card>
          <div className="flex flex-col">
            <div className="w-full mx-auto p-6">
              <HorizontalStackedBarChart
                labels={currentData.chartData.labels}
                datasets={currentData.chartData.datasets}
                title={`${getRegionDisplayName()} - ${
                  dataType === "ageDistribution"
                    ? "Age Distribution"
                    : "Family Status"
                }`}
              />
            </div>
            <div className="w-full mx-auto p-6 mt-4">
              <DataTable
                data={currentData.tableData}
                labelField="ageGroup"
                columns={["total", "aboriginal", "metis", "nonAboriginal"]}
                columnLabels={{
                  total: "Total",
                  aboriginal: "Aboriginal",
                  metis: "Métis",
                  nonAboriginal: "Non-Aboriginal",
                }}
                labelHeader={
                  dataType === "ageDistribution" ? "Age Group" : "Family Type"
                }
              />
            </div>
          </div>
        </Card>
      ) : (
        <Card>
          <div className="p-8 text-center text-gray-500">
            Please select a province and city, then click Submit to view data
          </div>
        </Card>
      )}
    </div>
  );
};

export default DemographicSection;
