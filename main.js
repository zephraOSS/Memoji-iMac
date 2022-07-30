let memojiURL = "";

document.querySelector(".content form").addEventListener("submit", (ele) => {
    ele.preventDefault();

    if (!document.querySelector("form input[name='inp_memoji']").value) {
        document.querySelector(".errorMsg").textContent =
            "Please upload a picture";
        document.querySelector(".errorMsg").style.display = "block";
        return;
    } else if (
        !document.querySelector("form input[name='inp_memoji_color']:checked")
            .value
    ) {
        document.querySelector(".errorMsg").textContent =
            "Please select a color";
        document.querySelector(".errorMsg").style.display = "block";
        return;
    } else if (document.querySelector("form input[name='inp_memoji']").value) {
        document.querySelector(".errorMsg").textContent = "";
        document.querySelector(".errorMsg").style.display = "none";
    } else if (
        document.querySelector("form input[name='inp_memoji_color']:checked")
            .value
    ) {
        document.querySelector(".errorMsg").textContent = "";
        document.querySelector(".errorMsg").style.display = "none";
    }

    document.querySelector("canvas")?.remove();

    const canvas = document.createElement("canvas"),
        input = {
            color: document.querySelector(
                "form input[name='inp_memoji_color']:checked"
            ).value,
            backgroundColor: document.querySelector(
                "form input[name='inp_memoji_bgcolor']:checked"
            ).value,
            head: document.querySelector(
                "form input[name='inp_memoji_size']:checked"
            ).value
        },
        setting = {
            background: "",
            image: input.color,
            head: input.head
        };

    canvas.id = "MemojiGenerated";
    canvas.width = 512;
    canvas.height = 512;

    document.querySelector("body .content").appendChild(canvas);

    switch (input.backgroundColor) {
        case "yellow":
            setting.background = "#FBEAA9";
            break;

        case "orange":
            setting.background = "#F9DAAA";
            break;

        case "blue":
            setting.background = "#CDEAFB";
            break;

        case "purple":
            setting.background = "#D9D0F9";
            break;

        case "pink":
            setting.background = "#F6C7D3";
            break;

        case "green":
            setting.background = "#CAF0CB";
            break;

        case "silver":
            setting.background = "#D5D5D7";
            break;
    }

    const ctx = canvas.getContext("2d"),
        iMac = new Image();

    iMac.addEventListener("load", () => ctx.drawImage(iMac, 27, 241, 457, 271));
    iMac.src = `img/computers/${setting.image}.png`;

    setTimeout(function () {
        const memoji = new Image();

        ctx.globalCompositeOperation = "destination-over";

        memoji.addEventListener("load", () => {
            if (setting.head === "big")
                ctx.drawImage(memoji, 31, -20, 450, 450);
            else if (setting.head === "middle")
                ctx.drawImage(memoji, 45, -5, 421, 421);
            else if (setting.head === "small")
                ctx.drawImage(memoji, 51, 1, 410, 410);
        });

        memoji.src = memojiURL;

        memoji.addEventListener("load", () => {
            ctx.fillStyle = setting.background;
            ctx.fillRect(0, 0, 512, 512);
        });
    }, 50);

    document.querySelector(".errorMsg").textContent =
        "If the image contains errors, please submit the form again";
    document.querySelector(".errorMsg").style.display = "block";
});

function encodeImageFileAsURL(element) {
    const reader = new FileReader();

    reader.onloadend = function () {
        memojiURL = reader.result;
    };

    reader.readAsDataURL(element.files[0]);
}
