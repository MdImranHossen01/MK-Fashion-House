import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  console.error('Please define the MONGODB_URI environment variable inside .env.local');
  process.exit(1);
}

const BannerSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    image: { type: String, required: true },
    link: { type: String },
    primaryBtnText: { type: String },
    primaryBtnLink: { type: String },
    secondaryBtnText: { type: String },
    secondaryBtnLink: { type: String },
    order: { type: Number, default: 0 },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

const Banner = mongoose.model('Banner', BannerSchema);

const banners = [
  {
    title: 'Fashion Elegance Awaits',
    image: '/assets/images/Banner/Banner (1).webp',
    order: 1,
    isActive: true,
    primaryBtnText: 'Shop Now',
    primaryBtnLink: '/shop',
    secondaryBtnText: 'Chat Us',
    secondaryBtnLink: 'https://wa.me/01919011101',
  },
  {
    title: 'Premium Quality Styles',
    image: '/assets/images/Banner/Banner (2).webp',
    order: 2,
    isActive: true,
    primaryBtnText: 'Shop Now',
    primaryBtnLink: '/shop',
    secondaryBtnText: 'Chat Us',
    secondaryBtnLink: 'https://wa.me/01919011101',
  },
  {
    title: 'Trendy Summer Collection',
    image: '/assets/images/Banner/Banner (3).webp',
    order: 3,
    isActive: true,
    primaryBtnText: 'Shop Now',
    primaryBtnLink: '/shop',
    secondaryBtnText: 'Chat Us',
    secondaryBtnLink: 'https://wa.me/01919011101',
  },
  {
    title: 'Exclusive Offers Today',
    image: '/assets/images/Banner/Banner (4).webp',
    order: 4,
    isActive: true,
    primaryBtnText: 'Shop Now',
    primaryBtnLink: '/shop',
    secondaryBtnText: 'Chat Us',
    secondaryBtnLink: 'https://wa.me/01919011101',
  },
];

async function seedBanners() {
  try {
    console.log('Connecting to MongoDB...');
    await mongoose.connect(MONGODB_URI);
    console.log('✓ Connected to MongoDB');

    console.log('Clearing existing banners...');
    await Banner.deleteMany({});
    console.log('✓ Cleared existing banners');

    console.log('Seeding new banners...');
    const result = await Banner.insertMany(banners);
    console.log(`✓ Seeded ${result.length} banners successfully`);

    console.log('\nBanners created:');
    result.forEach((banner, index) => {
      console.log(`${index + 1}. ${banner.title} (Order: ${banner.order})`);
    });

    await mongoose.connection.close();
    console.log('\n✓ Database connection closed');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding banners:', error);
    process.exit(1);
  }
}

seedBanners();
