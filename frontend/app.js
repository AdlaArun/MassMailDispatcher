const sendBtn = document.querySelector("#s-btn")
sendBtn.disabled = true
// ------------------------ The Note Window and Faded Background ------------------------

const closeButton = document.querySelector('.close-btn');
const modalOverlay = document.querySelector('.modal-overlay');
const noteWindow = document.querySelector('.note-window');

function closeModal() {
    noteWindow.style.display = 'none'; 
    modalOverlay.style.display = 'none';
}

closeButton.addEventListener('click', closeModal);

modalOverlay.addEventListener('click', closeModal);


// --------------------------------- Functions ------------------------------------------

const notif_1 = document.querySelector(`.notification-1`)
const notif_2 = document.querySelector(`.notification-2`)

const notifier = async (msg, num, border_color) => {
  const notifmsg = document.querySelectorAll(".notification-message")

  if (num === 1) {
    notif_1.style.display = "flex"
    notif_2.style.display = "none"

    notif_1.style.justifyContent = "center"
    notif_1.style.alignItems = "center"
    notif_1.style.flexDirection = "column"

    notif_1.style.borderColor = border_color
    notifmsg[0].innerHTML = `<h4>${msg}</h4>`
  }
  else if(num === 2){
    notif_1.style.display = "none"
    notif_2.style.display = "flex"
    notif_2.style.borderColor = border_color
    notifmsg[1].innerHTML = `<h4>${msg}</h4>`

    notif_2.style.justifyContent = "center"
    notif_2.style.alignItems = "center"

    setTimeout( () => {
      notif_2.style.display = "none"
    }, 5000)
  }
  else {
    notif_1.style.display = "none"
    notif_2.style.display = "none"
  }
}

const container = document.querySelector('.container');
const boxes = container.querySelectorAll('.box');
let currentBoxIndex = 1;

async function scrollToBox(targetBoxIndex) {
  const currentBox = boxes[currentBoxIndex - 1];
  const targetBox = boxes[targetBoxIndex - 1];
    
  if(currentBox != targetBox) {
    currentBox.classList.add('hidden');
        
    await setTimeout(() => {
      currentBox.style.display = 'none';
      targetBox.style.display = 'flex';
      targetBox.classList.add('active');
      currentBox.classList.remove('hidden');
      currentBoxIndex = targetBoxIndex; 
    }, 300);
    currentBox.classList.remove('active')
  }
}

const headings = document.querySelector('.nav-bar')
const heading = headings.querySelectorAll('h1')

function addColor(targetBoxIndex) {
  const btns = document.querySelector('.scroll-bar');
  const btn = btns.querySelectorAll('.round');
  const headings = document.querySelector('.nav-bar')
  const heading = headings.querySelectorAll('h1')

  btn[currentBoxIndex-1].style.color = "#000807";
  btn[targetBoxIndex-1].style.color = "white";
  
  if(targetBoxIndex == 3) {
    btn[currentBoxIndex-1].style.backgroundColor = "#FBF9FF";
    btn[targetBoxIndex-1].style.backgroundColor = "red";
    
    heading[currentBoxIndex-1].style.color = "#000807";
    heading[targetBoxIndex-1].style.color = "red";
    
    heading[currentBoxIndex-1].style.boxShadow = "none";
    heading[targetBoxIndex-1].style.boxShadow = "0px 0px 10px rgba(250, 0, 0, 0.5)";
  }
  else {
    btn[currentBoxIndex-1].style.backgroundColor = "#FBF9FF";
    btn[targetBoxIndex-1].style.backgroundColor = "darkgreen";
    
    heading[currentBoxIndex-1].style.color = "#000807";
    heading[targetBoxIndex-1].style.color = "darkgreen";

    heading[currentBoxIndex-1].style.boxShadow = "none";
    heading[targetBoxIndex-1].style.boxShadow = "0px 0px 20px rgba(144, 238, 144, 0.9)";
  }
  
}

const box2 = document.querySelector('#box2')
const box3 = document.querySelector('#box3')

function removeSubElements(parent) {
  while(parent.firstChild) {
    parent.removeChild(parent.firstChild)
  }
}

let mailids = {}

function addContent() {

  if(box2.childElementCount !== 0 || box3.childElementCount !== 0) {
    removeSubElements(box2)
    removeSubElements(box3)
  }
    
  for(let email of mailids.data.valid) {
    const elem = document.createElement('h4')
    elem.style.backgroundColor = "rgba(255, 255, 255, 0.9)"
    elem.style.borderRadius = "20px"
    elem.style.marginTop = "3px"
    elem.style.marginBottom = "3px"
    elem.style.height = "35px"
    elem.style.display = "flex"
    elem.style.justifyContent = "center"
    elem.style.alignItems = "center"
    elem.innerText = email
    box2.appendChild(elem)
  }
  
  for(let email of mailids.data.invalid) {
    const elem = document.createElement('h4')
    elem.style.backgroundColor = "rgba(255, 255, 255, 0.9)"
    elem.style.borderRadius = "20px"
    elem.style.marginTop = "3px"
    elem.style.marginBottom = "3px"
    elem.style.height = "35px"
    elem.style.display = "flex"
    elem.style.justifyContent = "center"
    elem.style.alignItems = "center"
    elem.innerText = email
    box3.appendChild(elem)
  }
} 

