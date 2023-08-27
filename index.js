let activePage = "home";

(function () {
  const hash = document.location.hash.substring(1);
  if (hash) {
    const link = $(`#top-menu-bar a[data-page=${hash}]`);
    if (link) {
      activePage = hash;
    }
  }
})();

//utilities functions

function $(selector) {
  return document.querySelector(selector);
}

function hide(id) {
  $(`#${id}`).style.display = "none";
}

function show(id) {
  const page = $("#" + id);
  console.info("show %o", id, page);
  return (page.style.display = "block");
}

function showPage(id) {
  const oldLink = $(`#top-menu-bar a[data-page=${activePage}]`);
  oldLink.classList.remove("active");

  hide(activePage);

  activePage = id;

  const link = $(`#top-menu-bar a[data-page=${id}]`);
  link.classList.add("active");

  show(activePage);
}

function clickOnMenu(e) {
  const link = e.target.closest("a");
  if (link) {
    const id = link.dataset.page;
    if (id) {
      showPage(id);
      document.location.hash = `#${id}`;
    }
  }
}

function addItem() {
  var newItemInput = document.getElementById("newItemInput");
  var newItemText = newItemInput.value;

  if (newItemText !== "") {
    var list = document.getElementById("items");
    var newItem = document.createElement("li");
    newItem.appendChild(document.createTextNode(newItemText));
    list.appendChild(newItem);

    newItemInput.value = "";
  }
}
function randomizeList() {
  var list = document.getElementById("items");
  var listItems = Array.from(list.getElementsByTagName("li"));

  for (var i = listItems.length; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    list.insertBefore(listItems[j], listItems[i]);
  }
}
var input = document.getElementById("newItemInput");
input.addEventListener("keyup", function (event) {
  if (event.keyCode === 13) {
    // 13 represents the Enter key
    event.preventDefault();
    addItem();
  }
});
var randomizeButton = document.getElementById("randomizeButton");
randomizeButton.addEventListener("click", randomizeList);

function sortByEndorcements(a, b) {
  return b.endorcement - a.endorcement;
}
function sortByName(a, b) {
  return a.name.localeCompare(b.name);
}

function showSkills(skills) {
  skills.sort(sortByEndorcements);
  const htmlSkills = skills.map((skill) => {
    const cls = skill.favorite ? "favorite" : "";
    return `<li class="${cls}" >${skill.name} <span> - ${skill.endorcement}</span></li>`;
  });
  const ul = $("#skills ul");
  ul.innerHTML = htmlSkills.join("");
}

function loadSkills() {
  const response = fetch("skills.json");
  const loaded = response.then((r) => r.json());
  loaded.then(showSkills);
}

//start execution

showPage(activePage);
$("#top-menu-bar").addEventListener("click", clickOnMenu);
loadSkills();
