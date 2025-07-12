import User from '../models/User.js';
import Product from '../models/Product.js';
import dummyUsers from '../data/dummyUsers.js';
import dummyProducts from '../data/dummyProducts.js';

// Auto-seed database if empty
export const autoSeedDatabase = async () => {
  try {
    // Check if database is empty
    const userCount = await User.countDocuments();
    const productCount = await Product.countDocuments();
    
    if (userCount === 0 && productCount === 0) {
      console.log('📋 Database is empty. Auto-seeding with dummy data...');
      
      // Create users
      const createdUsers = [];
      for (const userData of dummyUsers) {
        try {
          const user = new User(userData);
          await user.save();
          createdUsers.push(user);
        } catch (error) {
          console.error(`❌ Failed to create user ${userData.username}:`, error.message);
        }
      }
      
      // Create products with user references
      const adminUsers = createdUsers.filter(user => user.role === 'admin');
      const availableUsers = adminUsers.length > 0 ? adminUsers : createdUsers;
      
      if (availableUsers.length > 0) {
        for (const productData of dummyProducts) {
          try {
            const randomUser = availableUsers[Math.floor(Math.random() * availableUsers.length)];
            const product = new Product({
              ...productData,
              createdBy: randomUser._id
            });
            await product.save();
          } catch (error) {
            console.error(`❌ Failed to create product ${productData.name}:`, error.message);
          }
        }
      }
      
      console.log(`✅ Auto-seeded database with ${createdUsers.length} users and ${dummyProducts.length} products`);
      console.log('🔑 Test login: guru@tech.com / tech1234');
      
    } else {
      console.log(`📊 Database already has data: ${userCount} users, ${productCount} products`);
    }
  } catch (error) {
    console.error('❌ Auto-seeding failed:', error.message);
  }
};