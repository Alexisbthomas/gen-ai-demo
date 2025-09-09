let botReply=""
let userPrompt="";
onEvent("Chatbot", "click", function() {
console.log("clicked");
var input=getValue("chat-input");
userPrompt=getValue("chat-input");
console.log("userPrompt",userPrompt);
console.log(input);
if (input===""){
    setText("result", "⚠️ Please enter something!");
    setProperty("result", "color", "red");
} else {
    setText("result","Thinking💭...");
    setProperty("result","color","green");
    sendtomodel();
}})
    

function sendtomodel(){
async function query(data) {
	const response = await fetch(
		"https://router.huggingface.co/v1/chat/completions",
		{
			headers: {
				Authorization: `Bearer ${HF_TOKEN}`,
				"Content-Type": "application/json",
			},
			method: "POST",
			body: JSON.stringify(data),
		}
	);
	const result = await response.json();
	return result;
}

query({ 
    messages: [
        {
            role: "user",
            content: userPrompt,
        },
    ],
    model: "meta-llama/Llama-3.1-8B-Instruct:fireworks-ai",
}).then((response) => {
    console.log(JSON.stringify(response));
    console.log(response);
    console.log(response.choices);
    console.log(response.choices[0]);
    console.log(response.choices[0].message);
    console.log(response.choices[0].message.content);
   botReply = response.choices[0].message.content;
   console.log("botReply",botReply);
   console.log(userPrompt);
   setText("result",botReply)
   setProperty("result","background","black");
   setProperty("result","color","red");
});
}
