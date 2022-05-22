
// const btn = document.getElementById('reload')
const shotElement = document.getElementById('shot')
let screenshotInterval;
(async() => {
  await fetch("./config.json").then((response) => {
      return response.json();
    })
    .then((config)=> {
      console.log(config);
      screenshotInterval = config.screenshotInterval
    });



  setInterval(async () => {
    const shotPath = await window.electronAPI.openFile()
    shotElement.setAttribute("src",`${shotPath}?r=${Math.random()}`) 
  },screenshotInterval)
})()
  

