const mongoose = require('mongoose');
const lodash = require('lodash');
const Schema = mongoose.Schema;

const OtherKeyIndSchema = new Schema({
    ReportOrderNO: String,
    AgeOfOldestTrade: String,
    NumberOfOpenTrades: String,
    AllLinesEVERWritten: String,
    AllLinesEVERWrittenIn9Months: String,
    AllLinesEVERWrittenIn6Months: String
});

OtherKeyIndSchema.statics.Storage = async function (ReportOrderNO,otherKeyIndChildren) {
    try {

        const data = {
            ReportOrderNO: ReportOrderNO
        }

        const AgeOfOldestTrade = lodash.find(otherKeyIndChildren.children, {
            name: "sch:AgeOfOldestTrade"
        });
        data.AgeOfOldestTrade = lodash.get(AgeOfOldestTrade, 'content', '');

        const NumberOfOpenTrades = lodash.find(otherKeyIndChildren.children, {
            name: "sch:NumberOfOpenTrades"
        });
        data.NumberOfOpenTrades = lodash.get(NumberOfOpenTrades, 'content', '');

        const AllLinesEVERWritten = lodash.find(otherKeyIndChildren.children, {
            name: "sch:AllLinesEVERWritten"
        });
        data.AllLinesEVERWritten = lodash.get(AllLinesEVERWritten, 'content', '');

        const AllLinesEVERWrittenIn9Months = lodash.find(otherKeyIndChildren.children, {
            name: "sch:AllLinesEVERWrittenIn9Months"
        });
        data.AllLinesEVERWrittenIn9Months = lodash.get(AllLinesEVERWrittenIn9Months, 'content', '');

        const AllLinesEVERWrittenIn6Months = lodash.find(otherKeyIndChildren.children, {
            name: "sch:AllLinesEVERWrittenIn6Months"
        });
        data.AllLinesEVERWrittenIn6Months = lodash.get(AllLinesEVERWrittenIn6Months, 'content', '');

        return await this.create(data);
    } catch (error) {
        throw error
    }
}
module.exports = mongoose.model('OtherKeyInd', OtherKeyIndSchema);
