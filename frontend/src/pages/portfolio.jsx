import { useEffect, useState } from "react";
import getPortfolio from "../services/portfolioServices";

function Portfolio() {

    const [portfolio, setPortfolio] = useState(null);

    useEffect(() => {

        async function loadPortfolio() {

            try {

                const data = await getPortfolio();

                setPortfolio(data);

            } catch (error) {
                console.error(error);
            }

        }

        loadPortfolio();

    }, []);

    if (!portfolio) {
        return <h1>Loading...</h1>;
    }

    return (
        <>
            <h1>Portfolio</h1>

            <h2>Income: {portfolio.totalIncome}</h2>

            <h2>Expense: {portfolio.totalExpense}</h2>

            <h2>balance: {portfolio.balance}</h2>


        </>
    );
}

export default Portfolio;