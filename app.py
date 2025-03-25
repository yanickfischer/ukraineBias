from flask import Flask, send_from_directory

app = Flask(__name__, static_folder="frontend")

@app.route("/")
def serve_index():
    return send_from_directory(app.static_folder, "index.html")

"""🔥 Bonus-Tipp (optional):

Falls du später mal mit /predict, /report, etc. arbeitest, 
kannst du dir mit @app.route("/predict", methods=["POST"]) weitere Routen aufbauen – die index.html bleibt davon unberührt."""