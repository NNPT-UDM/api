/*
Template Name: Minible - Admin & Dashboard Template
Author: Themesbrand
Website: https://themesbrand.com/
Contact: themesbrand@gmail.com
File: Email summernote Js File
*/

// event (POST, PUT, DELETE)
$(document).ready(function () {
  $(document).on("click", "button.make-request", function (e) {
    e.preventDefault();
    var method = $(this).attr("method");
    var url = $(this).attr("action");
    var btnId = $(this).attr("id");
    var request = new XMLHttpRequest();
    request.open(method || "GET", url);
    request.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    request.send();
    request.onload = function () {
      if (request.status === 200) {
        $(`#${btnId}`).triggerHandler("Requested");
      } else {
      }
    };
  });
});

function serializeForm(form) {
  var elements = document.querySelectorAll(form);
  var data = {};
  for (var i = 0; i < elements.length; i++) {
    var el = elements[i];
    var val = el.value;
    if (!val) val = "";
    var fullName = el.getAttribute("name");
    if (!fullName) continue;
    var fullNameParts = fullName.split(".");
    var prefix = "";
    var stack = data;
    for (var k = 0; k < fullNameParts.length - 1; k++) {
      prefix = fullNameParts[k];
      if (!stack[prefix]) {
        stack[prefix] = {};
      }
      stack = stack[prefix];
    }
    prefix = fullNameParts[fullNameParts.length - 1];
    if (stack[prefix]) {
      var newVal = stack[prefix] + "," + val;
      stack[prefix] += newVal;
    } else {
      stack[prefix] = val;
    }
  }
  return data;
}
// decode Html
function htmlDecode(value) {
  return $("<textarea/>").html(value).text();
}
function getFormattedDate(dateInput) {
  var date = new Date(dateInput);
  let year = date.getFullYear().toString().padStart(4, "0");
  let month = (1 + date.getMonth()).toString().padStart(2, "0");
  let day = date.getDate().toString().padStart(2, "0");
  let hour = date.getHours().toString().padStart(2, "0");
  let minutes = date.getMinutes().toString().padStart(2, "0");

  return year + "-" + month + "-" + day + "T" + hour + ":" + minutes;
}
