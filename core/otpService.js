const axios = require('axios');
const config = require('./../config/secret');

axios.defaults.baseURL = config.OTP_URL;

const sendSMSOTP = (cCode, mobileNumber) => {
    return new Promise((resolve, reject) => {

        const url = `sendotp.php?otp_length=${config.OTP_length}&authkey=${config.OTP_AUTH_KEY}&mobile=${cCode}${mobileNumber}`;
console.log(url)
        axios.post(url, {})
            .then(function (response) {
                resolve(response);
            })
            .catch(function (error) {
                reject(error);
            });
    })
}

const veryfySMSOTP = (cCode, mobileNumber, otp) => {
    return new Promise((resolve, reject) => {

        const url = `verifyRequestOTP.php?authkey=${config.OTP_AUTH_KEY}&mobile=+${cCode}${mobileNumber}&otp=${otp}`;

        axios.post(url, {})
            .then(function (response) {
                resolve(response.data);
            })
            .catch(function (error) {
                reject(error);
            });
    })
}

module.exports = {
    sendSMSOTP,
    veryfySMSOTP
}
