![](https://raw.githubusercontent.com/RustyImageTools/RustyImageTools.github.io/web/rusty.webp)

# Rusty Image Tools

[RustyImageTools.github.io](https://RustyImageTools.github.io)

An app that allows users to resize an image and convert it's file type at output.

## Features:
* PWA - Installable as standalone app. 
* Offline support - Works offline. (no server required)
* Privacy first | No tracking - This is a static site that runs client side only.
* It's Fast. Writen in rust using the image and exif crates, compiled to wasm at ~4Mb.
* No limits (no file or size limits, scale 30Mb images in less than a few seconds on your cellphone)
* Supports multiple file formats
* Free and open source. MIT license
* Keep original origination, Reads in exif data to keep rotation/flip metadata

## Development

You can use the serve.py file to run this locally if you want. 
```
python3 serve.py
```

Compiling wasm
```
cargo build --target wasm32-unknown-unknown
wasm-pack build --target web
```
