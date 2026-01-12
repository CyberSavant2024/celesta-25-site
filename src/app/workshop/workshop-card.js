import { memo } from "react";
import Image from "next/image";
import Link from "next/link";
import styles from "./Workshops.module.css";

const WorkshopCard = memo(function WorkshopCard({ name, img_src, register_link }) {
  return (
    <div className={styles.eventCardWrapper}>
      <div className={styles.eventCardBorder}></div>
      <div className={styles.eventCardContent}>
        {/* Image Section */}
        <div className={styles.eventImageContainer}>
          <Image
            src={img_src}
            alt={name}
            className={styles.eventImage}
            width={500}
            height={300}
          />
          <div className={styles.eventImageOverlay}></div>
        </div>

        {/* Info Section */}
        <div className={styles.eventInfo}>
          <h1 className={styles.eventName}>{name}</h1>
        </div>

        {/* Register Button */}
        <div className={styles.registerButtonContainer}>
          <Link href={register_link} className={styles.registerButton}>
            Register
          </Link>
        </div>
      </div>
    </div>
  );
});

WorkshopCard.displayName = "WorkshopCard";

export default WorkshopCard;
