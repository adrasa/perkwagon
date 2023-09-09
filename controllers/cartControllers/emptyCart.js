const {Cart, CartItems} = require("../../models/index");

const emptyCart = async (req, res) => {
    try {
            
            // get the user from request
            const user = req.user;
    
            // get the cart of the user
            const cart = await Cart.findOne({ where: { auth_id: user.auth_id } });
    
            // delete all cart items which belong to the cart
            await CartItems.destroy({ where: { cart_id: cart.cart_id } });
    
            return res.status(200).json({ msg: "Cart emptied successfully" });
    } catch(err) {
        return res.status(500).json({ msg: "Internal Server Error" });
    }
};

module.exports = emptyCart;