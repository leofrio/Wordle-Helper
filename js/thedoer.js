//thesaurus key:8456d313-a8db-44a4-aa38-ef6d1086cf28  
var globalAddedInputs=[];
function doit() { 
    // just getting the main inputs
    var newfile=document.getElementById("thefile")
    var startw=document.getElementById("startw").value  
    var hasl= document.getElementById("hasl").value
    var notl=document.getElementById("notl").value 
    var wlen=parseInt(document.getElementById("wlen").value)   
    var result =document.getElementById("result")
    var fr=new FileReader()     
    //indicated when the file is read
    fr.onload =function() {  
        rawWords=fr.result.split("\r\n") 
        var r1=rawWords 
        //rawWords is all the words into an array
        //the below if to see if it starts with the startw
        if(startw != "") { 
            //the filter fuinction makes every element go through a test if they pass it will be added to r1 if not they wont
            r1=r1.filter(function(element) { 
                if(element.startsWith(startw)) { 
                    return true
                } 
                return false
            })
        } 
        //cehcks to see if it has all the words in hasl 
        //the used array is used to put a boolean to every char of the wordarray, if its true,
        //which means that its been used it wont let it go through the test again(counter to see if it matches the number of letters)
        //that way if we put 2 identical letters like a,a it will look for 2 a and not just accept it as if it was one
        if(hasl != "") {  
            var letters =hasl.split(",")
            r1=r1.filter(function(element) { 
                var wordarray=element.split("") 
                var counter=0 
                var used=[] 
                used=used.concat(wordarray)
                used.fill(false); 
                var i=0
                for(c of letters) { 
                    for(ch of wordarray) { 
                        if(ch == c) {  
                            if(!used[i]) {
                                counter++ 
                                used[i]=true;
                                break; 
                            }
                        }
                        i++
                    }
                    i=0
                }
                if(counter == letters.length) { 
                    return true;
                } 
                return false;
            })
        }  
        //here it just checks the code to see if any of the words put are in tge word if it is it is not added in r1 cuz we dont want
        //those words there
        if(notl != "") { 
            var letters =notl.split(",") 
            r1=r1.filter(function(element) { 
                var wordarray=element.split("") 
                for(c of letters) { 
                    for(ch of wordarray) { 
                        if(ch == c) {  
                           return false       
                        }
                    }
                }
                return true;
            })
        } 
        //checks to see if wlen is empty or not, and filters each word to be that size
        if(!isNaN(wlen)) {
            r1=r1.filter(function(element) { 
                if(element.length == wlen) {
                    return true
                } 
                return false
            })
        } 
        if(!isEmpty(globalAddedInputs)) { 
            r1=r1.filter(function(element) { 
                var i=0
                valuesarr=[]
                var counter=0
                for(data of globalAddedInputs) { 
                    var current=document.getElementById(data).value   
                    valuesarr.push(current)
                    if(current != "") { 
                        var currentpos=parseInt(data.charAt(data.length-1)) 
                        if(element.charAt(currentpos) == current) { 
                           counter++ 
                        }  
                        else {
                            return false;
                        }
                    } 
                    i++
                } 
                if(counter == notBlankSlots(valuesarr)) { 
                    return true
                }
                if(isBlank(valuesarr)) { 
                    return true;
                }
                return false;
            })
        } 
        if(!isBlank(r1)) {
            result.innerHTML=r1.join("\n") 
        } 
        else { 
            result.innerHTML="there werent any words on this specific txt files with those requirements :("
        }
        console.log(startw)
        console.log(hasl)
        console.log(wlen)
        console.log(r1)  
        aux=r1
    } 
    fr.readAsText(newfile.files[0])  
}    


//function to load the DOM if we dont do that we cant get the getElementById working right
window.onload=function(){
    var wlenGlobal=document.getElementById("wlen")
    var prevnum=0 
    var previnputarray =[] 
    var inputs= document.getElementById("inputsdiv");  
    //makes an array that saves all the  id of the inputs we will create
    //and removes and adds them as we type
    wlenGlobal.addEventListener("input",function() { 
        var num=parseInt(wlenGlobal.value)  
        if(!isNaN(num)) {  
            if(num != prevnum) {
                for(var i=0;i < prevnum;i++) {
                    var oldinput=document.getElementById(previnputarray[i]) 
                    oldinput.remove();
                } 
                var idpos=0
                prevnum=num  
                var inputIdArray=[]
                for(var i=0;i < num;i++) {
                    var newinput=document.createElement("input") 
                    newinput.id="letterinpos" + idpos 
                    newinput.placeholder="letter is in pos " +idpos
                    idpos++
                    inputIdArray.push(newinput.id) 
                    inputs.appendChild(newinput)
                }  
                previnputarray=inputIdArray; 
                globalAddedInputs=inputIdArray
            }
        } 
        else { 
            for(var i=0;i < prevnum;i++) {
                var oldinput=document.getElementById(previnputarray[i]) 
                oldinput.remove();
            } 
            prevnum=0; 
            previnputarray =[]  
            globalAddedInputs=[]
        }
    })
}
function isEmpty(arr) {
    if(arr.length == 0) { 
        return true;
    } 
    return false;
} 
function isBlank(arr) { 
    if(arr.length== 0) {
        return false;
    } 
    else { 
        var counter=0
        for(var i=0;i<arr.length;i++) {
            if(arr[i] == "") { 
                counter++
            }
        } 
        if(counter == arr.length) {
            return true
        } 
        return false;
    }
}
function notBlankSlots(arr) { 
    var counter=0
        for(var i=0;i<arr.length;i++) {
            if(arr[i] != "") { 
                counter++
            }
        } 
        return counter
}
