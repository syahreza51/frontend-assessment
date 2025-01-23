import React from "react";
import styles from "./Skeleton.module.scss";

const Skeleton = () => {
  return (
    <div className={styles["skeleton-container"]}>
      <div className={styles.image}></div>
      <div className={styles.content}>
        <div className={styles.title}></div>
        <div className={styles.description}></div>
        <div className={styles.rating}>
          <div className={styles["rating-item"]}></div>
          <div className={styles["rating-item"]}></div>
          <div className={styles["rating-item"]}></div>
          <div className={styles["rating-item"]}></div>
          <div className={styles["rating-item"]}></div>
        </div>
        <div className={styles.price}>
          <div className={styles["price-value"]}></div>
          <div className={styles["add-to-cart"]}></div>
        </div>
      </div>
    </div>
  );
};

export default Skeleton;
