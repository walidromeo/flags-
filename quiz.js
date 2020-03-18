/*  
	the capitals quizz
	Design and Code by Walid BENNANI
	facebook.com/Walid bennani
	*/
// JavaScript Document
$(document).ready(function(){
    "use strict";
	$("#game").hide();
	$("#end").hide();
	$("#home").show();
	var countries=["Which The Country?","Which The Country?","Which The Country?","Which The Country?","Which The Country?","Which The Country?","Which The Country?","Which The Country?","Which The Country?","Which The Country?","Which The Country?","Which The Country?","Which The Country?","Which The Country?"];
	var capitals=["ALGERIE","MOROCCO","CUBA","COLOMBIA","USA","SLOVAKIA","PERU","INDE","GABON","CHINA","UNITED KINGDOM","SENEGAL","BENIN","COMOROS"];
	var flags=["logo/algerie.jpg","logo/morocco.jpg","logo/cuba.jpg","logo/colombia.jpg","logo/usa.jpg","logo/slovakia.jpg","logo/peru.jpg","logo/inde.jpg","logo/gabon.jpg","logo/china.jpg","logo/british.jpg","logo/senegal.jpg","logo1/benin.png","logo1/Comros.png"];
	var theLetterWanted=-1;
	var remainingButtons=0;
	var alreadyPlayed=[];
	var theAnswerDivided=[];
	var randomNumberMainOption;
	var theAnswerLength;
	var theAnswer;
	var slicer;
	var splitersHolder=[];
	var nextAppend;
	var counter=1;
	var howmanyButtons=16;
	var playedAlreadies=0;
	var rights=0;
	var wrongs=0;
	var passes=0;
	var seconds=0;
	var miliseconds=0;
	var mistake=[];
	var correct=[];
	var interv=1;
	var limit=180;
	var accuracy=0;
	function resetall(){
		theLetterWanted=-1;
		remainingButtons=0;
		theAnswerDivided=[];
		splitersHolder=[];
		counter=0;
	}
	function resetEverything(){
		$("#end").hide();
		$("#game").hide();
		$("#home").show();
		$("#fautes").empty();
		$("#justes").empty();
		resetall();
		playedAlreadies=0;
		rights=0;
		wrongs=0;
		passes=0;
		seconds=0;
		miliseconds=0;
		mistake=[];
	    correct=[];
		accuracy=0;
	}
	function generateNumber(){
			randomNumberMainOption=Math.floor(Math.random()*countries.length);
			var checkAvailability=alreadyPlayed.indexOf(randomNumberMainOption);
			if(checkAvailability===-1){
					alreadyPlayed.push(randomNumberMainOption);
					//console.log(randomNumberMainOption);
					
				}
			else{
					randomNumberMainOption=Math.floor(Math.random()*countries.length);
					console.log(randomNumberMainOption);
				}
			
			//console.log("array : "+alreadyPlayed+" the number : "+randomNumberMainOption);
		}//generate random Number and check if not used already
	function getTheAnswerAndBreakIt(){
		//console.log(randomNumberMainOption);
			theAnswer=capitals[randomNumberMainOption];
			theAnswerLength=theAnswer.length;
			for(var i=0;i<theAnswerLength;i++){
					slicer=theAnswer.slice(i,i+1);
					theAnswerDivided.push(slicer);
				}
			console.log("the Answer : "+theAnswer);
			$(".theCountry").text(countries[randomNumberMainOption]);
		}//get answer and break it;
	function changeImage(){
			$("img").attr("src",flags[randomNumberMainOption]);
		}
		function distributeLetters(){
			for(var k=0;k<1000;k++){
				
				var randomNumberToSplitLetters=Math.floor(Math.random()*howmanyButtons);
				var splitersAvailabilityChecker=splitersHolder.indexOf(randomNumberToSplitLetters);
					if(splitersAvailabilityChecker===-1){
							theLetterWanted++;
							splitersHolder.push(randomNumberToSplitLetters);
							//console.log("randoms : "+splitersHolder+" k : "+k+" the letter : "+theLetterWanted);
							$("."+randomNumberToSplitLetters+"").text(theAnswerDivided[theLetterWanted]);
								if(splitersHolder.length>=theAnswerDivided.length){break;}
					}
					else{
							randomNumberToSplitLetters=Math.floor(Math.random()*theAnswerDivided.length);
					}
			}//for
		}//distribute letters on buttons , the right ones
		
	var letters=["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"];
	
	function fillTheRemainingButtons(){
		for(var x=0;x<1000;x++){
				var randomLetterSelecter=Math.floor(Math.random()*letters.length);
				var randomOtherButtonsSelector=Math.floor(Math.random()*howmanyButtons);
				var indexOfOtherRandom=splitersHolder.indexOf(randomOtherButtonsSelector);
					if(indexOfOtherRandom===-1){
							splitersHolder.push(randomOtherButtonsSelector);
							remainingButtons++;
							$("."+randomOtherButtonsSelector+"").text(letters[randomLetterSelecter]);
							/*console.log("buttons : "+howmanyButtons);
							console.log(" filled already : "+splitersHolder.length+"counter : "+remainingButtons);*/
							//console.log("the random : "+randomOtherButtonsSelector);
								if(remainingButtons>howmanyButtons-theLetterWanted){break;}
						}
					else{
							randomOtherButtonsSelector=Math.floor(Math.random()*howmanyButtons);
						}
			}//for
		}//fill the remaining buttons
	function genButtons(){
		for(var k=0;k<howmanyButtons;k++){
			$("#butttholder").append("<div class='"+k+" button'></div>");
			}
	}//generate buttons
	function genPs(){
		for(var i=0;i<theAnswerDivided.length;i++){
			$("#ppholder").append("<div id='"+i+"' class='p'></div>");
			}
		//console.log(theAnswerDivided.length);
	}//generate paragraphs that'll hold the letters
	
	
	function checkNextAppend(){
		for(var j=0;j<theAnswerDivided.length;j++){
			var text=$("#"+j+"").text();
			if(!text){
				nextAppend=j;
				//console.log("next append : "+nextAppend);
				break;
				}//if
			else{
				nextAppend=-1;
			    }//else
			}//for
		}//check next append
	$("#butttholder").on("click", ".button", function(){
		checkNextAppend();
		if(nextAppend>-1){
			var texts = $(this).text();
            $("#"+nextAppend+"").text(texts);
		    $(this).remove();
			counter++;
			checkIfWin();
		}//if still places
		//console.log(counter);
	});//on cilick button
	function checkIfWin(){
		$("h6").text("");
		for(var d=0;d<theAnswerDivided.length;d++){
			$("h6").append($("#"+d+"").text());
		}//for
		if(counter>=theAnswerLength){
				playedAlreadies++;
				if($("h6").text()===theAnswer){
					game();
					rights++;
					correct.push(randomNumberMainOption);
				}//if win
				else{
					game();
					wrongs++;
					mistake.push(randomNumberMainOption);
				}///else lose
			}//if all filed
			//console.log("counter : "+counter+" answer length : "+theAnswerLength);
	}//check if win
	$("#pass").click(function() {
        playedAlreadies++;
		passes++;
		mistake.push(randomNumberMainOption);
		game();
    });
	$("#ppholder").on("click", ".p",function() {
			var textOfP = $(this).text();
			if(textOfP){
				counter+=-1;
				$("#butttholder").append("<div class='button'>"+$(this).text()+"</div>");
			}
			//console.log(counter);
			$(this).text("");
    });//on click p
	$(".start").click(function() {
		$("#home").hide();
		$("#game").show();
		$("#end").hide();
        game();
		Timer();
    });//start the game
	function Timer(){
			var gameTime=setInterval(function(){
				miliseconds++;
				if(miliseconds>=10){
					miliseconds=0;
					seconds++;
				}
				$("#time").text("time left : "+(180-seconds));
				
				//console.log("seconds : "+seconds+" interv : "+interv);
				if(seconds>=limit){
					clearInterval(gameTime);
					endGame();
					}
			},100*interv);//set interval
	}//timer
	$("#startagain").click(function() {
        resetEverything();
    });
	function game(){
		$("#butttholder").empty();
		$("#ppholder").empty();
		resetall();
		genButtons();
		generateNumber();
		getTheAnswerAndBreakIt();
		distributeLetters();
		fillTheRemainingButtons();
		changeImage();
		genPs();
	}//function game
	function endGame(){
			$("#game").hide();
			$("#home").hide();
			$("#end").show();
			$("#wrong").text("wrong : "+wrongs);
			$("#correct").text("correct : "+rights);
			accuracy=(100*(rights-wrongs))/(playedAlreadies);
			if(accuracy<0){
				accuracy=0;
			}
			$("#accuracy").text("accuracy : "+accuracy+"%");
			for(var f=0;f<mistake.length;f++){
				var lesFautes=mistake[f];
				$("#fautes").append(countries[lesFautes]+" : "+capitals[lesFautes]+"<br>");
			}//write the mistakes
			
			
			/*for(var r=0;r<correct.length;r++){
				var lesJustes=correct[r];
				$("#justes").append(countries[lesJustes]+" : "+capitals[lesJustes]+"<br>");
			}*///write the rights
			//console.log(miliseconds);
	}//endgame funciotn
		
});
