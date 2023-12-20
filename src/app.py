"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
import os
from flask import Flask, request, jsonify, url_for, send_from_directory
from flask_migrate import Migrate
from flask_swagger import swagger
from api.utils import APIException, generate_sitemap
from api.models import db, User
from api.routes import api
from api.admin import setup_admin
from api.commands import setup_commands
from flask_jwt_extended import create_access_token
from flask_jwt_extended import get_jwt_identity
from flask_jwt_extended import jwt_required
from flask_jwt_extended import JWTManager
from flask_cors import CORS


# from models import Person

ENV = "development" if os.getenv("FLASK_DEBUG") == "1" else "production"
static_file_dir = os.path.join(os.path.dirname(
    os.path.realpath(__file__)), '../public/')
app = Flask(__name__)
CORS(app, resources={r"/api/*": {"origins": "https://fuzzy-space-barnacle-rjw954q656phxgx5-3000.app.github.dev"}}, supports_credentials=True)
app.url_map.strict_slashes = False

# database condiguration
db_url = os.getenv("DATABASE_URL")
if db_url is not None:
    app.config['SQLALCHEMY_DATABASE_URI'] = db_url.replace(
        "postgres://", "postgresql://")
else:
    app.config['SQLALCHEMY_DATABASE_URI'] = "sqlite:////tmp/test.db"

app.config["JWT_SECRET_KEY"] = "La super mega Encriptacion de Jose, el secreto mejor guardado del mundo."
jwt = JWTManager(app)

app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
MIGRATE = Migrate(app, db, compare_type=True)
db.init_app(app)

# add the admin
setup_admin(app)

# add the admin
setup_commands(app)

# Add all endpoints form the API with a "api" prefix
app.register_blueprint(api, url_prefix='/api')

CORS(app, resources={r"/api/*": {"origins": "https://fuzzy-space-barnacle-rjw954q656phxgx5-3000.app.github.dev"}}, supports_credentials=True)
# Handle/serialize errors like a JSON object



@app.errorhandler(APIException)
def handle_invalid_usage(error):
    return jsonify(error.to_dict()), error.status_code

# generate sitemap with all your endpoints


@app.route('/')
def sitemap():
    if ENV == "development":
        return generate_sitemap(app)
    return send_from_directory(static_file_dir, 'index.html')

# any other endpoint will try to serve it like a static file


@app.route('/<path:path>', methods=['GET'])
def serve_any_other_file(path):
    if not os.path.isfile(os.path.join(static_file_dir, path)):
        path = 'index.html'
    response = send_from_directory(static_file_dir, path)
    response.cache_control.max_age = 0  # avoid cache memory
    return response

#Traer todos los usuarios
@app.route('/user', methods=['GET'])
def get_users():
    all_users = User.query.all()
    result = list(map(lambda user: user.serialize(), all_users))

    return jsonify(result), 200

#Traer un usuario por su ID
@app.route('/user/<int:user_id>', methods=['GET'])
@jwt_required()
def get_user(user_id):
    one_user = User.query.filter_by(id=user_id).first()

    basic_info = request.args.get('basic', False)

    if basic_info and basic_info.lower() == 'true':
        return jsonify(one_user.serialize_basic()), 200
    else:
        return jsonify(one_user.serialize()), 200

#Login
@app.route("/login", methods=["POST"])
def login():
    email = request.json.get("email", None)
    password = request.json.get("password", None)
    user = User.query.filter_by(email=email).first()

    if user is None or user.email == "None":
        return jsonify({"msg":"Error en el Email"}), 401
    
    if user.password != password:
        return jsonify({"msg":"Error en el password"}), 401

    access_token = create_access_token(identity=email)
    return jsonify(access_token=access_token)


# Crar un nuevo usuario
@app.route('/signup', methods=['POST'])
def create_new_user():
    data = request.get_json()

    new_user = User(
        email=data['email'],
        password=data['password'],
        is_active=bool(data['is_active'])
    )

    db.session.add(new_user)
    db.session.commit()

    response_body = {"msg": f"El Usuario {new_user.email} se creo correctamente."}
    return jsonify(response_body)




# this only runs if `$ python src/main.py` is executed
if __name__ == '__main__':
    PORT = int(os.environ.get('PORT', 3001))
    app.run(host='0.0.0.0', port=PORT, debug=True)
