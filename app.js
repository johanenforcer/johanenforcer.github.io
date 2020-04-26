

let channel = {actualChannel: 'east'}
const pubnubDemo = new PubNub({
publishKey: "pub-c-9104e0f9-e5b5-4025-b6e9-b1f56ba02166",
subscribeKey: "sub-c-dc91d102-6a77-11e9-a1d6-2a8c316da507"
});


function sendMsg(val){
pubnubDemo.publish({
  message: val,
  channel: channel.actualChannel});
}

pubnubDemo.addListener({
  message: function(message){
    var messp = document.createElement("p");
    var pclass = document.createAttribute("class")
    pclass.value = "message"
    console.log(message)
    var mess = document.createTextNode(message.message);
    messp.setAttributeNode(pclass)
    messp.appendChild(mess)
    console.log(message.channel)
    console.log("messp: " + messp)
    document.getElementById(message.channel + "_ch").appendChild(messp)
    document.getElementById("messageBox").value = ""
}
});


function deviceOrientationListener(event) {
  var alpha = event.alpha; 
  console.log(alpha)
  if (typeof event.webkitCompassHeading !== "undefined") {
    alpha = event.webkitCompassHeading; 
    var heading = alpha;
    if (heading>0 && heading<181) {
      channel.actualChannel = 'east';
      document.getElementById("east_ch").style.display = "block";
      document.getElementById("west_ch").style.display = "none";
    } 
    else {
      channel.actualChannel = 'west';
      document.getElementById("west_ch").style.display = "block";
      document.getElementById("east_ch").style.display = "none";
    }

  } 
  else {
    alert("Your device is not reporting values");
    var heading = "N/A"; 
    document.getElementById("heading").innerHTML = heading.toFixed([0]);

}

}
pubnubDemo.subscribe({channels: ["east", "west"]})
window.addEventListener("deviceorientation", deviceOrientationListener, true);
