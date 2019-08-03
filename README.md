
# image-to-file-converter

## Install
```
$ npm install image-to-file-converter

```

## Usage

画像パスからFileオブジェクト
```
import { pathToFile } from 'image-to-file-converter'

pathToFile('./path/to/image.jpg').then((res)=>{
      console.info(res)  // File
})  

```

## Functions
### base64ToFile
```
base64ToFile(src: string,  resize?: number, name?: string): Promise<File>
```
- src:string  | 元画像のbase64
- name?: string | 拡張子付きのファイル名
- resize?: number | 縮小後の長辺の長さ `null`または0以下の時は原寸

### pathToFile
```
pathToFile(src: string,  resize?: number): Promise<File>
```

## DEMO
https://tkpea.github.io/image-to-file-converter/example/dist/
## Example
```
$ git clone https://github.com/tkpea/image-to-file-converter.git
$ cd ./example/image-to-file-converter
$ npm install
$ npm run start
```

## TIPS
### FileオブジェクトのダウンロードURLを生成する
`let url = window.URL.createObjectURL(File);`
