from flask import Flask
from MVC.Controllers.main_controller import main_blueprint
from MVC.Models.user_model import db
import os


app = Flask(__name__)

# Configuration
app.config['SECRET_KEY'] = os.environ.get('SECRET_KEY', 'dev-secret-key-change-in-production')
app.config['SQLALCHEMY_DATABASE_URI'] = os.environ.get('DATABASE_URL', 'sqlite:///users.db')
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['JSON_SORT_KEYS'] = False

# Initialize database
db.init_app(app)

# Register blueprint
app.register_blueprint(main_blueprint)

# Create database tables
with app.app_context():
    db.create_all()

if __name__ == "__main__":
    app.run(debug=True)

