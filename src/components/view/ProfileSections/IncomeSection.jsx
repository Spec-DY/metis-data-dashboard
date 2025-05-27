import React, { useState, useEffect } from "react";
import Card from "@components/common/Card";
import {
  OverallIncomeChart,
  MetisIncomeByAgeChart,
} from "@components/view/ProfileCharts/IncomeChart";
import DataTable from "@components/view/ProfileCharts/DataTable";
import incomeData from "@data/income.json";

const IncomeSection = () => {
  const [province, setProvince] = useState("ON");
  const [city, setCity] = useState("Cornwall");
  const [cities, setCities] = useState(
    incomeData["ON"] ? Object.keys(incomeData["ON"]) : []
  );
  const [selectedRegion, setSelectedRegion] = useState({
    province: "ON",
    city: "Cornwall",
    data: incomeData["ON"]["Cornwall"],
  });
  const [dataType, setDataType] = useState("overallSummary"); // "overallSummary", "lowIncomeSummary", "metisIncomeByAge"

  // Update cities list when province changes
  useEffect(() => {
    if (province && incomeData[province]) {
      setCities(Object.keys(incomeData[province]));
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
    if (province && city && incomeData[province][city]) {
      setSelectedRegion({
        province,
        city,
        data: incomeData[province][city],
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

    switch (dataType) {
      case "overallSummary":
        return selectedRegion.data.categories.overallSummary;
      case "lowIncomeSummary":
        return selectedRegion.data.categories.lowIncomeSummary;
      case "metisIncomeByAge":
        return selectedRegion.data.categories.metisIncomeByAge;
      default:
        return null;
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
              {Object.keys(incomeData).map((p) => (
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

                if (province && newCity && incomeData[province][newCity]) {
                  setSelectedRegion({
                    province,
                    city: newCity,
                    data: incomeData[province][newCity],
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
            <option value="overallSummary">Overall Income Summary</option>
            <option value="lowIncomeSummary">Low Income Summary</option>
            <option value="metisIncomeByAge">
              Métis Income Stats by Age Group
            </option>
          </select>
        </div>
      )}

      {/* Chart and table display area */}
      {selectedRegion && currentData ? (
        <Card>
          <div className="flex flex-col">
            {dataType === "overallSummary" && (
              <>
                {/* Overall Income Summary Table */}
                <div className="w-full mx-auto p-6 mb-4">
                  <h3 className="text-lg font-semibold mb-4">
                    Overall Income Summary - {getRegionDisplayName()}
                  </h3>
                  <DataTable
                    data={currentData.tableData}
                    labelField="category"
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
                    labelHeader="Category"
                  />
                </div>
                {/* Overall Income Chart */}
                <div className="w-full mx-auto p-6">
                  <OverallIncomeChart
                    data={currentData.chartData}
                    title="Income Comparison by Identity Group"
                  />
                </div>
              </>
            )}

            {dataType === "lowIncomeSummary" && (
              <div className="w-full mx-auto p-6">
                <h3 className="text-lg font-semibold mb-4">
                  Low Income Summary - {getRegionDisplayName()}
                </h3>
                <DataTable
                  data={currentData.tableData}
                  labelField="identityGroup"
                  columns={[
                    "totalPopulationApplicable",
                    "populationLowIncome",
                    "populationNotLowIncome",
                    "prevalenceOfLowIncome",
                  ]}
                  columnLabels={{
                    totalPopulationApplicable: "Total Population Applicable",
                    populationLowIncome: "Population - low income",
                    populationNotLowIncome: "Population - Not in low income",
                    prevalenceOfLowIncome: "Prevalence of low income (%)",
                  }}
                  labelHeader="Identity Group"
                />
              </div>
            )}

            {dataType === "metisIncomeByAge" && (
              <>
                {/* Métis Income by Age Chart */}
                <div className="w-full mx-auto p-6 mb-4">
                  <MetisIncomeByAgeChart
                    data={currentData.chartData}
                    title={`Métis Income Stats by Age Group - ${getRegionDisplayName()}`}
                  />
                </div>
                {/* Métis Income by Age Table */}
                <div className="w-full mx-auto p-6">
                  <DataTable
                    data={currentData.tableData}
                    labelField="ageGroup"
                    columns={[
                      "totalPopulation",
                      "lowIncomePopulation",
                      "notLowIncomePopulation",
                      "prevalenceRate",
                    ]}
                    columnLabels={{
                      totalPopulation: "Total Population",
                      lowIncomePopulation: "Low Income Population",
                      notLowIncomePopulation: "Population not in Low Income",
                      prevalenceRate: "Prevalence of low income (%)",
                    }}
                    labelHeader="Age Group"
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

export default IncomeSection;
