import React from "react";
import styles from "./ChartContainer.module.css";

const ChartContainer = ({ title, children }) => {
  return (
    <div className={styles.chartContainer}>
      <h3 className={styles.title}>{title}</h3>
      <div className={styles.content}>{children}</div>
    </div>
  );
};

export default ChartContainer;
