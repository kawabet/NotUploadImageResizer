import {base64ToFile} from '../../index'
import numeral from 'numeral'

const fileInput = document.querySelector('.file-input')
const originalView = document.querySelector('.original .preview')
const resizeView = document.querySelector('.resize .preview')
const originalSizeElement = document.querySelector('.original .size')
const resizeSizeElement = document.querySelector('.resize .size')
const lengthInput = document.querySelector('.length')

fileInput.addEventListener('change', (event) =>{
  const file = event.target.files[0]
  const reader = new FileReader()
  if( file.type.indexOf('image') < 0){　  // 画像ファイル以外の場合は処理を中断
    return false;
  }
  reader.onload = ((f) => {
    let originalImage = document.createElement('img')
    originalImage.setAttribute('src',f.target.result)
    originalView.innerHTML = ''    
    resizeView.innerHTML = ''
    originalView.append(originalImage)
    base64ToFile(f.target.result, file, lengthInput.value).then((res)=>{
      const url = window.URL.createObjectURL(res)
      const resizeImage = document.createElement('img')
      resizeImage.setAttribute('src',url)
      resizeView.append(resizeImage)
      originalSizeElement.innerHTML = numeral(f.total).format('0.0 b')
      resizeSizeElement.innerHTML = numeral(res.size).format('0.0 b')
      
    })
  })
  reader.readAsDataURL(file)

})