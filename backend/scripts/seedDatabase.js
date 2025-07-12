import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from '../models/User.js';
import Product from '../models/Product.js';
import dummyUsers from '../data/dummyUsers.js';
import dummyProducts from '../data/dummyProducts.js';

// Load environment variables
dotenv.config();

console.log('🌱 Starting Database Seeding Process...\n');

// Connect to MongoDB
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connected to MongoDB Atlas');
  } catch (error) {
    console.error('❌ MongoDB connection error:', error.message);
    process.exit(1);
  }
};

// Seed Users
const seedUsers = async () => {
  try {
    console.log('\n👥 Seeding Users...');
    
    // Check if users already exist
    const existingUsersCount = await User.countDocuments();
    
    if (existingUsersCount > 0) {
      console.log(`⚠️  Found ${existingUsersCount} existing users. Skipping user seeding.`);
      console.log('   To re-seed users, run: npm run seed:clean first');
      return await User.find(); // Return existing users for products
    }
    
    // Create users one by one to ensure password hashing works
    const createdUsers = [];
    
    for (const userData of dummyUsers) {
      try {
        const user = new User(userData);
        await user.save();
        createdUsers.push(user);
        console.log(`✅ Created user: ${user.username} (${user.email})`);
      } catch (error) {
        console.error(`❌ Failed to create user ${userData.username}:`, error.message);
      }
    }
    
    console.log(`\n🎉 Successfully created ${createdUsers.length} users!`);
    return createdUsers;
    
  } catch (error) {
    console.error('❌ Error seeding users:', error.message);
    return [];
  }
};

// Seed Products
const seedProducts = async (users) => {
  try {
    console.log('\n📦 Seeding Products...');
    
    // Check if products already exist
    const existingProductsCount = await Product.countDocuments();
    
    if (existingProductsCount > 0) {
      console.log(`⚠️  Found ${existingProductsCount} existing products. Skipping product seeding.`);
      console.log('   To re-seed products, run: npm run seed:clean first');
      return;
    }
    
    if (users.length === 0) {
      console.log('❌ No users available to assign products to. Skipping product seeding.');
      return;
    }
    
    // Get admin users for product creation
    const adminUsers = users.filter(user => user.role === 'admin');
    const activeUsers = users.filter(user => user.isActive);
    
    // Use admin users first, then active users
    const availableUsers = adminUsers.length > 0 ? adminUsers : activeUsers;
    
    if (availableUsers.length === 0) {
      console.log('❌ No active users available to assign products to. Skipping product seeding.');
      return;
    }
    
    console.log(`👤 Using ${availableUsers.length} users as product creators`);
    
    // Create products
    const createdProducts = [];
    
    for (const productData of dummyProducts) {
      try {
        // Randomly assign product to an available user
        const randomUser = availableUsers[Math.floor(Math.random() * availableUsers.length)];
        
        const product = new Product({
          ...productData,
          createdBy: randomUser._id
        });
        
        await product.save();
        createdProducts.push(product);
        console.log(`✅ Created product: ${product.name} (by ${randomUser.username})`);
      } catch (error) {
        console.error(`❌ Failed to create product ${productData.name}:`, error.message);
      }
    }
    
    console.log(`\n🎉 Successfully created ${createdProducts.length} products!`);
    
  } catch (error) {
    console.error('❌ Error seeding products:', error.message);
  }
};

// Main seeding function
const seedDatabase = async () => {
  try {
    await connectDB();
    
    // Seed users first
    const users = await seedUsers();
    
    // Seed products with user references
    await seedProducts(users);
    
    // Summary
    const totalUsers = await User.countDocuments();
    const totalProducts = await Product.countDocuments();
    const activeUsers = await User.countDocuments({ isActive: true });
    const adminUsers = await User.countDocuments({ role: 'admin' });
    
    console.log('\n🎯 Database Seeding Complete!');
    console.log('═══════════════════════════════════');
    console.log(`👥 Total Users: ${totalUsers}`);
    console.log(`   - Active Users: ${activeUsers}`);
    console.log(`   - Admin Users: ${adminUsers}`);
    console.log(`📦 Total Products: ${totalProducts}`);
    console.log('═══════════════════════════════════');
    
    console.log('\n🔑 Test Login Credentials:');
    console.log('Admin User:');
    console.log('  Email: guru@tech.com');
    console.log('  Password: tech1234');
    console.log('\nRegular User:');
    console.log('  Email: design@master.com');
    console.log('  Password: design456');
    
    console.log('\n🌐 Test your API:');
    console.log('  Health Check: http://localhost:5000/api/health');
    console.log('  Get Products: http://localhost:5000/api/products');
    console.log('  Login: POST http://localhost:5000/api/users/login');
    
  } catch (error) {
    console.error('❌ Database seeding failed:', error.message);
  } finally {
    await mongoose.connection.close();
    console.log('\n👋 Database connection closed');
    process.exit(0);
  }
};

// Clean database function
const cleanDatabase = async () => {
  try {
    await connectDB();
    
    console.log('🧹 Cleaning Database...');
    
    const deletedProducts = await Product.deleteMany({});
    const deletedUsers = await User.deleteMany({});
    
    console.log(`🗑️  Deleted ${deletedProducts.deletedCount} products`);
    console.log(`🗑️  Deleted ${deletedUsers.deletedCount} users`);
    console.log('✅ Database cleaned successfully!');
    
  } catch (error) {
    console.error('❌ Database cleaning failed:', error.message);
  } finally {
    await mongoose.connection.close();
    console.log('\n👋 Database connection closed');
    process.exit(0);
  }
};

// Check command line arguments
const command = process.argv[2];

if (command === 'clean') {
  cleanDatabase();
} else {
  seedDatabase();
}