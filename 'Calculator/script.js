// Function to handle voice input
function handleVoiceInput() {
  const recognition = new (webkitSpeechRecognition || SpeechRecognition)();
  recognition.lang = 'en-US';

  recognition.onresult = function(event) {
    const voiceResult = event.results[0][0].transcript;
    document.getElementById('output-value').innerText = voiceResult;
    handleVoiceOutput(voiceResult); // Call the voice output function
    calculate(voiceResult);
  };

  recognition.start();
}

// Function to handle voice output
function handleVoiceOutput(text) {
  const synthesis = new SpeechSynthesisUtterance(text);
  synthesis.lang = 'en-US';
  window.speechSynthesis.speak(synthesis);
}

// Attach event listener to the voice input button
document.getElementById('voice-input').addEventListener('click', handleVoiceInput);



function getHistory(){
  return document.getElementById("history-value").innerText;
}
function printHistory(num){
  document.getElementById("history-value").innerText=num;
}
function getOutput(){
  return document.getElementById("output-value").innerText;
}
function printOutput(num){
  if(num==""){
    document.getElementById("output-value").innerText=num;
  }
  else{
    document.getElementById("output-value").innerText=getFormattedNumber(num);
  } 
}
function getFormattedNumber(num){
  if(num=="-"){
    return "";
  }
  var n = Number(num);
  var value = n.toLocaleString("en");
  return value;
}
function reverseNumberFormat(num){
  return Number(num.replace(/,/g,''));
}
var operator = document.getElementsByClassName("operator");
for(var i =0;i<operator.length;i++){
  operator[i].addEventListener('click',function(){
    if(this.id=="clear"){
      printHistory("");
      printOutput("");
    }
    else if(this.id=="backspace"){
      var output=reverseNumberFormat(getOutput()).toString();
      if(output){//if output has a value
        output= output.substr(0,output.length-1);
        printOutput(output);
      }
    }
    else{
      var output=getOutput();
      var history=getHistory();
      if(output==""&&history!=""){
        if(isNaN(history[history.length-1])){
          history= history.substr(0,history.length-1);
        }
      }
      if(output!="" || history!=""){
        output= output==""?output:reverseNumberFormat(output);
        history=history+output;
        if(this.id=="="){
          var result=eval(history);
          printOutput(result);
          printHistory("");
        }
        else{
          history=history+this.id;
          printHistory(history);
          printOutput("");
        }
      }
    }
    
  });
}
var number = document.getElementsByClassName("number");
for(var i =0;i<number.length;i++){
  number[i].addEventListener('click',function(){
    var output=reverseNumberFormat(getOutput());
    if(output!=NaN){ //if output is a number
      output=output+this.id;
      printOutput(output);
    }
  });
}
function calculate(input) {
  // Remove any non-numeric characters from the input
input = input.replace(/[^\d+\-*/().]/g, '');

  try {
    var result = eval(input);
    if (isNaN(result)) {
      printOutput("Error");
      handleVoiceOutput("Error"); // Speak "Error"
    } else {
      printOutput(result);
      handleVoiceOutput(result.toString()); // Speak the calculated result
    }
  } catch (error) {
    printOutput("Error");
    handleVoiceOutput("Error"); // Speak "Error"
  }
}

