# NotUploadImageResizer
```
base64ToFile(src: string, filePropertyBag?: object, resize?: number): Promise<File>


```
## src:string
元画像のbase64

## filePropertyBag?: object
元画像のfileプロパティ

## resize?: number 
縮小後の長辺の長さ `null`のときはリサイズしない

filePropertyBagの例
```
let filePropertyBag = {
  lastModified: 1561096111740,
  lastModifiedDate: Fri Jun 21 2019 14:48:31 GMT+0900 (日本標準時),
  name: "image.png",
  size: 8041,
  type: "image/png",
  webkitRelativePath: "
}
```


# Example

## Build

```
$ cd ./example
$ parcel build -d dist ./src/index.html --public-url ./
```