import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Speech, Video, MessageSquare, Trophy } from 'lucide-react';

const features = [
  {
    icon: Speech,
    title: "AI-Powered Questions",
    description: "Listen to interview questions spoken by our AI interviewer"
  },
  {
    icon: Video,
    title: "Record Your Response",
    description: "Practice your answers in a realistic interview setting"
  },
  {
    icon: MessageSquare,
    title: "Get Instant Feedback",
    description: "Receive detailed analysis of your communication skills"
  },
  {
    icon: Trophy,
    title: "Track Progress",
    description: "Monitor your improvement over time"
  }
];

const HowItWorks = () => {
  return (
    <section id="how-it-works" className="pt-24 pb-12 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <h1 className="text-4xl font-bold text-gray-900 mb-6">
            Master Your Developer Interview Skills
          </h1>
          <p className="text-xl text-gray-600">
            Practice and perfect your interview skills with AI-powered feedback, helping you communicate more confidently and effectively.
          </p>
        </div>

        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900">How It Works</h2>
          <p className="mt-4 text-lg text-gray-600">
            Perfect your interview skills with our AI-powered platform
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature, index) => (
            <Card key={index} className="border border-gray-200">
              <CardHeader>
                <div className="h-12 w-12 rounded-lg bg-blue-100 flex items-center justify-center mb-4">
                  <feature.icon className="h-6 w-6 text-blue-600" />
                </div>
                <CardTitle className="text-lg">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>{feature.description}</CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
