import * as PIXI from 'pixi.js';

/**
 * The App class initializes the PixiJS application and sets up the game.
 * It is the entry point for the game logic.
 */
export class App {
    constructor() {
        this.initializePixiApp();
    }

    private initializePixiApp() {
        const app = new PIXI.Application({ background: '#1099bb'});
        // Enable PixiJS Chrome extension initialization code
        (globalThis as any).__PIXI_APP__ = app;

        // Add the canvas to the HTML document
        const canvas = app.view as HTMLCanvasElement;
        document.body.appendChild(canvas);

        // Set up event listener for window resize
        window.addEventListener('resize', () => {
            this.windowResize(canvas);
        });
        this.windowResize(canvas);
    }

    /**
     * Resizes canvas size according to window size, From EVENT_RESIZE events
     * @param canvas {Canvas} the canvas instance to be resized
     */
    windowResize(canvas:HTMLCanvasElement) {
        const  SCREEN_WIDTH = 1024;
        const  SCREEN_HEIGHT = 768;
        const ASPECT_RATIO = SCREEN_WIDTH / SCREEN_HEIGHT;
        const containerWidth = window.innerWidth;
        const containerHeight = window.innerHeight;
        let newHeight = containerWidth / ASPECT_RATIO;
        let newWidth = 0;

        if (newHeight > containerHeight) {
            newHeight = containerHeight;
            newWidth = newHeight * ASPECT_RATIO;
        } else {
            newWidth = containerWidth;
        }

        (canvas as any).style.height = newHeight + 'px';
        (canvas as any).style.width = newWidth + 'px';
    }
}
