# PlotVault Frontend

A modern, responsive frontend application for PlotVault - a comprehensive real estate management platform built with Next.js 14, TypeScript, and Tailwind CSS.

## 🚀 Features

### Core Functionality
- **Modern Dashboard**: Intuitive admin dashboard with real-time analytics
- **Plot Management**: Complete plot lifecycle management (available, reserved, sold, transferred)
- **Customer Management**: Comprehensive CRM system for customer relationships
- **Booking System**: Advanced booking and payment management
- **Financial Management**: Integrated accounting and payment tracking
- **Document Management**: Secure document storage and sharing
- **Communication Hub**: Built-in messaging and notification system
- **Marketing Tools**: Lead generation and marketing automation
- **Construction Management**: Project tracking and milestone management
- **Analytics & Reporting**: Comprehensive business intelligence

### Technical Features
- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Type Safety**: Full TypeScript implementation
- **Modern UI Components**: Custom components with accessibility support
- **Real-time Updates**: Live data synchronization
- **Interactive Maps**: Plot visualization with filtering
- **Payment Integration**: Secure payment processing
- **File Upload**: Drag-and-drop file management
- **Search & Filtering**: Advanced search capabilities
- **Data Visualization**: Charts and graphs for analytics
- **Authentication**: Secure user authentication and authorization

## 🛠️ Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: Custom components with Radix UI primitives
- **State Management**: React Context API
- **HTTP Client**: Fetch API with custom hooks
- **Form Handling**: React Hook Form with Zod validation
- **Charts**: Chart.js with react-chartjs-2
- **Maps**: Custom interactive plot maps
- **Icons**: Lucide React
- **Deployment**: Vercel

## 📦 Installation

### Prerequisites
- Node.js 18+ 
- npm or yarn
- Git

