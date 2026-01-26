# NexoNurse React Application

Complete React application with Unit Manager and Director/VP views.

## 🚀 Quick Start

### Prerequisites
- Node.js 16+ installed
- npm or yarn package manager

### Installation

```bash
# 1. Extract the nexonurse-react-app folder
# 2. Navigate to the directory
cd nexonurse-react-app

# 3. Install dependencies
npm install

# 4. Start development server
npm start
```

The app will open at `http://localhost:3000`

## 📁 Project Structure

```
nexonurse-react-app/
├── public/
│   └── index.html              # HTML shell
├── src/
│   ├── App.js                  # Main app with role switching
│   ├── index.js                # React entry point
│   ├── index.css               # Tailwind CSS imports
│   ├── components/
│   │   ├── Header.jsx          # Top navigation with role selector
│   │   ├── manager/            # Unit Manager Views
│   │   │   ├── ManagerView.jsx
│   │   │   ├── Dashboard.jsx
│   │   │   └── PriorityQueue.jsx
│   │   ├── director/           # Director/VP Views
│   │   │   ├── DirectorView.jsx
│   │   │   ├── ExecutiveDashboard.jsx
│   │   │   ├── PerformanceHeatMap.jsx
│   │   │   └── TeamHierarchy.jsx
│   │   └── shared/             # Shared Components
│   │       ├── QualityMetrics.jsx
│   │       ├── Staffing.jsx
│   │       └── ConsumerInsights.jsx
│   └── utils/
│       ├── api.js              # API calls
│       └── mockData.js         # Mock data for demo
├── package.json
├── tailwind.config.js
└── README.md
```

## 🎯 Features

### Unit Manager View
- ✅ Dashboard with quick stats
- ✅ Priority Queue (5 tasks sorted by urgency)
- ✅ Quality Metrics (Diabetic A1C, Post-Discharge, Med Adherence, Preventive Care)
- ✅ Staffing (Today's snapshot, coverage by shift)
- ✅ Consumer Insights (CAHPS, JD Power, Google Reviews)

### Director/VP View
- ✅ Executive Performance Dashboard
  - Service Line Average: 84%
  - Units On Track: 9/12
  - Needs Attention: 3 units
  - Upcoming Milestones: 5
- ✅ Performance Heat Map (12 units color-coded)
- ✅ Areas of Concern (3 units needing intervention)
- ✅ Success Stories (2 top performers)
- ✅ Team Hierarchy (Organizational structure)

## 🔄 Role Switching

Use the dropdown in the header to switch between:
- **Unit Manager** - Operational view with daily tasks
- **Director/VP Dashboard** - Strategic view with unit performance

## 🎨 Styling

Built with Tailwind CSS for:
- Responsive design (mobile, tablet, desktop)
- Consistent color scheme
- Professional UI components
- Smooth transitions and interactions

## 📊 Data Flow

Currently using mock data from `src/utils/mockData.js`.

### To Connect Real APIs:

1. **Update `src/utils/api.js`**:
```javascript
export async function fetchPriorityQueue(unitId, filters = {}) {
  const response = await fetch(`${API_BASE_URL}/api/units/${unitId}/priority-queue`, {
    headers: {
      'Authorization': `Bearer ${getAuthToken()}`,
      'Content-Type': 'application/json'
    }
  });
  return response.json();
}
```

2. **Add authentication**:
```javascript
// In src/App.js
useEffect(() => {
  // Replace mockUser with real authentication
  const authenticateUser = async () => {
    const response = await fetch('/api/auth/me');
    const userData = await response.json();
    setUser(userData);
  };
  authenticateUser();
}, []);
```

## 🚢 Deployment

### Development
```bash
npm start
```

### Production Build
```bash
npm run build
```

This creates an optimized build in the `build/` folder ready for deployment.

### Deploy to Vercel
```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
vercel
```

### Deploy to Other Platforms
The `build/` folder can be deployed to:
- **GitHub Pages**: Static hosting
- **AWS S3**: Cloud storage with CloudFront CDN
- **Netlify**: Continuous deployment
- **Kaiser Permanente Internal**: Upload to internal servers

## 🧪 Testing

```bash
npm test
```

## 🔧 Configuration

### Environment Variables

Create `.env` file:
```
REACT_APP_API_URL=https://api.nexonurse.kaiserpermanente.org
REACT_APP_AUTH_DOMAIN=auth.kaiserpermanente.org
```

### Tailwind Configuration

Edit `tailwind.config.js` to customize colors, fonts, etc.

## 📝 Development Roadmap

### Phase 1 (Current - Demo)
- [x] Component-based architecture
- [x] Unit Manager view
- [x] Director/VP view
- [x] Role switching
- [x] Mock data
- [x] Responsive design

### Phase 2 (Next - 2-4 weeks)
- [ ] Connect to real APIs (Tableau, Insight, EPIC)
- [ ] User authentication (Kaiser SSO)
- [ ] Real-time data updates
- [ ] Loading states and error handling
- [ ] Unit tests

### Phase 3 (Production - 2-3 months)
- [ ] Advanced filtering and search
- [ ] Data export capabilities
- [ ] Custom dashboards
- [ ] Notifications system
- [ ] Mobile app (React Native)

### Phase 4 (Enterprise - 6-12 months)
- [ ] AI/ML predictions
- [ ] Advanced analytics
- [ ] Multi-language support
- [ ] Accessibility (WCAG 2.1 AA)
- [ ] Performance optimization

## 🐛 Troubleshooting

### Port 3000 already in use
```bash
# Kill process on port 3000
npx kill-port 3000

# Or use different port
PORT=3001 npm start
```

### Dependencies not installing
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
```

### Tailwind styles not working
```bash
# Rebuild Tailwind
npm run build:css
```

## 📞 Support

For questions or issues:
- Create issue in GitHub repository
- Contact development team
- Email: nexonurse-support@kaiserpermanente.org

## 📄 License

Internal use only - Kaiser Permanente

---

**Built with ❤️ for Kaiser Permanente Clinical Operations**
