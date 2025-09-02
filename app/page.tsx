"use client"

import { useState, useEffect } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Github,
  Linkedin,
  Mail,
  ExternalLink,
  Calendar,
  ChevronDown,
} from "lucide-react"
import Image from "next/image"

const languages = ["Python", "TypeScript", "Java", "C++", "SQL", "HTML", "CSS"];
const frameworks = ["React", "Next.js", "MongoDB", "PostgreSQL", "Docker", "Azure", "Scikit-Learn", "PyTorch", "Pandas", "Matplotlib", "LangChain", "Tkinter", "Streamlit", "Flask"];

const projectsData = [
  {
    title: "Macrodata Refinement",
    description: "Poverty index with policy insights using machine learning and interactive visualization.",
    tech: ["Python", "Scikit-Learn", "Pandas", "Matplotlib", "Streamlit"],
    image: "/images/macrodata.png",
    githubLink: "https://github.com/lettuceinsalad/Robo-Stock-Portfolio-Advisor",
    demoLink: "https://cxc-sap-poverty-index.streamlit.app/", 
  },
  {
    title: "Personal Website",
    description: "Interactive site for my personal projects, experiences, and skills.",
    tech: ["TypeScript", "Next.js", "Tailwind CSS", "Vercel"],
    image: "/images/personalwebsite.png",
    githubLink: "https://github.com/lettuceinsalad/personal-website",
    demoLink: "https://samuelzhang.me", 
  },
  {
    title: "Simulated Stock Exchange",
    description: "Java-based limit order book, simulating realistic markets with algorithmic traders and market makers.",
    tech: ["Java"],
    image: "/images/simstockmarkt.jpg",
    githubLink: "https://github.com/lettuceinsalad/stock-exchange-sim",
  },
  {
    title: "OutPerform",
    description: "Automated stock portfolio management pipeline using data analytics and technical indicators.",
    tech: ["Python", "Pandas", "Matplotlib", "Numpy", "YFinance"],
    image: "/images/robostock.png",
    githubLink: "https://github.com/lettuceinsalad/outperform",
  },
  {
    title: "StegoStudy",
    description: "Full-stack study tool that uses speech-to-text and NLP to compare recitations against study guides.",
    tech: ["React", "Python", "OpenAI", "Flask", "MongoDB"],
    image: "/images/stegostudy.jpg",
    githubLink: "https://github.com/lettuceinsalad/StegoStudy",
  }
];

const experiencesData = [
  {
    title: "AI Developer",
    company: "National Research Council, Government of Canada",
    date: "May 2025 - Present",
    description: "Developed a multimodal AI agent to automate the risk assessment process, cutting workload by 30 hours per assessment",
    skills: ["Python", "Pandas", "Azure", "LangChain", "Tkinter"],
    image: "/images/NRC building.jpg"
  }
  // {
  //   title: "Senior Admin Cadet",
  //   company: "CS Department",
  //   date: "2023 - Present",
  //   description: "Mentored 50+ students in programming fundamentals, achieving 95% course satisfaction rate.",
  //   skills: ["Python", "Java", "Mentoring"],
  //   image: "/placeholder.svg?height=60&width=60&text=Uni"
  // }
];

