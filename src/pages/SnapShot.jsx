import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ContentDisplay from "../components/Content";
import DropDown from "../components/DropDown";

const PROVINCES = [
  { id: "Homeland", name: "Métis Homeland" },
  { id: "BC", name: "British Columbia" },
  { id: "AB", name: "Alberta" },
  { id: "SK", name: "Saskatchewan" },
  { id: "MB", name: "Manitoba" },
  { id: "ON", name: "Ontario" },
];

const CATEGORIES = [
  { id: "demographic", name: "Demographic" },
  { id: "health", name: "Health" },
  { id: "education", name: "Education" },
  { id: "housing", name: "Housing" },
  { id: "labor", name: "Labor Activities" },
  { id: "language", name: "Language" },
  { id: "community", name: "Community" },
];

export default function SnapShot() {
  const navigate = useNavigate();
  const { province, category } = useParams();

  const [currentProvince, setCurrentProvince] = useState(
    province || "Homeland"
  );
  const [currentCategory, setCurrentCategory] = useState(
    category || "demographic"
  );

  useEffect(() => {
    console.log("province", province);
    console.log("category", category);
    if (!province || !category) {
      navigate(`/snapshot/${currentProvince}/${currentCategory}`);
    }
  }, [province, category]);

  const handleProvinceChange = (provinceId) => {
    setCurrentProvince(provinceId);
    navigate(`/snapshot/${provinceId}/${currentCategory}`);
  };

  const handleCategoryChange = (categoryId) => {
    setCurrentCategory(categoryId);
    navigate(`/snapshot/${currentProvince}/${categoryId}`);
  };

  return (
    <div className="w-full max-w-6xl px-4">
      {/* province tabs */}

      <div className="block sm:hidden">
        <div className="flex justify-center items-center">
          <DropDown
            value={currentProvince}
            options={PROVINCES}
            onChange={handleProvinceChange}
          />
        </div>
      </div>

      <div className="hidden sm:block">
        <div className="mb-8 border-b border-gray-400">
          <div className="flex space-x-8">
            {PROVINCES.map((prov) => (
              <button
                key={prov.id}
                onClick={() => handleProvinceChange(prov.id)}
                className={`
                py-4 px-1 relative
                text-lg font-medium
                hover:text-blue-600
                ${
                  currentProvince === prov.id
                    ? "text-blue-600"
                    : "text-gray-800"
                }
              `}
              >
                {prov.name}
                {currentProvince === prov.id && (
                  <span className="absolute bottom-0 inset-x-0 h-0.5 bg-blue-600"></span>
                )}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-4"></div>

      {/* category tabs */}
      <div className="block sm:hidden">
        <div className="flex justify-center items-center">
          <DropDown
            value={currentCategory}
            options={CATEGORIES}
            onChange={handleCategoryChange}
          />
        </div>
      </div>

      <div className="hidden sm:block">
        <div className="mb-6 border-b border-gray-200">
          <div className="flex space-x-6 flex-wrap">
            {CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => handleCategoryChange(cat.id)}
                className={`
                
                py-3 px-1 relative
                text-md font-medium
                hover:text-indigo-600
                ${
                  currentCategory === cat.id
                    ? "text-indigo-600"
                    : "text-gray-700"
                }
              `}
              >
                {cat.name}
                {currentCategory === cat.id && (
                  <span className="absolute bottom-0 inset-x-0 h-0.5 bg-indigo-600"></span>
                )}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* contents */}
      <div className="mt-6">
        <ContentDisplay province={currentProvince} category={currentCategory} />
      </div>
    </div>
  );
}
