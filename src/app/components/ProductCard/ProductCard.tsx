import Link from "next/link";
import styles from "./ProductCard.module.scss";
import ImageWithBasePath from "../Image/Image";

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

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  return (
    <div className={styles.productCard}>
      <div className={styles.imageWrapper}>
        <ImageWithBasePath src={product.images[0]} alt={product.name} />
      </div>
      <h3 className={styles.productName}>{product.name}</h3>
      <p className={styles.productDescription}>{product.description}</p>
      <div className={styles.productFooter}>
        <span className={styles.price}>${product.price}</span>
        <Link href={`/product/${product.id}`}>
          <button className={styles.addToCart}>View Detail</button>
        </Link>
      </div>
    </div>
  );
};

export default ProductCard;
