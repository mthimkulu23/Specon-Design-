# Quick Testing Guide

## Starting the Application

```bash
cd "/Users/damacm1152/Desktop/SPECCON DESIGN/Specon-Design-"
python3 app.py
```

The app will be available at: **http://localhost:5000**

---

## Test Scenarios

### 1. Landing Page
- **URL**: http://localhost:5000/
- **Expected**: Landing page loads

### 2. Registration Flow
- **URL**: http://localhost:5000/register
- **Steps**:
  1. Fill in Full Name: "John Doe"
  2. Fill in Email: "john@example.com"
  3. Select User Type: "Patient"
  4. Fill in Contact: "1234567890"
  5. Fill in Password: "SecurePassword123"
  6. Confirm Password: "SecurePassword123"
  7. Click "Create Account"
- **Expected**: Success message, redirect to dashboard

### 3. Login Flow
- **URL**: http://localhost:5000/login
- **Steps**:
  1. Enter Username: auto-generated from email or custom
  2. Enter Password: "SecurePassword123"
  3. Click "Sign in"
- **Expected**: Success message, redirect to dashboard

### 4. Password Reset Flow
- **URL**: http://localhost:5000/forgot-password
- **Prerequisites**: Must be logged in (or modify the route)
- **Steps**:
  1. Fill in New Password: "NewSecurePass456"
  2. Confirm Password: "NewSecurePass456"
  3. Click "Reset Password"
- **Expected**: Success message, redirect to login

### 5. Logout
- **Endpoint**: POST /api/logout
- **Expected**: Session cleared, redirect to login

---

## API Testing with cURL

### Register User
```bash
curl -X POST http://localhost:5000/api/register \
  -H "Content-Type: application/json" \
  -d '{
    "fullName": "Jane Smith",
    "email": "jane@example.com",
    "username": "janesmith",
    "userType": "doctor",
    "contact": "9876543210",
    "password": "SecurePass456",
    "confirmPassword": "SecurePass456"
  }'
```

### Login
```bash
curl -X POST http://localhost:5000/api/login \
  -H "Content-Type: application/json" \
  -d '{
    "username": "janesmith",
    "password": "SecurePass456"
  }' \
  -c cookies.txt
```

### Reset Password
```bash
curl -X POST http://localhost:5000/api/reset-password \
  -H "Content-Type: application/json" \
  -b cookies.txt \
  -d '{
    "newPassword": "NewSecurePass789",
    "confirmPassword": "NewSecurePass789"
  }'
```

### Get Current User (requires login)
```bash
curl -X GET http://localhost:5000/api/user \
  -b cookies.txt
```

### Logout
```bash
curl -X POST http://localhost:5000/api/logout \
  -b cookies.txt
```

---

## Error Test Cases

### Invalid Email Format
- **Email**: "notanemail"
- **Expected**: Error message about invalid email

### Password Too Short
- **Password**: "short123"
- **Expected**: Error message - minimum 10 characters required

### Passwords Don't Match
- **Password**: "SecurePass123"
- **Confirm**: "DifferentPass123"
- **Expected**: Error message - passwords do not match

### Duplicate Username/Email
- **Register**: Use same email twice
- **Expected**: Error message - email already exists

### Missing Fields
- **Leave**: Any required field empty
- **Expected**: Error message - missing required fields

### Wrong Password at Login
- **Username**: "janesmith"
- **Password**: "WrongPassword"
- **Expected**: Error message - invalid username or password

---

## Database Inspection

### View SQLite Database
```bash
# Install sqlite3 if needed
# Then navigate to the project directory and run:
sqlite3 users.db

# In SQLite shell:
.tables
SELECT * FROM users;
.exit
```

---

## Common Issues & Solutions

| Issue | Solution |
|-------|----------|
| `ModuleNotFoundError: flask_sqlalchemy` | Run `pip install -r requirements.txt` |
| `Address already in use` | Change port in `app.py`: `app.run(debug=True, port=5001)` |
| Database file not created | App creates it automatically on first run |
| Session not persisting | Ensure cookies are enabled in browser |
| Script files not loading (404) | Check script paths in HTML files use `/scripts/` |

---

## Browser Developer Tools

### Check Network Requests
1. Open DevTools (F12)
2. Go to Network tab
3. Submit a form
4. Click on the request to view:
   - Request payload
   - Response headers
   - Response body

### Check Console
1. Open DevTools (F12)
2. Go to Console tab
3. Look for any JavaScript errors
4. Check fetch requests and responses

---

## Notes

- Default database: SQLite (`users.db`)
- Session timeout: Default Flask session (browser session)
- Password requirements: Minimum 10 characters
- User types: "doctor" or "patient"
- Username: Auto-generated from email if not provided

---

**Last Updated**: January 12, 2026
