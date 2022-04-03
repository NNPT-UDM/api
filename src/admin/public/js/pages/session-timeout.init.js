/*
Template Name: Minible - Admin & Dashboard Template
Author: Themesbrand
Website: https://themesbrand.com/
Contact: themesbrand@gmail.com
File: Session Timeout Js File
*/
var path = window.location.href.split("page")[0];
$.sessionTimeout({
	keepAliveUrl: `${path}page/pages-starter`,
	logoutButton: "Logout",
	logoutUrl: `${path}auth/login`,
	redirUrl: `${path}auth/lock-screen`,
	warnAfter: 3000,
	redirAfter: 10000,
	countdownMessage: "Redirecting in {timer} seconds.",
});

$("#session-timeout-dialog  [data-dismiss=modal]").attr("data-bs-dismiss", "modal");
