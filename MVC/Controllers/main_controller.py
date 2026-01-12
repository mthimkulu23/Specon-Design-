from flask import Blueprint, render_template, request, jsonify, session, redirect, url_for
from MVC.Models.user_model import db, User
from functools import wraps


main_blueprint = Blueprint('main', __name__)


def login_required(f):
    """Decorator to check if user is logged in"""
    @wraps(f)
    def decorated_function(*args, **kwargs):
        if 'user_id' not in session:
            return redirect(url_for('main.login'))
        return f(*args, **kwargs)
    return decorated_function


# ========== PAGE ROUTES ==========

@main_blueprint.route('/')
def home():
    return render_template('Frontend/landing.html')


@main_blueprint.route('/login')
def login():
    if 'user_id' in session:
        return redirect(url_for('main.dashboard'))
    return render_template('Frontend/Login.html')


@main_blueprint.route('/register')
def register():
    if 'user_id' in session:
        return redirect(url_for('main.dashboard'))
    return render_template('Frontend/register.html')


@main_blueprint.route('/forgot-password')
def forgot_password():
    return render_template('Frontend/forgetPassword.html')


@main_blueprint.route('/dashboard')
@login_required
def dashboard():
    user = User.query.get(session['user_id'])
    return render_template('Frontend/dashboard.html', user=user)


# ========== API ROUTES ==========

@main_blueprint.route('/api/register', methods=['POST'])
def api_register():
    """Handle user registration"""
    try:
        data = request.get_json()
        
        # Validate required fields
        required_fields = ['fullName', 'email', 'username', 'userType', 'contact', 'password', 'confirmPassword']
        if not all(field in data for field in required_fields):
            return jsonify({'success': False, 'message': 'Missing required fields'}), 400
        
        # Validate passwords match
        if data['password'] != data['confirmPassword']:
            return jsonify({'success': False, 'message': 'Passwords do not match'}), 400
        
        # Validate password length
        if len(data['password']) < 10:
            return jsonify({'success': False, 'message': 'Password must be at least 10 characters long'}), 400
        
        # Check if username or email already exists
        existing_user = User.query.filter_by(username=data['username']).first()
        if existing_user:
            return jsonify({'success': False, 'message': 'Username already exists'}), 409
        
        existing_email = User.query.filter_by(email=data['email']).first()
        if existing_email:
            return jsonify({'success': False, 'message': 'Email already exists'}), 409
        
        # Create new user
        new_user = User(
            username=data['username'],
            email=data['email'],
            full_name=data['fullName'],
            user_type=data['userType'],
            contact=data['contact'],
            password=data['password']
        )
        
        db.session.add(new_user)
        db.session.commit()
        
        # Log the user in
        session['user_id'] = new_user.id
        session['username'] = new_user.username
        
        return jsonify({'success': True, 'message': 'Registration successful!', 'user': new_user.to_dict()}), 201
    
    except Exception as e:
        db.session.rollback()
        return jsonify({'success': False, 'message': f'An error occurred: {str(e)}'}), 500


@main_blueprint.route('/api/login', methods=['POST'])
def api_login():
    """Handle user login"""
    try:
        data = request.get_json()
        
        # Validate required fields
        if not data.get('username') or not data.get('password'):
            return jsonify({'success': False, 'message': 'Username and password required'}), 400
        
        # Find user by username
        user = User.query.filter_by(username=data['username']).first()
        
        if not user or not user.check_password(data['password']):
            return jsonify({'success': False, 'message': 'Invalid username or password'}), 401
        
        # Set session
        session['user_id'] = user.id
        session['username'] = user.username
        
        return jsonify({'success': True, 'message': 'Login successful!', 'user': user.to_dict()}), 200
    
    except Exception as e:
        return jsonify({'success': False, 'message': f'An error occurred: {str(e)}'}), 500


@main_blueprint.route('/api/forgot-password', methods=['POST'])
def api_forgot_password():
    """Handle password reset request"""
    try:
        data = request.get_json()
        
        if not data.get('email'):
            return jsonify({'success': False, 'message': 'Email is required'}), 400
        
        user = User.query.filter_by(email=data['email']).first()
        
        if not user:
            # For security, don't reveal if email exists
            return jsonify({'success': True, 'message': 'If an account with this email exists, a password reset link has been sent'}), 200
        
        # In a production app, you would:
        # 1. Generate a reset token
        # 2. Save it to the database with an expiration time
        # 3. Send an email with the reset link
        # For now, we'll just return a success message
        
        return jsonify({'success': True, 'message': 'Password reset link has been sent to your email'}), 200
    
    except Exception as e:
        return jsonify({'success': False, 'message': f'An error occurred: {str(e)}'}), 500


@main_blueprint.route('/api/reset-password', methods=['POST'])
def api_reset_password():
    """Handle password reset"""
    try:
        # Check if user is logged in (they would need to be authenticated to reset)
        if 'user_id' not in session:
            return jsonify({'success': False, 'message': 'User not authenticated'}), 401
        
        data = request.get_json()
        
        # Validate passwords match
        if data.get('newPassword') != data.get('confirmPassword'):
            return jsonify({'success': False, 'message': 'Passwords do not match'}), 400
        
        # Validate password length
        if len(data.get('newPassword', '')) < 10:
            return jsonify({'success': False, 'message': 'Password must be at least 10 characters long'}), 400
        
        user = User.query.get(session['user_id'])
        if not user:
            return jsonify({'success': False, 'message': 'User not found'}), 404
        
        user.set_password(data['newPassword'])
        db.session.commit()
        
        return jsonify({'success': True, 'message': 'Password reset successful!'}), 200
    
    except Exception as e:
        db.session.rollback()
        return jsonify({'success': False, 'message': f'An error occurred: {str(e)}'}), 500


@main_blueprint.route('/api/logout', methods=['POST'])
def api_logout():
    """Handle user logout"""
    session.clear()
    return jsonify({'success': True, 'message': 'Logged out successfully'}), 200


@main_blueprint.route('/api/user', methods=['GET'])
@login_required
def api_get_user():
    """Get current user information"""
    user = User.query.get(session['user_id'])
    if not user:
        return jsonify({'success': False, 'message': 'User not found'}), 404
    
    return jsonify({'success': True, 'user': user.to_dict()}), 200