const fileUploader = async (file) => {
  try {
    const formData = new FormData()
    formData.append('file', file)

    mailids = await axios.post('/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
    console.log(mailids);
  }
  catch(err) {
    console.log(err);
    notifier("Some error Occured", 2, "#CE2D4F")
  }
}

// ------------------------------ Main Event Listeners ----------------------

const selectBtn = document.querySelector("#selectbtn")

selectBtn.addEventListener('change', async () => {
  if(selectBtn.files.length > 0) {
    const ext = selectBtn.files[0].name.split('.')[1]
    if(ext !== 'csv' && ext !== 'txt') {
      notifier("Upload a .txt/.csv file", 2, "#CE2D4F")
      return
    }
    notifier("Getting valid and invalid mails.", 1, "#F39237")
    selectBtn.disabled = true
    
    await fileUploader(selectBtn.files[0])
    
    
    addContent()
    if(mailids.data.msg === "success") {
      notifier("Successfully sorted the mails", 2, "green")
      selectBtn.disabled = false
      sendBtn.disabled = false;
      sendBtn.style.background = "linear-gradient(to right, rgb(230, 30, 77) 0%, rgb(227, 28, 95) 50%, rgb(215, 4, 102) 100%)"
    }
    else if(mailids.data.msg === "exceeded") {
      selectBtn.disabled = false
      notifier(`File shouldn't contain more than 100 valid mail ids ${mailids.data.valid.length}`, 2, "#F39237")
    }
}
else {
  notifier("No file selected.", 2, "#CE2D4F")
  sendBtn.disabled = true
  sendBtn.style.background = "linear-gradient(to right, rgb(140, 140, 136) 0%, rgb(130, 130, 125) 50%, rgb(110, 110, 106) 100%)";
}
})

const exclamationCircle = document.querySelector('.exclamation-circle');
const popupWindow = document.querySelector('.popup-window');

sendBtn.addEventListener('click', async (event) => {
  try{
    event.preventDefault()  
    const from = document.querySelector('#from')
    const subject = document.querySelector('#subject')
    const content = document.querySelector('#content-box')

    const msg = await axios.post('/send', {
      from: from.value,
      subject: subject.value,
      content: content.value
    })
    notifier(msg.data.msg, 2, "green")

    popupWindow.innerText = `Current Limit: ${100-msg.data.current_limit}`;
    from.value = ""
    subject.value = ""
    content.value = ""
    selectBtn.value = ""
  }
  catch(err) {
    notifier(`${err.response.data.msg}`, 2, "#F39237")
  }
})

function showPopupWindow() {
    popupWindow.style.display = 'block';
}

function hidePopupWindow() {
    popupWindow.style.display = 'none';
}

exclamationCircle.addEventListener('mouseenter', showPopupWindow);
exclamationCircle.addEventListener('mouseleave', hidePopupWindow);


// ------------------------------ Event Listeners --------------------------

const btn1 = document.querySelector('#btn-1'); 
const btn2 = document.querySelector('#btn-2'); 
const btn3 = document.querySelector('#btn-3'); 

btn1.addEventListener('click', () => {
  scrollToBox(1);
  addColor(1)
});

btn2.addEventListener('click', () => {
  if(selectBtn.files.length > 0) {
    scrollToBox(2);
    addColor(2)
  }
  else {
    notifier("Upload a file", 2, "#CE2D4F")
  }
});

btn3.addEventListener('click', () => {
  if(selectBtn.files.length > 0) {
    scrollToBox(3);
    addColor(3)
  }
  else {
    notifier("Upload a file", 2, "#CE2D4F")
  }
});

btn1.addEventListener('mouseover', () => {
  btn1.style.transform = "scale(1.4)"; 
})
btn1.addEventListener('mouseleave', () => {
  btn1.style.transform = "scale(1)"; 
})

btn2.addEventListener('mouseover', () => {
  btn2.style.transform = "scale(1.4)"; 
})
btn2.addEventListener('mouseleave', () => {
  btn2.style.transform = "scale(1)"; 
})

btn3.addEventListener('mouseover', () => {
  btn3.style.transform = "scale(1.4)"; 
})
btn3.addEventListener('mouseleave', () => {
  btn3.style.transform = "scale(1)"; 
})

heading[0].addEventListener('click', () => {
  scrollToBox(1);
  addColor(1);
  exclamationCircle.style.display = "flex"
});

heading[1].addEventListener('click', () => {
  if(selectBtn.files.length > 0) {
    scrollToBox(2);
    addColor(2)
    exclamationCircle.style.display = "none"
  }
  else {
    notifier("Upload a file", 2, "#CE2D4F")
  }
});

heading[2].addEventListener('click', () => {
  if(selectBtn.files.length > 0) {
    scrollToBox(3);
    addColor(3)
    exclamationCircle.style.display = "none"
  }
  else {
    notifier("Upload a file", 2, "#CE2D4F")
  }
});

heading[0].addEventListener('mouseover', () => {
  btn1.style.transform = "scale(1.4)"; 
})
heading[0].addEventListener('mouseleave', () => {
  btn1.style.transform = "scale(1)"; 
})

heading[1].addEventListener('mouseover', () => {
  btn2.style.transform = "scale(1.4)"; 
})
heading[1].addEventListener('mouseleave', () => {
  btn2.style.transform = "scale(1)"; 
})

heading[2].addEventListener('mouseover', () => {
  btn3.style.transform = "scale(1.4)"; 
})
heading[2].addEventListener('mouseleave', () => {
  btn3.style.transform = "scale(1)"; 
})

