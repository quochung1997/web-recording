var recordingArea = document.getElementById('recording-area');
var emailArea = document.getElementById('email-area');

var email = '';

recordingArea.style.display = 'none';

var emailBtn = document.getElementById('emailBtn');
emailBtn.addEventListener('click', () => {
  var emailInput = document.getElementById('email-input');
  email = emailInput.value;
  console.log(email);

  if (email) {
    emailArea.style.display = 'none';
    recordingArea.style.display = 'block';
  } else {
    alert('bạn phải nhập email');
  }

});

var listLabels = [
  {
    title: 'dig_khong',
    viName: 'không',
    isDone: false
  },
  {
    title: 'dig_mot',
    viName: 'một',
    isDone: false
  },
  {
    title: 'dig_hai',
    viName: 'hai',
    isDone: false
  },
  {
    title: 'dig_ba',
    viName: 'ba',
    isDone: false
  },
  {
    title: 'dig_bon',
    viName: 'bốn',
    isDone: false
  },
  {
    title: 'dig_nam',
    viName: 'năm',
    isDone: false
  },
  {
    title: 'dig_sau',
    viName: 'sáu',
    isDone: false
  },
  {
    title: 'dig_bay',
    viName: 'bảy',
    isDone: false
  },
  {
    title: 'dig_tam',
    viName: 'tám',
    isDone: false
  },
  {
    title: 'dig_chin',
    viName: 'chín',
    isDone: false
  },
  {
    title: 'dig_muoi',
    viName: 'mười',
    isDone: false
  },
  {
    title: 'op_bang',
    viName: 'bằng',
    isDone: false
  },
  {
    title: 'op_cong',
    viName: 'cộng',
    isDone: false
  },
  {
    title: 'op_tru',
    viName: 'trừ',
    isDone: false
  },
  {
    title: 'op_nhan',
    viName: 'nhân',
    isDone: false
  },
  {
    title: 'op_chia',
    viName: 'chia',
    isDone: false
  },
  {
    title: 'sub_lam',
    viName: 'lăm',
    isDone: false
  },
  {
    title: 'sub_mot',
    viName: 'mốt',
    isDone: false
  },
  {
    title: 'sub_muoi',
    viName: 'mươi',
    isDone: false
  },
  {
    title: 'sub_tatca',
    viName: 'tất cả',
    isDone: false
  },
  {
    title: 'sub_tư',
    viName: 'lăm',
    isDone: false
  },
  {
    title: 'sub_xoa',
    viName: 'xóa',
    isDone: false
  },
  {
    title: 'sub_linh',
    viName: 'linh',
    isDone: false
  },
  {
    title: 'un_tram',
    viName: 'trăm',
    isDone: false
  },
  {
    title: 'un_nghin',
    viName: 'nghìn',
    isDone: false
  },
  {
    title: 'un_trieu',
    viName: 'triệu',
    isDone: false
  },
];

var currentLabelNumber = -1;
const MAX_NUMBER = 26;

var btnNext = document.getElementById('nextBtn');
var btnStart = document.getElementById('startBtn');
btnStart.disabled = true;



btnNext.addEventListener("click", () => {
  currentLabelNumber++;
  
  if (currentLabelNumber < MAX_NUMBER) {
    var labelTxt = document.getElementById('labelTxt');
    
    labelTxt.innerHTML = listLabels[currentLabelNumber].viName;
    btnNext.disabled = true;
    btnStart.innerHTML = "bắt đầu";
    btnStart.disabled = false;
  } else {
    var labelTxt = document.getElementById('title');
    labelTxt.innerHTML = 'Bạn đã ghi âm đủ, xin cảm ơn';
    btnNext.disabled = true;
    btnStart.disabled = true;
  }
  
});

// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyCMg7-9cRZ5bOhKbNtd1WegY2VvMXe2i5g",
  authDomain: "quochungfirbae-voicerecords.firebaseapp.com",
  databaseURL: "https://quochungfirbae-voicerecords.firebaseio.com",
  projectId: "quochungfirbae-voicerecords",
  storageBucket: "quochungfirbae-voicerecords.appspot.com",
  messagingSenderId: "9793094910",
  appId: "1:9793094910:web:3853b4dfb0f3d4f933d1af"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

var storage = firebase.storage;


btnStart.addEventListener("click", () => {  
  if (btnStart.innerText == "BẮT ĐẦU"){
    var labelsCountProg = document.getElementById('labelsCountProg');
    var labelsCountTxt = document.getElementById('labelsCountTxt');

    var percent = 100*(currentLabelNumber+1)/MAX_NUMBER;
    labelsCountProg.style.width = percent+'%';
    labelsCountTxt.innerHTML = currentLabelNumber+1;
    console.log(percent);

    currenLabel = listLabels[currentLabelNumber];

    btnNext.disabled = false;
    btnStart.innerHTML = "ghi lại";

    navigator.mediaDevices.getUserMedia({ audio: true })
      .then(stream => {
        const mediaRecorder = new MediaRecorder(stream);
        mediaRecorder.start();

        const audioChunks = [];
        mediaRecorder.addEventListener("dataavailable", event => {
          audioChunks.push(event.data);
        });

        mediaRecorder.addEventListener("stop", () => {
          const audioBlob = new Blob(audioChunks);
          const audioUrl = URL.createObjectURL(audioBlob);
          const audio = new Audio(audioUrl);
          // audio.play();

          var storageRef = firebase.storage().ref();
          var ref = storageRef.child(currenLabel.title+'/'+email+"_"+(new Date()).getTime());

          var file = audioBlob;
          ref.put(file).then(function(snapshot) {
            console.log('Uploaded a blob or file!');
          });

        });

        setTimeout(() => {
          mediaRecorder.stop();
        }, 1000);
  });

  } else {
    
  }
});
