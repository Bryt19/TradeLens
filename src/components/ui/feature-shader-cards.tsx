"use client";

import type React from "react";
import { Warp } from "@paper-design/shaders-react";

interface Feature {
  title: string;
  description: string;
  details?: string;
  icon: React.ReactNode;
}

interface FeatureShaderCardsProps {
  features: Feature[];
  title?: string;
  subtitle?: string;
}

export default function FeatureShaderCards({
  features,
  title = "Get in Touch",
  subtitle = "Multiple ways to reach our sales team",
}: FeatureShaderCardsProps) {
  const getShaderConfig = (index: number) => {
    const configs = [
      {
        proportion: 0.3,
        softness: 0.8,
        distortion: 0.15,
        swirl: 0.6,
        swirlIterations: 8,
        shape: "checks" as const,
        shapeScale: 0.08,
        colors: [
          "hsl(220, 100%, 30%)",
          "hsl(240, 100%, 60%)",
          "hsl(200, 90%, 40%)",
          "hsl(230, 100%, 70%)",
        ],
      },
      {
        proportion: 0.4,
        softness: 1.2,
        distortion: 0.2,
        swirl: 0.9,
        swirlIterations: 12,
        shape: "dots" as const,
        shapeScale: 0.12,
        colors: [
          "hsl(200, 100%, 25%)",
          "hsl(180, 100%, 65%)",
          "hsl(160, 90%, 35%)",
          "hsl(190, 100%, 75%)",
        ],
      },
      {
        proportion: 0.35,
        softness: 0.9,
        distortion: 0.18,
        swirl: 0.7,
        swirlIterations: 10,
        shape: "checks" as const,
        shapeScale: 0.1,
        colors: [
          "hsl(280, 100%, 30%)",
          "hsl(300, 100%, 60%)",
          "hsl(260, 90%, 40%)",
          "hsl(290, 100%, 70%)",
        ],
      },
      {
        proportion: 0.45,
        softness: 1.1,
        distortion: 0.22,
        swirl: 0.8,
        swirlIterations: 15,
        shape: "dots" as const,
        shapeScale: 0.09,
        colors: [
          "hsl(220, 100%, 35%)",
          "hsl(240, 100%, 65%)",
          "hsl(200, 90%, 40%)",
          "hsl(230, 100%, 75%)",
        ],
      },
    ];
    return configs[index % configs.length];
  };

  return (
    <section className="py-20 px-4 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            {title}
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            {subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => {
            const shaderConfig = getShaderConfig(index);

            return (
              <div key={index} className="relative h-80">
                <div className="absolute inset-0 rounded-3xl overflow-hidden">
                  <Warp
                    style={{ height: "100%", width: "100%" }}
                    proportion={shaderConfig.proportion}
                    softness={shaderConfig.softness}
                    distortion={shaderConfig.distortion}
                    swirl={shaderConfig.swirl}
                    swirlIterations={shaderConfig.swirlIterations}
                    shape={shaderConfig.shape}
                    shapeScale={shaderConfig.shapeScale}
                    scale={1}
                    rotation={0}
                    speed={0.8}
                    colors={shaderConfig.colors}
                  />
                </div>

                <div className="relative z-10 p-6 rounded-3xl h-full flex flex-col bg-black/80 border border-white/20 dark:border-white/10">
                  <div className="mb-4 filter drop-shadow-lg flex justify-center">
                    {feature.icon}
                  </div>

                  <h3 className="text-xl font-bold mb-2 text-white text-center">
                    {feature.title}
                  </h3>

                  {feature.details && (
                    <p className="text-blue-400 dark:text-blue-300 font-medium mb-2 text-center">
                      {feature.details}
                    </p>
                  )}

                  <p className="leading-relaxed flex-grow text-gray-100 font-medium text-sm text-center">
                    {feature.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

