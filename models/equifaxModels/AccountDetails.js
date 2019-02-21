const mongoose = require('mongoose');
const lodash = require('lodash');
const Schema = mongoose.Schema;

const AccountDetailsSchema = new Schema({
    ReportOrderNO: String,
    Account: [{
        attributes: {
            seq: String,
            ReportedDate: String,
        },
        AccountNumber: String,
        Institution: String,
        AccountType: String,
        OwnershipType: String,
        Balance: String,
        PastDueAmount: String,
        Open: String,
        HighCredit: String,
        LastPaymentDate: String,
        DateReported: String,
        DateOpened: String,
        Reason: String,
        InterestRate: String,
        RepaymentTenure: String,
        DisputeCode: String,
        TermFrequency: String,
        CreditLimit: String,
        CollateralValue: String,
        CollateralType: String,
        AccountStatus: String,
        AssetClassification: String,
        SuitFiledStatus: String,
        SanctionAmount: String,
        InstallmentAmount: String,
        History48Months: [{
            Month: String,
            PaymentStatus: String,
            SuitFiledStatus: String,
            AssetClassificationStatus: String
        }]
    }]
});

AccountDetailsSchema.statics.Storage = async function (ReportOrderNO,accountDetailChildren) {
    try {

        const data = {
            ReportOrderNO: ReportOrderNO,
            Account: []
        }


        for (let child of accountDetailChildren.children) {

            let grandChild = {};
            grandChild.attributes = lodash.get(child, 'attributes', {});
            grandChild.History48Months = [];

            let AccountNumber = lodash.find(child.children, {
                name: "sch:AccountNumber"
            });
            grandChild.AccountNumber = lodash.get(AccountNumber, 'content', '');

            let Institution = lodash.find(child.children, {
                name: "sch:Institution"
            });
            grandChild.Institution = lodash.get(Institution, 'content', '');

            let AccountType = lodash.find(child.children, {
                name: "sch:AccountType"
            });
            grandChild.AccountType = lodash.get(AccountType, 'content', '');

            let OwnershipType = lodash.find(child.children, {
                name: "sch:OwnershipType"
            });
            grandChild.OwnershipType = lodash.get(OwnershipType, 'content', '');

            let Balance = lodash.find(child.children, {
                name: "sch:Balance"
            });
            grandChild.Balance = lodash.get(Balance, 'content', '');

            let PastDueAmount = lodash.find(child.children, {
                name: "sch:PastDueAmount"
            });
            if (!lodash.isNil(PastDueAmount)) {
                grandChild.PastDueAmount = lodash.get(PastDueAmount, 'content', '');
            }

            let Open = lodash.find(child.children, {
                name: "sch:Open"
            });
            grandChild.Open = lodash.get(Open, 'content', '');

            let LastPaymentDate = lodash.find(child.children, {
                name: "sch:LastPaymentDate"
            });
            if (!lodash.isNil(LastPaymentDate)) {
                grandChild.LastPaymentDate = lodash.get(LastPaymentDate, 'content', '');
            }

            let DateReported = lodash.find(child.children, {
                name: "sch:DateReported"
            });
            grandChild.DateReported = lodash.get(DateReported, 'content', '');

            let DateOpened = lodash.find(child.children, {
                name: "sch:DateOpened"
            });
            grandChild.DateOpened = lodash.get(DateOpened, 'content', '');

            let Reason = lodash.find(child.children, {
                name: "sch:Reason"
            });
            grandChild.Reason = lodash.get(Reason, 'content', '');

            let InterestRate = lodash.find(child.children, {
                name: "sch:InterestRate"
            });
            grandChild.InterestRate = lodash.get(InterestRate, 'content', '');

            let RepaymentTenure = lodash.find(child.children, {
                name: "sch:RepaymentTenure"
            });
            grandChild.RepaymentTenure = lodash.get(RepaymentTenure, 'content', '');

            let DisputeCode = lodash.find(child.children, {
                name: "sch:DisputeCode"
            });
            grandChild.DisputeCode = lodash.get(DisputeCode, 'content', '');

            let TermFrequency = lodash.find(child.children, {
                name: "sch:TermFrequency"
            });
            grandChild.TermFrequency = lodash.get(TermFrequency, 'content', '');

            let CollateralValue = lodash.find(child.children, {
                name: "sch:CollateralValue"
            });
            grandChild.CollateralValue = lodash.get(CollateralValue, 'content', '');

            let CollateralType = lodash.find(child.children, {
                name: "sch:CollateralType"
            });
            grandChild.CollateralType = lodash.get(CollateralType, 'content', '');

            let AccountStatus = lodash.find(child.children, {
                name: "sch:AccountStatus"
            });
            grandChild.AccountStatus = lodash.get(AccountStatus, 'content', '');

            let AssetClassification = lodash.find(child.children, {
                name: "sch:AssetClassification"
            });
            grandChild.AssetClassification = lodash.get(AssetClassification, 'content', '');

            let SuitFiledStatus = lodash.find(child.children, {
                name: "sch:SuitFiledStatus"
            });
            grandChild.SuitFiledStatus = lodash.get(SuitFiledStatus, 'content', '');

            let SanctionAmount = lodash.find(child.children, {
                name: "sch:SanctionAmount"
            });
            if (!lodash.isNil(SanctionAmount)) {
                grandChild.SanctionAmount = lodash.get(SanctionAmount, 'content', '');
            }

            let InstallmentAmount = lodash.find(child.children, {
                name: "sch:InstallmentAmount"
            });
            if (!lodash.isNil(InstallmentAmount)) {
                grandChild.InstallmentAmount = lodash.get(InstallmentAmount, 'content', '');
            }

            let History48Months = lodash.find(child.children, {
                name: "sch:History48Months"
            });

            for (let historyChild of History48Months.children) {
                let historyitem = {};
                historyitem.Month = lodash.get(historyChild, 'attributes.key', '');
                historyitem.PaymentStatus = lodash.get(historyChild, 'children[0].content', '');
                historyitem.SuitFiledStatus = lodash.get(historyChild, 'children[1].content', '');
                historyitem.AssetClassificationStatus = lodash.get(historyChild, 'children[2].content', '');
                grandChild.History48Months.push(historyitem);
            }
            data.Account.push(grandChild);
        }

        return this.create(data);
    } catch (error) {
        throw error
    }
}

module.exports = mongoose.model('AccountDetails', AccountDetailsSchema);
