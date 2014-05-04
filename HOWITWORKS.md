# AmanKata version 2.0 -  Program design guideline

Created by Ivan Hendrajaya, Processed by Wiramaswara, Reviewed by Ali and Haidar

## In version 1.0

In previous version, this program is rather simple: It is only permitting two party chat per session. Every user log into the system by using its first party user id and third party user id. Both user id is freely choosen as long as it doesn't used in current session. When the session started, it waited for third party to log in yet the chat is started. The third part uses its user id and first party user id for login purposes.

Every message is encrypted by using AES-CBC algorithm by using different key every single message. The key is extracted using Blum-Blum-Shub Pseudorandom Generator Algorithm from the given seed which sended shortly after all party is connected.

## The Basic

### Architecture

There is two sub-system built for AmanKata for this purpose : the chat system (AmanKatakata) and digital certificate (VeriNice) authority.

Chat system is an user interface for every user to connect and uses AmanKata. It provided an interface for every user to log inside of it, initiate a chat session and do message exchange inside a chat session. Every user who wants to use this system MUST BE REGISTERED. Registered user shall be provided with an user id which he/she must remembered, a certificate which holded inside application database per user id and a private key which must be holded by its owner and do not shared with other. 

The second system which is digital certificate authority is responsible to issue a new certificate for every new user who wants to join. The certificate is signed by using VeriNice's own RSA private key so it can be verified by using the public key counterpart.

AmanKatakata and VeriNice shall be connected each other by single lane socket so that every new user who want to register with AmanKatakata interface shall be signed its certificate by passing it into VeriNice and passing it back as a signed certificate. 

### User Certificate

The unsigned user certificate format is plain JSON text file which contains some field :

* user_id
* dhe_public_key
* rsa_public_key

Yes, there are two public/private key pair used in this system, I will tell you its purposes later on here..

### Chat Message Format

The chat message format look like this :

* group_id
* source_user_id
* destination_user_id
* message_salt
* message_iv
* message_cipher_aes
* message_cipher_rsa

### Client-sided HTML5 Storage

Client-sided HTML5 Storage is used for authentication purposes for client to be connected. When the user opened AmanKatakata and the client-sided HTML5 Storage is actually exist, the system won't ask anything and just go straight to the dashboard system as logged in user.

The format look like this :

* user_id
* private_key_dhe
* private_key_rsa

## The Steps
### Registration Process (/register)

* The user access /register page
* He/she provides his/her user id.
* The client-side JavaScript then take the part :
  * It created a pair of public/private key in DHE/RSA format.
  * Then it created the certificate, and passess them into VeriNice system (via AmanKatakata server) (SocketIO: onRegisterUser)
  * Then the signed certificate passed back into the user.
* Now the user are provided with a certificate and private key (in copy-able textbox format instead of file), they must reserved it and its user id so he/she can join in system.

### Login Process (/login)

* Check the client-sided session HTML5 Storage. If it exist, them just open dashboard page, otherwise go to the next step.
* When the user facing login page, he/she will provided his/her user id, password and copy-pasted his/her private key into designated box.
* The client-side JavaScript then :
  * Changes to /chat page.
  * And also save the current user id, md5 hashed password and private key inside the client-sided session HTML5 Storage.

### Chat Page (/chat)

* When there is no client-sided HTML5 Storage, redirect to /login page, otherwise go to next step
* When there is a HTML5 Storage, the client-sided JavaScript check if user id and password combination is correct (SocketIO: onDoLogin), when it return false, turn back into /login page
* The user has two choices : Create a new chat group session and Joined a current established group session.

#### Create a new chat group session

* The user must explicitly click "Create a new Chat Session"
* Then he/she must provided every single user id who joined this chat session.
* When it done, the client sided JavaScript:
  * Tell the server if there is new Group Session and also tell whoever joining it (SocketIO: onNewGroup).
  * The server will tell newly created group ID
  * Open a new JS tab with new group id and its joining user.
  
#### Join Current Established Group Session

* Upon opening /chat page, the client sided JS asks to AmanKatakata server if there are some group from which he/she is joined in it. (SocketIO: onRequestGroupSession)
* If there is, open new JS tab for every group session.
 

#### Group session JS Tab

##### First-time Opened

* It tells to AmanKatakata server if the user who logged in is login in respective group (SocketIO: onTellLogin).
* It request every single certificate of joined user in respective group (SocketIO: onRequestCertificate)

##### Send Chat

* For every other user (beside himself/herself) who joined in a group, send a message with encryption (SocketIO: onSendChat).

## The SocketIO Protocol

### AmanKataKata Server
#### registerUser
* Input: 
  * new_user_id
  * new_user_certificate
* Process:
  * Pass the certificate to VeriNice
  * If the certificated passed back, then save it into database. Otherwise, return null.
* Output: 
  * Signed certificate 
  * null --> The certificate can't be signed

#### doLogin
* Input: 
  * user_id
  * password_md5
* Process:
  * Check in MongoDB if the credential is correct.
  * If credential correct, remembered the socket object of its newly logged in user id inside local server variable
* Return: true/false

#### newGroup
* Input:
  * group_host_user_id
  * group_guest_user_id[]
* Process:
  * Add the newly created group into local server variable
  * Emit newGroupClient to client if the user id has associated with its socketIO object
  
#### requestGroupSession
* Input: -
* Process:
  * Check if there is group session exist for user id who emit this event
* Output:
  * group[]
    * group_id
    * group_host_user_id
    * group_host_certificate
    * group_guest_user_id[]
    * group_guest_user_certificate[]

#### requestCertificate
* Input: userID
* Process:
  * Read MongoDB database for its user certificate
* Output:
  * The certificate of a userID

#### tellLogin
* Input: group_id
* Process:
  * emit "tellLoginClient" for every connected client with user_id and its group_id
* Output: -

#### sendChat
* Input:
  * group_id
  * the_message
* Process:
  * Emit "retrieveChatClient" on every logged in client with designated message
* Output:
  * -

### Login and Dashboard Page
### Chat Page
