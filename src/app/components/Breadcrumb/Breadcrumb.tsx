"use client";

import Link from "next/link";
import styles from "./Breadcrumb.module.scss"; // Import SCSS

interface BreadcrumbItem {
  label: string;
  href: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
}

const Breadcrumb = ({ items }: BreadcrumbProps) => {
  return (
    <div className={styles.breadcrumb}>
      {items.map((item, index) => (
        <div key={index} className={styles.breadcrumbItem}>
          <Link
            href={item.href}
            className={
              index === items.length - 1 ? styles.linkActive : styles.link
            }
          >
            {item.label}
          </Link>
          {index < items.length - 1 && (
            <span className={styles.separator}>/</span>
          )}
        </div>
      ))}
    </div>
  );
};

export default Breadcrumb;
