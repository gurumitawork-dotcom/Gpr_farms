export const PRICING: Record<string, Record<string, number>> = {
  "3kg": {
    Banganapalli: 599,
    Mallika: 649,
    Neelam: 549,
    Himayat: 899,
    Mixed: 799
  },
  "5kg": {
    Banganapalli: 899,
    Mallika: 949,
    Neelam: 849,
    Himayat: 1299,
    Mixed: 1199
  },
  "10kg": {
    Banganapalli: 1599,
    Mallika: 1699,
    Neelam: 1499,
    Himayat: 2199,
    Mixed: 1999
  }
};

export const WHATSAPP_NUMBER = "+919962115550";

export const COUNTDOWN_TARGET = new Date("2025-08-15T00:00:00+05:30");

export const VARIETIES = [
{
  id: "banganapalli",
  name: "Banganapalli",
  teluguName: "బంగినపల్లి",
  tamilName: "பங்கனப்பள்ளி",
  emoji: "🥭",
  tagline: "The King of Andhra",
  flavor: "Honey-sweet, fiberless, buttery texture with floral notes",
  season: "May – July",
  weight: "250–350g per fruit",
  color: "Golden yellow skin, saffron flesh",
  bestFor: "Eating fresh, milkshakes, desserts",
  image: "https://img.rocket.new/generatedImages/rocket_gen_img_143ab1661-1767949399905.png",
  imageAlt: "Golden Banganapalli mangoes in warm sunlight showing saffron flesh, harvested at peak ripeness on green leafy background",
  accentColor: "#FFB830",
  certifiedOrganic: true
},
{
  id: "mallika",
  name: "Mallika",
  teluguName: "మల్లిక",
  tamilName: "மல்லிகா",
  emoji: "🥭",
  tagline: "The Aromatic Wonder",
  flavor: "Rich, intensely sweet with a spicy-floral aroma",
  season: "June – August",
  weight: "300–450g per fruit",
  color: "Greenish-yellow skin, deep orange flesh",
  bestFor: "Juices, smoothies, direct eating",
  image: "https://img.rocket.new/generatedImages/rocket_gen_img_17eeca836-1772293705245.png",
  imageAlt: "Mallika mangoes with deep orange flesh showing rich color, placed on rustic wooden surface with tropical leaves",
  accentColor: "#F5A623",
  certifiedOrganic: true
},
{
  id: "neelam",
  name: "Neelam",
  teluguName: "నీలం",
  tamilName: "நீலம்",
  emoji: "🥭",
  tagline: "The Late Season Gem",
  flavor: "Tangy-sweet balance, fibrous, with a distinctive spicy kick",
  season: "July – September",
  weight: "150–250g per fruit",
  color: "Green-orange skin, yellow-orange flesh",
  bestFor: "Pickles, chutneys, eating fresh",
  image: "https://img.rocket.new/generatedImages/rocket_gen_img_1f49e4a42-1775403455641.png",
  imageAlt: "Neelam mangoes in green-orange hue clustered on tree branch with dappled sunlight filtering through leaves",
  accentColor: "#3A8C60",
  certifiedOrganic: false
},
{
  id: "himayat",
  name: "Himayat",
  teluguName: "హిమాయత్",
  tamilName: "ஹிமாயத்",
  emoji: "🥭",
  tagline: "The Royal Variety",
  flavor: "Exceptionally sweet, creamy, zero fiber, melts in the mouth",
  season: "May – June",
  weight: "400–600g per fruit",
  color: "Light green skin, pale yellow flesh",
  bestFor: "Premium gifting, direct eating, milkshakes",
  image: "https://img.rocket.new/generatedImages/rocket_gen_img_1197c6c7b-1779448386681.png",
  imageAlt: "Large Himayat mangoes with pale green skin arranged on dark cloth, conveying premium royal quality and generous size",
  accentColor: "#D4500A",
  certifiedOrganic: true
}];


