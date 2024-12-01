"use client";
import Home from "@/components/home/Home";
import HowItWorks from "@/components/home/HowItWorks";
import Features from "@/components/home/Features"
import ExploreStableBonds from "@/components/home/ExploreStableBonds"
import Dashboard from "@/components/home/DashboardPreview"
import SecurityTransparency from "@/components/home/SecurityTransparency"
import FaqSection from "@/components/home/FaqSection"
import Footer from "@/components/home/Footer"

const LandingPage = () => {
    return <>
        <Home />
        <HowItWorks />
        <Features />
        <ExploreStableBonds />
        <Dashboard />
        <SecurityTransparency />
        <FaqSection />
        <Footer />
    </>
}

export default LandingPage;
