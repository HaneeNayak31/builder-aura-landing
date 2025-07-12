import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from './models/User.js';
import Product from './models/Product.js';

// Load environment variables
dotenv.config();

// Dummy user data
const dummyUsers = [
  {
    username: 'admin_user',
    email: 'admin@skillswap.com',
    password: 'Admin123!',
    role: 'admin',
    profile: {
      firstName: 'Admin',
      lastName: 'User',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
    }
  },
  {
    username: 'john_doe',
    email: 'john@example.com',
    password: 'Password123!',
    role: 'user',
    profile: {
      firstName: 'John',
      lastName: 'Doe',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
    }
  },
  {
    username: 'jane_smith',
    email: 'jane@example.com',
    password: 'Password123!',
    role: 'user',
    profile: {
      firstName: 'Jane',
      lastName: 'Smith',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b332c725?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
    }
  },
  {
    username: 'mike_wilson',
    email: 'mike@example.com',
    password: 'Password123!',
    role: 'user',
    profile: {
      firstName: 'Mike',
      lastName: 'Wilson',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
    }
  },
  {
    username: 'sarah_johnson',
    email: 'sarah@example.com',
    password: 'Password123!',
    role: 'user',
    profile: {
      firstName: 'Sarah',
      lastName: 'Johnson',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
    }
  }
];

// Function to create dummy products for a given user
const createDummyProducts = (userId) => [
  {
    name: 'Premium Web Development Course',
    description: 'Learn full-stack web development with React, Node.js, and MongoDB. Perfect for beginners and intermediate developers.',
    price: 99.99,
    category: 'Programming',
    stock: 50,
    images: [
      'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60',
      'https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60'
    ],
    brand: 'SkillSwap Academy',
    tags: ['web development', 'react', 'nodejs', 'mongodb', 'javascript'],
    createdBy: userId,
    rating: {
      average: 4.5,
      count: 125
    }
  },
  {
    name: 'Digital Marketing Masterclass',
    description: 'Complete digital marketing course covering SEO, social media marketing, email marketing, and paid advertising.',
    price: 79.99,
    category: 'Marketing',
    stock: 30,
    images: [
      'https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60',
      'https://images.unsplash.com/photo-1533750349088-cd871a92f312?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60'
    ],
    brand: 'Marketing Pro',
    tags: ['digital marketing', 'seo', 'social media', 'email marketing', 'ads'],
    createdBy: userId,
    rating: {
      average: 4.3,
      count: 89
    }
  },
  {
    name: 'Python for Data Science',
    description: 'Master Python programming for data analysis, visualization, and machine learning with pandas, numpy, and scikit-learn.',
    price: 129.99,
    category: 'Data Science',
    stock: 25,
    images: [
      'https://images.unsplash.com/photo-1526379879527-8559ecfcaec0?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60',
      'https://images.unsplash.com/photo-1515879218367-8466d910aaa4?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60'
    ],
    brand: 'Data Academy',
    tags: ['python', 'data science', 'machine learning', 'pandas', 'numpy'],
    createdBy: userId,
    rating: {
      average: 4.7,
      count: 203
    }
  },
  {
    name: 'UI/UX Design Fundamentals',
    description: 'Learn the principles of user interface and user experience design with hands-on projects using Figma and Adobe XD.',
    price: 89.99,
    category: 'Design',
    stock: 40,
    images: [
      'https://images.unsplash.com/photo-1558655146-9f40138edfeb?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60',
      'https://images.unsplash.com/photo-1561070791-2526d30994b5?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60'
    ],
    brand: 'Design Studio',
    tags: ['ui design', 'ux design', 'figma', 'adobe xd', 'prototyping'],
    createdBy: userId,
    rating: {
      average: 4.6,
      count: 167
    }
  },
  {
    name: 'Mobile App Development with React Native',
    description: 'Build cross-platform mobile applications for iOS and Android using React Native and Expo.',
    price: 119.99,
    category: 'Mobile Development',
    stock: 35,
    images: [
      'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60',
      'https://images.unsplash.com/photo-1551650975-87deedd944c3?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60'
    ],
    brand: 'Mobile Masters',
    tags: ['react native', 'mobile development', 'ios', 'android', 'expo'],
    createdBy: userId,
    rating: {
      average: 4.4,
      count: 92
    }
  },
  {
    name: 'Cloud Computing with AWS',
    description: 'Learn Amazon Web Services (AWS) fundamentals, including EC2, S3, RDS, and Lambda for cloud infrastructure.',
    price: 149.99,
    category: 'Cloud Computing',
    stock: 20,
    images: [
      'https://images.unsplash.com/photo-1451187580459-43490279c0fa?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60',
      'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60'
    ],
    brand: 'Cloud Academy',
    tags: ['aws', 'cloud computing', 'ec2', 's3', 'lambda', 'devops'],
    createdBy: userId,
    rating: {
      average: 4.8,
      count: 156
    }
  },
  {
    name: 'Cybersecurity Essentials',
    description: 'Essential cybersecurity concepts, including network security, ethical hacking, and incident response.',
    price: 109.99,
    category: 'Cybersecurity',
    stock: 15,
    images: [
      'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60',
      'https://images.unsplash.com/photo-1563206767-5b18f218e8de?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60'
    ],
    brand: 'Security Pro',
    tags: ['cybersecurity', 'ethical hacking', 'network security', 'penetration testing'],
    createdBy: userId,
    rating: {
      average: 4.5,
      count: 78
    }
  },
  {
    name: 'Blockchain and Cryptocurrency',
    description: 'Understanding blockchain technology, cryptocurrency, and smart contract development with Ethereum.',
    price: 159.99,
    category: 'Blockchain',
    stock: 10,
    images: [
      'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60',
      'https://images.unsplash.com/photo-1559028006-448665bd7c7f?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60'
    ],
    brand: 'Crypto Learning',
    tags: ['blockchain', 'cryptocurrency', 'ethereum', 'smart contracts', 'web3'],
    createdBy: userId,
    rating: {
      average: 4.2,
      count: 45
    }
  }
];

