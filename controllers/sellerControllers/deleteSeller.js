const { Sellers } = require('../../models/index');

const deleteSeller = async (req, res) => {
    try {
        const seller_id= req.params.seller_id;

        const seller = await Sellers.findOne({ where: { seller_id } });
        if (!seller) return res.status(400).json({ msg: 'No seller found' });

        await Sellers.destroy({ where: { seller_id } });

        return res.status(200).json({ msg: 'Seller deleted successfully' });
    } catch (err) {
        return res.status(500).json({ msg: 'Internal Server Error' });
    }
}   
module.exports = deleteSeller;