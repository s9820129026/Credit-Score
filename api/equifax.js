const axios = require('axios');
const xmlParser = require('xml-parser');
const lodash = require('lodash');
const httpStatus = require('http-status');
var localStorage = require('node-localstorage');

const IDAndContactInfo = require('./../models/equifaxModels/IDAndContactInfo');
const Score = require('./../models/equifaxModels/Score');
const AccountSummary = require('./../models/equifaxModels/AccountSummary');
const RecentActivities = require('./../models/equifaxModels/RecentActivities');
const OtherKeyInd = require('./../models/equifaxModels/OtherKeyInd');
const EnquirySummary = require('./../models/equifaxModels/EnquirySummary');
const AccountDetails = require('./../models/equifaxModels/AccountDetails');
const Disclaimer = require('./../models/equifaxModels/Disclaimer');
const ScoringElements = require('./../models/equifaxModels/ScoringElements');
const user = require('./../models/user');

const APIError = require('./../core/APIError');

const router = require('express').Router();

router.post('/index47', async (req, res, next) => {
  try {

    const {
      firstName,
      lastname,
      dob,
      panId,
      mobNumber,
      address,
      state,
      pincode
    } = req.body;



    const config = {
      headers: {
        'content-type': 'text/xml'
      }
    };

    const data = `<?xml version="1.0" encoding="UTF-8"?><soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:ns="http://services.equifax.com/eport/ws/schemas/1.0">
    <soapenv:Header/>
    <soapenv:Body>
      <ns:InquiryRequest>
        <ns:RequestHeader>
          <ns:CustomerId>5680</ns:CustomerId>
          <ns:UserId>STS_CSP</ns:UserId>
          <ns:Password>2Q58Hp*1</ns:Password>
          <ns:MemberNumber>019FP06013</ns:MemberNumber>
          <ns:SecurityCode>CR9</ns:SecurityCode>
          <ns:ProductCode>IDCR</ns:ProductCode>
          <ns:ProductVersion>1.0</ns:ProductVersion>
          <ns:ReportFormat>XML</ns:ReportFormat>
          <!--Optional:-->
        </ns:RequestHeader>
        <ns:RequestBody>
          <ns:InquiryPurpose>02</ns:InquiryPurpose>
          <ns:FirstName>${firstName}</ns:FirstName>
          <ns:LastName>${lastname}</ns:LastName>
          <ns:DOB>${dob}</ns:DOB>
          <ns:PANId>${panId}</ns:PANId>
          <ns:MobilePhone>${mobNumber}</ns:MobilePhone>
          <ns:InquiryAddresses>
            <ns:InquiryAddress seq="1">
              <ns:AddressLine>${address}</ns:AddressLine>
              <ns:State>${state}</ns:State>
              <ns:Postal>${pincode}</ns:Postal>
             </ns:InquiryAddress>
          </ns:InquiryAddresses>
        </ns:RequestBody>
      </ns:InquiryRequest>
    </soapenv:Body>
  </soapenv:Envelope>`

    const response = await axios.post('https://ists.equifax.co.in/creditreportws/CreditReportWSInquiry/v1.0?wsdl', data, config);

    const result = xmlParser(response.data);
    console.log(result)
    // console.log(result.root.children[0].children[0].children[2].children[0].name)
    if (result.root.children[0].children[0].children[2].children[0].name === "sch:Error") {
      throw new APIError(result.root.children[0].children[0].children[2].children[0].children[1].content, httpStatus.INTERNAL_SERVER_ERROR, true);
    }

    const resultHeader = result.root.children[0].children[0].children[0];

    const ReportOrderNO = lodash.find(resultHeader.children, {
      name: "sch:ReportOrderNO"
    });
    const Reportiubc = ReportOrderNO.content;

    localStorage.IMPno = Reportiubc;
    console.log(localStorage.IMPno);

    const resultdata = result.root.children[0].children[0].children[2];

    const idsAndContact = lodash.find(resultdata.children, {
      name: "sch:IDAndContactInfo"
    });

    const scores = lodash.find(resultdata.children, {
      name: "sch:Score"
    });
    // console.log(scores)

    const accountSummary = lodash.find(resultdata.children, {
      name: "sch:AccountSummary"
    });
    // console.log(accountSummary)

    const recentActivities = lodash.find(resultdata.children, {
      name: "sch:RecentActivities"
    });
    // console.log(recentActivities)

    const otherKeyInd = lodash.find(resultdata.children, {
      name: "sch:OtherKeyInd"
    });
    // console.log(otherKeyInd)

    const enquirySummary = lodash.find(resultdata.children, {
      name: "sch:EnquirySummary"
    });
    // console.log(enquirySummary)

    const accountDetails = lodash.find(resultdata.children, {
      name: "sch:AccountDetails"
    });
    // console.log(accountDetails)


    const disclaimer = lodash.find(resultdata.children, {
      name: "sch:Disclaimer"
    });
    // console.log(disclaimer)

    const scoringElements = lodash.find(resultdata.children, {
      name: "sch:ScoringElements"
    });
    // console.log(scoringElements)



        // var idAndContactInfo = new IDAndContactInfo();




    const apiResult = {};
    apiResult.IDAndContactInfo = await IDAndContactInfo.Storage(ReportOrderNO.content, idsAndContact);
    // console.log(apiResult.IDAndContactInfo)
    apiResult.Score = await Score.Storage(ReportOrderNO.content,scores);
    // console.log(apiResult.Score)
    apiResult.AccountSummary = await AccountSummary.Storage(ReportOrderNO.content,accountSummary)
    // console.log(apiResult.AccountSummary)
    apiResult.RecentActivities = await RecentActivities.Storage(ReportOrderNO.content,recentActivities);
    // console.log(apiResult.RecentActivities)
    apiResult.OtherKeyInd = await OtherKeyInd.Storage(ReportOrderNO.content,otherKeyInd);
    // console.log(apiResult.OtherKeyInd)
    apiResult.EnquirySummary = await EnquirySummary.Storage(ReportOrderNO.content,enquirySummary);
    // console.log(apiResult.EnquirySummary)
    apiResult.AccountDetails = await AccountDetails.Storage(ReportOrderNO.content,accountDetails);
    // console.log(apiResult.AccountDetails)
    apiResult.Disclaimer = await Disclaimer.Storage(ReportOrderNO.content,disclaimer);
    // console.log(apiResult.Disclaimer)
    apiResult.ScoringElements = await ScoringElements.Storage(ReportOrderNO.content,scoringElements);
    // console.log(apiResult.ScoringElements)
    // console.log(apiResult);

    res.redirect('/report');

  }
  catch (err) {
    if (lodash.isUndefined(err.status)) {
      const apiError = new APIError(err.message, httpStatus.INTERNAL_SERVER_ERROR, true);
      return next(apiError);
    }
    return next(err);
  }

  res.redirect('/report');
});

// router.use((err, req, res, next) =>
//   res.status(err.status).json({
//     status: err.status,
//     name: err.name === 'APIError' ? "API_ERROR" : "SERVER_ERROR",
//     process: err.isPublic ? err.isPublic : true,
//     message: err.message ? err.message : httpStatus[err.status],
//   })
// );



module.exports = router;
