import React from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { 
    Github, Twitter, Linkedin, Boxes, BarChart3, Users,
    LineChart, Lock, Zap, Share2, MessageSquare, TrendingUp,DatabaseZap
} from "lucide-react";
import { Cover } from '@/components/ui/cover';
import { TracingBeam } from "@/components/ui/tracing-beam.jsx";
import { TypewriterEffectSmooth } from '@/components/ui/typewriter-effect';
const HomePage = () => {
    const navigate = useNavigate();
    const handleNavigate = () => {
        navigate("/dashboard");
    };

    const words = [
        {
          text: "Social ",
          className: "text-[16px] sm:text-[34px] lg:text-[42px] text-gray-800 dark:text-white transition-ease"
        },
        {
          text: "Media ",
          className: "text-[16px] sm:text-[34px] lg:text-[42px] text-gray-800 dark:text-white transition-ease"
        },
        {
          text: "Analytics ",
          className: "text-[16px] sm:text-[34px] lg:text-[42px] text-gray-800 dark:text-white transition-ease"
        },
        {
          text: "Made ",
          className: "text-[16px] sm:text-[34px] lg:text-[42px] text-gray-800 dark:text-white transition-ease"
        },
        {
          text: "Simple.",
          className: "text-[16px] sm:text-[34px] lg:text-[42px] text-blue-500 dark:text-blue-500"
        },
      ];

    const features = [
        {
            icon: <LineChart className="h-6 w-6" />,
            title: "Real-time Analytics",
            description: "Get instant insights with our real-time social media performance tracking"
        },
        {
            icon: <Lock className="h-6 w-6" />,
            title: "Secure Data",
            description: "Enterprise-grade security ensuring your data remains protected"
        },
        {
            icon: <Zap className="h-6 w-6" />,
            title: "Fast Processing",
            description: "Advanced algorithms process millions of data points in seconds"
        },
        {
            icon: <Share2 className="h-6 w-6" />,
            title: "Easy Sharing",
            description: "Share reports and insights with your team in one click"
        }
    ];

    const testimonials = [
        {
            name: "David Smith",
            role: "Marketing Director",
            company: "TechCorp",
            content: "This platform has transformed how we approach social media strategy. The insights are invaluable.",
            image: "/api/placeholder/100/100"
        },
        {
            name: "Lisa Chen",
            role: "Social Media Manager",
            company: "GrowthCo",
            content: "The real-time analytics have helped us improve engagement by 150%. Absolutely recommended!",
            image: "/api/placeholder/100/100"
        }
    ];

    const teamMembers = [
        {
            name: "Kushagra Gupta",          
            github : "https://github.com/Cypher2801",
            linkedIn : "https://www.linkedin.com/in/kushagra-gupta-67b7b628a/",
            image : "https://res.cloudinary.com/dup5fitl6/image/upload/v1736358481/e8nyfxhodaueqo00fpwt.jpg"
        },
        {
            name: "Naveen Patidar",
            image: "https://res.cloudinary.com/dup5fitl6/image/upload/v1736358509/fxhrjeksfzaxm0moqeys.jpg",
            github : "https://github.com/kraitop",
            linkedIn : "https://www.linkedin.com/in/naveen-patidar-448a57288/"
        },
        {
            name: "Aniz Agarwal",
            image: "https://res.cloudinary.com/dup5fitl6/image/upload/v1736357957/njsdpag8docq2lbhquyc.png",
            github : "https://github.com/aniz-ag",
            linkedIn : "https://www.linkedin.com/in/aniz-agarwal-2b1707292/"
        }
    ];

    const techStack = [
        { name: "React", icon: <Boxes className="h-8 w-8" /> },
        { name: "LangFlow", icon: <BarChart3 className="h-8 w-8" /> },
        { name: "Astra DB", icon: <DatabaseZap className="h-8 w-8" /> }
    ];

    const stats = [
        { label: "Active Users", value: "10,000+" },
        { label: "Data Points Processed", value: "1B+" },
        { label: "Customer Satisfaction", value: "98%" },
        { label: "Time Saved", value: "5hrs/week" }
    ];

    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
            {/* <TracingBeam  className="px-6"> */}
                <div className="max-w-6xl mx-auto px-6">
                    {/* Hero Section */}
                    <section className="py-24 text-center">
                        <div className="space-y-6">
                            <div className='w-2xl mb-20'>
                                <Cover className={"text-7xl rounded p-9"}>Socialli</Cover>
                            </div>
                            <div className="animate-fade-in space-y-6">
                            <TypewriterEffectSmooth words={words} className=""/>
                                <p className="text-[16px] text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                                    Unlock powerful insights from your social media data with our advanced analytics platform
                                </p>
                                <Button
                                    size="lg"
                                    onClick={handleNavigate}
                                    className="bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 transition-all duration-300 transform hover:scale-105"
                                >
                                    Get Started!
                                </Button>
                            </div>
                        </div>
                    </section>

                    {/* Stats Section
                    <section className="py-16 border-t border-gray-200 dark:border-gray-700">
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                            {stats.map((stat, index) => (
                                <div key={index} className="text-center">
                                    <h3 className="text-[34px] font-bold text-blue-600 dark:text-blue-400">{stat.value}</h3>
                                    <p className="text-gray-600 dark:text-gray-300 mt-2">{stat.label}</p>
                                </div>
                            ))}
                        </div>
                    </section> */}

                    {/* Features Section */}
                    <section className="py-16 border-t border-gray-200 dark:border-gray-700">
                        <div className="text-center mb-12">
                            <h2 className="bg-black dark:bg-white text-white dark:text-black rounded-full text-sm w-fit px-4 py-1 mb-4 mx-auto">
                                Features
                            </h2>
                            <h2 className="text-[34px] font-bold dark:text-white transition-ease">Why Choose Us</h2>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                            {features.map((feature, index) => (
                                <Card key={index} className="hover:shadow-lg transition-all duration-300 dark:bg-gray-800 dark:border-gray-700">
                                    <CardContent className="p-6">
                                        <div className="rounded-full bg-blue-100 dark:bg-blue-900 p-3 w-12 h-12 flex items-center justify-center mb-4">
                                            <div className="text-blue-600 dark:text-blue-400">
                                                {feature.icon}
                                            </div>
                                        </div>
                                        <h3 className="text-[16px] font-semibold mb-2 dark:text-white transition-ease">{feature.title}</h3>
                                        <p className="text-gray-600 dark:text-gray-300">{feature.description}</p>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    </section>

                    {/* Tech Stack Section */}
                    <section className="py-16 border-t border-gray-200 dark:border-gray-700">
                        <div className="mb-10">
                            <h2 className="bg-black dark:bg-white text-white dark:text-black rounded-full text-sm w-fit px-4 py-1 mb-4 mx-auto">
                                Technology
                            </h2>
                            <h2 className="text-[34px] font-bold text-center mb-12 dark:text-white transition-ease">Our Tech Stack</h2>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                                {techStack.map((tech) => (
                                    <Card key={tech.name} className="hover:shadow-lg transition-all duration-300 dark:bg-gray-800 dark:border-gray-700">
                                        <CardContent className="p-6 text-center">
                                            <div className="flex justify-center mb-4 dark:text-gray-300">
                                                {tech.icon}
                                            </div>
                                            <h3 className="text-[16px] font-semibold dark:text-white transition-ease">{tech.name}</h3>
                                        </CardContent>
                                    </Card>
                                ))}
                            </div>
                        </div>
                    </section>

                    {/* Testimonials Section */}
                    {/* <section className="py-16 border-t border-gray-200 dark:border-gray-700">
                        <div className="text-center mb-12">
                            <h2 className="bg-black dark:bg-white text-white dark:text-black rounded-full text-sm w-fit px-4 py-1 mb-4 mx-auto">
                                Testimonials
                            </h2>
                            <h2 className="text-[34px] font-bold dark:text-white transition-ease">What Our Clients Say</h2>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            {testimonials.map((testimonial, index) => (
                                <Card key={index} className="hover:shadow-lg transition-all duration-300 dark:bg-gray-800 dark:border-gray-700">
                                    <CardContent className="p-6">
                                        <div className="flex items-center mb-4">
                                            <img
                                                src={testimonial.image}
                                                alt={testimonial.name}
                                                className="rounded-full w-12 h-12 mr-4"
                                            />
                                            <div>
                                                <h4 className="font-semibold dark:text-white transition-ease">{testimonial.name}</h4>
                                                <p className="text-sm text-gray-600 dark:text-gray-300">
                                                    {testimonial.role} at {testimonial.company}
                                                </p>
                                            </div>
                                        </div>
                                        <p className="text-gray-600 dark:text-gray-300 italic">"{testimonial.content}"</p>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    </section> */}

                    {/* Team Section */}
                    <section className="py-16 border-t border-gray-200 dark:border-gray-700">
                        <div className="mb-10">
                            <h2 className="bg-black dark:bg-white text-white dark:text-black rounded-full text-sm w-fit px-4 py-1 mb-4 mx-auto">
                                Team
                            </h2>
                            <h2 className="text-[34px] font-bold text-center mb-12 dark:text-white transition-ease">Meet Our Team</h2>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                                {teamMembers.map((member) => (
                                    <Card
                                        key={member.name}
                                        className="hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 dark:bg-gray-800 dark:border-gray-700"
                                    >
                                        <CardHeader>
                                            <img
                                                src={member.image}
                                                alt={member.name}
                                                className="rounded-full w-32 h-32 mx-auto mb-4"
                                            />
                                            <CardTitle className="text-center dark:text-white transition-ease">{member.name}</CardTitle>
                                            <p className="text-center text-gray-600 dark:text-gray-300 font-medium">{member.role}</p>
                                        </CardHeader>
                                        <CardContent>
                                            <p className="text-center text-gray-600 dark:text-gray-300">{member.description}</p>
                                            <div className="flex justify-center space-x-4 mt-4">
                                                <a href={`${member.github}`} target='_blank'>
                                                <Github className="h-5 w-5 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white cursor-pointer" />
                                                </a>
                                                <a href={`${member.linkedIn}`} target='_blank'>
                                                <Linkedin className="h-5 w-5 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white cursor-pointer" />
                                                </a>
                                            </div>
                                        </CardContent>
                                    </Card>
                                ))}
                            </div>
                        </div>
                    </section>

                    {/* CTA Section */}
                    {/* <section className="py-16 border-t border-gray-200 dark:border-gray-700">
                        <div className="text-center space-y-6">
                            <h2 className="text-[34px] font-bold dark:text-white transition-ease">Ready to Get Started?</h2>
                            <p className="text-[16px] text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                                Join thousands of companies using our platform to improve their social media performance
                            </p>
                            <Button
                                size="lg"
                                onClick={handleNavigate}
                                className="bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 transition-all duration-300 transform hover:scale-105"
                            >
                                Start Free Trial
                            </Button>
                        </div>
                    </section> */}
                </div>
            {/* </TracingBeam> */}
        </div>
    );
};

export default HomePage;