var sName = document.getElementById("name");
var sUrl = document.getElementById("url");
var addBtn = document.getElementById("create");

if (localStorage.getItem("items") == null) {
  markContainer = [];
} else {
  markContainer = JSON.parse(localStorage.getItem("items"));
  display();
}

function createMark() {
  var site = {
    siteName: sName.value,
    siteUrl: sUrl.value,
  };
  markContainer.push(site);
  console.log(markContainer);

  localStorage.setItem("items", JSON.stringify(markContainer));

  display();

  reset();
}

function display() {
  savedSites = ``;
  for (var i = 0; i < markContainer.length; i++) {
    savedSites += `
		<div class="item d-flex align-items-center mb-5 position-relative">
		<div class="logo position-relative">
			<i class="fa-solid fa-${markContainer[i].siteName[0].toLowerCase()} me-5"></i>
		</div>
		<span>${markContainer[i].siteName}...</span>
		<div class="icons ms-auto d-flex">
			<div class="visit btn btn-primary text-white">
				<a href="${
          markContainer[i].siteUrl
        }" target="_blank" class="text-reset"><i class="fa-solid fa-globe mx-4"></i></a>
			</div>
			<div class="delete btn btn-danger ms-2" onclick="remove(${i})">
				<i class="fa-solid fa-trash-can mx-4"></i>
			</div>
		</div>
	</div>
		`;
    // console.log(markContainer[i].sName[0].toLowerCase())
    // console.log(savedSites)
  }
  document.getElementById("store").innerHTML = savedSites;
}

function remove(index) {
  markContainer.splice(index, 1);

  localStorage.removeItem("items");
  localStorage.setItem("items", JSON.stringify(markContainer));

  display();
}

function reset() {
  sName.value = "";
  sUrl.value = "";
}

// =========== Validation ===========

function nameValidation() {
  var name = sName.value;
  var regex = /^[A-Z][a-z]{1,}/;
  return regex.test(name);
}

function siteValidation() {
  var site = sUrl.value;
  var regex = /^(https|http):\/\//;
  return regex.test(site);
}

addBtn.onclick = function () {
  if (sName.value == "" || sUrl.value == "") {
    alert("Fill in the two fields");
  } else {
    if (nameValidation() && siteValidation()) {
      createMark();
    } else {
      if (!nameValidation()) {
        alert("enter name with first name capital letter");
      } else if (!siteValidation()) {
        alert("The website should start with http:// or https://");
      }
    }
  }
};
