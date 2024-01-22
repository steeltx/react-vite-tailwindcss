import imgGenerica from '../assets/img/coming-soon.jpg';


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

/**
 * Validar que una url de imagen es valida
 * @param {String} url 
 * @returns {String} URL de parametro o url de img generica
 */
export const validarURL = (url) => {
    try{
        const urlValidar = new URL(url);
        return url;
    }
    catch{
        return imgGenerica;
    }
}
