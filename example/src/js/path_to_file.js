import {pathToFile,base64ToFile} from '../../../index'

const targetElement = document.querySelector('.image')
const src = targetElement.src
var image = new Image();
image.onload = function(){

  pathToFile(src).then((res)=>{
    console.info(res) // 仕上がり
    window.location = window.URL.createObjectURL(res)
  })  
}

image.src = src;

