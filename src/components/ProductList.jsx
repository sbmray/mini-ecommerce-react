import ProductCard from "./ProductCard";

const ProductList = ({ products, addToCart }) => {
  if (products.length === 0) {
    return <p>No products found</p>;
  }

  return (
    <div className="grid">
      {products.map(product => (
        <ProductCard
          key={product.id}
          product={product}
          addToCart={addToCart}
        />
      ))}
    </div>
  );
};

export default ProductList;
