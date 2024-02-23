import { render, screen } from "@testing-library/react";
import React from "react";
import userEvent from "@testing-library/user-event"; // Import userEvent
import { MemoryRouter, BrowserRouter } from "react-router-dom";
import { expect, test } from "vitest";

import Header from "../src/components/Header";

describe('Header tests', () => {
    it('renders the header container with the logo, the nav, and the cart link', () => {
      render(
        <MemoryRouter>
            <Header/>
        </MemoryRouter>
        )

        expect(screen.getByAltText("logotype Teyasu")).toBeInTheDocument();
        expect(screen.getByText("Home")).toBeInTheDocument();
        expect(screen.getByText("Shop")).toBeInTheDocument();
        expect(screen.getByText("Cart")).toBeInTheDocument();

    });

    test("should navigate to home page when logo is clicked", () => {
        render(
            <BrowserRouter>
                <Header cartCount={0} />
            </BrowserRouter>
        );
        const logo = screen.getByAltText("logotype Teyasu");
        userEvent.click(logo);
        expect(window.location.pathname).toBe("/");
      });

    test("should show cart count if greater than zero", () => {
        render(
            <MemoryRouter>
                <Header cartCount={2}/>
            </MemoryRouter>
        )
        expect(screen.getByText("2")).toBeInTheDocument();

    })

});
