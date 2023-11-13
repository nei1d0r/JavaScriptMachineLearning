class SketchPad {
  constructor(container, size=400) {

    // create our canvas element and append
    this.canvas = document.createElement("canvas")
    this.canvas.height = size;
    this.canvas.width = size;
    this.canvas.style=`
      background-color: white;
      box-shadow: 0px 0px 10px 2px black;
    `;
    container.appendChild(this.canvas)

    const lineBreak = document.createElement("br")
    container.appendChild(lineBreak)

    this.undoBtn = document.createElement("button");
    this.undoBtn.innerHTML = 'UNDO'
    container.appendChild(this.undoBtn)

    // enable drawing via canvas context
    this.ctx = this.canvas.getContext("2d");

    this.reset()

    this.#addEventListeners();
  }

  #addEventListeners() {
    this.canvas.onmousedown = (event) => {
      const mouse = this.#getMouse(event)

      // enable drawing
      this.paths.push([mouse])
      this.isDrawing = true
    };

    this.canvas.onmousemove = (event) => {
      if (this.isDrawing) {
        const mouse = this.#getMouse(event)
        // push mouse coordinates to path array
        const lastPath = this.paths[this.paths.length - 1];
        lastPath.push(mouse)
        this.#redraw()
      }
    };

    document.onmouseup = () => {
      console.log(Boolean(!this.paths.length))
      this.undoBtn.disabled = Boolean(!this.paths.length);
      this.isDrawing = false;
    }

    this.canvas.ontouchstart = (event) => {
      const location = event.touches[0]
      this.canvas.onmousedown(location)
    }

    this.canvas.ontouchmove = (event) => {
      const location = event.touches[0]
      this.canvas.onmousemove(location)
    }

    document.ontouchend = (event) => {
      this.canvas.onmouseup()
    }

    this.undoBtn.onclick = () => {
      if (this.paths.length) {
        this.paths.pop()
        this.#redraw()
      }
    }
  };

  #getMouse(event) {
    const rect = this.canvas.getBoundingClientRect(); // get context bounding area

    // set up mouse click event array
    return [ // array syntax translates to co-ordinates within the canvas boundary (top-left = 0,0 etc)
      Math.round(event.clientX - rect.left),
      Math.round(event.clientY - rect.top),
    ]
  }

  #redraw() {
    // clear canvas area
    this.ctx.clearRect(0,0, this.canvas.width, this.canvas.height);
    // draw path
    draw.paths(this.ctx, this.paths); // draw utility is implemented in its own script
    this.undoBtn.disabled = Boolean(!this.paths.length);
  }

  reset() {
    this.paths = []
    this.isDrawing = false
    this.#redraw()
  }
};