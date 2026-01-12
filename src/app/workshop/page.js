import WorkshopCard from "./workshop-card";
import { PageTitle } from "@/components/ui";
import styles from "./Workshops.module.css";
import data from "./workshops.json";

// Get workshops data
const workshops = data.workshops;

export default function Workshop() {
  return (
    <div
      className={`bg-muted flex flex-col min-h-svh gap-8 px-4 md:px-10 pb-32 ${styles.background} text-white w-full overflow-x-hidden`}
    >
      <PageTitle className="mb-12 mt-[15vh]">WORKSHOPS</PageTitle>

      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8 w-full place-items-center">
        {workshops.map((workshop) => (
          <WorkshopCard
            key={workshop.name}
            name={workshop.name}
            img_src={workshop.img_src}
            register_link={workshop.register_link}
          />
        ))}
      </div>
    </div>
  );
}
