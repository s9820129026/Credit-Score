const mongoose = require('mongoose');
const lodash = require('lodash');
const Schema = mongoose.Schema;
const user = require('../user');

const IDAndContactInfoSchema = new Schema({
    ReportOrderNO: {
        type: String
    },
    PersonalInfo: {
        Name: {
            FirstName: {
                type: String
            },
            LastName: {
                type: String
            }
        },
        DateOfBirth: {
            type: String
        },
        Gender: {
            type: String
        },
        Age: {
            type: String
        },
        TotalIncome: {
            type: String
        },
        Occupation: {
            type: String
        }
    },
    IdentityInfo: {
        PANId: {
            attributes: {
                seq: {
                    type: String
                },
                ReportedDate: {
                    type: String
                },
            },
            IdNumber: {
                type: String
            }
        },
        PassportID: {
            attributes: {
                seq: {
                    type: String
                },
                ReportedDate: {
                    type: String
                },
            },
            IdNumber: {
                type: String
            }
        },

    },
    AddressInfo: [{
        attributes: {
            seq: {
                type: String
            },
            ReportedDate: {
                type: String
            },
        },
        Address: {
            type: String
        },
        State: {
            type: String
        },
        Postal: {
            type: String
        },
        Type: {
            type: String
        },
    }],
    PhoneInfo: [{
        attributes: {
            typeCode: {
                type: String
            },
            seq: {
                type: String
            },
            ReportedDate: {
                type: String
            }
        },
        Number: {
            type: String
        }
    }],
    EmailAddressInfo: [{
        attributes: {
            seq: {
                type: String
            },
            ReportedDate: {
                type: String
            }
        },
        EmailAddress: {
            type: String
        }
    }]
});

IDAndContactInfoSchema.statics.Storage = async function (ReportOrderNO,idAndContactChildren) {
    try {

        const PersonalInfo = {};
        const IdentityInfo = {};
        const AddressInfo = [];
        const PhoneInfo = [];
        const EmailAddressInfo = [];

        const personalInfoElements = lodash.find(idAndContactChildren.children, {
            name: "sch:PersonalInfo"
        });

        const nameElements = lodash.find(personalInfoElements.children, {
            name: "sch:Name"
        });

        const fname = lodash.find(nameElements.children, {
            name: "sch:FirstName"
        });
        const lname = lodash.find(nameElements.children, {
            name: "sch:LastName"
        });

        PersonalInfo.Name = {};
        PersonalInfo.Name.FirstName = lodash.get(fname, 'content', '');
        PersonalInfo.Name.LastName = lodash.get(lname, 'content', '');


        const dobElements = lodash.find(personalInfoElements.children, {
            name: "sch:DateOfBirth"
        });

        const genderElements = lodash.find(personalInfoElements.children, {
            name: "sch:Gender"
        });

        const ageElements = lodash.find(personalInfoElements.children, {
            name: "sch:Age"
        });

        const incomeElements = lodash.find(personalInfoElements.children, {
            name: "sch:TotalIncome"
        });

        const occupationElements = lodash.find(personalInfoElements.children, {
            name: "sch:Occupation"
        });

        PersonalInfo.DateOfBirth = lodash.get(dobElements, 'content', '');
        PersonalInfo.Gender = lodash.get(genderElements, 'content', '');
        PersonalInfo.Age = lodash.get(ageElements, 'children[0].content', '');
        PersonalInfo.TotalIncome = lodash.get(incomeElements, 'content', '');
        PersonalInfo.Occupation = lodash.get(occupationElements, 'content', '');

        const IdentityInfoElements = lodash.find(idAndContactChildren.children, {
            name: "sch:IdentityInfo"
        });

        const panIdElements = lodash.find(IdentityInfoElements.children, {
            name: "sch:PANId"
        });

        IdentityInfo.PANId = {};
        IdentityInfo.PANId.attributes = lodash.get(panIdElements, 'attributes', {});
        IdentityInfo.PANId.IdNumber = lodash.get(panIdElements, 'children[0].content', '');

        const passportIDElements = lodash.find(IdentityInfoElements.children, {
            name: "sch:PassportID"
        });

        IdentityInfo.PassportID = {};
        IdentityInfo.PassportID.attributes = lodash.get(passportIDElements, 'attributes', {});
        IdentityInfo.PassportID.IdNumber = lodash.get(passportIDElements, 'children[0].content', '');

        for (const child of idAndContactChildren.children) {

            if (child.name === "sch:AddressInfo") {

                let grandChild = {};
                grandChild.attributes = lodash.get(child, 'attributes', {});
                let addrChild = lodash.find(child.children, {
                    name: "sch:Address"
                });
                let stateChild = lodash.find(child.children, {
                    name: "sch:State"
                });
                let postalChild = lodash.find(child.children, {
                    name: "sch:Postal"
                });

                let typeChild = lodash.find(child.children, {
                    name: "sch:Type"
                });

                grandChild.Address = lodash.get(addrChild, 'content', '');
                grandChild.State = lodash.get(stateChild, 'content', '');
                grandChild.Postal = lodash.get(postalChild, 'content', '');
                grandChild.Type = lodash.get(typeChild, 'content', '');
                AddressInfo.push(grandChild);
            } else if (child.name === "sch:PhoneInfo") {

                let grandChild = {};
                grandChild.attributes = lodash.get(child, 'attributes', {});
                grandChild.Number = lodash.get(child, 'children[0].content', '');
                PhoneInfo.push(grandChild);
            } else if (child.name === "sch:EmailAddressInfo") {

                let grandChild = {};
                grandChild.attributes = lodash.get(child, 'attributes', {});
                grandChild.EmailAddress = lodash.get(child, 'children[0].content', '');
                EmailAddressInfo.push(grandChild);
            }
        }

        const StrObj = {
            PersonalInfo,
            IdentityInfo,
            AddressInfo,
            PhoneInfo,
            ReportOrderNO
        };

        return await this.create(StrObj);

    } catch (error) {
        throw error
    }
}

module.exports = mongoose.model('IDAndContactInfo', IDAndContactInfoSchema);
