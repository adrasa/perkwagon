const { Cart, CartItems, Users } = require("../../models/index");
const { calculateSubtotal } = require("../../reusable_module/utils");

const changeQuantity = async (req, res) => {
    try {
            
            // get the user from request
            const user = req.user;

            // check if the user is a member or not
            let isMember = await Users.findOne({ where: { auth_id: user.auth_id } });
            isMember = isMember.membership_status;

            // get the cart of the user
            const cart = await Cart.findOne({ where: { auth_id: user.auth_id } });
    
            // get the cart item id from request
            const cart_item_id = req.body.cart_item_id;
    
            // get the quantity from request
            const quantity = req.body.quantity;


            // if quantity is 0, delete the cart item
            if (quantity === 0) {
                await CartItems.destroy({ where: { cart_item_id: cart_item_id, cart_id: cart.cart_id } });
                return res.status(200).json({ msg: "Item removed from cart successfully" });
            }

    
            // get the cart item
            const cartItem = await CartItems.findOne({ where: { cart_item_id: cart_item_id, cart_id: cart.cart_id } });

            // calculate the subtotal of the item
            const subtotal = calculateSubtotal(cartItem.product_id, cartItem.specification_id, quantity, isMember);


            // update the subtotal of the cart item
            await CartItems.update({ subtotal: subtotal,quantity: quantity }, { where: { cart_item_id: cart_item_id, cart_id: cart.cart_id } });
    
            return res.status(200).json({ msg: "Quantity changed successfully" });

    } catch(err) {
        return res.status(500).json({ msg: "Internal Server Error" });
    }
};

module.exports = changeQuantity;