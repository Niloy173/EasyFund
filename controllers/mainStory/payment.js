const createError = require("http-errors");
const { v4: uuid } = require("uuid");
const path = require("path");
const SSLCommerzPayment = require("sslcommerz-lts");

const { Project } = require("../../models/ProjectSchema");
const { Transaction } = require("../../models/TransactionDB");
const { NotificationModel } = require("../../models/NotificationSchema");

function RenderThePaymentGateWay(req, res, next) {
  const { cus_name, cus_email, cus_phone, address, amount, currency } =
    req.body;

  let userId;
  if (req.user) {
    userId = req.user.userId;
  } else {
    userId = "annonymous";
  }

  const url = `${process.env.APP_URL}`.replace(/\/+$/, "") + req.originalUrl;
  // console.log(url);

  const data = {
    total_amount: amount,
    currency: currency,
    tran_id: uuid() + `-${userId}`,
    success_url: `${url}/ssl-payment-success`,
    fail_url: `${url}/ssl-payment-fail`,
    cancel_url: `${url}/ssl-payment-cancel`,
    shipping_method: "No",
    product_name: "Project",
    product_category: "Project",
    product_profile: "Project-Identity",
    card_no: userId,
    cus_name: cus_name,
    cus_email: cus_email,
    cus_add1: address,
    cus_add2: address,
    cus_city: address,
    cus_state: address,
    cus_postcode: "1000",
    cus_country: "Bangladesh",
    cus_phone: cus_phone,
    cus_fax: cus_phone,
    multi_card_name: "mastercard",
    value_a: "ref001_A",
    value_b: "ref002_B",
    value_c: "ref003_C",
    value_d: "ref004_D",
    ipn_url: `${url}/ssl-payment-notification`,
  };

  const sslcommerz = new SSLCommerzPayment(
    process.env.STORE_ID,
    process.env.STORE_PASSWORD,
    false
  ); //true for live default false for sandbox
  sslcommerz.init(data).then((data) => {
    //process the response that got from sslcommerz
    //https://developer.sslcommerz.com/doc/v4/#returned-parameters

    if (data?.GatewayPageURL) {
      return res.status(200).redirect(data?.GatewayPageURL);
    } else {
      return res.status(400).json({
        message: "Session was not successful",
      });
    }
  });
}

async function SuccessFulPaymentTrans(req, res, next) {
  try {
    const url = `${process.env.APP_URL}`.replace(/\/+$/, "") + req.originalUrl;
    const transac_id = req.body.tran_id;

    // find projectID projectURL && UserID
    const projectId = url.split("/").reverse()[2];
    const projectURL = `${process.env.APP_URL}project/${projectId}`;
    const userId = transac_id.split("-").reverse()[0];

    // Update New Amount && add UserId for co-responding Project
    const newAmount = parseInt(req.body.amount);
    const SupporterId = [];
    const CurrentProject = await Project.find({ _id: projectId });

    const Supporter = CurrentProject[0].Supporter;
    const CurrentAmount = CurrentProject[0].CurrentAmount;

    const ActualAmount = newAmount + CurrentAmount;
    if (Supporter.length == 0 && userId != "annonymous") {
      SupporterId.push(userId);
    } else {
      let sameuser = 0;
      for (let index = 0; index < Supporter.length; index++) {
        if (JSON.stringify(Supporter[index]) === JSON.stringify(userId)) {
          sameuser = 1;
          // console.log(`Same user`);
          break;
        } else {
          SupporterId.push(Supporter[index]);
        }
      }
      if (sameuser == 0 && userId != "annonymous") {
        SupporterId.push(userId);
      }
    }

    // Now Create a Transaction token For Transaction DataBase
    const TransactionInformation = {};
    const ProjectID = {};
    const UserID = {};
    const TransactionID = {};
    const BankTransactionID = {};

    ProjectID.id = projectId;
    TransactionID.id = req.body.tran_id;
    BankTransactionID.id = req.body.bank_tran_id;

    // if annonymous user wants to support
    // then no need to pass userId in Transaction
    if (userId === "annonymous") {
      TransactionInformation.annonymous_amount = req.body.amount;
    } else {
      UserID.id = userId;
      TransactionInformation.user_id = UserID;
      TransactionInformation.annonymous_amount = "0";
    }

    TransactionInformation.project = ProjectID;
    TransactionInformation.transac_id = TransactionID;
    TransactionInformation.bank_tran_id = BankTransactionID;
    TransactionInformation.amount = req.body.amount;
    TransactionInformation.currency = req.body.currency;
    TransactionInformation.card_issuer = req.body.card_issuer;
    TransactionInformation.card_brand = req.body.card_brand;
    TransactionInformation.card_issue_country = req.body.card_issuer_country;
    TransactionInformation.trans_date = req.body.tran_date;

    const newTransaction = new Transaction().InsertTransaction(
      TransactionInformation
    );

    newTransaction.save();

    const notification = new NotificationModel({
      OwnerId: CurrentProject[0].OwnerId,
      Message: `Someone has supported your 
              <a style="color : #0000EE; font-weight: bold; text-decoration : none;" href="/project/${projectId}">project</a>
      `,
    });

    notification.save();

    const UpdatedAmount = await Project.updateOne(
      { _id: projectId },
      {
        $set: {
          CurrentAmount: ActualAmount,
          Supporter: SupporterId.length == 0 ? Supporter : SupporterId,
        },
      },
      { new: true, useFindAndModify: false }
    );

    // send back to the project
    // console.log(projectURL);
    res.redirect(projectURL);
  } catch (error) {
    // console.log(error.message);
    throw createError(error);
  }
}

async function NotificationAfterTrans(req, res, next) {
  console.log(req.body);
  res.status(200).send("valid");
}

async function FailedPaymentTrans(req, res, next) {
  // console.log(req.body);
  const url = `${process.env.APP_URL}`.replace(/\/+$/, "") + req.originalUrl;
  const projectId = url.split("/").reverse()[2];
  const projectURL = `${process.env.APP_URL}project/${projectId}`;

  res.redirect(projectURL);
}

async function CancelPaymentTrans(req, res, next) {
  // console.log(req.body);
  const url = `${process.env.APP_URL}`.replace(/\/+$/, "") + req.originalUrl;
  const projectId = url.split("/").reverse()[2];
  const projectURL = `${process.env.APP_URL}project/${projectId}`;
  res.redirect(projectURL);
}

module.exports = {
  RenderThePaymentGateWay,
  SuccessFulPaymentTrans,
  NotificationAfterTrans,
  FailedPaymentTrans,
  CancelPaymentTrans,
};
