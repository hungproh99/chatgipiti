// const openai = require('openai');
// import { Configuration, OpenAIApi } from "openai";
// const configuration = new Configuration({
//     organization: "org-416YHOv9l3LcxoZbZRYrkUhN",
//     apiKey: process.env.OPENAI_API_KEY,
// });
// const openai = new OpenAIApi(configuration);


// const chatMessages = $('#chat-messages');
// const chatForm = $('#chat-form');
// const chatInput = $('#chat-input').val();
// const send = $('#send');



$('#send').click(async function(e) {
    e.preventDefault();

    // const response = await openai.createCompletion({
    //     model: "text-davinci-003",
    //     prompt: chatInput,
    //     temperature: 0.5,
    //     max_tokens: 50,
    //     top_p: 1,
    //     frequency_penalty: 0,
    //     presence_penalty: 0
    // });

    // console.log(response);

    $.ajax({
        url: "ttps://api.openai.com/v1/chat/completions",
        data: {
            "messages": [{ "role": "user", "content": $('#chat-input').val() }],
            "temperature": 0.7,
            "max_tokens": 256,
            "top_p": 1,
            "frequency_penalty": 0,
            "presence_penalty": 0,
            "model": "gpt-3.5-turbo",
            "stream": true
        },
        headers: {
            "Authorization": `Bearer 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`,
            "OpenAI-Organization": "org-416YHOv9l3LcxoZbZRYrkUhN",
            "Content-Type": "application/json"
        },
        success: function(result) {
            $("#div1").html(result);
        }
    });
});