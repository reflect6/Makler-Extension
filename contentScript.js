let propertyType;
let listingType;
let buildType;
let city;
let district1;
let district2;
let address;
let floor;
let rooms;
let priceFull;
let priceM2;
let comment;


function scriptToDetermineWebsite () {
    let mainUrl;
    try {
      mainUrl = new URL(window.location.href).origin;
    } catch (error) {
      console.error('Error constructing URL:', error);
    }

    console.log(mainUrl);
    chrome.storage.local.get(['listing'], function(listing) {
        if (mainUrl === "https://ss.ge") {
            console.log("YES This is SS.ge");
            console.log(listing);
        } else if (mainUrl === "https://www.myhome.ge") {
            console.log("YES This is myhome.ge");
            console.log(listing);
        } else if (mainUrl === "https://binebi.ge") {
            console.log("YES This is binebi.ge");
            console.log(listing);
        } else if (mainUrl === "https://gethome.ge") {
            console.log("YES This is gethome.ge");
            console.log(listing);
        } else if (mainUrl === "https://livo.ge") {
            console.log("YES This is livo.ge");
            console.log(listing);
        } else if (mainUrl === "https://housing.ge") {
            console.log("YES This is housing.ge");
            console.log(listing);
        } else if (mainUrl === "https://area.ge") {
            console.log("YES This is area.ge");
            console.log(listing);
        } else if (mainUrl === "https://place.ge") {
            console.log("YES This is place.ge");
            console.log(listing);
        } else if (mainUrl === "https://binebi.info") {
            console.log("YES This is binebi.info");
            console.log(listing);
        } else {
            console.log("Error");
        }
      });     
}

function listingDecode (listing) {
    propertyType = listing.propertyType;
    listingType = listing.listingType;
    buildType = listing.buildType;
    if (listing.city === "ქუთაისი" || listing.city === "ბათუმი" || listing.city === "ცხინვალი" ||listing.city === "რუსთავი" || listing.city === "ფოთი") {
        city = listing.city;
        district1 = 0;
        district2 = 0;
    } else {
        city = "თბილისი";
        district1 = listing.city;
    }
    address = listing.address;
    floor = listing.floor;
    rooms = listing.rooms;
    price = listing.price;
    address = listing.address;
    address = listing.address;

}

//SS.GE

function postSSGE() {
    checkLoginSSGE();
}

function actuallyPostingSSGE(listing) {
    let realEstateChoose = document.getElementsByClassName("realestate-category-list-item")[0];
    realEstateChoose.click();
};

function checkLoginSSGE () {
    let loginBtn = document.getElementById("login_but");
    if (loginBtn) {
        loginBtn.click();
        setTimeout(() => {
            let userNameCheck = document.getElementById("UserName").value;
            let passwordCheck = document.getElementById("Password").value;
            console.log(userNameCheck, passwordCheck);
            if (userNameCheck === "" && passwordCheck === "") {
                alert("SS.GE - გთხოვთ შეინახოთ იუზერი და პაროლი ბრაუზერში ან შეხვიდეთ თქვენ თვითონ");
                console.log(userNameCheck);
            } else {
                let loginBtn2 = document.getElementById("login_button"); 
                loginBtn2.click();
            }
        }, 500);
        waitForLoginSSGE();
    } else {
        let addItemBtn = document.getElementById("add_item_but");
        if (addItemBtn) {
          addItemBtn.click();
        }
    }
}

function waitForLoginSSGE() {
    // Wait for the addItemBtn to appear and then click it
    let interval = setInterval(function() {
        let addItemBtn = document.getElementById("add_item_but");
        if (addItemBtn) {
          addItemBtn.click();
          clearInterval(interval);
        }
      }, 500);
}
