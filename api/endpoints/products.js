const express = require("express");
const authcheck = require("../middleware/authcheck");
const router = express.Router();

// GET /products - Get all products
router.get("/products", authcheck, async (req, res) => {
    const pool = req.app.get('db'); // Access the global pool
    try {
        const result = await pool.query("SELECT * FROM products ORDER BY id DESC");
        res.json(result.rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Database error fetching products" });
    }
});

// GET /products/mylistings - Get products for the logged-in user
router.get("/products/mylistings", authcheck, async (req, res) => {
    const pool = req.app.get('db');
    try {
        const userEmail = req.user.email;
        const result = await pool.query(
            "SELECT * FROM products WHERE owner_email = $1 ORDER BY id DESC",
            [userEmail]
        );
        res.json(result.rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Database error fetching your listings" });
    }
});

// POST /products - Create a new listing
router.post("/products", authcheck, async (req, res) => {
    const pool = req.app.get('db');
    const { title, price, image_url } = req.body;
    const owner_email = req.user.email;

    try {
        const result = await pool.query(
            "INSERT INTO products (title, price, image_url, owner_email) VALUES ($1, $2, $3, $4) RETURNING *",
            [title, price, image_url, owner_email]
        );
        res.status(201).json(result.rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Database error creating product" });
    }
});

router.delete("/products/:id", authcheck, async (req, res) => {
    const pool = req.app.get('db');
    const productId = req.params.id;
    const ownerEmail = req.user.email; // Use email to match your schema

    try {
        // Delete the product only if it belongs to the authenticated user
        const result = await pool.query(
            "DELETE FROM products WHERE id = $1 AND owner_email = $2",
            [productId, ownerEmail]
        );

        if (result.rowCount === 0) {
            return res.status(404).json({ message: "Listing not found or unauthorized" });
        }

        res.status(200).json({ message: "Listing deleted successfully" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error while deleting listing" });
    }
});


module.exports = router;