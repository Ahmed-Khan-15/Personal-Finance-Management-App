import TransactionForm from "../components/TransactionForm";
import { postTransaction } from "../services/transactionServices";
import { postRecurringTransaction } from "../services/recurringTransactionsServices";


function AddTransaction() {
    
    async function handleAdd(data) {

        if (data.isRecurring) {

                const {
                    category_id,
                    repeat_interval,
                    description,
                    amount,
                    transaction_type,
                    start_date,
                    end_date
                } = data;
                console.log(data);
                await postRecurringTransaction({
                    category_id,
                    repeat_interval,
                    description,
                    amount,
                    transaction_type,
                    start_date,
                    end_date

                });
                
            }
            else {
                const {
                    category_id,
                    description,
                    amount,
                    transaction_type,
                    transaction_date
                } = data;
                console.log(data);
                await postTransaction({
                    category_id,
                    recurring_transaction_id: null,
                    description,
                    amount,
                    transaction_type,
                    transaction_date
                });
                
            }
    }

    return <TransactionForm title="Add Transaction" onSubmit={handleAdd}/>;
}

export default AddTransaction;