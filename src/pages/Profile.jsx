import React, { useState } from "react";
import CategoryTabs from "@components/common/CategoryTabs";
import Card from "@components/common/Card";
import DropDown from "@components/common/DropDown";
import {
  faGraduationCap,
  faBriefcase,
  faMoneyBill,
  faUsers,
  faHouse,
} from "@fortawesome/free-solid-svg-icons";

export default function Profile() {
  const categories = [
    { id: "demographic", name: "Demographic", icon: faUsers },
    { id: "housing", name: "Housing", icon: faHouse },
    { id: "education", name: "Education", icon: faGraduationCap },
    { id: "labourForce", name: "Labour Force", icon: faBriefcase },
    { id: "income", name: "Income", icon: faMoneyBill },
  ];

  const [currentCategory, setCurrentCategory] = useState(categories[0].id);

  const handleCategoryChange = (categoryId) => {
    setCurrentCategory(categoryId);
  };

  const content = (
    <div className="px-4 py-6">
      <h2 className="text-lg sm:text-2xl font-bold mb-2 text-center">
        {categories.find((cat) => cat.id === currentCategory)?.name} - 2016
      </h2>
      <div className="mt-4 sm:mt-6">
        {/* display content */}
        {currentCategory === "demographic" && (
          <div>
            <Card>demographic content </Card>
          </div>
        )}

        {currentCategory === "housing" && (
          <div>
            <Card>housing content</Card>
          </div>
        )}

        {currentCategory === "education" && (
          <div>
            <Card>Education content goes here.</Card>
          </div>
        )}

        {currentCategory === "labourForce" && (
          <div>
            <p>
              <Card>Labour Force content goes here.</Card>
            </p>
          </div>
        )}

        {currentCategory === "income" && (
          <div>
            <p>
              <Card>Income content goes here.</Card>
            </p>
          </div>
        )}
      </div>
    </div>
  );

  return (
    <div className="w-full max-w-6xl px-4">
      <div className="hidden sm:block">
        <CategoryTabs
          categories={categories}
          currentCategory={currentCategory}
          onChange={handleCategoryChange}
        >
          {content}
        </CategoryTabs>
      </div>

      {/* dropdown for mobile */}
      <div className="block sm:hidden">
        <div className="flex justify-center items-center mb-4">
          <DropDown
            value={currentCategory}
            onChange={handleCategoryChange}
            options={categories}
          />
        </div>
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
          {content}
        </div>
      </div>
    </div>
  );
}
