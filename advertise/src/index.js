const express = require("express");
const path = require("path");

if (!process.env.PORT) {
    throw new Error("Please specify the port number for the HTTP server with the environment variable PORT.");
}

const PORT = process.env.PORT;

//
// Application entry point.
//
async function main() {
    const app = express();

    app.use(express.static("public"));

    //
    // API endpoint to get advertisement data.
    //
    app.get("/advertisements", (req, res) => {
        const advertisements = [
            {
                id: 1,
                name: "Shopee",
                description: "Shopee - Online Shopping Platform",
                imageUrl: "/images/shopee.png",
                websiteUrl: "https://shopee.co.th",
                featured: true
            },
            {
                id: 2,
                name: "Lazada",
                description: "Lazada - Leading eCommerce Platform in Southeast Asia",
                imageUrl: "/images/lazada.svg",
                websiteUrl: "https://www.lazada.co.th",
                featured: true
            },
            {
                id: 3,
                name: "Kaidee",
                description: "Kaidee - Thailand's Largest Marketplace",
                imageUrl: "/images/kaidee.jpg",
                websiteUrl: "https://www.kaidee.com",
                featured: true
            }
        ];

        res.json({ advertisements });
    });

    //
    // Health check endpoint.
    //
    app.get("/health", (req, res) => {
        res.json({ status: "OK", service: "advertise" });
    });

    app.listen(PORT, () => {
        console.log(`Advertise microservice online on port ${PORT}`);
    });
}

main()
    .catch(err => {
        console.error("Advertise microservice failed to start.");
        console.error(err && err.stack || err);
    });