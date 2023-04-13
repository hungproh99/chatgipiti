let apiKey = "";

function getKey() {
    let cookies = document.cookie;
    if (cookies) {
        let decodedCookie = decodeURIComponent(cookies);
        let ca = decodedCookie.split(";");
        for (let i = 0; i < ca.length; i++) {
            if (ca[i].includes('randomStr')) {
                apiKey = ca[i].split('=')[1]
                $('.filter').hide();
            }
        }
    } else {
        console.log("randomStr not found!");
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
    } else {
        alert('Please input API key!');
    }
});

$('#reinput-key').click(function (e) {
    e.preventDefault();
    $('#api-key').val(apiKey);
    $('.filter').show();
});

$("#send").click(function (e) {
    e.preventDefault();
    if ($("#chat-input").val()) {
        $("#chat-zone").append(`<div class="chat-sent">
                                <div style="margin-left: 10%;">${$("#chat-input").val()}</div>
                                <img src="images/user.png" alt="" style="margin-left: 15px; margin-right: 15px;">
                            </div>`);
        $("#loading-indicator").show();
        $.ajax({
            url: "https://api.openai.com/v1/chat/completions",
            type: "POST",
            contentType: "application/json",
            data: JSON.stringify({
                messages: [{ role: "user", content: $("#chat-input").val() }],
                temperature: 0.7,
                max_tokens: 256,
                top_p: 1,
                frequency_penalty: 0,
                presence_penalty: 0,
                model: "gpt-3.5-turbo"
            }),
            headers: {
                Authorization: `Bearer ${apiKey}`,
            },
            success: function (response) {
                $("#chat-zone").append(`<div class="chat-received">
                                        <img src="images/chatgpt-icon.png" alt="" style="margin-right: 15px; margin-left: 15px;">
                                        <div style="margin-right: 10%;">${response.choices[0].message.content}</div>
                                    </div>`);
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
    }
});
