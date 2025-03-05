
import React from 'react';
import { Check, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Navbar from '@/components/Navbar';
import { cn } from '@/lib/utils';

const PricingTier = ({ 
  name, 
  price, 
  description, 
  features, 
  isPopular 
}: { 
  name: string;
  price: string;
  description: string;
  features: { name: string; included: boolean }[];
  isPopular?: boolean;
}) => (
  <div className={cn(
    "rounded-2xl border bg-white p-8 shadow-sm",
    isPopular && "border-purple-600 shadow-purple-200"
  )}>
    {isPopular && (
      <p className="inline-block rounded-full bg-purple-100 px-4 py-1 text-sm font-medium text-purple-600 mb-4">
        Most Popular
      </p>
    )}
    <h3 className="text-xl font-bold text-gray-900">{name}</h3>
    <p className="mt-4 text-sm text-gray-500">{description}</p>
    <p className="mt-4 text-4xl font-bold">{price}</p>
    <p className="mt-1 text-sm text-gray-500">{price === "Free" ? "Forever" : "per month"}</p>
    <ul className="mt-8 space-y-4">
      {features.map((feature, i) => (
        <li key={i} className="flex items-center gap-3">
          {feature.included ? (
            <Check className="h-5 w-5 text-purple-600" />
          ) : (
            <X className="h-5 w-5 text-gray-400" />
          )}
          <span className={cn(
            "text-sm",
            feature.included ? "text-gray-700" : "text-gray-400"
          )}>
            {feature.name}
          </span>
        </li>
      ))}
    </ul>
    <Button className={cn(
      "mt-8 w-full",
      isPopular ? "bg-purple-600 hover:bg-purple-700" : ""
    )}>
      {price === "Free" ? "Get Started" : "Upgrade Now"}
    </Button>
  </div>
);

const Pricing = () => {
  const tiers = [
    {
      name: "Free Tier",
      price: "Free",
      description: "Perfect for trying out our interview practice platform",
      features: [
        { name: "60-second recording limit per answer", included: true },
        { name: "Basic AI feedback", included: true },
        { name: "3 practice interviews per month", included: true },
        { name: "High-quality AI voice playback", included: false },
        { name: "Unlimited recording time", included: false },
        { name: "Detailed performance analytics", included: false },
        { name: "Custom interview scenarios", included: false },
      ],
    },
    {
      name: "Premium",
      price: "$29",
      description: "Unlock the full potential of your interview preparation",
      isPopular: true,
      features: [
        { name: "60-second recording limit per answer", included: true },
        { name: "Basic AI feedback", included: true },
        { name: "Unlimited practice interviews", included: true },
        { name: "High-quality AI voice playback", included: true },
        { name: "Unlimited recording time", included: true },
        { name: "Detailed performance analytics", included: true },
        { name: "Custom interview scenarios", included: true },
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="py-24 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl text-center">
          <h2 className="text-3xl font-bold text-gray-900 sm:text-5xl">
            Simple, transparent pricing
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-gray-600">
            Choose the plan that best fits your interview preparation needs
          </p>
        </div>
        <div className="mx-auto mt-16 max-w-5xl grid gap-8 lg:grid-cols-2">
          {tiers.map((tier) => (
            <PricingTier key={tier.name} {...tier} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Pricing;
