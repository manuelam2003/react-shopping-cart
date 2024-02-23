import React from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCartShopping } from '@fortawesome/free-solid-svg-icons'

import styles from './MainPage.module.css';
import logo from '../assets/teyasu_logo_full.png'


import productsList from "./productsList";

const products = productsList;

function MainPage ({setCurrentProduct}) {
    const navigate = useNavigate();
   
    function handleProductClick (e) {
        let productName = e.currentTarget.querySelector('h5').innerText;
        console.log(productName);
        const newItem = products.find((product) => product.name === productName);
        setCurrentProduct(newItem);
        navigate('/shop');
  
    }
    return (
        <div className={styles.mainPageContainer}>
            <div className={styles.banner}>
                <h1>Use 01001 promo-code for 10% off</h1>
            </div>
            <div className={styles.logoContainer}>
                <img src={logo} alt="teyasu logo" />
            </div>
            
            <p>We offer: unique and elegant pieces that express your personality and style. Our jewelry is made of high-quality silver, with angular and geometric shapes that create a modern and sophisticated look.</p>
            <Link to="/shop" className={styles.shopBtn}>Shop</Link>
            <div className={styles.featuredProductsContainer}
                role="list"
                aria-label="Featured Products"
            >
               {products.map((product) => {
                    return (
                        <div className={styles.featuredProduct} 
                            key={product.id} 
                            onClick={handleProductClick}
                            role="listitem"
                        >
                            <img src={product.src} alt={product.name} />
                            <div className={styles.productDescriptionContainer}>
                                <div>
                                    <h5 className={styles.name}>{product.name}</h5>
                                    <h4 className={styles.price}>{product.price.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}</h4>
                                </div>
                                <FontAwesomeIcon icon={faCartShopping} className={styles.cartIcon} />

                            </div>
                            
                        </div>
                    )
               })}
            </div>
                
        </div>
    )
}

export default MainPage