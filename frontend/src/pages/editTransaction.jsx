import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import TransactionForm from "../components/TransactionForm";
import { getTransactionById } from "../services/transactionServices";

function EditTransaction() {
    const { id } = useParams();

    const [transaction, setTransaction] = useState(null);
    
        // Data Fetching
        async function loadTransaction() {
            try {
                const data = await getTransactionById(id);
                setTransaction(data);
            } catch (error) {
                console.error(error);
            }
        }
    
        useEffect(() => {
            loadTransaction();
        }, []);

    return <TransactionForm title="Edit Transaction" initialData= {transaction}/>;
}

export default EditTransaction;