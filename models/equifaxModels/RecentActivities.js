const mongoose = require('mongoose');
const lodash = require('lodash');
const Schema = mongoose.Schema;

const RecentActivitiesSchema = new Schema({
    ReportOrderNO: String,
    AccountsDeliquent: String,
    AccountsOpened: String,
    TotalInquiries: String,
    AccountsUpdated: String
});

RecentActivitiesSchema.statics.Storage = async function (ReportOrderNO,recentActivitiesChildren) {
    try {

        const data = {
            ReportOrderNO: ReportOrderNO
        }

        const AccountsDeliquent = lodash.find(recentActivitiesChildren.children, {
            name: "sch:AccountsDeliquent"
        });
        data.AccountsDeliquent = lodash.get(AccountsDeliquent, 'content', '');

        const AccountsOpened = lodash.find(recentActivitiesChildren.children, {
            name: "sch:AccountsOpened"
        });
        data.AccountsOpened = lodash.get(AccountsOpened, 'content', '');

        const TotalInquiries = lodash.find(recentActivitiesChildren.children, {
            name: "sch:TotalInquiries"
        });
        data.TotalInquiries = lodash.get(TotalInquiries, 'content', '');

        const AccountsUpdated = lodash.find(recentActivitiesChildren.children, {
            name: "sch:AccountsUpdated"
        });
        data.AccountsUpdated = lodash.get(AccountsUpdated, 'content', '');

        return await this.create(data);
    } catch (error) {
        throw error
    }
}

module.exports = mongoose.model('RecentActivities', RecentActivitiesSchema);
