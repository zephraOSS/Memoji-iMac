var memojiurl;

document.querySelector(".content form").addEventListener("submit", (ele) => {
  ele.preventDefault();

  if(!document.querySelector("form input[name='inp_memoji']").value) return document.querySelector(".errormsg").textContent = "Please upload a picture", document.querySelector(".errormsg").style.display = "block";
  else if(!document.querySelector("form input[name='inp_memoji_color']:checked").value) return document.querySelector(".errormsg").textContent = "Please select a color", document.querySelector(".errormsg").style.display = "block";
  else if(document.querySelector("form input[name='inp_memoji']").value) document.querySelector(".errormsg").textContent = "", document.querySelector(".errormsg").style.display = "none";
  else if(document.querySelector("form input[name='inp_memoji_color']:checked").value) document.querySelector(".errormsg").textContent = "", document.querySelector(".errormsg").style.display = "none";

  const canvas = document.createElement('canvas');
  const input = {
    color: document.querySelector("form input[name='inp_memoji_color']:checked").value,
    head: document.querySelector("form input[name='inp_memoji_size']:checked").value
  };

  canvas.id = "CursorLayer";
  canvas.width = 512;
  canvas.height = 512;
  canvas.style.zIndex = 8;
  canvas.style.position = "absolute";
  canvas.style.border = "1px solid";

  document.querySelector("body .content .adjust").appendChild(canvas);

  cursorLayer = document.getElementById("CursorLayer");

  var setting = {
    background: "",
    image: input.color,
    head: input.head
  }

  if(input.color === "yellow" || input.color === "orange") setting.background = "#F9DAAA";
  else if(input.color === "blue") setting.background = "#CDEAFB";
  else if(input.color === "purple") setting.background = "#D9D0F9";
  else if(input.color === "green") setting.background = "#CAF0CB";
  else if(input.color === "silver") setting.background = "#D5D5D7";

  const ctx = canvas.getContext("2d");

  var imac = new Image();
  imac.onload = function() {
    ctx.drawImage(imac, 27, 241, 457, 271);
  };
  imac.src = `img/computers/${setting.image}.png`;

  setTimeout(function() {
    ctx.globalCompositeOperation = 'destination-over';

    var memoji = new Image();
    memoji.onload = function() {
      if(setting.head === "big") ctx.drawImage(memoji, 31, -20, 450, 450);
      else if(setting.head === "middle") ctx.drawImage(memoji, 45, -5, 421, 421);
      else if(setting.head === "small") ctx.drawImage(memoji, 51, 1, 410, 410);
    };
    memoji.src = memojiurl;

    setTimeout(function() {
      ctx.fillStyle = setting.background;
      ctx.fillRect(0, 0, 512, 512);
    }, 20);
  }, 50);

  document.querySelector(".errormsg").textContent = "If the image contains errors, please submit the form again";
  document.querySelector(".errormsg").style.display = "block";

  return false;
});

function encodeImageFileAsURL(element) {
  var file = element.files[0];
  var reader = new FileReader();
  reader.onloadend = function() {
    memojiurl = reader.result;
  }
  reader.readAsDataURL(file);
}
