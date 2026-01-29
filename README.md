# PixelBox Studio - Pixel Art Editor

A professional web-based pixel art editor built with vanilla JavaScript and HTML5 Canvas. Create stunning pixel art with powerful drawing tools, effects, and export options perfect for game developers and digital artists.

## 🎨 Features

### Drawing Tools
- **Pencil Tool** - Draw pixel by pixel with customizable brush sizes (1-10px)
- **Eraser Tool** - Remove pixels with precision
- **Color Picker** - Sample colors directly from your canvas
- **Color Selector** - Choose any color for your artwork

### Canvas Controls
- **Multiple Resolutions** - Choose from 1:1 square, 4:3 classic, or 18:9 widescreen formats
- **Orientation Options** - Switch between horizontal and vertical layouts
- **Grid Density** - Adjust pixel density from 16px to 128px for different detail levels
- **Zoom Controls** - Zoom in/out and reset to 100% for detailed work

### Advanced Features
- **Pixelate Effects** - Apply pixelation with adjustable intensity (1-50px)
- **Import Images** - Drag and drop or click to import any image file
- **Export Artwork** - Save your pixel art as PNG files
- **Clear Canvas** - Start fresh with a clean slate
- **Real-time Preview** - See changes instantly as you draw

### User Experience
- **Responsive Design** - Works on desktop and mobile devices
- **Dark Theme** - Easy on the eyes during long creative sessions
- **Intuitive Interface** - Clean, modern UI with clear tool indicators
- **Keyboard Shortcuts** - Efficient workflow for power users

## 🚀 Quick Start

### Online Usage
Simply open `index.html` in your web browser - no installation required!

### Local Development
```bash
# Clone the repository
git clone <repository-url>
cd pixel-studio

# Start a local server
npm run dev

# Or use Python 3
python3 -m http.server 8080
```

Open `http://localhost:8080` in your browser to start creating pixel art.

## 🛠️ Technology Stack

- **Frontend**: Vanilla JavaScript (ES6+)
- **Styling**: TailwindCSS (via CDN)
- **Graphics**: HTML5 Canvas API
- **Deployment**: Cloudflare Pages
- **No Build Process**: Pure static files

## 📁 Project Structure

```
pixel-studio/
├── index.html              # Main application entry point
├── js/
│   ├── main.js             # Application initialization
│   └── pixel-editor.js     # Core pixel art editor class
├── README.md               # This file
├── package.json            # Project metadata
├── wrangler.toml           # Cloudflare Pages configuration
├── _redirects              # Fallback routing
└── .gitignore              # Git ignore rules
```

## 🌐 Deployment

### Automatic Deployment (Recommended)
1. Push this code to a GitHub repository
2. Go to Cloudflare Dashboard → Pages
3. Click "Create a project" → "Connect to Git"
4. Select your repository
5. Keep the default build settings (No build required)
6. Click "Save and Deploy"

### Manual Deployment
1. Go to Cloudflare Dashboard → Pages  
2. Click "Create a project" → "Upload assets"
3. Drag and drop all files from this project
4. Click "Deploy site"

### Other Platforms
This is a static site and can be deployed to:
- Netlify
- Vercel
- GitHub Pages
- Any static hosting service

## 🎮 How to Use

1. **Choose Your Canvas**: Select resolution and orientation from the sidebar
2. **Select a Tool**: Pick between pencil, eraser, or color picker
3. **Pick a Color**: Use the color selector to choose your drawing color
4. **Start Drawing**: Click and drag on the canvas to create pixel art
5. **Adjust Settings**: Fine-tune brush size, grid density, and pixelation effects
6. **Import/Export**: Import images to edit or export your creations as PNG

## 🎯 Use Cases

- **Game Development**: Create sprites and pixel art assets
- **Digital Art**: Express creativity with retro-style artwork
- **Icon Design**: Design pixel-perfect icons and avatars
- **Educational**: Learn about digital art and pixels
- **Prototyping**: Quickly mock up visual concepts

## 🔧 Customization

### Adding New Tools
The editor is built with a modular class structure. Add new tools by:
1. Extending the `PixelArtEditor` class in `js/pixel-editor.js`
2. Adding UI elements to `index.html`
3. Implementing tool logic in the class

### Styling
The interface uses TailwindCSS via CDN. Modify the theme by editing the `<style>` section in `index.html`.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Built with modern web standards for maximum compatibility
- Optimized for creative workflows and productivity
- Designed for pixel art enthusiasts and professionals

---

**Created by**: Fiandev  
**Version**: 1.0.0  
**Last Updated**: 2025