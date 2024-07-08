import React from "react";
import styles from "./NotFoundPage.module.css";

export default function NotFoundPage() {
    return (
        <div className={styles.container}>
            <h1 className={styles.title}>404 Not Found</h1>
            <p className={styles.message}>
                The page you are looking for does not exist. Go to Home Page!
            </p>
        </div>
    );
}
