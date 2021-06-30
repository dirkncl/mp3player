var Menu
function createList(toElement, a, b){
   var br = document.createElement("br");
   
   var anchor = document.createElement("a");
   anchor.target = "_page";
   anchor.href = 'index.html?mp3='+b;
   anchor.innerHTML = a;
   anchor.style.color="black"
   anchor.style.textDecoration = "none"
   anchor.onmouseover = function(){
     this.style.color = "blue"
   }
  anchor.onmouseout = function(){
     this.style.color = "black"
   }

   toElement.appendChild(anchor);
   toElement.appendChild(br);
}
document.addEventListener('DOMContentLoaded',function(){
//window.onload = function(){
  for(var key in listMp3){
    var fileTarget = listMp3[key].replace(/&/g,"_and_")
    createList(document.getElementById("listMenu01"), key, fileTarget)
  }

  (sty=document.createElement("style")).textContent=`body{background-color:black}.menuClass::-webkit-scrollbar {height: 8px;width: 8px;background: #404040;}.menuClass::-webkit-scrollbar-thumb{background: #909090;border-radius: 4ex;}.menuClass ::-webkit-scrollbar-corner{background: #000;}.listTitle {margin-top:2%;cursor:hand;}.menuClass {border-left:2px solid white;border-right:2px solid gray;border-top:2px solid white;border-bottom:2px solid gray;background-color:silver;position:absolute;width:40%;height:60%;overflow-y:scroll;display:none;z-index:1;padding-left:5px;font-family:verdana;font-size:10pt;padding-right:1px;padding-top:1px;padding-bottom:1px;top:40%;left:50%;transform:translate(-50%,-50%);opacity:1;}`;document.head.appendChild(sty);Menu = new menu();document.body.onclick=function(){return Menu.popMenu()}
})

class menu {
   Id = ""
   timeout = null
   rclip = null
   popMenu() {
     var element = window.event.srcElement
     window.event.cancelBubble = true
     if (this.Id != "") {
       document.getElementById(this.Id).style.display = "none"
     }
     if (element.className=="listTitle") {
       var menuNumber = element.id.substring(element.id.length - 2, element.id.length);
       this.Id = `listMenu${menuNumber}`;
       var Menu = document.getElementById(this.Id);
       Menu.style.display = "block"
       this.rclip = 25
       this.timeout = window.setTimeout(`menu.showMenu(${Menu.id})`,10)
     }
  }
   static showMenu(Menu) {
      Menu.style.clip = `rect(0, 100%, ${this.rclip}%, 0)`
      this.rclip +=25
      if (this.rclip <= 100) {
         this.timeout = window.setTimeout(`menu.showMenu(${Menu.id})`,10)
      }
      else {
         window.clearTimeout(this.timeout)
      }
   }
}  
