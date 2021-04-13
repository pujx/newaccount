function selCountry() {
	var sel = $("#country option:selected").attr("title");
	$("#CountryNumber").html(sel)
}
	//login out
	$('.right-bar-toogle').on('click', function() {
		$(this).toggleClass("right-bar-active").siblings().removeClass("right-bar-active");
		if($(this).hasClass("right-bar-active")) {
			$(this).children("a").children("i").removeClass("fa-angle-down").addClass("fa-angle-up");
		} else {
			$(this).children("a").children("i").removeClass("fa-angle-up").addClass("fa-angle-down");
		};
	});

	$(".scale-up,.right-bar-toogle").on("click", function(e) {
		e.stopPropagation();
	});
	$(document).click(function(e) {
		var _con = $(".right-bar-toogle");
		if(!_con.is(e.target) && _con.has(e.target).length === 0) {
			$(".right-bar-toogle").removeClass("right-bar-active");
			$(".right-bar-toogle").children("a").children("i").removeClass("fa-angle-up").addClass("fa-angle-down");
		}
	});


$(function() {
	var year = new Date();
	var footYear = year.getFullYear();
	$("#footer-year").text(footYear)
});