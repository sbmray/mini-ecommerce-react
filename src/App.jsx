import { useEffect, useMemo, useState } from "react";
import { products as data } from "./data/products";
import ProductList from "./components/ProductList";
import Filters from "./components/Filters";
import Cart from "./components/Cart";
import { useDebounce } from "./hooks/useDebounce";
import "./App.css";

function App() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [sort, setSort] = useState("");
  const [cart, setCart] = useState(
    JSON.parse(localStorage.getItem("cart")) || []
  );

  const debouncedSearch = useDebounce(search);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const categories = [...new Set(data.map(p => p.category))];

  const filteredProducts = useMemo(() => {
    let result = [...data];

    if (debouncedSearch) {
      result = result.filter(p =>
        p.name.toLowerCase().includes(debouncedSearch.toLowerCase())
      );
    }

    if (category) {
      result = result.filter(p => p.category === category);
    }

    if (sort === "low") {
      result.sort((a, b) => a.price - b.price);
    }

    if (sort === "high") {
      result.sort((a, b) => b.price - a.price);
    }

    return result;
  }, [debouncedSearch, category, sort]);

  const addToCart = product => {
    setCart(prev => {
      const existing = prev.find(i => i.id === product.id);
      if (existing) {
        if (existing.qty < product.stock) {
          return prev.map(i =>
            i.id === product.id ? { ...i, qty: i.qty + 1 } : i
          );
        }
        return prev;
      }
      return [...prev, { ...product, qty: 1 }];
    });
  };

  const updateQty = (id, qty) => {
  setCart(prev =>
    prev.map(i =>
      i.id === id
        ? { ...i, qty: Math.min(Math.max(qty, 1), i.stock) }
        : i
    )
  );
  };

  const removeItem = id => {
    setCart(prev => prev.filter(i => i.id !== id));
  };

  const clearFilters = () => {
    setSearch("");
    setCategory("");
    setSort("");
  };

  return (
    <div className="container">
      <h2>Mini E-Commerce</h2>

      <Filters
        search={search}
        setSearch={setSearch}
        category={category}
        setCategory={setCategory}
        sort={sort}
        setSort={setSort}
        clearFilters={clearFilters}
        categories={categories}
      />

      <ProductList products={filteredProducts} addToCart={addToCart} />
      <Cart cart={cart} updateQty={updateQty} removeItem={removeItem} />
    </div>
  );
}

export default App;