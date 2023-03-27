//broser utk memuat event triger yg ktika click dari tombol edit buton 
document.addEventListener("click",function(e){
   //event click hanya terriger oleh "edit-me" class saja ,yg lainya tidak ada
   //jadi event ktika user klik tombol boton edit 
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