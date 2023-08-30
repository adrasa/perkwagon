const {Addresses} = require('../../models');

const deleteAddress = async (req, res) => {
    try {
        const address = await Addresses.findOne({
            where: { auth_id:req.user.auth_id ,address_id: req.params.address_id },
        });
        if (!address) {
            return res.status(404).json({ msg: 'Address not found' });
        }
        await Addresses.destroy({
            where: { address_id: req.params.address_id, auth_id: req.user.auth_id },
        });
        return res.status(200).json({ msg: 'Address deleted successfully' });
    } catch (err) {
        return res.status(500).json({ msg: 'Internal Server Error' });
    }
}

module.exports = deleteAddress;