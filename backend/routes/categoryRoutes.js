const express = require("express");

const router = express.Router();

const { getCategory , 
        createCategory,
        getCategoryById,
        updateCategory,
        deleteCategory
} = require("../controllers/categoryControllers");

router.get("/", getCategory);
router.get("/:id", getCategoryById);

router.post("/", createCategory);
router.put("/:id", updateCategory);

router.delete("/:id", deleteCategory);

module.exports = router;

