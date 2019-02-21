const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const DisclaimerSchema = new Schema({
    ReportOrderNO: String,
    content: String
});

DisclaimerSchema.statics.Storage = async function (ReportOrderNO,disclaimerElement) {
    try {

        const data = {
            ReportOrderNO: ReportOrderNO,
            content: disclaimerElement.content
        }

        return await this.create(data);
    } catch (error) {
        throw error
    }
}

module.exports = mongoose.model('Disclaimer', DisclaimerSchema);
