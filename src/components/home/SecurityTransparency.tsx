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
    <div className="w-full bg-[#0B1120] min-h-screen p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl font-semibold text-sky-400 mb-4">Security & Transparency</h2>
          <p className="text-slate-400 max-w-2xl mx-auto">
            Built on Solana's high-performance blockchain with institutional-grade security measures and complete transparency
          </p>
        </div>

        {/* Main Security Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {/* Left Column - Security Features */}
          <div className="bg-slate-800/60 rounded-lg p-8 border border-slate-700/50">
            <div className="flex items-center gap-3 mb-6">
              <BiShieldAlt2 className="text-sky-400 text-3xl" />
              <h3 className="text-2xl text-sky-100">Security Infrastructure</h3>
            </div>
            
            <div className="space-y-6">
              <div className="flex items-start gap-3">
                <BiLock className="text-sky-400 text-xl mt-1" />
                <div>
                  <h4 className="text-sky-100 font-medium mb-1">Multi-Layer Security</h4>
                  <p className="text-slate-400">Enterprise-grade security protocols with multi-signature controls and automated threat detection</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <BsShieldCheck className="text-sky-400 text-xl mt-1" />
                <div>
                  <h4 className="text-sky-100 font-medium mb-1">Regular Security Audits</h4>
                  <p className="text-slate-400">Comprehensive security audits by leading blockchain security firms</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <BsBank2 className="text-sky-400 text-xl mt-1" />
                <div>
                  <h4 className="text-sky-100 font-medium mb-1">Government Bond Backing</h4>
                  <p className="text-slate-400">100% backed by secure, yield-bearing government bonds stored in regulated custody</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Transparency Features */}
          <div className="bg-slate-800/60 rounded-lg p-8 border border-slate-700/50">
            <div className="flex items-center gap-3 mb-6">
              <BiSearchAlt className="text-sky-400 text-3xl" />
              <h3 className="text-2xl text-sky-100">Full Transparency</h3>
            </div>
            
            <div className="space-y-6">
              <div className="flex items-start gap-3">
                <BiCode className="text-sky-400 text-xl mt-1" />
                <div>
                  <h4 className="text-sky-100 font-medium mb-1">Open Source Smart Contracts</h4>
                  <p className="text-slate-400">Publicly verifiable smart contracts with complete documentation</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <BsFileEarmarkCode className="text-sky-400 text-xl mt-1" />
                <div>
                  <h4 className="text-sky-100 font-medium mb-1">Solana Blockchain</h4>
                  <p className="text-slate-400">Built on Solana's secure and high-performance blockchain infrastructure</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <BsCheckCircle className="text-sky-400 text-xl mt-1" />
                <div>
                  <h4 className="text-sky-100 font-medium mb-1">Real-Time Monitoring</h4>
                  <p className="text-slate-400">24/7 transparent monitoring of all transactions and bond holdings</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-slate-800/60 rounded-lg p-6 border border-slate-700/50 text-center">
            <div className="text-sky-400 text-lg mb-2">Security Rating</div>
            <div className="text-3xl text-sky-100 font-semibold mb-1">A+</div>
            <div className="text-slate-400 text-sm">by CertiK</div>
          </div>

          <div className="bg-slate-800/60 rounded-lg p-6 border border-slate-700/50 text-center">
            <div className="text-sky-400 text-lg mb-2">Audited Smart Contracts</div>
            <div className="text-3xl text-sky-100 font-semibold mb-1">100%</div>
            <div className="text-slate-400 text-sm">Coverage</div>
          </div>

          <div className="bg-slate-800/60 rounded-lg p-6 border border-slate-700/50 text-center">
            <div className="text-sky-400 text-lg mb-2">Uptime Guarantee</div>
            <div className="text-3xl text-sky-100 font-semibold mb-1">99.99%</div>
            <div className="text-slate-400 text-sm">Platform Availability</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SecurityTransparency;
