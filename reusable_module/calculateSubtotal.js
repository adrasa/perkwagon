const {ProductSpecifications} = require('../models/index');
const calculateSubtotal = async ( specification_id, quantity, isMember) => {
    let subtotal = 0;
    // get the product specification from the database
    const productSpecification = await ProductSpecifications.findOne({ where: { specification_id: specification_id } });
    if (isMember) {
        subtotal = productSpecification.price_for_member * quantity;
    } else {
        subtotal = productSpecification.price_for_user * quantity;
    }

    return subtotal;
};
module.exports = calculateSubtotal;