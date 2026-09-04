$(window).load(function(){
	$('.loading').fadeOut('fast');
	$('.container').fadeIn('fast');
});
$('document').ready(function(){
		var vw;

		// Balloon size/spacing/row-tops match the CSS breakpoints (768px / 480px).
		// Row tops are set explicitly (not scaled from a ratio) so the two rows
		// always clear each other's height, whatever the balloon size is.
		function getBalloonMetrics() {
			var w = $(window).width();
			if (w <= 480) return { spacing: 56, row1Top: 160, row2Top: 285 };
			if (w <= 768) return { spacing: 80, row1Top: 190, row2Top: 350 };
			return { spacing: 100, row1Top: 200, row2Top: 360 };
		}

		// "HBD" row on top, name row centered below it
		function positionBalloonRows() {
			vw = $(window).width()/2;
			var m = getBalloonMetrics();
			var hbdRow = ['b11','b22','b33'];
			var nameRow = ['b44','b55','b66','b77','b88','b99'];
			hbdRow.forEach(function(id, i){
				$('#'+id).animate({top:m.row1Top, left: vw - (hbdRow.length*m.spacing)/2 + i*m.spacing}, 500);
			});
			nameRow.forEach(function(id, i){
				$('#'+id).animate({top:m.row2Top, left: vw - (nameRow.length*m.spacing)/2 + i*m.spacing}, 500);
			});
		}

		$(window).resize(function(){
			$('#b1,#b2,#b3,#b4,#b5,#b6,#b7,#b8,#b9').stop();
			positionBalloonRows();
		});

	$('#turn_on').click(function(){
		$('#bulb_yellow').addClass('bulb-glow-yellow');
		$('#bulb_red').addClass('bulb-glow-red');
		$('#bulb_blue').addClass('bulb-glow-blue');
		$('#bulb_green').addClass('bulb-glow-green');
		$('#bulb_pink').addClass('bulb-glow-pink');
		$('#bulb_orange').addClass('bulb-glow-orange');
		$('body').addClass('peach');
		$(this).fadeOut('slow').delay(5000).promise().done(function(){
			$('#play').fadeIn('slow');
		});
	});
	$('#play').click(function(){
		var audio = $('.song')[0];
        audio.play();
        $('#bulb_yellow').addClass('bulb-glow-yellow-after');
		$('#bulb_red').addClass('bulb-glow-red-after');
		$('#bulb_blue').addClass('bulb-glow-blue-after');
		$('#bulb_green').addClass('bulb-glow-green-after');
		$('#bulb_pink').addClass('bulb-glow-pink-after');
		$('#bulb_orange').addClass('bulb-glow-orange-after');
		$('body').css('backgroud-color','#FFF');
		$('body').addClass('peach-after');
		$(this).fadeOut('slow').delay(6000).promise().done(function(){
			$('#bannar_coming').fadeIn('slow');
		});
	});

	$('#bannar_coming').click(function(){
		$('.bannar').addClass('bannar-come');

		$(this).fadeOut('slow').delay(6000).promise().done(function(){
			$('#balloons_flying').fadeIn('slow');

		// Show the album photos
		$('.album-photo').fadeIn('slow');

		$('.can-zoom').fadeIn('slow');

		});
	});

	function floatBalloon(id) {
		// keep the float range within the visible viewport so balloons
		// don't drift off-screen on narrow (mobile) widths
		var maxLeft = Math.max($(window).width() - 100, 100);
		var randleft = maxLeft*Math.random();
		var randtop = 500*Math.random();
		$('#'+id).animate({left:randleft,bottom:randtop},10000,function(){
			floatBalloon(id);
		});
	}

	$('#balloons_flying').click(function(){
		$('.balloon-border').animate({top:-500},8000);
		$('#b1,#b4,#b5,#b7,#b9').addClass('balloons-rotate-behaviour-one');
		$('#b2,#b3,#b6,#b8').addClass('balloons-rotate-behaviour-two');
		['b1','b2','b3','b4','b5','b6','b7','b8','b9'].forEach(floatBalloon);

		$(this).fadeOut('slow').delay(5000).promise().done(function(){
			$('#cake_fadein').fadeIn('slow');
		});
	});

	$('#cake_fadein').click(function(){
		$('.cake').fadeIn('slow');
		$(this).fadeOut('slow').delay(3000).promise().done(function(){
			$('#light_candle').fadeIn('slow');
		});
	});

	$('#light_candle').click(function(){
		$('.fuego').fadeIn('slow');
		$(this).fadeOut('slow').promise().done(function(){
			$('#wish_message').fadeIn('slow');
		});
	});

		
	$('#wish_message').click(function(){
		$('#b1,#b2,#b3,#b4,#b5,#b6,#b7,#b8,#b9').stop();
		$('#b1').attr('id','b11');
		$('#b2').attr('id','b22');
		$('#b3').attr('id','b33');
		$('#b4').attr('id','b44');
		$('#b5').attr('id','b55');
		$('#b6').attr('id','b66');
		$('#b7').attr('id','b77');
		$('#b8').attr('id','b88');
		$('#b9').attr('id','b99');
		positionBalloonRows();
		$('.balloons').css('opacity','0.9');
		$('.balloons h2').fadeIn(3000);
		$(this).fadeOut('slow').delay(3000).promise().done(function(){
			$('#story').fadeIn('slow');
		});
	});
	
	$('#story').click(function(){
		$(this).fadeOut('slow');
		$('.cake').fadeOut('fast').promise().done(function(){
			$('.message').fadeIn('slow');
		});

		var $messages = $(".message p");   // only inside .message
		var totalMessages = $messages.length;

		function msgLoop(i) {
			if (i < totalMessages - 1) {
				$messages.eq(i).fadeIn('slow').delay(1500).fadeOut('slow').promise().done(function(){
					msgLoop(i + 1);
				});
			} else {
				// Last message stays + cake comes back
				$messages.eq(i).fadeIn('slow').promise().done(function(){
					$('.cake').fadeIn('fast');
					$('#one_more_thing').fadeIn('slow');
				});
			}
		}

		msgLoop(0);
	});

	$('#one_more_thing').click(function(){
		$(this).fadeOut('slow');
		$('.message').fadeOut('slow');
		$('.cake').fadeOut('slow');
		$('.album-photo').fadeOut('slow');
		$('.can-zoom').fadeOut('slow');
		$('#photo-tooltip').hide();
		$('.final-reveal').fadeIn('slow');
	});

});

// Zoom (lightbox) feature
$('.album-photo').click(function() {
    var src = $(this).attr('src');
    var caption = $(this).attr('data-caption') || '';
    $('#lightbox img').attr('src', src);
    $('#lightbox-caption').text(caption);

    // Force flex only when showing
    $('#lightbox').css('display', 'flex').hide().fadeIn('fast');
});

// Hover tooltip on album photos
$('.album-photo').on('mouseenter', function() {
    var caption = $(this).attr('data-caption');
    if (!caption) return;
    $('#photo-tooltip').text(caption).show();
}).on('mousemove', function(e) {
    $('#photo-tooltip').css({ left: e.clientX, top: e.clientY });
}).on('mouseleave', function() {
    $('#photo-tooltip').hide();
});

// Close when clicking outside image
$('#lightbox').click(function(e) {
    if (e.target !== this) return; // only close if background clicked
    $('#lightbox').fadeOut('fast');
});




//alert('hello');