"use client";
import { useEffect, useState } from "react";
import ProductCard from "@components/ProductCard/ProductCard";
import SearchBar from "@components/SearchBar/SearchBar";
import { motion } from "framer-motion";
import Breadcrumb from "../components/Breadcrumb/Breadcrumb";
import Skeleton from "../components/Skeleton/Skeleton";
import styles from "./product.module.scss";

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

export default function ProductPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [sortOrder, setSortOrder] = useState<string>("price-asc");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [productsPerPage] = useState<number>(6);

  useEffect(() => {
    fetch("http://localhost:5000/products")
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
        setFilteredProducts(data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching data: ", err);
        setIsLoading(false);
      });
  }, []);

  const handleSearch = (query: string) => {
    if (query) {
      const filtered = products.filter((product) =>
        product.name.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredProducts(filtered);
    } else {
      setFilteredProducts(products);
    }
  };

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSortOrder(e.target.value);
    const sortedProducts = [...filteredProducts];
    if (e.target.value === "price-asc") {
      sortedProducts.sort((a, b) => parseFloat(a.price) - parseFloat(b.price));
    } else if (e.target.value === "price-desc") {
      sortedProducts.sort((a, b) => parseFloat(b.price) - parseFloat(a.price));
    } else if (e.target.value === "popularity") {
      sortedProducts.sort((a, b) => b.rating - a.rating);
    }
    setFilteredProducts(sortedProducts);
  };

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  const breadcrumbItems = [
    { label: "Home", href: "/" },
    { label: "Products", href: "/product" },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className={styles.productSection}>
        <div className={styles.container}>
          <Breadcrumb items={breadcrumbItems} />
          <h2 className={styles.title}>Introducing Our Latest Products</h2>
          <SearchBar onSearch={handleSearch} />
          <div className={styles.sortOptions}>
            <label htmlFor="sort">Sort By: </label>
            <select id="sort" value={sortOrder} onChange={handleSortChange}>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="popularity">Popularity</option>
            </select>
          </div>
          <div className={styles.productGrid}>
            {isLoading
              ? Array.from({ length: 3 }).map((_, index) => (
                  <Skeleton key={index} />
                ))
              : currentProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
          </div>
          <div className={styles.pagination}>
            <button
              disabled={currentPage === 1}
              onClick={() => setCurrentPage(currentPage - 1)}
            >
              Prev
            </button>
            <span>
              Page {currentPage} of {totalPages}
            </span>
            <button
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage(currentPage + 1)}
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
