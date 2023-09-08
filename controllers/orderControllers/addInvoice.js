const { OrderItems } = require('../../models/index');
const uploadImage = require('../../reusable_module/uploadFile');
const addInvoice = async (req, res) => {
    try {
        const order_item_id = req.params.order_item_id;
        let invoiceUrl = null;
        if (req.file) {
            // Generate CDN URL for the uploaded image
            invoiceUrl = await uploadImage(req.file.buffer, req.file.originalname);
        }
        const orderItem = await OrderItems.findOne({ where: { order_item_id } });
        if (!orderItem) {
            return res.status(400).json({ msg: 'Order Item not found' });
        }
        await OrderItems.update({ invoice: invoiceUrl }, { where: { order_item_id } });
        return res.status(200).json({ msg: 'Invoice Added Successfully' });
    } catch (error) {
        return res.status(500).json({ msg: 'Internal Server Error' });
    }
};

module.exports = addInvoice;