  ////create feature  

//function templatelistHTML
function templatelistHTML(item) {
  return ` <li class="list-group-item list-group-item-action d-flex align-items-center justify-content-between">
  <span class="item-text">${item.text}</span>
  <div>
     <button data-id="${item._id}" class="edit-me btn btn-secondary btn-sm mr-1">Edit</button>
     <button data-id="${item._id}" class="delete-me btn btn-danger btn-sm">Delete</button>
  </div>
</li>`
}
  
let valueField = document.getElementById("create-field")

document.getElementById("create-form").addEventListener("submit",function(e){
  e.preventDefault() //utk hindari brwwser update chance 
  //kita buat axios post coppy dari delete nah nnti object kita beri nama atribute text 
  //nah utk value input ygberubah2 kita masukan dari variable valueForm 
  //response adalah umpan balik dair server di enpoint"create-item"
  //berisi isi dari res,json() yaitu {_id:info.insertedId,text:req.body.text}

  axios.post("create-item",{text:valueField.value}).then(function(response){
    //create HTML for new itme ( buat list ditempat paling bawah nginsert)
    //alert("we do adding input value!")
    //console.log(valueField) jangan lupa di html-embed di server.js  pada tag ul buat id="item-list"
    //agar bisa kita utk lakukan penambahan pada li tagn-nya ( button 2,dan hasil text input diiinsert idbawah ) 
    console.log("resposne data",response.data)
    document.getElementById("item-list").insertAdjacentHTML("beforeend",templatelistHTML(response.data))
    valueField.value = ""
    valueField.focus()
  }).catch(function(){
    console.log("please try again later")
  })

})

//broser utk memuat event triger yg ktika click dari tombol edit buton 
document.addEventListener("click",function(e){
 


  //delete feature -tertriger oleh button class "delete-me"
   if( e.target.classList.contains("delete-me")) {
    //kita pakai confirm ini bawaan html-js bisa diliat di link sumber pada catatan 
    if(confirm("do you really want to delete?")){
        //jika condisi true 
       axios.post("/delete-item",{id:e.target.getAttribute("data-id")})
       //mengambil nilai data-id  yg ada pada button yg ada tag class delete-me 
       //<button data-id="${item._id} nah dimasukan ke object atribute name id dan dikirim ke server 
       //nah penanganannya ada di sefver js 
       .then(function(){
        //if success
        e.target.parentElement.parentElement.remove()
       })
       .catch(function(){
        //if error
        console.log("try again later!")
       })
    }
   } 



 

  //edit feature - tertriger oleh btton class "edit-me"
   if(e.target.classList.contains("edit-me")) {
     let userInput = prompt("Enter your desire text",e.target.parentElement.parentElement.querySelector(".item-text").innerHTML)
     //e.target.parentElement.parentElement.querySelector(".item-text").innerHTML ini maksudbya pada 
     //promtp diatas default nilai yg muncul pada value input awal adalah nilai yg ada pada list-item dimana 
     //kita click edit-buttonya 
     if(userInput) {
        axios.post("/update-item",{text:userInput,id:e.target.getAttribute("data-id")})
        .then(function(){
            //ubah list-item-text dgn nilai yg ada pada input 
            e.target.parentElement.parentElement.querySelector(".item-text").innerHTML = userInput
        })
        .catch(function(){
            console.log("please try again later")
        })
     }
   }

})





/*
biar paham saya teragkan utk nilai propm[t utk input ] didapat dari mana ?
yaitu variable dari 
dinawah ini saya tulis ulang parentElement dari edit-me adalaj "div" 
nah diatas div ada 
  <span class="item-text">${item.text}</span>
  nah disinilah item-text didapat 
  let userInput = prompt("Enter your desired new text", e.target.parentElement.parentElement.querySelector(".item-text").innerHTML)

, nah jika naik lagi dot parentElement maka akan menuju pada "list-group-item"

 return ` <li class="list-group-item list-group-item-action d-flex align-items-center justify-content-between">
                    <span class="item-text">${item.text}</span>
                    <div>
                       <button class="edit-me btn btn-secondary btn-sm mr-1">Edit</button>
                       <button class="delete-me btn btn-danger btn-sm">Delete</button>
                    </div>
                  </li>`
                  }).join("")}



 r



*/