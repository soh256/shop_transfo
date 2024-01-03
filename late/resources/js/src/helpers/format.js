export const formatPrice = (number) => {
    return new Intl.NumberFormat("fr", {
        style: "currency",
        currency: "XAF",
    }).format(number);
};
