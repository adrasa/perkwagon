const { Cart, CartItems, Products, ProductSpecifications, Users } = require('../../models/index');
const { calculateSubtotal } = require('../../reusable_module/utils')



const addToCart = async (req, res) => {
    try {
        // get the user from request
        const user = req.user;

        // check if the user is a member or not
        let isMember = await Users.findOne({ where: { auth_id: user.auth_id } });
        isMember = isMember.membership_status;

        // get the product id from request
        const product_id = req.body.product_id;

        // get the product specification id from request
        const specification_id = req.body.specification_id;

        // get the quantity from request
        const quantity = req.body.quantity;

        // get the cart of the user
        const cart = await Cart.findOne({ where: { auth_id: user.auth_id } });


        // calculate the subtotal of the item
        const subtotal = await calculateSubtotal(product_id, specification_id, quantity, isMember);


        // create a new cart item
        const cartItem = await CartItems.create({
            cart_id: cart.cart_id,
            product_id: product_id,
            specification_id: specification_id,
            quantity: quantity,
            subtotal: subtotal
        });

        return res.status(200).json({ msg: "Item added to cart successfully" });

    } catch (err) {
        return res.status(500).json({ msg: "Internal Server Error" });
    }


};

module.exports = addToCart;