$(document).ready(function(){
	console.log("app.js loaded.");

	$("#submitButton").on("click", function(){
		console.log("#submitButton clicked.");
		const title = $("#title").val();
		const summary = $("#body").val();
		const link = $("#link").val().trim();
		const noteContent = $("#noteContent").val();
		const article = {
			title: title,
			summary: summary,
			link: link,
			note: noteContent
		};
		console.log('article', article);
		$.post("/article", article).done(function(data){
			console.log("data =", data);
		});
	});

	$("#scrape-button").on("click", function(event){
		event.preventDefault();
		console.log("#scrape-button clicked.");
		const url = encodeURIComponent($("#url-input").val());
		console.log('url', url);
		$("html").load(`/scrape/${url}`, function (res, status){
			console.log("loaded");
		});
	});

	$(document).on("click", ".save-article", function(event){
		const articleId = $(this).attr("id");
		console.log('saveArticle() invoked-', articleId);
		saveArticle(articleId);
	});

	const saveArticle = function (articleId){
		const articleData = {};
		const index = articleId.slice(13);
		console.log('index', index);
		articleData.title = $(`#title-${index}`).text();
		articleData.link = $(`#link-${index}`).attr("href");
		articleData.summary = $(`#summary-${index}`).text() || null;
		articleData.photoURL = $(`#photoURL-${index}`).attr("href") || null;
		console.log('articleData', articleData);
		$(`#row-${index}`).remove();
		$.post("/article", articleData).done(function (req, res){
			return console.log(res);
		});
	}
});