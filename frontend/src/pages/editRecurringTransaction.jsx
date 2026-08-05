import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import TransactionForm from "../components/TransactionForm";
import { getRecurringTransactionById, updateRecurringTransaction } from "../services/recurringTransactionsServices";

function EditRecurringTransaction() {
    const { id } = useParams();

    const [transaction, setTransaction] = useState(null);
    
        useEffect(() => {
            async function loadTransaction() {
                try {
                    const data = await getRecurringTransactionById(id);
                    setTransaction(data);
                } catch (error) {
                    console.error(error);
                }
            }
            loadTransaction();
        }, [id]);

        if(!transaction){
            return <h1>Loading...</h1>
        }

        async function handleEdit(data) {
            await updateRecurringTransaction(id,data)
        }

    return <TransactionForm 
    title="Edit Recurring Transaction" 
    initialData= {transaction} 
    redirect="/recurring-transactions" 
    onSubmit={handleEdit}/>;
}

export default EditRecurringTransaction;


    