export const TESTIMONIALS = [
{
  id: 1,
  name: "Priya Venkataraman",
  city: "Bengaluru",
  variety: "Banganapalli – 5kg",
  quote: "I've been ordering from GPR Farms for 3 seasons now. The Banganapalli this year was the best I've ever had — zero fibre, pure honey. My kids finished the entire box in two days.",
  rating: 5,
  image: "https://img.rocket.new/generatedImages/rocket_gen_img_1e749cb6e-1778301374725.png",
  imageAlt: "South Indian woman smiling warmly, Priya Venkataraman from Bengaluru"
},
{
  id: 2,
  name: "Karthik Subramanian",
  city: "Chennai",
  variety: "Himayat – 10kg",
  quote: "Ordered the 10kg Himayat box for my parents. They called me immediately saying these are the real Himayat they remember from childhood. Not the carbide nonsense from the market.",
  rating: 5,
  image: "https://img.rocket.new/generatedImages/rocket_gen_img_1455ad4cd-1772150489647.png",
  imageAlt: "Tamil man in his 30s, Karthik Subramanian from Chennai, smiling confidently"
},
{
  id: 3,
  name: "Ananya Reddy",
  city: "Hyderabad",
  variety: "Mixed Box – 5kg",
  quote: "The mixed box is genius. Got to try all four varieties and now I know exactly which one I love (Mallika, always Mallika). The packaging was impeccable — not a single bruise.",
  rating: 5,
  image: "https://img.rocket.new/generatedImages/rocket_gen_img_14b3a32aa-1772054739413.png",
  imageAlt: "Telugu woman from Hyderabad, Ananya Reddy, bright smile, modern professional setting"
},
{
  id: 4,
  name: "Rajan Pillai",
  city: "Mumbai",
  variety: "Banganapalli – 3kg",
  quote: "Delivered to Mumbai in 18 hours. Still perfectly firm, ripened beautifully on the counter in two days. This is what farm-to-door actually means.",
  rating: 5,
  image: "https://img.rocket.new/generatedImages/rocket_gen_img_12b9c2bb3-1763293370864.png",
  imageAlt: "Malayali man from Mumbai, Rajan Pillai, relaxed professional headshot"
}];


export const FAQ_ITEMS = [
{
  id: 1,
  question: "Are your mangoes actually carbide-free?",
  answer: "Yes, 100%. We never use calcium carbide or ethephon to ripen our mangoes. Every fruit is tree-ripened on our farm in Krishnampalem, Andhra Pradesh. We harvest only when the fruit naturally begins to detach from the tree. You can taste the difference — there's no chemical aftertaste, just pure sweetness."
},
{
  id: 2,
  question: "How are the mangoes delivered across India?",
  answer: "We harvest your order in the early morning, pack it in our proprietary ventilated wooden-fibre boxes with cushioned separators, and hand it to our cold-chain courier partner by noon. Most metro cities receive delivery within 18-24 hours. Non-metro cities within 36-48 hours. We ship Monday to Friday to avoid weekend delays."
},
{
  id: 3,
  question: "The mangoes arrived slightly firm. Is that normal?",
  answer: "Absolutely normal and actually ideal! We ship at the 'break of ripeness' stage so they survive transit. Simply leave them at room temperature for 1-2 days. Do NOT refrigerate until fully ripe. Once they yield slightly to gentle pressure and the aroma intensifies, they're ready. This is exactly how tree-ripened mangoes behave."
},
{
  id: 4,
  question: "Can I choose specific varieties for my order?",
  answer: "Yes. On the order page, select your preferred variety (Banganapalli, Mallika, Neelam, or Himayat) and box size (3kg, 5kg, or 10kg). The Mixed Box includes a curated selection of 2-3 varieties based on what's at peak ripeness that week — we choose the best, not the most."
},
{
  id: 5,
  question: "Do you offer bulk or corporate orders?",
  answer: "Yes! We offer bulk orders starting from 50kg for corporate gifting, employee wellness programs, and festive hampers. Custom branded packaging is available for orders above 100kg. Visit our Corporate Gifting page or WhatsApp us directly at +91 99621 15550."
}];


export const STATS = [
{ value: "10+", label: "Acres of Mango Orchards", icon: "🌿" },
{ value: "3", label: "Generations of Farming", icon: "👨‍🌾" },
{ value: "10K+", label: "Happy Families Served", icon: "🏠" },
{ value: "24hr", label: "Farm to Your Door", icon: "🚚" }];


export const NAV_LINKS = [
{ label: "Home", href: "/" },
{ label: "Varieties", href: "/varieties" },
{ label: "Order", href: "/order" }];