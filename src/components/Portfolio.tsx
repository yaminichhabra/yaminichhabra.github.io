import React, { useState, useEffect, useRef, useMemo } from 'react';
import { Terminal, Code2, Zap, Database, Cloud, Cpu, TrendingUp, Users, Shield, Gauge, ChevronRight, ExternalLink, Github, Linkedin, Mail, Phone, Award, Target, Briefcase, Star, Quote, CheckCircle } from 'lucide-react';

// Define types for our data structures
type SkillItem = {
  name: string;
  level: number;
  experience: string;
  realWork: string;
};

type SkillCategory = {
  icon: JSX.Element;
  color: string;
  items: SkillItem[];
};

type Skills = {
  frontend: SkillCategory;
  backend: SkillCategory;
  cloud: SkillCategory;
  leadership: SkillCategory;
};

const Portfolio = () => {
  const [activeTerminal, setActiveTerminal] = useState(0);
  const [typedText, setTypedText] = useState('');
  const [currentCommand, setCurrentCommand] = useState(0);
  const [isTyping, setIsTyping] = useState(true);
  const [activeMetric, setActiveMetric] = useState(0);
  const [activeSkillCategory, setActiveSkillCategory] = useState<keyof Skills>('frontend');
  const [currentRecommendation, setCurrentRecommendation] = useState(0);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const commands = useMemo(() => [
    "git log --oneline --author='Yamini Chhabra' | head -10",
    "// Active GitHub contributions • Real hands-on coding",
    "ls ~/side-projects/",
    "// twilio-pager/ smart-home-lights/ meme-generator-cli/",
    "grep -r 'performance improvement' production/",
    "// 25% faster Cambridge University Press app",
    "python3 ~/home-automation/deploy-lights.py --status=success",
    "// 🟢 House lights now green - deployment successful!",
    "docker stats pangea-production",
    "// AI flight integration • 85% automation achieved",
    "curl -s https://api.github.com/users/yaminichhabra7",
    "// Real GitHub stats loading above ↑",
    "// Ready to architect your next billion-user platform 🚀"
  ], []);

  const faangMetrics = [
    { value: "6M+", label: "Users Served", icon: <Users className="w-5 h-5" />, detail: "Cambridge University Press platform" },
    { value: "25%", label: "Performance Boost", icon: <Gauge className="w-5 h-5" />, detail: "Page load time improvement" },
    { value: "85%", label: "Automation Gain", icon: <Zap className="w-5 h-5" />, detail: "Manual data entry reduction" },
    { value: "70%", label: "Bug Reduction", icon: <Shield className="w-5 h-5" />, detail: "Through testing frameworks" },
    { value: "110%", label: "User Growth", icon: <TrendingUp className="w-5 h-5" />, detail: "Pangea Wrapped feature impact" },
    { value: "40%", label: "Deploy Speed", icon: <Cpu className="w-5 h-5" />, detail: "CI/CD pipeline optimization" }
  ];

  const linkedinRecommendations = [
    {
      name: "Senior Engineering Manager",
      company: "Cambridge University Press",
      text: "Yamini consistently delivered high-quality solutions and demonstrated exceptional technical leadership. Her work on our educational platform improved performance by 25% and enhanced user experience for over 100K students globally.",
      rating: 5
    },
    {
      name: "Technical Director",
      company: "Vista Higher Learning",
      text: "Outstanding full-stack engineer with deep expertise in React and Node.js. Yamini's implementation of our SSO system was flawless and significantly improved security across our platform.",
      rating: 5
    },
    {
      name: "Product Manager",
      company: "The Pangea Technology Group",
      text: "Yamini is a founding-level engineer who can take complex requirements and deliver elegant solutions. Her AI flight integration feature reduced manual work by 85% and drove our user growth by 110%.",
      rating: 5
    }
  ];

  // Matrix-style background
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const updateCanvasSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    updateCanvasSize();

    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*()";
    const fontSize = 12;
    const columns = canvas.width / fontSize;
    const drops = Array(Math.floor(columns)).fill(1);

    const draw = () => {
      if (!ctx) return;
      
      ctx.fillStyle = 'rgba(15, 23, 42, 0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      ctx.fillStyle = '#3b82f6';
      ctx.font = `${fontSize}px 'JetBrains Mono', monospace`;
      
      for (let i = 0; i < drops.length; i++) {
        const text = chars[Math.floor(Math.random() * chars.length)];
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);
        
        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      }
    };

    const interval = setInterval(draw, 120);
    window.addEventListener('resize', updateCanvasSize);
    
    return () => {
      clearInterval(interval);
      window.removeEventListener('resize', updateCanvasSize);
    };
  }, []);

  // Terminal typing effect
  useEffect(() => {
    if (!isTyping || currentCommand >= commands.length) return;

    const command = commands[currentCommand];
    if (typedText.length < command.length) {
      const timeout = setTimeout(() => {
        setTypedText(command.slice(0, typedText.length + 1));
      }, Math.random() * 50 + 30);
      return () => clearTimeout(timeout);
    } else {
      const timeout = setTimeout(() => {
        if (currentCommand < commands.length - 1) {
          setCurrentCommand(currentCommand + 1);
          setTypedText('');
        } else {
          setIsTyping(false);
        }
      }, 1200);
      return () => clearTimeout(timeout);
    }
  }, [typedText, currentCommand, isTyping, commands]);

  // Recommendation cycling
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentRecommendation((prev) => (prev + 1) % linkedinRecommendations.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [linkedinRecommendations.length]);

  const skills: Skills = {
    frontend: {
      icon: <Code2 className="w-5 h-5" />,
      color: "from-blue-500 to-cyan-400",
      items: [
        { name: "React", level: 98, experience: "6+ years", realWork: "CUP Nemo, Pangea, VHL Reader" },
        { name: "React Native", level: 95, experience: "5+ years", realWork: "CUP Nemo, Pangea mobile apps" },
        { name: "TypeScript", level: 92, experience: "8+ years", realWork: "Enterprise applications" },
        { name: "Angular", level: 88, experience: "5+ years", realWork: "VHL Reader, seed applications" },
        { name: "Vue.js", level: 85, experience: "3+ years", realWork: "Cambridge University Press" }
      ]
    },
    backend: {
      icon: <Database className="w-5 h-5" />,
      color: "from-emerald-500 to-teal-400",
      items: [
        { name: "Node.js", level: 96, experience: "10 years", realWork: "All major projects, REST APIs" },
        { name: "Java", level: 90, experience: "3+ years", realWork: "Enterprise backend systems" },
        { name: "MongoDB", level: 88, experience: "5+ years", realWork: "Pangea, data modeling" },
        { name: "Express", level: 94, experience: "10 years", realWork: "API development, middleware" },
        { name: "Redis", level: 85, experience: "10 years", realWork: "Caching, session management" }
      ]
    },
    cloud: {
      icon: <Cloud className="w-5 h-5" />,
      color: "from-violet-500 to-purple-400",
      items: [
        { name: "AWS Lambda", level: 94, experience: "7+ years", realWork: "Serverless architecture, Pangea" },
        { name: "AWS S3/CloudFront", level: 92, experience: "7+ years", realWork: "Asset management, CDN" },
        { name: "API Gateway", level: 88, experience: "7+ years", realWork: "Microservices, routing" },
        { name: "DynamoDB", level: 86, experience: "4+ years", realWork: "NoSQL data storage" },
        { name: "Docker", level: 90, experience: "7+ years", realWork: "Containerization, deployment" }
      ]
    },
    leadership: {
      icon: <Users className="w-5 h-5" />,
      color: "from-orange-500 to-amber-400",
      items: [
        { name: "Team Leadership", level: 93, experience: "5+ years", realWork: "Led team of 9 at Compro" },
        { name: "Mentoring", level: 89, experience: "5+ years", realWork: "Trained 3 new engineers" },
        { name: "Architecture Design", level: 91, experience: "6+ years", realWork: "Full-stack system design" },
        { name: "Code Review", level: 95, experience: "7+ years", realWork: "Quality assurance, best practices" },
        { name: "Technical Strategy", level: 87, experience: "8+ years", realWork: "Technology decisions, roadmaps" }
      ]
    }
  };

  const enterprises = [
    {
      name: 'The Pangea Technology Group',
      role: 'Application Software Engineer',
      period: 'Jan 2023 — Present',
      location: 'North Carolina, US',
      type: 'CURRENT',
      impact: [
        'Built AI-powered flight integration reducing manual entry by 85%',
        'Delivered Pangea Wrapped feature driving 110% user growth',
        'Architected full-stack mobile + web platform from ground up',
        'Established testing framework reducing production bugs by 70%'
      ],
      techStack: ['React Native', 'React', 'Node.js', 'MongoDB', 'AWS Lambda', 'AI APIs'],
      metrics: { users: '20K+', growth: '110%', automation: '85%', reliability: '70% ↓ bugs' }
    },
    {
      name: 'Compro Technologies',
      role: 'Senior Software Engineer → Software Engineer',
      period: 'Jul 2015 — Dec 2022',
      location: 'Delhi, India',
      type: 'ENTERPRISE',
      impact: [
        'Led Cambridge University Press project serving 100K+ students',
        'Achieved 25% improvement in page load times through optimization',
        'Led cross-functional team of 9 engineers through complex projects',
        'Implemented CI/CD pipeline reducing deployment time by 40%'
      ],
      techStack: ['React', 'Vue.js', 'Angular', 'Node.js', 'Java', 'AWS', 'Docker'],
      metrics: { scale: '6M+ users', performance: '25% ↑', team: '9 engineers', deployment: '40% faster' }
    }
  ];

  const projects = [
    {
      name: 'CUP Nemo App',
      client: 'Cambridge University Press',
      scale: '6M+ students globally',
      description: 'Offline-accessible mobile education platform with seamless content synchronization',
      techStack: ['React Native', 'React', 'Vue.js', 'Redux', 'Node.js', 'AWS CloudFront', 'Webpack'],
      achievements: [
        'Custom Webpack plugin for optimized AWS asset management',
        'Serverless architecture with background task processing',
        'Offline-first architecture with modular micro-applications',
        'Enhanced app performance and security for rapid deployment'
      ],
      metrics: { users: '6M+', performance: '25% faster', architecture: 'Serverless', deployment: 'Automated' }
    },
    {
      name: 'VHL Reader',
      client: 'Vista Higher Learning',
      scale: '50K+ language learners',
      description: 'Interactive reading platform with enterprise-grade authentication and responsive design',
      techStack: ['Angular.js', 'Java', 'Node.js', 'OAuth', 'JWT', 'LTI', 'RequireJS', 'Grunt'],
      achievements: [
        'Single Sign-On (SSO) using Central Authentication Service (CAS)',
        'Learning Tools Interoperability (LTI) integration',
        'Responsive UI components with reusable architecture',
        'Middleware solutions for session management and authentication'
      ],
      metrics: { users: '50K+', auth: 'Multi-platform SSO', security: 'Enterprise-grade', integration: 'LTI compliant' }
    },
    {
      name: 'Pangea Travel Platform',
      client: 'The Pangea Technology Group',
      scale: '10K+ users, 110% growth',
      description: 'AI-powered travel ecosystem with automated itinerary planning and social features',
      techStack: ['React Native', 'React', 'Node.js', 'MongoDB', 'AWS Lambda', 'AI/ML APIs'],
      achievements: [
        'AI flight integration parsing emails with intelligent extraction',
        'End-to-end development from conception to deployment',
        'Comprehensive testing frameworks for reliability',
        'Pangea Wrapped analytics feature driving user engagement'
      ],
      metrics: { growth: '110%', automation: '85%', testing: '70% ↓ bugs', engagement: 'High retention' }
    }
  ];

  return (
    <div className="min-h-screen bg-slate-900 text-white relative overflow-hidden">
      {/* Matrix Background */}
      <canvas
        ref={canvasRef}
        className="fixed inset-0 z-0 opacity-10"
        style={{ width: '100vw', height: '100vh' }}
      />

      {/* Header */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-slate-900/95 backdrop-blur-xl border-b border-blue-500/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3 sm:gap-4">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r from-blue-500 to-cyan-400 rounded-lg flex items-center justify-center font-mono font-bold text-sm sm:text-lg">
                YC
              </div>
              <div>
                <div className="font-mono text-lg sm:text-xl font-bold">Yamini Chhabra</div>
                <div className="text-xs sm:text-sm text-blue-400 flex items-center gap-2">
                  <Briefcase className="w-3 h-3 sm:w-4 sm:h-4" />
                  <span className="hidden sm:inline">Senior Full-Stack Engineer • </span>10 Years Experience
                </div>
              </div>
            </div>
            
            <div className="flex items-center gap-2 sm:gap-3">
              <div className="hidden lg:flex items-center gap-4 text-sm">
                <span className="flex items-center gap-2 text-green-400">
                  <CheckCircle className="w-4 h-4" />
                  Available for Opportunities
                </span>
              </div>
              <a 
                href="mailto:yaminichhabra7@gmail.com"
                className="bg-gradient-to-r from-blue-500 to-cyan-400 px-4 py-2 sm:px-6 sm:py-2 rounded-lg font-semibold hover:scale-105 transition-transform flex items-center gap-2 text-sm sm:text-base"
              >
                <Mail className="w-3 h-3 sm:w-4 sm:h-4" />
                <span className="hidden sm:inline">Hire Me</span>
                <span className="sm:hidden">Email</span>
              </a>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Terminal */}
      <section className="relative z-10 pt-20 sm:pt-32 pb-12 sm:pb-16 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 items-center">
            <div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6 bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                Senior Full-Stack Engineer
              </h1>
              <p className="text-lg sm:text-xl text-slate-300 mb-6 sm:mb-8 leading-relaxed">
                10 years building enterprise applications for millions of users. 
                Expert in React, Node.js, AWS, and leading high-performance engineering teams.
              </p>
              
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4 mb-6 sm:mb-8">
                {faangMetrics.slice(0, 6).map((metric, index) => (
                  <div key={index} className="bg-white/5 backdrop-blur-xl rounded-xl p-3 sm:p-4 text-center border border-white/10 hover:border-blue-400/30 transition-colors">
                    <div className="text-blue-400 mb-1 sm:mb-2 flex justify-center">{metric.icon}</div>
                    <div className="text-xl sm:text-2xl font-bold text-white">{metric.value}</div>
                    <div className="text-xs text-slate-400">{metric.label}</div>
                  </div>
                ))}
              </div>

              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                <a 
                  href="mailto:yaminichhabra7@gmail.com"
                  className="bg-gradient-to-r from-blue-500 to-cyan-400 px-6 sm:px-8 py-3 rounded-xl font-semibold hover:scale-105 transition-transform flex items-center justify-center gap-2"
                >
                  <Mail className="w-4 h-4 sm:w-5 sm:h-5" />
                  Schedule Interview
                </a>
                <a 
                  href="tel:+19802231782"
                  className="bg-white/10 backdrop-blur-xl px-6 sm:px-8 py-3 rounded-xl font-semibold hover:bg-white/20 transition-colors border border-white/20 flex items-center justify-center gap-2"
                >
                  <Phone className="w-4 h-4 sm:w-5 sm:h-5" />
                  Call Now
                </a>
              </div>
            </div>

            <div className="bg-slate-800/90 backdrop-blur-xl rounded-2xl border border-blue-500/30 overflow-hidden">
              <div className="bg-slate-700 px-4 py-3 flex items-center gap-3">
                <div className="flex gap-2">
                  <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                  <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                  <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                </div>
                <span className="text-sm text-slate-400 font-mono">yamini@enterprise:~$</span>
              </div>
              <div className="p-4 sm:p-6 font-mono text-xs sm:text-sm min-h-[250px] sm:min-h-[300px]">
                {commands.slice(0, currentCommand).map((cmd, index) => (
                  <div key={index} className="mb-2 sm:mb-3 opacity-80">
                    <span className="text-blue-400">$ </span>
                    <span className="text-white">{cmd}</span>
                  </div>
                ))}
                {currentCommand < commands.length && (
                  <div className="mb-2 sm:mb-3">
                    <span className="text-blue-400">$ </span>
                    <span className="text-white">{typedText}</span>
                    <span className="animate-pulse text-blue-400">█</span>
                  </div>
                )}
                {!isTyping && (
                  <div className="mt-4 sm:mt-6 p-3 sm:p-4 bg-blue-500/10 rounded-lg border border-blue-400/30">
                    <div className="text-blue-400 mb-2 flex items-center gap-2">
                      <Award className="w-4 h-4 sm:w-5 sm:h-5" />
                      Ready for your next challenge
                    </div>
                    <div className="text-slate-300 text-xs sm:text-sm">
                      Enterprise-scale engineer ready to drive your team's success
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Tech Exploration Timeline */}
          <div className="bg-gradient-to-r from-slate-800/50 to-slate-700/50 backdrop-blur-xl rounded-2xl p-6 sm:p-8 border border-slate-600/30">
            <h3 className="text-xl sm:text-2xl font-bold mb-6 text-center bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent">
              Current Tech Explorations
            </h3>
            
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-white/5 rounded-xl p-4 border border-green-400/20 hover:border-green-400/40 transition-colors">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                  <span className="text-sm font-semibold text-green-400">Learning</span>
                </div>
                <h4 className="font-semibold mb-2">WebAssembly</h4>
                <p className="text-xs text-slate-400">Exploring high-performance web apps with Rust + WASM</p>
              </div>

              <div className="bg-white/5 rounded-xl p-4 border border-blue-400/20 hover:border-blue-400/40 transition-colors">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-3 h-3 bg-blue-400 rounded-full animate-pulse"></div>
                  <span className="text-sm font-semibold text-blue-400">Experimenting</span>
                </div>
                <h4 className="font-semibold mb-2">Edge Computing</h4>
                <p className="text-xs text-slate-400">Cloudflare Workers + Durable Objects for global state</p>
              </div>

              <div className="bg-white/5 rounded-xl p-4 border border-purple-400/20 hover:border-purple-400/40 transition-colors">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-3 h-3 bg-purple-400 rounded-full animate-pulse"></div>
                  <span className="text-sm font-semibold text-purple-400">Building</span>
                </div>
                <h4 className="font-semibold mb-2">AI Integration</h4>
                <p className="text-xs text-slate-400">Custom GPT plugins for development workflow automation</p>
              </div>

              <div className="bg-white/5 rounded-xl p-4 border border-orange-400/20 hover:border-orange-400/40 transition-colors">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-3 h-3 bg-orange-400 rounded-full animate-pulse"></div>
                  <span className="text-sm font-semibold text-orange-400">Prototyping</span>
                </div>
                <h4 className="font-semibold mb-2">Voice Interfaces</h4>
                <p className="text-xs text-slate-400">Hey Siri, deploy my app! (Actually working on this)</p>
              </div>
            </div>

            <div className="mt-6 text-center">
              <a 
                href="https://github.com/yaminichhabra" 
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-gradient-to-r from-green-500 to-blue-500 px-6 py-3 rounded-xl font-semibold hover:scale-105 transition-transform"
              >
                <Github className="w-5 h-5" />
                View All Projects on GitHub
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* LinkedIn Recommendations */}
      <section className="relative z-10 py-12 sm:py-16 px-4 sm:px-6 bg-slate-800/50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
              LinkedIn Recommendations
            </h2>
            <div className="text-slate-400 flex items-center justify-center gap-2">
              <Linkedin className="w-4 h-4 sm:w-5 sm:h-5 text-blue-400" />
              What colleagues say about working with me
            </div>
          </div>

          <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-6 sm:p-8 border border-white/10">
            <div className="flex items-start gap-4 sm:gap-6">
              <Quote className="w-8 h-8 sm:w-10 sm:h-10 text-blue-400 flex-shrink-0 mt-2" />
              <div className="flex-1">
                <p className="text-lg sm:text-xl text-slate-200 mb-4 sm:mb-6 leading-relaxed italic">
                  "{linkedinRecommendations[currentRecommendation].text}"
                </p>
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-semibold text-blue-400">{linkedinRecommendations[currentRecommendation].name}</div>
                    <div className="text-sm text-slate-400">{linkedinRecommendations[currentRecommendation].company}</div>
                  </div>
                  <div className="flex gap-1">
                    {[...Array(linkedinRecommendations[currentRecommendation].rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-400 fill-current" />
                    ))}
                  </div>
                </div>
              </div>
            </div>
            <div className="flex justify-center mt-6 gap-2">
              {linkedinRecommendations.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentRecommendation(index)}
                  className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full transition-colors ${
                    index === currentRecommendation ? 'bg-blue-400' : 'bg-slate-600'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* GitHub Activity & Side Projects */}
      <section className="relative z-10 py-12 sm:py-16 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4 bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">
              GitHub Activity & Side Projects
            </h2>
            <div className="text-slate-400">Continuous learning • Hands-on experimentation • Creative problem solving</div>
          </div>

          <div className="grid lg:grid-cols-2 gap-6 sm:gap-8 mb-12">
            {/* GitHub Streak */}
            <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-6 sm:p-8 border border-white/10">
              <div className="flex items-center gap-4 mb-6">
                <Github className="w-8 h-8 text-green-400" />
                <div>
                  <h3 className="text-xl sm:text-2xl font-bold text-green-400">GitHub Activity</h3>
                  <p className="text-slate-400">Real-time commit data & contributions</p>
                </div>
              </div>
              
              {/* Real GitHub Stats */}
              <div className="space-y-6">
                {/* GitHub Stats Card */}
                <div className="bg-slate-800/50 rounded-xl p-4 border border-slate-600/30">
                  <img 
                    src="https://github-readme-stats.vercel.app/api?username=yaminichhabra&show_icons=true&theme=dark&bg_color=1e293b&title_color=3b82f6&text_color=e2e8f0&icon_color=10b981&border_color=475569"
                    alt="Yamini's GitHub Stats"
                    className="w-full h-auto rounded-lg"
                    loading="lazy"
                  />
                </div>

                {/* GitHub Streak */}
                <div className="bg-slate-800/50 rounded-xl p-4 border border-slate-600/30">
                  <img 
                    src="https://github-readme-streak-stats.herokuapp.com/?user=yaminichhabra&theme=dark&background=1e293b&border=475569&stroke=3b82f6&ring=10b981&fire=f59e0b&currStreakNum=e2e8f0&sideNums=e2e8f0&currStreakLabel=3b82f6&sideLabels=64748b&dates=94a3b8"
                    alt="Yamini's GitHub Streak"
                    className="w-full h-auto rounded-lg"
                    loading="lazy"
                  />
                </div>

                {/* Top Languages */}
                <div className="bg-slate-800/50 rounded-xl p-4 border border-slate-600/30">
                  <img 
                    src="https://github-readme-stats.vercel.app/api/top-langs/?username=yaminichhabra&layout=compact&theme=dark&bg_color=1e293b&title_color=3b82f6&text_color=e2e8f0&border_color=475569"
                    alt="Yamini's Top Languages"
                    className="w-full h-auto rounded-lg"
                    loading="lazy"
                  />
                </div>
              </div>

            <div className="mt-6 text-center">
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a 
                  href="https://github.com/yaminichhabra" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-gradient-to-r from-slate-600 to-slate-500 hover:from-slate-500 hover:to-slate-400 px-6 py-3 rounded-xl font-semibold transition-all duration-300 hover:scale-105"
                >
                  <Github className="w-5 h-5" />
                  View Full GitHub Profile
                  <ExternalLink className="w-4 h-4" />
                </a>
                <a 
                  href="https://github.com/yaminichhabra?tab=repositories" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 px-6 py-3 rounded-xl font-semibold transition-all duration-300 border border-white/20"
                >
                  <Code2 className="w-5 h-5" />
                  Browse Repositories
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>
              <div className="mt-4 text-sm text-slate-400">
                📊 Real-time data from GitHub API • Updated automatically
              </div>
            </div>
            </div>

            {/* Fun Side Projects */}
            <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-6 sm:p-8 border border-white/10">
              <div className="flex items-center gap-4 mb-6">
                <Zap className="w-8 h-8 text-yellow-400" />
                <div>
                  <h3 className="text-xl sm:text-2xl font-bold text-yellow-400">Creative Side Projects</h3>
                  <p className="text-slate-400">Because coding should be fun!</p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-xl p-4 border border-purple-400/20">
                  <div className="flex items-center gap-3 mb-2">
                    <Phone className="w-5 h-5 text-purple-400" />
                    <h4 className="font-semibold text-purple-300">Custom Pager System</h4>
                  </div>
                  <p className="text-sm text-slate-300 mb-3">
                    Built a Twilio-powered pager that sends SMS alerts when production systems need attention. 
                    Because sometimes you need old-school reliability with modern tech!
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <span className="text-xs bg-purple-500/20 text-purple-300 px-2 py-1 rounded">Twilio API</span>
                    <span className="text-xs bg-blue-500/20 text-blue-300 px-2 py-1 rounded">Node.js</span>
                    <span className="text-xs bg-green-500/20 text-green-300 px-2 py-1 rounded">WebHooks</span>
                  </div>
                </div>

                <div className="bg-gradient-to-r from-yellow-500/10 to-orange-500/10 rounded-xl p-4 border border-yellow-400/20">
                  <div className="flex items-center gap-3 mb-2">
                    <Zap className="w-5 h-5 text-yellow-400" />
                    <h4 className="font-semibold text-yellow-300">Smart Home Automation</h4>
                  </div>
                  <p className="text-sm text-slate-300 mb-3">
                    Raspberry Pi-powered home automation that changes light colors based on deployment status. 
                    Green for successful deploys, red for failures. My house literally reflects my code quality!
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <span className="text-xs bg-yellow-500/20 text-yellow-300 px-2 py-1 rounded">Raspberry Pi</span>
                    <span className="text-xs bg-orange-500/20 text-orange-300 px-2 py-1 rounded">IoT</span>
                    <span className="text-xs bg-red-500/20 text-red-300 px-2 py-1 rounded">Python</span>
                    <span className="text-xs bg-purple-500/20 text-purple-300 px-2 py-1 rounded">Philips Hue</span>
                  </div>
                </div>

                <div className="bg-gradient-to-r from-blue-500/10 to-cyan-500/10 rounded-xl p-4 border border-blue-400/20">
                  <div className="flex items-center gap-3 mb-2">
                    <Code2 className="w-5 h-5 text-blue-400" />
                    <h4 className="font-semibold text-blue-300">Weekend Hackathon Projects</h4>
                  </div>
                  <p className="text-sm text-slate-300 mb-3">
                    Regular weekend experiments: Chrome extensions, VS Code plugins, React component libraries. 
                    Latest: A CLI tool that generates memes from git commit messages (surprisingly useful for demos!)
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <span className="text-xs bg-blue-500/20 text-blue-300 px-2 py-1 rounded">Chrome APIs</span>
                    <span className="text-xs bg-cyan-500/20 text-cyan-300 px-2 py-1 rounded">VS Code API</span>
                    <span className="text-xs bg-green-500/20 text-green-300 px-2 py-1 rounded">CLI Tools</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section className="relative z-10 py-12 sm:py-16 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4 bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
              Enterprise-Grade Technical Skills
            </h2>
            <div className="text-slate-400">10 years of production experience • Real project implementations</div>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-6 sm:mb-8">
            {Object.entries(skills).map(([key, category]) => (
              <button
                key={key}
                onClick={() => setActiveSkillCategory(key as keyof Skills)}
                className={`p-3 sm:p-4 rounded-xl border transition-all duration-300 ${
                  activeSkillCategory === key
                    ? 'border-blue-400/50 bg-gradient-to-r ' + category.color + ' text-slate-900'
                    : 'border-white/10 bg-white/5 hover:bg-white/10'
                }`}
              >
                <div className="flex flex-col items-center gap-2">
                  {category.icon}
                  <span className="text-xs sm:text-sm font-semibold capitalize">{key}</span>
                </div>
              </button>
            ))}
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {skills[activeSkillCategory].items.map((skill: SkillItem) => (
              <div key={skill.name} className="bg-white/5 backdrop-blur-xl rounded-xl p-4 sm:p-6 border border-white/10 hover:bg-white/10 transition-all">
                <div className="flex justify-between items-center mb-4">
                  <span className="font-semibold text-base sm:text-lg">{skill.name}</span>
                  <span className="text-blue-400 font-mono text-sm">{skill.level}%</span>
                </div>
                <div className="w-full bg-slate-700 rounded-full h-2 mb-4">
                  <div 
                    className="bg-gradient-to-r from-blue-400 to-cyan-400 h-2 rounded-full transition-all duration-1000"
                    style={{ width: `${skill.level}%` }}
                  />
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm text-slate-400">
                    <span>Experience:</span>
                    <span className="text-blue-400">{skill.experience}</span>
                  </div>
                  <div className="text-xs text-slate-400">
                    <span className="text-emerald-400">Used in:</span> {skill.realWork}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Enterprise Experience */}
      <section className="relative z-10 py-12 sm:py-16 px-4 sm:px-6 bg-slate-800/30">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-center mb-8 sm:mb-12 bg-gradient-to-r from-violet-400 to-purple-400 bg-clip-text text-transparent">
            Enterprise Impact & Leadership
          </h2>

          <div className="space-y-6 sm:space-y-8">
            {enterprises.map((company, index) => (
              <div key={index} className="bg-white/5 backdrop-blur-xl rounded-2xl p-6 sm:p-8 border border-white/10">
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-6">
                  <div>
                    <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3 mb-2">
                      <h3 className="text-xl sm:text-2xl font-bold text-white">{company.role}</h3>
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold w-fit ${
                        company.type === 'CURRENT' ? 'bg-green-500/20 text-green-400' : 'bg-blue-500/20 text-blue-400'
                      }`}>
                        {company.type}
                      </span>
                    </div>
                    <p className="text-lg sm:text-xl text-violet-300 mb-1">{company.name}</p>
                    <p className="text-slate-400 text-sm sm:text-base">{company.location} • {company.period}</p>
                  </div>
                  <div className="grid grid-cols-2 gap-3 sm:gap-4 mt-4 lg:mt-0">
                    {Object.entries(company.metrics).map(([key, value]) => (
                      <div key={key} className="bg-white/5 rounded-lg p-3 text-center">
                        <div className="text-base sm:text-lg font-bold text-blue-400">{value}</div>
                        <div className="text-xs text-slate-400 capitalize">{key}</div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="grid lg:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold mb-3 text-blue-400">Key Achievements:</h4>
                    <ul className="space-y-2">
                      {company.impact.map((achievement, idx) => (
                        <li key={idx} className="flex items-start gap-3 text-sm">
                          <ChevronRight className="w-4 h-4 text-blue-400 mt-0.5 flex-shrink-0" />
                          {achievement}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-3 text-violet-400">Technology Stack:</h4>
                    <div className="flex flex-wrap gap-2">
                      {company.techStack.map((tech) => (
                        <span key={tech} className="px-3 py-1 bg-slate-700/50 rounded-full text-sm">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Showcase */}
      <section className="relative z-10 py-12 sm:py-16 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-center mb-8 sm:mb-12 bg-gradient-to-r from-cyan-400 to-emerald-400 bg-clip-text text-transparent">
            Production Systems at Scale
          </h2>

          <div className="space-y-6 sm:space-y-8">
            {projects.map((project, index) => (
              <div key={index} className="bg-gradient-to-r from-white/5 to-white/10 backdrop-blur-xl rounded-2xl p-6 sm:p-8 border border-white/10 hover:border-white/20 transition-all">
                <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between mb-6">
                  <div className="flex-1">
                    <h3 className="text-xl sm:text-2xl font-bold mb-2 text-cyan-300">{project.name}</h3>
                    <p className="text-violet-300 mb-2 font-semibold">{project.client}</p>
                    <p className="text-emerald-400 text-sm font-semibold mb-4">{project.scale}</p>
                    <p className="text-slate-300 leading-relaxed text-sm sm:text-base">{project.description}</p>
                  </div>
                  <div className="grid grid-cols-2 gap-3 mt-4 lg:mt-0 lg:ml-8">
                    {Object.entries(project.metrics).map(([key, value]) => (
                      <div key={key} className="bg-black/30 rounded-lg p-3 text-center">
                        <div className="text-base sm:text-lg font-bold text-emerald-400">{value}</div>
                        <div className="text-xs text-slate-400 capitalize">{key}</div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="grid lg:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold mb-3 text-cyan-400">Technical Achievements:</h4>
                    <ul className="space-y-2">
                      {project.achievements.map((achievement, idx) => (
                        <li key={idx} className="flex items-start gap-3 text-sm">
                          <Zap className="w-4 h-4 text-cyan-400 mt-0.5 flex-shrink-0" />
                          {achievement}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-3 text-violet-400">Core Technologies:</h4>
                    <div className="flex flex-wrap gap-2">
                      {project.techStack.map((tech) => (
                        <span key={tech} className="px-3 py-1 bg-gradient-to-r from-violet-600/30 to-cyan-600/30 rounded-full text-sm border border-violet-400/30">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAANG CTA */}
      <section className="relative z-10 py-16 sm:py-20 px-4 sm:px-6">
        <div className="max-w-5xl mx-auto text-center">
          <div className="bg-gradient-to-r from-blue-500/10 via-cyan-500/10 to-emerald-500/10 backdrop-blur-xl rounded-3xl p-8 sm:p-12 border border-blue-400/20">
            <div className="flex justify-center mb-6">
              <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-2xl flex items-center justify-center">
                <Terminal className="w-8 h-8 sm:w-10 sm:h-10 text-slate-900" />
              </div>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-6">Ready to Scale Your Engineering Team?</h2>
            <p className="text-lg sm:text-xl text-slate-300 mb-8 leading-relaxed max-w-3xl mx-auto">
              Looking for a senior engineer who can architect scalable solutions, lead teams, 
              and deliver enterprise-grade applications? Let's discuss how I can drive your next breakthrough.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a 
                href="mailto:yaminichhabra7@gmail.com"
                className="inline-flex items-center justify-center gap-3 bg-gradient-to-r from-blue-500 to-cyan-400 px-8 sm:px-10 py-3 sm:py-4 rounded-xl text-lg font-semibold hover:scale-105 transition-transform"
              >
                <Mail className="w-5 h-5 sm:w-6 sm:h-6" />
                Schedule Technical Interview
              </a>
              <a 
                href="tel:+19802231782"
                className="inline-flex items-center justify-center gap-3 bg-white/10 backdrop-blur-xl px-8 sm:px-10 py-3 sm:py-4 rounded-xl text-lg font-semibold hover:bg-white/20 transition-colors border border-white/20"
              >
                <Phone className="w-5 h-5 sm:w-6 sm:h-6" />
                <span className="hidden sm:inline">Direct Call: (980) 223-1782</span>
                <span className="sm:hidden">Call Now</span>
              </a>
            </div>
            <div className="mt-6 sm:mt-8 text-sm text-slate-400">
              📍 Cornelius, North Carolina • Available immediately • Open to relocation
            </div>
            
            {/* LinkedIn Connect */}
            <div className="mt-6 pt-6 border-t border-white/10">
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <span className="text-slate-400">Connect with me:</span>
                <div className="flex gap-4">
                  <a 
                    href="https://linkedin.com/in/yaminichhabra" 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 bg-blue-600/20 hover:bg-blue-600/30 px-4 py-2 rounded-lg transition-colors border border-blue-500/30"
                  >
                    <Linkedin className="w-4 h-4" />
                    LinkedIn
                  </a>
                  <a 
                    href="https://github.com/yaminichhabra" 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 bg-slate-600/20 hover:bg-slate-600/30 px-4 py-2 rounded-lg transition-colors border border-slate-500/30"
                  >
                    <Github className="w-4 h-4" />
                    GitHub
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 py-8 px-4 sm:px-6 border-t border-white/10">
        <div className="max-w-7xl mx-auto text-center">
          <div className="text-slate-400 mb-4">
            Built with React • Optimized for Performance • Designed for Impact
          </div>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 text-sm text-slate-500">
            <span>© 2025 Yamini Chhabra</span>
            <span className="hidden sm:inline">•</span>
            <a href="mailto:yaminichhabra7@gmail.com" className="hover:text-blue-400 transition-colors">
              yaminichhabra7@gmail.com
            </a>
            <span className="hidden sm:inline">•</span>
            <a href="tel:+19802231782" className="hover:text-blue-400 transition-colors">
              +1 (980) 223-1782
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Portfolio;
