import React from "react";
import styles from "./Loader.module.scss";
import { motion } from "framer-motion";

const Loader = ({ color = "#695EE8", allPage = false }) => {
  if (allPage)
    return (
      <motion.div
        transition={{
          default: { duration: 0.6 },
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className={styles["loading-view"]}
      >
        <div className={styles["loader-fichap-container"]}>
          <img src="/assets/loader.svg" alt="fichap logo" />
          <div
            className={styles["loader-fichap"]}
            style={{ borderTop: `5px solid ${color}` }}
          />
        </div>
      </motion.div>
    );
  return (
    <div className={styles["loader-fichap-container"]}>
      <img src="/assets/loader.svg" alt="fichap logo" />
      <div
        className={styles["loader-fichap"]}
        style={{ borderTop: `5px solid ${color}` }}
      />
    </div>
  );
};

export default Loader;