### Setup
1. Clone the repository:
```bash
git clone https://github.com/Fahad602/plotvault-frontend.git
cd plotvault-frontend
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Create environment file:
```bash
cp .env.example .env.local
```

4. Configure environment variables:
```env
NEXT_PUBLIC_API_URL=http://localhost:3001/api/v1
NEXT_PUBLIC_APP_NAME=PlotVault
NEXT_PUBLIC_APP_VERSION=1.0.0
```

5. Start the development server:
```bash
npm run dev
# or
yarn dev
```

6. Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🏗️ Project Structure

```
frontend/
├── app/                    # Next.js App Router pages
│   ├── auth/              # Authentication pages
│   ├── dashboard/          # Dashboard pages
│   │   ├── analytics/      # Analytics dashboard
│   │   ├── bookings/       # Booking management
│   │   ├── customers/      # Customer management
│   │   ├── finance/        # Financial management
│   │   ├── plots/          # Plot management
│   │   ├── team/           # Team management
│   │   └── settings/       # Settings pages
│   ├── globals.css         # Global styles
│   ├── layout.tsx          # Root layout
│   └── page.tsx            # Home page
├── components/             # Reusable components
│   ├── auth/              # Authentication components
│   ├── dashboard/          # Dashboard components
│   ├── forms/              # Form components
│   ├── ui/                 # UI primitives
│   └── ...                 # Feature-specific components
├── contexts/               # React contexts
│   └── AuthContext.tsx     # Authentication context
├── utils/                  # Utility functions
│   └── currency.ts         # Currency formatting
├── public/                 # Static assets
│   ├── images/             # Image assets
│   └── icons/              # Icon assets
├── package.json            # Dependencies and scripts
├── tailwind.config.js      # Tailwind configuration
├── tsconfig.json           # TypeScript configuration
└── next.config.js          # Next.js configuration
```

## 🎨 UI Components

### Design System
- **Color Palette**: Modern, accessible color scheme
- **Typography**: Consistent font hierarchy
- **Spacing**: Tailwind CSS spacing system
- **Components**: Reusable, accessible components
- **Icons**: Lucide React icon library
- **Responsive**: Mobile-first responsive design

### Key Components
- **Layout Components**: Header, Sidebar, Footer
- **Form Components**: Input, Select, Textarea, Button
- **Data Display**: Tables, Cards, Charts, Maps
- **Navigation**: Breadcrumbs, Pagination, Tabs
- **Feedback**: Alerts, Modals, Toasts
- **Media**: Image galleries, File uploads

## 🔧 Development

### Available Scripts
```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
npm run type-check   # Run TypeScript check
```

### Code Quality
- **ESLint**: Code linting with Next.js rules
- **TypeScript**: Type checking and safety
- **Prettier**: Code formatting (configured)
- **Husky**: Git hooks for quality checks

### Best Practices
- **Component Structure**: Functional components with TypeScript
- **State Management**: Context API for global state
- **Error Handling**: Comprehensive error boundaries
- **Performance**: Code splitting and lazy loading
- **Accessibility**: WCAG 2.1 compliance
- **SEO**: Meta tags and structured data

## 🚀 Deployment

### Vercel (Recommended)
1. Connect your GitHub repository to Vercel
2. Set environment variables in Vercel dashboard
3. Deploy automatically on push to main branch

### Manual Deployment
```bash
npm run build
npm run start
```

### Environment Variables
```env
NEXT_PUBLIC_API_URL=https://your-backend-url.com/api/v1
NEXT_PUBLIC_APP_NAME=PlotVault
NEXT_PUBLIC_APP_VERSION=1.0.0
```

## 📱 Responsive Design

### Breakpoints
- **Mobile**: 320px - 768px
- **Tablet**: 768px - 1024px
- **Desktop**: 1024px - 1440px
- **Large Desktop**: 1440px+

### Mobile Features
- Touch-friendly interface
- Swipe gestures
- Mobile-optimized forms
- Responsive navigation
- Optimized images

## 🔐 Security

### Authentication
- JWT token-based authentication
- Secure token storage
- Automatic token refresh
- Role-based access control

### Data Protection
- Input validation and sanitization
- XSS protection
- CSRF protection
- Secure HTTP headers

## 🧪 Testing

### Testing Strategy
- **Unit Tests**: Component testing with Jest
- **Integration Tests**: API integration testing
- **E2E Tests**: User journey testing
- **Visual Tests**: Screenshot testing

### Running Tests
```bash
npm run test          # Run unit tests
npm run test:e2e     # Run E2E tests
npm run test:coverage # Run tests with coverage
```

## 📊 Performance

### Optimization Features
- **Code Splitting**: Automatic route-based splitting
- **Image Optimization**: Next.js Image component
- **Lazy Loading**: Component and image lazy loading
- **Caching**: Strategic caching strategies
- **Bundle Analysis**: Webpack bundle analyzer

### Performance Metrics
- **Lighthouse Score**: 90+ across all metrics
- **First Contentful Paint**: < 1.5s
- **Largest Contentful Paint**: < 2.5s
- **Cumulative Layout Shift**: < 0.1

## 🤝 Contributing

### Development Workflow
1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

### Code Standards
- Follow TypeScript best practices
- Use meaningful variable names
- Add JSDoc comments for complex functions
- Follow the existing code style
- Write tests for new features

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

### Getting Help
- **Documentation**: Check the docs folder
- **Issues**: Create a GitHub issue
- **Discussions**: Use GitHub discussions
- **Email**: Contact the development team

### Common Issues
- **Build Errors**: Check Node.js version and dependencies
- **TypeScript Errors**: Run `npm run type-check`
- **Styling Issues**: Check Tailwind CSS configuration
- **API Errors**: Verify backend connection and environment variables

## 🔄 Updates

### Version History
- **v1.0.0**: Initial release with core features
- **v1.1.0**: Added advanced analytics
- **v1.2.0**: Enhanced mobile experience
- **v1.3.0**: Improved performance and security

### Roadmap
- **v2.0.0**: Advanced AI features
- **v2.1.0**: Mobile app integration
- **v2.2.0**: Enhanced reporting
- **v3.0.0**: Multi-tenant support

---

**PlotVault Frontend** - Modern real estate management made simple.
