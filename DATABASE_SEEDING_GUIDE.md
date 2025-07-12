# 🌱 Database Seeding Guide

## 🎯 **What is Database Seeding?**
Database seeding is the process of automatically populating your database with dummy/sample data. This is perfect for:
- **Development**: Having realistic data to work with
- **Testing**: Consistent data for testing your application
- **Demos**: Showing your app with real-looking content

## 📁 **What's Included**

### **👥 20 Dummy Users**
- Mix of admins and regular users
- Realistic profiles with names and avatars
- Some active, some inactive users
- Pre-hashed passwords for security

### **📦 12 Dummy Products**
- Tech courses and educational content
- Different categories (Programming, Design, AI, etc.)
- Realistic pricing and ratings
- Product images and descriptions
- Automatically assigned to admin users

## 🚀 **How to Use**

### **Step 1: Make Sure Your MongoDB Atlas is Connected**
First, ensure your `backend/.env` file has the correct connection string:
```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/SkillSwap?retryWrites=true&w=majority
JWT_SECRET=your-super-secret-jwt-key
PORT=5000
NODE_ENV=development
```

### **Step 2: Seed Your Database**
Run this command from your project root:
```bash
npm run seed
```

Or from the backend directory:
```bash
cd backend
npm run seed
```

### **Step 3: Watch the Magic! ✨**
You'll see something like this:
```
🌱 Starting Database Seeding Process...

✅ Connected to MongoDB Atlas

👥 Seeding Users...
✅ Created user: tech_guru (guru@tech.com)
✅ Created user: design_master (design@master.com)
...

📦 Seeding Products...
✅ Created product: React.js Mastery Course (by tech_guru)
✅ Created product: UI/UX Design Fundamentals (by data_wizard)
...

🎯 Database Seeding Complete!
═══════════════════════════════════
👥 Total Users: 20
   - Active Users: 17
   - Admin Users: 6
📦 Total Products: 12
═══════════════════════════════════
```

## 🔑 **Test Login Credentials**

After seeding, you can use these accounts to test your application:

### **Admin User:**
- **Email**: `guru@tech.com`
- **Password**: `tech1234`
- **Role**: Admin (can manage all users and products)

### **Regular User:**
- **Email**: `design@master.com`
- **Password**: `design456`
- **Role**: User (can create/manage own products)

## 🧹 **Clean Database**

To remove all data and start fresh:
```bash
npm run seed:clean
```

This will delete all users and products from your database.

## 🔄 **Re-seeding**

The seeder is smart! It will:
- ✅ **Skip** if data already exists
- ✅ **Not create duplicates**
- ✅ **Show existing count** if data is found

To force re-seed:
```bash
npm run seed:clean  # Clean first
npm run seed        # Then seed again
```

## 🎯 **Test Your Application**

After seeding, test these endpoints:

### **1. Health Check**
```bash
curl http://localhost:5000/api/health
```

### **2. Get All Products**
```bash
curl http://localhost:5000/api/products
```

### **3. Login with Admin User**
```bash
curl -X POST http://localhost:5000/api/users/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "guru@tech.com",
    "password": "tech1234"
  }'
```

### **4. Get User Profile (use token from login)**
```bash
curl -X GET http://localhost:5000/api/users/profile \
  -H "Authorization: Bearer YOUR_JWT_TOKEN_HERE"
```

## 📊 **What You'll See in MongoDB Atlas**

After seeding, check your MongoDB Atlas dashboard:

1. **Database**: `SkillSwap`
2. **Collections**:
   - `users` (20 documents)
   - `products` (12 documents)

## 🏗️ **Project Structure**

```
backend/
├── data/
│   ├── dummyUsers.js      # 20 sample users
│   └── dummyProducts.js   # 12 sample products
├── scripts/
│   └── seedDatabase.js    # Seeding logic
├── models/
│   ├── User.js           # User schema
│   └── Product.js        # Product schema
└── ...
```

## 🔧 **Customizing the Data**

### **Adding More Users**
Edit `backend/data/dummyUsers.js`:
```javascript
export default [
  {
    username: 'your_new_user',
    email: 'user@example.com',
    password: 'password123',
    role: 'user',
    profile: {
      firstName: 'John',
      lastName: 'Doe',
      avatar: 'https://placehold.co/200x200?text=JD'
    },
    isActive: true
  },
  // ... existing users
];
```

### **Adding More Products**
Edit `backend/data/dummyProducts.js`:
```javascript
export default [
  {
    name: 'Your New Course',
    description: 'Amazing course description',
    price: 99.99,
    category: 'Programming',
    stock: 50,
    images: ['https://placehold.co/400x300?text=Course'],
    brand: 'YourBrand',
    tags: ['programming', 'javascript'],
    rating: { average: 4.5, count: 100 },
    isActive: true
  },
  // ... existing products
];
```

## 🚨 **Troubleshooting**

### **Error: "MONGODB_URI not found"**
- Check your `backend/.env` file exists
- Verify the connection string is correct

### **Error: "Authentication failed"**
- Verify your MongoDB Atlas username/password
- Check your IP is whitelisted in MongoDB Atlas

### **Error: "Users/Products already exist"**
- Run `npm run seed:clean` first
- Then run `npm run seed` again

### **Error: "No users available for products"**
- This means user creation failed
- Check the error messages above the products section
- Usually a database connection issue

## 🎉 **Success Indicators**

You know it worked when:
- ✅ You see "Database Seeding Complete!" message
- ✅ Your MongoDB Atlas shows 20 users and 12 products
- ✅ You can login with test credentials
- ✅ Your API endpoints return data

## 📝 **Next Steps**

1. **Start your backend**: `npm run dev:server`
2. **Start your frontend**: `npm run dev`
3. **Test login** with the provided credentials
4. **Explore the API** endpoints
5. **Build your application** with real data!

---

**🚀 Happy Coding!** Your database is now populated with realistic dummy data!