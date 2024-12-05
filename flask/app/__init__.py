from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from config.config import Config

db = SQLAlchemy()

def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)

    # Initialize extensions
    db.init_app(app)

    # Register blueprints
    from .controllers.coin_analysis_controller import coin_analysis_bp
    app.register_blueprint(app.register_blueprint(coin_analysis_bp, url_prefix='/api/coins'))

    return app