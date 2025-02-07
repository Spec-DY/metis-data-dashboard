import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ContentDisplay from "../components/Content";

const PROVINCES = [
  { id: "BC", name: "British Columbia" },
  { id: "AB", name: "Alberta" },
];

const CATEGORIES = [
  { id: "health", name: "Health" },
  { id: "demographic", name: "Demographic" },
  { id: "labor", name: "Labor" },
];

export default function SnapShot() {
  const navigate = useNavigate();
  const { province, category } = useParams();

  const [currentProvince, setCurrentProvince] = useState(province || "BC");
  const [currentCategory, setCurrentCategory] = useState(category || "health");

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
      {/* 省份选择 - 一级导航 */}
      <div className="mb-8 border-b border-gray-200">
        <div className="flex space-x-8">
          {PROVINCES.map((prov) => (
            <button
              key={prov.id}
              onClick={() => handleProvinceChange(prov.id)}
              className={`
                py-4 px-1 relative
                text-sm font-medium
                hover:text-blue-600
                ${
                  currentProvince === prov.id
                    ? "text-blue-600"
                    : "text-gray-500"
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

      {/* 类别选择 - 二级导航 */}
      <div className="mb-6 border-b border-gray-200">
        <div className="flex space-x-6">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => handleCategoryChange(cat.id)}
              className={`
                py-3 px-1 relative
                text-sm font-medium
                hover:text-indigo-600
                ${
                  currentCategory === cat.id
                    ? "text-indigo-600"
                    : "text-gray-500"
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

      {/* 内容区域 */}
      <div className="mt-6">
        <ContentDisplay province={currentProvince} category={currentCategory} />
      </div>
    </div>
  );
}
