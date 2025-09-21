rest api using mongodb , express with different modules 


<h1>mvc pattern</h1>
<br>
<h3>mvc stands for model view controller</h3>
<br>
<img width="774" height="609" alt="image" src="https://github.com/user-attachments/assets/69980950-e55d-425e-87dd-dedec7e877ae" />
<br>
<p>the controller manipulates the model , and the model updates the view </p>
<br>
<img width="330" height="410" alt="image" src="https://github.com/user-attachments/assets/115e24e7-6c7d-42e6-b6a3-fa3085b172ce" />
<br>
<p>if we will write all code in one index.js file then mantainability will be an issue , so to resolve that we refactor it into mvc</p><br><p>
index.js will contain only the overview and flow of work , here we will only import all the files made in different directories<br> models folder ( we will require mongoose here) will contain all schema (define the structure) ,using this schema we make model and using this model we do crud operations and we will export this file</p> <br>
 <p>now in the routes folder first we will require express , and we will make a variable for express.Router , here we will keep all our routes ( the specific path or endpoint within the application that is being requested, such as the /about in https://www.example.com/about. ) and then export it<br>then we will make a connection.js and a middleware folder contaning middleware code <br> then we will make a controller folder which will contain the logic of routes also known as handlers , so basically it contains some functions that we will attach with are routes
</p>

