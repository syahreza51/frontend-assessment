"use client";
import { useEffect, useState } from "react";
import styles from "../styles/Home.module.scss";
import { motion } from "framer-motion";
import ProductCard from "@components/ProductCard/ProductCard";
import Footer from "@components/Footer/Footer";
import Skeleton from "./components/Skeleton/Skeleton";

interface Product {
  id: string;
  name: string;
  price: string;
  sku: string;
  description: string;
  rating: number;
  reviewsCount: number;
  images: string[];
}

const Home: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:5000/products")
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching data: ", err);
        setIsLoading(false);
      });
  }, []);
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className={styles.container}>
        {/* Hero Section */}
        <section className={styles.hero}>
          <div className={styles.heroContent}>
            <h1>Welcome to Our Catalog</h1>
            <p>Explore the best products and services tailored for you.</p>
            <button className={styles.heroButton}>Shop Now</button>
          </div>
        </section>

        {/* Highlight Section */}
        <section className={styles.highlight}>
          <h2>Featured Products</h2>
          <div className={styles.productGrid}>
            {isLoading
              ? Array.from({ length: 3 }).map((_, index) => (
                  <Skeleton key={index} />
                ))
              : products
                  .slice(0, 3)
                  .map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
          </div>
        </section>

        {/* Call-to-Action Section */}
        <section className={styles.cta}>
          <h2>Ready to Explore?</h2>
          <p>Discover more and shop your favorite products now!</p>
          <button className={styles.ctaButton}>Explore More</button>
        </section>
      </div>
    </motion.div>
  );
};

export default Home;
