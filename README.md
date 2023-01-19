# Coredle

This is Wordle using words related to Omega Strikers and its competitive scene, ft. players, major tournaments, slang, stages, characters, you name it. Made using React, Typescript, and Tailwind.

![Screenshot 2023-01-16 010823](https://user-images.githubusercontent.com/7319798/212609801-16c39f9a-1842-4608-a192-d7f73a806b22.jpg)

Try out this Omega Strikers-themed clone [**here**](https://coredle.kuyachi.xyz/)!

If you're interested, check out the [demo](https://reactle.vercel.app/) and [source code](https://github.com/cwackerfuss/react-wordle) of the project this is based on

[![ko-fi](https://ko-fi.com/img/githubbutton_sm.svg)](https://ko-fi.com/V7V2AN4X2)

## Build and run

### To Run Locally:

Clone the repository and perform the following command line actions:

```bash
$> cd coredle
$> npm install
$> npm run start
```

### To build/run docker container:

#### Development

```bash
$> docker build -t game:dev .
$> docker run -d -p 3000:3000 game:dev
```

Open [http://localhost:3000](http://localhost:3000) in browser.

#### Production

```bash
$> docker build --target=prod -t game:prod .
$> docker run -d -p 80:80 game:prod
```

Open [http://localhost](http://localhost) in browser.
