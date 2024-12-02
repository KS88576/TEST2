"use client";
import Home from "@/components/home/Home";
import HowItWorks from "@/components/home/HowItWorks";
import SecurityTransparency from "@/components/home/SecurityTransparency"
import FaqSection from "@/components/home/FaqSection"

const LandingPage = () => {
    return <>
        <Home />
        <HowItWorks />
        <SecurityTransparency />
        <FaqSection />
    </>
}

export default LandingPage;
