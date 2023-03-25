let express = require('express')
//intinya ini distactinc dari mongodb.MongoClient jadi kita hanya inmpirt object 
//MongoClient dari mongodb maka kita tulis {MongoClient}
let { MongoClient } = require("mongodb")
let app = express()
let db 


async function go() {
    let client = new MongoClient("mongodb://localhost:27017/TodoApp?retryWrites=true&w=majority")
    await client.connect() //wait conection ada beberapa lama mulai dari 3ms sd 3000 takk hingga maka nya pakai await
     db = client.db()
     app.listen(5000)
}
    //ini utk local saja 
 
  go()  
  
    




app.use(express.urlencoded({extended:false}))




//utk get di end-point : "/create-item"
  app.get("/",function(req,res){
    //begitu user/client klik alamat maka  kita suguhkan interface/antarmuka 
    //dari html.css bootstrap kita pake cdn link ke bootstrap 
    res.send(` 
    <!DOCTYPE html>
    <html>
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width,initial-scale=1.0">
            <title>Simple Todo App</title>
            <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.6.2/dist/css/bootstrap.min.css" integrity="sha384-xOolHFLEh07PJGoPkLv1IbcEPTNtaed2xpHsD9ESMhqIYd0nLMwNLD69Npy4HI+N" crossorigin="anonymous">
        </head>
        <body>
            <div class="container">
                <h1 class="display-4 text-center py-1">
                    Todo App!
                </h1>
                <div class="jumbotron p-3 shadow-sm">
                    <form action="/create-item" method="POST">
                        <div class="d-flex align-items-center">
                             
                           <input name="item" type="text" style="flex:1"  autofocus autocomplete="off" class="form-control mr-3">
                           <button class="btn btn-primary">Add New Item</button>    
                        </div>
                     </form>
                </div>
                <ul class="list-group pb-5">
                    <li class="list-group-item list-group-item-action d-flex align-items-center justify-content-between">
                      <span class="item-text">Fake example item</span>
                      <div>
                         <button class="edit-me btn btn-secondary btn-sm mr-1">Edit</button>
                         <button class="delete-me btn btn-danger btn-sm">Delete</button>
                      </div>
                    </li>
                    <li class="list-group-item list-group-item-action d-flex align-items-center justify-content-between">
                      <span class="item-text">Fake example item#2</span>
                      <div>
                         <button class="edit-me btn btn-secondary btn-sm mr-1">Edit</button>
                         <button class="delete-me btn btn-danger btn-sm">Delete</button>
                      </div>
                    </li>
                    <li class="list-group-item list-group-item-action d-flex align-items-center justify-content-between">
                      <span class="item-text">Fake example item#3</span>
                      <div>
                         <button class="edit-me btn btn-secondary btn-sm mr-1">Edit</button>
                         <button class="delete-me btn btn-danger btn-sm">Delete</button>
                      </div>
                    </li>
                </ul>
              
            </div>
        </body>
    </html>
        `)
  })


//utk creare kita buat end-point di /create-item 
//nah nama item pada input itu nnti sbgai patokan dimana ada value yang masuk 
//maka supaya si nodejs ketahui maka dgn req.body.item  <--item nama dari input nah 
//nah cara masukan didaabase dgn db.collections("items") <--items disini nama collection identic dgn table pada sql 
//dgn insertone comand kuta masukan obejct-property fieldnya contoh {text:req.body.item}
//sbb:
app.post("/create-item",async function(req,res) {
    await db.collection("items").insertOne({text:req.body.item})
    res.send("thanks for submiting form!")
})





/* NOTE:

"mongodb://localhost:27017/TodoApp" <--ini adalah database baru kita 
namanya TodoApp nah kita diatas masukan value dari input bernama item 
dimana dimasuka kedalam table "items" 

ingat nama pada form  <form action="/create-item" method="POST">
utk end point pada /create-item  yg merupaka method POST 
maka pada app.post("/create-item",async function(req,res) { }
nama end-point tertulis pada app.post(/create-item) jadi ini /create-item harus sama jika tidak akan error!
jika berhasi pada google chrome  page adress :http://localhost:5000/create-item 
akan keluar pesan sesuai yang isi dar res,send yaitu : thanks for submiting form!


utk mongo atlas::
let client = new MongoClient("mongodb+srv://usernamehere:yourpasswordhere@cluster0.dfvvi.mongodb.net/TodoApp?retryWrites=true&w=majority")

*/