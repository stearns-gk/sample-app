var oAppEnablementCommonInstance = new comGkSoftwareGkrAppEnablementApi.Common();
var oAppEnablementExternalMasterdataInstance = new comGkSoftwareGkrAppEnablementApi.ExternalMasterdata();
var oAppEnablementMasterdataInstance = new comGkSoftwareGkrAppEnablementApi.Masterdata();
var oAppEnablementPosInstance = new comGkSoftwareGkrAppEnablementApi.Pos();


/* ------------------------------ SESSION CONTEXT -------------------------- */

function getSessionContext() {
    oAppEnablementCommonInstance.getSessionContext('currentSessionContextOK', 'currentSessionContextFailed');
}

function currentSessionContextOK(context) {
    this.context = context;
}

function currentSessionContextFailed(err) {
    console.log("ERROR: " + err);
}

/* ------------------------------- LISTENERS ------------------------------- */


oAppEnablementCommonInstance.registerListener(oAppEnablementCommonInstance.createRegisterListenerRequest("EVENT_TRANSACTION_UPDATED", "processEvent", true));
oAppEnablementCommonInstance.registerListener(oAppEnablementCommonInstance.createRegisterListenerRequest("EVENT_CUSTOMER_REGISTERED", "processEvent", true));


/* ----------------------------- EVENT PROCESSING -------------------------- */




/* ------------------------ FUNCTIONS ------------------------ */

// Displays the warranty view when an item eligible for warranty is added to the txn
// function displayWarrantyView(itemNameData) {
//     var warrantyView = document.getElementById("warrantyView");
//     var retailerLogo = document.getElementById("retailerLogo");
//     var itemName = document.getElementById("itemName");

//     if (warrantyView.style.display === "none") {
//         warrantyView.style.display = "block";
//         retailerLogo.style.marginTop = "0px";
//     } 

//     itemName.innerHTML = itemNameData;
// }




/* --------------------------- GETTING POS DATA --------------------------- */


// function getTransactionData() {
//     oAppEnablementPosInstance.getCurrentTransaction('getTxnData', 'noData');
// }

function getCustomerData() {
    oAppEnablementPosInstance.getCurrentCustomerList('getCustData', 'noData');
}

function populateCustomer() {
    oAppEnablementPosInstance.getCurrentCustomerList('getCustName', 'noData');
}


/* ---------------------- GET DATA RESPONSE HANDLING ---------------------- */

// function getCustName(oData) {
//     var customerRegistered = oData.length; // if 0 no cust, if 1 cust registered
//     if (customerRegistered == 1) {
//         var customerFirstName = oData[0]["firstName"];

//         if (customerFirstName == "Patrick") {
//             var name = document.getElementById("customerName");
//             name.innerText = customerFirstName + ": Diamond Member Status"
//         }
//     }    
// }


function registerShowerItem(oData) {

    var actualUnitPrice = "3.99";
    // var receiptCode = "Shower Code #" + Math.floor(100000 + Math.random() * 900000)
    var taxGroup = "A1"

     // Modify these hard-coded item params to suit your needs
     var oRequest = {
        "posItemID": "6665556665551",
        "itemID": "66601560156",
        "unitOfMeasureCode": "PCE",
        "itemType": "CO",
        "actualUnitPrice": actualUnitPrice,
        "quantity": "1",
        "receiptText": "My Item", // receiptCode,
        "registrationNumber": "66601560156",
        "mainPOSItemID": "6665556665551",
        "taxGroupID": taxGroup,
    };

    oAppEnablementPosInstance.registerExternalLineItem('registerDataOk', 'registerDataFailed', JSON.stringify(oRequest));
} 



function noData(err) {
    var receiptCode = ""; 
    var actualUnitPrice = "";
    var taxGroup = "";

    actualUnitPrice = "3.99";
    receiptCode = "Shower #" + Math.floor(1000000 + Math.random() * 9000000)
    taxGroup = "A1"

     // Modify these hard-coded item params to suit your needs
     var oRequest = {
        "posItemID": "6665556665551",
        "itemID": "66601560156",
        "unitOfMeasureCode": "PCE",
        "itemType": "CO",
        "actualUnitPrice": actualUnitPrice,
        "quantity": "1",
        "receiptText": receiptCode,
        "registrationNumber": "66601560156",
        "mainPOSItemID": "6665556665551",
        "taxGroupID": taxGroup,
    };

    oAppEnablementPosInstance.registerExternalLineItem('registerDataOk', 'registerDataFailed', JSON.stringify(oRequest));

}

/* ---------------------------- WINDOW LOAD ---------------------------- */

$(window).load(function() {
    $(".se-pre-con").fadeOut("slow");
});

$(document).ready(function() {
    $("#app-alert").hide();
});