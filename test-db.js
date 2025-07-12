import mongoose from 'mongoose';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

const testDatabaseConnection = async () => {
  console.log('🔍 Testing MongoDB Atlas connection...');
  console.log('='.repeat(50));
  
  try {
    // Check if MONGODB_URI is set
    if (!process.env.MONGODB_URI) {
      console.error('❌ MONGODB_URI is not set in environment variables');
      process.exit(1);
    }
    
    console.log('📋 Connection Details:');
    console.log(`   URI: ${process.env.MONGODB_URI.replace(/\/\/[^:]+:[^@]+@/, '//***:***@')}`);
    console.log(`   Database: ${process.env.MONGODB_URI.split('/').pop()}`);
    console.log('');
    
    // Set connection options
    const connectionOptions = {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 10000, // 10 seconds
      socketTimeoutMS: 45000, // 45 seconds
    };
    
    console.log('🔄 Attempting to connect...');
    
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI, connectionOptions);
    
    console.log('✅ Successfully connected to MongoDB Atlas!');
    
    // Test basic operations
    console.log('\n🧪 Testing basic operations...');
    
    // Test database access
    const db = mongoose.connection.db;
    const stats = await db.stats();
    console.log(`✅ Database access successful`);
    console.log(`   Database name: ${stats.db}`);
    console.log(`   Collections: ${stats.collections}`);
    
    // Test collection operations
    const collections = await db.listCollections().toArray();
    console.log(`✅ Collection listing successful`);
    console.log(`   Number of collections: ${collections.length}`);
    
    if (collections.length > 0) {
      console.log('   Collections found:');
      collections.forEach(col => {
        console.log(`     - ${col.name}`);
      });
    }
    
    // Test write operation
    console.log('\n🔬 Testing write operations...');
    const testCollection = db.collection('test_connection');
    const testDoc = { test: true, timestamp: new Date() };
    await testCollection.insertOne(testDoc);
    console.log('✅ Write operation successful');
    
    // Test read operation
    const readResult = await testCollection.findOne({ test: true });
    console.log('✅ Read operation successful');
    
    // Clean up test document
    await testCollection.deleteOne({ test: true });
    console.log('✅ Cleanup successful');
    
    console.log('\n🎉 All database tests passed!');
    console.log('='.repeat(50));
    console.log('Your MongoDB Atlas connection is working correctly.');
    console.log('You can now run your application with confidence.');
    
  } catch (error) {
    console.error('\n❌ Database connection failed!');
    console.error('='.repeat(50));
    
    if (error.name === 'MongooseServerSelectionError') {
      console.error('🔗 Connection Issue:');
      console.error('   - Cannot reach MongoDB Atlas servers');
      console.error('   - Check your internet connection');
      console.error('   - Verify your IP address is whitelisted in Atlas');
      console.error('   - Ensure your cluster is running');
    } else if (error.name === 'MongoParseError') {
      console.error('🔧 URI Format Issue:');
      console.error('   - Check your connection string format');
      console.error('   - Verify username and password are correct');
      console.error('   - Ensure special characters are URL encoded');
    } else if (error.name === 'MongoNetworkError') {
      console.error('🌐 Network Issue:');
      console.error('   - Network connectivity problems');
      console.error('   - Firewall may be blocking the connection');
      console.error('   - Check if you\'re behind a corporate firewall');
    } else if (error.code === 8000) {
      console.error('🔐 Authentication Issue:');
      console.error('   - Invalid username or password');
      console.error('   - Check your database user credentials');
    } else {
      console.error('❓ Unknown Error:');
      console.error(`   Error: ${error.message}`);
    }
    
    console.error('\n🛠️  Troubleshooting Steps:');
    console.error('1. Check your MongoDB Atlas cluster status');
    console.error('2. Verify your connection string');
    console.error('3. Ensure your IP is whitelisted (0.0.0.0/0 for development)');
    console.error('4. Check your database user permissions');
    console.error('5. Try connecting from MongoDB Compass with the same URI');
    
    console.error('\n📞 If problems persist:');
    console.error('- Check MongoDB Atlas status page');
    console.error('- Contact MongoDB support');
    console.error('- Verify your cluster region and availability');
    
    process.exit(1);
  } finally {
    // Close the connection
    await mongoose.connection.close();
    console.log('\n📴 Connection closed');
    process.exit(0);
  }
};

// Run the test
testDatabaseConnection();