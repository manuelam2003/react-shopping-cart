import { useState } from 'react'

import styles from './ProductPage.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlusCircle} from '@fortawesome/free-solid-svg-icons'
import { faMinusCircle} from '@fortawesome/free-solid-svg-icons'

function ProductPage ({setProductPage, currentProduct, setCurrentProduct, cart, setCart, setCartCount}) {
    const [quantity, setQuantity] = useState(1);
    
    function calculateTotalQuantity(cart) {
        let result = cart.reduce((total, item) => {
            return total += item.quantity;
        },0)
        if (result <= 0 ) {
            return []
        }
        return result
    }

    function handleQuantity (e) {
        const icon = e.currentTarget.getAttribute("data-icon")
        if(icon === 'circle-minus') {
            if(quantity > 0 ) {
                setQuantity(() => quantity-1)
            }   
        } else if(icon === 'circle-plus') {
        setQuantity(() => quantity+1)
        }
        console.log(quantity)
    }

    function handleAddToCart () {
        let isProductInCart = false;

        const updatedCart = cart.map(item => {
            if(item.product.name === currentProduct.name) {
                isProductInCart = true;
                item.quantity += quantity;
            }
            return item
        });

        if(!isProductInCart) {
            updatedCart.push({product: currentProduct, quantity:quantity})
        }

        setCart(updatedCart)
        setProductPage(false)
        setCurrentProduct(null)
    
        setCartCount(calculateTotalQuantity(updatedCart))
    }

    function handleCloseBtn () {
        setProductPage(false)
        setCurrentProduct(null)
    }

    return (
        <div className={styles.productPageContainer}>
            <div className={styles.closeBtn} onClick={handleCloseBtn} 
                role='button'
                aria-label='close button'></div>
  
            <div className={styles.productInfoBody}>
                <img src={currentProduct.src} alt="" />
                <div className={styles.productInfo}>
                    <h1 className={styles.name}>{currentProduct.name}</h1>
                    <h2>{currentProduct.price.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}</h2>
                    <p>{currentProduct.description}</p>
                    <div className={styles.quantityContainer}>
                        <FontAwesomeIcon icon={faMinusCircle} className={styles.minusIcon} onClick={handleQuantity}/>
                        <label>
                            <input type="number" 
                            // defaultValue={quantity} 
                            value={quantity} 
                            onChange={(e) => setQuantity(parseInt(e.target.value, 10))}
                            className={styles.quantityInput}  />
                        </label>
                        <FontAwesomeIcon icon={faPlusCircle} className={styles.plusIcon} onClick={handleQuantity}/>
                    </div>
                    <div className={styles.addToCartBtn} onClick={handleAddToCart}>Add To Cart</div>

                </div>
            </div>
            
            
        </div>
    
       
    )
}

export default ProductPage