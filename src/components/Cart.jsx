const Cart = ({ cart, updateQty, removeItem }) => {
  const totalItems = cart.reduce((sum, i) => sum + i.qty, 0);
  const totalPrice = cart.reduce((sum, i) => sum + i.qty * i.price, 0);

  if (cart.length === 0) {
    return <p>Empty cart</p>;
  }

  return (
    <div className="cart">
      <h3>Cart</h3>
      {cart.map((item) => (
        <div key={item.id} className="cart-item">
          <span>{item.name}</span>
          <input
            type="number"
            min="1"
            max={item.stock}
            value={item.qty}
            onChange={(e) => updateQty(item.id, +e.target.value)}
          />
          <button onClick={() => removeItem(item.id)}>Remove</button>
        </div>
      ))}
      <h4>Total Items: {totalItems}</h4>
      <h4>Total Price: ₹{totalPrice}</h4>
    </div>
  );
};

export default Cart;
