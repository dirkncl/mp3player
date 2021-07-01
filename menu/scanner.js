var songList = []
for(var key in listMp3){songList.push(key)}
var re_songName = songList.join("|").replace(/\(/g,"\\(").replace(/\)/g,"\\)")
var base = 'dirkncl.github.io'
var Regex = '\\b'+re_songName+'\\b';
var re_reference = new RegExp(Regex, 'mi');
var textHandler = function(n) {
	var match = re_reference.exec(n.data), 
		NodeRef,afterNode,A,SongName,SongReference;
	if (match) {
    NodeRef = n.splitText(match.index);
    afterNode = NodeRef.splitText(match[0].length);
    A = n.ownerDocument.createElement('a');
		A.style.color = "gold"
    A.style.textDecoration = "none"
    A.style.fontWeight = "bold"
    A.style.fontStyle = "italic"
    A.onmouseover = function(){this.style.color = "blue"}
    A.onmouseout = function(){this.style.color = "gold"}
		n.parentNode.replaceChild(A, NodeRef);				
		A.className = "mp3-playlist";
    A.target = "_page"
		A.appendChild(NodeRef);
		SongName = A.innerText;
		SongReference = SongName.replace(SongName,'https://'+base+'/RadioAndMusicPlayer/media/'+SongName+'.mp3').replace(/&/mi,'_and_');
		A.setAttribute('href', './index.html?mp3=' + SongReference);
		//A.setAttribute('href', 'https://'+base+'/mp3player/?mp3=' + SongReference);
		A.setAttribute('title', 'Click to Play: ' + SongName);
		A["innerHTML"]  = SongName
		return A;
	} else {return n}
};
	
function scaneToDocument() {
	scanner(document.body, 1, textHandler);
}
var scanner = function(node, depth, textHandler) {
  var typeNode = {element:1,text:3,cdataSection:4}
  var ignoreTags = ['h1','h2','h3','h4']
  var maximumNode = 500  
  var count = 0;
  var alwaysSkipTags = ['a','script','style','textarea']
  var skipRegex = new RegExp('^(' + alwaysSkipTags.concat(ignoreTags).join('|') + ')$', 'i');
      
      
  while (node && depth > 0) {
    count++;
    if (count >= maximumNode) {
      setTimeout(function() { scanner(node, depth, textHandler); }, 50);
      return;
    }

    switch (node.nodeType) {
      case typeNode["element"]:
        if (!skipRegex.test(node.tagName.toLowerCase()) && node.childNodes.length > 0) {                      
          node = node.childNodes[0];
          depth ++;
          continue;
        }
        break;
      case typeNode["text"]:case typeNode["cdataSection"]:
        node = textHandler(node);
        break;
    }

    if (node.nextSibling) {
      node = node.nextSibling;
    }
    
    else {
      while (depth > 0) {
        node = node.parentNode;
        depth --;
        if (node.nextSibling) {
          node = node.nextSibling;
          break;
        }
      }
    }
    
  }
};
document.addEventListener('DOMContentLoaded',function(){
   scaneToDocument();
})
