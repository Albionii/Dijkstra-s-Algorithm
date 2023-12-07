function drag(ev) {
  ev.dataTransfer.setData("text",ev.target.id);
  console.log("hola")
};