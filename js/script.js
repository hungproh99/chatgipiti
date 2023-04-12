$('#send').click(function(e) {
    e.preventDefault();
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
            "Authorization": `Bearer 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`
        },
        success: function(response) {
            // const value = response.slice(response.indexOf(':') + 1);
            // console.log("value");
            // console.log(value);
            // const result = JSON.parse(value);

            // console.log("done");
            // console.log(result.choices.delta.content);
            console.log(response.choices);
            $("#chat-messages").append(response)
        },
        error: function(xhr, status, error) {
            console.error('Request failed.  Returned status of ' + xhr.status + '. Error message: ' + error);
        }
    });
});