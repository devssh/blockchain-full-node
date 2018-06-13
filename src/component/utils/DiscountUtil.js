export function get_discount(type, discount) {
    if (type == '$') {
        discount = type + discount
    } else {
        discount = discount + '%'
    }
    return discount;
}
