
# image-utilis-js
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

## Example

### Build
```
$ cd ./example
$ parcel build -d dist ./src/index.html --public-url ./
```

## TIPS
### ダウンロードURLを生成する
`let url = window.URL.createObjectURL(File);`