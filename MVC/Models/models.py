class Patient:
    # Simulated database table for Patients
    _db = [
        {"id": 1, "name": "John Smith", "email": "john@example.com", "bmi": "24.1"},
        {"id": 2, "name": "Jane Doe", "email": "jane@example.com", "bmi": "21.5"},
        {"id": 3, "name": "Sasekani", "email": "sasekani@example.com", "bmi": "22.5"}
    ]

    @classmethod
    def get_all(cls):
        return cls._db

    @classmethod
    def get_count(cls):
        return len(cls._db)

class Appointment:
    # Simulated database table for Appointments
    _db = [
        {"id": 1, "patient_name": "John Smith", "doctor": "Dr. Smith", "time": "10:00 AM", "date": "15 July", "status": "Confirmed", "class": "confirmed"},
        {"id": 2, "patient_name": "Jane Doe", "doctor": "Dr. Smith", "time": "11:30 AM", "date": "15 July", "status": "Pending", "class": "pending"},
        {"id": 3, "patient_name": "Sasekani", "doctor": "Dr. Smith", "time": "14:30 AM", "date": "15 July", "status": "Confirmed", "class": "confirmed"}
    ]

    @classmethod
    def get_today_appointments(cls):
        # In a real app, this would query active appointments for today
        return cls._db

    @classmethod
    def get_appointments_by_patient(cls, patient_name):
        return [appt for appt in cls._db if appt["patient_name"] == patient_name]

class Activity:
    # Simulated database table for Activities/Notifications
    _db = [
        {'title': 'Patient John Smith', 'subtitle': 'has upcoming appointment', 'time': '1h'},
        {'title': 'New Lab results are Available', 'subtitle': '', 'time': '2h'},
        {'title': 'Prescription for Jane Doe', 'subtitle': 'Needs renewal', 'time': '4h'}
    ]

    @classmethod
    def get_recent_activities(cls):
        return cls._db
