"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User
from api.utils import generate_sitemap, APIException
from flask_cors import CORS

api = Blueprint('api', __name__)

# Allow CORS requests to this API
CORS(api)


@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():

    response_body = {
        "message": "Los servidores del backend estan corriendo!"
    }

    return jsonify(response_body), 200


@api.route('/signup', methods=['POST', 'GET'])
def handle_signup():
    response_body = {
        "message": "Estoy mandando este mensaje desde routes.py babbbbyyyy"
    }
    return jsonify(response_body), 200