# 🔧 MongoDB Atlas Troubleshooting Guide

## 🚨 **Most Common Issues & Solutions**

### 1. **Missing .env File** ❌
**Problem**: No environment variables loaded
**Solution**: Create `backend/.env` file with your connection string

### 2. **Wrong Connection String** ❌
**Problem**: Incorrect MongoDB Atlas URI format
**Solution**: Use this format:
```
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/SkillSwap?retryWrites=true&w=majority
```

### 3. **Authentication Failed** ❌
**Problem**: Wrong username/password
**Solutions**:
- Check your MongoDB Atlas username/password
- Ensure the database user has read/write permissions
- Password must be URL-encoded (replace special characters)

### 4. **IP Not Whitelisted** ❌
**Problem**: Your IP address is not allowed
**Solutions**:
- Go to MongoDB Atlas → Network Access
- Add your current IP address
- Or add `0.0.0.0/0` to allow all IPs (development only)

### 5. **Database Permissions** ❌
**Problem**: User doesn't have write permissions
**Solutions**:
- Go to MongoDB Atlas → Database Access
- Ensure your user has `readWrite` role
- Or use `Atlas Admin` role for full access

## 🔍 **Step-by-Step Diagnosis**

### **Step 1: Test Connection**
```bash
cd backend
node test-connection.js
```

### **Step 2: Check Your .env File**
```bash
# Should contain:
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/SkillSwap?retryWrites=true&w=majority
JWT_SECRET=your-long-random-secret-key
PORT=5000
NODE_ENV=development
```

### **Step 3: Get Your Connection String**
1. Go to MongoDB Atlas Dashboard
2. Click "Connect" on your cluster
3. Choose "Connect your application"
4. Copy the connection string
5. Replace `<password>` with your actual password
6. Replace `<dbname>` with `SkillSwap`

### **Step 4: MongoDB Atlas Setup Checklist**
- [ ] Cluster is running (not paused)
- [ ] Database user created with password
- [ ] User has `readWrite` permissions
- [ ] IP address whitelisted (or 0.0.0.0/0 for development)
- [ ] Connection string is correct
- [ ] Database name is specified (SkillSwap)

## 🔧 **URL Encoding Special Characters**

If your password contains special characters, encode them:
```
@ → %40
: → %3A
/ → %2F
? → %3F
# → %23
[ → %5B
] → %5D
% → %25
```

## 🎯 **Test Your Setup**

### **1. Test Connection Only:**
```bash
cd backend
node test-connection.js
```

### **2. Test Full Server:**
```bash
cd backend
npm run dev
```

### **3. Test API Endpoints:**
```bash
# Health check
curl http://localhost:5000/api/health

# Register a user
curl -X POST http://localhost:5000/api/users/register \
  -H "Content-Type: application/json" \
  -d '{
    "username": "testuser",
    "email": "test@example.com",
    "password": "Test123",
    "firstName": "Test",
    "lastName": "User"
  }'
```

## 📊 **Expected Success Output**

When everything works, you should see:
```
✅ Successfully connected to MongoDB Atlas!
Database name: SkillSwap
✅ Successfully created test document: { _id: ..., name: 'Connection Test', createdAt: ... }
🎉 Your MongoDB Atlas connection is working perfectly!
```

## 🆘 **Still Having Issues?**

### **Check MongoDB Atlas Dashboard:**
1. **Cluster Status**: Should show "Active"
2. **Network Access**: Your IP should be listed
3. **Database Access**: User should have permissions
4. **Collections**: Should see data after successful operations

### **Common Error Messages:**
- `MongoServerSelectionTimeoutError` → IP whitelist issue
- `MongooseServerSelectionError` → Connection string/network issue
- `Authentication failed` → Wrong username/password
- `ENOTFOUND` → DNS/network issue

### **Quick Fix Commands:**
```bash
# Recreate .env file
echo "MONGODB_URI=your-connection-string-here" > backend/.env
echo "JWT_SECRET=your-secret-key" >> backend/.env
echo "PORT=5000" >> backend/.env
echo "NODE_ENV=development" >> backend/.env

# Test connection
cd backend && node test-connection.js
```

## 🔑 **Security Note**
- Never commit `.env` files to version control
- Use strong passwords for MongoDB users
- Restrict IP access in production
- Use environment-specific connection strings

---

**Need more help?** Run the test script and share the output!