# Modern Portfolio Wireframe Template

**[Live Demo](https://portfolio-wireframe-template.vercel.app/) | [GitHub Repository](https://github.com/Youyou972/portfolio-wireframe-template)**

A clean, responsive portfolio wireframe template built with React, TypeScript, Tailwind CSS, and Framer Motion. This template provides a solid foundation for developers and designers to showcase their work with a modern, interactive UI.

## Features

- Modern and minimalist design with customizable components
- Interactive particle background effect with click interactions
- Fully responsive layout for all device sizes
- Smooth animations and transitions using Framer Motion
- Modular component architecture for easy customization
- Generic placeholder content ready to be personalized

## Components

- **Navigation**: Responsive navbar with smooth scrolling navigation
- **Hero**: Eye-catching introduction section with animated elements
- **Portfolio**: Filterable project showcase with detailed project cards
- **TechStack**: Visual display of technologies and skills
- **AboutContact**: Combined about and contact information section
- **ParticleEffect**: Interactive floating particles with click interactions
- **ProjectDetail**: Modal component for displaying detailed project information
- **Footer**: Site footer with links and copyright information

## Getting Started

### Prerequisites

- Node.js (v14.0.0 or higher)
- npm or yarn

### Installation

1. Clone this repository:
   ```bash
   git clone https://github.com/yourusername/portfolio-wireframe-template.git
   cd portfolio-wireframe-template
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

3. Start the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. Open your browser and navigate to `http://localhost:5173`

## Customization

### Replacing Placeholder Content

1. **Personal Information**: Update text in the `Hero.tsx` and `AboutContact.tsx` components
2. **Projects**: Modify the project data in the `Portfolio.tsx` component
3. **Skills**: Update the technologies in the `TechStack.tsx` component
4. **Social Links**: Replace the social media links in the `Footer.tsx` and `AboutContact.tsx` components
5. **Images**: Replace placeholder images with your own in the respective components

### Styling

The template uses Tailwind CSS for styling. You can customize the look and feel by:

1. Modifying the color scheme in the Tailwind configuration
2. Adjusting component styles directly in their respective files
3. Adding custom CSS in the `index.css` file

## Project Structure

```
src/
├── components/
│   ├── AboutContact.tsx
│   ├── Footer.tsx
│   ├── Hero.tsx
│   ├── Navigation.tsx
│   ├── ParticleEffect.tsx
│   ├── Portfolio.tsx
│   ├── ProjectDetail.tsx
│   └── TechStack.tsx
├── App.tsx
├── main.tsx
└── index.css
```

## Technologies Used

- [React](https://reactjs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Framer Motion](https://www.framer.com/motion/)
- [React Icons](https://react-icons.github.io/react-icons/)
- [Vite](https://vitejs.dev/)

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgements

- Placeholder images provided by [Placehold.co](https://placehold.co/)
- Icons from [React Icons](https://react-icons.github.io/react-icons/)

---

Feel free to use this template for your personal or commercial projects. If you find it helpful, consider giving it a star on GitHub!
