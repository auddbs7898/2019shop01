/***** 공통사항 변수 선언 ******/
const log = console.log;
const mapKey = "f0469ae1e971ab333e7790ef71fc07cd"; /** const는 상수로 항상 유지되는 값이므로 한번 값을 설정한뒤로는 반복설정이나 재설정이 불가능하다 **/
var $bar = $(".navs_mo");
var $bar2 = $(".nav_close");
var $nav = $(".navs_mo_sub");
var navWid = $nav.width();

/***** 반응형/높이를 위한 resize ******/
$(window).resize(function(){
   navInit();   //모바일 네비게이션 가리기
   banInit();   //배너 Auto height
}).trigger("resize");

/***** 메인 배너 ******/
function banInit() {
   $(".banner_wrap").height($(".banner_wrap > li").height());
   $(".banner").height($(".banner_wrap > li").height());
}

/***** 모바일 네비게이션 ******/
$bar.click(navToggle);
$bar2.click(navToggle);
function navInit() {
   navWid = $nav.width();
   if($(window).width() > 768) navHide();
}
function navHide() {
   $nav.css({"left":-navWid+"px"});
}
function navToggle() {
   if($nav.position().left == 0) $nav.stop().animate({"left": -navWid+"px"}, 500);
   else $nav.stop().animate({"left": 0}, 500);
}

/***** masonry *****/

$('.grid').imagesLoaded( function() {
   $('.grid').masonry({
      itemSelector: '.grid-item',
      columnWidth: '.grid-sizer',
      percentPosition: true
    })
 });

 /***** 다음 지도 *****/
$(window).resize(function(){
	var container = document.getElementById('map');
	var options = {
		center: new daum.maps.LatLng(37.572070, 126.987287), //지도의 중심좌표.
		level: 3 //지도의 레벨(확대, 축소 정도)
	};
	var map = new daum.maps.Map(container, options); //지도 생성 및 객체 리턴
	/* map.setDraggable(false);
	map.setZoomable(false); *//** 지도 안움직이게끔 하는 행위 **/
	
	var clusterer = new daum.maps.MarkerClusterer({
		map: map,
		gridSize: 35,
		averageCenter: true,
		minLevel: 6,
		disableClickZoom: true,
		styles: [{
				width : '53px', height : '52px',
				background: 'url(cluster.png) no-repeat',
				color: '#fff',
				textAlign: 'center',
				lineHeight: '54px'
		}]
	});
	var marker = new daum.maps.Marker({
		position: new daum.maps.LatLng(37.572070, 126.987287)
	});
	clusterer.addMarker(marker);
}).trigger("resize");

/***** bt_top *****/
$("#bt_top").click(function(){
	$("html, body").stop().animate({"scrollTop":0}, 2000);
});

/* var mainSlide = new Slide();//Slide라는 속성을가진 새로운 객체생성
mainSlide.setType("ggg");
log(mainSlide.getType()); */

/*
var options = {
	speed: 3000,
	gap: 3000,
	type: "fade",
	pager: true
};
var mainBanner = new Slide($(".banner"), $(".banner_wrap"), $(".slide"), options);
var options = [{
	delay: 3000,
	speed: 1000
},{
	delay: 1000,
	speed: 200
},{
	delay: 2000,
	speed: 100
}];
var mainBanner = new SlideFade($(".banner_wrap").eq(0).find(".slide"), options[0]);
var mainBanner2 = new SlideFade($(".banner_wrap").eq(1).find(".slide"), options[1]);
var mainBanner3 = new SlideFade($(".banner_wrap").eq(2).find(".slide"), options[2]);
//접근법
$(".banner_wrap").eq(0).find(".slide")
$(".slide", $(".banner_wrap").eq(0))
*/

//new SlideFade($(".slide"), {delay:3000, speed:1000});

 var options = {
	delay: 3000,
	speed: 300,
	dir: -1,
	dirBtnUse: true,
	dirBtn:[$("#bt_prev"), $("#bt_next")]
};
var horiBanner = new SlideHori($("#banner1"), $("#banner1").find(".slide"), options);


/*
$(".banner_wrap").find(".slide")
$(".banner_wrap").children(".slide")
$(".slide", $(".banner_wrap"))
*/


/***** EmailJs *****/
/*
//선택자
document.getElementById('contact-form') //ES5
document.querySelector('#contact-form') //ES6
$("#contact-form") //jquery
document.getElementById('contact-form').addEventListener('submit', function(event) {
		event.preventDefault();
		this.contact_number.value = Math.random() * 100000 | 0;
		emailjs.sendForm('contact_service', 'contact_template', this);
});
*/
emailjs.init("user_TROFqVnbPGZyygPAci7nt");//본인거로...
$('#contact-form').on('submit', function(e) {
		e.preventDefault();
		$("input[name='contact_number']").val(Math.random() * 100000 | 0);
		//앞에두개 본인거로...
		emailjs.sendForm('booldook', 'template_Do4o09A1', this).then(function(res){
			alert("메세지 전송에 성공했습니다. \n빠른 시간안에 답변 드리겠습니다.");
		}, function(err){
			alert("메세지 전송이 실패했습니다. \n다시 시도해 주세요.");
		});
		$(this)[0].reset();
});


/***** 네비게이션 구현 *****/
$(".nav").click(goLoc);
$(".logo").click(goLoc);
function goLoc() {
	var nav = $(this);
	var i = $(this).data("page");
	var pos = $(".page").eq(i).offset().top;
	$("html, body").stop().animate({"scrollTop":pos}, 1000, function(){
		$(".nav").css({"color":"#333"});
		if(i > 0) nav.css({"color": "#b30"});
	});
}
//$("html, body").stop().animate({"scrollTop":2000}, 1000);