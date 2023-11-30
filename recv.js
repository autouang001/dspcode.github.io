
let peer;
let localStream;
let activeCall;

const localVideo = document.getElementById('localVideo');
const remoteVideo = document.getElementById('remoteVideo');
const startVideo = document.getElementById('startVideo');
const endVideo = document.getElementById('endVideo');


peer = new Peer('dspChatrecv');

peer.on('open', (id) => {
    console.log('My ID is: ' + id);
    console.log("Ready To Receive");
    startVideo.style.display = 'block';
});

peer.on('call', (call) => {
    navigator.mediaDevices.getUserMedia({ video: { facingMode: "user" }, audio: true })
        .then((stream) => {
            localStream = stream;
            call.answer(stream);
            call.on('stream', (remoteStream) => {
                startVideo.style.display = 'none';
                endVideo.style.display = 'block';
                localVideo.srcObject = stream;
                remoteVideo.srcObject = remoteStream;
            });
            activeCall = call;
        })
        .catch((error) => {
            console.error('Error accessing media devices:', error);
        });
});

function recvFromConn() {
    alert('Waiting Incoming Connection');
}

function endVideoCall() {
  if (localStream) {
    localStream.getTracks().forEach(track => track.stop());
  }
  location.reload();
}