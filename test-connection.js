const http = require('http');

console.log('🔍 Testing backend connection...\n');

// Test backend health endpoint
const testBackend = () => {
  return new Promise((resolve, reject) => {
    const req = http.get('http://localhost:5000/health', (res) => {
      let data = '';
      
      res.on('data', (chunk) => {
        data += chunk;
      });
      
      res.on('end', () => {
        try {
          const response = JSON.parse(data);
          resolve(response);
        } catch (err) {
          reject(new Error('Invalid JSON response'));
        }
      });
    });
    
    req.on('error', (err) => {
      reject(err);
    });
    
    req.setTimeout(5000, () => {
      req.destroy();
      reject(new Error('Request timeout'));
    });
  });
};

// Test API endpoint
const testAPI = () => {
  return new Promise((resolve, reject) => {
    const req = http.get('http://localhost:5000/api', (res) => {
      let data = '';
      
      res.on('data', (chunk) => {
        data += chunk;
      });
      
      res.on('end', () => {
        try {
          const response = JSON.parse(data);
          resolve(response);
        } catch (err) {
          reject(new Error('Invalid JSON response'));
        }
      });
    });
    
    req.on('error', (err) => {
      reject(err);
    });
    
    req.setTimeout(5000, () => {
      req.destroy();
      reject(new Error('Request timeout'));
    });
  });
};

// Run tests
async function runTests() {
  console.log('1. Testing backend health endpoint...');
  try {
    const healthResponse = await testBackend();
    console.log('   ✅ Backend health check passed');
    console.log('   📊 Response:', healthResponse);
  } catch (err) {
    console.log('   ❌ Backend health check failed:', err.message);
    console.log('   💡 Make sure to start the backend server first:');
    console.log('      cd backend && npm run dev');
    return;
  }

  console.log('\n2. Testing API documentation endpoint...');
  try {
    const apiResponse = await testAPI();
    console.log('   ✅ API endpoint accessible');
    console.log('   📚 Available endpoints:', Object.keys(apiResponse.documentation || {}));
  } catch (err) {
    console.log('   ❌ API endpoint failed:', err.message);
  }

  console.log('\n🎉 Backend connection test completed!');
  console.log('\n📋 Next steps:');
  console.log('   1. Start frontend: npm run dev');
  console.log('   2. Visit: http://localhost:8080');
  console.log('   3. Try logging in or creating an account');
}

runTests();