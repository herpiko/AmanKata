from flask import Flask, request, render_template
from flask.ext.socketio import SocketIO, emit
app = Flask(__name__)

# GLOBAL VARIABLE
# Data users[userId] = {"socketIOsessId": "abc123de982321"}
users = {}

# Data chats
# Example: {"userId1": "wirama", "userId2": "ihe", ...} // Tambahi ihe kira2 opo ae seng perlu track untuk setiap sesi chat 
chats = []

# APP CONFIGURATION
app.debug = True
socketio = SocketIO(app)

# DATA VARIABLE MANAGEMENT
def addUser(userName):
    users[userName] = {}

def setSessIdofUser(userName, sessId):
    users[userName]['sessId'] = sessId

# Add more here

# HTML BASED ROUTE
@app.route("/")
def index():
    # Tampilkan laman Index
    return render_template("index.html")
    pass

@app.route("/chat")
def chatIndex():
    # Tampilkan laman utama chat   
    pass

# SOCKET.IO Event
# Initialized after client connected to a chat
@socketio.on('connect')
def onChatConnect():
    # Check if partner is connected
    # If yes, check if your parnet is intended to chat with you
    # If yes, emit chatStart event to client
    
    # emit("chatStart", ....) 
    
    # If no, do infinite loop here
    pass

@socketio.on('sendChatMessage')
def onSendChatMessage(message):
    pass

# MAIN PROGRAM
if __name__ == "__main__":
    app.run()
