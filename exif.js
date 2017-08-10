var arrayBufferToBase64 = function (buffer){
  var binary = '';
  var bytes = new Uint8Array(buffer);
  var len = bytes.byteLength;
  for (var i = 0; i < len; i++){
    binary += String.fromCharCode(bytes[i]);
  }
  return window.btoa( binary );
}
var base64ToArrayBuffer = function (base64){
    var binary_string =  window.atob(base64);
    var len = binary_string.length;
    var bytes = new Uint8Array(len);
    for (var i = 0; i < len; i++){
        bytes[i] = binary_string.charCodeAt(i);
    }
    return bytes.buffer;
}
var getOrientation = function (buffer, callback){
  var view = new DataView(buffer);
  if (view.getUint16(0, false) != 0xFFD8) return -2;
  var length = view.byteLength, offset = 2;
  while (offset < length) {
    var marker = view.getUint16(offset, false);
    offset += 2;
    if (marker == 0xFFE1) {
      if (view.getUint32(offset += 2, false) != 0x45786966) return -1;
      var little = view.getUint16(offset += 6, false) == 0x4949;
      offset += view.getUint32(offset + 4, little);
      var tags = view.getUint16(offset, little);
      offset += 2;
      for (var i = 0; i < tags; i++)
        if (view.getUint16(offset + (i * 12), little) == 0x0112)
          return view.getUint16(offset + (i * 12) + 8, little);
    }
    else if ((marker & 0xFF00) != 0xFF00) break;
    else offset += view.getUint16(offset, false);
  }
  return -1;
};
var paintEXIF = function(f){
  var img = new Image();
  var reader = new FileReader();
  //read file and show float
  reader.onload = function(e) {
    //compress image
    img.onload = function() {   
      //file to canvas
      var w = this.naturalWidth;
      var h = this.naturalHeight;
      var tw = w>1600?1600:w;
      var th = tw/w*h;
      //exif fix
      //roll roll roll
      var orientation = getOrientation(e.target.result);
      var canvas = document.querySelector('#input');
      var ctx = canvas.getContext('2d');
      ctx.save();
      //this will reset context!
      if(orientation>=5){
        canvas.width = th;
        canvas.height = tw;
      }
      else{
        canvas.width = tw;
        canvas.height = th;
      }
      switch(orientation){
        case 2:
          // horizontal flip
          ctx.translate(canvas.width, 0);
          ctx.scale(-1, 1);
          break;
        case 3:
          // 180° rotate left
          ctx.translate(canvas.width, canvas.height);
          ctx.rotate(Math.PI);
          break;
        case 4:
          // vertical flip
          ctx.translate(0, canvas.height);
          ctx.scale(1, -1);
          break;
        case 5:
          // vertical flip + 90 rotate right
          ctx.rotate(0.5 * Math.PI);
          ctx.scale(1, -1);
          break;
        case 6:
          // 90° rotate right
          ctx.rotate(0.5 * Math.PI);
          ctx.translate(0, -canvas.width);
          break;
        case 7:
          // horizontal flip + 90 rotate right
          ctx.rotate(0.5 * Math.PI);
          ctx.translate(canvas.height, -canvas.width);
          ctx.scale(-1, 1);
          break;
        case 8:
          // 90° rotate left
          ctx.rotate(-0.5 * Math.PI);
          ctx.translate(-canvas.height, 0);
          break;
      }  
      ctx.drawImage(img, 0, 0, w, h, 0, 0, tw, th);
      // ctx.drawImage(img, 0, 0, w, h);
      
      ctx.restore();
      //canvas to blob
      var data = canvas.toDataURL("image/jpeg");
      data = atob(data.split(',')[1]);
      var bufferArray = new Uint8Array(data.length);
      for (var i=0; i<data.length; i++) {
        bufferArray[i] = data.charCodeAt(i);
      };
      var blob = new Blob([bufferArray], {
       type: "image/jpeg"
      });
    };
    img.src = 'data:image/jpeg;base64,'+arrayBufferToBase64(e.target.result);
  }; 
  reader.readAsArrayBuffer(f);
}
var handleFileSelect = function (evt) {
  var files = evt.target.files;
  for (var i = 0, f; f = files[i]; i++) {
    if (!f.type.match('image.*')) {
      continue;
    }
    paintEXIF(f);
    // reader.readAsDataURL(f);
  }
}