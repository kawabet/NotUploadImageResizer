export  function base64ToFile(src, resize, name){
  const canvas = document.createElement("canvas")
  const context = canvas.getContext('2d')
  const image = new Image()
  // これでMIMEタイプが取れてると思うけど若干不安...
  const type = src.substring(0,src.indexOf(";")).replace('data:','')
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
      const base64 = canvas.toDataURL(type)
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
      
      // 引数にnameが設定されていない場合
      if (!name) name = `${Date.now()}.${type.replace('image/','')}`
      // fileオブジェクトを作成
      const file = new File( [barr], name , {type:type})
      resolve(file)
    })
    image.onerror = (e) => reject(e)
  })
}

export function pathToFile(src, resize){

  const canvas = document.createElement("canvas")
  const context = canvas.getContext('2d')
  const image = new Image()
  
  const name = src.match(".+/(.+?)\.[a-z]+([\?#;].*)?$")[1];
  const name_ext = src.match(".+/(.+?)([\?#;].*)?$")[1];
  let ext = name_ext.substring(name_ext.lastIndexOf('.') + 1,name_ext.length);
  if(ext == 'jpg')ext = 'jpeg' // なんか image/jpg　でbase64化すると image/png　になってしまう。
  image.src = src

  return new Promise((resolve, reject) => {
    image.onload = (() =>{  
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
      canvas.height = height
      canvas.width = width
      context.drawImage(image, 0, 0, width, height)
      
      const base64 = canvas.toDataURL(`image/${ext}`);
      console.log(base64)


    })
  })
}