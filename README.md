# Randle

This is a clone project of the popular word guessing game we all know and love. Made using React, Typescript, and Tailwind.

Try out this Smash-themed clone [**here**](https://randle.vercel.app/)!    
If you're interested, the [demo](https://reactle.vercel.app/) and [source code](https://github.com/cwackerfuss/react-wordle) of the project this is based on is also available

## Build and run

### To Run Locally:

Clone the repository and perform the following command line actions:

```bash
$> cd react-wordle
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