// Function to seed the database
const seedDatabase = async () => {
  try {
    console.log('🌱 Starting database seeding...');
    
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connected to MongoDB');

    // Clear existing data
    console.log('🗑️  Clearing existing data...');
    await User.deleteMany({});
    await Product.deleteMany({});
    console.log('✅ Existing data cleared');

    // Create users
    console.log('👥 Creating users...');
    const createdUsers = await User.insertMany(dummyUsers);
    console.log(`✅ Created ${createdUsers.length} users`);

    // Create products for each user
    console.log('📦 Creating products...');
    let allProducts = [];
    
    for (let i = 0; i < createdUsers.length; i++) {
      const user = createdUsers[i];
      // Create 2-3 products per user
      const userProducts = createDummyProducts(user._id).slice(0, Math.floor(Math.random() * 3) + 2);
      allProducts = allProducts.concat(userProducts);
    }
    
    const createdProducts = await Product.insertMany(allProducts);
    console.log(`✅ Created ${createdProducts.length} products`);

    // Display summary
    console.log('\n📊 Database seeding completed successfully!');
    console.log('='.repeat(50));
    console.log(`👥 Users created: ${createdUsers.length}`);
    console.log(`📦 Products created: ${createdProducts.length}`);
    console.log('='.repeat(50));
    
    console.log('\n🔐 Sample login credentials:');
    console.log('Admin User:');
    console.log('  Email: admin@skillswap.com');
    console.log('  Password: Admin123!');
    console.log('\nRegular User:');
    console.log('  Email: john@example.com');
    console.log('  Password: Password123!');
    
    console.log('\n🚀 You can now start your server with: npm run server');
    
  } catch (error) {
    console.error('❌ Error seeding database:', error);
  } finally {
    // Close database connection
    await mongoose.connection.close();
    console.log('📴 Database connection closed');
    process.exit(0);
  }
};

// Run the seeding function
seedDatabase();