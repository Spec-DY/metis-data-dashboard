import React, { useState, useEffect } from "react";
import Card from "@components/common/Card";
import LabourChart from "@components/view/ProfileCharts/LabourChart";
import DataTable from "@components/view/ProfileCharts/DataTable";
import labourData from "@data/labour.json";

const labourSection = () => {
  const [province, setProvince] = useState("ON");
  const [city, setCity] = useState("Cornwall");
  const [cities, setCities] = useState(
    labourData["ON"] ? Object.keys(labourData["ON"]) : []
  );
  const [selectedRegion, setSelectedRegion] = useState({
    province: "ON",
    city: "Cornwall",
    data: labourData["ON"]["Cornwall"],
  });
  const [dataType, setDataType] = useState("summary"); // "summary" or "characteristics"

  // Update cities list when province changes
  useEffect(() => {
    if (province && labourData[province]) {
      setCities(Object.keys(labourData[province]));
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
    if (province && city && labourData[province][city]) {
      setSelectedRegion({
        province,
        city,
        data: labourData[province][city],
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
      !selectedRegion.data.categories
    ) {
      return null;
    }

    if (dataType === "summary") {
      return selectedRegion.data.categories.summary;
    } else {
      return selectedRegion.data.categories.characteristics;
    }
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
              {Object.keys(labourData).map((p) => (
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

                if (province && newCity && labourData[province][newCity]) {
                  setSelectedRegion({
                    province,
                    city: newCity,
                    data: labourData[province][newCity],
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

      {/* Data type selector */}
      {selectedRegion && (
        <div className="mb-4">
          <label className="mr-2 font-medium">Data Type:</label>
          <select
            value={dataType}
            onChange={handleDataTypeChange}
            className="px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="summary">Labour Force Summary</option>
            <option value="characteristics">
              Labour Force Characteristics
            </option>
          </select>
        </div>
      )}

      {/* Chart and table display area */}
      {selectedRegion && currentData ? (
        <Card>
          <div className="flex flex-col">
            {dataType === "summary" ? (
              // labour Force Summary - just table
              <div className="w-full mx-auto p-6">
                <h3 className="text-lg font-semibold mb-4">
                  Labour Force Summary - {getRegionDisplayName()}
                </h3>
                <DataTable
                  data={currentData.tableData}
                  labelField="identityGroup"
                  columns={[
                    "totalPopulation",
                    "employed",
                    "unemployed",
                    "notInLabourForce",
                    "participationRate",
                    "employmentRate",
                    "unemploymentRate",
                  ]}
                  columnLabels={{
                    totalPopulation: "Total Population",
                    employed: "Employed",
                    unemployed: "Unemployed",
                    notInLabourForce: "Not in the labour force",
                    participationRate: "Participation rate",
                    employmentRate: "Employment rate",
                    unemploymentRate: "Unemployment rate",
                  }}
                  labelHeader="Identity Group"
                />
              </div>
            ) : (
              // labour Force Characteristics - charts for each identity group
              <div className="w-full mx-auto p-6">
                <h3 className="text-lg font-semibold mb-6">
                  Labour Force Characteristics by Identity Group -{" "}
                  {getRegionDisplayName()}
                </h3>
                {currentData.chartData.map((groupData, index) => (
                  <LabourChart
                    key={index}
                    identityGroup={groupData.identityGroup}
                    data={groupData.data}
                    title={groupData.identityGroup}
                  />
                ))}
              </div>
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

export default labourSection;
