/**
 * 
 * @param {*} src 
 * @param {*} resize 
 * @param {*} name 
 */
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

//**
/* 
* @param {*} src 
* @param {*} resize
*/
export function pathToFile(src, resize){

  const canvas = document.createElement("canvas")
  const context = canvas.getContext('2d')
  const image = new Image()
  

  const name_ext = src.match(".+/(.+?)([\?#;].*)?$")[1];
  let ext = name_ext.substring(name_ext.lastIndexOf('.') + 1,name_ext.length);
  if(ext == 'jpg')ext = 'jpeg' // なんか image/jpg　でbase64化すると image/png　になってしまう。
  const type = `images/${ext}`
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
      
      const base64 = canvas.toDataURL(type);
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
      
      // fileオブジェクトを作成
      const file = new File( [barr], name_ext , {type:type})
      resolve(file)


    })
    image.onerror = (e) => reject(e)
  })
}

/**
* 
* @param {*} file 
* @param {*} orientation 
*/
export  function getOrientation(file){
  const reader = new FileReader()

  if( file.type.indexOf('image') < 0){　  // 画像ファイル以外の場合は処理を中断
    return false;
  }


  return new Promise((resolve, reject) => {
    reader.readAsArrayBuffer(file)
    reader.addEventListener('load', () => {
      let orientation = 0
      const dv = new DataView(reader.result)
      if (dv.getUint16(2) === 65505) {
        const littleEndian = dv.getUint8(12) === 73
        const count = dv.getUint16(20, littleEndian)
        for (let i = 0; i < count; i++) {
          const start = 22 + i * 12
          const tag = dv.getUint16(start, littleEndian)
          if (tag === 274) {
            const value = dv.getUint16(start + 8, littleEndian)
            orientation = value
          }
        }
      }
      resolve(orientation)
    });
  })
}

/**
 * 
 * @param {*} file 
 * @param {*} orientation 
 */
export  function OrientationTransformed(file, orientation){

  const reader = new FileReader()
  if( file.type.indexOf('image') < 0){　  // 画像ファイル以外の場合は処理を中断
    return false;
  }

  return new Promise((resolve, reject) => {
    reader.readAsDataURL(file)
    reader.addEventListener('load', () => {
      let img = new Image()
      img.src = reader.result
      const type = reader.result.substring(0,reader.result.indexOf(";")).replace('data:','')
      img.addEventListener('load', () => {
        const canvas = document.createElement('canvas')
        const ctx = canvas.getContext('2d')
  
        if ([5,6,7,8].indexOf(orientation) > -1) {
          canvas.width = img.height
          canvas.height = img.width
        } else {
          canvas.width = img.width
          canvas.height = img.height
        }
        switch (orientation) {
          case 2: ctx.transform(-1, 0, 0, 1, img.width, 0); break
          case 3: ctx.transform(-1, 0, 0, -1, img.width, img.height); break
          case 4: ctx.transform(1, 0, 0, -1, 0, img.height); break
          case 5: ctx.transform(0, 1, 1, 0, 0, 0); break
          case 6: ctx.transform(0, 1, -1, 0, img.height, 0); break
          case 7: ctx.transform(0, -1, -1, 0, img.height, img.width); break
          case 8: ctx.transform(0, -1, 1, 0, 0, img.width); break
        }
        ctx.drawImage(img, 0, 0)
        const base64 = canvas.toDataURL(type);
        resolve(base64)   
      })
    })
  });
}