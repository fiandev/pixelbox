class PixelArtEditor {
  constructor() {
    this.canvas = document.getElementById("pixel-canvas");
    this.ctx = this.canvas.getContext("2d", { willReadFrequently: true });
    this.initializeElements();
    this.initializeState();
    this.attachEventListeners();
  }

  initializeElements() {
    this.resSelect = document.getElementById("res-select");
    this.orientH = document.getElementById("orient-h");
    this.orientV = document.getElementById("orient-v");
    this.densitySlider = document.getElementById("density-slider");
    this.densityVal = document.getElementById("density-val");
    this.pixelateSlider = document.getElementById("pixelate-slider");
    this.pixelateVal = document.getElementById("pixelate-val");
    this.brushSlider = document.getElementById("brush-slider");
    this.brushVal = document.getElementById("brush-val");
    this.colorInput = document.getElementById("color-input");
    this.toolDraw = document.getElementById("tool-draw");
    this.toolErase = document.getElementById("tool-erase");
    this.toolPicker = document.getElementById("tool-picker");
    this.exportBtn = document.getElementById("export-btn");
    this.clearBtn = document.getElementById("clear-btn");
    this.zoomInBtn = document.getElementById("zoom-in");
    this.zoomOutBtn = document.getElementById("zoom-out");
    this.zoomResetBtn = document.getElementById("zoom-reset");
    this.imageUpload = document.getElementById("image-upload");
    this.dropZone = document.getElementById("drop-zone");
  }

  initializeState() {
    this.isDrawing = false;
    this.currentTool = "draw";
    this.orientation = "h";
    this.baseResolution = 32;
    this.brushSize = 1;
    this.zoomLevel = 1.0;
    this.originalImageData = null;
    this.defaultCanvasColor = "#ffffff";
  }

  updateCanvasDisplaySize() {
    const container = document.getElementById("drop-zone");
    const availableW = container.clientWidth - 64;
    const availableH = container.clientHeight - 64;

    const baseScale = Math.min(
      availableW / this.canvas.width,
      availableH / this.canvas.height,
    );
    const finalScale = baseScale * this.zoomLevel;

    this.canvas.style.width = `${this.canvas.width * finalScale}px`;
    this.canvas.style.height = `${this.canvas.height * finalScale}px`;
    this.zoomResetBtn.innerText = `${Math.round(this.zoomLevel * 100)}%`;
  }

  initGrid() {
    const ratio = this.resSelect.value.split(":").map(Number);
    let w, h;
    if (this.orientation === "h") {
      w = this.baseResolution * (ratio[0] / Math.min(...ratio));
      h = this.baseResolution * (ratio[1] / Math.min(...ratio));
    } else {
      h = this.baseResolution * (ratio[0] / Math.min(...ratio));
      w = this.baseResolution * (ratio[1] / Math.min(...ratio));
    }
    this.canvas.width = Math.floor(w);
    this.canvas.height = Math.floor(h);
    this.ctx.fillStyle = this.defaultCanvasColor;
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    this.densityVal.innerText = `${this.canvas.width}x${this.canvas.height}`;
    this.pixelateSlider.value = 1;
    this.pixelateVal.innerText = "1px";
    this.originalImageData = this.ctx.getImageData(
      0,
      0,
      this.canvas.width,
      this.canvas.height,
    );
    this.updateCanvasDisplaySize();
  }

  applyPixelate() {
    if (!this.originalImageData) return;
    const size = parseInt(this.pixelateSlider.value);
    if (size <= 1) {
      this.ctx.putImageData(this.originalImageData, 0, 0);
      return;
    }

    const tempCanvas = document.createElement("canvas");
    const tempCtx = tempCanvas.getContext("2d");
    tempCanvas.width = this.canvas.width;
    tempCanvas.height = this.canvas.height;
    tempCtx.putImageData(this.originalImageData, 0, 0);

    const w = this.canvas.width;
    const h = this.canvas.height;
    const scaledW = Math.max(1, Math.floor(w / size));
    const scaledH = Math.max(1, Math.floor(h / size));

    this.ctx.clearRect(0, 0, w, h);
    this.ctx.imageSmoothingEnabled = false;

    const offscreen = document.createElement("canvas");
    offscreen.width = scaledW;
    offscreen.height = scaledH;
    const offCtx = offscreen.getContext("2d");
    offCtx.drawImage(tempCanvas, 0, 0, w, h, 0, 0, scaledW, scaledH);

    this.ctx.drawImage(offscreen, 0, 0, scaledW, scaledH, 0, 0, w, h);
  }

  handleImageFile(file) {
    if (!file || !file.type.startsWith("image/")) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new Image();
      img.onload = () => {
        this.canvas.width = img.width;
        this.canvas.height = img.height;
        this.densitySlider.value = Math.max(img.width, img.height);
        this.densityVal.innerText = `${img.width}x${img.height}`;

        this.ctx.imageSmoothingEnabled = false;
        this.ctx.drawImage(img, 0, 0);
        this.originalImageData = this.ctx.getImageData(
          0,
          0,
          this.canvas.width,
          this.canvas.height,
        );
        this.pixelateSlider.value = 1;
        this.pixelateVal.innerText = "1px";
        this.updateCanvasDisplaySize();
      };
      img.src = event.target.result;
    };
    reader.readAsDataURL(file);
  }

  getMousePos(e) {
    const rect = this.canvas.getBoundingClientRect();
    const scaleX = this.canvas.width / rect.width;
    const scaleY = this.canvas.height / rect.height;
    let clientX, clientY;
    if (e.touches) {
      clientX = e.touches[0].clientX;
      clientY = e.touches[0].clientY;
    } else {
      clientX = e.clientX;
      clientY = e.clientY;
    }
    return {
      x: Math.floor((clientX - rect.left) * scaleX),
      y: Math.floor((clientY - rect.top) * scaleY),
    };
  }

  draw(e) {
    if (!this.isDrawing) return;
    const pos = this.getMousePos(e);
    if (this.currentTool === "picker") {
      const data = this.ctx.getImageData(pos.x, pos.y, 1, 1).data;
      const hex =
        "#" +
        ((1 << 24) + (data[0] << 16) + (data[1] << 8) + data[2])
          .toString(16)
          .slice(1);
      this.colorInput.value = hex;
      return;
    }
    this.ctx.fillStyle =
      this.currentTool === "erase"
        ? this.defaultCanvasColor
        : this.colorInput.value;
    const offset = Math.floor(this.brushSize / 2);
    this.ctx.fillRect(
      pos.x - offset,
      pos.y - offset,
      this.brushSize,
      this.brushSize,
    );
    this.originalImageData = this.ctx.getImageData(
      0,
      0,
      this.canvas.width,
      this.canvas.height,
    );
  }

  setActiveTool(tool, btn) {
    this.currentTool = tool;
    [this.toolDraw, this.toolErase, this.toolPicker].forEach((b) =>
      b.classList.remove("tool-active"),
    );
    btn.classList.add("tool-active");
  }

  attachEventListeners() {
    this.imageUpload.addEventListener("change", (e) => {
      this.handleImageFile(e.target.files[0]);
      this.imageUpload.value = "";
    });

    this.dropZone.addEventListener("dragover", (e) => {
      e.preventDefault();
      this.dropZone.classList.add("drag-over");
    });
    this.dropZone.addEventListener("dragleave", () => {
      this.dropZone.classList.remove("drag-over");
    });
    this.dropZone.addEventListener("drop", (e) => {
      e.preventDefault();
      this.dropZone.classList.remove("drag-over");
      this.handleImageFile(e.dataTransfer.files[0]);
    });

    this.toolDraw.addEventListener("click", () =>
      this.setActiveTool("draw", this.toolDraw),
    );
    this.toolErase.addEventListener("click", () =>
      this.setActiveTool("erase", this.toolErase),
    );
    this.toolPicker.addEventListener("click", () =>
      this.setActiveTool("picker", this.toolPicker),
    );

    this.resSelect.addEventListener("change", () => this.initGrid());
    this.densitySlider.addEventListener("input", (e) => {
      this.baseResolution = parseInt(e.target.value);
      this.initGrid();
    });

    this.pixelateSlider.addEventListener("input", (e) => {
      this.pixelateVal.innerText = `${e.target.value}px`;
      this.applyPixelate();
    });

    this.brushSlider.addEventListener("input", (e) => {
      this.brushSize = parseInt(e.target.value);
      this.brushVal.innerText = `${this.brushSize}px`;
    });

    this.orientH.addEventListener("click", () => {
      this.orientation = "h";
      this.orientH.classList.add("tool-active");
      this.orientV.classList.remove("tool-active");
      this.initGrid();
    });

    this.orientV.addEventListener("click", () => {
      this.orientation = "v";
      this.orientV.classList.add("tool-active");
      this.orientH.classList.remove("tool-active");
      this.initGrid();
    });

    this.clearBtn.addEventListener("click", () => {
      this.ctx.fillStyle = this.defaultCanvasColor;
      this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
      this.originalImageData = this.ctx.getImageData(
        0,
        0,
        this.canvas.width,
        this.canvas.height,
      );
      this.pixelateSlider.value = 1;
      this.pixelateVal.innerText = "1px";
    });

    this.exportBtn.addEventListener("click", () => {
      const link = document.createElement("a");
      link.download = `pixel-art-${Date.now()}.png`;
      link.href = this.canvas.toDataURL("image/png");
      link.click();
    });

    this.zoomInBtn.addEventListener("click", () => {
      this.zoomLevel = Math.min(this.zoomLevel + 0.25, 10.0);
      this.updateCanvasDisplaySize();
    });

    this.zoomOutBtn.addEventListener("click", () => {
      this.zoomLevel = Math.max(this.zoomLevel - 0.25, 0.1);
      this.updateCanvasDisplaySize();
    });

    this.zoomResetBtn.addEventListener("click", () => {
      this.zoomLevel = 1.0;
      this.updateCanvasDisplaySize();
    });

    this.canvas.addEventListener("mousedown", (e) => {
      this.isDrawing = true;
      this.draw(e);
    });
    window.addEventListener("mouseup", () => (this.isDrawing = false));
    this.canvas.addEventListener("mousemove", (e) => this.draw(e));

    this.canvas.addEventListener(
      "touchstart",
      (e) => {
        e.preventDefault();
        this.isDrawing = true;
        this.draw(e);
      },
      { passive: false },
    );
    window.addEventListener("touchend", () => (this.isDrawing = false));
    this.canvas.addEventListener(
      "touchmove",
      (e) => {
        e.preventDefault();
        this.draw(e);
      },
      { passive: false },
    );

    window.onload = () => this.initGrid();
    window.onresize = () => this.updateCanvasDisplaySize();
  }
}

const pixelArtEditor = new PixelArtEditor();
