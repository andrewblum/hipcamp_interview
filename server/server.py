from flask import Flask, redirect, request, session, jsonify
from flask_debugtoolbar import DebugToolbarExtension

app = Flask(__name__)
app.secret_key = "aksdjfhasdf"

@app.route('/hi')
def homepage():
    return 'hi'

@app.route('/post', methods=['GET', 'POST'])
def post_request():

    # if we want something from the body if not JSON
    argument = request.form.get('key_name')

    # we want something from the query string 
    q_string = request.args.get('key_name')

    # we want know its JSON
    json_data = {}
    if request.is_json():
        json_data = request.get_json()
    
    dic = {'hi', 'val'}

    return jsonify(dic)

if __name__ == "__main__":
    app.debug = True
    DebugToolbarExtension(app)
    app.run(host="0.0.0.0")