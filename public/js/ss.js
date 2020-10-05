const sock = io();
var count=0;
var msg = localStorage.getItem('username');
// sock.on('yawns ', data=>{
//   count=data;
// });
sock.on('redirect',data=>{
  window.close();
});
(function() {
    
    var picArray = [];
    var width = 200;    
    var height = 0;     
    var data;
    
  
    var streaming = false;
  
   
    var canvas = null;
    //var photo = null;
     
    function startup() {
      video = document.getElementById('video');
      canvas = document.getElementById('canvas');
      //photo = document.getElementById('photo');
     
  
      navigator.mediaDevices.getUserMedia({video: true, audio: false})
      .then(function(stream) {
        video.srcObject = stream;
        video.play();
      })
      .catch(function(err) {
        console.log("An error occurred: " + err);
      });
  
      video.addEventListener('canplay', function(ev){
        if (!streaming) {
          height = video.videoHeight / (video.videoWidth/width);
        
         
          if (isNaN(height)) {
            height = width / (4/3);
          }
        
          video.setAttribute('width', width);
          video.setAttribute('height', height);
          canvas.setAttribute('width', width);
          canvas.setAttribute('height', height);
          streaming = true;
        }
      }, false);
  
    //  startbutton.addEventListener('click', function(ev){
    //    takepicture();
    //    ev.preventDefault();
    //  }, false);

    //  setInterval(function () {
    //      startbutton.click();
    //      if(picArray.length>100){
    //           picArray = [];
    //       }
    //       picArray.push(data);
    //   }, 3000);

        setInterval(function(){
          var Data = takepicture();
          sock.emit('frames',{Data,msg,count});
        }, 3000);
      
      //clearphoto();
    }
  
   
  
    function clearphoto() {
      var context = canvas.getContext('2d');
      context.fillStyle = "#AAA";
      context.fillRect(0, 0, canvas.width, canvas.height);
  
      data = canvas.toDataURL('image/png');
      //photo.setAttribute('src', data);
    }
    
  
  
    function takepicture() {
      var context = canvas.getContext('2d');
      if (width && height) {
        canvas.width = width;
        canvas.height = height;
        context.drawImage(video, 0, 0, width, height);
        
        data = canvas.toDataURL('image/png');
        console.log('Picture Captured');
        return data;
        //photo.setAttribute('src', data);
      } else {
        clearphoto();
      }
    }
  
    
    window.addEventListener('load', startup, false);
  })();