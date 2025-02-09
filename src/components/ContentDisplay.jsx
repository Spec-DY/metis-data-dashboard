import MH_Demo_indi_full from "@assets/screenshots/MH_Demo_indi_full.png";
import Card from "./Card";
import SubCategory from "./SubCategory";

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
              src={MH_Demo_indi_full}
              className="rounded-md w-full sm:rounded-2xl"
              alt="metis homeland demographic"
            />
          </div>
        )}

        {category === "health" && (
          <div className="p-2 sm:p-6 items-center flex flex-col">
            <SubCategory onChange={onSubcategoryChange} />
            <div>this is {subcategory}</div>
          </div>
        )}
      </Card>
    </div>
  );
}
