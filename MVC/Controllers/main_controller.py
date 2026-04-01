from flask import Blueprint, render_template, session, redirect, url_for, request, jsonify
from datetime import datetime
import calendar
from MVC.Models.models import Patient, Appointment, Activity

main_blueprint = Blueprint('main', __name__)

@main_blueprint.route('/')
def home():
    return render_template('Frontend/landing.html')

@main_blueprint.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        # Get form data
        data = request.get_json() if request.is_json else request.form
        username = data.get('username')
        password = data.get('password')
        role = data.get('role', 'patient')  # Default to patient if not specified
        
        # Simple validation (in production, you'd verify against database)
        if username and password:
            # Store user info in session
            session['username'] = username
            session['role'] = role
            session['logged_in'] = True
            
            # Redirect based on role
            if role == 'doctor':
                if request.is_json:
                    return jsonify({'success': True, 'redirect': url_for('main.doctor_dashboard')})
                return redirect(url_for('main.doctor_dashboard'))
            else:
                if request.is_json:
                    return jsonify({'success': True, 'redirect': url_for('main.patient_dashboard')})
                return redirect(url_for('main.patient_dashboard'))
        else:
            if request.is_json:
                return jsonify({'success': False, 'message': 'Invalid credentials'}), 401
            return redirect(url_for('main.login'))
    
    return render_template('Frontend/Login.html')

@main_blueprint.route('/register')
def register():
    return render_template('Frontend/register.html')

@main_blueprint.route('/forgot-password')
def forgot_password():
    return render_template('Frontend/forgetPassword.html')

@main_blueprint.route('/promotions')
def promotions():
    return render_template('Frontend/promotions.html')

@main_blueprint.route('/doctor-dashboard')
def doctor_dashboard():
    # Check if user is logged in and is a doctor
    if not session.get('logged_in') or session.get('role') != 'doctor':
        return redirect(url_for('main.login'))
        
    # Calendar Data (Dynamic)
    now = datetime.now()
    cal = calendar.Calendar(firstweekday=0)
    month_days = list(cal.itermonthdays(now.year, now.month))
    
    appointments = Appointment.get_today_appointments()
    activities = Activity.get_recent_activities()
    patient_count = Patient.get_count()

    # Data fetched from simulated database models
    dashboard_data = {
        'stats': {
            'today_appointments': len(appointments),
            'patient_count': patient_count,
            'lab_results_pending': 5
        },
        'appointments': appointments,
        'activities': activities,
        'calendar': {
            'days': month_days,
            'today': now.day,
            'month': now.strftime("%B"),
            'year': now.year
        }
    }
    
    return render_template('Frontend/doctor_dashboard.html', **dashboard_data)

@main_blueprint.route('/patient-dashboard')
def patient_dashboard():
    # Check if user is logged in and is a patient
    if not session.get('logged_in') or session.get('role') != 'patient':
        return redirect(url_for('main.login'))
        
    # Mock Data for Patient Dashboard
    username = session.get('username', 'Sasekani')
    appointments = Appointment.get_appointments_by_patient(username)
    
    upcoming_appointments = []
    for app in appointments:
        date_parts = app['date'].split(' ')
        day = date_parts[0] if len(date_parts) > 0 else '15'
        month = date_parts[1] if len(date_parts) > 1 else 'July'
        upcoming_appointments.append({
            'day': day, 'month': month, 'doctor': app['doctor'], 'time': app['time']
        })
        
    if not upcoming_appointments:
        upcoming_appointments = [
            {'day': '30', 'month': 'June', 'doctor': 'Dr. Smith', 'time': '10:00 PM'},
            {'day': '2', 'month': 'July', 'doctor': 'Marry Jonson', 'time': '1:30 PM'}
        ]

    # Data fetched from simulated database models
    patient_data = {
        'patient_name': username,
        'upcoming_appointments': upcoming_appointments,
        'health_summary': {
            'bmi': '22.5'
        },
        'recent_messages': [
            {'sender': 'Manelisi Ncwaba', 'content': 'Reminder for check-up', 'image': 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=150&h=150&fit=crop'}
        ]
    }
    
    return render_template('Frontend/patient_dashboard.html', **patient_data)

@main_blueprint.route('/bookings')
def bookings():
    # Mock data for the bookings page
    bookings_data = {
        'page_title': 'Doctors Bookings From Patients'
    }
    return render_template('Frontend/bookings.html', **bookings_data)

@main_blueprint.route('/logout')
def logout():
    session.clear()
    return redirect(url_for('main.home'))
