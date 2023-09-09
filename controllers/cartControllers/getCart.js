const {Cart, CartItems, Users} = require("../../models/index");

const getCart = async (req, res) => {
    try {

        // get the user from request
        const user = req.user;

        // get the cart of the user
        const cart = await Cart.findOne({ where: { auth_id: user.auth_id } });

        // get the cart items of the cart
        const cartItems = await CartItems.findAll({ where: { cart_id: cart.cart_id } });

        // calculate the total amount of the cart
        let totalAmount = 0;
        cartItems.forEach(cartItem => {
            totalAmount += cartItem.subtotal;
        });

        // store the total amount in the cart
        await Cart.update({ total_amount: totalAmount }, { where: { cart_id: cart.cart_id } });

        // send the cart items
        return res.status(200).json({ cartItems: cartItems });


    } catch(err) {
        return res.status(500).json({ msg: "Internal Server Error" });
    }
};

module.exports = getCart;