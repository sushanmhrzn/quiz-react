import React,{useEffect, useState} from 'react'
import './css/style.css'
import {collection, getDocs} from 'firebase/firestore';
import  {db} from './config/firebase';
function Home() {
    
const questionNumber=document.querySelector(".question-number");
const questionText=document.querySelector(".question-text");
const optionsContainer=document.querySelector(".option-container");
let homeBox=document.querySelector(".home");
let quizBox=document.querySelector(".quiz-box");
let resultBox=document.querySelector(".result-box");
const totalattempt=document.querySelector(".total-attempts");
const totalquestions=document.querySelector(".total-question");
const answerIndicator=document.querySelector(".answer-indicator");
const correctS=document.querySelector('.correct');
const incorrectS=document.querySelector('.wrong');
const score=document.querySelector('.score');
const total=document.getElementById("num");
let totalQues=0;

let availableQuestions=[];
let questionCounter=0;
let availableOption=[];
let currentQuestion;
let correct=0;
let incorrect=0;
let attempt=0;
let randomQuestion=[];
let questionLimit;
let randomavailableQuestions=[]
let questionIndex;
const [quizList, setQuizList] = useState([]);


const quizListCollection = collection(db, "quiz");
    
    useEffect(()=>{
        const getQuizList = async()=>{
            try{
            const data=await getDocs(quizListCollection);
            const filteredData = data.docs.map((doc)=>({
                ...doc.data(), 
                id:doc.id,
            })) 
            setQuizList(filteredData);
        }catch(err){
            console.error(err);
        }
        }
        setQuestions();
        getQuizList();
    }, [])

function play(){    
    totalQues=parseInt(total.value);
    let numberOfQuestion=totalQues;
    questionLimit=quizList.length;
    
    if(isNaN(numberOfQuestion)){
        alert("Please enter a number before playing");
    }
    else if(numberOfQuestion>questionLimit){
        alert("Sorry there is not enough question, we have only "+questionLimit+" questions");
        // // home();
        // newHome();
    }else{
    setQuestions();
    getNewQuestion();
    homeBox.classList.add("hide");
    quizBox.classList.remove("hide");
    // setQuestions();
    }
}

function setQuestions() {
    // let numberOfQuestion=totalQues;
    questionLimit=quizList.length;
       
        for(let i=0; i<quizList.length; i++){
            console.log("hello");
             randomavailableQuestions.push(i);  
        }
       
        for(let i=0;i<quizList.length;i++){
            questionIndex=randomavailableQuestions[Math.floor(Math.random()*randomavailableQuestions.length)];
            let index=randomavailableQuestions.indexOf(questionIndex);
            availableQuestions.push(quizList[questionIndex]);
            randomavailableQuestions.splice(index,1);
            // console.log(""randomavailableQuestions);
            console.log(questionIndex);
            console.log(randomavailableQuestions);
        }
        console.log(availableQuestions);
    } 


    function getNewQuestion(){
        questionNumber.innerHTML=` Questions ${questionCounter + 1} of ${totalQues}`;
        // console.log(availableQuestions[0]);
        const questionIndex= availableQuestions[Math.floor(Math.random() * availableQuestions.length)]
        // console.log(questionIndex);
        console.log(questionIndex);
        currentQuestion=questionIndex;
        console.log(currentQuestion);
        questionText.innerHTML=currentQuestion.question;
        const currentIndex=availableQuestions.indexOf(questionIndex);
        availableQuestions.splice(currentIndex,1);
    
        const optionLength= currentQuestion.options.length;
        for(let i=0;i<optionLength;i++){
            availableOption.push(i);
        }
        // console.log(availableOption)
        optionsContainer.innerHTML="";
        for(let i=0;i<optionLength;i++){
    
            const optionIndex= availableOption[Math.floor(Math.random() * availableOption.length)];
            // console.log(optionIndex);
            const index2=availableOption.indexOf(optionIndex);
            // console.log(index2);
            availableOption.splice(index2,1);
            // console.log(optionIndex);
            
            const option=document.createElement("div");
            
            option.innerHTML=currentQuestion.options[optionIndex];
            option.id=optionIndex;
            option.className="option";
            optionsContainer.appendChild(option);
            console.log(option.id);
            option.addEventListener("click",()=>getResult(option));
        }
        questionCounter++;
    }

    
    
    function getResult(element){
        console.log("Hello");
        const id=parseInt(element.id);
        console.log("Element: "+id);
        if(id===currentQuestion.answer){
            element.classList.add("correct");
            correct +=1;
        }else{
            incorrect+=1;
            element.classList.add("incorrect");
            const optionLength=optionsContainer.children.length;
            console.log(currentQuestion.question);
            for(let i=0;i<optionLength;i++){
                console.log("Option Container id====="+ (optionsContainer.children[i].id)+"   " +(currentQuestion.answer));
                if(parseInt(optionsContainer.children[i].id)===currentQuestion.answer){
                    optionsContainer.children[i].classList.add("correct");
                }
            }
        }
        unclickable();
        attempt++;
    }
    function unclickable(){
        // console.log("hello");
        const optionLength = optionsContainer.children.length;
        for(let i=0;i<optionLength;i++){
            optionsContainer.children[i].classList.add("answered");
        }
    }
    function home(){
        resultBox.classList.add("hide");
        homeBox.classList.remove("hide");
        reset();
    }
    function next(){
        if(questionCounter==totalQues){
            console.log(attempt);
            totalquestions.innerHTML=totalQues;
            totalattempt.innerHTML=attempt;
            correctS.innerHTML=correct;
            incorrectS.innerHTML=incorrect;
            score.innerHTML=correct*10;
            quizBox.classList.add("hide");
            resultBox.classList.remove("hide");
            reset();
            setQuestions();
        }else{
            
            // document.getElementById("countdown").innerHTML ="";
            // clearInterval(downloadTimer);
            getNewQuestion();
        }
    }

    function reset(){
        availableQuestions=[];
        attempt=0;
        questionCounter=0;
        availableOption=[];
        currentQuestion=[];
        correct=0;
        totalQues=0
        incorrect=0;
        // const list = answerIndicator;
        
        // if (list.hasChildNodes()) {
        // list.removeChild(list.children);
        // console.log("j");
    // }
    }
    // function handleNext(){
    //     const quizBox=document.querySelector(".quiz-box");
    //     const resultBox=document.querySelector(".result-box");
    //     quizBox.classList.add("hide");
    //     resultBox.classList.remove("hide");
    // }
  return (
    <div>
        <div className="home custom-box ">
            <h2>Welcome to quiz!!!</h2>
            <p>Total questions: <span className="total-questions"><input type="text" id="num" min="1"/></span></p>
            <button type="button" className="btn" onClick={play}>Start</button>
        </div>

        <div className="quiz-box custom-box hide">
            <div id="countdown"></div>
            <div className="question-number"></div>
            <div className="question-text"></div>
            <div className="option-container">
                <div className="option"></div>
                <div className="option"></div>
                <div className="option"></div>
                <div className="option"></div>
            </div>
            <div className="next-button">
                <button type="button" className="btn" onClick={next} >Next</button>
            </div>
            <div className="answer-indicator">
                {/* <!-- <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div> */}
            </div>
            {/* <!-- <div clas=""></div> --> */}
        </div>
        <div className="result-box custom-box hide">
            <h2> Score</h2>
            <table>
                <tbody>
                <tr>
                    <td>Total Question</td>
                    <td><span className="total-question">5</span></td>
                </tr>
                <tr>
                    <td>Total Attempts</td>
                    <td><span className="total-attempts"></span></td>
                </tr>
                <tr>
                    <td>Correct</td>
                    <td><span className="correct"></span></td>
                </tr>
                <tr>
                    <td>Wrong</td>
                    <td><span className="wrong"></span></td>
                </tr>
                <tr>
                    <td>Score</td>
                    <td><span className="score"></span></td>
                </tr>
                </tbody>
            </table>
            <button type="button" className="btn" onClick={home}>Go home</button>
        </div>
    </div>
  )

}

export default Home