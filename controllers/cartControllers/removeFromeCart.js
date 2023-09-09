const { Cart, CartItems } = require("../../models/index");

const removeFromCart = async (req, res) => {
    try {

        // get the user from request
        const user = req.user;

        // get the cart of the user
        const cart = await Cart.findOne({ where: { auth_id: user.auth_id } });

        // get the cart item id from request
        const cart_item_id = req.body.cart_item_id;

        // delete the cart item
        await CartItems.destroy({ where: { cart_item_id: cart_item_id, cart_id: cart.cart_id } });

        return res.status(200).json({ msg: "Item removed from cart successfully" });

    } catch(err) {
        return res.status(500).json({ msg: "Internal Server Error" });
    }
};

module.exports = removeFromCart;