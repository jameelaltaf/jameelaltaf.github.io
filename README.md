# Jameel Altaf Wani - Portfolio Website

A modern, animated portfolio website for Jameel Altaf Wani - Performance Marketing Specialist.

## Features

- 🎨 Modern dark theme with gradient accents
- ✨ Smooth scroll animations and transitions
- 📱 Fully responsive design
- 🖱️ Custom cursor effects (desktop)
- 📊 Animated statistics counter
- 📬 Contact form with Formspree integration
- 🎯 Performance optimized

## Sections

1. **Hero** - Animated name reveal with role and location
2. **About** - Professional summary with photo and statistics
3. **Services** - Key services offered
4. **Experience** - Timeline of work history
5. **Skills** - Technical skills and certifications
6. **Contact** - Contact form and details

## Tech Stack

- HTML5
- CSS3 (Custom Properties, Flexbox, Grid)
- Vanilla JavaScript
- GSAP (GreenSock Animation Platform)

## Setup

1. Clone the repository
2. Open in VS Code or your preferred editor
3. Run with a local server:
   ```bash
   # Using Python
   python3 -m http.server 8000
   
   # Using Node.js (npx)
   npx serve
   
   # Using PHP
   php -S localhost:8000
   ```
4. Open `http://localhost:8000` in your browser

## Contact Form Setup

The contact form uses [Formspree](https://formspree.io/) for handling submissions. To set up:

1. Go to [formspree.io](https://formspree.io/)
2. Create a free account
3. Create a new form
4. Copy your form endpoint (e.g., `https://formspree.io/f/your-form-id`)
5. Update the endpoint in `js/main.js`:
   ```javascript
   const response = await fetch('https://formspree.io/f/YOUR-FORM-ID', {
   ```

## Customization

### Colors
Edit CSS variables in `css/style.css`:
```css
:root {
    --color-accent: #ff6b35;
    --color-accent-secondary: #f7c948;
    /* ... */
}
```

### Content
Edit `index.html` to update:
- Personal information
- Services
- Experience
- Skills

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

© 2025 Jameel Altaf Wani. All rights reserved.
