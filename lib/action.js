"use server"

export async function getAllProductsAction() {
    const response = await fetch("https://fakestoreapi.com/products");
    if (!response.ok) {
        throw new Error("Failed to fetch products");
    }
    const products = await response.json();
    return products;
}