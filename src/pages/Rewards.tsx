import { useMemo, useState } from 'react'
import { useAppStore } from '../store'

export default function RewardsPage() {
	const balance = useAppStore(s => s.balance)
	const stake = useAppStore(s => s.stake)
	const unstake = useAppStore(s => s.unstake)
	const accrueRewards = useAppStore(s => s.accrueRewards)
	const staked = useAppStore(s => s.staked)
	const [amount, setAmount] = useState('')

	const accrued = useMemo(() => accrueRewards(), [staked])

	return (
		<div className="space-y-6 max-w-2xl">
			<div className="p-4 rounded-lg border border-neutral-800 bg-neutral-900/40">
				<div className="text-sm text-neutral-400">Balance</div>
				<div className="text-2xl font-bold">{balance.toFixed(2)} POSTMINT</div>
			</div>

			<div className="p-4 rounded-lg border border-neutral-800 bg-neutral-900/40 space-y-3">
				<div className="font-semibold">Stake Tokens</div>
				<div className="flex gap-3">
					<input className="w-40 rounded-md bg-neutral-900 border border-neutral-700 px-3 py-2" placeholder="Amount" value={amount} onChange={e => setAmount(e.target.value)} />
					<button className="px-4 py-2 bg-brand rounded-md" onClick={() => { const n = Number(amount); if (n>0) { stake(n); setAmount('') } }}>Stake</button>
				</div>
				<div className="text-sm text-neutral-400">Accrued (since start): {accrued.toFixed(2)} POSTMINT</div>
			</div>

			<div className="space-y-3">
				<div className="font-semibold">Positions</div>
				{staked.length === 0 && <div className="text-neutral-400 text-sm">No active positions.</div>}
				{staked.map(p => {
					const days = (Date.now() - p.startMs) / (1000 * 60 * 60 * 24)
					const reward = p.amount * p.rewardPerDay * days
					return (
						<div key={p.id} className="p-4 rounded-lg border border-neutral-800 bg-neutral-900/40 flex items-center justify-between">
							<div>
								<div className="font-medium">{p.amount.toFixed(2)} staked</div>
								<div className="text-xs text-neutral-400">{p.rewardPerDay*100}% daily · {days.toFixed(2)} days · {reward.toFixed(2)} earned</div>
							</div>
							<button className="px-3 py-1.5 bg-neutral-800 rounded-md" onClick={() => unstake(p.id)}>Unstake</button>
						</div>
					)
				})}
			</div>
		</div>
	)
}
