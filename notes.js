/*

concurrently will start both the client and server together for development mode.
"scripts": {
	"dev": "concurrently \"cd backend && npm run dev\" \"cd frontend && npm start\" "
^this is in the package.json file in the root folder of the project,
and starts the server folder with npm run dev,
and starts the client folder with npm start

"scripts": {
    "start": "vite"
^this is in the package.json file in the client folder (frontend),
and vite is what will start during npm start,
and vite can be changed to whatever you are using to start the project

*/