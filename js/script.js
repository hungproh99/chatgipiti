let apiKey = "";
let session_id = "";
let messages = new Array;

function getKey() {
    let cookies = document.cookie;
    if (cookies) {
        let decodedCookie = decodeURIComponent(cookies);
        let ca = decodedCookie.split(";");
        for (let i = 0; i < ca.length; i++) {
            if (ca[i].includes('randomStr')) {
                apiKey = ca[i].split('=')[1];
                getSession();
                $('.filter').hide();
            }
        }
    } else {
        console.log("randomStr not found!");
    }
}

function getSession() {
    let cookies = document.cookie;
    if (cookies) {
        let decodedCookie = decodeURIComponent(cookies);
        let ca = decodedCookie.split(";");
        for (let i = 0; i < ca.length; i++) {
            if (ca[i].includes('strID')) {
                session_id = ca[i].split('=')[1]
                $('.filter').hide();
            }
        }
    } else {
        console.log("strID not found!");
    }
}

getKey();

$("#submit").click(function (e) {
    e.preventDefault();
    document.cookie = 'randomStr=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
    apiKey = $('#api-key').val();
    if (apiKey) {
        var now = new Date();
        var time = now.getTime();
        var expireTime = time + 1000 * 86400;
        now.setTime(expireTime);
        document.cookie = `randomStr=${apiKey};expires=${now.toUTCString()};path=/`;
        $('.filter').hide();
        $('#chat-input').focus();
    } else {
        alert('Please input API key!');
        $('#api-key').focus();
    }
});

$('#reinput-key').click(function (e) {
    e.preventDefault();
    $('#api-key').val(apiKey);
    $('.filter').show();
    $('#api-key').focus();
});

$("#send").click(function (e) {
    e.preventDefault();
    if ($("#chat-input").val()) {
        $("#chat-zone").append(`<div class="chat-sent">
                                <div style="margin-left: 10%;">${$("#chat-input").val()}</div>
                                <img src="images/user.png" alt="" style="margin-left: 15px; margin-right: 15px;">
                            </div>`);
        $("#loading-indicator").show();
        messages.push({ content: $("#chat-input").val(), role: "user" });
        $("#chat-input").val('');

        const headers = {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${apiKey}`
        };

        const data = {
            messages: messages,
            temperature: 0.7,
            max_tokens: 265,
            top_p: 1,
            frequency_penalty: 0,
            presence_penalty: 0,
            model: "gpt-3.5-turbo",
            // stream: true
        };

        $.ajax({
            url: "https://api.openai.com/v1/chat/completions",
            type: "POST",
            data: JSON.stringify(data),
            headers: headers,
            success: function (response) {
                $("#chat-zone").append(`<div class="chat-received">
                                        <img src="images/chatgpt-icon.png" alt="" style="margin-right: 15px; margin-left: 15px;">
                                        <div style="margin-right: 10%;">${response.choices[0].message.content}</div>
                                    </div>`);
                messages.push({ content: response.choices[0].message.content, role: "assistant" })
            },
            error: function (xhr, status, error) {
                console.error(
                    "Request failed.  Returned status of " + xhr.status + ". Error message: " + error
                );
            },
            complete: function () {
                $("#loading-indicator").hide();
            }
        });

    } else {
        alert('Please type some question!');
        $('#chat-input').focus();
    }
});

$('#chat-input').keypress(function (event) {
    var keycode = (event.keyCode ? event.keyCode : event.which);
    if (keycode == '13') {
        $("#send").click();
        $('#chat-input').focus();
        return false;
    }
});

$('#chat-input').focus();

function handleResponseMessage(message) {

    let output = '<p>';
    let words = message.split(" ");

    for (let i = 0; i < words.length; i++) {
        let word = words[i];
        let flag = true;
        console.log(word);
        if (word.startsWith('```')) {
            flag = false;
            output.concat('<p>');
        }
        if (word === '```' || word.endWith('```')) {
            flag = false;
            output.concat('<p>');
        }
        if (word.startsWith('`') && word.endWith('`')) {
            flag = false;
            output.concat('<p>');
        }
        if (word.startsWith('```')) {
            flag = false;
            output.concat('<p>');
        }


    }


    output.concat('<p>');
}