const log = console.log;
//$.ajax() 객체화
var Ajax = (function(){
	function Ajax(url, fn, opts) {
		var obj = this;
		this.url = url;
		this.fn = fn;
		if(opts) {
			if(opts.type) this.opts.type = opts.type; 
			if(opts.dataType) this.opts.dataType = opts.dataType; 
			if(opts.data) this.opts.data = opts.data;
		}
		else {
			this.opts = {};
			this.opts.type = "get";
			this.opts.dataType = "json";
			this.opts.data = {};	
		}
		$.ajax({
			type: obj.opts.type,
			url: obj.url,
			data: obj.opts.data,
			dataType: obj.opts.dataType,
			success: obj.fn,
			error: function(xhr, status, error) {
				console.log(xhr, status, error);
			}
		}); 
	}
	return Ajax;
}());

// Firebase Init / github에서 복사하신 분은 꼭 자신의 내용으로 바꿔주세요.
var config = {
    apiKey: "AIzaSyDmCGWlnyhcIla3h0boO0qG6PxwgfesYyE",
    authDomain: "auddbs7898-shop.firebaseapp.com",
    databaseURL: "https://auddbs7898-shop.firebaseio.com",
    projectId: "auddbs7898-shop",
    storageBucket: "auddbs7898-shop.appspot.com",
    messagingSenderId: "71642451898"
  };
  firebase.initializeApp(config);
//Firebase Init
var db = firebase.database();

mainInit();
function mainInit() {
	db.ref("root/home").on("child_added", homeAdd);
	db.ref("root/blog").on("child_added", blogAdd);
}

//카테고리 HOME 생성
function homeAdd(data) {
	var html = `
	<li class="rt_arrow">
		<a href="${data.val().link}" target="${data.val().target}">${data.val().title}</a>
	</li>`;
	$(".nav_sub").eq(0).append(html);
}
//카테고리 BLOG 생성
function blogAdd(data) {
	var html = `<ul id="${data.key}" class="grid-item">
		<li class="grid-tit">${data.val().name}</li>
	</ul>`;
	$(".grid").append(html);
	db.ref("root/blog/"+data.key+"/sub").once("value", function(sub){
		sub.forEach(function(v, i){
			html = `
			<li class="rt_arrow" id="${v.key}">
				<a href="${v.val().link}" target="${v.val().target}">${v.val().name}</a>
			</li>`;
			$("#"+data.key).append(html);
		});
	});
}

// 카테고리 SHOP 생성 - Ajax/json 통신
new Ajax("../json/shop.json", shopAjax);
function shopAjax(data) {
	var html = `<div class="shop_cates wrap clear">`;
	for(var i=0; i<data.cates.length; i++) {
		html += `
		<ul>
			<li class="shop_cate_tit">${data.cates[i].tit}</li>
			<li>
				<ul>`;
		for(var j=0; j<data.cates[i].data.length; j++) {
			html += `
			<li class="shop_cate_name rt_arrow">
			<a href="${data.cates[i].data[j].link}" target="${data.cates[i].data[j].target}">
			${data.cates[i].data[j].name}</a>
			</li>`;
		}
		html += `
				</ul>
			</li>
		</ul>`;
	}
	html += `</div>`;
	html += `<ul class="shop_prds">`;
	for(i=0; i<data.prds.length; i++) {
		html += `
		<li class="shop_prd ovhide"><a href="${data.prds[i].link}" target="${data.prds[i].target}">
		<img src="${data.prds[i].src}" class="img size_ani">
		</a>
		</li>`;
	}
	html += `</ul>`;
	$(".nav_sub").eq(1).append(html);
}

// 카테고리 PORTFOLIO 생성 - Ajax/json 통신
new Ajax("../json/port.json", portAjax);
function portAjax(data) {
	for(var i in data.ports) {
		var html = `
		<li class="rt_arrow">
			<a href="${data.ports[i].link}" target="${data.ports[i].target}">
			${data.ports[i].name}</a>
		</li>`;
		$(".nav_sub").eq(3).append(html);
	}
}
// 메인 좌측 네비 - lefts - Ajax/json 통신
new Ajax("../json/left.json", leftAjax);
function leftAjax(data) {
	var html;
	for(var i in data.lefts) {
		html = `<li class="rt_arrow">${data.lefts[i].name}</li>`;
		$(".left").append(html);
	}
}



// window.resize()구현 
$(window).resize(function(){
	
}).trigger("resize");


// top_nav hover 이벤트
$(".top_icon").mouseenter(function(){
	$(this).children("img").css({"opacity":.7});
});
$(".top_icon").mouseleave(function(){
	$(this).children("img").css({"opacity":1});
});

