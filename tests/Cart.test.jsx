import { getByText, render, screen } from "@testing-library/react";
import React from "react";
import userEvent from "@testing-library/user-event"; 
import { MemoryRouter, BrowserRouter } from "react-router-dom";
import { describe, expect, test } from "vitest";
import { waitFor } from "@testing-library/react";

import productsList from "../src/components/productsList";

const products = productsList;
import Cart from '../src/components/Cart'

const calculateTotal = (cart) => {
    return cart.reduce((result, el) => result += (el.product.price * el.quantity), 0 )

}

describe('Cart component Tests', () => {
    it('Should render empty cart if cart.length === 0 ', () => {

        render (
            <BrowserRouter>
                <Cart cart ={[]}/>
            </BrowserRouter>
        )

        const heading = screen.getByText(/Your cart is empty/);
        expect(heading).toBeInTheDocument();
    });

    it('Should render cart with one product with correct name and price and total', () => {
        render (
            <BrowserRouter>
                <Cart cart ={[{product: products[0], quantity: 1}]}/>
            </BrowserRouter>
        )
        const ringName = screen.getByText(products[0].name);
        expect(ringName).toBeInTheDocument();

        const ringPrice = screen.getByText(products[0].price.toLocaleString('en-US', { style: 'currency', currency: 'USD' }));
        expect(ringPrice).toBeInTheDocument();

        const total = screen.getByText(/Total/);
        expect(total).toHaveTextContent(products[0].price.toLocaleString('en-US', {style: 'currency', currency: 'USD'}))

    });
    it('Should render cart with two products and calculate total correctly', () => {
        const cart = [{product: products[0], quantity: 1}, {product: products[1], quantity: 1}, ]
       
        render (
            <BrowserRouter>
                <Cart cart ={cart}/>
            </BrowserRouter>
        )
        const total = screen.getByText(/Total/);
        expect(total).toHaveTextContent(calculateTotal(cart))

    });

    it('Should be able change quantity of the product, set new cart, adjust the total', async () => {
        const mockFunc = vi.fn();
        const mockCartCount = vi.fn()
        const cart = [{product: products[0], quantity: 1}];
        const user = userEvent.setup();
        render (
            <BrowserRouter>
                <Cart cart ={cart} setCart={mockFunc} setCartCount={mockCartCount}/>
            </BrowserRouter>
        )
        const input = screen.getByRole("quantity", { name: "edit quantity" });

        await user.clear(input);
        await user.type(input, '3');

        expect(input).toHaveValue(3);
        expect(mockFunc).toHaveBeenCalled();

        const total = screen.getByText(/Total/);
        expect(total).toHaveTextContent(360)
    });

    it('Should remove product by pressing X btn', async () => {
        const setCartMock = vi.fn();
        const setCartCountMock = vi.fn();
        let cart = [{product: products[0], quantity: 1}, {product: products[1], quantity: 1}];
        const user = userEvent.setup();

        render (
            <BrowserRouter>
                <Cart cart ={cart} setCart={setCartMock} setCartCount={setCartCountMock}/>
            </BrowserRouter>
        )
        const removeBtn = screen.getAllByRole('button', {name: 'remove product'});

        screen.debug()
       
        await user.click(removeBtn[1]);
      
        

        expect(setCartMock).toHaveBeenCalledWith([{ product: products[0], quantity: 1 }]);

        expect(setCartCountMock).toBeCalledWith(1);
   
        
    
    });

});
