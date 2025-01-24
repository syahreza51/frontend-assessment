"use client";
import { notFound } from "next/navigation";
import { use, useEffect, useState } from "react";
import { motion } from "framer-motion";
import Breadcrumb from "@/app/components/Breadcrumb/Breadcrumb";
import Skeleton from "@/app/components/Skeleton/Skeleton";
import styles from "../product.module.scss";
import ImageWithBasePath from "@/app/components/Image/Image";

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

async function getProductData(id: string): Promise<Product | null> {
  const res = await fetch(
    `https://my-json-server.typicode.com/syahreza51/mock-api/products/${id}`
  );
  if (!res.ok) {
    return null;
  }
  return res.json();
}

const ProductDetail = ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = use(params);
  const [quantity, setQuantity] = useState(1);
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [mainImage, setMainImage] = useState<string>("");

  useEffect(() => {
    const fetchProduct = async () => {
      if (!id) {
        notFound();
      }

      const data = await getProductData(id);
      if (!data) {
        notFound();
      } else {
        setProduct(data);
        setMainImage(data.images[0]);
      }
      setLoading(false);
    };

    fetchProduct();
  }, [id]);

  if (loading) {
    return (
      <div className="product-detail">
        <div className="container">
          <Skeleton />
        </div>
      </div>
    );
  }

  if (!product) {
    return notFound();
  }

  const handleThumbnailClick = (src: string) => {
    setMainImage(src);
  };

  const handleIncrease = () => {
    setQuantity((prev) => prev + 1);
  };

  const handleDecrease = () => {
    setQuantity((prev) => (prev > 1 ? prev - 1 : 1));
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value, 10);
    if (!isNaN(value) && value > 0) {
      setQuantity(value);
    } else {
      setQuantity(1);
    }
  };

  const breadcrumbItems = [
    { label: "Home", href: "/" },
    { label: "Products", href: "/product" },
    { label: "Products Detail", href: `/products/${id}` },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className={styles.productDetail}>
        <div className={styles.container}>
          <Breadcrumb items={breadcrumbItems} />
          <h2 className={styles.title}>Product Detail</h2>
          <div className={styles.productDetailContent}>
            <div className={styles.productImages}>
              <ImageWithBasePath
                id="mainImage"
                src={mainImage}
                alt={product.name}
                className={styles.mainImage}
                width={500}
                height={500}
              />
              <div className={styles.thumbnails}>
                {product.images.slice(1).map((image, index) => (
                  <ImageWithBasePath
                    key={index}
                    src={image}
                    alt={`Thumbnail ${index + 1}`}
                    className={styles.thumbnail}
                    width={100}
                    height={100}
                    onClick={() => handleThumbnailClick(image)}
                  />
                ))}
              </div>
            </div>

            <div className={styles.productDetails}>
              <h2 className={styles.productName}>{product.name}</h2>
              <p className={styles.sku}>SKU: {product.sku}</p>
              <div className={styles.price}>
                <span className={styles.currentPrice}>${product.price}</span>
                <span className={styles.originalPrice}>
                  ${(parseFloat(product.price) + 50).toFixed(2)}
                </span>
              </div>

              <div className={styles.rating}>
                {[...Array(5)].map((_, index) => (
                  <svg
                    key={index}
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill={index < product.rating ? "#eab308" : "gray"}
                    className={styles.starIcon}
                  >
                    <path
                      fillRule="evenodd"
                      d="M12 17.09l3.528 2.409-1.345-4.179L18.9 9.82h-4.322L12 5.75l-2.578 4.07H5.1l3.717 5.5-1.345 4.179L12 17.09z"
                      clipRule="evenodd"
                    />
                  </svg>
                ))}
                <span className={styles.reviews}>
                  {product.reviewsCount} reviews
                </span>
              </div>

              <p className={styles.description}>{product.description}</p>

              <div className={styles.colorOptions}>
                <h3>Color:</h3>
                <div className={styles.colors}>
                  <button
                    className={`${styles.colorOption} ${styles.black}`}
                  ></button>
                  <button
                    className={`${styles.colorOption} ${styles.gray}`}
                  ></button>
                  <button
                    className={`${styles.colorOption} ${styles.blue}`}
                  ></button>
                </div>
              </div>

              <div className={styles.quantity}>
                <label htmlFor={styles.quantity}>Quantity:</label>
                <div className={styles.quantityControls}>
                  <button
                    type="button"
                    onClick={handleDecrease}
                    aria-label="Decrease quantity"
                  >
                    −
                  </button>
                  <input
                    type="number"
                    id="quantity"
                    name="quantity"
                    min="1"
                    value={quantity}
                    onChange={handleChange}
                  />
                  <button
                    type="button"
                    onClick={handleIncrease}
                    aria-label="Increase quantity"
                  >
                    +
                  </button>
                </div>
              </div>

              <div className={styles.actions}>
                <button className={styles.addToCart}>Add to Cart</button>
                <button className={styles.wishlist}>Wishlist</button>
              </div>

              <div className={styles.features}>
                <h3>Key Features:</h3>
                <ul>
                  <li>Industry-leading noise cancellation</li>
                  <li>30-hour battery life</li>
                  <li>Touch sensor controls</li>
                  <li>Speak-to-chat technology</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductDetail;
