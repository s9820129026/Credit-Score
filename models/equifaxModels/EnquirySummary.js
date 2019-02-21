const mongoose = require('mongoose');
const lodash = require('lodash');
const Schema = mongoose.Schema;

const EnquirySummarySchema = new Schema({
    ReportOrderNO: String,
    Purpose: String,
    Total: String,
    Past30Days: String,
    Past12Months: String,
    Past24Months: String,
    Recent: String
});

EnquirySummarySchema.statics.Storage = async function (ReportOrderNO,enquirySummaryChildren) {
    try {

        const data = {
            ReportOrderNO: ReportOrderNO
        }

        const Purpose = lodash.find(enquirySummaryChildren.children, {
            name: "sch:Purpose"
        });
        data.Purpose = lodash.get(Purpose, 'content', '');

        const Total = lodash.find(enquirySummaryChildren.children, {
            name: "sch:Total"
        });
        data.Total = lodash.get(Total, 'content', '');

        const Past30Days = lodash.find(enquirySummaryChildren.children, {
            name: "sch:Past30Days"
        });
        data.Past30Days = lodash.get(Past30Days, 'content', '');

        const Past12Months = lodash.find(enquirySummaryChildren.children, {
            name: "sch:Past12Months"
        });
        data.Past12Months = lodash.get(Past12Months, 'content', '');

        const Past24Months = lodash.find(enquirySummaryChildren.children, {
            name: "sch:Past24Months"
        });
        data.Past24Months = lodash.get(Past24Months, 'content', '');

        const Recent = lodash.find(enquirySummaryChildren.children, {
            name: "sch:Recent"
        });
        data.Recent = lodash.get(Recent, 'content', '');

        return await this.create(data);
    } catch (error) {
        throw error
    }
}

module.exports = mongoose.model('EnquirySummary', EnquirySummarySchema);
