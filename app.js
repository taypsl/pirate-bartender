
var ingredients = {
	strong: ['glug of rum','slug of whisky', 'splash of gin'],
	salty: ['olive on a stick', 'salt-dusted rim', 'rasher of bacon'],
	bitter: ['shake of bitters', 'splash of tonic', 'twist of lemon peel']
	sweet: ['sugar cube', 'spoonful of honey', 'splash of cola']
	fruity: ['slice of orange', 'dash of cassis', 'cherry on top']
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

function Ingredient(type, ingredient) = {
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





