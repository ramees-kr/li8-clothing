var wishListData = JSON.parse(localStorage.getItem("wishListObj")) || [];
var bagData = JSON.parse(localStorage.getItem("BagListObj")) || [];
var productData = [];
var itemsPerPage = 24;
var currentPage = 1;

var xhr = new XMLHttpRequest();
xhr.open("GET", "https://www.ramees.dev/product_data/girls.json", true);
xhr.responseType = "json";

xhr.onload = function () {
  var status = xhr.status;
  if (status === 200) {
    productData = xhr.response;
    console.log("Initial productData:", productData);
    displayPage(currentPage);
  } else {
    console.error("Error fetching data:", status);
  }
};

xhr.send();

document.getElementById("nameSort").addEventListener("change", sortNames);
document.getElementById("priceSort").addEventListener("change", sortPrice);
document.getElementById("brandFilter").addEventListener("change", filterBrand);

function sortNames() {
  var selected = document.getElementById("nameSort").value;
  console.log(selected);

  if (selected == "asc") {
    productData.sort(function (a, b) {
      if (a.brand > b.brand) return 1;
      if (a.brand < b.brand) return -1;
      return 0;
    });
    displayPage(productData);
  } else {
    productData.sort(function (a, b) {
      if (a.brand > b.brand) return -1;
      if (a.brand < b.brand) return 1;
      return 0;
    });
    displayPage(productData);
  }
  console.log("Sorted Data: ", productData);
  displayPage(currentPage);
}

function sortPrice() {
  var selected = document.getElementById("priceSort").value;
  console.log(selected);
  if (selected == "lth") {
    productData.sort(function (a, b) {
      return a.price_value - b.price_value;
    });
    displayPage(productData);
  } else {
    productData.sort(function (a, b) {
      return b.price_value - a.price_value;
    });
    displayPage(productData);
  }

  console.log("Sorted Data: ", productData);
  displayPage(currentPage);
}

/*
function filterBrand() {
  var selected = document.getElementById("brandFilter").value;
  var newArray = productData.filter(function (element) {
    if (element.brand == selected) {
      return element;
    }
  });
  displayPage(newArray);
}
*/

function filterBrand() {
  var selected = document.getElementById("brandFilter").value;
  console.log("Brand Filter Selected:", selected);

  var newArray = productData.filter(function (element) {
    return element.brand === selected;
  });

  console.log("Filtered Array:", newArray);

  displayPage(newArray);
}

document.getElementById("prevPage").addEventListener("click", function () {
  if (currentPage > 1) {
    currentPage--;
    displayPage(currentPage);
  }
});

document.getElementById("nextPage").addEventListener("click", function () {
  if (currentPage < Math.ceil(productData.length / itemsPerPage)) {
    currentPage++;
    displayPage(currentPage);
  }
});

/*
function displayPage(pageNumber) {
  var start = (pageNumber - 1) * itemsPerPage;
  var end = start + itemsPerPage;
  var pageData = productData.slice(start, end);

  document.getElementById("container").innerHTML = "";

  pageData.map(function (elem) {
    var box = document.createElement("div");
    box.style.cursor = "pointer";

    var img = document.createElement("img");
    img.src = elem.image_url;

    var contentBox = document.createElement("div");
    contentBox.setAttribute("class", "contentBox");

    var brand = document.createElement("h4");
    brand.textContent = elem.brand;

    var productname = document.createElement("p");
    productname.textContent = elem.para;

    var mix = document.createElement("div");
    mix.setAttribute("class", "mixbox");

    var price = document.createElement("p");
    price.textContent = elem.price;

    var strprice = document.createElement("p");
    strprice.textContent = elem.strikedoffprice;
    strprice.setAttribute("class", "strikep");

    var offer = document.createElement("p");
    offer.textContent = elem.offer;
    offer.setAttribute("class", "offerp");

    mix.append(price, strprice, offer);

    var atw = document.createElement("p");
    atw.setAttribute("class", "wishListp");
    atw.textContent = elem.atw;
    atw.style.cursor = "pointer";

    atw.addEventListener("click", function () {
      addToWishlist(elem);
      atw.style.color = "green";
      atw.innerText = "ADDED TO WISHLIST";
    });

    var atc = document.createElement("p");
    atc.setAttribute("class", "addToBagp");
    atc.textContent = elem.atc;
    atc.style.cursor = "pointer";

    atc.addEventListener("click", function () {
      addToBag(elem);
      atc.innerText = "ADDED TO BAG";
    });

    contentBox.append(brand, productname, mix, atw, atc);

    box.append(img, contentBox);

    document.querySelector("#container").append(box);
  });

  document.getElementById("pageNumber").textContent = "Page " + currentPage;
}
*/
function addToWishlist(element) {
  wishListData.push(element);
  localStorage.setItem("wishListObj", JSON.stringify(wishListData));
}

function addToBag(element) {
  bagData.push(element);
  localStorage.setItem("BagListObj", JSON.stringify(bagData));
}

function displayPage(pageNumber) {
  console.log("filter val:", document.getElementById("brandFilter").value);

  var pageData;

  if (document.getElementById("brandFilter").value !== "all") {
    // If brand filter is not 'all', use the data from pageNumber
    pageData = pageNumber;
  } else {
    // Otherwise, proceed with the regular logic
    var start = (pageNumber - 1) * itemsPerPage;
    var end = start + itemsPerPage;
    pageData = productData.slice(start, end);
  }
  console.log("Page Data:", pageData);
  console.log("Page Num:", pageNumber);

  document.getElementById("container").innerHTML = "";

  if (pageData.length > 0) {
    pageData.forEach(function (elem) {
      var box = document.createElement("div");
      box.style.cursor = "pointer";

      var img = document.createElement("img");
      img.src = elem.image_url;

      var contentBox = document.createElement("div");
      contentBox.setAttribute("class", "contentBox");

      var brand = document.createElement("h4");
      brand.textContent = elem.brand;

      var productname = document.createElement("p");
      productname.textContent = elem.para;

      var mix = document.createElement("div");
      mix.setAttribute("class", "mixbox");

      var price = document.createElement("p");
      price.textContent = elem.price;

      var strprice = document.createElement("p");
      strprice.textContent = elem.strikedoffprice;
      strprice.setAttribute("class", "strikep");

      var offer = document.createElement("p");
      offer.textContent = elem.offer;
      offer.setAttribute("class", "offerp");

      mix.append(price, strprice, offer);

      var atw = document.createElement("p");
      atw.setAttribute("class", "wishListp");
      atw.textContent = elem.atw;
      atw.style.cursor = "pointer";

      atw.addEventListener("click", function () {
        addToWishlist(elem);
        atw.style.color = "green";
        atw.innerText = "ADDED TO WISHLIST";
      });

      var atc = document.createElement("p");
      atc.setAttribute("class", "addToBagp");
      atc.textContent = elem.atc;
      atc.style.cursor = "pointer";

      atc.addEventListener("click", function () {
        addToBag(elem);
        atc.innerText = "ADDED TO BAG";
      });

      contentBox.append(brand, productname, mix, atw, atc);

      box.append(img, contentBox);

      document.querySelector("#container").append(box);
    });
  } else {
    var noResultsMessage = document.createElement("p");
    noResultsMessage.textContent = "No matching products found.";
    document.querySelector("#container").append(noResultsMessage);
  }

  document.getElementById("pageNumber").textContent = "Page " + currentPage;
}
