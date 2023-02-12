// mohmad jhad farhanh -- 2023/12/2
let counter = 0;
let countQuestionV = document.querySelector('.count-question');
let bullets =document.querySelector(".bullets");
let question = document.querySelector("#question");
let quizBox  = document.querySelector(".quiz-box-contain");
let nextButton = document.querySelector("#next");
let answerRadio ;
 let rightQuestion = 0;
 let result = document.querySelector('.result');
 let checkDataNum  = 0;
 let validat = document.querySelector(".validat");
 let countDown = document.querySelector(".countDown");
 let againButton = document.querySelector("#again");

(function() {
    let myRequst = new XMLHttpRequest();
        myRequst.open("GET","./quiz.json");
            myRequst.send();
        myRequst.onreadystatechange = function(){
                if(this.readyState == "4" && this.status == "200"){
                        let jsonData = this.response;
                           let objectData = JSON.parse(jsonData);
                            let countObjectData = objectData.length;
                           
                            // count Question
                                countQuestion(countObjectData);
                            // bullets
                                bulletsCreate(countObjectData);
                            // show data
                                showData(objectData,countObjectData);
                            // counter down 
                            
                            counterDown(countObjectData);
                              
                            // next button
                        nextButton.addEventListener('click',()=>{
                          
                                    checkData(objectData);
                                counter++;
                                bulletsCreate(countObjectData);
                                countQuestion(countObjectData);
                                showData(objectData,countObjectData);     
                                
                        })
                            // adgin button
                        again.addEventListener('click',()=>{
                          
                            againButton.style.display = "none";
                            nextButton.style.display ="block";
                            result.innerHTML = "";
                            counter= 0; 
                            // count Question
                            countQuestion(countObjectData);
                            // bullets
                                bulletsCreate(countObjectData);
                            // show data
                                showData(objectData,countObjectData);
                            // counter down 
                            counterDown(countObjectData);
                        
                })
                }
        }
})();

// count Question 
function countQuestion(count) {
    if(counter < count) {
        countQuestionV.innerHTML = `${counter+1}/${count}`
    }
    
}

// bullets 
function bulletsCreate(count){
    let str=``;
    for(let i =0 ; i<count ; i++){
        str += `<span class='${i <= counter ? "active" : ""}'></span>`
    }
    bullets.innerHTML = str;
}
// show data 
function showData(obj,count) {
 
    if(counter < count){
        question.innerHTML = `${obj[counter].question}`
        let str= ``;    
    for(let i =0 ; i<4 ; i++){
            str+= `
            <div class="answer-box">
                   <input type="radio" id="an${i}" name='answer' class="answer" data_answer='${obj[counter].answer[`an${i}`]}'>
                <label for="an${i}"  class="answer-label" data_answer='${obj[counter].answer[`an${i}`]}' >${obj[counter].answer[`an${i}`]}</label>
                </div>
            `
        }
        quizBox.innerHTML =str;
        answerRadio = document.querySelectorAll(".answer");
    }else {
        clear();
            postResult(count);
    }
}

// check data 
function checkData(obj){
    validat.style.display = "none";
    for(let i =0,g=0 ;i<4 ;i++){
       
        if(answerRadio[i].checked){

            if(answerRadio[i].getAttribute("data_answer") == obj[counter].answer.correctOne){
                    rightQuestion++;
                
            }
        
        }else {
            g++;
                if(g == 4){
                        console.log(g);
                    counter--;
                    validat.style.display = "block";
                }
        }
       
    }
   
}
// clear data
function clear() {
    question.innerHTML = "";
    quizBox.innerHTML = "";

    nextButton.style.display ="none";

}
// show result 
function postResult(count) {
        againButton.style.display = "block"
        if(rightQuestion > (count/2) ){
            result.innerHTML = `<span class="sucss">sucss</span> ${rightQuestion}/${count}`;
            rightQuestion = 0;
        }else {
            result.innerHTML = `<span class="faild">faild</span> ${rightQuestion}/${count}`;
            rightQuestion = 0;
        }
}
// counter down
function counterDown(i) {
  
        let min = 120;
        let sec = 30;
        let xcounter =setInterval(()=>{
            --sec;
                countDown.innerHTML = `${min/60}:${sec}`
            if(sec == 0 && min > 0){
                sec = 60
                min -=60;
            }else if (sec == 0 && min == 0){
              
                        clear();
                        postResult(i);
                        countDown.innerHTML =`<span class="faild">time out</span>`
                    clearInterval(xcounter);
               
            }else if (counter == i){
                clearInterval(xcounter);
            }
          
        },1000)

}

