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

board = [['-', '-', '-'],
        ['-', '-', '-'],
        ['-', '-', '-']]

@app.route('/board')
def get_board():
    return jsonify(board)

def is_game_over(): 
    winner = '-'
    for row in range(3):
        val = board[row][0] + board[row][1] + board[row][2] 
        if val == 'XXX': 
            winner = 'X'
        if val == 'OOO':
            winner = 'O'
    for col in range(3):
        val = board[0][col] + board[1][col] + board[2][col] 
        if val == 'XXX':
            winner = 'X'
        if val == 'OOO':
            winner = 'O'
    val = board[0][0] + board[1][1] + board[2][2] 
    if val == 'XXX':
        winner = 'X'
    if val == 'OOO':
        winner = 'O'
    val = board[0][2] + board[1][1] + board[2][0] 
    if val == 'XXX':
        winner = 'X'
    if val == 'OOO':
        winner = 'O'
    return winner 


@app.route('/board', methods=['PUT'])
def update_board():
    
    data = request.get_json()
    print('got here')
    print(data)
    x = int(data.get('x'))
    y = int(data.get('y'))
    value = data.get('value')

    if x < 0 or x > 2 or y < 0 or y > 2:
        return 'Invalid Move', 400
    if value != 'X' and value != 'O':
        return 'Invalid Move', 400
    if board[x][y] != '-':
        return 'Invalid Move', 400
    board[x][y] = value

    game_over = False
    winner = is_game_over()
    if winner != '-':
        game_over = True
    
    data = {
        'board': board,
        'game_over': winner != '-',
        'winner': winner
    }  

    return jsonify(data)

if __name__ == "__main__":
    app.debug = True
    app.run(host="0.0.0.0")