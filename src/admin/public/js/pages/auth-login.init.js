$("#username").on("input change keyup paste click", function () {
	var field = $(this).val();
	// CHeck if email
	if (/\@/.test(field)) {
		$(this).attr("name", "email");
		$(this).attr("type", "email");
	} else {
		$(this).attr("type", "text");
		$(this).attr("name", "username");
	}
});
