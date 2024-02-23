import { getByAltText, getByRole, getByTitle, render, screen, within } from "@testing-library/react";
import React from "react";
import userEvent from "@testing-library/user-event"; // Import userEvent
import { BrowserRouter } from "react-router-dom";
import { beforeEach, describe, expect, test } from "vitest";


import ShoppingPage from '../src/components/ShoppingPage'

import products from "../src/components/productsList";


// {cart, setCart, currentProduct, setCurrentProduct, setCartCount}

describe('Shopping Page', () => {
    it('Should render products', () => {
        render(
            <BrowserRouter>
                <ShoppingPage />
            </BrowserRouter>
        )

        const productsContainer = screen.getByRole('list', {name:'Products'});
        const productsList = within(productsContainer).getAllByRole('listitem');
        expect(productsList.length).toBe(9);

        for (let index = 0; index < productsList.length; index++) {
            const element = productsList[index];
            expect(element.querySelector('img')).toBeInTheDocument();
            expect(element.querySelector('h5')).toHaveTextContent(products[index].name);
            expect(element.querySelector('h4')).toHaveTextContent(products[index].price);
            
        }
    });

    it('Should render a product page if passed currentPage state = true', ()=> {
        render(
            <BrowserRouter>
                <ShoppingPage currentProduct={products[0]} />
            </BrowserRouter>
        )
        
        const ring = screen.getByRole('heading', {name: 'Stritus Silver Unisex Ring', level: 1});
        expect(ring).toBeInTheDocument();
    });

    it('Should close the product window, setCurrentProduct when close btn clicked', async () => {
        const mockFunc = vi.fn()
        render(
            <BrowserRouter>
                <ShoppingPage currentProduct={products[0]}  setCurrentProduct = {mockFunc} />
            </BrowserRouter>
        )

        const closeBtn = screen.getByRole('button', {name: 'close button'});

        await userEvent.click(closeBtn);

        expect(closeBtn).not.toBeInTheDocument();
        expect(mockFunc).toHaveBeenCalled()

    })
});

