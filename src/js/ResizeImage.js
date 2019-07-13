export  function resizeImage(src, size = 500){
  const canvas = document.createElement("canvas")
  const context = canvas.getContext('2d')
  const image = new Image()
  image.src = src
  return new Promise((resolve, reject) => {
    image.onload = (() =>{  
      // リサイズ後のサイズを計算する  
      let ratio,width,height;
      if ( image.width > image.height ){
        ratio = image.height / image.width
        width = size
        height = size * ratio
      } else {
        ratio = image.width / image.height
        width = size * ratio
        height = size
      }
      // canvasをリサイズ後のサイズで作る
      canvas.height = height
      canvas.width = width
      context.drawImage(image, 0, 0, width, height)
  
      // canvasからbase64画像データを取得
      const base64 = canvas.toDataURL('image/jpeg')
      // base64からBlobデータを作成
      let barr, bin, i, len
      bin = atob(base64.split('base64,')[1])
      len = bin.length;
      barr = new Uint8Array(len)
  
      i = 0
      while ( i < len ) {
        barr[i] = bin.charCodeAt(i)
        i++
      }
      resolve(new Blob([barr], {type: 'image/jpeg'}))
    })
    image.onerror = (e) => reject(e)
  })
}