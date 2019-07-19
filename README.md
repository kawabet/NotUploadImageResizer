# NotUploadImageResizer
```
base64ToFile(src: string, filePropertyBag?: object, resize?: number): Promise<File>

```
src:string -> 元画像のbase64

filePropertyBag?: object -> 元画像のfileプロパティ

resize?: number -> 縮小後のサイズ `null`のときはリサイズしない
