import type { Product } from "../types/product";

export const productsData: Product[] = [
{
    id: 1,
    name: "Liverpool FC Home Jersey 24/25",
    brand: "Nike",
    team: "Liverpool",
    price: 79.99,
    image: "https://images.unsplash.com/photo-1618354691434-0a1b5b2de83b?auto=format&fit=crop&w=1000&q=80",
    description:
    "Official Liverpool FC home jersey for 2024/25 with Nike Dri-FIT for breathable comfort on and off the pitch.",
    sizes: ["S", "M", "L", "XL"],
},
{
    id: 2,
    name: "FC Barcelona Home Jersey 24/25",
    brand: "Nike",
    team: "Barcelona",
    price: 85.0,
    image: "/assets/jerseys/Bacalona.jpg",
    description:
    "Barça home kit crafted with lightweight performance fabric and classic blaugrana stripes.",
    sizes: ["M", "L", "XL"],
},
{
    id: 3,
    name: "Bayern Munich Home Jersey 24/25",
    brand: "Adidas",
    team: "Bayern Munich",
    price: 89.99,
    image: "https://images.unsplash.com/photo-1627646413442-33a611c4a64e?auto=format&fit=crop&w=1000&q=80",
    description:
    "Bayern Munich authentic jersey with AEROREADY tech — moisture-wicking and match-ready.",
    sizes: ["S", "M", "L"],
},
{
    id: 4,
    name: "Paris Saint-Germain Home Jersey 24/25",
    brand: "Jordan",
    team: "PSG",
    price: 92.0,
    image: "/assets/jerseys/PSG.jpg",
    description:
    "PSG home shirt featuring the Jumpman logo and a sleek, modern sash design.",
    sizes: ["S", "M", "L", "XL"],
},
];
