# backend-dev

<h1>how to make backend project step by step guide</h1>

<p>1.) do npm init and make your package.json file</p><br>
<p>2.) make index.js file and write this code (this will me used in every backend)</p><br>
<img width="580" height="155" alt="image" src="https://github.com/user-attachments/assets/ce6db17d-3be5-43f2-8d8f-c06b3bc2bd8b" />
<br>
<p>make connect.js file and write this code</p>
<img width="429" height="243" alt="image" src="https://github.com/user-attachments/assets/148d75b2-927e-4efd-a163-d28882b90b22" />
<br>
<p>and then import this into index.js by doing </p><br>
<p>const {connectToMongoDB} = require("./connect"); <br>
connectToMongoDB('mongodb://localhost:"write port here by doing mongosh in terminal/Database_name')</p>
<p>3.)make folders named: routes , controllers , views , middlewares , models , service</p>
<p>4.)we will 1st start working in model folder ; we will require mongoose here and then assign schema variable = new mongoose.Schema({ 
//our schema });</p><br>
<p>then we will create a model (momgoose.model) give it some name and export that variable of model</p><br>
<p>5.) now we will start working in routes folder</p><br>
<p>firstly , we will require express here and assign router variable to express.Router()</p><br>
<p>how we will make all the routes we have to make for eg: router.post('/')</p>
<br>
<p>now we will go in controllers folder and make async functions for our routes and then import that into the routes folder </p>
<br><p>import the routes folder in index.js and do app.use for that variable </p>



