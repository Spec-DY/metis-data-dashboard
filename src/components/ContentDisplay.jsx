import { motion } from "framer-motion";
import Card from "@components/Card";
import SubCategory from "@components/SubCategory";

import MH_demographic from "@MH/MH_demographic.png";
import MH_general_health from "@MH/MH_general_health.png";
import MH_mental_health from "@MH/MH_mental_health.png";
import MH_chronic_conditions from "@MH/MH_chronic_health.png";
import MH_lifestyle_part1 from "@MH/MH_lifestyle_health_part1.png";
import MH_lifestyle_part2 from "@MH/MH_lifestyle_health_part2.png";
import MH_healthcare_health from "@MH/MH_healthcare_health.png";
import MH_disability_health from "@MH/MH_disability_health.png";
import MH_education from "@MH/MH_education.png";
import MH_housing from "@MH/MH_housing.png";
import MH_labor from "@MH/MH_labor.png";
import MH_language from "@MH/MH_language.png";
import MH_community from "@MH/MH_community.png";

import BC_demographic from "@BC/BC_demographic.png";
import BC_general_health from "@BC/BC_general_health.png";
import BC_mental_health from "@BC/BC_mental_health.png";
import BC_chronic_conditions from "@BC/BC_chronic_health.png";
import BC_lifestyle_part1 from "@BC/BC_lifestyle_health_part1.png";
import BC_lifestyle_part2 from "@BC/BC_lifestyle_health_part2.png";
import BC_healthcare_health from "@BC/BC_healthcare_health.png";
import BC_disability_health from "@BC/BC_disability_health.png";
import BC_education from "@BC/BC_education.png";
import BC_housing from "@BC/BC_housing.png";
import BC_labor from "@BC/BC_labor.png";
import BC_language from "@BC/BC_language.png";
import BC_community from "@BC/BC_community.png";

import AB_demographic from "@AB/AB_demographic.png";
import AB_general_health from "@AB/AB_general_health.png";
import AB_mental_health from "@AB/AB_mental_health.png";
import AB_chronic_conditions from "@AB/AB_chronic_health.png";
import AB_lifestyle_part1 from "@AB/AB_lifestyle_health_part1.png";
import AB_lifestyle_part2 from "@AB/AB_lifestyle_health_part2.png";
import AB_healthcare_health from "@AB/AB_healthcare_health.png";
import AB_disability_health from "@AB/AB_disability_health.png";
import AB_education from "@AB/AB_education.png";
import AB_housing from "@AB/AB_housing.png";
import AB_labor from "@AB/AB_labor.png";
import AB_language from "@AB/AB_language.png";
import AB_community from "@AB/AB_community.png";

import SK_demographic from "@SK/SK_demographic.png";
import SK_general_health from "@SK/SK_general_health.png";
import SK_mental_health from "@SK/SK_mental_health.png";
import SK_chronic_conditions from "@SK/SK_chronic_health.png";
import SK_lifestyle_part1 from "@SK/SK_lifestyle_health_part1.png";
import SK_lifestyle_part2 from "@SK/SK_lifestyle_health_part2.png";
import SK_healthcare_health from "@SK/SK_healthcare_health.png";
import SK_disability_health from "@SK/SK_disability_health.png";
import SK_education from "@SK/SK_education.png";
import SK_housing from "@SK/SK_housing.png";
import SK_labor from "@SK/SK_labor.png";
import SK_language from "@SK/SK_language.png";
import SK_community from "@SK/SK_community.png";

import MB_demographic from "@MB/MB_demographic.png";
import MB_general_health from "@MB/MB_general_health.png";
import MB_mental_health from "@MB/MB_mental_health.png";
import MB_chronic_conditions from "@MB/MB_chronic_health.png";
import MB_lifestyle_part1 from "@MB/MB_lifestyle_health_part1.png";
import MB_lifestyle_part2 from "@MB/MB_lifestyle_health_part2.png";
import MB_healthcare_health from "@MB/MB_healthcare_health.png";
import MB_disability_health from "@MB/MB_disability_health.png";
import MB_education from "@MB/MB_education.png";
import MB_housing from "@MB/MB_housing.png";
import MB_labor from "@MB/MB_labor.png";
import MB_language from "@MB/MB_language.png";
import MB_community from "@MB/MB_community.png";

import ON_demographic from "@ON/ON_demographic.png";
import ON_general_health from "@ON/ON_general_health.png";
import ON_mental_health from "@ON/ON_mental_health.png";
import ON_chronic_conditions from "@ON/ON_chronic_health.png";
import ON_lifestyle_part1 from "@ON/ON_lifestyle_health_part1.png";
import ON_lifestyle_part2 from "@ON/ON_lifestyle_health_part2.png";
import ON_healthcare_health from "@ON/ON_healthcare_health.png";
import ON_disability_health from "@ON/ON_disability_health.png";
import ON_education from "@ON/ON_education.png";
import ON_housing from "@ON/ON_housing.png";
import ON_labor from "@ON/ON_labor.png";
import ON_language from "@ON/ON_language.png";
import ON_community from "@ON/ON_community.png";

