from flask import Flask, render_template

app = Flask(__name__)


@app.route("/")
def index():
    return render_template("index.html")


@app.route("/tim")
def tim():
    return render_template("tim.html")


@app.route("/istrazuvanje")
def istrazuvanje():
    return render_template("istrazuvanje.html")


@app.route("/materijali")
def materijali():
    return render_template("materijali.html")


@app.route("/konferencija")
def konferencija():
    return render_template("konferencija.html")


@app.route("/vesti")
def vesti():
    return render_template("vesti.html")


@app.route("/kontakt")
def kontakt():
    return render_template("kontakt.html")


@app.route("/linkovi")
def linkovi():
    return render_template("linkovi.html")


if __name__ == "__main__":
    app.run(debug=True)
