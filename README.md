# NotUploadImageResizer
```
base64ToFile(src: string,  resize?: number, name?: string): Promise<File>


```
## src:string
元画像のbase64

## name?: string
拡張子付きのファイル名

## resize?: number 
縮小後の長辺の長さ `null`のときはリサイズしない

# Example

## Build

```
$ cd ./example
$ parcel build -d dist ./src/index.html --public-url ./
```