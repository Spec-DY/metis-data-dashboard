import MH_Demo_indi_full from "@assets/screenshots/MH_Demo_indi_full.png";
import Card from "./Card";

export default function ContentDisplay({ province, category }) {
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
      </Card>

      {province === "Homeland" && category === "health" && <Card />}
    </div>
  );
}
