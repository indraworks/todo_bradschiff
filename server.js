let express = require('express')
//intinya ini distactinc dari mongodb.MongoClient jadi kita hanya inmpirt object 
//MongoClient dari mongodb maka kita tulis {MongoClient}
let { MongoClient,ObjectId} = require("mongodb")
let app = express()
let db 

//using public as static agar broser.js yg embed pada html scrip jsnya bisa dipanggil!
app.use(express.static("public")) 
async function go() {
    let client = new MongoClient("mongodb://localhost:27017/TodoApp?retryWrites=true&w=majority")
    await client.connect() //wait conection ada beberapa lama mulai dari 3ms sd 3000 takk hingga maka nya pakai await
     db = client.db()
     app.listen(5000)
}
    //ini utk local saja 
 
  go()  
  
    



app.use(express.json())
app.use(express.urlencoded({extended:false}))




//utk get di end-point : "/create-item"
  app.get("/",async function(req,res){
    //read dbnya dgb perintah find dan di ubah ke array supaya list2 dari doc masuk di array 
    const items = await  db.collection("items").find().toArray()
    console.log(items)
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
                    <form id="create-form" action="/create-item" method="POST">
                        <div class="d-flex align-items-center">
                             
                           <input id="create-field" name="item" type="text" style="flex:1"  autofocus autocomplete="off" class="form-control mr-3">
                           <button class="btn btn-primary">Add New Item</button>    
                        </div>
                     </form>
                </div>
                <ul id="item-list" class="list-group pb-5">
                            
                </ul>
               </div>
               <script>
                let items = ${JSON.stringify(items)}
               </script>
               
               <script src="https://unpkg.com/axios/dist/axios.min.js"></script>
 
             <script src="./browser.js"></script>

        </body>
    </html>
        `)
  })


app.post("/create-item",async function(req,res) {
    const info = await db.collection("items").insertOne({text:req.body.text})
    console.log(info,req.body.text) //check apa isi info 
    res.json({_id:info.insertedId,text:req.body.text})
    //nah repsonse yg masuk ke axios berisi ini 
    //{_id:info.insertedId,text:req.body.text}
    //han yg id nnti masuk ke buton2 utk pas di click id patokanya _id yg sat button tsb diklik
})


//terima req dari axios.post di end-point "/update-item"
app.post("/update-item",async function(req,res){
  await db.collection("items").findOneAndUpdate({_id:new ObjectId(req.body.id)},{$set:{text:req.body.text}})
  res.send("success")
})

//terima req dari axios.post di end-point "/delete-item"
app.post("/delete-item",async function(req,res){
  await db.collection("items").deleteOne({_id:new ObjectId(req.body.id)})
  res.send("Success delete")
})
/*
note :smua coment catatan ada pada dir catatan!
ketrangan utk create-item diatas:
//utk creare kita buat end-point di /create-item 
//nah nama item pada input itu nnti sbgai patokan dimana ada value yang masuk 
//maka supaya si nodejs ketahui maka dgn req.body.item  <--item nama dari input nah 
//nah cara masukan didaabase dgn db.collections("items") <--items disini nama collection identic dgn table pada sql 
//dgn insertone comand kuta masukan obejct-property fieldnya contoh {text:req.body.item}
//sbb:
//terima req dari axios.post di end-point "/create-item"
*/