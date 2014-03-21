from flask import Flask, request, render_template, redirect
from flask.ext.socketio import SocketIO, emit
app = Flask(__name__)

# GLOBAL VARIABLE
# Data users[userId] = {"socketIOsessId": "abc123de982321"}
users = {}

# Data chats
# Example: {"userId1": "wirama", "userId2": "ihe", ...} // Tambahi ihe kira2 opo ae seng perlu track untuk setiap sesi chat 
chats = {}

# APP CONFIGURATION
app.debug = True
socketio = SocketIO(app)

# DATA VARIABLE MANAGEMENT
def addUser(userName):
    users[userName] = {}

def setSessIdofUser(userName, sessId):
    users[userName]['sessId'] = sessId

def isUserExist(username):
	if username in users:
		return True
	return False

def addChat(username1, username2):
	if username1 in chats:
		if username2 in chats[username1]:
			return False
	
	if username2 in chats:
		if username1 in chats[username2]:
			return False
	
	chats[username1] = {}
	chats[username1][username2] = {}
	return True
	
def getSocketIdFromUser(username):
	return users[username]['sessId']


# HTML BASED ROUTE
@app.route("/")
def index():
    # Tampilkan laman Index
	return render_template("index.html")
	pass

@app.route("/chat", methods=['POST'])
def chatIndex():
    # Tampilkan laman utama chat
	your_username = request.form['your_username']
	partner_username = request.form['partner_username']
	
	if isUserExist(your_username):
		return redirect("/")
	else:
		addUser(your_username)
		if addChat(your_username, partner_username):
			return render_template("chat.html", your_username = your_username, partner_username = partner_username)
		else:
			return redirect("/")
	pass

# SOCKET.IO Event
# Initialized after client connected to a chat
@socketio.on('connect')
def onChatConnect(data):
	emit("balasConnectTrigger")
	#your_username = data.your_username
	#partner_username = data.partner_username
    
	# Check if partner is connected
	#while(not (isUserExist(partner_username))):
	#	pass
	#setSessIdofUser(your_username, socketio.id)
	#emit("chatStart")
    # If yes, check if your parnet is intended to chat with you
    # If yes, emit chatStart event to client
    
    # emit("chatStart", ....) 
    
    # If no, do infinite loop here

@socketio.on('balasConnect')
def onBalasChatConnect(data):
	your_username = data.your_username
	partner_username = data.partner_username
    
	# Check if partner is connected
	while(not (isUserExist(partner_username))):
		pass
	setSessIdofUser(your_username, socketio.id)
	emit("chatStart")
    
@socketio.on('sendChatMessage')
def onSendChatMessage(data):
    socketio.socket(getSocketIdFromUser(data.destination_username)).emit("receiveMessage", data.message);

# MAIN PROGRAM
if __name__ == "__main__":
    app.run()
