export function formatPrice(price: number) {
    const dollarUS = Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
    });
    return dollarUS.format(price);
}
