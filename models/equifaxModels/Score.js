const mongoose = require('mongoose');
const lodash = require('lodash');
const Schema = mongoose.Schema;


const ScoreSchema = new Schema({
    ReportOrderNO: String,
    Name: String,
    Value: String
});

ScoreSchema.statics.Storage = async function (ReportOrderNO,ScoreChildren) {
    try {

        const nameElement = lodash.find(ScoreChildren.children, {
            name: "sch:Name"
        });

        const valueElement = lodash.find(ScoreChildren.children, {
            name: "sch:Value"
        });

      

        const obj = {
            ReportOrderNO: ReportOrderNO,
            Name: lodash.get(nameElement, 'content', ''),
            Value: lodash.get(valueElement, 'content', '')
        }

        return await this.create(obj);
    } catch (error) {
        throw error
    }
}

module.exports = mongoose.model('Score', ScoreSchema);
