import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getCategories, postCategory } from "../services/categoryServices";


function TransactionForm({ title, initialData, onSubmit, redirect = "/transactions" }) {
    const navigate = useNavigate();
    const [categories, setCategories] = useState([]);
    const [showCategoryInput, setShowCategoryInput] = useState(false);
    const [newCategory, setNewCategory] = useState("");
    const [formData, setFormData] = useState({
        category_id: "",
        description: "",
        amount: "",
        transaction_type: "expense",
        transaction_date: new Date().toISOString().split("T")[0],
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
            transaction_date: new Date().toISOString().split("T")[0],
            isRecurring: false,
            repeat_interval: "monthly",
            start_date: "",
            end_date: "",
        });
        navigate(redirect);
    }

    function handleChange(e) {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value
        }));

    }

    async function handleSubmit(e) {

        e.preventDefault();

        try {
            await onSubmit(formData);
            navigate(redirect);
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

    async function handleAddCategory() {

        if (!newCategory.trim()) {
            return;
        }
        try {
            const category = await postCategory({
                name: newCategory
            });

            setCategories(prev => [
                ...prev,
                category
            ]);
            setFormData(prev => ({
                ...prev,
                category_id: category.id
            }));
            setNewCategory("");
            setShowCategoryInput(false);

        }
        catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        loadCategories();
    }, []);

    useEffect(() => {
        if (initialData) {
            // eslint-disable-next-line react-hooks/set-state-in-effect
            setFormData(prev => ({
                ...prev,
                ...initialData,
                isRecurring: !!initialData.repeat_interval,
                start_date: initialData.start_date?.split("T")[0],
                end_date: initialData.end_date?.split("T")[0],
            }));
        }
    }, [initialData]);


    return (
        <div className="transaction-form-page mx-auto max-w-2xl">
            <div className="mb-6">
                <h1 className="page-title text-2xl font-bold tracking-tight sm:text-3xl">{title}</h1>
            </div>
            <form onSubmit={handleSubmit} className="transaction-form space-y-5 rounded-2xl border p-5 shadow-sm sm:p-8">
                <div className="space-y-2">
                <label className="form-label text-sm font-medium" htmlFor="description">Description</label>
                <input
                    required
                    id="description"
                    name="description"
                    type="text"
                    value={formData.description}
                    onChange={handleChange}
                    placeholder="e.g. Grocery shopping"
                    className="form-input w-full rounded-xl border px-3 py-2.5 outline-none transition focus:border-[#318097] focus:ring-2 focus:ring-[#318097]/20"
                />
                </div>

                <div className="space-y-2">
                <label className="form-label text-sm font-medium" htmlFor="amount">Amount</label>
                <input
                    required
                    id="amount"
                    name="amount"
                    type="number"
                    value={formData.amount}
                    onChange={handleChange}
                    placeholder="0.00"
                    className="form-input w-full rounded-xl border px-3 py-2.5 outline-none transition focus:border-[#318097] focus:ring-2 focus:ring-[#318097]/20"
                />
                </div>

                <div className="space-y-2">
                <label className="form-label text-sm font-medium">Category</label>
                <select
                    name="category_id"
                    value={formData.category_id}
                    onChange={handleChange}
                    className="form-input w-full rounded-xl border px-3 py-2.5 outline-none transition focus:border-[#318097] focus:ring-2 focus:ring-[#318097]/20"
                >
                    <option value="">Select Category</option>
                    {categories.map((category) => (
                        <option key={category.id} value={category.id}>
                            {category.name}
                        </option>
                    ))}
                </select>

                <button className="add-category-link text-sm font-medium transition" type="button" onClick={() => { setShowCategoryInput(true) }}>+ Add Category</button>
                </div>
                {
                    showCategoryInput && (
                        <div className="transaction-category-panel space-y-3 rounded-xl p-4">
                            <label className="form-label text-sm font-medium" htmlFor="category_name">Category Name</label>
                            <input type="text"
                                id="category_name"
                                name="category_name"
                                value={newCategory}
                                onChange={(e) => { setNewCategory(e.target.value) }}
                                placeholder="e.g. Groceries"
                                className="form-input w-full rounded-xl border px-3 py-2.5 outline-none transition focus:border-[#318097] focus:ring-2 focus:ring-[#318097]/20"
                            />
                            <div className="flex gap-3">
                            <button className="rounded-xl bg-[#318097] px-4 py-2 text-sm font-medium text-white transition hover:bg-[#225969]" type="button" onClick={handleAddCategory}>Save</button>
                            <button className="form-cancel-btn rounded-xl border px-4 py-2 text-sm font-medium transition" type="button" onClick={() => {
                                setShowCategoryInput(false);
                                setNewCategory("");
                            }} >Cancel</button>
                            </div>
                        </div>
                    )
                }
                <div className="grid grid-cols-2 gap-3">
                <button
                    type="button"
                    onClick={() =>
                        setFormData({
                            ...formData,
                            transaction_type: "income"
                        })}
                    className={`transaction-type-button rounded-xl border px-4 py-2.5 font-medium transition ${formData.transaction_type === "income" ? "type-income-active" : "type-inactive"}`}>
                    {formData.transaction_type === "income" ? "✓ " : ""}Income
                </button>

                <button
                    type="button"
                    onClick={() =>
                        setFormData({
                            ...formData,
                            transaction_type: "expense"
                        })}
                    className={`transaction-type-button rounded-xl border px-4 py-2.5 font-medium transition ${formData.transaction_type === "expense" ? "type-expense-active" : "type-inactive"}`}>
                    {formData.transaction_type === "expense" ? "✓ " : ""}Expense
                </button>
                </div>

                <label className="transaction-recurring-toggle flex items-center gap-3 rounded-xl p-3 text-sm font-medium" htmlFor="isRecurring">Recurring Transaction
                <input className="h-4 w-4 rounded text-[#318097] focus:ring-[#318097]"
                    id="isRecurring"
                    name="isRecurring"
                    type="checkbox"
                    onChange={handleChange}
                    checked={formData.isRecurring}
                    disabled={initialData?.repeat_interval}
                /></label>

                {formData.isRecurring ? (
                    <div className="recurring-fields space-y-5 border-l-2 border-[#318097]/30 pl-4">
                        <select
                            name="repeat_interval"
                            value={formData.repeat_interval}
                            onChange={handleChange}
                            className="form-input w-full rounded-xl border px-3 py-2.5 outline-none transition focus:border-[#318097] focus:ring-2 focus:ring-[#318097]/20"
                        >
                            <option value="daily">Daily</option>
                            <option value="weekly">Weekly</option>
                            <option value="monthly">Monthly</option>
                            <option value="yearly">Yearly</option>
                        </select>

                        <div className="space-y-2">
                        <label className="form-label text-sm font-medium" htmlFor="start_date">Start Date</label>
                        <input
                            required
                            id="start_date"
                            name="start_date"
                            type="date"
                            value={formData.start_date}
                            onChange={handleChange}
                            className="form-input w-full rounded-xl border px-3 py-2.5 outline-none transition focus:border-[#318097] focus:ring-2 focus:ring-[#318097]/20"
                        />
                        </div>

                        <div className="space-y-2">
                        <label className="form-label text-sm font-medium" htmlFor="end_date">End Date</label>
                        <input
                            id="end_date"
                            name="end_date"
                            type="date"
                            value={formData.end_date}
                            onChange={handleChange}
                            className="form-input w-full rounded-xl border px-3 py-2.5 outline-none transition focus:border-[#318097] focus:ring-2 focus:ring-[#318097]/20"
                        />
                        </div>
                    </div>
                ) : (
                    <div className="space-y-2">
                    <label className="form-label text-sm font-medium" htmlFor="transaction_date">Transaction Date</label>
                        <input
                            required
                            id="transaction_date"
                            name="transaction_date"
                            type="date"
                            value={formData.transaction_date}
                            onChange={handleChange}
                            className="form-input w-full rounded-xl border px-3 py-2.5 outline-none transition focus:border-[#318097] focus:ring-2 focus:ring-[#318097]/20"
                        />
                    </div>
                )}

                <div className="flex flex-col-reverse gap-3 pt-2 sm:flex-row sm:justify-end">
                <button className="transaction-form-cancel rounded-xl border px-5 py-2.5 font-medium transition" type="button" onClick={handleCancel}>
                    Cancel
                </button>
                <button className="rounded-xl bg-[#318097] px-5 py-2.5 font-medium text-white shadow-sm transition hover:bg-[#225969]" type="submit">{initialData ? "Save Changes" : "Add"}</button>
                </div>
            </form>
        </div>
    );
}

export default TransactionForm;
