$('#send').click(async function(e) {
    e.preventDefault();
    const apiUrl = 'https://api.openai.com/v1/engines/davinci/completions';
    const corsProxyUrl = 'https://cors-anywhere.herokuapp.com/';

    const url = `${corsProxyUrl}${apiUrl}`;

    $.ajax({
        url: "https://api.openai.com/v1/chat/completions",
        type: 'POST',
        contentType: 'application/json',
        data: JSON.stringify({
            "messages": [{ "role": "user", "content": $('#chat-input').val() }],
            "temperature": 0.7,
            "max_tokens": 256,
            "top_p": 1,
            "frequency_penalty": 0,
            "presence_penalty": 0,
            "model": "gpt-3.5-turbo",
            "stream": true
        }),
        headers: {
            "Authorization": `Bearer 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`,
            "OpenAI-Organization": "org-416YHOv9l3LcxoZbZRYrkUhN"
        },
        success: function(response) {
            // const value = response.slice(response.indexOf(':') + 1);
            // console.log("value");
            // console.log(value);
            // const result = JSON.parse(value);

            // console.log("done");
            // console.log(result.choices.delta.content);
            console.log(response.choices);
        },
        error: function(xhr, status, error) {
            console.error('Request failed.  Returned status of ' + xhr.status + '. Error message: ' + error);
        }
    });
});