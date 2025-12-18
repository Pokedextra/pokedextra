from flask import Blueprint, render_template

main = Blueprint('main', __name__)

@main.route("/")
def index():
    return render_template("index.html")

@main.route("/pokemon/<pokemon_name>")
def pokemon(pokemon_name):
    return render_template("pokemon.html", pokemon_name=pokemon_name)