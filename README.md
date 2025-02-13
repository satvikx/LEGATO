# Crescendo 🎵

A modern platform for musicians to share performances, collaborate, and grow their audience. Built with Next.js 14, Tailwind CSS, and shadcn/ui components.

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Next.js](https://img.shields.io/badge/Next.js-14-black)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue)

## 🚀 Features

- **Secure Authentication** via NextAuth.js with multiple provider support
- **High-Performance Media Handling** using ImageKit for optimal image and video delivery
- **Real-time Engagement** with dynamic likes, comments, and sharing
- **Responsive Design** built with shadcn/ui components and Tailwind CSS
- **Advanced Video Features**:
  - Multi-angle video playback
  - Slow-motion practice mode
  - Collaborative split-screen performances
  - Custom video filters for musicians

## 🛠️ Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui
- **Authentication**: NextAuth.js
- **Media Management**: ImageKit
- **Database**: MongoDB
- **Deployment**: 

## 📦 Installation

```bash
# Clone the repository
git clone https://github.com/satvikx/crescendo.git

# Navigate to project directory
cd crescendo

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env.local

# Run the development server
npm run dev
```

## 🔑 Environment Variables

```plaintext
# Authentication
NEXTAUTH_SECRET=your-secret-key

# Database
MONGODB_URI=your-database-url

# ImageKit
NEXT_PUBLIC_PUBLIC_KEY=your-public-key
IMAGEKIT_PRIVATE_KEY=your-private-key
NEXT_PUBLIC_URL_ENDPOINT=your-url-endpoint

```

## 🎯 Core Features

### Authentication
- Multi-provider authentication (Google, Email)
- Protected routes and API endpoints
- Persistent user sessions

### Media Management
- Automated video compression and optimization
- Secure file upload with ImageKit
- Custom video player with musician-specific features

### User Experience
- Dark/Light mode support
- Responsive design for all devices
- Accessible UI components with shadcn/ui

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for details.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/)
- [shadcn/ui](https://ui.shadcn.com/)
- [NextAuth.js](https://next-auth.js.org/)
- [ImageKit](https://imagekit.io/)
- [Tailwind CSS](https://tailwindcss.com/)

## 📬 Contact

Project Link: [https://github.com/satviks/crescendo](https://github.com/satvikx/crescendo)