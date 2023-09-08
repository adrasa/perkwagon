const { Sellers } = require('../../models/index');

const allSellers = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1; // Get the requested page, default to 1
        const pageSize = parseInt(req.query.pageSize) || 10; // Set the number of items per page, default to 10

        const offset = (page - 1) * pageSize; // Calculate the offset based on the requested page
        const limit = pageSize;

        let sellers = await Sellers.findAll({
            offset,
            limit,
            order: [['createdAt', 'DESC']],
        });

        // sellers = sellers.map((seller) => {
        //     const delivery_partner = seller.DeliveryPartner;
        //     delete seller.dataValues.DeliveryPartner;
        //     return {
        //         ...seller.dataValues,
        //         ...delivery_partner.dataValues,
        //     }

        // });
        if (!sellers) return res.status(400).json({ msg: 'No sellers found' });
        res.status(200).json({ sellers });
    } catch (err) {
        // res.status(500).json({ msg: 'Internal Server Error' });
        return res.status(500).json({ msg: 'Internal Server Error' });
    }
}
module.exports = allSellers;