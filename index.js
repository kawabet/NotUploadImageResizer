export  function base64ToFile(src, filePropertyBag = {}, resize){
  const canvas = document.createElement("canvas")
  const context = canvas.getContext('2d')
  const image = new Image()
  image.src = src
  return new Promise((resolve, reject) => {
    image.onload = (() =>{  
      // リサイズ後のサイズを計算する  
      let ratio,width,height;
      if(resize && resize > 0){
        if ( image.width > image.height ){
          ratio = image.height / image.width
          width = resize
          height = resize * ratio
        } else {
          ratio = image.width / image.height
          width = resize * ratio
          height = resize
        }
      } else {
        width = image.width
        height = image.height
      }
      
      // canvasをリサイズ後のサイズで作る
      canvas.height = height
      canvas.width = width
      context.drawImage(image, 0, 0, width, height)
  
      // canvasからbase64画像データを取得
      // FilePropertyが設定されていない場合はwebp形式で出力
      const base64 = canvas.toDataURL((filePropertyBag.type) ? filePropertyBag.type:"image/webp" )
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
      const file = new File( [barr], filePropertyBag.name , filePropertyBag )
      resolve(file)
    })
    image.onerror = (e) => reject(e)
  })
}

export function pathToFile(src, resize){
  const canvas = document.createElement("canvas")
  const context = canvas.getContext('2d')
  const image = new Image()
  image.src = src

  return new Promise((resolve, reject) => {
    image.onload = (() =>{  
      resolve(file)
    })
  })
}