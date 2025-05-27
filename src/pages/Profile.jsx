import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import CategoryTabs from "@components/common/CategoryTabs";
import DropDown from "@components/common/DropDown";
import DemographicSection from "@components/view/ProfileSections/DemographicSection";
import {
  faGraduationCap,
  faBriefcase,
  faMoneyBill,
  faUsers,
  faHouse,
} from "@fortawesome/free-solid-svg-icons";
import HousingSection from "../components/view/ProfileSections/HousingSection";
import EducationSection from "../components/view/ProfileSections/EducationSection";
import LaborSection from "../components/view/ProfileSections/LaborSection";
import IncomeSection from "../components/view/ProfileSections/IncomeSection";

export default function Profile() {
  const navigate = useNavigate();
  const { category } = useParams();

  const categories = [
    { id: "demographic", name: "Demographic", icon: faUsers },
    { id: "housing", name: "Housing", icon: faHouse },
    { id: "education", name: "Education", icon: faGraduationCap },
    { id: "labourForce", name: "Labour Force", icon: faBriefcase },
    { id: "income", name: "Income", icon: faMoneyBill },
  ];

  // initialize currentCategory based on URL parameter or default to first category
  const [currentCategory, setCurrentCategory] = useState(
    category && categories.find((cat) => cat.id === category)
      ? category
      : categories[0].id
  );

  // update currentCategory when URL parameter changes
  useEffect(() => {
    if (category && categories.find((cat) => cat.id === category)) {
      setCurrentCategory(category);
    }
  }, [category]);

  const handleCategoryChange = (categoryId) => {
    setCurrentCategory(categoryId);
    // update the URL
    navigate(`/profile/${categoryId}`);
  };

  const content = (
    <div className="px-4 py-6">
      <h2 className="text-lg sm:text-2xl font-bold mb-2 text-center">
        {categories.find((cat) => cat.id === currentCategory)?.name} - 2016
      </h2>
      <div className="mt-4 sm:mt-6">
        {/* Display different content based on the selected category */}

        {currentCategory === "demographic" && <DemographicSection />}

        {currentCategory === "housing" && <HousingSection />}

        {currentCategory === "education" && <EducationSection />}

        {currentCategory === "labourForce" && <LaborSection />}

        {currentCategory === "income" && <IncomeSection />}
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
