/* 
  슬라이드를 만들기 위한 준비 
   1. 필요한 요소들(HTML 객체) :
     - parent (부모(슬라이드 들을 감싸는 객체))
     - container(슬라이드 들을 감싸고 움직일 객체)
     - slide(슬라이드)
   2. 옵션(변수) :
     - speed : 움직임의 속도*
     - gap : 애니메이션 term
     - direction : 방향
     - type : hori, vert, fade ...
     - pager : 페이저 유무
   3. 작동기능(메서드) :
     - 1번의 객체를 2번의 옵션으로 실제 실행
*/

/* 
  Slide수업
  var Slide = (function(){
    function Slide(){ //constructor / 생성자(new Slide()하면 아래의 함수가 실행됨)
      this.type = "Horizental Slide";//Method - 객체안의함수
    }
    Slide.prototype.getType = function(){
        return this.type;//변환값을 가져온다
    }
    Slide.prototype.setType = function(_type){
        this.type = _type;//전달받는변수는 대게 _~ 형식으로 쓴다 전달받은값을 입력한다
    }
    return Slide; //new Slide() 호출의 리턴값
}()); */

/*  Slide 만드는 순서 
   Slide라는 이름을 가진 객체를 만든다
   Slide객체한테 function을주고 그안에 또 이름이 같은 즉시실행문을 만든다
  객체는 constructor(생성자)가 필요하므로 즉시실행문안에 생성자.prototype을 만들어 즉시실행문을 만든다
  객체한테 다시 반환값을 주기위해 return을 준다 return 값이 없으면 안됀다 */

  var Slide = (function(){
	function Slide(parent, container, slide, options) {
		var obj = this;
		this.parent = parent;
		this.container = container;
		this.slide = slide;
		this.options = options;
		this.init(obj);
	}
	Slide.prototype.init = function(obj){
		if(obj.options.type == "horizental") {
			obj.slide.each(function(i){
                $(this).css({"left":(i*100)+"%"});
			});
			obj.horiMove(obj);
		}
		else if(obj.options.type == "vertical") {
			obj.slide.each(function(i){
				$(this).css({"top":(i*100)+"%"});
			});
			obj.vertMove(obj);
		}
		else if(obj.options.type == "fade") {
			obj.fadeMove(obj);
		}
	};
	Slide.prototype.horiMove = function(obj){
		
	}
	Slide.prototype.vertMove = function(obj){
		
	}
	Slide.prototype.fadeMove = function(obj){
		var depth = 0;
		var now = 0;
		var end = obj.slide.length - 1; 
		obj.slide.each(function(){
			if(depth < $(this).css("z-index")) depth = $(this).css("z-index");
		});
		depth++;
		ani();
		function ani() {
			obj.slide.eq(now).css({"z-index":depth++, "opacity":0});
			obj.slide.eq(now).delay(obj.options.gap).animate({"opacity":1}, obj.options.speed, function(){
				if(now == end) now = 0;
				else now++;
				ani();
			});
		}
	}
	return Slide;
}());