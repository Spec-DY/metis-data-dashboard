import MH_demo_full from "@MH/MH_demo_full.png";
import Card from "./Card";
import SubCategory from "./SubCategory";
import MH_general_health from "@MH/MH_general_health_full.png";
import MH_mental_health from "@MH/MH_mental_health_full.png";
import MH_chronic_conditions from "@MH/MH_chronic_health_full.png";

export default function ContentDisplay({
  province,
  category,
  subcategory,
  onSubcategoryChange,
}) {
  return (
    <div>
      <Card>
        {province === "Homeland" && category === "demographic" && (
          <div className="p-2 sm:p-6">
            <img
              src={MH_demo_full}
              className="rounded-md w-full sm:rounded-2xl"
              alt="metis homeland demographic"
            />
          </div>
        )}

        {category === "health" && (
          <div className="p-2 sm:p-6 items-center flex flex-col">
            <SubCategory onChange={onSubcategoryChange} />
            <div className="mt-6">
              {subcategory === "general" && (
                <img
                  src={MH_general_health}
                  className="rounded-md w-full sm:rounded-2xl"
                  alt="metis general health"
                />
              )}

              {subcategory === "mental" && (
                <img
                  src={MH_mental_health}
                  className="rounded-md w-full sm:rounded-2xl"
                  alt="metis mental health"
                />
              )}

              {subcategory === "chronic" && (
                <img
                  src={MH_chronic_conditions}
                  className="rounded-md w-full sm:rounded-2xl"
                  alt="metis chronic conditions"
                />
              )}
            </div>
          </div>
        )}
      </Card>
    </div>
  );
}
