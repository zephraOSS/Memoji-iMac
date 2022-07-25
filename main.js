let memojiURL = "";

document.querySelector(".content form").addEventListener("submit", (ele) => {
    ele.preventDefault();

    if (!document.querySelector("form input[name='inp_memoji']").value) {
        document.querySelector(".errorMSG").textContent =
            "Please upload a picture";
        document.querySelector(".errorMSG").style.display = "block";
        return;
    } else if (
        !document.querySelector("form input[name='inp_memoji_color']:checked")
            .value
    ) {
        document.querySelector(".errorMSG").textContent =
            "Please select a color";
        document.querySelector(".errorMSG").style.display = "block";
        return;
    } else if (document.querySelector("form input[name='inp_memoji']").value) {
        document.querySelector(".errorMSG").textContent = "";
        document.querySelector(".errorMSG").style.display = "none";
    } else if (
        document.querySelector("form input[name='inp_memoji_color']:checked")
            .value
    ) {
        document.querySelector(".errorMSG").textContent = "";
        document.querySelector(".errorMSG").style.display = "none";
    }

    document.querySelector("canvas")?.remove();

    const canvas = document.createElement("canvas");
    const input = {
        color: document.querySelector(
            "form input[name='inp_memoji_color']:checked"
        ).value,
        bgcolor: document.querySelector(
            "form input[name='inp_memoji_bgcolor']:checked"
        ).value,
        head: document.querySelector(
            "form input[name='inp_memoji_size']:checked"
        ).value
    };

    canvas.id = "CursorLayer";
    canvas.width = 512;
    canvas.height = 512;
    canvas.style.zIndex = 8;

    document.querySelector("body .content .adjust").appendChild(canvas);

    cursorLayer = document.getElementById("CursorLayer");

    var setting = {
        background: "",
        image: input.color,
        head: input.head
    };

    if (input.bgcolor === "yellow") setting.background = "#FBEAA9";
    else if (input.bgcolor === "orange") setting.background = "#F9DAAA";
    else if (input.bgcolor === "blue") setting.background = "#CDEAFB";
    else if (input.bgcolor === "purple") setting.background = "#D9D0F9";
    else if (input.bgcolor === "pink") setting.background = "#F6C7D3";
    else if (input.bgcolor === "green") setting.background = "#CAF0CB";
    else if (input.bgcolor === "silver") setting.background = "#D5D5D7";

    const ctx = canvas.getContext("2d");

    var imac = new Image();
    imac.onload = function () {
        ctx.drawImage(imac, 27, 241, 457, 271);
    };
    imac.src = `img/computers/${setting.image}.png`;

    setTimeout(function () {
        ctx.globalCompositeOperation = "destination-over";

        var memoji = new Image();
        memoji.onload = function () {
            if (setting.head === "big")
                ctx.drawImage(memoji, 31, -20, 450, 450);
            else if (setting.head === "middle")
                ctx.drawImage(memoji, 45, -5, 421, 421);
            else if (setting.head === "small")
                ctx.drawImage(memoji, 51, 1, 410, 410);
        };
        memoji.src = memojiURL;

        setTimeout(function () {
            ctx.fillStyle = setting.background;
            ctx.fillRect(0, 0, 512, 512);
        }, 20);
    }, 50);

    document.querySelector(".errorMSG").textContent =
        "If the image contains errors, please submit the form again";
    document.querySelector(".errorMSG").style.display = "block";
});

function encodeImageFileAsURL(element) {
    const reader = new FileReader();

    reader.onloadend = function () {
        memojiURL = reader.result;
    };

    reader.readAsDataURL(element.files[0]);
}
