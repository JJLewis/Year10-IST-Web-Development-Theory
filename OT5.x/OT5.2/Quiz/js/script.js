/*
* The Internet History Quiz
* By Jordan Lewis
* © Jordan Lewis 2014
*/

jQuery(function ($) {
	// Set the questions
	var q0 = ["What did J.C.R Licklider write memos about in 1962.", "Lickin Lollipops concept", "Intergalactic Network Concept", "International Network Concept", "Internet Concept"];
	var q1 = ["What did DEV unveil in 1965", "PDF", "PFP-8", "PDP-8", "PDP-6"];
	var q2 = ["Which IBM system set the world wide standard 8bit byte? (Hint: Released in 1964)", "Personal Computer XT", "IBM Tower 1", "Thinkpad 64", "System 360"];
	var q3 = ["What does DARPANET stand for?", "Defence ARPA", "Defence Advanced Research Project Agency Network", "Double Advanced Research Project Agency Network", "Double ARPA"];
	var q4 = ["After how many attemps did the first host-to-host 'Log-In' take to finally work in 1969?", "2", "1", "4", "3"];
	var q5 = ["Who built the first high-speed 100 Kbps network interface between the MIT IMP and a PDP-6 to the ARPANET?", "ANS1", "ANS2", "ANS3", "ANS4"];
	var q6 = ["When did the @ become a worldwide standard for usernames and addresses?", "Early 1980", "Mid 1980", "Late 1980", "1980"];
	var q7 = ["Who first demonstrated networking via the ethernet cable? (Hint: It was in 1974)", "Cisco", "ARPANET", "DARPANET", "Xerox PARC"];
	var q8 = ["What was the issue with the internals of NASA's SPAN network and other networks?", "Not up to date software", "Outdated Computers", "Too Much Variety", "Required too much processing power"];
	var q9 = ["What computer did Steve Jobs and Steve Wozniak announc in 1977?", "AppleII", "AppleI", "Lisa", "Macintosh"];
	var allQs = [q0, q1, q2, q3, q4, q5, q6, q7, q8, q9];
	var answers = [2,3,4,2,1,2,3,4,3,1];
	
	// Assign Elements to Variables
	var question = $('#question');
	var answer1 = $('#answer1');
	var answer2 = $('#answer2');
	var answer3 = $('#answer3');
	var answer4 = $('#answer4');
	var scoreLabel = $('h3');
	var restartButton = $('.restart');
	
	// Other variables
	var score = 0;
	var numberOfQs = allQs.length;
	
	// Set the initial score
	scoreLabel.text('Score: '+score+'/'+numberOfQs);
	
	// Mix Up the Questions
	var reorderedQs = [];
	var reorderedAnswers = [];
	var count = allQs.length;
	for (var i = 0; i < count; i++) {
		var rand = Math.floor(Math.random() * allQs.length-1)+1;
		reorderedQs.push(allQs[rand]);
		reorderedAnswers.push(answers[rand]);
		allQs.splice(rand,1);
		answers.splice(rand,1);
	}	
	
	// Set the first question
	question.text(reorderedQs[0][0]);
	answer1.children('p').text(reorderedQs[0][1]);
	answer2.children('p').text(reorderedQs[0][2]);
	answer3.children('p').text(reorderedQs[0][3]);
	answer4.children('p').text(reorderedQs[0][4]);
	
	// Add click functions to buttons
	answer1.click(function () {
		answerTheQuestion(1);
	});
	answer2.click(function () {
		answerTheQuestion(2);
	});
	answer3.click(function () {
		answerTheQuestion(3);
	});
	answer4.click(function () {
		answerTheQuestion(4);
	});
	restartButton.click(function () {location.reload(true);});
	
	// Pretty Self Explanatory
	function answerTheQuestion (tag) {
		// Check the answer
		if (tag == reorderedAnswers[0]) {
			document.body.style.backgroundColor= '#00FF00';
			sleep(200, setBackgroundColorToWhite);
			//alert('Correct!');
			score += 1;
			scoreLabel.text('Score: '+score+'/'+numberOfQs);
		} else {
			document.body.style.backgroundColor= '#ff0000';
			sleep(100, setBackgroundColorToWhite);
			alert('Wrong! The answer was '+reorderedQs[0][reorderedAnswers[0]]);
		}
		
		// Show the next question
		if (reorderedQs.length != 1) { // If this question is the last
		// Remove the current question from arrays
		reorderedQs.shift();
		reorderedAnswers.shift();
		
		// Show the question
		question.text(reorderedQs[0][0]);
		answer1.children('p').text(reorderedQs[0][1]);
		answer2.children('p').text(reorderedQs[0][2]);
		answer3.children('p').text(reorderedQs[0][3]);
		answer4.children('p').text(reorderedQs[0][4]);
		} else {
			alert('Finished! Your Score was '+score+'/'+numberOfQs+' = '+((score/numberOfQs)*100)+'%.');
			location.reload(true);
		}
	}
	
	function setBackgroundColorToWhite () {
		document.body.style.backgroundColor="white";
	}
	
	function sleep(millis, callback) {
		setTimeout(function()
				{ callback(); }
		, millis);
	}	
});