$(document).ready(function(){
	"use strict";

	//state variable
	var state = {
		currentQuestion: 0,
	}

	//constructor objects
	class Question {
		constructor(type, text){
			this.type = type; 
			this.text = text; 
		}
	}

	class Ingredient {
		constructor(type, ingredient){
			this.type = type;
			this.ingredient = ingredient; 
		}
	}

	class Pantry {
		constructor(ingredients){
			this.ingredients = ingredients;
		}
	}

	class UserPreference {
		constructor(type){
			this.type = type;
		}
	}

	class Bartender {
		constructor(userPreferences){
			this.createDrink = function(){
				var userChoice;
				this.newDrink = [];
				for (userChoice in userPreferences) {
					if(userPreferences[userChoice]) {
						this.newDrink.push(ingredients.randomChoice(userChoice).ingredient)
					}
				};
			}
		}
	}

	var ingredients = [
		new Ingredient('strong', 'glug of rum'),
		new Ingredient('strong', 'slug of whisky'),
		new Ingredient('strong', 'splash of gin'),
		new Ingredient('salty', 'olive on a stick'),
		new Ingredient('salty', 'salt-dusted rim'),
		new Ingredient('salty', 'rasher of bacon'),
		new Ingredient('bitter', 'shake of bitters'),
		new Ingredient('bitter', 'splash of tonic'),
		new Ingredient('bitter', 'twist of lemon peel'),
		new Ingredient('sweet', 'sugar cube'),
		new Ingredient('sweet', 'splash of cola'),
		new Ingredient('sweet', 'spoonful of honey'),
		new Ingredient('fruity', 'slice of orange'),
		new Ingredient('fruity', 'dash of cassis'),	
		new Ingredient('fruity', 'cherry on top'),	
	];

	var questions = [
		new Question('strong', 'Do ye like yer drinks strong?'),
		new Question('salty', 'Do ye like it with a salty tang?'),
		new Question('bitter', 'Are ye a lubber who likes it bitter?'),
		new Question('sweet', 'Would ye like a bit of sweetness with yer poison?'),
		new Question('fruity', 'Are ye one for a fruity finish?'),
	];

	// Logic
	function randomChoice(min, max) {
    	return Math.floor(Math.random() * (max - min + 1) + min);
	}	

	// Render
	function startQuestions(state){
		$('h2').text(questions[state.currentQuestion].text);
	}

	function nextPage(state){
		state.currentQuestion += 1;
		$('h2').text(questions[state.currentQuestion].text);
	}


	// listeners	
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
			var currentType = questions[state.currentQuestion].type
			//var new UserPreference(currentType);
			//userPreferences.push(currentType); 
			nextPage(state);
		}
		else {
			Bartender.createDrink();
		}
		console.log(ingredients);
		console.log(questions);
	})

});