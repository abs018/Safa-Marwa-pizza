/* ===================== STATIC DATA ===================== */
const CATEGORIES = [
  "All",
  "Regular Pizzas",
  "Special Pizzas",
  "Kabab & Boti",
  "Shawarma",
  "Paratha Roll"
];

const IMG = "";
const PLACEHOLDER_IMG = "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=800&auto=format&fit=crop&q=60";

const MENU = [
  // Regular Pizzas
  { id:"rp-1", category:"Regular Pizzas", nameEn:"Chicken Pizza", description:"Classic chicken pizza with mozzarella cheese", sizes:[{name:"Small",price:350},{name:"Medium",price:550},{name:"Large",price:899}], image: IMG+"Chicken.jpg" },
  { id:"rp-2", category:"Regular Pizzas", nameEn:"Fajita Pizza", description:"Spicy chicken fajita, onions, bell peppers, mozzarella", sizes:[{name:"Small",price:350},{name:"Medium",price:550},{name:"Large",price:899}], image: IMG+"fajita-pizza.jpg" },
  { id:"rp-3", category:"Regular Pizzas", nameEn:"Supreme Pizza", description:"Loaded with chicken, olives, mushrooms, and veggies", sizes:[{name:"Small",price:350},{name:"Medium",price:550},{name:"Large",price:899}], image: IMG+"supreem-pizza.jpg" },
  { id:"rp-4", category:"Regular Pizzas", nameEn:"BBQ Pizza", description:"BBQ chicken, onions, and smoky BBQ sauce", sizes:[{name:"Small",price:350},{name:"Medium",price:550},{name:"Large",price:899}], image: IMG+"BBQ-Pizza.jpg" },
  { id:"rp-5", category:"Regular Pizzas", nameEn:"Chicken Tikka Pizza", description:"Spicy chicken tikka chunks and rich tomato sauce", sizes:[{name:"Small",price:350},{name:"Medium",price:550},{name:"Large",price:899}], image: IMG+"chicken-tikka-pizza.jpg" },
  { id:"rp-6", category:"Regular Pizzas", nameEn:"Vegetable Pizza", description:"Fresh bell peppers, onions, olives, mushrooms, tomatoes", sizes:[{name:"Small",price:300},{name:"Medium",price:500},{name:"Large",price:850}], image: IMG+"Vegetable-Pizza.png" },

  // Special Pizzas
  { id:"sp-1", category:"Special Pizzas", nameEn:"Safa Marwa Special", nameUr:"صفا مروہ اسپیشل", description:"Our signature loaded pizza with extra cheese and meat", sizes:[{name:"Medium",price:950},{name:"Large",price:1500}], image: IMG+"Marwa-Pizza.jpg" },
  { id:"sp-2", category:"Special Pizzas", nameEn:"Lasagna Pizza", nameUr:"لازانیا پیزا", description:"Thick layers of cheese, meat, and lasagna sauce", sizes:[{name:"Medium",price:900},{name:"Large",price:1400}], image: IMG+"Lasagna-Pizza.jpg" },
  { id:"sp-3", category:"Special Pizzas", nameEn:"Crown Crust Pizza", nameUr:"کراؤن کرسٹ پیزا", description:"Cheese and meat filled crown-shaped crust", sizes:[{name:"Medium",price:900},{name:"Large",price:1400}], image: IMG+"Crown-Crust-Pizza.jpg" },
  { id:"sp-4", category:"Special Pizzas", nameEn:"Kabab Crust Pizza", nameUr:"کباب کرسٹ پیزا", description:"Delicious kabab stuffed in the pizza crust", sizes:[{name:"Small",price:500},{name:"Medium",price:900},{name:"Large",price:1400}], image: IMG+"Kabab-Crust-Pizza.jpg" },
  { id:"sp-5", category:"Special Pizzas", nameEn:"Bihari Kabab Pizza", nameUr:"بہاری کباب پیزا", description:"Spicy bihari kabab chunks on a cheesy base", sizes:[{name:"Small",price:500},{name:"Medium",price:700},{name:"Large",price:1200}], image: IMG+"Bihari-Kabab-Pizza.jpg" },

  // Kabab & Boti
  { id:"kb-1", category:"Kabab & Boti", nameEn:"Kabab Studded Roll", nameUr:"کباب اسٹوڈ / رول", description:"Juicy grilled kabab wrapped with sauces", sizes:[{name:"Medium",price:900},{name:"Large",price:1300}], image: IMG+"kabab-roll.jpg" },
  { id:"kb-2", category:"Kabab & Boti", nameEn:"Malai Boti", nameUr:"ملائی بوٹی", description:"Creamy, tender, melt-in-your-mouth chicken boti", sizes:[{name:"Small",price:450},{name:"Medium",price:650},{name:"Large",price:1000}], image: IMG+"Malai-boti.jpg" },
  { id:"kb-3", category:"Kabab & Boti", nameEn:"Cheesy Bites", nameUr:"چیزی بائٹس", description:"Crispy bites filled with melted cheese", sizes:[{name:"Small",price:500},{name:"Medium",price:700},{name:"Large",price:1100}], image: IMG+"Cheesy-bites.jpg" },

  // Shawarma
  { id:"sw-1", category:"Shawarma", nameEn:"Malai Boti Shawarma", description:"Creamy malai boti wrapped in soft pita bread", sizes:[], price:250, image: IMG+"Malai-Boti-Shawarma.jpg" },
  { id:"sw-2", category:"Shawarma", nameEn:"Cheese Shawarma", description:"Classic chicken shawarma loaded with cheese", sizes:[], price:350, image: IMG+"Cheese-Shawarma.jpg" },
  { id:"sw-3", category:"Shawarma", nameEn:"Platter Shawarma", description:"Open platter with chicken, pita, fries, and sauce", sizes:[], price:300, image: IMG+"Platter-Shawarma.jpg" },
  { id:"sw-4", category:"Shawarma", nameEn:"Chicken Shawarma", description:"Traditional roasted chicken shawarma", sizes:[], price:200, image: IMG+"Chicken-Shawarma.jpg" },

  // Paratha Roll
  { id:"pr-1", category:"Paratha Roll", nameEn:"Pizza Paratha Roll", description:"Crispy paratha filled with pizza toppings and cheese", sizes:[], price:350, image: IMG+"paratha-roll.jpg" },
  { id:"pr-2", category:"Paratha Roll", nameEn:"Cheese Paratha", description:"Hot crispy paratha stuffed with gooey cheese", sizes:[], price:350, image: IMG+"cheese-paratha.jpg" },
  { id:"pr-3", category:"Paratha Roll", nameEn:"Chicken Paratha", description:"Spicy chicken wrapped in a fresh flaky paratha", sizes:[], price:250, image: IMG+"chicken-paratha.jpg" },
  { id:"pr-4", category:"Paratha Roll", nameEn:"Malai Boti Paratha", nameUr:"ملائی بوٹی پراٹھا", description:"Creamy chicken boti in a crispy paratha", sizes:[], price:300, image: IMG+"Malai-Boti-Paratha.png" }
];

