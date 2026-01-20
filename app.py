from flask import Flask
from MVC.Controllers.main_controller import main_blueprint

app = Flask(__name__)

# Configure secret key for session management
app.secret_key = 'your-secret-key-here-change-in-production'

# Register blueprint
app.register_blueprint(main_blueprint)

if __name__ == "__main__":
    app.run(debug=True)


