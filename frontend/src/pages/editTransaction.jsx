import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import TransactionForm from "../components/TransactionForm";
import { getTransactionById, updateTransaction } from "../services/transactionServices";

function EditTransaction() {
    const { id } = useParams();

    const [transaction, setTransaction] = useState(null);
    
        useEffect(() => {
            async function loadTransaction() {
                try {
                    const data = await getTransactionById(id);
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
            await updateTransaction(id,data)
        }

    return <TransactionForm title="Edit Transaction" initialData= {transaction} onSubmit={handleEdit}/>;
}

export default EditTransaction;