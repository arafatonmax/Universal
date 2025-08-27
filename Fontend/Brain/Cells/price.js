export function getDiscountedPrice(price, discount) {
    const discounted = price - (price * discount / 100);
    return discounted.toFixed(2);
}