const mongoose = require('mongoose');
const lodash = require('lodash');
const Schema = mongoose.Schema;

const ScoringElementsSchema = new Schema({
    ReportOrderNO: {
        type: String
    },
    items: [{
        attributes: {
            seq: {
                type: String
            },
            type: {
                type: String
            }
        },
        Code: {
            type: String
        },
        Description: {
            type: String
        }
    }]
});

ScoringElementsSchema.statics.Storage = async function (ReportOrderNO,scoringElements) {
    try {
        const scoringElArr = [];

        for (let index = 0; index < scoringElements.children.length; index++) {
            let itemObj = {};
            let element = scoringElements.children[index];

            itemObj.attributes = lodash.get(element, 'attributes', {});

            let slcodechildren = element.children[0];
            let sldescchildren = element.children[1];

            if (slcodechildren.content) {
                itemObj.Code = lodash.get(slcodechildren, 'content', '');
            }

            if (sldescchildren.content) {
                itemObj.Description = lodash.get(sldescchildren, 'content', '');
            }
            scoringElArr.push(itemObj);
        }

        return await this.create({
            ReportOrderNO,
            items: scoringElArr
        });
    } catch (error) {
        throw error
    }
}

const model = mongoose.model('ScoringElements', ScoringElementsSchema);

module.exports = model
