const shotElement = document.getElementById('shot')
let screenshotInterval,getShotUrl;

let validateImage = (pathImg) => {
  return new Promise((resolve, reject) => {
      let ImgObj = new Image(); //判断图片地址是否有效
      ImgObj.src = pathImg;
      ImgObj.onload = (res) => {
          resolve(pathImg);
      }
      ImgObj.onerror = (err) => {
         reject(err)
      }
  })
}

(async() => {
  await fetch("./config.json").then((response) => {
      return response.json();
    })
    .then((config)=> {
      screenshotInterval = config.screenshotInterval
      getShotUrl = config.getShotUrl
    });

    

  setInterval(async () => {
    let pathName= `${getShotUrl}?r=${Math.random()}`;
    await window.electronAPI.openFile()
    await validateImage(pathName).then(() => {
      shotElement.setAttribute("src",pathName)
    })
  },screenshotInterval)
})()
  

