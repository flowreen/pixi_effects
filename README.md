# Pixi Effects
## Overview
This is a web application written in typescript that displays various features of the PixiJS engine.

Example:

https://gyazo.com/75714ef2f9044f04a3440649c2621593

https://gyazo.com/cd65d1f47c792a3591ce922b3645fd19

https://gyazo.com/61863f2c66b2e006c22acfc4db42c11a

## Features
Card animations: Adding a stack of cards on the canvas then reversing the stack.

main challenge was to find a way to change the layer of the cards that were added on stage, solved by finding the sortableChildren property of the container and mapping the z index of the cards so they can be reversed in a natural way

Text and images object tool: Display a container with random images or random texts with varying font sizes or both.

main challenge was finding a way to generate the random objects, solved by creating an array of MixedObject class that supports both fonts for texts and images

Particles animation: Display an awesome fire effect.

main challenge was finding a good realistic fire configuration, solved by playing around with colors until it looked decent

Switching between the features mentioned above using a friendly UI.

main challenge was to keep Pixi application optimized, solved by safely stopping emitters/animations and using a sprite pool for the massive number of sprites

## Prerequisites
Node.js

npm

## Installation
1. Clone the repository:
git clone https://github.com/flowreen/pixi_effects.git

2. Navigate to the project directory:
cd pixi_effects

3. Install dependencies:
npm install

## Running the App
To start the application, run:
npm start
This will start the development server, and the application will be available at http://localhost:8080.

## Project Structure
src/: Source code directory.

assets/: Folder for assets images.

index.ts: Main entry point of the application.

App.ts: Core logic and Pixi setup.
