const mongoose = require('mongoose');
const lodash = require('lodash');
const Schema = mongoose.Schema;

const AccountSummarySchema = new Schema({
    ReportOrderNO: String,
    NoOfAccounts: String,
    NoOfActiveAccounts: String,
    NoOfWriteOffs: String,
    TotalPastDue: String,
    MostSevereStatusWithIn24Months: String,
    SingleHighestCredit: String,
    SingleHighestSanctionAmount: String,
    TotalHighCredit: String,
    AverageOpenBalance: String,
    SingleHighestBalance: String,
    NoOfPastDueAccounts: String,
    NoOfZeroBalanceAccounts: String,
    RecentAccount: String,
    OldestAccount: String,
    TotalBalanceAmount: String,
    TotalSanctionAmount: String,
    TotalCreditLimit: String,
    TotalMonthlyPaymentAmount: String
});

AccountSummarySchema.statics.Storage = async function (ReportOrderNO,accountSummaryChildren) {
    try {

        const data = {
            ReportOrderNO: ReportOrderNO
        }

        const NoOfAccounts = lodash.find(accountSummaryChildren.children, {
            name: "sch:NoOfAccounts"
        });
        data.NoOfAccounts = lodash.get(NoOfAccounts, 'content', '');

        const NoOfActiveAccounts = lodash.find(accountSummaryChildren.children, {
            name: "sch:NoOfActiveAccounts"
        });
        data.NoOfActiveAccounts = lodash.get(NoOfActiveAccounts, 'content', '');

        const NoOfWriteOffs = lodash.find(accountSummaryChildren.children, {
            name: "sch:NoOfWriteOffs"
        });
        data.NoOfWriteOffs = lodash.get(NoOfWriteOffs, 'content', '');

        const TotalPastDue = lodash.find(accountSummaryChildren.children, {
            name: "sch:TotalPastDue"
        });
        data.TotalPastDue = lodash.get(TotalPastDue, 'content', '');

        const MostSevereStatusWithIn24Months = lodash.find(accountSummaryChildren.children, {
            name: "sch:MostSevereStatusWithIn24Months"
        });
        data.MostSevereStatusWithIn24Months = lodash.get(MostSevereStatusWithIn24Months, 'content', '');

        const SingleHighestCredit = lodash.find(accountSummaryChildren.children, {
            name: "sch:SingleHighestCredit"
        });
        data.SingleHighestCredit = lodash.get(SingleHighestCredit, 'content', '');

        const SingleHighestSanctionAmount = lodash.find(accountSummaryChildren.children, {
            name: "sch:SingleHighestSanctionAmount"
        });
        data.SingleHighestSanctionAmount = lodash.get(SingleHighestSanctionAmount, 'content', '');

        const TotalHighCredit = lodash.find(accountSummaryChildren.children, {
            name: "sch:TotalHighCredit"
        });
        data.TotalHighCredit = lodash.get(TotalHighCredit, 'content', '');

        const AverageOpenBalance = lodash.find(accountSummaryChildren.children, {
            name: "sch:AverageOpenBalance"
        });
        data.AverageOpenBalance = lodash.get(AverageOpenBalance, 'content', '');

        const SingleHighestBalance = lodash.find(accountSummaryChildren.children, {
            name: "sch:SingleHighestBalance"
        });
        data.SingleHighestBalance = lodash.get(SingleHighestBalance, 'content', '');

        const NoOfPastDueAccounts = lodash.find(accountSummaryChildren.children, {
            name: "sch:NoOfPastDueAccounts"
        });
        data.NoOfPastDueAccounts = lodash.get(NoOfPastDueAccounts, 'content', '');

        const NoOfZeroBalanceAccounts = lodash.find(accountSummaryChildren.children, {
            name: "sch:NoOfZeroBalanceAccounts"
        });
        data.NoOfZeroBalanceAccounts = lodash.get(NoOfZeroBalanceAccounts, 'content', '');

        const RecentAccount = lodash.find(accountSummaryChildren.children, {
            name: "sch:RecentAccount"
        });
        data.RecentAccount = lodash.get(RecentAccount, 'content', '');

        const OldestAccount = lodash.find(accountSummaryChildren.children, {
            name: "sch:OldestAccount"
        });
        data.OldestAccount = lodash.get(OldestAccount, 'content', '');

        const TotalBalanceAmount = lodash.find(accountSummaryChildren.children, {
            name: "sch:TotalBalanceAmount"
        });
        data.TotalBalanceAmount = lodash.get(TotalBalanceAmount, 'content', '');

        const TotalSanctionAmount = lodash.find(accountSummaryChildren.children, {
            name: "sch:TotalSanctionAmount"
        });
        data.TotalSanctionAmount = lodash.get(TotalSanctionAmount, 'content', '');

        const TotalCreditLimit = lodash.find(accountSummaryChildren.children, {
            name: "sch:TotalCreditLimit"
        });
        data.TotalCreditLimit = lodash.get(TotalCreditLimit, 'content', '');

        const TotalMonthlyPaymentAmount = lodash.find(accountSummaryChildren.children, {
            name: "sch:TotalMonthlyPaymentAmount"
        });
        data.TotalMonthlyPaymentAmount = lodash.get(TotalMonthlyPaymentAmount, 'content', '');

        return await this.create(data);
    } catch (error) {
        throw error
    }
}

module.exports = mongoose.model('AccountSummary', AccountSummarySchema);
