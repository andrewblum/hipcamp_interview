from flask import Flask, redirect, request, session, jsonify, Response

app = Flask(__name__)
app.secret_key = "aksdjfhasdf"

todo_list = {1: {'title': 'create todo demo', 'done': 'true'}}

@app.route('/hi')
def homepage():
    return 'hi'

@app.route('/post', methods=['GET', 'POST'])
def post_request():

    # we want something from the body, not JSON encoded
    argument = request.form.get('key')
    print(request.form)

    # we want something from the query string 
    q_string = request.args.get('key')
    print(q_string)

    # we know its JSON encoded
    json_data = {}
    if request.is_json:
        json_data = request.get_json()
        print(json_data)
        print(json_data['key'])
        print(type(json_data))
    
    dic = {'hi': 'val', 'test': 'val2'}

    return jsonify(dic)

@app.route('/todos')
def todos():
    return jsonify(todo_list)

@app.route('/todo/<id>')
def get_todos(id):
    if id in todos: 
        return jsonify(todo_list[id])
    else:
        return 'Invalid', 404

@app.route('/todo', methods=['POST'])
def make_todo(id):
    todo = request.get_json()
    id = sorted(todo_list.keys())[-1] + 1
    todo_list[id] = todo
    return 'OK'

@app.route('/todo/<id>', methods=['UPDATE'])
def update_todo(id):
    if id in todos: 
        todo = request.get_json()
        todo_list[id] = todo
        return 'OK'
    else:
        return 'Invalid', 400

@app.route('/todo/<id>', methods=['DELETE'])
def delete_todo(id):
    if id in todos: 
        del todo_list[id]
        return 'OK'
    else:
        return 'Invalid', 400

if __name__ == "__main__":
    app.debug = True
    app.run(host="0.0.0.0")