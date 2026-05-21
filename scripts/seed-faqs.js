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

const FAQSchema = new mongoose.Schema(
  {
    question: { type: String, required: true },
    answer: { type: String, required: true },
    order: { type: Number, default: 0 },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

const FAQ = mongoose.models.FAQ || mongoose.model('FAQ', FAQSchema);

const faqs = [
  {
    question: 'What is the estimated delivery time and shipping cost?',
    answer: 'We offer standard shipping across the country. Standard delivery takes 2 to 4 business days. Shipping is free for all orders above BDT 5,000. For orders below BDT 5,000, a flat shipping fee of BDT 100 applies. Express shipping options are also available during checkout.',
    order: 1,
    isActive: true,
  },
  {
    question: 'Can I exchange or return a product if it doesn\'t fit?',
    answer: 'Absolutely! We have a hassle-free 7-day return and exchange policy. To be eligible, the item must be unworn, unwashed, and in its original packaging with all product tags fully intact. You can initiate a return or exchange through your profile dashboard or by contacting our dedicated support team via WhatsApp.',
    order: 2,
    isActive: true,
  },
  {
    question: 'How do I choose the correct size for clothing and footwear?',
    answer: 'Each product page features a detailed "Size Guide" to help you find your perfect fit. Since we curate premium items with varying cuts and fits, we recommend measuring your chest, waist, and hips, and comparing them with our specific product measurements before ordering.',
    order: 3,
    isActive: true,
  },
  {
    question: 'Are all MK Fashion House products authentic?',
    answer: 'Yes, 100% authenticity is guaranteed. MK Fashion House curates products directly from certified designers, premium manufacturers, and official distributors. Every item undergoes rigorous quality checks by our internal experts before being packaged and shipped to you.',
    order: 4,
    isActive: true,
  },
  {
    question: 'What payment methods do you support?',
    answer: 'We support a wide range of secure payment options, including Cash on Delivery (COD), major credit and debit cards (Visa, Mastercard, AMEX), mobile banking wallets (bKash, Nagad, Rocket), and secure online bank transfers. All transactions are fully encrypted for your security.',
    order: 5,
    isActive: true,
  }
];

async function seed() {
  try {
    await mongoose.connect(mongodbUri);
    console.log('Connected to MongoDB successfully.');

    // Clear existing FAQs
    const deleteResult = await FAQ.deleteMany({});
    console.log(`Cleared ${deleteResult.deletedCount} existing FAQs.`);

    // Insert new FAQs
    const insertResult = await FAQ.insertMany(faqs);
    console.log(`Seeded ${insertResult.length} FAQs successfully:`);
    insertResult.forEach((f, i) => {
      console.log(`[FAQ ${i+1}] Question: "${f.question}"`);
    });

  } catch (error) {
    console.error('Seeding error:', error);
  } finally {
    await mongoose.disconnect();
    console.log('Disconnected from MongoDB.');
    process.exit(0);
  }
}

seed();
