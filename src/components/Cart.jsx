import styles from './Cart.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark } from '@fortawesome/free-solid-svg-icons'
import { useState } from 'react'

function calculateTotalPrice(arr) {
    return arr.reduce((total,item) => {
        return total += item.product.price * item.quantity
    },0)
}

function calculateTotalQuantity(cart) {
    let result = cart.reduce((total, item) => {
        return total += item.quantity;
    },0)
    if (result <= 0 ) {
        return []
    }
    return result
}

function Cart ({cart, setCart, setCartCount}) {

    let initialTotal = calculateTotalPrice(cart)
    
    const [totalPrice, setTotalPrice] = useState(initialTotal)

    function changeQuantity (cart,newQuantity,id) {
        if(isNaN(newQuantity) || newQuantity < 0) {
            newQuantity = 1;
            
        }
       let updatedCart = cart.map(item => {
            if(item.product.id === id) {
                item.quantity = newQuantity
            }
        return item
       });
       
       let totalQuantity = calculateTotalQuantity(updatedCart);
       setCartCount(totalQuantity)
       setCart([...updatedCart]);
       setTotalPrice(calculateTotalPrice(updatedCart))
    }

    function handleProductRemoval (e) {
        console.log('TEST')
        console.log(e.target.closest('div').children[0].innerHTML)
        let productName = e.target.closest('div').children[0].innerHTML;
        let updatedCart = cart.filter(item => item.product.name !== productName);
        
        console.log("updated cart is : ")
        console.log(updatedCart)
        
        if(updatedCart.length === 0) {
            setTotalPrice(0)
        }
      
        setCart(updatedCart)
        setCartCount(calculateTotalQuantity(updatedCart))
        setTotalPrice(calculateTotalPrice(updatedCart))    
    }

    return (
        <div className={styles.cartPageContainer}>
            <h1>Cart</h1>
            {cart.map((el) => {
            return (
                <div className={styles.cartProduct} key={el.product.id}>
                    <img className={styles.cartProductImg} src={el.product.src} alt="product image"/>
                    <div className={styles.cartProductInfo}>
                        <h2 className={styles.name}>{el.product.name}</h2>
                    
                        <label>
                            <input type="number" 
                                    defaultValue={el.quantity} 
                                    min={1}
                                    className={styles.quantity}
                                    role='quantity'
                                    aria-label='edit quantity'
                                    onChange={(e) => changeQuantity(cart,parseInt(e.target.value, 10), el.product.id)}/>
                        </label>
                        <h2 className={styles.price}>{el.product.price.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}</h2>
                        <FontAwesomeIcon icon={faXmark} 
                                        className={styles.delete} 
                                        onClick={handleProductRemoval}
                                        role='button'
                                        aria-hidden="false"
                                        aria-label='remove product'/>
                    </div>
                </div>
            )
            })}
            <div className={styles.checkoutContainer}>
               {cart.length > 0 && 
               <>
                    <h1 className={styles.total}>Total: {totalPrice.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}</h1>
                    <div className={styles.checkoutBtn}>Checkout</div>    
               </>
               
               } 
               {cart.length === 0 && <h2>Your cart is empty</h2>}  
            </div>
        </div>
    )
}

export default Cart;