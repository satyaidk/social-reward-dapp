import { Routes, Route, Link, NavLink } from 'react-router-dom'
import { ConnectButton } from '@rainbow-me/rainbowkit'
import { useEffect } from 'react'
import './App.css'
import { Dashboard, Events, Rewards, Share } from './pages'

function Layout({ children }: { children: React.ReactNode }) {
	return (
		<div className="min-h-screen bg-neutral-950 text-white">
			<header className="border-b border-neutral-800/70 sticky top-0 z-40 backdrop-blur supports-[backdrop-filter]:bg-neutral-950/70">
				<div className="mx-auto max-w-7xl px-4 py-4 flex items-center justify-between">
					<Link to="/" className="text-xl font-bold"><span className="text-white">Scan</span><span className="text-brand">2Share</span></Link>
					<nav className="hidden md:flex items-center gap-6">
						<NavLink to="/dashboard" className={({ isActive }) => isActive ? 'text-brand' : 'text-neutral-300 hover:text-white'}>Dashboard</NavLink>
						<NavLink to="/events" className={({ isActive }) => isActive ? 'text-brand' : 'text-neutral-300 hover:text-white'}>Events</NavLink>
						<NavLink to="/rewards" className={({ isActive }) => isActive ? 'text-brand' : 'text-neutral-300 hover:text-white'}>Rewards</NavLink>
					</nav>
					<div className="flex items-center gap-3">
						<ConnectButton />
					</div>
				</div>
			</header>
			<main className="mx-auto max-w-7xl px-4 py-10 md:py-16">{children}</main>
			<footer className="border-t border-neutral-800">
				<div className="mx-auto max-w-7xl px-4 py-10 grid md:grid-cols-4 gap-6 text-sm text-neutral-400">
					<div>
						<h4 className="font-semibold text-white mb-3">Scan2Share</h4>
						<p>The Web3 platform that revolutionizes event sharing through AI-powered posts and blockchain rewards.</p>
					</div>
					<div>
						<h4 className="font-semibold text-white mb-3">Platform</h4>
						<ul className="space-y-2">
							<li><Link to="/dashboard">Dashboard</Link></li>
							<li><Link to="/events">Events</Link></li>
							<li><Link to="/rewards">Rewards</Link></li>
						</ul>
					</div>
					<div>
						<h4 className="font-semibold text-white mb-3">Resources</h4>
						<ul className="space-y-2">
							<li><a href="#">Documentation</a></li>
							<li><a href="#">API Reference</a></li>
							<li><a href="#">Support</a></li>
							<li><a href="#">Community</a></li>
						</ul>
					</div>
					<div className="text-neutral-500">© {new Date().getFullYear()} Scan2Share</div>
				</div>
			</footer>
		</div>
	)
}

function Home() {
	useEffect(() => { window.scrollTo(0, 0) }, [])
	return (
		<div className="space-y-16">
			<section className="text-center space-y-6">
				<h1 className="text-4xl md:text-6xl font-extrabold tracking-tight"><span className="text-white">Share Events, </span><span className="bg-gradient-to-r from-brand to-brand-light bg-clip-text text-transparent">Earn Rewards</span></h1>
				<p className="text-neutral-300 max-w-3xl mx-auto">Create AI-powered social media posts for events, share them with your network, and earn loyalty tokens that can be staked or redeemed for rewards.</p>
				<div className="flex flex-col sm:flex-row items-center justify-center gap-3">
					<Link to="/events" className="px-6 py-3 bg-brand hover:bg-brand-dark transition text-white rounded-md w-full sm:w-auto">Create Event</Link>
					<Link to="/events" className="px-6 py-3 bg-neutral-800 hover:bg-neutral-700 transition text-white rounded-md w-full sm:w-auto">Browse Events</Link>
				</div>
			</section>
			<section className="grid md:grid-cols-3 gap-4 md:gap-6">
				{[
					{title: 'Scan QR Code', desc: 'Attendees scan QR codes to access event sharing pages'},
					{title: 'AI-Generated Posts', desc: 'Get personalized social media posts created by AI'},
					{title: 'Earn Tokens', desc: 'Receive loyalty tokens for sharing and engage in staking'},
				].map((f) => (
					<div key={f.title} className="rounded-xl border border-neutral-800 p-6 bg-neutral-900/40 shadow-sm">
						<div className="font-semibold mb-2">{f.title}</div>
						<p className="text-neutral-400 text-sm">{f.desc}</p>
					</div>
				))}
			</section>
			<section className="space-y-4">
				<h2 className="text-2xl md:text-3xl font-bold text-center">Powerful Features for Event Sharing</h2>
				<div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
					{[
						{title: 'QR Code Generation', desc: 'Automatically generate QR codes and short links for easy event sharing'},
						{title: 'AI-Powered Posts', desc: 'Generate personalized social media content using advanced AI technology'},
						{title: 'Social Integration', desc: 'Seamlessly share to Twitter and LinkedIn with one-click posting'},
						{title: 'Loyalty Tokens', desc: 'Earn POSTMINT tokens for every verified social media post you share'},
						{title: 'Token Staking', desc: 'Stake your tokens to earn daily rewards and maximize your earnings'},
						{title: 'Reward Redemption', desc: 'Redeem tokens for gift cards, stablecoins, and exclusive rewards'},
					].map((f) => (
						<div key={f.title} className="rounded-xl border border-neutral-800 p-6 bg-neutral-900/40">
							<div className="font-semibold mb-2">{f.title}</div>
							<p className="text-neutral-400 text-sm">{f.desc}</p>
						</div>
					))}
				</div>
			</section>
			<section className="space-y-4">
				<h2 className="text-2xl md:text-3xl font-bold text-center">How It Works</h2>
				<div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
					{[
						{step: '01', title: 'Create Event', desc: 'Event organizers create events with details, speakers, and hashtags. QR codes are automatically generated.'},
						{step: '02', title: 'Share QR Code', desc: 'Attendees scan the QR code or visit the short link to access the event sharing page.'},
						{step: '03', title: 'Generate Post', desc: 'AI creates personalized social media posts based on event details and user preferences.'},
						{step: '04', title: 'Share & Earn', desc: 'Users share the post on social media and earn POSTMINT tokens once verified.'},
					].map((s) => (
						<div key={s.step} className="rounded-xl border border-neutral-800 p-6 bg-neutral-900/40">
							<div className="text-brand font-bold">{s.step}</div>
							<div className="font-semibold mb-2">{s.title}</div>
							<p className="text-neutral-400 text-sm">{s.desc}</p>
						</div>
					))}
				</div>
			</section>
		</div>
	)
}

export default function App() {
	return (
		<Layout>
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/dashboard" element={<Dashboard />} />
				<Route path="/events" element={<Events />} />
				<Route path="/rewards" element={<Rewards />} />
				<Route path="/share/:code" element={<Share />} />
			</Routes>
		</Layout>
	)
}
