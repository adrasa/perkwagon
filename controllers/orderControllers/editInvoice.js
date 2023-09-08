const { OrderItems } = require('../../models/index');
const removeImage = require('../../reusable_module/removeFile');
const uploadImage = require('../../reusable_module/uploadFile');
const editInvoice = async (req, res) => {
    try {
        const order_item_id = req.params.order_item_id;
        const orderItem = await OrderItems.findOne({ where: { order_item_id: order_item_id } });
        if (!orderItem) {
            return res.status(404).json({ msg: 'Order Item Not Found' });
        }
        await removeImage(orderItem.invoice);
        let invoiceUrl = null;
        if (req.file) {
            // Generate CDN URL for the uploaded image
            invoiceUrl = await uploadImage(req.file.buffer, req.file.originalname);
        }
        await OrderItems.update({ invoice: invoiceUrl }, { where: { order_item_id: order_item_id } });

        return res.status(200).json({ msg: 'Invoice Updated Successfully' });
    } catch (error) {
        return res.status(500).json({ msg: 'Internal Server Error' });
    }
}
module.exports = editInvoice;
