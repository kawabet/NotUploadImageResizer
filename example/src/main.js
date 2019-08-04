import {base64ToFile,getOrientation,OrientationTransformed} from '../../index'
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
  
  reader.onload = (async (f) => {
    let originalImage = document.createElement('img')
  
    // ここから回転を修正する処理
    let orientation = await getOrientation(file)
    let base64
    if( orientation > 2){
      base64 = await OrientationTransformed(file, orientation)
    }else {
      base64 = f.target.result
    }
    // -----

    originalImage.setAttribute('src',base64 )
    originalView.innerHTML = ''    
    resizeView.innerHTML = ''    
    originalView.append(originalImage)
    
    base64ToFile(base64, lengthInput.value,file.name).then((res)=>{
      console.info(res) // 生成されたFileオブジェクト
      const url = window.URL.createObjectURL(res)
      const resizeImage = document.createElement('img')
      resizeImage.setAttribute('src',url)
      resizeView.append(resizeImage)
      originalSizeElement.innerHTML = numeral(f.total).format('0.0 b')
      resizeSizeElement.innerHTML = `${numeral(res.size).format('0.0 b')} <small>-${Math.floor((1 -  res.size / f.total) * 100) }%</small>`
      console.log((1-  res.size / f.total) * 100)
    })
  }) 
  reader.readAsDataURL(file)

})