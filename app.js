$(document).ready(function(){
	//constructor functions
	var state = {
		currentQuestion: 0,
		userPreferences: {}
	}

	function Question(type, text) {
		this.type = type; 
		this.text = text;
	}

	var questions = [
	new Question('strong', 'Do ye like yer drinks strong?'),
	new Question('salty', 'Do ye like it with a salty tang?'),
	new Question('bitter', 'Are ye a lubber who likes it bitter?'),
	new Question('sweet', 'Would ye like a bit of sweetness with yer poison?'),
	new Question('fruity', 'Are ye one for a fruity finish?'),
	]

	function Ingredient(type, ingredient){
		this.type = type;
		this.ingredient = ingredient;
	}

	var ingredients = [
	new Ingredient('strong', 'glug of rum'),
	new Ingredient('strong', 'slug of whisky'),
	new Ingredient('salty', 'olive on a stick'),
	new Ingredient('salty', 'salt-dusted rim'),
	new Ingredient('bitter', 'shake of bitters'),
	new Ingredient('bitter', 'glug of rum'),
	new Ingredient('sweet', 'sugar cube'),
	new Ingredient('sweet', 'spoonful of honey'),
	new Ingredient('fruity', 'slice of orange'),
	new Ingredient('fruity', 'dash of cassis'),	
	]

	//render 
	function startQuestions(state){
		$('h2').text(questions[state.currentQuestion].text);
	}

	function nextPage(state){
		state.currentQuestion += 1;
		$('h2').text(questions[state.currentQuestion].text);
	}

	function Bartender(){
		this.createDrink = function() {
			var userChoice;
			this.createDrink = [];
			for (userChoice in state.userPreferences) {
				if(state.userPreferences[userChoice]) {
					this.createDrink.push(ingredients.randomChoice(userChoice).ingredient)
				}
			};
		}
	}

	function randomChoice(){
	   	var newNumber = Math.floor((Math.random() * 3) + 0);
	   	return newNumber
	}

//listeners
startQuestions(state);
$('.answer-no').on('click', function(e){
	if (state.currentQuestion < questions.length) {
		nextPage(state);
	}
	else {
		Bartender.createDrink();
	}})

$('.answer-yes').on('click', function(e){
	e.preventDefault();

	if (state.currentQuestion < questions.length) {
		state.userPreferences += questions[state.currentQuestion].type; 
		nextPage(state);
	}
	else {
		Bartender.createDrink();
	}
})

});

