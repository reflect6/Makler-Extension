document.addEventListener("DOMContentLoaded", function() {

  var checkboxes = document.querySelectorAll('input[type="checkbox"]');

  // Add event listener to button
  var postBtn = document.getElementById("post-listing-btn");
  postBtn.addEventListener("click", function() {
    // Loop through checkboxes and get values of checked checkboxes
    var selectedWebsites = [];
    for (var i = 0; i < checkboxes.length; i++) {
      if (checkboxes[i].checked) {
        selectedWebsites.push(checkboxes[i].value);
      }
    }

    chrome.windows.create({
      url: 'post_listing.html',
      type: 'popup',
      width: 590,
      height: 1000,
    });

    // Do something with checked checkboxes
    chrome.storage.local.set({ websites: selectedWebsites }, () => {
      console.log("Selected websites saved to storage");
      console.log(selectedWebsites);
    });
  });
});