// nav 이벤트 (nav_sub show/hide)
$(".nav").mouseenter(function(){
	$(this).children(".nav_sub").css({"display":"block", "opacity":0}).stop().animate({"opacity":1, "top":"45px"}, 200);
});
$(".nav").mouseleave(function(){
	$(this).children(".nav_sub").stop().animate({"opacity":0, "top":"80px"}, 200, function(){
		$(this).css({"display":"none"});
	});
});

// rt_wings 이벤트
$(".top_nav .fa-bars").click(function(){
	var $bg = $(".rt_bg");
	var $cont = $(".rt_cont");
	$bg.css({"opacity":0, "display":"block"}).stop().animate({"opacity":.3}, 1000);
	$cont.css({"display":"block", "right":"-240px"}).stop().animate({"right":0}, 1000);
});

$(".rt_cont .fa-close").click(function(){
	var $bg = $(".rt_bg");
	var $cont = $(".rt_cont");
	$bg.stop().animate({"opacity":0}, 800, function(){
		$(this).css({"display":"none"});
	});
	$cont.stop().animate({"right":"-240px"}, 800, function(){
		$(this).css({"display":"none"});
	});
});

$(".rt_bg").click(function(e){
	e.stopPropagation();
	$(".rt_cont .fa-close").trigger("click");
});

//메인네비 / .navs
//firebase.database().ref("root/test").push({test:"테스트"}).key;

//메인배너 / .bans
//fadeShow();
function fadeShow() {
	var $wrap = $(".ban");
	var $slide = $(".ban > li");	
	var depth = 100;
	var now = 0;
	var speed = 500;
	var timeout = 3000;
	var end = $slide.length - 1;
	var interval;
	$slide.each(function(i){
		$(this).css({"position":"absolute"});
		$wrap.height($(this).height());
		$(".cycle-pager").append("<span>●</span>");
	});
	$(".cycle-pager span").click(function(){
		now = $(this).index();
		fadeAni();
		clearInterval(interval);
		interval = setInterval(fadeAni, timeout);
	});
	interval = setInterval(fadeAni, timeout);
	function fadeAni() {
		$(".cycle-pager span").removeClass("cycle-pager-active");
		$(".cycle-pager span").eq(now).addClass("cycle-pager-active");
		$slide.eq(now).css({"z-index":depth++, "opacity":0}).stop().animate({"opacity":1}, speed, function(){
			if(now == end) now = 0;
			else now++;
		});
	}
}
//horzShow();
function horzShow() {
	$(".ban").append($(".ban > li").eq(0).clone());
	var $wrap = $(".ban");
	var $slide = $(".ban > li");
	var now = 1;
	var speed = 500;
	var timeout = 3000;
	var end = $slide.length - 1;
	var interval;
	$slide.each(function(i){
		$(this).css({"left":(i*100)+"%", "position":"absolute"});
		$wrap.height($(this).height());
		if(i<end) $(".cycle-pager").append("<span>●</span>");
	});
	$(".cycle-pager span").click(function(){
		now = $(this).index();
		horzAni();
		clearInterval(interval);
		interval = setInterval(horzAni, timeout);
	});
	interval = setInterval(horzAni, timeout);
	function horzAni() {
		if(now == end) pnow = 0;
		else pnow = now;
		$(".cycle-pager span").removeClass("cycle-pager-active");
		$(".cycle-pager span").eq(pnow).addClass("cycle-pager-active");
		$wrap.stop().animate({"left":(-now*100)+"%"}, speed, function(){
			if(now == end) {
				$wrap.css({"left":0});
				now = 1;
			}
			else now++;
		});
	}	
}
vertShow();
function vertShow() {
	$(".ban").append($(".ban > li").eq(0).clone());
	var $wrap = $(".ban");
	var $slide = $(".ban > li");
	var now = 1;
	var speed = 500;
	var timeout = 3000;
	var end = $slide.length - 1;
	var interval;
	$slide.each(function(i){
		if(i<end) $(".cycle-pager").append("<span>●</span>");
	});
	$(".cycle-pager span").click(function(){
		now = $(this).index();
		vertAni();
		clearInterval(interval);
		interval = setInterval(vertAni, timeout);
	});
	interval = setInterval(vertAni, timeout);
	$(window).resize(function(){
		$(".bans").height($slide.height());
	}).trigger("resize");
	function vertAni() {
		if(now == end) pnow = 0;
		else pnow = now;
		$(".cycle-pager span").removeClass("cycle-pager-active");
		$(".cycle-pager span").eq(pnow).addClass("cycle-pager-active");
		var top = $slide.eq(now).position().top;
		$wrap.stop().animate({"top":-top+"px"}, speed, function(){
			if(now == end) {
				$wrap.css({"top":0});
				now = 1;
			}
			else now++;
		});
	}
}