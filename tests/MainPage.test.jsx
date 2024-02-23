import { getByRole, getByTitle, render, screen, within } from "@testing-library/react";
import React from "react";
import userEvent from "@testing-library/user-event"; // Import userEvent
import { MemoryRouter, BrowserRouter } from "react-router-dom";
import { describe, expect, test } from "vitest";


import productsList from "../src/components/productsList";

const products = productsList;


import MainPage from "../src/components/MainPage";

describe('MainPage', () => {
   it('renders banner, logo, description, link', () => {
        render(
           <MemoryRouter>
                <MainPage/>
           </MemoryRouter>
        )

        expect(screen.getByText("Use 01001 promo-code for 10% off")).toBeInTheDocument();
        expect(screen.getByText(/We offer: unique and elegant pieces/)).toBeInTheDocument();
        expect(screen.getByAltText('teyasu logo')).toBeInTheDocument();
        expect(screen.getByText("Shop")).toBeInTheDocument();

   });

   it('should navigate to shopping page when Shop is clicked',async () => {
        render(
            <BrowserRouter>
                <MainPage/>
            </BrowserRouter>
        )

        const shopBtn = screen.getByText('Shop');
        await userEvent.click(shopBtn);
        expect(window.location.pathname).toBe("/shop"); 
     
   });

   it('renders featured products', () => {
        render(
            <BrowserRouter>
                <MainPage/>
            </BrowserRouter>
        )

        const featuredProductsContainer = screen.getByRole('list', {name: 'Featured Products'});
        const featuredProducts = within(featuredProductsContainer).getAllByRole('listitem');

        expect(featuredProducts.length).toBe(9);

        for (let index = 0; index < featuredProducts.length; index++) {
            const item = featuredProducts[index];
            const image = item.querySelector('img');
            expect(image).toHaveAttribute('src', products[index].src);
            expect(image).toHaveAttribute('alt', products[index].name);
            
            const name = item.querySelector('h5');
            expect(name).toHaveTextContent(products[index].name);

            const price = item.querySelector('h4');
            expect(price).toHaveTextContent(products[index].price);

            const cartIcon = item.querySelector('svg');
            expect(cartIcon).toBeInTheDocument();
   
        }
   });

   it('should call the setCurrentProduct and navigate functions when a product is clicked', async  () => {
       
        const mockFunc = vi.fn()
        const user = userEvent.setup()
        render(
            <BrowserRouter>
                <MainPage setCurrentProduct={mockFunc}/>
            </BrowserRouter>
        )  
        const ring = screen.getByText(/Stritus Silver Unisex Ring/);

        await user.click(ring)

        expect(window.location.pathname).toBe('/shop')
        expect(mockFunc).toHaveBeenCalled();
        
   })

     
})