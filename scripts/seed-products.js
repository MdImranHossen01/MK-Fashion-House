const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');

// Read .env.local file to get MONGODB_URI
const envPath = path.join(__dirname, '../.env.local');
let mongodbUri = '';

if (fs.existsSync(envPath)) {
  const envContent = fs.readFileSync(envPath, 'utf8');
  const match = envContent.match(/^MONGODB_URI=(.*)$/m);
  if (match && match[1]) {
    mongodbUri = match[1].trim().replace(/['"]/g, '');
  }
}

if (!mongodbUri) {
  mongodbUri = 'mongodb+srv://MKFashionHouse:06WPyrgDJoHcQc0h@cluster0.e5n1hnl.mongodb.net/MKFashionHouse';
}

console.log('Connecting to MongoDB...');

const CategorySchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    slug: { type: String },
    image: { type: String },
    parentCategory: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', default: null },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

const Category = mongoose.models.Category || mongoose.model('Category', CategorySchema);

const ProductSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    description: { type: String, required: true },
    price: { type: Number, required: true, min: [0, 'Price cannot be negative'] },
    salePrice: { type: Number, min: [0, 'Sale price cannot be negative'] },
    purchasePrice: { type: Number, min: [0, 'Purchase price cannot be negative'] },
    discountRate: { type: Number },
    sku: { type: String, required: true, unique: true },
    stock: { type: Number, required: true, default: 0, min: [0, 'Stock cannot be negative'] },
    categories: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Category' }],
    tags: [{ type: String }],
    images: [{ type: String }],
    attributes: [
      {
        key: { type: String },
        value: { type: String },
      },
    ],
    variants: [
      {
        color: { type: String },
        size: { type: String },
        price: { type: Number, required: true },
        salePrice: { type: Number },
        purchasePrice: { type: Number },
        discountRate: { type: Number },
        stock: { type: Number, required: true, default: 0 },
        sku: { type: String },
        image: { type: String },
      },
    ],
    isFeatured: { type: Boolean, default: false },
    isNewArrival: { type: Boolean, default: false },
    isFlashSale: { type: Boolean, default: false },
    isPublished: { type: Boolean, default: true },
    ratings: { type: Number, default: 0 },
    numReviews: { type: Number, default: 0 },
    views: { type: Number, default: 0 },
    totalSales: { type: Number, default: 0 },
  },
  { timestamps: true }
);

const Product = mongoose.models.Product || mongoose.model('Product', ProductSchema);

