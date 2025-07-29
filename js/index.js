var userSiteName = document.getElementById('siteName');
var userSiteUrl = document.getElementById('siteUrl');
var searchInput = document.getElementById('searchButtton');
var addButton = document.getElementById('addButton');
var updateButton = document.getElementById('updateButton');
var dataContainer = [];
var indexUpdate = 0;
if (localStorage.getItem('userSiteData') !== null) {
    dataContainer = JSON.parse(localStorage.getItem('userSiteData'));
    displayData();
}
function addData() {
if (validationName() && validationUrl()) {
    var userSiteData = {
    name: userSiteName.value,
    url: userSiteUrl.value
};
    dataContainer.push(userSiteData);
    localStorage.setItem('userSiteData', JSON.stringify(dataContainer));
    clearData();
    displayData();
}}
function displayData() {
    var cartona = '';
    for (var i = 0; i < dataContainer.length; i++) {
    cartona +=
        '<tr>' +
        '<td>' + (i + 1) + '</td>' +
        '<td class="h4 fw-bolder">' + dataContainer[i].name + '</td>' +
        '<td>' + dataContainer[i].url + '</td>' +
        '<td><button onclick="window.open(\'' + dataContainer[i].url + '\', \'_blank\')" class="btn btn-success text-white">Visit</button></td>' +
        '<td><button onclick="setData(' + i + ')" class="btn btn-warning text-white">Update</button></td>' +
        '<td><button onclick="deleteSite(' + i + ')" class="btn bg-danger text-white">Delete</button></td>' +
        '</tr>';
}
    document.getElementById('tbody').innerHTML = cartona;
}

function deleteSite(index) {
    dataContainer.splice(index, 1);
    localStorage.setItem('userSiteData', JSON.stringify(dataContainer));
    displayData();
}
function setData(index) {
    var currentInput = dataContainer[index];
    indexUpdate = index;
    userSiteName.value = currentInput.name;
    userSiteUrl.value = currentInput.url;
    addButton.classList.add('d-none');
    updateButton.classList.remove('d-none');
}
function updateData() {
    if (validationName() && validationUrl()) {
        var userSiteData = {
        name: userSiteName.value,
        url: userSiteUrl.value
};
                dataContainer.splice(indexUpdate, 1, userSiteData);
                localStorage.setItem('userSiteData', JSON.stringify(dataContainer));
                clearData();
                displayData();
            }
        }
function clearData() {
    userSiteName.value = '';
    userSiteUrl.value = '';
    addButton.classList.remove('d-none');
    updateButton.classList.add('d-none');
    userSiteName.classList.remove('is-valid', 'is-invalid');
    userSiteUrl.classList.remove('is-valid', 'is-invalid');
    document.getElementById('nameAlert').classList.add('d-none');
    document.getElementById('urlAlert').classList.add('d-none');
}
function searchData() {
    var term = searchInput.value.toLowerCase();
    var cartona = '';
    var count = 1;
    for (var i = 0; i < dataContainer.length; i++) {
    if (dataContainer[i].name.toLowerCase().indexOf(term) !== -1) {
        cartona +=
            '<tr>' +
            '<td>' + (count++) + '</td>' +
            '<td>' + dataContainer[i].name + '</td>' +
            '<td>' + dataContainer[i].url + '</td>' +
            '<td><button onclick="window.open(\'' + dataContainer[i].url + '\', \'_blank\')" class="btn btn-success text-white">Visit</button></td>' +
            '<td><button onclick="setData(' + i + ')" class="btn btn-warning text-white">Update</button></td>' +
            '<td><button onclick="deleteSite(' + i + ')" class="btn bg-danger text-white">Delete</button></td>' +
            '</tr>';
        }}
        document.getElementById('tbody').innerHTML = cartona;
        }
function validationName() {
    var regexName = /^[A-Za-z][a-z]{2,12}$/;
    var alertName = document.getElementById('nameAlert');
    if (regexName.test(userSiteName.value)) {
        userSiteName.classList.add('is-valid');
        userSiteName.classList.remove('is-invalid');
        alertName.classList.add('d-none');
        return true;
    } else {
        userSiteName.classList.add('is-invalid');
        userSiteName.classList.remove('is-valid');
        alertName.classList.remove('d-none');
        return false;
    }
}
function validationUrl() {
    var regexUrl = /^(https?:\/\/)?(www\.)?[\w-]+\.[a-z]{2,}(\/.*)?$/i;
    var alertUrl = document.getElementById('urlAlert');
    if (regexUrl.test(userSiteUrl.value)) {
        userSiteUrl.classList.add('is-valid');
        userSiteUrl.classList.remove('is-invalid');
        alertUrl.classList.add('d-none');
        return true;
    } else {
        userSiteUrl.classList.add('is-invalid');
        userSiteUrl.classList.remove('is-valid');
        alertUrl.classList.remove('d-none');
        return false;
    }
}