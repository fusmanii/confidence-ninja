
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';

const tips = [
  {
    title: "Clear Communication",
    content: "Focus on articulating your thoughts clearly and concisely. Use the STAR method for behavioral questions."
  },
  {
    title: "Non-verbal Cues",
    content: "Maintain good eye contact, show enthusiasm through facial expressions, and maintain good posture."
  },
  {
    title: "Active Listening",
    content: "Demonstrate engagement by actively listening and responding thoughtfully to questions."
  },
  {
    title: "Problem-Solving Approach",
    content: "Explain your thought process clearly when discussing technical challenges and solutions."
  }
];

const InterviewTips = () => {
  return (
    <section className="py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900">Interview Tips</h2>
          <p className="mt-4 text-lg text-gray-600">
            What hiring managers look for beyond technical skills
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {tips.map((tip, index) => (
            <Card key={index} className="border border-gray-200">
              <CardHeader>
                <CardTitle className="text-xl">{tip.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">{tip.content}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default InterviewTips;