export default function ContentDisplay({
  province,
  category,
  subcategory,
  onSubcategoryChange,
}) {
  const imageVariants = {
    initial: {
      scale: 0.8,
      opacity: 0.5,
    },
    animate: {
      scale: 1,
      opacity: 1,
      transition: {
        duration: 0.4,
        ease: "easeOut",
      },
    },
  };

  const renderImage = (src, alt) => (
    <motion.div
      key={src}
      initial="initial"
      animate="animate"
      variants={imageVariants}
      className="w-full"
    >
      <img src={src} className="rounded-md w-full sm:rounded-2xl" alt={alt} />
    </motion.div>
  );

  return (
    <div>
      <Card>
        {/* ===========Homeland============ */}

        {province === "Homeland" && category === "demographic" && (
          <div className="p-2 sm:p-6">
            {renderImage(MH_demographic, "metis homeland demographic")}
          </div>
        )}

        {province === "Homeland" && category === "health" && (
          <div className="p-2 sm:p-6 items-center flex flex-col">
            <SubCategory
              onChange={onSubcategoryChange}
              currentSubcategory={subcategory}
              province={province}
              category={category}
            />
            <div className="mt-6">
              {subcategory === "general" &&
                renderImage(MH_general_health, "metis homeland general health")}
              {subcategory === "mental" &&
                renderImage(MH_mental_health, "metis homeland mental health")}
              {subcategory === "chronic" &&
                renderImage(
                  MH_chronic_conditions,
                  "metis homeland chronic conditions"
                )}
              {subcategory === "lifestylept1" &&
                renderImage(
                  MH_lifestyle_part1,
                  "metis homeland lifestyle part 1"
                )}
              {subcategory === "lifestylept2" &&
                renderImage(
                  MH_lifestyle_part2,
                  "metis homeland lifestyle part 2"
                )}
              {subcategory === "healthcare" &&
                renderImage(
                  MH_healthcare_health,
                  "metis homeland healthcare access"
                )}
              {subcategory === "disability" &&
                renderImage(MH_disability_health, "metis homeland disability")}
            </div>
          </div>
        )}

        {province === "Homeland" && category === "education" && (
          <div className="p-2 sm:p-6">
            {renderImage(MH_education, "metis homeland education")}
          </div>
        )}

        {province === "Homeland" && category === "housing" && (
          <div className="p-2 sm:p-6">
            {renderImage(MH_housing, "metis homeland housing")}
          </div>
        )}

        {province === "Homeland" && category === "labor" && (
          <div className="p-2 sm:p-6">
            {renderImage(MH_labor, "metis homeland labor")}
          </div>
        )}

        {province === "Homeland" && category === "language" && (
          <div className="p-2 sm:p-6">
            {renderImage(MH_language, "metis homeland language")}
          </div>
        )}

        {province === "Homeland" && category === "community" && (
          <div className="p-2 sm:p-6">
            {renderImage(MH_community, "metis homeland community")}
          </div>
        )}

        {/* ===========British Columbia============ */}
        {province === "BC" && category === "demographic" && (
          <div className="p-2 sm:p-6">
            {renderImage(BC_demographic, "bc demographic")}
          </div>
        )}

        {province === "BC" && category === "health" && (
          <div className="p-2 sm:p-6 items-center flex flex-col">
            <SubCategory
              onChange={onSubcategoryChange}
              currentSubcategory={subcategory}
              province={province}
              category={category}
            />
            <div className="mt-6">
              {subcategory === "general" &&
                renderImage(BC_general_health, "bc general health")}
              {subcategory === "mental" &&
                renderImage(BC_mental_health, "bc mental health")}
              {subcategory === "chronic" &&
                renderImage(BC_chronic_conditions, "bc chronic conditions")}
              {subcategory === "lifestylept1" &&
                renderImage(BC_lifestyle_part1, "bc lifestyle part 1")}
              {subcategory === "lifestylept2" &&
                renderImage(BC_lifestyle_part2, "bc lifestyle part 2")}
              {subcategory === "healthcare" &&
                renderImage(BC_healthcare_health, "bc healthcare access")}
              {subcategory === "disability" &&
                renderImage(BC_disability_health, "bc disability")}
            </div>
          </div>
        )}

        {province === "BC" && category === "education" && (
          <div className="p-2 sm:p-6">
            {renderImage(BC_education, "bc education")}
          </div>
        )}

        {province === "BC" && category === "housing" && (
          <div className="p-2 sm:p-6">
            {renderImage(BC_housing, "bc housing")}
          </div>
        )}

        {province === "BC" && category === "labor" && (
          <div className="p-2 sm:p-6">{renderImage(BC_labor, "bc labor")}</div>
        )}

        {province === "BC" && category === "language" && (
          <div className="p-2 sm:p-6">
            {renderImage(BC_language, "bc language")}
          </div>
        )}

        {province === "BC" && category === "community" && (
          <div className="p-2 sm:p-6">
            {renderImage(BC_community, "bc community")}
          </div>
        )}

        {/* ===========Alberta============ */}

        {province === "AB" && category === "demographic" && (
          <div className="p-2 sm:p-6">
            {renderImage(AB_demographic, "Alberita demographic")}
          </div>
        )}

        {province === "AB" && category === "health" && (
          <div className="p-2 sm:p-6 items-center flex flex-col">
            <SubCategory
              onChange={onSubcategoryChange}
              currentSubcategory={subcategory}
              province={province}
              category={category}
            />
            <div className="mt-6">
              {subcategory === "general" &&
                renderImage(AB_general_health, "Alberita general health")}
              {subcategory === "mental" &&
                renderImage(AB_mental_health, "Alberita mental health")}
              {subcategory === "chronic" &&
                renderImage(
                  AB_chronic_conditions,
                  "Alberita chronic conditions"
                )}
              {subcategory === "lifestylept1" &&
                renderImage(AB_lifestyle_part1, "Alberita lifestyle part 1")}
              {subcategory === "lifestylept2" &&
                renderImage(AB_lifestyle_part2, "Alberita lifestyle part 2")}
              {subcategory === "healthcare" &&
                renderImage(AB_healthcare_health, "Alberita healthcare access")}
              {subcategory === "disability" &&
                renderImage(AB_disability_health, "Alberita disability")}
            </div>
          </div>
        )}

        {province === "AB" && category === "education" && (
          <div className="p-2 sm:p-6">
            {renderImage(AB_education, "Alberita education")}
          </div>
        )}

        {province === "AB" && category === "housing" && (
          <div className="p-2 sm:p-6">
            {renderImage(AB_housing, "Alberita housing")}
          </div>
        )}

        {province === "AB" && category === "labor" && (
          <div className="p-2 sm:p-6">
            {renderImage(AB_labor, "Alberita labor")}
          </div>
        )}

        {province === "AB" && category === "language" && (
          <div className="p-2 sm:p-6">
            {renderImage(AB_language, "Alberita language")}
          </div>
        )}

        {province === "AB" && category === "community" && (
          <div className="p-2 sm:p-6">
            {renderImage(AB_community, "Alberita community")}
          </div>
        )}

        {/* ===========Saskatchewan============ */}

        {province === "SK" && category === "demographic" && (
          <div className="p-2 sm:p-6">
            {renderImage(SK_demographic, "Saskatchewan demographic")}
          </div>
        )}

        {province === "SK" && category === "health" && (
          <div className="p-2 sm:p-6 items-center flex flex-col">
            <SubCategory
              onChange={onSubcategoryChange}
              currentSubcategory={subcategory}
              province={province}
              category={category}
            />
            <div className="mt-6">
              {subcategory === "general" &&
                renderImage(SK_general_health, "Saskatchewan general health")}
              {subcategory === "mental" &&
                renderImage(SK_mental_health, "Saskatchewan mental health")}
              {subcategory === "chronic" &&
                renderImage(
                  SK_chronic_conditions,
                  "Saskatchewan chronic conditions"
                )}
              {subcategory === "lifestylept1" &&
                renderImage(
                  SK_lifestyle_part1,
                  "Saskatchewan lifestyle part 1"
                )}
              {subcategory === "lifestylept2" &&
                renderImage(
                  SK_lifestyle_part2,
                  "Saskatchewan lifestyle part 2"
                )}
              {subcategory === "healthcare" &&
                renderImage(
                  SK_healthcare_health,
                  "Saskatchewan healthcare access"
                )}
              {subcategory === "disability" &&
                renderImage(SK_disability_health, "Saskatchewan disability")}
            </div>
          </div>
        )}

        {province === "SK" && category === "education" && (
          <div className="p-2 sm:p-6">
            {renderImage(SK_education, "Saskatchewan education")}
          </div>
        )}

        {province === "SK" && category === "housing" && (
          <div className="p-2 sm:p-6">
            {renderImage(SK_housing, "Saskatchewan housing")}
          </div>
        )}

        {province === "SK" && category === "labor" && (
          <div className="p-2 sm:p-6">
            {renderImage(SK_labor, "Saskatchewan labor")}
          </div>
        )}

        {province === "SK" && category === "language" && (
          <div className="p-2 sm:p-6">
            {renderImage(SK_language, "Saskatchewan language")}
          </div>
        )}

        {province === "SK" && category === "community" && (
          <div className="p-2 sm:p-6">
            {renderImage(SK_community, "Saskatchewan community")}
          </div>
        )}

        {/* ===========Manitoba============ */}
        {province === "MB" && category === "demographic" && (
          <div className="p-2 sm:p-6">
            {renderImage(MB_demographic, "Manitoba demographic")}
          </div>
        )}

        {province === "MB" && category === "health" && (
          <div className="p-2 sm:p-6 items-center flex flex-col">
            <SubCategory
              onChange={onSubcategoryChange}
              currentSubcategory={subcategory}
              province={province}
              category={category}
            />
            <div className="mt-6">
              {subcategory === "general" &&
                renderImage(MB_general_health, "Manitoba general health")}
              {subcategory === "mental" &&
                renderImage(MB_mental_health, "Manitoba mental health")}
              {subcategory === "chronic" &&
                renderImage(
                  MB_chronic_conditions,
                  "Manitoba chronic conditions"
                )}
              {subcategory === "lifestylept1" &&
                renderImage(MB_lifestyle_part1, "Manitoba lifestyle part 1")}
              {subcategory === "lifestylept2" &&
                renderImage(MB_lifestyle_part2, "Manitoba lifestyle part 2")}
              {subcategory === "healthcare" &&
                renderImage(MB_healthcare_health, "Manitoba healthcare access")}
              {subcategory === "disability" &&
                renderImage(MB_disability_health, "Manitoba disability")}
            </div>
          </div>
        )}

        {province === "MB" && category === "education" && (
          <div className="p-2 sm:p-6">
            {renderImage(MB_education, "Manitoba education")}
          </div>
        )}

        {province === "MB" && category === "housing" && (
          <div className="p-2 sm:p-6">
            {renderImage(MB_housing, "Manitoba housing")}
          </div>
        )}

        {province === "MB" && category === "labor" && (
          <div className="p-2 sm:p-6">
            {renderImage(MB_labor, "Manitoba labor")}
          </div>
        )}

        {province === "MB" && category === "language" && (
          <div className="p-2 sm:p-6">
            {renderImage(MB_language, "Manitoba language")}
          </div>
        )}

        {province === "MB" && category === "community" && (
          <div className="p-2 sm:p-6">
            {renderImage(MB_community, "Manitoba community")}
          </div>
        )}

        {/* ===========Ontario============ */}

        {province === "ON" && category === "demographic" && (
          <div className="p-2 sm:p-6">
            {renderImage(ON_demographic, "Ontario demographic")}
          </div>
        )}

        {province === "ON" && category === "health" && (
          <div className="p-2 sm:p-6 items-center flex flex-col">
            <SubCategory
              onChange={onSubcategoryChange}
              currentSubcategory={subcategory}
              province={province}
              category={category}
            />
            <div className="mt-6">
              {subcategory === "general" &&
                renderImage(ON_general_health, "Ontario general health")}
              {subcategory === "mental" &&
                renderImage(ON_mental_health, "Ontario mental health")}
              {subcategory === "chronic" &&
                renderImage(
                  ON_chronic_conditions,
                  "Ontario chronic conditions"
                )}
              {subcategory === "lifestylept1" &&
                renderImage(ON_lifestyle_part1, "Ontario lifestyle part 1")}
              {subcategory === "lifestylept2" &&
                renderImage(ON_lifestyle_part2, "Ontario lifestyle part 2")}
              {subcategory === "healthcare" &&
                renderImage(ON_healthcare_health, "Ontario healthcare access")}
              {subcategory === "disability" &&
                renderImage(ON_disability_health, "Ontario disability")}
            </div>
          </div>
        )}

        {province === "ON" && category === "education" && (
          <div className="p-2 sm:p-6">
            {renderImage(ON_education, "Ontario education")}
          </div>
        )}

        {province === "ON" && category === "housing" && (
          <div className="p-2 sm:p-6">
            {renderImage(ON_housing, "Ontario housing")}
          </div>
        )}

        {province === "ON" && category === "labor" && (
          <div className="p-2 sm:p-6">
            {renderImage(ON_labor, "Ontario labor")}
          </div>
        )}

        {province === "ON" && category === "language" && (
          <div className="p-2 sm:p-6">
            {renderImage(ON_language, "Ontario language")}
          </div>
        )}

        {province === "ON" && category === "community" && (
          <div className="p-2 sm:p-6">
            {renderImage(ON_community, "Ontario community")}
          </div>
        )}

        {/* ===========End of Provinces============ */}
      </Card>
    </div>
  );
}
