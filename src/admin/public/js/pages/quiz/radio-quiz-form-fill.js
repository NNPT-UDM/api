$(document).ready(function () {});
$("#radioQuizAddButton").on("click", function () {
  if ($(".answer-radio").length > 5) return;
  cloneRadioAnswerForm(null);
});
function cloneRadioAnswerForm(data) {
  const htmlAnswer = ` <div class="mb-3 answer-radio" style="display: none">
  <div class="d-flex justify-content-start align-items-center" style="gap: 10px;">
    <input type="radio" name="answer" />
    <input type="text" class="form-control" placeholder="" />
    <button
      type="button"
      class="btn-close"
      aria-label="Close"
      style="display: block"
    ></button>
  </div>
</div>`;

  const htmlObj = $(htmlAnswer);

  $("#js-radio-answer-wrapper").append(htmlObj);
  console.log(htmlObj.children().children(".btn-close"));
  htmlObj.slideDown("slow");
  htmlObj
    .children()
    .children(".btn-close")
    .on("click", function () {
      $(htmlObj).slideUp("slow", function () {
        $(htmlObj).remove();
      });
    });
}

$(`.btn-close`).on("click", function () {
  $(this.parentNode.parentNode).slideUp("slow", function () {
    $(this).remove();
  });
});
