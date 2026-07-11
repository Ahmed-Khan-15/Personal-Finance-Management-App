const pool = require("../config/db");

const getCategory = async (req, res) => {
    try {
        const user_id = 8;
        const query = `SELECT * FROM categories WHERE user_id IS NULL OR user_id = $1`;
        const result = await pool.query(query, [user_id]);
        res.json(result.rows);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            message: "something went wrong"
        });
    }
};

const getCategoryById = async (req, res) => {
    try {

        const { id } = req.params;

        const categoryID = Number(id);

        if (Number.isNaN(categoryID)) {
            return res.status(400).json({
                message: "Invalid category ID"
            });
        }

        const result = await pool.query("SELECT * FROM categories WHERE id = $1;", [categoryID]);
        if (result.rowCount === 0) {
            return res.status(404).json({
                message: "categories not found"
            });
        }

        res.json(result.rows[0]);

    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            message: "something went wrong"
        });
    }

};

const createCategory = async (req, res) => {

    try {

        const { user_id, name } = req.body;

        if (
            user_id === undefined ||
            !name
        ) {
            return res.status(400).json({
                message: "Missing required fields"
            });
        }

        const query = `
            INSERT INTO categories (
                user_id,
                name
                )
                VALUES ($1, $2)
                RETURNING *;
                `;
        const values = [
            user_id,
            name
        ];
        const result = await pool.query(query, values);
        res.status(201).json(result.rows[0]);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            message: "something went wrong"
        });
    }
};


const updateCategory = async (req, res) => {

    try {

        const { id } = req.params;

        const categoryID = Number(id);

        if (Number.isNaN(categoryID)) {
            return res.status(400).json({
                message: "Invalid category ID"
            });
        }

        const { user_id, name } = req.body;

        if (
            user_id === undefined ||
            !name
        ) {
            return res.status(400).json({
                message: "Missing required fields"
            });
        }

        const query = `
            UPDATE categories
            SET
                user_id = $1,
                name = $2

            WHERE user_id IS NOT NULL AND id = $3
            RETURNING *;
                `;
        const values = [
            user_id,
            name,
            categoryID
        ];

        const result = await pool.query(query, values);

        if (result.rowCount === 0) {
            return res.status(404).json({
                message: "Category not found"
            });
        }
        res.status(200).json(result.rows[0]);

    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            message: "something went wrong"
        });
    }

};


const deleteCategory = async (req, res) => {

    try {

        const { id } = req.params;

        const categoryID = Number(id);

        if (Number.isNaN(categoryID)) {
            return res.status(400).json({
                message: "Invalid category ID"
            });
        }

        const query = `
        DELETE FROM categories
        WHERE user_id IS NOT NULL AND id = $1
        RETURNING *;`;

        const value = [
            categoryID
        ];
        const result = await pool.query(query, value);
        if (result.rowCount === 0) {
            return res.status(404).json({
                message: "Category not found or cannot be deleted"
            });
        }
        res.status(200).json(result.rows[0]);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            message: "something went wrong"
        });
    }

};



module.exports = {
    getCategory,
    createCategory,
    getCategoryById,
    updateCategory,
    deleteCategory
};