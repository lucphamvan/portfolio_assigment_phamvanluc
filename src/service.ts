import axios from "axios";
import { GET_PRICE_URL } from "./config";
import { InvestedData } from "./type";
import { formatPrice } from "./util";

/**
 * get portfolio of invested coin
 * @param data data of invested coin. Have format { "token": amount }
 * @returns
 */
export async function getPortfolioValue(data: InvestedData) {
    try {
        const fsyms = Object.keys(data).join(",");
        const tsyms = "USD";
        // get price of token from api
        const response = await axios.get(GET_PRICE_URL, {
            params: { fsyms, tsyms },
        });

        // price format { BTC: { USD: 16822.67 }, ETH: { USD: 1218.25 }, XRP: { USD: 0.3481 } }
        const tokenPrice = response.data;

        // get output invested data
        const outputInvestedData: Record<string, string> = {};
        Object.keys(data).forEach((token) => {
            outputInvestedData[token] = formatPrice(data[token] * tokenPrice[token]["USD"]);
        });
        return outputInvestedData;
        // output have this format : { BTC: '$670,552,215.88', ETH: '$37,234,933.21', XRP: '$10,307.72' }
    } catch (error: any) {
        return "there's an error when get data : " + error.message;
    }
}
