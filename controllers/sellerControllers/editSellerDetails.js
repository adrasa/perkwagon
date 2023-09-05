const { Sellers } = require('../../models/index');
const editSellerDetails = async (req, res) => {
    try {

        const seller_id = req.params.seller_id;
        const seller = await Sellers.findOne({ where: { seller_id } });
        if (!seller) return res.status(400).json({ msg: 'No seller found' });
        const {  seller_name, phone_number, business_name, goverment_issued_id, gstin, business_phone_number, business_whatsapp_number, business_email, business_address_information, website, delivery_partner_name, shipping_charge, order_tracking_url, terms_and_conditions } = req.body;

        if (!seller_id || !seller_name || !phone_number || !business_name || !goverment_issued_id || !gstin || !business_phone_number || !business_whatsapp_number || !business_email || !business_address_information || !website || !delivery_partner_name || !shipping_charge || !order_tracking_url || !terms_and_conditions) return res.status(400).json({ msg: 'Please provide all the fields in update' });

        await Sellers.update({ seller_name, phone_number, business_name, goverment_issued_id, gstin, business_phone_number, business_whatsapp_number, business_email, business_address_information, website, delivery_partner_name, shipping_charge, order_tracking_url, terms_and_conditions }, { where: { seller_id: seller_id } });

        return res.status(200).json({ msg: 'Seller\'s details updated successfully' });
    } catch (err) {
        return res.status(500).json({ msg: "Internal Server Error" });
    }
};
module.exports = editSellerDetails;