$("#fillQuizAddButton").on("click", function () {
  if ($(".answer-radio").length > 5) return;
  addFillAnswerForm(null);
});
function addFillAnswerForm(data) {
  const htmlAnswer = `  <div class="mb-3 answer-fill" style="display:none">
  <div class="d-flex justify-content-start align-items-center" style="gap: 10px">
    <input type="text" class="form-control" placeholder=""/>
    <button type="button" class="btn-close" aria-label="Close" style="display: block"></button>
  </div>
</div>`;

  const htmlObjFill = $(htmlAnswer);

  $("#js-fill-answer-wrapper").append(htmlObjFill);
  htmlObjFill.slideDown("slow");
  htmlObjFill
    .children()
    .children(".btn-close")
    .on("click", function () {
      $(htmlObjFill).slideUp("slow", function () {
        $(htmlObjFill).remove();
      });
    });
}
