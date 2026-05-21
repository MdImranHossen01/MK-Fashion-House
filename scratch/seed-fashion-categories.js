const mongoose = require('mongoose');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '..', '.env.local') });

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  console.error('Please define the MONGODB_URI environment variable inside .env.local');
  process.exit(1);
}

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

CategorySchema.pre('save', function () {
  if (!this.slug && this.name) {
    this.slug = this.name
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, '')
      .replace(/[\s_-]+/g, '-')
      .replace(/^-+|-+$/g, '');
  }
});

const Category = mongoose.models.Category || mongoose.model('Category', CategorySchema);

const categories = [
  {
    name: 'Bags & Wallets',
    slug: 'bags-wallets',
    image: '/assets/images/cagetory/bags-wallets.webp',
    isActive: true,
  },
  {
    name: 'Fashion Accessories',
    slug: 'fashion-accessories',
    image: '/assets/images/cagetory/fashion-accessories.webp',
    isActive: true,
  },
  {
    name: 'Footwear',
    slug: 'footwear',
    image: '/assets/images/cagetory/footwear.webp',
    isActive: true,
  },
  {
    name: 'Home Lifestyle',
    slug: 'home-lifestyle',
    image: '/assets/images/cagetory/home-lifestyle.webp',
    isActive: true,
  },
  {
    name: 'Jewelry',
    slug: 'jewelry',
    image: '/assets/images/cagetory/jewelry.webp',
    isActive: true,
  },
  {
    name: 'Kids & Baby',
    slug: 'kids-baby',
    image: '/assets/images/cagetory/kids-baby.webp',
    isActive: true,
  },
  {
    name: "Men's Clothing",
    slug: 'mens-clothing',
    image: '/assets/images/cagetory/mens-clothing.webp',
    isActive: true,
  },
  {
    name: 'Watches',
    slug: 'watches',
    image: '/assets/images/cagetory/watches.webp',
    isActive: true,
  },
  {
    name: "Women's Clothing",
    slug: 'womens-clothing',
    image: '/assets/images/cagetory/womens-clothing.webp',
    isActive: true,
  },
];

async function seedCategories() {
  try {
    console.log('Connecting to MongoDB...');
    await mongoose.connect(MONGODB_URI);
    console.log('Connected to MongoDB');

    console.log('Removing existing seeded categories with same slugs...');
    const slugs = categories.map((c) => c.slug);
    await Category.deleteMany({ slug: { $in: slugs } });

    console.log('Seeding categories...');
    const created = await Category.insertMany(categories);
    console.log(`✓ Seeded ${created.length} categories successfully`);
    created.forEach((cat, index) => {
      console.log(`${index + 1}. ${cat.name} (${cat.slug})`);
    });

    await mongoose.disconnect();
    console.log('Disconnected from MongoDB');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding categories:', error);
    process.exit(1);
  }
}

seedCategories();
