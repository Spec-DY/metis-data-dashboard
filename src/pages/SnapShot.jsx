import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ContentDisplay from "@components/view/ContentDisplay";
import Dropdown from "@components/common/Dropdown";
import CategoryTabs from "@components/common/CategoryTabs";
import BacktoTop from "@components/common/BacktoTop";
import {
  faGraduationCap,
  faHandshakeAngle,
  faHeartPulse,
  faUsers,
  faHouse,
  faBriefcase,
  faGlobe,
} from "@fortawesome/free-solid-svg-icons";

const PROVINCES = [
  { id: "Homeland", name: "Métis Homeland" },
  { id: "BC", name: "British Columbia" },
  { id: "AB", name: "Alberta" },
  { id: "SK", name: "Saskatchewan" },
  { id: "MB", name: "Manitoba" },
  { id: "ON", name: "Ontario" },
];

const CATEGORIES = [
  { id: "demographic", name: "Demographic", icon: faUsers },
  { id: "health", name: "Health", icon: faHeartPulse },
  { id: "education", name: "Education", icon: faGraduationCap },
  { id: "housing", name: "Housing", icon: faHouse },
  { id: "labor", name: "Labor Activities", icon: faBriefcase },
  { id: "language", name: "Language", icon: faGlobe },
  { id: "community", name: "Community", icon: faHandshakeAngle },
];

export default function SnapShot() {
  const navigate = useNavigate();
  const { province, category, subcategory } = useParams();

  const [currentProvince, setCurrentProvince] = useState(
    province || "Homeland"
  );
  const [currentCategory, setCurrentCategory] = useState(
    category || "demographic"
  );

  const [currentSubCategory, setCurrentSubCategory] = useState(
    subcategory || "general"
  );

  const currentCategoryName = CATEGORIES.find(
    (cat) => cat.id === currentCategory
  )?.name;
  const currentProvinceName = PROVINCES.find(
    (prov) => prov.id === currentProvince
  )?.name;

  useEffect(() => {
    console.log("province", province);
    console.log("category", category);
    console.log("subcategory", subcategory);
    if (!province || !category) {
      navigate(`/snapshot/${currentProvince}/${currentCategory}`);
    }
  }, [province, category]);

  const handleProvinceChange = (provinceId) => {
    setCurrentProvince(provinceId);
    // if no subcategory, navigate to category similar for below handle functions
    navigate(`/snapshot/${provinceId}/${currentCategory}`);
  };

  const handleCategoryChange = (categoryId) => {
    setCurrentCategory(categoryId);

    if (categoryId === "health") {
      setCurrentSubCategory("general"); // this is actually redundant since usestate already set it to general
      navigate(`/snapshot/${currentProvince}/${categoryId}/general`);
    } else {
      setCurrentSubCategory(null);
      navigate(`/snapshot/${currentProvince}/${categoryId}`);
    }
  };

  const handleSubCategoryChange = (subcategoryId) => {
    console.log("previous subcategory: ", subcategoryId);
    setCurrentSubCategory(subcategoryId);
    console.log("current subcategory: ", subcategoryId);
    navigate(
      `/snapshot/${currentProvince}/${currentCategory}/${subcategoryId}`
    );
  };

  const content = (
    <div className="px-4 py-6">
      <h2 className="text-lg sm:text-2xl font-bold mb-2 text-center">
        {currentProvinceName} - {currentCategoryName}
      </h2>
      <div className="mt-4 sm:mt-6">
        <ContentDisplay
          province={currentProvince}
          category={currentCategory}
          subcategory={currentSubCategory}
          onSubcategoryChange={handleSubCategoryChange}
        />
      </div>
    </div>
  );

  return (
    <div className="w-full max-w-6xl px-4">
      {/* province tabs */}

      <div className="block sm:hidden">
        <div className="flex justify-center items-center">
          <Dropdown
            value={currentProvince}
            options={PROVINCES}
            onChange={handleProvinceChange}
          />
        </div>
      </div>

      <div className="hidden sm:block">
        {/* display province tab in big screen */}
        <div className="mb-6 border-b border-gray-400">
          <div className="flex space-x-6 overflow-auto bg-linear-to-b from-zinc-200 to-zinc-50 rounded-lg">
            {PROVINCES.map((prov) => (
              <button
                key={prov.id}
                onClick={() => handleProvinceChange(prov.id)}
                className={`
                  cursor-pointer
                  relative py-4 px-3
                  text-lg font-medium
                  transition-colors duration-200
                  hover:bg-gray-50 rounded-md
                  ${
                    currentProvince === prov.id
                      ? "text-blue-500"
                      : "text-gray-600 hover:text-gray-900"
                  }
                
                `}
              >
                {prov.name}
                <span
                  className={`absolute bottom-0 left-0 h-0.5 bg-blue-600 transition-all duration-300 ease-out
                    ${currentProvince === prov.id ? "w-full" : "w-0"}
                  `}
                />
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-4"></div>

      {/* category tabs */}

      {/* for small screen */}
      <div className="block sm:hidden">
        <div className="flex justify-center items-center mb-4">
          <Dropdown
            value={currentCategory}
            options={CATEGORIES}
            onChange={handleCategoryChange}
          />
        </div>
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
          {content}
        </div>
      </div>
      {/* for big screen */}
      <div className="hidden sm:block">
        <CategoryTabs
          categories={CATEGORIES}
          currentCategory={currentCategory}
          onChange={handleCategoryChange}
        >
          {content}
        </CategoryTabs>
      </div>

      <div className="fixed bottom-6 right-6 z-50 hidden sm:block">
        <BacktoTop />
      </div>
    </div>
  );
}
