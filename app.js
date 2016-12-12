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
		constructor(ingredientsList){
			this.ingredients = {}; // want object like --> { type: 'salty', text: ['ing1','ing2','ing3'] }
			for (var i=0; i<ingredientsList.length; i++){
				var currentIngredient = ingredientsList[i];
				var currentIngredientType = currentIngredient.type;
				if (!this.ingredients[currentIngredientType]) { // updated from (ingredientsList[i].Ingredient.type)
					this.ingredients[currentIngredientType]=[];           // updated to have if(!) instead of if (true), else...
				}
				this.ingredients[currentIngredientType].push(currentIngredient);
			}
		}
	}

	class User {
		constructor(){
			this.preferences = [];
		}
		addPreferences(preference){
			this.preferences.push(preference)
		}
	}
	
	class Drink {
		constructor(){
			this.ingredients = [];
		}
		addIngredients(ingredient){
			this.ingredients.push(ingredient)
		}
	}

	class Bartender {
		constructor(){
		}
		createDrink(preferences){
			var randomNumber;
			var drinkOrder = new Drink();
			for (var j=0; j<preferences.length; j++){
				var userPreference = preferences[j];
				var ingredientsListByType = drinkPantry.ingredients[userPreference];
				var pickIngredient = ingredientsListByType[randomChoice(0, ingredientsListByType.length-1)];
				drinkOrder.addIngredients(pickIngredient);

			}
				console.log(drinkOrder);
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

	var drinkPantry = new Pantry(ingredients);


	// Logic
	function randomChoice(min, max) {
    	return Math.floor(Math.random() * (max - min + 1) + min);
	}	

	// Render
	function nextPage(state){
		$('h2').text(questions[state.currentQuestion].text);
	}

	function nextQuestion(state){
		state.currentQuestion += 1;
		nextPage(state);
	}

	function displayDrink(currentBartender){
		$('.new-drink').text(drinkOrder);  //error
		$('.bartender-questions').addClass('hidden');
	}

	// start the game
	nextPage(state);
	var currentUser = new User();
	var currentBartender = new Bartender();

	// listeners	
	$('.answer').on('click', function(e){
		e.preventDefault();

		if ($(this).attr('id') == "yes") {
			var currentType = questions[state.currentQuestion].type
			currentUser.addPreferences(currentType);
		}
		if (state.currentQuestion < questions.length-1) {
			nextQuestion(state);
		}
		else {
			currentBartender.createDrink(currentUser.preferences);
			displayDrink(currentBartender);
		}
	})

});