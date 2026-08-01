import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getCategories } from "../services/categoryServices";
import { postTransaction } from "../services/transactionServices";
import { postRecurringTransaction } from "../services/recurringTransactionsServices";
import { postCategory } from "../services/categoryServices";


function TransactionForm({ title, initialData, onSubmit }) {
    const navigate = useNavigate();
    const [categories, setCategories] = useState([]);
    const [showCategoryInput, setShowCategoryInput] = useState(false);
    const [newCategory, setNewCategory] = useState(""); 
    const [formData, setFormData] = useState({
        category_id: "",
        description: "",
        amount: "",
        transaction_type: "expense",
        transaction_date: "1",
        isRecurring: false,
        repeat_interval: "monthly",
        start_date: "",
        end_date: "",
    });

    // HANDLERS

    function handleCancel() {
        setFormData({
            category_id: "",
            description: "",
            amount: "",
            transaction_type: "expense",
            transaction_date: "1",
            isRecurring: false,
            repeat_interval: "monthly",
            start_date: "",
            end_date: null,
        });
        navigate("/transactions");
    }

    function handleChange(e) {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === "checkbox" ?
                checked :
                value
        });

    }

    async function handleSubmit(e) {

        e.preventDefault();

        try {
            if (formData.isRecurring) {

                const {
                    category_id,
                    repeat_interval,
                    description,
                    amount,
                    transaction_type,
                    start_date,
                    end_date
                } = formData;

                const data = await postRecurringTransaction({
                    category_id,
                    repeat_interval,
                    description,
                    amount,
                    transaction_type,
                    start_date,
                    end_date

                });
                navigate("/transactions");
            }
            else {
                const {
                    category_id,
                    recurring_transaction_id,
                    description,
                    amount,
                    transaction_type
                } = formData;

                const data = await postTransaction({
                    category_id,
                    recurring_transaction_id: null,
                    description,
                    amount,
                    transaction_type
                });
                navigate("/transactions");
            }
        }
        catch (error) {
            console.error(error);
        }

    }

    async function loadCategories() {
        try {
            const data = await getCategories();
            setCategories(data);
        }
        catch (error) {
            console.error(error);
        }
    };

    async function handleAddCategory(){

        if(!newCategory.trim()){
            return;
        }
        try {
            const category = await postCategory({
                name: newCategory
            });

            setCategories([
                ...categories,
                category
            ]);
            setFormData({
                ...formData,
                category_id: category.id
        });
        setNewCategory("");
        setShowCategoryInput(false);

        }
        catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        loadCategories();
    }, []);


    return (
        <>
            <h1>{title}</h1>
            <form onSubmit={handleSubmit}>
                <label htmlFor="description">Description</label>
                <input
                    required
                    id="description"
                    name="description"
                    type="text"
                    value={formData.description}
                    onChange={handleChange}
                />

                <label htmlFor="amount">Amount</label>
                <input
                    required
                    id="amount"
                    name="amount"
                    type="number"
                    value={formData.amount}
                    onChange={handleChange}
                />

                <select
                    name="category_id"
                    value={formData.category_id}
                    onChange={handleChange}
                >
                    <option value="">Select Category</option>
                    {categories.map((category) => (
                        <option key={category.id} value={category.id}>
                            {category.name}
                        </option>
                    ))}
                </select>

                <button type="button" onClick={()=>{ setShowCategoryInput(true)}}>Add Category</button>   
                {
                    showCategoryInput && (
                        <>
                            <label htmlFor="category_name">Category Name</label>
                            <input type="text"
                                   id= "category_name"
                                   name="category_name"
                                   value={newCategory}
                                   onChange={ (e)=>{ setNewCategory(e.target.value)}}
                                   />
                            <button type="button" onClick={handleAddCategory}>Save</button>
                            <button type="button" onClick={ ()=>{ 
                                setShowCategoryInput(false);
                                setNewCategory("");
                             }} >Cancel</button>
                        </>
                    )
                }
                <button
                    type="button"
                    onClick={() =>
                        setFormData({
                            ...formData,
                            transaction_type: "income"
                        })}
                >
                    {formData.transaction_type === "income" ? "✓" : " "}Income
                </button>

                <button
                    type="button"
                    onClick={() =>
                        setFormData({
                            ...formData,
                            transaction_type: "expense"
                        })}
                >
                    {formData.transaction_type === "expense" ? "✓" : " "}Expense
                </button>

                <label htmlFor="isRecurring">Recurring Transaction</label>
                <input
                    id="isRecurring"
                    name="isRecurring"
                    type="checkbox"
                    onChange={handleChange}
                    checked={formData.isRecurring}
                />

                {formData.isRecurring ? (
                    <>
                        <select
                            name="repeat_interval"
                            value={formData.repeat_interval}
                            onChange={handleChange}
                        >
                            <option value="daily">Daily</option>
                            <option value="weekly">Weekly</option>
                            <option value="monthly">Monthly</option>
                            <option value="yearly">Yearly</option>
                        </select>

                        <label htmlFor="start_date">Start Date</label>
                        <input
                            required
                            id="start_date"
                            name="start_date"
                            type="date"
                            value={formData.start_date}
                            onChange={handleChange}
                        />

                        <label htmlFor="end_date">End Date</label>
                        <input
                            id="end_date"
                            name="end_date"
                            type="date"
                            value={formData.end_date}
                            onChange={handleChange}
                        />
                    </>
                ) : (
                    <>
                        <label htmlFor="transaction_date">Transaction Date</label>
                        <input
                            required
                            id="transaction_date"
                            name="transaction_date"
                            type="date"
                            value={formData.transaction_date}
                            onChange={handleChange}
                        />
                    </>
                )}

                <button type="button" onClick={handleCancel}>
                    Cancel
                </button>
                <button type="submit">Add</button>
            </form>
        </>
    );
}

export default TransactionForm;