const DEALS = [
  { id:"deal-1", title:"Deal One", description:"3 Small Pizzas", price:999 },
  { id:"deal-2", title:"Deal Two", description:"2 Medium Pizzas", price:999 },
  { id:"deal-3", title:"Deal Three", description:"2 Large Pizzas", price:1699 }
];

const POPULAR_NAMES = ["Safa Marwa Special", "Fajita Pizza", "Kabab Studded Roll", "Malai Boti Shawarma"];

const REVIEWS = [
  { name:"Ali Raza", text:"Best pizza in Ghaseet Pura! The Safa Marwa Special is loaded and tastes incredible. Delivery was super fast.", rating:5 },
  { name:"Usman Tariq", text:"Their Malai Boti Shawarma is a lifesaver for late night cravings. Extremely creamy and flavorful.", rating:5 },
  { name:"Fatima Noor", text:"Tried the Paratha Roll and it was so crispy and cheesy. Excellent value for money with their deals.", rating:5 }
];

const FAQS = [
  { q:"What are your delivery hours?", a:"We are open and deliver every day from 12:00 PM (Noon) to 2:00 AM late night." },
  { q:"Where do you deliver?", a:"We primarily deliver in Ghaseet Pura and the immediate surrounding areas. If you are unsure if we deliver to your location, please contact us on WhatsApp." },
  { q:"How much is the delivery fee?", a:"We charge a flat delivery fee of Rs. 50 on all orders, regardless of the order size." },
  { q:"How long does delivery take?", a:"Our standard delivery time is 30 to 45 minutes. During peak hours or bad weather, it might take slightly longer, but we always strive to bring your food hot and fresh." },
  { q:"What payment methods do you accept?", a:"We currently accept Cash on Delivery (COD), Bank Transfer, JazzCash, and Easypaisa. You can select your preferred method during checkout." },
  { q:"How do I place an order?", a:"You can add items to your cart on this website and proceed to checkout. Once you fill in your details, you will be redirected to WhatsApp to send us the formatted order. This ensures direct communication and quick processing." },
  { q:"Do you offer deals for parties or large gatherings?", a:"Yes! While we have our standard Mega Deals on the website, you can contact us directly on WhatsApp to arrange custom packages and bulk discounts for your events." },
  { q:"Is your meat Halal?", a:"Yes, absolutely. All our meat and ingredients are 100% Halal and sourced from verified, trusted local suppliers." }
];

const WHATSAPP_NUMBER = "923073289332";
const DELIVERY_FEE = 50;
