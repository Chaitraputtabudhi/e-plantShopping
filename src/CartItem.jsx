import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeItem, updateQuantity } from './CartSlice';
import './CartItem.css';

const CartItem = ({ onContinueShopping }) => {
  const cart = useSelector(state => state.cart.items);
  const dispatch = useDispatch();

  // ✅ Calculate total amount for all products in the cart
  const calculateTotalAmount = () => {
    let total = 0;
    cart.forEach(item => {
      const quantity = item.quantity;
      const cost = parseFloat(item.cost.substring(1)); // Remove "$" and convert to number
      total += quantity * cost;
    });
    return total.toFixed(2); // Round to 2 decimals for currency display
  };

  // ✅ Handle continue shopping
  const handleContinueShopping = (e) => {
    e.preventDefault();
    onContinueShopping(e);
  };

  // ✅ Handle increment
  const handleIncrement = (item) => {
    dispatch(updateQuantity({ name: item.name, quantity: item.quantity + 1 }));
  };

  // ✅ Handle decrement with removal condition
  const handleDecrement = (item) => {
    if (item.quantity > 1) {
      // Decrease quantity if more than 1
      dispatch(updateQuantity({ name: item.name, quantity: item.quantity - 1 }));
    } else {
      // Remove item if quantity would drop to 0
      dispatch(removeItem(item.name));
    }
  };

  // ✅ Handle remove item
  const handleRemove = (item) => {
    dispatch(removeItem(item.name));
  };

  // ✅ Calculate total cost for a single item
  const calculateTotalCost = (item) => {
    const unitPrice = parseFloat(item.cost.substring(1));
    return (unitPrice * item.quantity).toFixed(2);
  };

  // ✅ Checkout placeholder
  const handleCheckoutShopping = () => {
    alert('Functionality to be added for future reference');
  };

  return (
    <div className="cart-container">
      <h2 style={{ color: 'black' }}>
        Total Cart Amount: ${calculateTotalAmount()}
      </h2>

      <div>
        {cart.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '2rem', fontSize: '1.2rem', color: '#666' }}>
            <p>Your cart is empty</p>
            <p>Add some plants to get started!</p>
          </div>
        ) : (
          cart.map(item => (
            <div className="cart-item" key={item.name}>
              <img className="cart-item-image" src={item.image} alt={item.name} />

              <div className="cart-item-details">
                <div className="cart-item-name">{item.name}</div>
                <div className="cart-item-cost">Unit Price: {item.cost}</div>

                <div className="cart-item-quantity">
                  <button
                    className="cart-item-button cart-item-button-dec"
                    onClick={() => handleDecrement(item)}
                  >
                    -
                  </button>
                  <span className="cart-item-quantity-value">{item.quantity}</span>
                  <button
                    className="cart-item-button cart-item-button-inc"
                    onClick={() => handleIncrement(item)}
                  >
                    +
                  </button>
                </div>

                <div className="cart-item-total">
                  Subtotal: ${calculateTotalCost(item)}
                </div>

                <button
                  className="cart-item-delete"
                  onClick={() => handleRemove(item)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      <div className="continue_shopping_btn" style={{ marginTop: '20px' }}>
        <button
          className="get-started-button"
          onClick={(e) => handleContinueShopping(e)}
        >
          Continue Shopping
        </button>
        <br />
        <button
          className="get-started-button1"
          onClick={handleCheckoutShopping}
          disabled={cart.length === 0}
          style={{
            opacity: cart.length === 0 ? 0.5 : 1,
            cursor: cart.length === 0 ? 'not-allowed' : 'pointer'
          }}
        >
          Checkout
        </button>
      </div>
    </div>
  );
};

export default CartItem;