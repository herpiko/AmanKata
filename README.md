AmanKata
========

Secure Web Based Chat using Node.js
## New in Version 2.0

* Multiuser group chat by default
* Per user certificate which contains : RSA + DHE public key + some user info
* User login with private key
* The point is, it uses key-exchange and message authentication now

## Dependency
* Node.js (http://nodejs.org/)
  * Express Framework (http://expressjs.com/)
  * ejs Templating Engine (http://embeddedjs.com/)
  * Socket.io (http://socket.io/)
  * MongoDB (http://mongodb.org)

## How to install

* Download and install node.js (http://nodejs.org/download/).
* Open terminal emulator/cmd, cd (change directory) to this directory.
* Run <code>npm install</code> to install all dependency.
* Start the VeriNice server from verinice/ directory using <code>node application.js</code>.
* Start the server using <code>node application.js</code>.

## Resources

* https://github.com/Caligatio/jsSHA/
* http://leemon.com/crypto/BigInt.html
* http://www.cryogenius.com/software/primes/
