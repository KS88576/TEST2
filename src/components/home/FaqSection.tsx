"use client"
import React, { useState } from "react";

const FaqSection = () => {
  const faqs = [
    {
      question: "What are Stablebonds?",
      answer:
        "Stablebonds are digital assets backed by yield-bearing government bonds. They provide a secure way to maintain stability while offering returns over time.",
    },
    {
      question: "How does stablecoin creation work?",
      answer:
        "Our platform enables you to create custom stablecoins effortlessly. Simply define your parameters, such as the underlying asset, and the system handles the rest.",
    },
    {
      question: "Is it safe?",
      answer:
        "Absolutely. We leverage Solana's robust, secure blockchain technology and the stability of government-backed bonds to ensure that your assets remain protected and transactions are transparent.",
    },
    {
      question: "What fees are involved?",
      answer:
        "Our platform charges minimal fees for transactions and stablecoin creation. These fees are clearly outlined before you proceed with any operation, ensuring complete transparency.",
    },
    {
      question: "How do I earn yield?",
      answer:
        "By creating and holding Stablebonds, you gain access to yield-earning opportunities tied to government bonds. Additionally, as a creator, you can earn rewards from the platform for specific activities.",
    },
  ];

  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setExpandedFaq(expandedFaq === index ? null : index);
  };

  return (
    <section className="bg-gradient-to-br from-[#37474F] to-[#263238] text-gray-100 py-20 px-6">
      <div className="max-w-5xl mx-auto text-center animate-fadeInUp">
        <h2 className="text-4xl font-bold text-[#00BCD4] mb-6">
          Frequently Asked Questions
        </h2>
        <p className="text-gray-400 mb-12">
          Have questions? We've got answers to help you get started!
        </p>
      </div>
      <div className="max-w-4xl mx-auto">
        {faqs.map((faq, index) => (
          <div
            key={index}
            className={`
              bg-[#263238] rounded-lg p-6 mb-4 shadow-md animate-fadeInUp
              ${expandedFaq === index ? 'bg-[#1c2531] border-[#00BCD4]' : ''}
            `}
            style={{ animationDelay: `${index * 0.2}s` }}
            onClick={() => toggleFaq(index)}
          >
            <div className="flex items-center justify-between">
              <h3 className={`text-xl font-medium ${expandedFaq === index ? 'text-[#00BCD4]' : ''}`}>
                {faq.question}
              </h3>
              <button
                className={`
                  text-[#00BCD4] 
                  transition-transform duration-300
                  ${expandedFaq === index ? 'rotate-180' : ''}
                `}
              >
                &#8593;
              </button>
            </div>
            {expandedFaq === index && (
              <p className="text-gray-400 mt-3">{faq.answer}</p>
            )}
          </div>
        ))}
      </div>
    </section>
  );
};

export default FaqSection;