export default function PersonalWebsite() {
  const [mounted, setMounted] = useState(false)
  const [selectedSkill, setSelectedSkill] = useState<string | null>(null);
  const [isScrolled, setIsScrolled] = useState(false);

  // Framer Motion parallax
  const { scrollY } = useScroll();
  const backgroundY = useTransform(scrollY, [0, 1000], [0, 500]);
  const textY = useTransform(scrollY, [0, 1000], [0, 150]);

  useEffect(() => {
    // Set mounted to true after component mounts
    setMounted(true)

    // Handle scroll for navbar opacity only
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      setIsScrolled(scrollTop > 50);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [])

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      // smooth scroll 
      element.scrollIntoView({ 
        behavior: "smooth",
        block: "start",
        inline: "nearest"
      });
    }
  }

  const handleSkillClick = (skill: string) => {
    setSelectedSkill(prev => (prev === skill ? null : skill));
  };



  const filteredProjects = selectedSkill
    ? projectsData.filter(p => p.tech.includes(selectedSkill))
    : projectsData;

  // Loading screen
  if (!mounted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-950 via-indigo-900 to-black flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500 mx-auto mb-4"></div>
          <p className="text-slate-300">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen transition-colors duration-500 bg-background text-foreground`}>
        {/* Navigation Bar */}
                <nav className={`fixed top-0 left-0 right-0 z-[100] border-b transition-all duration-300 ${
                  isScrolled 
                    ? 'bg-background/90 border-border/50 backdrop-blur-md' 
                    : 'bg-transparent border-transparent'
                }`}>
          <div className="max-w-[80vw] lg:max-w-[70vw] mx-auto px-4">
            <div className="flex items-center justify-end h-14">
              {/* Navigation Links */}
              <div className="hidden sm:flex items-center space-x-5">
                {[
                  { name: 'About', href: 'about' },
                  { name: 'Education', href: 'education' },
                  { name: 'Experience', href: 'experience' },
                  { name: 'Skills & Projects', href: 'skills-projects' },
                ].map((item) => (
                  <button
                    key={item.name}
                    onClick={() => scrollToSection(item.href)}
                    className="px-3 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors duration-300"
                  >
                    {item.name}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </nav>

        {/* Hero Section with Framer Motion Parallax */}
        <section id="hero" className="h-screen relative flex items-center justify-center overflow-hidden">
          {/* Background Image with Parallax */}
          <motion.div 
            className="absolute inset-0 z-0"
            style={{ y: backgroundY }}
          >
            <Image
              src="/images/medicine background.jpeg"
              alt="Samuel Zhang"
              fill
              className="object-cover object-[center_44%]"
              priority
            />
            {/* Dark overlay for readability */}
            <div className="absolute inset-0 bg-black/50"></div>
            {/* Purple gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-purple-900/40 via-purple-800/30 to-black/50"></div>
          </motion.div>
          
          {/* Content with Slower Parallax */}
          <motion.div 
            className="relative z-10 text-center px-4 max-w-4xl mx-auto"
            style={{ y: textY }}
          >
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 tracking-tight">
              Hi, I&apos;m{" "}
              <span className="bg-gradient-to-r from-purple-400 to-purple-600 bg-clip-text text-transparent">
                Samuel
              </span>
            </h1>

            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Button
                onClick={() => window.open("https://github.com/lettuceinsalad", "_blank")}
                className="bg-gradient-to-r from-purple-500 to-purple-700 hover:from-purple-600 hover:to-purple-800 text-white px-8 py-4 text-lg lg:text-xl rounded-lg flex items-center gap-3 transition-all duration-300 shadow-lg shadow-purple-500/30"
              >
                <Github className="w-6 h-6 lg:w-7 lg:h-7" />
                View My Work
              </Button>
              <Button
                onClick={() => window.open("https://www.linkedin.com/in/szhang223/", "_blank")}
                variant="outline"
                className="border-2 border-purple-400 text-purple-300 hover:bg-purple-500/20 hover:text-white px-8 py-4 text-lg lg:text-xl rounded-lg flex items-center gap-3 transition-all duration-300 backdrop-blur-sm"
              >
                <Linkedin className="w-6 h-6 lg:w-7 lg:h-7" />
                Let&apos;s Connect!
              </Button>
            </div>
          </motion.div>
          
          {/* Scroll Down Button */}
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-50 animate-bounce">
            <Button
              onClick={() => scrollToSection('about')}
              variant="ghost"
              size="sm"
              className="text-white/70 hover:text-white transition-all duration-300 p-3 cursor-pointer"
            >
              <ChevronDown className="w-8 h-8" />
            </Button>
          </div>
        </section>

        <div className="relative h-32 -mt-32">
            <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent"></div>
        </div>

        <main className="mx-auto max-w-[80vw] lg:max-w-[70vw] px-4 md:px-6">
          {/* About Section */}
        <section id="about" className="py-24 relative">
            <div className="text-left mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">About Me</h2>
              <div className="w-24 h-1 bg-primary" />
            </div>

            <div className="grid lg:grid-cols-2 gap-16 items-center">
              {/* Image on the left */}
              <div className="relative flex justify-center items-center">
                  <div className="w-80 h-80 p-2 rounded-xl border-2 border-purple-500/30 flex-shrink-0">
                      <Image
                        src="/images/linkedin headshot.jpeg"
                        alt="Profile photo"
                        width={400}
                        height={400}
                        className="rounded-lg shadow-2xl object-cover w-full h-full"
                      />
                  </div>
              </div>

              {/* Text content on the right */}
              <div className="space-y-6">
                <div>
                  <h3 className="text-2xl font-bold text-purple-400 mb-4">
                    Welcome to my website!
                  </h3>
                  <p className="text-slate-300 leading-relaxed text-lg">
                  I&apos;m a Computer Science and Finance student at the University of Waterloo with a passion for building software at the intersection of technology and practical solutions. 
                  Currently working as an AI Developer at the Government of Canada&apos;s National Research Council, I&apos;ve developed a multimodal AI application that solves real-world problems.
                  <br/>
                  <br/>
                  My experience spans from software engineering to machine learning, winning hackathons along the way. 
                  I&apos;m particularly drawn to projects that allow me to explore technology actually used in the real world, whether that&apos;s building financial trading systems, interactive data visualization platforms, or working with cloud computing.
                  <br/>
                  <br/>
                  When I&apos;m not coding, you&apos;ll find me stressing over Premier League football, learning a new fingerstyle guitar song, 
                  or eyeing another expensive watch that I can&apos;t buy. Feel free to reach out to me if you&apos;d like to chat (or if you have any music/book recommendations)!
                  </p>
                </div>
              </div>
            </div>
        </section>

          {/* Education Section */}
          <section id="education" className="py-16">
            <div
              className="transition-all duration-500 delay-150"
            >
              <div className="text-left mb-12">
                <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Education</h2>
                <div className="w-24 h-1 bg-primary" />
              </div>

              <div className="mx-auto">
                <Card className="bg-secondary backdrop-blur-sm border-border shadow-lg hover:shadow-xl transition-all duration-500">
                  <CardContent className="p-6">
                    <div className="grid md:grid-cols-4 gap-6 items-center">
                      <div className="md:col-span-1 flex justify-center">
                      <div className="w-full max-w-64 h-48 rounded-xl flex-shrink-0 overflow-hidden">
                          <Image
                            src="/images/waterloo.png"
                            alt="UW Logo"
                            width={128}
                            height={128}
                            className="rounded-lg object-cover w-full h-full bg-white/5"
                          />
                        </div>
                      </div>
                      <div className="md:col-span-3">
                        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-3">
                          <div>
                            <h3 className="text-xl font-semibold text-purple-400">
                              Computer Science and Finance Double Major
                            </h3>
                            <p className="text-slate-300">University of Waterloo</p>
                          </div>
                          <div className="text-right text-sm text-slate-300">
                            <div className="flex items-center gap-1">
                              <Calendar className="w-4 h-4" />
                              2024-2029
                            </div>
                            <div className="mt-1 font-semibold text-purple-400">GPA: 3.92/4.0</div>
                          </div>
                        </div>
                        <p className="text-slate-300 text-base mb-4">
                          Pursuing a bachelors in Computing and Financial Management with a focus on software engineering, and machine learning.
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {[
                            "Data Structures and Algorithms",
                            "Object-Oriented Programming",
                            "Capital Markets",
                            "Data Analytics",
                            "Functional Programming",
                          ].map((course, index) => (
                            <Badge
                              key={index}
                              variant="secondary"
                              className="bg-purple-500/10 text-purple-200 hover:bg-purple-500/20 border border-purple-500/20"
                            >
                              {course}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
            </div>
          </div>
        </section>

          {/* Experience Section */}
        <section id="experience" className="py-16">
            <div
              className="transition-all duration-500 delay-250"
            >
              <div className="text-left mb-12">
                <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Experience</h2>
                <div className="w-24 h-1 bg-primary" />
              </div>

              <div className="mx-auto space-y-6">
                {experiencesData.map((exp, index) => (
                  <Card key={index} className="bg-secondary backdrop-blur-sm border-border shadow-lg hover:shadow-xl transition-all duration-500">
                    <CardContent className="p-6">
                      <div className="grid md:grid-cols-4 gap-6 items-center">
                        <div className="md:col-span-1 flex justify-center">
                          <div className="relative w-full max-w-64 h-48 rounded-xl flex-shrink-0 overflow-hidden">
                            <Image
                              src={exp.image}
                              alt={`${exp.company} Logo`}
                              width={256}
                              height={192}
                              className="object-cover bg-white/5 w-full h-full"
                            />
                          </div>
                        </div>
                        <div className="md:col-span-3">
                          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-3">
                            <div>
                              <h3 className="text-xl font-semibold text-purple-400">
                                {exp.title}
                              </h3>
                              <p className="text-slate-300">{exp.company}</p>
                            </div>
                            <div className="text-sm text-slate-300 flex items-center gap-1">
                              <Calendar className="w-4 h-4" />
                              {exp.date}
                            </div>
                          </div>
                          <p className="text-slate-300 text-base mb-4">
                            {exp.description}
                          </p>
                          <div className="flex flex-wrap gap-2">
                            {exp.skills.map((skill, i) => (
                                                              <Badge key={i} className="bg-purple-500/10 text-purple-200 hover:bg-purple-500/20 border border-purple-500/20">{skill}</Badge>
                            ))}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
        </section>

        {/* Skills & Projects Section */}
        <section id="skills-projects" className="py-24">
            <div className="text-left mb-12">
                <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Skills & Projects</h2>
                <div className="w-24 h-1 bg-primary" />
            </div>

            {/* Skills & Technologies */}
            <div className="mb-8">
                <div className="grid md:grid-cols-2 gap-6">
                    <Card className="bg-secondary backdrop-blur-sm border-border shadow-lg">
                        <CardHeader className="pb-3">
                            <CardTitle className="text-xl lg:text-2xl text-purple-400">Languages</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="flex flex-wrap gap-2">
                                {languages.map((lang, index) => (
                                    <Badge 
                                        key={index} 
                                        onClick={() => handleSkillClick(lang)}
                                        className={`transition-colors duration-300 cursor-pointer transform hover:scale-105 text-sm px-4 py-1 ${selectedSkill === lang ? 'bg-purple-500 text-black' : 'bg-purple-500/10 text-purple-200 hover:bg-purple-500/20 border border-purple-500/20'}`}
                                    >
                                        {lang}
                                    </Badge>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                    <Card className="bg-secondary backdrop-blur-sm border-border shadow-lg">
                        <CardHeader className="pb-3">
                            <CardTitle className="text-xl lg:text-2xl text-purple-400">Frameworks & Tools</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="flex flex-wrap gap-3">
                                {frameworks.map((tool, index) => (
                                    <Badge 
                                        key={index} 
                                        onClick={() => handleSkillClick(tool)}
                                        variant="outline" 
                                        className={`transition-colors duration-300 cursor-pointer transform hover:scale-105 text-sm px-4 py-1 ${selectedSkill === tool ? 'bg-purple-500 text-black' : 'bg-purple-500/10 text-purple-200 hover:bg-purple-500/20 border border-purple-500/20'}`}
                                    >
                                        {tool}
                                    </Badge>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                </div>
              </div>

            {/* Projects */}
            <div>
                {filteredProjects.length > 0 ? (
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredProjects.map((project, index) => (
                  <Card
                    key={index}
                            className="bg-secondary backdrop-blur-sm border-border shadow-lg hover:shadow-xl transition-all duration-500 transform hover:-translate-y-2 group overflow-hidden"
                  >
                    <div className="relative overflow-hidden">
                      <div
                                className="absolute inset-0 bg-gradient-to-br from-purple-500 to-purple-700 opacity-10 group-hover:opacity-20 transition-opacity duration-300"
                      />
                      <Image
                        src={project.image || "/placeholder.svg"}
                        alt={project.title}
                        width={300}
                        height={200}
                        className="w-full h-40 object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                    </div>
                    <CardContent className="p-6">
                              <h3 className="text-lg font-semibold text-purple-400 mb-2">{project.title}</h3>
                              <p className="text-slate-300 text-sm mb-4 line-clamp-3">
                                {project.description}
                              </p>
                              <div className="flex flex-wrap gap-2 mb-4">
                        {project.tech.map((tech, techIndex) => (
                          <Badge
                            key={techIndex}
                                    className="bg-purple-500/10 text-purple-200 hover:bg-purple-500/20 border border-purple-500/20"
                          >
                            {tech}
                          </Badge>
                        ))}
                      </div>
                      <div className="flex gap-3">
                        <Button
                          size="sm"
                          onClick={() => window.open(project.githubLink, "_blank")}
                          className="bg-purple-500 hover:bg-purple-600 text-white px-4 py-2"
                        >
                          <Github className="w-4 h-4 mr-2" />
                          Code
                        </Button>
                        {project.demoLink && (
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => window.open(project.demoLink, "_blank")}
                            className="border-purple-500/50 text-purple-500 hover:bg-purple-500/10 px-4 py-2"
                          >
                            <ExternalLink className="w-4 h-4 mr-2" />
                            Demo
                          </Button>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))}
            </div>
                ) : (
                    <div className="text-center py-16">
                        <p className="text-slate-400 text-lg">No projects match the selected skill.</p>
                        <Button onClick={() => handleSkillClick(selectedSkill!)} variant="link" className="text-purple-500 mt-4">Clear Filter</Button>
                    </div>
                )}
          </div>
        </section>
        </main>
        {/* Footer */}
        <footer
          id="footer"
          className="py-12 bg-secondary text-foreground"
        >
          <div className="container px-4 md:px-6 mx-auto">
            <div
              className="transition-all duration-500 delay-350"
            >
              <div className="text-center space-y-6">
                

                <div className="flex justify-center space-x-4">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-muted-foreground hover:bg-accent/20 hover:text-foreground transition-all duration-300 transform hover:scale-110"
                    onClick={() => window.open("https://github.com/lettuceinsalad", "_blank")}
                  >
                    <Github className="w-5 h-5 mr-2" />
                    GitHub
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-muted-foreground hover:bg-accent/20 hover:text-foreground transition-all duration-300 transform hover:scale-110"
                    onClick={() => window.open("https://www.linkedin.com/in/szhang223/", "_blank")}
                  >
                    <Linkedin className="w-5 h-5 mr-2" />
                    LinkedIn
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-muted-foreground hover:bg-accent/20 hover:text-foreground transition-all duration-300 transform hover:scale-110"
                    onClick={() => window.open("mailto:sj3zhang@uwaterloo.ca", "_blank")}
                  >
                    <Mail className="w-5 h-5 mr-2" />
                    Email
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </footer>
    </div>
  )
}
