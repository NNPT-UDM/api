$(document).on("submit", "#reviewFormFill", function (event) {
  event.preventDefault();
  var formData = JSON.parse($(this).serializeFormJSON());
  var recommend = [];
  $("#js-recommend-wrapper .cloned-card").each((index, e) => {
    // if (!index) return;
    let parentId = $(e).attr("id");
    let titleVal = $(`#${parentId} > div:nth-child(2) > input`).val();
    let contentVal = $(`#${parentId} > div:nth-child(3) > textarea`).val();
    let result = {
      title: titleVal,
      content: contentVal,
    };
    recommend.push(result);
  });
  formData.recommend = recommend;
  var request = new XMLHttpRequest();
  request.open($(this).attr("method"), $(this).attr("action"));
  request.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
  request.send(JSON.stringify(formData));
  request.onload = function () {
    if (request.status === 200) {
      $("#reviewFormFillModal").modal("hide");
      toastr.clear();
      toastr.success("Success");
    } else {
      toastr.clear();
      toastr.error(JSON.parse(request.response).message || "Error");
    }
  };
});

$("#lessonIdRef").on("change", function () {
  if (!$(this).val()) return;
  $.ajax({
    url: `${api}/review/view?lesson=${$(this).val()}&owner=${$("#reviewOwnerId").val()}`,
    method: "GET",
    success: function (response) {
      var { data } = response;
      if (data.length > 0) {
        data = data[0];
        $("#js-recommend-wrapper").children().remove();
        $("#reviewFormFill").changeFormFill(`${api}/review/edit/${data._id}`, "PUT");
        $("#reviewTitle").val(data.title);
        Array.from(data.recommend).forEach((obj, index) => {
          cloneRecommendForm(obj);
        });
        $("button[type='submit']").text("Save Change");
      } else {
        $("#reviewFormFill").changeFormFill(`${api}/review/add`, "POST");
        $("#listRecommend").html("");
        $(".form-control").val("");
        $("button[type='submit']").text("Save");
      }
    },
  });
});

$("#reviewFormFillModal").on("hidden.bs.modal", function () {
  $("#reviewFormFill")[0].reset();
  $("#js-recommend-wrapper").children().remove();
});

$("#btnCloneRecommendForm").on("click", function () {
  cloneRecommendForm(null);
});

function cloneRecommendForm(data) {
  var cardLength = $("#js-recommend-wrapper").children().length + 1;
  var clonedId = `recommend-${cardLength}`;
  var recommendForm = $("#js-add-recommend-wrapper").children().clone(true).attr("id", clonedId);
  recommendForm.find("#js-clone-recommend-wrapper").remove();
  $("#js-recommend-wrapper").append(recommendForm);
  $("#js-add-recommend-wrapper:last .form-control").val("");
  $("#js-recommend-wrapper .cloned-card button.btn-close")
    .last()
    .css("display", "block")
    .attr("id", `btn-close-${cardLength}`);
  $(`#btn-close-${cardLength}`).on("click", function () {
    $(`#${clonedId}`).remove();
  });
  var inputFormControl = $(`#${clonedId} > div:nth-child(2) > input`)
    .attr("name", "recommend.title")
    .prop("required", true);
  var texereaFormControl = $(`#${clonedId} > div:nth-child(3) > textarea`)
    .attr("name", "recommend.content")
    .prop("required", true);
  if (data) {
    var { title, content } = data;
    inputFormControl.val(title);
    texereaFormControl.val(content);
  }
}
