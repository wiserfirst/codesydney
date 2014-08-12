
jQuery(function($) {

  var clear = function() {
    $('div#content').empty();
  };

  var homeClick = function() {
    clear();
    $('div#content').append('<h1>Wonder Chinese Cuisine</h1>');
    $('div#content').append('<img src="http://inkchromatography.files.wordpress.com/2012/05/chinese-food.jpg"></img>');
    $('div#content').append("<p>This is the best Chinese restaurant you can possibly find in Sydney! Come here and try some of our spectacular dishes. You'd be surprised by the taste and our service!</p>");
  };

  $('ul li a#home').click(homeClick);

  $('ul li a#menu').click(function() {
    clear();
    $('div#content').append('<h1>Our Menu</h1>');
    $('div#content').append('<img src="http://www.goldenchinaleesburg.com/uploads/Image/buffet4.jpg"></img>');
    $('div#content').append("<p>Hot & Sour Soup. Egg Drop Soup. Crispy Spring Roll. Fried Chicken Wing. Fried Meat Dumplings. Crab Rangoon. Chicken Teriyaki. French Fries. Steamed Shrimp with Cocktail Sauce Sauteed String Bean.Seafood Medley.Beef with Broccoli.General Tso's Chicken.Diced Chicken with Plum Sauce. Chicken with Bean Sprout.Beancurd with Mixed Veggie. Sesame Fish Fillet. Beef with Black Pepper Sauce. Chinese Mixed Veggie. Chicken with Pineapple.Chinese Meatballs. Shrimp with Salt & Pepper. Eggplant in Garlic Sauce. Sauteed Mushrooms in Brown Sauce.Calamari with Basil. Sesame Chicken. Veggie Egg Foo Young. Steamed Rice. Veggie Fried Rice. Veggie LoMein. Singapore Rice Noodle.  Assorted Fruits, Cakes and Dessert.</p>");
  });

  $('ul li a#contact').click(function() {
    clear();
    $('div#content').append('<h1>Contact</h1>');
    $('div#content').append('<img src="http://media-cache-ec0.pinimg.com/736x/43/23/a9/4323a991acb7b7d256ec44283421688c.jpg"></img>');
    $('div#content').append("<p><strong>Wonder Chinese Cuisine<strong> <br> 1039 Edwards Ferry Rd. NE<br> Battlefield Shopping Center<br> Leesburg, Va 20176<br> 703-779-0998</p>");
  });

  homeClick();
});
