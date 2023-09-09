const ProductSpecifications = require('../models').ProductSpecifications;


const expiresInToMilliseconds = (expiresIn) => {
    const unit = expiresIn.charAt(expiresIn.length - 1);
    const duration = Number(expiresIn.substring(0, expiresIn.length - 1));

    if (unit === 's') return duration * 1000; // seconds
    if (unit === 'm') return duration * 60 * 1000; // minutes
    if (unit === 'h') return duration * 60 * 60 * 1000; // hours
    if (unit === 'd') return duration * 24 * 60 * 60 * 1000; // days

    return 0;
};

// function to calculate the subtotal of the item
const calculateSubtotal = async (product_id, specification_id, quantity, isMember) => {
    let subtotal = 0;
    // get the product specification from the database
    const productSpecification = await ProductSpecifications.findOne({ where: { product_id: product_id, specification_id: specification_id } });

    if (isMember) {
        subtotal = productSpecification.price_for_member * quantity;
    } else {
        subtotal = productSpecification.price_for_user * quantity;
    }

    return subtotal;
};


module.exports = { expiresInToMilliseconds, calculateSubtotal};
