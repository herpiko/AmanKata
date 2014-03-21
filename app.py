from flask import Flask
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

# HTML BASED ROUTE
@app.route("/")
def index():
    # Tampilkan laman Index
    pass

@app.route("/chat")
def chatIndex():
    # Tampilkan laman utama chat   
    pass

# JSON BASED ROUTE
@app.route("/requestChat")
def requestChat():
    # Kirimkan data yang diperlukan untuk chat dua orang, termasuk seed awal mungkin
    pass

# SOCKET.IO Event
# Initialized after client requesting a chat to someone
@socketio.on('connect')
def onChatConnect():
    pass

@socketio.on('sendChatMessage')
def onSendChatMessage():
    pass

# MAIN PROGRAM
if __name__ == "__main__":
    app.run()
