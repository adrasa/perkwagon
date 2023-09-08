const { Sellers } = require('../../models/index');

const addSellerDetails = async (req, res) => {
    try {
     
        const seller = {
            seller_name: req.body.seller_name,
            phone_number: req.body.phone_number,
            business_name: req.body.business_name,
            goverment_issued_id: req.body.goverment_issued_id,
            gstin: req.body.gstin,
            business_phone_number: req.body.business_phone_number,
            business_whatsapp_number: req.body.business_whatsapp_number,
            business_email: req.body.business_email,
            business_address_information: req.body.business_address_information,
            website: req.body.website,
            delivery_partner_name: req.body.delivery_partner_name,
            shipping_charge: req.body.shipping_charge,
            order_tracking_url: req.body.order_tracking_url,
            terms_and_conditions: req.body.terms_and_conditions,
        }
        await Sellers.create(seller);
        
        return res.status(200).json({ msg: 'Seller Details Added Successfully' });

    } catch (err) {
        return res.status(500).json({ msg: 'Internal Server Error' });
    }
}
module.exports = addSellerDetails;