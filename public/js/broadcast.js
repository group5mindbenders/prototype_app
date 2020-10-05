const peerConnections = {};
const config = {
  iceServers: [
    {
      urls: ["stun:stun.l.google.com:19302"]
    }
  ]
};
const sock = io();
const socket = io.connect(window.location.origin);

socket.on("answer", (id, description) => {
  peerConnections[id].setRemoteDescription(description);
  peerConnections[id].ontrack = event => {
    document.getElementById(id).srcObject=event.streams[0];
  };
});

socket.on("watcher", id => {
  if(!(id in peerConnections)){
    var remote=document.createElement('video');
    remote.autoplay=true;
    remote.setAttribute('id',id);
    remote.setAttribute('style',"width:40%;height:40%;padding:2%;");
    document.querySelector(".videos").append(remote);
    document.querySelector(".videos")
  }

  const peerConnection = new RTCPeerConnection(config);
  peerConnections[id] = peerConnection;

  let stream = videoElement.srcObject;
  stream.getTracks().forEach(track => peerConnection.addTrack(track, stream));

  peerConnection.onicecandidate = event => {
    if (event.candidate) {
      socket.emit("candidate", id, event.candidate);
    }
  };
  
  peerConnection
    .createOffer()
    .then(sdp => peerConnection.setLocalDescription(sdp))
    .then(() => {
      socket.emit("offer", id, peerConnection.localDescription);
    });
});
  sock.on('sleeparr',yawnarr=>{
    while(document.querySelector('.S')){
      document.querySelector('.S').parentNode.removeChild(document.querySelector('.S'));
      
  }// console.log(yawnarr);
    yawnULtimate=yawnarr;
    let unique = [...new Set(yawnarr)];
    unique.forEach(student=> {
      console.log(student,":")
      count=0

      const div = document.createElement('div'); 
      div.classList.add('S'); 
      yawnarr.forEach(user => {
        if(student==user){
          count++;
        }
      });
      div.innerHTML=`${student}: ${count}`;
      document.querySelector('.yawn').appendChild(div);
      console.log(count);
    });
  });
  

socket.on("candidate", (id, candidate) => {
  peerConnections[id].addIceCandidate(new RTCIceCandidate(candidate));
  console.log("peer id =",id);
});

socket.on("disconnectPeer", id => {
  
  peerConnections[id].close();
  document.getElementById(id).remove();
  delete peerConnections[id];
});

window.onunload = window.onbeforeunload = () => {
  socket.close();
};

const videoElement = document.getElementById('localVideo');
const callButton = document.getElementById('callButton');
const endButton = document.getElementById('endButton');
endButton.disabled=true;
callButton.addEventListener('click',getStream);
async function getStream() {
  console.log('Requesting local stream');
  if (window.stream) {
    window.stream.getTracks().forEach(track => {
      track.stop();
    });
  }
  navigator.mediaDevices.getUserMedia({audio: true, video: true})
    .then(stream=>{
      window.stream = stream;
      videoElement.srcObject = stream;
      socket.emit("broadcaster");
      callButton.disabled = true;
      endButton.disabled=false;
    })
    .catch(e=>{
      alert("Media Permissions denied!!");
    });
}

endButton.addEventListener('click',endcall);
async function endcall(){
  callButton.disabled = true;
  endButton.disabled=false;
  window.location="/";
}

function handleError(error) {
  console.error("Error: ", error);
}

function board() {
  socket.emit('users',"open window");
  window.open(`https://nameless-wildwood-33094.herokuapp.com/`);
  console.log('emitted');
}
//var msg = JSON.parse(window.localstorage.getItem('username'));
function QnA() {
  window.open(`https://mindbenders-qna-app.herokuapp.com/?cid=admin`);
  socket.emit('qna',"open tab");
  //var targetWin;
  var msg = JSON.stringify(localStorage.getItem('username'));
  //let msg = {uname: localStorage.getItem('username')};
  console.log(msg);
  //targetWin = 
  
  //targetWin.postMessage({'user': "Sindhu"},'https://simpleqna.herokuapp.com/');
  console.log('answer');
  
}
