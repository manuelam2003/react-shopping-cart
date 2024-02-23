import { useState } from 'react'

import styles from './ShoppingPage.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCartShopping } from '@fortawesome/free-solid-svg-icons'
import { faSquareXmark } from '@fortawesome/free-solid-svg-icons'

import ProductPage from './ProductPage'

import productsList from "./productsList";

const products = productsList;

function ShoppingPage ({cart, setCart, currentProduct, setCurrentProduct, setCartCount}) {
    console.log(currentProduct)
    const [productPage, setProductPage] =useState(currentProduct ? true : false);

    function onProductClick (e) {
        const newName = e.currentTarget.childNodes[0].alt;
        const newItem = products.find((product) => product.name === newName)
        setCurrentProduct(newItem)
        setProductPage(true);
        
    }
    return (
        <div className={styles.shoppingPageContainer}>
            {productPage && <ProductPage 
                setProductPage={setProductPage}
                currentProduct={currentProduct}
                setCurrentProduct={setCurrentProduct}
                cart={cart}
                setCart={setCart}
                setCartCount={setCartCount}
            /> }
        
            <h1 className={styles.capsuleName}>COLLIDE <FontAwesomeIcon icon={faSquareXmark}/> <br/>capsule </h1>
           
            <div className={styles.productsContainer} role='list' aria-label='Products'>
               {products.map((product) => {
                    return (
                        <div onClick={onProductClick} 
                            className={styles.product} 
                            key={product.id}
                            role='listitem'
                        >
                            <img src={product.src} alt={product.name} />
                            <div className={styles.productDescriptionContainer}>
                                <div className={styles.productDescriptionBody}>
                                    <h5 className={styles.name}>{product.name}</h5>
                                    <h4 className={styles.price}>{product.price.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}</h4>
                                </div>
                                <FontAwesomeIcon icon={faCartShopping} className={styles.cartIcon}/>

                            </div>
                            
                        </div>
                    )
               })}
            </div>
            
        </div>
    )
}


export default ShoppingPage