// Array.apply(null, { length: 136 }).map(function(value, index){
//   return index;
// })



function clip(value, min, max){
  if(value < min){
    return min;
  }
  if(value > max){
    return max;
  }
  return value;
}

var randomColor = function (){
  var r = function () { return Math.floor(Math.random()*256) };
  return function(){
    return "rgb(" + r() + "," + r() + "," + r() + ")";
  }
}();

var isOverlapCircle = function(b1, b2, offset){
  var dist = Math.sqrt((b1.x-b2.x)*(b1.x-b2.x)+(b1.y-b2.y)*(b1.y-b2.y));
  if(dist>(b1.size/2+b2.size/2+offset)){
    return false;
  }
  else{
    return true;
  }
}

var isOverlapRect = function(rect1, rect2){
  if (rect1.x < rect2.x + rect2.width &&
     rect1.x + rect1.width > rect2.x &&
     rect1.y < rect2.y + rect2.height &&
     rect1.height + rect1.y > rect2.y) {
    return true;
  }
  else{
    return false;
  }
}


var shuffle = function (array) {
  var i = array.length, tmp, rnd;

  // While there remain elements to shuffle...
  while (0 !== i) {

    // Pick a remaining element...
    rnd = Math.floor(Math.random() * i);
    i--;

    // And swap it with the current element.
    tmp = array[i];
    array[i] = array[rnd];
    array[rnd] = tmp;
  }

  return array;
}

var findClosest = function(arr, v){
  var r;
  var diff = Number.MAX_SAFE_INTEGER;

  for(var i=0;i<arr.length;i++){
    if(Math.abs(arr[i]-v)<diff){
      r = i;
      diff = Math.abs(arr[i]-v);
    }
  }
  return arr[r];
}

export { clip, randomColor, isOverlapCircle, shuffle, findClosest };