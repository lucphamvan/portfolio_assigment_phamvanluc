// Write your answer here
import lineReader from "line-reader";
import { InvestedData, TRANSACTION } from "./type";
import { DATA_FILE_PATH } from "./config";
import { getPortfolioValue } from "./service";

function main() {
    let isFirstLine = true;
    const investedData: InvestedData = {};

    // handle invested amount coin from each line of transaction.csv file
    function handleInvestedData(line: string) {
        const [time, transaction, token, amount] = line.split(",");
        if (token in investedData) {
            if (transaction === TRANSACTION.DEPOSIT) {
                investedData[token] += Number(amount);
            } else if (transaction === TRANSACTION.WITHDRAW) {
                investedData[token] -= Number(amount);
            }
        } else {
            investedData[token] = Number(amount);
        }
    }

    // read line by line file and get invested amount coin
    // ignore first header line
    lineReader.eachLine(
        DATA_FILE_PATH,
        (line) => {
            if (!isFirstLine) {
                handleInvestedData(line);
            } else {
                isFirstLine = false;
            }
        },
        (err) => {
            if (err) throw err;
            getPortfolioValue(investedData).then((data) => console.log(data));
        }
    );
}

main();
