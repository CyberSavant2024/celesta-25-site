"use client";

import { memo } from "react";
import Image from "next/image";
import styles from "./Events.module.css";

const EventCard = memo(function EventCard({ event, onClick }) {
  return (
    <div className={styles.eventCardWrapper} onClick={onClick}>
      <div className={styles.eventCardBorder}></div>
      <div className={styles.eventCardContent}>
        <div className={styles.eventImageContainer}>
          <Image
            src={event.img_src}
            alt={event.name}
            className={styles.eventImage}
            width={500}
            height={300}
          />
          <div className={styles.eventImageOverlay}></div>
        </div>

        <div className={styles.eventInfo}>
          <h1 className={styles.eventName}>{event.name}</h1>
        </div>

        <div className={styles.registerButtonContainer}>
          <button className={styles.registerButton}>View</button>
        </div>
      </div>
    </div>
  );
});

EventCard.displayName = "EventCard";

export default EventCard;
