import * as PIXI from 'pixi.js';

/**
 * The App class initializes the PixiJS application and sets up the game.
 * It is the entry point for the game logic.
 */
export class App {
    app: PIXI.Application<PIXI.ICanvas>;
    spritePool: PIXI.Sprite[] = [];
    spriteStack: PIXI.Sprite[] = [];
    secondStack: PIXI.Sprite[] = [];
    topCardZIndex: number = 0;
    stackCountText: PIXI.Text | undefined;
    fpsText: PIXI.Text | undefined;
    animationTickersArray: PIXI.Ticker [] = [];
    spriteAnimationIntervalID: NodeJS.Timeout | undefined;
    containerTask1 = new PIXI.Container();
    containerTask2 = new PIXI.Container();
    containerTask3 = new PIXI.Container();
    overlayButtons = new PIXI.Container();
    currentView = 1;

    constructor() {
        this.app = new PIXI.Application({background: '#1099bb'});
        this.initializeCanvas();

        this.app.stage.addChild(this.containerTask1);
        this.containerTask1.sortableChildren = true;
        this.app.stage.addChild(this.containerTask2);
        this.app.stage.addChild(this.containerTask3);
        this.app.stage.addChild(this.overlayButtons);

        this.createOverlay();

        this.showTask1();
    }

    showTask1() {
        this.initializeSpriteStack();
        this.createTextElements();
    }

    switchTask1() {
        if (this.currentView == 1) {
            return;
        }
        this.currentView = 1;
        this.clearView2();
        this.clearView3();
        this.initializeSpriteStack();
        this.createTextElements();
    }

    switchTask2() {
        if (this.currentView == 2) {
            return;
        }
        this.currentView = 2;
        this.clearView1();
        this.clearView3();
    }

    switchTask3() {
        if (this.currentView == 3) {
            return;
        }
        this.currentView = 3;
        this.clearView1();
        this.clearView2();
    }

    /**
     * Resizes canvas size according to window size, From EVENT_RESIZE events
     * @param canvas {Canvas} the canvas instance to be resized
     */
    windowResize(canvas: HTMLCanvasElement) {
        const SCREEN_WIDTH = 1024;
        const SCREEN_HEIGHT = 768;
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

        canvas.style.height = newHeight + 'px';
        canvas.style.width = newWidth + 'px';
    }

    clearView1(): void {
        if (this.spriteAnimationIntervalID != undefined) {
            clearInterval(this.spriteAnimationIntervalID);
            this.spriteAnimationIntervalID = undefined; // Reset the interval ID
        }
        for (let i = 0; i < this.animationTickersArray.length; i++) {
            this.animationTickersArray[i].stop();
        }
        this.animationTickersArray = [];
        if (this.stackCountText) {
            this.containerTask1.removeChild(this.stackCountText);
            this.stackCountText = undefined;
        }
        if (this.fpsText) {
            this.containerTask1.removeChild(this.fpsText);
            this.fpsText = undefined;
        }
        while (this.containerTask1.children.length > 0) {
            const sprite = this.containerTask1.getChildAt(0);
            this.releaseSprite(sprite as PIXI.Sprite);
            this.containerTask1.removeChild(sprite);
        }
        this.spriteStack = [];
        this.secondStack = [];
    }

    private createOverlay(): void {
        let button;
        button = PIXI.Sprite.from('assets/ball1.png');
        button.width = 50;
        button.height = 50;
        button.interactive = true;
        button.x = (this.app.screen.width - 50);
        button.y = (this.app.screen.height / 2 - 100);
        button.on('click', this.switchTask1.bind(this));
        this.overlayButtons.addChild(button);

        button = PIXI.Sprite.from('assets/ball2.png');
        button.width = 50;
        button.height = 50;
        button.interactive = true;
        button.x = (this.app.screen.width - 50);
        button.y = (this.app.screen.height / 2);
        button.on('click', this.switchTask2.bind(this));
        this.overlayButtons.addChild(button);

        button = PIXI.Sprite.from('assets/ball3.png');
        button.width = 50;
        button.height = 50;
        button.interactive = true;
        button.x = (this.app.screen.width - 50);
        button.y = (this.app.screen.height / 2 + 100);
        button.on('click', this.switchTask3.bind(this));
        this.overlayButtons.addChild(button);
    }

    private initializeCanvas() {
        // Enable PixiJS Chrome extension initialization code
        (globalThis as any).__PIXI_APP__ = this.app;

        // Add the canvas to the HTML document
        const canvas = this.app.view as HTMLCanvasElement;
        document.body.appendChild(canvas);
        this.app.stage.sortableChildren = true;

        // Set up event listener for window resize
        window.addEventListener('resize', () => {
            this.windowResize(canvas);
        });
        this.windowResize(canvas);
    }

    private getSprite(): PIXI.Sprite {
        if (this.spritePool.length > 0) {
            return this.spritePool.pop()!;
        } else {
            return PIXI.Sprite.from("assets/sprite.webp");
        }
    }

    private releaseSprite(sprite: PIXI.Sprite): void {
        this.spritePool.push(sprite);
    }

    private createSprites(): void {
        const TOTAL_SPRITES = 144;
        const SPRITE_WIDTH = 150;
        const SPRITE_HEIGHT = 150;
        for (let i = 0; i < TOTAL_SPRITES; i++) {
            const sprite = this.getSprite();
            sprite.width = SPRITE_WIDTH;
            sprite.height = SPRITE_HEIGHT;
            sprite.x = 0;
            sprite.y = i;
            sprite.zIndex = ++this.topCardZIndex;
            this.spriteStack.push(sprite);
            this.containerTask1.addChild(sprite);
        }
    }

    private clearView2(): void {
    }

    private clearView3(): void {
    }

    private initializeSpriteStack() {
        this.topCardZIndex = 0;
        this.createSprites();
        this.spriteAnimationIntervalID = setInterval(() => {
            this.animateSprite();
        }, 1000); // Trigger every 1000 milliseconds (1 second)
    }

    private createTextElements() {
        this.stackCountText = new PIXI.Text('', {fill: '#ffffff'});
        this.stackCountText.position.set(60, 0);
        this.stackCountText.zIndex = 999;
        this.fpsText = new PIXI.Text('', {fill: '#ffffff'});
        this.fpsText.position.set(130, 30);
        this.fpsText.zIndex = 999;
        this.containerTask1.addChild(this.fpsText);
        this.containerTask1.addChild(this.stackCountText);
        this.app.ticker.add(() => {
            if (this.stackCountText) {
                this.stackCountText.text = `Stack 1: ${this.spriteStack.length} | Stack 2: ${this.secondStack.length}`;
            }
            if (this.fpsText) {
                this.fpsText.text = `FPS: ${this.app.ticker.FPS.toFixed(2)}`;
            }
        });
    }

    private animateSprite() {
        if (this.spriteStack.length === 0) {
            return;
        }

        const sprite = this.spriteStack.pop();
        if (sprite) {
            this.topCardZIndex++;
            sprite.zIndex = this.topCardZIndex;
            const targetX = 300;

            // Animation duration in milliseconds
            const animationDuration = 20;

            // Use PixiJS's ticker for the animation
            const ticker = new PIXI.Ticker();
            this.animationTickersArray.push(ticker);
            ticker.add((delta) => {
                if (sprite) {
                    const moveAmount = delta / animationDuration;
                    sprite.x += (targetX - sprite.x) * moveAmount;

                    if (Math.abs(sprite.x - targetX) < 1) {
                        sprite.x = targetX;
                        this.secondStack.push(sprite);
                        ticker.stop();
                    }
                }
            });
            ticker.start();
        }
    }
}