function slugify(text) {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

const categoriesData = [
  { name: "Men's Wear", image: "/assets/images/products/mens.webp" },
  { name: "Women's Wear", image: "/assets/images/products/womens_dress.webp" },
  { name: "Footwear", image: "/assets/images/products/footwear.webp" },
  { name: "Bags & Backpacks", image: "/assets/images/products/bags.webp" },
  { name: "Watches", image: "/assets/images/products/watches.webp" },
  { name: "Jewelry", image: "/assets/images/products/accessories.webp" },
  { name: "Accessories", image: "/assets/images/products/accessories.webp" },
  { name: "Home & Living", image: "/assets/images/products/home.webp" },
  { name: "Baby & Kids", image: "/assets/images/products/baby_knit_blanket_1777999661726.webp" }
];

const productsTemplate = [
  // 1. Men's Wear (Cat Index 0)
  {
    name: "Essential Cotton Crewneck Tee",
    price: 1200,
    salePrice: 990,
    purchasePrice: 600,
    description: "Made from premium long-staple cotton, this classic crewneck tee offers unmatched comfort and durability. Featuring a tailored fit and breathable weave, it's the perfect everyday essential.",
    sku: "MK-MEN-TEE-001",
    stock: 50,
    tags: ["tshirt", "cotton", "casual", "men"],
    images: [
      "/assets/images/products/essential-cotton-crewneck-tee-1.webp",
      "/assets/images/products/essential-cotton-crewneck-tee-2.webp"
    ],
    catIndex: 0
  },
  {
    name: "Heritage Selvedge Denim Jeans",
    price: 3500,
    salePrice: 2990,
    purchasePrice: 1800,
    description: "Crafted on vintage shuttle looms, these premium selvedge denim jeans feature a slim-straight fit. Over time, they break in uniquely to your body shape for a custom look.",
    sku: "MK-MEN-JNS-002",
    stock: 35,
    tags: ["jeans", "denim", "heritage", "men"],
    images: [
      "/assets/images/products/heritage-selvedge-denim-jeans-2.webp",
      "/assets/images/products/heritage-selvedge-denim-jeans-3.webp"
    ],
    catIndex: 0
  },
  {
    name: "Premium Linen Summer Blazer",
    price: 6500,
    salePrice: 5500,
    purchasePrice: 3200,
    description: "Perfect for warm-weather sophistication, this lightweight blazer is tailored from pure organic linen. Features unstructured shoulders for an elegant, relaxed drape.",
    sku: "MK-MEN-BLZ-003",
    stock: 20,
    tags: ["blazer", "linen", "summer", "men"],
    images: [
      "/assets/images/products/premium-linen-summer-blazer-1.webp",
      "/assets/images/products/premium-linen-summer-blazer-2.webp"
    ],
    catIndex: 0
  },
  {
    name: "Signature Oxford Slim Fit Shirt",
    price: 2200,
    salePrice: 1850,
    purchasePrice: 1100,
    description: "A timeless wardrobe staple. Tailored from substantial Oxford cotton fabric, this shirt features a smart button-down collar and a modern slim-fit silhouette.",
    sku: "MK-MEN-SHR-004",
    stock: 45,
    tags: ["shirt", "oxford", "slimfit", "men"],
    images: [
      "/assets/images/products/signature-oxford-slim-fit-shirt-1.webp",
      "/assets/images/products/signature-oxford-slim-fit-shirt-2.webp"
    ],
    catIndex: 0
  },
  {
    name: "Technical Waterproof Parka",
    price: 8500,
    salePrice: 7500,
    purchasePrice: 4200,
    description: "Designed to tackle the elements, this high-performance parka is fully waterproof, windproof, and breathable. Built with sealed seams and multiple utilitarian pockets.",
    sku: "MK-MEN-PRK-005",
    stock: 15,
    tags: ["parka", "waterproof", "outerwear", "men"],
    images: [
      "/assets/images/products/technical-waterproof-parka-1.webp",
      "/assets/images/products/technical-waterproof-parka-2.webp"
    ],
    catIndex: 0
  },

  // 2. Women's Wear (Cat Index 1)
  {
    name: "Floral Silk Wrap Dress",
    price: 4800,
    salePrice: 4200,
    purchasePrice: 2200,
    description: "Flowing beautifully with every step, this wrap dress is made from exquisite mulberry silk. Adorned with a delicate hand-painted floral pattern and adjustable tie waist.",
    sku: "MK-WOM-DRS-001",
    stock: 30,
    tags: ["dress", "silk", "floral", "women"],
    images: [
      "/assets/images/products/floral-silk-wrap-dress-1.webp",
      "/assets/images/products/floral-silk-wrap-dress-2.webp"
    ],
    catIndex: 1
  },
  {
    name: "High-Waisted Pleated Trousers",
    price: 2800,
    salePrice: 2400,
    purchasePrice: 1300,
    description: "Elegant trousers featuring an ultra-flattering high-rise waist and crisp front pleats. Crafted from a soft, fluid twill fabric that offers comfortable all-day wear.",
    sku: "MK-WOM-TRS-002",
    stock: 40,
    tags: ["trousers", "pleated", "formal", "women"],
    images: [
      "/assets/images/products/high-waisted-pleated-trousers-1.webp",
      "/assets/images/products/high-waisted-pleated-trousers-2.webp"
    ],
    catIndex: 1
  },
  {
    name: "Oversized Cashmere Cardigan",
    price: 7200,
    salePrice: 5990,
    purchasePrice: 3500,
    description: "Knit from ultra-soft Mongolian cashmere, this oversized cardigan features dropped shoulders and a warm ribbed hem. Ultimate luxury for cozy layering.",
    sku: "MK-WOM-CRD-003",
    stock: 25,
    tags: ["cardigan", "cashmere", "sweater", "women"],
    images: [
      "/assets/images/products/oversized-cashmere-cardigan-1.webp",
      "/assets/images/products/oversized-cashmere-cardigan-2.webp"
    ],
    catIndex: 1
  },
  {
    name: "Sculpting Yoga Leggings",
    price: 2400,
    salePrice: 1990,
    purchasePrice: 950,
    description: "Engineered with four-way stretch, moisture-wicking technology, and lightweight compressive support. High-rise waistband offers full coverage and stays in place.",
    sku: "MK-WOM-LGG-004",
    stock: 60,
    tags: ["leggings", "yoga", "activewear", "women"],
    images: [
      "/assets/images/products/sculpting-yoga-leggings-1.webp",
      "/assets/images/products/sculpting-yoga-leggings-2.webp"
    ],
    catIndex: 1
  },
  {
    name: "Lightweight Merino Wool Sweater",
    price: 3800,
    salePrice: 3200,
    purchasePrice: 1800,
    description: "Expertly crafted from fine Merino wool, this lightweight sweater is naturally temperature-regulating and features an elegant crewneck silhouette.",
    sku: "MK-WOM-SWT-005",
    stock: 35,
    tags: ["sweater", "merinowool", "knitwear", "women"],
    images: [
      "/assets/images/products/lightweight-merino-wool-sweater-1.webp",
      "/assets/images/products/lightweight-merino-wool-sweater-2.webp"
    ],
    catIndex: 1
  },

  // 3. Footwear (Cat Index 2)
  {
    name: "Performance Mesh Running Shoes",
    price: 5500,
    salePrice: 4800,
    purchasePrice: 2600,
    description: "Features an engineered mesh upper for maximum breathability and a high-rebound cushioned midsole. Perfect for marathon runners and fitness enthusiasts.",
    sku: "MK-SHOE-RUN-001",
    stock: 40,
    tags: ["running", "sports", "shoes", "footwear"],
    images: [
      "/assets/images/products/performance-mesh-running-shoes-1.webp",
      "/assets/images/products/performance-mesh-running-shoes-2.webp"
    ],
    catIndex: 2
  },
  {
    name: "Urban Velocity Sneakers",
    price: 4200,
    salePrice: 3500,
    purchasePrice: 2000,
    description: "Retro-inspired lifestyle sneakers designed for street style. Features durable canvas panels, premium suede accents, and a vulcanized natural rubber sole.",
    sku: "MK-SHOE-LFS-002",
    stock: 50,
    tags: ["sneakers", "lifestyle", "streetwear", "footwear"],
    images: ["/assets/images/products/sneakers.webp"],
    catIndex: 2
  },
  {
    name: "CloudWalk Elite Performance",
    price: 6800,
    salePrice: 5900,
    purchasePrice: 3300,
    description: "Engineered with proprietary responsive cushioning that returns energy with every stride. Breathable knit design keeps feet fresh all day long.",
    sku: "MK-SHOE-CLD-003",
    stock: 30,
    tags: ["cloudwalk", "cushion", "performance", "footwear"],
    images: ["/assets/images/products/footwear.webp"],
    catIndex: 2
  },
  {
    name: "Apex Runner Gen-3",
    price: 7500,
    salePrice: 6500,
    purchasePrice: 3800,
    description: "Top-tier athletic shoes incorporating carbon fiber plates and featherweight foams to maximize speed and efficiency on long distance runs.",
    sku: "MK-SHOE-APX-004",
    stock: 20,
    tags: ["apex", "runner", "speed", "footwear"],
    images: ["/assets/images/products/performance-mesh-running-shoes-2.webp"],
    catIndex: 2
  },
  {
    name: "Zen-Flow Lifestyle Shoes",
    price: 3800,
    salePrice: 3200,
    purchasePrice: 1800,
    description: "Comfort-first slip-on style shoes crafted from recycled fibers. Ideal for low-impact workouts, yoga sessions, and casual afternoon strolls.",
    sku: "MK-SHOE-ZEN-005",
    stock: 45,
    tags: ["zen", "lifestyle", "slipon", "footwear"],
    images: ["/assets/images/products/performance-mesh-running-shoes-3.webp"],
    catIndex: 2
  },

  // 4. Bags & Backpacks (Cat Index 3)
  {
    name: "Anti-Theft Travel Backpack",
    price: 4500,
    salePrice: 3800,
    purchasePrice: 2200,
    description: "Travel with peace of mind. Features hidden zippers, slash-resistant materials, a built-in USB charging port, and a padded sleeve fitting up to 15.6\" laptops.",
    sku: "MK-BAG-TRA-001",
    stock: 35,
    tags: ["backpack", "travel", "antitheft", "bags"],
    images: ["/assets/images/products/anti-theft-travel-backpack-1.webp"],
    catIndex: 3
  },
  {
    name: "Cotton Canvas Tote Bag",
    price: 1500,
    salePrice: 1200,
    purchasePrice: 600,
    description: "A spacious and durable everyday tote crafted from heavy-duty raw cotton canvas. Features dual-reinforced carry handles and interior organization pockets.",
    sku: "MK-BAG-TOT-002",
    stock: 70,
    tags: ["tote", "canvas", "shopper", "bags"],
    images: [
      "/assets/images/products/cotton-canvas-tote-bag-1.webp",
      "/assets/images/products/cotton-canvas-tote-bag-2.webp"
    ],
    catIndex: 3
  },
  {
    name: "Executive Leather Briefcase",
    price: 9500,
    salePrice: 8200,
    purchasePrice: 4500,
    description: "Expertly handcrafted from full-grain vegetable-tanned leather. Develops a stunning natural patina over time. Includes compartments for files and tablets.",
    sku: "MK-BAG-BRF-003",
    stock: 15,
    tags: ["briefcase", "leather", "executive", "bags"],
    images: ["/assets/images/products/executive-leather-briefcase-1.webp"],
    catIndex: 3
  },
  {
    name: "Quilted Chain Crossbody Bag",
    price: 3800,
    salePrice: 3200,
    purchasePrice: 1800,
    description: "Elevate your evening look. Featuring a chic chevron-quilted exterior, high-polish gold hardware, and a convertible leather-and-chain shoulder strap.",
    sku: "MK-BAG-QCB-004",
    stock: 25,
    tags: ["crossbody", "quilted", "evening", "bags"],
    images: [
      "/assets/images/products/quilted-chain-crossbody-bag-1.webp",
      "/assets/images/products/quilted-chain-crossbody-bag-2.webp"
    ],
    catIndex: 3
  },
  {
    name: "Minimalist Bifold Wallet",
    price: 1800,
    salePrice: 1450,
    purchasePrice: 800,
    description: "Sleek and low-profile, this premium leather wallet holds up to 8 cards and folded cash without adding bulk to your pocket. Features RFID shielding.",
    sku: "MK-BAG-WLT-005",
    stock: 50,
    tags: ["wallet", "leather", "minimalist", "bags"],
    images: ["/assets/images/products/minimalist-bifold-wallet-1.webp"],
    catIndex: 3
  },

  // 5. Watches (Cat Index 4)
  {
    name: "Chronograph Steel Sports Watch",
    price: 12000,
    salePrice: 9900,
    purchasePrice: 5500,
    description: "A bold timepiece combining utility and rugged elegance. Made from surgical-grade stainless steel with chronograph complications and scratch-resistant sapphire crystal.",
    sku: "MK-WTC-CHR-001",
    stock: 15,
    tags: ["chronograph", "steel", "sports", "watches"],
    images: [
      "/assets/images/products/chronograph-steel-sports-watch-1.webp",
      "/assets/images/products/chronograph-steel-sports-watch-2.webp"
    ],
    catIndex: 4
  },
  {
    name: "Elite Steel Dress Watch",
    price: 14500,
    salePrice: 12500,
    purchasePrice: 7000,
    description: "Refined luxury for special occasions. Features a minimal silver-toned dial, polished link bracelet, and highly reliable Japanese automatic movement.",
    sku: "MK-WTC-ELT-002",
    stock: 10,
    tags: ["dresswatch", "automatic", "luxury", "watches"],
    images: ["/assets/images/products/chronograph-steel-sports-watch-2.webp"],
    catIndex: 4
  },
  {
    name: "Sport Active Chronograph",
    price: 9500,
    salePrice: 7990,
    purchasePrice: 4500,
    description: "Designed for active lifestyles. High-contrast luminous hands, tachymeter bezel, and reliable water resistance up to 100 meters.",
    sku: "MK-WTC-ACT-003",
    stock: 20,
    tags: ["sports", "luminous", "chronograph", "watches"],
    images: ["/assets/images/products/chronograph-steel-sports-watch-3.webp"],
    catIndex: 4
  },
  {
    name: "Classic Leather Dress Watch",
    price: 8500,
    salePrice: 6990,
    purchasePrice: 3800,
    description: "Timeless simplicity. Thin rose-gold plated case paired with a genuine Italian brown leather strap. Fits elegantly under any formal shirt cuff.",
    sku: "MK-WTC-LTH-004",
    stock: 25,
    tags: ["leatherwatch", "classic", "dress", "watches"],
    images: ["/assets/images/products/watches.webp"],
    catIndex: 4
  },
  {
    name: "Minimalist Quartz Watch",
    price: 6500,
    salePrice: 5200,
    purchasePrice: 3000,
    description: "Stripped-back Nordic design. Ultra-thin case and a sleek matte-black dial with matching mesh band. Driven by a precise quartz movement.",
    sku: "MK-WTC-MIN-005",
    stock: 30,
    tags: ["quartz", "minimalist", "mesh", "watches"],
    images: ["/assets/images/products/chronograph-steel-sports-watch-1.webp"],
    catIndex: 4
  },

  // 6. Jewelry (Cat Index 5)
  {
    name: "18k Gold Plated Hoop Earrings",
    price: 2500,
    salePrice: 1990,
    purchasePrice: 900,
    description: "High-shine chunky hoop earrings plated in genuine 18-karat gold over sterling silver. Lightweight hollow design ensures comfortable all-day wear.",
    sku: "MK-JWL-HOP-001",
    stock: 40,
    tags: ["earrings", "hoops", "goldplated", "jewelry"],
    images: ["/assets/images/products/18k-gold-plated-hoop-earrings-1.webp"],
    catIndex: 5
  },
  {
    name: "Chunky Gold Link Necklace",
    price: 3800,
    salePrice: 2990,
    purchasePrice: 1400,
    description: "A bold statement piece featuring modern flat-lying links. Crafted from recycled metals and finished with premium 14k gold plating.",
    sku: "MK-JWL-LNK-002",
    stock: 30,
    tags: ["necklace", "gold", "chunky", "jewelry"],
    images: ["/assets/images/products/chunky-gold-link-necklace-1.webp"],
    catIndex: 5
  },
  {
    name: "Diamond Solitaire Pendant",
    price: 15000,
    salePrice: 12900,
    purchasePrice: 6500,
    description: "A timeless token of elegance. Features a brilliant-cut conflict-free diamond equivalent, delicately suspended on a solid white gold chain.",
    sku: "MK-JWL-DMD-003",
    stock: 12,
    tags: ["pendant", "diamond", "necklace", "jewelry"],
    images: ["/assets/images/products/diamond-solitaire-pendant-1.webp"],
    catIndex: 5
  },
  {
    name: "Stacked Bead Bracelet Set",
    price: 1500,
    salePrice: 1250,
    purchasePrice: 600,
    description: "Set of three coordinating elastic bracelets featuring real semi-precious agate and hematite beads, interspersed with golden metal separators.",
    sku: "MK-JWL-BDD-004",
    stock: 55,
    tags: ["bracelet", "beads", "stacked", "jewelry"],
    images: ["/assets/images/products/stacked-bead-bracelet-set-1.webp"],
    catIndex: 5
  },
  {
    name: "Luxury Gold Hoop Earrings",
    price: 4500,
    salePrice: 3900,
    purchasePrice: 1800,
    description: "Dazzling hand-polished hoops featuring complex interwoven textures. Plated in dense 24k gold for an extraordinarily rich, sunny luster.",
    sku: "MK-JWL-HOP-005",
    stock: 20,
    tags: ["earrings", "luxury", "gold", "jewelry"],
    images: ["/assets/images/products/gold_hoop_earrings_jewelry_1778000050626.webp"],
    catIndex: 5
  },

  // 7. Accessories (Cat Index 6)
  {
    name: "Knit Wool Beanie",
    price: 1200,
    salePrice: 950,
    purchasePrice: 400,
    description: "Expertly rib-knit from a warm, itch-free blend of wool and recycled acrylic. Features a classic fold-over cuff and iconic brand patch.",
    sku: "MK-ACC-BEN-001",
    stock: 60,
    tags: ["beanie", "wool", "winter", "accessories"],
    images: ["/assets/images/products/knit-wool-beanie-1.webp"],
    catIndex: 6
  },
  {
    name: "Reversible Leather Belt",
    price: 2200,
    salePrice: 1800,
    purchasePrice: 850,
    description: "Two belts in one. Rotate the brushed gunmetal buckle to swap between textured black and smooth mahogany brown premium leather.",
    sku: "MK-ACC-BLT-002",
    stock: 45,
    tags: ["belt", "leather", "reversible", "accessories"],
    images: ["/assets/images/products/reversible-leather-belt-1.webp"],
    catIndex: 6
  },
  {
    name: "Suede Touchscreen Gloves",
    price: 1800,
    salePrice: 1450,
    purchasePrice: 700,
    description: "Lined with plush fleece for superior warmth. Features specialized conductive threads in the fingertips to operate smartphones seamlessly in the cold.",
    sku: "MK-ACC-GLV-003",
    stock: 40,
    tags: ["gloves", "suede", "touchscreen", "accessories"],
    images: ["/assets/images/products/suede-touchscreen-gloves-1.webp"],
    catIndex: 6
  },
  {
    name: "Woven Fedora Straw Hat",
    price: 2500,
    salePrice: 1990,
    purchasePrice: 900,
    description: "Hand-braided from lightweight natural paper straw. Features an inner sweatband and a contrasting grosgrain ribbon band. Great for sun protection.",
    sku: "MK-ACC-FED-004",
    stock: 30,
    tags: ["fedora", "strawhat", "summer", "accessories"],
    images: ["/assets/images/products/woven-fedora-straw-hat-1.webp"],
    catIndex: 6
  },
  {
    name: "Silk Twill Square Scarf",
    price: 3200,
    salePrice: 2600,
    purchasePrice: 1200,
    description: "Lustrous and incredibly soft. Printed with a hand-designed geometric pattern. Wear it tied around the neck, hair, or hand-bag handle.",
    sku: "MK-ACC-SCF-005",
    stock: 35,
    tags: ["scarf", "silk", "square", "accessories"],
    images: ["/assets/images/products/silk-twill-square-scarf-1.webp"],
    catIndex: 6
  },

  // 8. Home & Living (Cat Index 7)
  {
    name: "Hand-Poured Soy Wax Candle",
    price: 1500,
    salePrice: 1200,
    purchasePrice: 500,
    description: "Infuse your home with calm. Made of organic soy wax, natural cotton wick, and pure essential oils of lavender, cedarwood, and orange peel.",
    sku: "MK-HOM-CND-001",
    stock: 80,
    tags: ["candle", "soywax", "aromatherapy", "home"],
    images: [
      "/assets/images/products/hand-poured-soy-wax-candle-1.webp",
      "/assets/images/products/hand-poured-soy-wax-candle-2.webp"
    ],
    catIndex: 7
  },
  {
    name: "Sleek Metal Table Lamp",
    price: 4800,
    salePrice: 3990,
    purchasePrice: 1800,
    description: "Mid-century modern aesthetic. Features a brushed brass dome shade, a matte black heavy iron base, and a warm fabric-wrapped toggle cord.",
    sku: "MK-HOM-LMP-002",
    stock: 25,
    tags: ["lamp", "lighting", "metal", "home"],
    images: [
      "/assets/images/products/sleek-metal-table-lamp-1.webp",
      "/assets/images/products/sleek-metal-table-lamp-2.webp"
    ],
    catIndex: 7
  },
  {
    name: "Woven Decorative Throw Pillow",
    price: 1800,
    salePrice: 1450,
    purchasePrice: 650,
    description: "Adds texture to any sofa or bed. Features a hand-loomed thick cotton cover with geometric tufting and a highly resilient duck feather insert.",
    sku: "MK-HOM-PLW-003",
    stock: 50,
    tags: ["pillow", "throw", "woven", "home"],
    images: [
      "/assets/images/products/woven-decorative-throw-pillow-1.webp",
      "/assets/images/products/woven-decorative-throw-pillow-2.webp"
    ],
    catIndex: 7
  },
  {
    name: "Crafted Wooden Serving Tray",
    price: 2800,
    salePrice: 2200,
    purchasePrice: 1100,
    description: "Perfect for hosting or styling coffee tables. Carved from solid ethically-sourced acacia wood and finished with a food-safe mineral oil rub.",
    sku: "MK-HOM-TRY-004",
    stock: 30,
    tags: ["servingtray", "wooden", "acacia", "home"],
    images: [
      "/assets/images/products/serving-tray-1.webp",
      "/assets/images/products/serving-tray-2.webp"
    ],
    catIndex: 7
  },
  {
    name: "Cozy Cable Knit Blanket",
    price: 3500,
    salePrice: 2950,
    purchasePrice: 1500,
    description: "Luxuriously thick cable-knit throw blanket made of plush organic cotton. Adds warmth, elegance, and tactile delight to any seating space.",
    sku: "MK-HOM-BLN-005",
    stock: 40,
    tags: ["blanket", "throw", "knit", "home"],
    images: ["/assets/images/products/home.webp"],
    catIndex: 7
  },

  // 9. Baby & Kids (Cat Index 8)
  {
    name: "Baby Soft Knit Blanket",
    price: 1800,
    salePrice: 1450,
    purchasePrice: 600,
    description: "Hypoallergenic and breathable blanket crafted with a delicate cellular weave from pure organic cotton. Gentle on newborn skin.",
    sku: "MK-KID-BLN-001",
    stock: 45,
    tags: ["baby", "knit", "blanket", "kids"],
    images: ["/assets/images/products/baby_knit_blanket_1777999661726.webp"],
    catIndex: 8
  },
  {
    name: "Floral Print Cotton Dress",
    price: 2200,
    salePrice: 1800,
    purchasePrice: 850,
    description: "Delightful cotton sundress for toddlers featuring a hand-printed wildflower motif, flutter sleeves, and convenient snaps at the back.",
    sku: "MK-KID-DRS-002",
    stock: 30,
    tags: ["dress", "floral", "toddler", "kids"],
    images: ["/assets/images/products/floral_print_cotton_dress_1777999644446.webp"],
    catIndex: 8
  },
  {
    name: "Cozy Cotton Knit Romper",
    price: 1600,
    salePrice: 1290,
    purchasePrice: 600,
    description: "Adorable knit romper featuring cross-back straps, natural coconut shell buttons, and leg snaps for effortless diaper changes.",
    sku: "MK-KID-RMP-003",
    stock: 35,
    tags: ["romper", "knit", "cotton", "kids"],
    images: ["/assets/images/products/baby_knit_blanket_1777999661726.webp"],
    catIndex: 8
  },
  {
    name: "Toddler Comfy-Step Velcros",
    price: 2500,
    salePrice: 1990,
    purchasePrice: 1000,
    description: "First walk shoes with extra wide toe-boxes, highly flexible non-slip rubber soles, and double Velcro straps for easy slip-on.",
    sku: "MK-KID-SHOE-004",
    stock: 40,
    tags: ["shoes", "toddler", "velcro", "kids"],
    images: ["/assets/images/products/baby_knit_blanket_1777999661726.webp"],
    catIndex: 8
  },
  {
    name: "Organic Cotton Swaddle Pack",
    price: 1500,
    salePrice: 1190,
    purchasePrice: 550,
    description: "Pack of two pre-washed multi-use swaddle wraps made of ultra-breathable cotton muslin. Becomes softer with every wash.",
    sku: "MK-KID-SWD-005",
    stock: 50,
    tags: ["swaddle", "muslin", "cotton", "kids"],
    images: ["/assets/images/products/baby_knit_blanket_1777999661726.webp"],
    catIndex: 8
  }
];

async function seed() {
  try {
    await mongoose.connect(mongodbUri);
    console.log('Connected to MongoDB successfully.');

    // 1. Clear existing products and categories
    const deletedProducts = await Product.deleteMany({});
    console.log(`Cleared ${deletedProducts.deletedCount} existing products.`);

    const deletedCategories = await Category.deleteMany({});
    console.log(`Cleared ${deletedCategories.deletedCount} existing categories.`);

    // 2. Seed Categories
    console.log('Seeding categories...');
    const categoriesToInsert = categoriesData.map(cat => ({
      name: cat.name,
      slug: slugify(cat.name),
      image: cat.image,
      isActive: true
    }));

    const insertedCategories = await Category.insertMany(categoriesToInsert);
    console.log(`Seeded ${insertedCategories.length} categories successfully.`);

    // Map category name to its _id
    const categoryMap = {};
    insertedCategories.forEach(cat => {
      categoryMap[cat.name] = cat._id;
    });

    // 3. Seed Products
    console.log('Seeding products...');
    const productsToInsert = productsTemplate.map((prod, index) => {
      const categoryName = categoriesData[prod.catIndex].name;
      const categoryId = categoryMap[categoryName];

      if (!categoryId) {
        throw new Error(`Category ID not found for: ${categoryName}`);
      }

      // Assign sections:
      // Products 0 to 9 are Featured (10 products)
      // Products 10 to 19 are New Arrival (10 products)
      // Products 20 to 29 are Flash Sale (10 products)
      // Products 30 to 44 are regular (15 products)
      const isFeatured = index >= 0 && index < 10;
      const isNewArrival = index >= 10 && index < 20;
      const isFlashSale = index >= 20 && index < 30;

      // Calculate discount rate
      let discountRate = 0;
      if (prod.price && prod.salePrice) {
        discountRate = Math.round(((prod.price - prod.salePrice) / prod.price) * 100);
      }

      // Create random reviews/ratings for realistic premium aesthetic
      const ratings = parseFloat((4.0 + Math.random() * 1.0).toFixed(1)); // 4.0 - 5.0 rating
      const numReviews = Math.floor(5 + Math.random() * 45); // 5 - 50 reviews
      const views = Math.floor(100 + Math.random() * 900); // 100 - 1000 views
      const totalSales = Math.floor(10 + Math.random() * 190); // 10 - 200 sales

      return {
        name: prod.name,
        slug: slugify(prod.name) + '-' + index, // Ensure unique slug with index suffix
        description: prod.description,
        price: prod.price,
        salePrice: prod.salePrice,
        purchasePrice: prod.purchasePrice,
        discountRate: discountRate,
        sku: prod.sku,
        stock: prod.stock,
        categories: [categoryId],
        tags: prod.tags,
        images: prod.images,
        attributes: [
          { key: "Brand", value: "MK Fashion House" },
          { key: "Material", value: prod.tags[1] || "Premium Blend" }
        ],
        isFeatured: isFeatured,
        isNewArrival: isNewArrival,
        isFlashSale: isFlashSale,
        isPublished: true,
        ratings: ratings,
        numReviews: numReviews,
        views: views,
        totalSales: totalSales
      };
    });

    const insertedProducts = await Product.insertMany(productsToInsert);
    console.log(`Seeded ${insertedProducts.length} products successfully.`);

    // Log summaries of seeded sections
    const featuredCount = insertedProducts.filter(p => p.isFeatured).length;
    const newArrivalCount = insertedProducts.filter(p => p.isNewArrival).length;
    const flashSaleCount = insertedProducts.filter(p => p.isFlashSale).length;

    console.log('\nSeeding Summary:');
    console.log(`- Total Categories: ${insertedCategories.length}`);
    console.log(`- Total Products: ${insertedProducts.length}`);
    console.log(`- Featured Section Products: ${featuredCount}`);
    console.log(`- New Arrival Section Products: ${newArrivalCount}`);
    console.log(`- Flash Sale Section Products: ${flashSaleCount}`);

  } catch (error) {
    console.error('Seeding failed:', error);
  } finally {
    await mongoose.disconnect();
    console.log('Disconnected from MongoDB.');
    process.exit(0);
  }
}

seed();
