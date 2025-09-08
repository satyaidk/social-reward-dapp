import { useAppStore } from '../store'

export default function DashboardPage() {
	const shares = useAppStore(s => s.shares)
	const events = useAppStore(s => s.events)
	const byId = Object.fromEntries(events.map(e => [e.id, e]))
	const totalEarned = shares.filter(s => s.verified).reduce((n, s) => n + s.reward, 0)

	return (
		<div className="space-y-6">
			<div className="grid md:grid-cols-3 gap-4">
				<div className="p-4 rounded-lg border border-neutral-800 bg-neutral-900/40">
					<div className="text-sm text-neutral-400">Total Shares</div>
					<div className="text-2xl font-bold">{shares.length}</div>
				</div>
				<div className="p-4 rounded-lg border border-neutral-800 bg-neutral-900/40">
					<div className="text-sm text-neutral-400">Verified Shares</div>
					<div className="text-2xl font-bold">{shares.filter(s => s.verified).length}</div>
				</div>
				<div className="p-4 rounded-lg border border-neutral-800 bg-neutral-900/40">
					<div className="text-sm text-neutral-400">Total Earned</div>
					<div className="text-2xl font-bold">{totalEarned.toFixed(2)} POSTMINT</div>
				</div>
			</div>

			<div className="space-y-3">
				<div className="font-semibold">Recent Activity</div>
				<div className="space-y-2">
					{shares.length === 0 && <div className="text-neutral-400 text-sm">No activity yet.</div>}
					{shares.map(s => (
						<div key={s.id} className="p-3 rounded-md border border-neutral-800 bg-neutral-900/40 flex items-center justify-between">
							<div className="text-sm">
								<span className="text-neutral-400">{s.platform}</span> · {byId[s.eventId]?.title || 'Event'}
								{s.verified ? <span className="ml-2 text-green-400">+{s.reward}</span> : <span className="ml-2 text-yellow-400">pending</span>}
							</div>
							<a className="text-brand text-sm" href={s.url} target="_blank" rel="noreferrer">view</a>
						</div>
					))}
				</div>
			</div>
		</div>
	)
}
