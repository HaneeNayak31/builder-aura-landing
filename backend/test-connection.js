import mongoose from 'mongoose';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

console.log('🔍 Testing MongoDB Atlas Connection...\n');

// Check if MONGODB_URI is loaded
if (!process.env.MONGODB_URI) {
  console.error('❌ MONGODB_URI not found in environment variables');
  console.log('Make sure you have a .env file in the backend/ directory with MONGODB_URI set');
  process.exit(1);
}

console.log('✅ MONGODB_URI found');
console.log('Connection string preview:', process.env.MONGODB_URI.replace(/\/\/(.+):(.+)@/, '//***:***@'));

// Test connection
mongoose.connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('✅ Successfully connected to MongoDB Atlas!');
    console.log('Database name:', mongoose.connection.db.databaseName);
    
    // Test creating a simple document
    const testSchema = new mongoose.Schema({
      name: String,
      createdAt: { type: Date, default: Date.now }
    });
    
    const TestModel = mongoose.model('Test', testSchema);
    
    return TestModel.create({ name: 'Connection Test' });
  })
  .then((doc) => {
    console.log('✅ Successfully created test document:', doc);
    console.log('🎉 Your MongoDB Atlas connection is working perfectly!');
    
    // Clean up test document
    return mongoose.connection.db.collection('tests').deleteMany({});
  })
  .then(() => {
    console.log('🧹 Cleaned up test data');
    process.exit(0);
  })
  .catch((error) => {
    console.error('❌ Connection failed:', error.message);
    
    if (error.message.includes('authentication failed')) {
      console.log('\n🔑 AUTHENTICATION ERROR:');
      console.log('- Check your username and password in the connection string');
      console.log('- Make sure the database user has read/write permissions');
      console.log('- Verify the user exists in MongoDB Atlas → Database Access');
    }
    
    if (error.message.includes('ENOTFOUND') || error.message.includes('querySrv')) {
      console.log('\n🌐 NETWORK/DNS ERROR:');
      console.log('- Check your internet connection');
      console.log('- Verify the cluster URL is correct');
      console.log('- Make sure you copied the connection string correctly');
    }
    
    if (error.message.includes('IP') || error.message.includes('not authorized')) {
      console.log('\n🔒 IP WHITELIST ERROR:');
      console.log('- Add your IP address to MongoDB Atlas → Network Access');
      console.log('- Or add 0.0.0.0/0 to allow all IPs (for development only)');
    }
    
    if (error.message.includes('timeout')) {
      console.log('\n⏰ TIMEOUT ERROR:');
      console.log('- Check your internet connection');
      console.log('- Verify MongoDB Atlas cluster is running (not paused)');
    }
    
    console.log('\n📋 TROUBLESHOOTING CHECKLIST:');
    console.log('1. ✅ MongoDB Atlas cluster is running');
    console.log('2. ✅ Database user created with password');
    console.log('3. ✅ User has readWrite permissions');
    console.log('4. ✅ Your IP is whitelisted in Network Access');
    console.log('5. ✅ Connection string format is correct');
    console.log('6. ✅ Password is URL-encoded if it contains special characters');
    
    process.exit(1);
  });