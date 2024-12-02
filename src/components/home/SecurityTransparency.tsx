"use client"
import React from 'react';
import {
  BiShieldAlt2,
  BiLock,
  BiSearchAlt,
  BiCode
} from 'react-icons/bi';
import {
  BsShieldCheck,
  BsFileEarmarkCode,
  BsBank2,
  BsCheckCircle
} from 'react-icons/bs';

const SecurityTransparency = () => {
  return (
    <div className="w-full bg-gradient-to-br from-[#37474F] to-[#263238] min-h-screen p-6 flex items-center">
      <div className="max-w-6xl mx-auto animate-fadeIn">
        {/* Header */}
        <div className="text-center mb-16 animate-fadeInUp">
          <h2 className="text-4xl font-bold text-[#00BCD4] mb-4">Security & Transparency</h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Built on Solana's high-performance blockchain with institutional-grade security measures and complete transparency
          </p>
        </div>

        {/* Main Security Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12 animate-fadeInUp">
          {/* Left Column - Security Features */}
          <div className="bg-[#263238] rounded-lg p-8 border border-[#00BCD4]/50 relative overflow-hidden">
            <div className="flex items-center gap-3 mb-6">
              <BiShieldAlt2 className="text-[#00BCD4] text-5xl animate-pulse" />
              <h3 className="text-2xl text-[#00BCD4] font-semibold">Security Infrastructure</h3>
            </div>
            
            <div className="space-y-6">
              <div className="flex items-start gap-3 animate-fadeInLeft">
                <BiLock className="text-[#00BCD4] text-2xl mt-1" />
                <div>
                  <h4 className="text-[#00BCD4] font-medium mb-1">Multi-Layer Security</h4>
                  <p className="text-gray-400">Enterprise-grade security protocols with multi-signature controls and automated threat detection</p>
                </div>
              </div>

              <div className="flex items-start gap-3 animate-fadeInLeft">
                <BsShieldCheck className="text-[#00BCD4] text-2xl mt-1" />
                <div>
                  <h4 className="text-[#00BCD4] font-medium mb-1">Regular Security Audits</h4>
                  <p className="text-gray-400">Comprehensive security audits by leading blockchain security firms</p>
                </div>
              </div>

              <div className="flex items-start gap-3 animate-fadeInLeft">
                <BsBank2 className="text-[#00BCD4] text-2xl mt-1" />
                <div>
                  <h4 className="text-[#00BCD4] font-medium mb-1">Government Bond Backing</h4>
                  <p className="text-gray-400">100% backed by secure, yield-bearing government bonds stored in regulated custody</p>
                </div>
              </div>
            </div>

            <div className="absolute bottom-0 right-0 w-28 h-28 bg-[#00BCD4]/10 rounded-full animate-blob"></div>
          </div>

          {/* Right Column - Transparency Features */}
          <div className="bg-[#263238] rounded-lg p-8 border border-[#00BCD4]/50 relative overflow-hidden">
            <div className="flex items-center gap-3 mb-6">
              <BiSearchAlt className="text-[#00BCD4] text-5xl animate-pulse" />
              <h3 className="text-2xl text-[#00BCD4] font-semibold">Full Transparency</h3>
            </div>
            
            <div className="space-y-6">
              <div className="flex items-start gap-3 animate-fadeInRight">
                <BiCode className="text-[#00BCD4] text-2xl mt-1" />
                <div>
                  <h4 className="text-[#00BCD4] font-medium mb-1">Open Source Smart Contracts</h4>
                  <p className="text-gray-400">Publicly verifiable smart contracts with complete documentation</p>
                </div>
              </div>

              <div className="flex items-start gap-3 animate-fadeInRight">
                <BsFileEarmarkCode className="text-[#00BCD4] text-2xl mt-1" />
                <div>
                  <h4 className="text-[#00BCD4] font-medium mb-1">Solana Blockchain</h4>
                  <p className="text-gray-400">Built on Solana's secure and high-performance blockchain infrastructure</p>
                </div>
              </div>

              <div className="flex items-start gap-3 animate-fadeInRight">
                <BsCheckCircle className="text-[#00BCD4] text-2xl mt-1" />
                <div>
                  <h4 className="text-[#00BCD4] font-medium mb-1">Real-Time Monitoring</h4>
                  <p className="text-gray-400">24/7 transparent monitoring of all transactions and bond holdings</p>
                </div>
              </div>
            </div>

            <div className="absolute top-0 left-0 w-28 h-28 bg-[#00BCD4]/10 rounded-full animate-blob"></div>
          </div>
        </div>

        {/* Bottom Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-fadeInUp">
          <div className="bg-[#263238] rounded-lg p-6 border border-[#00BCD4]/50 text-center">
            <div className="text-[#00BCD4] text-lg mb-2">Security Rating</div>
            <div className="text-3xl text-[#00BCD4] font-semibold mb-1 animate-pulse">A+</div>
            <div className="text-gray-400 text-sm">by Dav</div>
          </div>

          <div className="bg-[#263238] rounded-lg p-6 border border-[#00BCD4]/50 text-center">
            <div className="text-[#00BCD4] text-lg mb-2">Audited Smart Contracts</div>
            <div className="text-3xl text-[#00BCD4] font-semibold mb-1 animate-pulse">100%</div>
            <div className="text-gray-400 text-sm">Coverage</div>
          </div>

          <div className="bg-[#263238] rounded-lg p-6 border border-[#00BCD4]/50 text-center">
            <div className="text-[#00BCD4] text-lg mb-2">Uptime Guarantee</div>
            <div className="text-3xl text-[#00BCD4] font-semibold mb-1 animate-pulse">99.99%</div>
            <div className="text-gray-400 text-sm">Platform Availability</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SecurityTransparency;