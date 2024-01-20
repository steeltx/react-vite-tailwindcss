/**
 * Calcular el precio total de acuerdo a los productos en el carrito
 * @param { Array } products  cartProducts: Array of Objects
 * @returns { number } Total price
 */
export const totalPrice = ( products ) => {
    let sum = 0;
    products.forEach(product => sum += product.price);
    return sum.toFixed(2);
}