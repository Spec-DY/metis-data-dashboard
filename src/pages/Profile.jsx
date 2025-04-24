import React, { useState } from "react";
import CategoryTabs from "@components/CategoryTabs";
import {
  faGraduationCap,
  faBriefcase,
  faMoneyBill,
  faUsers,
  faHouse,
} from "@fortawesome/free-solid-svg-icons";

export default function Profile() {
  const categories = [
    { id: "demographics", name: "Demographics", icon: faUsers },
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
        {categories.find((cat) => cat.id === currentCategory)?.name}
      </h2>
      <div className="mt-4 sm:mt-6">
        {/* display content */}
        {currentCategory === "demographics" && (
          <div>
            <p>Demographics content goes here.</p>
          </div>
        )}

        {currentCategory === "housing" && (
          <div>
            <p>Housing content goes here.</p>
          </div>
        )}

        {currentCategory === "education" && (
          <div>
            <p>Education content goes here.</p>
          </div>
        )}

        {currentCategory === "labourForce" && (
          <div>
            <p>Labour Force content goes here.</p>
          </div>
        )}

        {currentCategory === "income" && (
          <div>
            <p>Income content goes here.</p>
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

      {/* dropdown for mobile） */}
      <div className="block sm:hidden">
        <div className="flex justify-center items-center mb-4">
          <select
            value={currentCategory}
            onChange={(e) => handleCategoryChange(e.target.value)}
            className="rounded border border-gray-300 py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.name}
              </option>
            ))}
          </select>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
          {content}
        </div>
      </div>
    </div>
  );
}
