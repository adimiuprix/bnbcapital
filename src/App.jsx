import './App.css'
import Header from './partials/Header'
import ContactBox from './partials/ContactBox'
import Hero from './partials/Hero'
import TvlCard from './partials/TvlCard'
import Stat from './partials/Stat'
import LiveTransactions from './partials/LiveTransactions'
import HowItWorks from './partials/HowItWorks'
import Investment from './partials/Investment'
import Calculator from './partials/Calculator'
import Dashboard from './partials/Dashboard'
import Referral from './partials/Referral'
import SecurityAudit from './partials/SecurityAudit'
import Features from './partials/Features'
import MediaCoverage from './partials/MediaCoverage'
import Faqs from './partials/Faqs'
import Footer from './partials/Footer'

function App() {

  return (
    <>
        <Header />

        <div className="app-container">
            <ContactBox />
            <Hero />
            <TvlCard />
            <Stat />
            <LiveTransactions />
            <HowItWorks />
            <Investment />
            <Calculator />
            <Dashboard />
            <Referral />
            <SecurityAudit />
            <Features />
            <MediaCoverage />
            <Faqs />
            <Footer />
        </div>
    </>
  )
}

export default App
