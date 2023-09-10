const { Sellers } = require('../../models/index');
const editSellerDetails = async (req, res) => {
    try {

        const seller_id = req.params.seller_id;
        const seller = await Sellers.findOne({ where: { seller_id } });
        if (!seller) return res.status(400).json({ msg: 'No seller found' });
        
        const {  seller_name, phone_number, business_name, goverment_issued_id, gstin, business_phone_number, business_whatsapp_number, business_email, business_address_line_1, business_address_line_2, business_address_city, business_address_state, business_address_pincode, business_address_landmark,website, delivery_partner_name, shipping_charge, order_tracking_url, terms_and_conditions } = req.body;

        

        await Sellers.update({ seller_name, phone_number, business_name, goverment_issued_id, gstin, business_phone_number, business_whatsapp_number, business_email, business_address_line_1, business_address_line_2, business_address_city, business_address_state, business_address_pincode, business_address_landmark, website, delivery_partner_name, shipping_charge, order_tracking_url, terms_and_conditions }, { where: { seller_id: seller_id } });

        return res.status(200).json({ msg: 'Seller\'s details updated successfully' });
    } catch (err) {
        return res.status(500).json({ msg: "Internal Server Error" });
    }
};
module.exports = editSellerDetails;