jQuery(function ($) {
	//alert('Loaded');
	var initDate = new Date("September 02, 1969 00:00:00");
	var today = new Date();
	
	var days = daysBetween(initDate, today);
	console.log(days+' since I started.');
	
	var body = $('body');
	
	var timelineContainer = $('#timeline');
	
	var shouldPlaceViewerAtTop = true;
	
	var factor = 0.1;
	
	var timelineSpine = $('<div style="height:'+days*factor+'px;" class="timeline-spine"></div>');
	timelineContainer.add(timelineSpine).appendTo(timelineContainer);	
	
	var events = [
		[
			new Date("September 02, 1969 00:00:00"),
			"First Data Exchange",
			'<div><img style="background-image: url(src/arpanet.jpg)"><h1>Internet is born</h1><p>Two computers at University of California, Los Angeles, exchange meaningless data in first test of Arpanet, an experimental military network.</p></div>'
		],
		[
			new Date("November 15, 1983  00:00:00"),
			"Domain Name System Designed",
			'<div><img style="background-image: url(src/dns.png)"><h1>DNS</h1><p>The Domain Name System was designed by Paul Mockapetris at the University of California.</p></div>'
		],
		[
			new Date("January 24, 1984 00:00:00"),
			"Macintosh Announced by Apple",
			'<div><img style="background-image: url(src/macintosh.png)"><h1>Machintosh</h1><p>The first consumer computer with a graphical user interface was revealed. It was an evolution in personal computing.</p></div>'
		],
		[
			new Date("November 02, 1988 00:00:00"),
			"First Computer Worm",
			'<div><img style="background-image: url(src/morris-worm.jpg)"><h1>Morris</h1><p>The first ever computer worm named after its creator, Robert Tappan Morris.</p></div>'
		],
		[
			new Date("December 25, 1990 00:00:00"),
			"First Web Browser",
			'<div><img style="background-image: url(src/first-web-browser.png)"><h1>First Web Browser</h1><p>WorldWideWeb (later renamed to Nexus to avoid confusion between the software and the World Wide Web) was the first web browser and editor. When it was written, WorldWideWeb was the only way to view the Web.</p></div>'
		],
		[
			new Date("September 04, 1998 00:00:00"),
			"Google Founded",
			'<div><img style="background-image: url(src/google.jpg)"><h1>Google</h1><p>Google was founded by Larry Page and Sergey Brin while they were Ph.D. students at Stanford University. Google is now the most commonly used search engine.</p></div>'
		],
		[
			new Date("February 04, 2004 00:00:00"),
			"Facebook Founded",
			'<div><img style="background-image: url(src/facebook.svg)"><h1>Facebook Founded</h1><p>Facebook was founded on February 4, 2004, by Mark Zuckerberg with his college roommates and fellow Harvard University students Eduardo Saverin, Andrew McCollum, Dustin Moskovitz and Chris Hughes.</p></div>'
		],
		[
			new Date("July 15, 2006 00:00:00"),
			"Twitter Launched",
			'<div><img style="background-image: url(src/twitter.png)"><h1>Twitter Launched</h1><p>Twitter is an online social networking and microblogging service that enables users to send and read short 140-character text messages, called "tweets".<br />\
Twitter was created in March 2006 by Jack Dorsey, Evan Williams, Biz Stone and Noah Glass and by July 2006 the site was launched. The service rapidly gained worldwide popularity, with 500 million registered users in 2012, who posted 340 million tweets per day. The service also handled 1.6 billion search queries per day. In 2013 Twitter was one of the ten most-visited websites, and has been described as "the SMS of the Internet.".</p></div>'
		],
		[
			new Date("June 29, 2007 00:00:00"),
			"iPhone Launch",
			'<div><img style="background-image: url(src/iphone.jpg);"><h1>iPhone Launch</h1><p>The iPhone revolutionised the smartphone. It had a desktop grade web browser built in and allowed more natural interaction with on-screen elements.</p></div>'
		],
		[
			new Date("April 03, 2010 00:00:00"),
			"iPad Launch",
			'<div><img style="background-image: url(src/ipad.jpeg)"><h1>iPad Launch</h1><p>The iPad was the next step in personal computing and portable computers. It started the table market and has dominated ever since.</p></div>'
		],
		[
			new Date("July 11, 2012 14:22:00"),
			"Jordan = [[Developer alloc] init];",
			'<div><img style="background-image: url(src/sixteen-logo.png)"><h1>Jordan is a developer</h1><p>Jordan takes his first step into his carrier as a software developer and/or computer science. The start of something new.</p></div>'
		],
		[
			new Date(),
			"History to be made",
			'<div><h2 style="font-size: 40px;">History is now being made.</h2></div>'
		]
	];
	
	for (var i = 0; i < events.length; i++) {
		
		var event = events[i];
		var date = event[0];
		var detail = event[1];
		
		var dateDiff = daysBetween(initDate, date);
		console.log(dateDiff);
		
		var timelineEvent;
		
		if (i == events.length-1) {
			if (i % 2 === 0 || i == 0) {
				timelineEvent = $('<div class="timeline-eventR" id="event" style="top:'+((dateDiff*factor)-30)+'px;"><p class="date">Now</p><p class="event">'+detail+'</p></div>');
			} else {
				timelineEvent = $('<div class="timeline-eventL" id="event" style="top:'+((dateDiff*factor)-30)+'px;"><p class="date">Now</p><p class="event">'+detail+'</p></div>');
			}
		} else {
			if (i % 2 === 0 || i == 0) {
				timelineEvent = $('<div class="timeline-eventR" id="event" style="top:'+dateDiff*factor+'px;"><p class="date">'+date.toDateString()+'</p><p class="event">'+detail+'</p></div>');
			} else {
				timelineEvent = $('<div class="timeline-eventL" id="event" style="top:'+dateDiff*factor+'px;"><p class="date">'+date.toDateString()+'</p><p class="event">'+detail+'</p></div>');
			}
		}
		timelineSpine.add(timelineEvent).appendTo(timelineSpine);
		
		var box;
		
		timelineEvent.hover(
			function () {
				var eventName = $(this).children('.event').text();
				var index;
				
				for (var a = 0; a < events.length; a++) {
					var array = events[a];
					index = array.indexOf(eventName);
					if (index != -1) {
						index = a;
						break;
					}
				}
				
				var array = events[index];
				var finerDetail = array[2];
				
				box = $('<div class="box"><div class="trim"></div>'+finerDetail+'</div>');				
				
				$(this).add(box).appendTo($(this));
				box.animate({width:300}, 200, "linear", function() {}).animate({height:175}, 250, "linear", function() {});
				//box.animate({height:150}, 100, "linear", function () {});
				
				var eventImage = $(box.children($("img")));
				eventImage.click(function () {
					
					var distanceFromTop = body.scrollTop();									
					
					var clearOverlay = $("<div class='clearOverlay'></div>");
					var imageview = $("<div class='imageviewer'></div>");
					
					if (shouldPlaceViewerAtTop) {
						clearOverlay.css("top", distanceFromTop);
						imageview.css("top", distanceFromTop);
					} else {
						body.animate({scrollTop: 0}, 100);
					}
					
					var closeButton = $("<a class='close'>X</a>");
					
					var imageSource = $('img').css('background-image');
					imageSource = imageSource.substring("url(".length);
					imageSource = imageSource.substring(0, imageSource.length - 1);

					var image = $("<img src='"+imageSource+"' />");
					
					imageview.add(closeButton).appendTo(imageview);
					imageview.add(image).appendTo(imageview);
					
					clearOverlay.css("opacity", 0);
					imageview.css("opacity", 0);
					
					imageview.animate({"opacity": 1}, 250);
					clearOverlay.animate({"opacity": 0.25}, 250);
					
					body.add(clearOverlay).appendTo(body);
					body.add(imageview).appendTo(body);
					body.css("overflow", "hidden"); 
					
					var imageWidth = image.width();
					var imageHeight = image.height();
					
					var containerWidth = imageview.width();
					var containerHeight = imageview.height();
					
					var topDiff = (containerHeight - imageHeight)/2;
					var leftDiff = (containerWidth - imageWidth)/2;
					
					image.css("top", topDiff);
					image.css("left", leftDiff);
										
					closeButton.click(function () {
						imageview.fadeOut(250, function () {
							imageview.remove();
						});
						clearOverlay.fadeOut(250, function () {
							clearOverlay.remove();
						
							body.css("overflow", "auto");
							if (!shouldPlaceViewAtTop) {
								body.animate({scrollTop: distanceFromTop}, 100); 
							}
						});
					});
				});
			},
			function () {
				//box.animate({height:3}, 100, "linear", function() {}).animate({width:0}, 100, "linear", function() {box.remove();});
				//box.animate({height:0}, 100, "linear", function () {box.remove();});
				box.remove();
			}
		);
	}
	alert("The images in the events are clickable.");
})

function daysBetween (date1, date2) {
	// The number of milliseconds in one day
	var ONE_DAY = 1000 * 60 * 60 * 24;
		
	// Convert both dates to milliseconds
	var date1_ms = date1.getTime();
	var date2_ms = date2.getTime();
		
	// Calculate the difference in milliseconds
	var difference_ms = Math.abs(date1_ms - date2_ms);
			
	// Convert back to days and return
	return Math.round(difference_ms/ONE_DAY);
}	