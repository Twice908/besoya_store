interface CartToastProps {
  visible: boolean;
  name: string;
}

const CartToast = ({ visible, name }: CartToastProps) => (
  <div className={`cart-toast ${visible ? "cart-toast--visible" : ""}`}>
    ✓ <strong>{name}</strong> added to cart
  </div>
);

export default CartToast;
