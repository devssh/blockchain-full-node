export function get_discount(type, discount) {
    if (type == '$') {
        discount = type + discount
    } else if (type == '%') {
        discount = discount + type
    }
    return discount;
}
