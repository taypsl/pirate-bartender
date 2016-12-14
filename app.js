$(document).ready(function(){
	"use strict";

	//state variable
	var state = {
		currentQuestion: 0,
	}

	var nouns = ['Chinchilla', 'Sea-Dog', 'Seaweed', 'Island', 'Cannon', 'Crow', 'Cutlass', 'Dagger', 'Gibbet', 'Hook', 'Keel', 'Scar', 'Sword', 'Tides', 'Parrot'];
	var adjectives = ['Fluffy', 'Salty', 'Swashbuckling', 'Old', 'Lawless', 'Vengeful', 'Ruthless', 'Scurvy', 'Violent', 'Drunken'];


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
				if (!this.ingredients[currentIngredientType]) { 
					this.ingredients[currentIngredientType]=[];          
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
			this.name = adjectives[randomChoice(0, adjectives.length-1)] + ' ' + nouns[randomChoice(0, nouns.length-1)];
		}
		addIngredients(ingredient){
			this.ingredients.push(ingredient)
		}
		getDrinkIngredients(){
			var drinkIngredients = this.ingredients.reduce(function(a, b) {
 				return a + '<li>' + b.ingredient + '</li>';
			}, '<ul>');
			return drinkIngredients + '</ul>'
		}
	}

	class Bartender {
		constructor(){
		}
		createDrink(preferences){
			var drinkOrder = new Drink();
			for (var j=0; j<preferences.length; j++){
				var userPreference = preferences[j];
				var ingredientsListByType = drinkPantry.ingredients[userPreference];
				var pickIngredient = ingredientsListByType[randomChoice(0, ingredientsListByType.length-1)];
				drinkOrder.addIngredients(pickIngredient);
			}
			return drinkOrder;
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

	function displayDrink(drink){
		$('#drink-name').html(drink.name);
		$('#drink-ingredients').html(drink.getDrinkIngredients()); 
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
			var drinkOrder = currentBartender.createDrink(currentUser.preferences);
			displayDrink(drinkOrder);
			$('.new-drink').removeClass('hidden');
			$('.bartender').addClass('bartender-2');
			$('.scroll').addClass('scroll-2');
		}
	})

});