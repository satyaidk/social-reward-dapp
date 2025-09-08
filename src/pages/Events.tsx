import { useEffect, useState } from 'react'
import { useAppStore } from '../store'
import { QRCodeCard } from '../components/QRCodeCard'

function buildShareUrl(shortCode: string) {
	return `${location.origin}/share/${shortCode}`
}

export default function EventsPage() {
	const { createEvent, events, purgeExpiredEvents, deleteEvent, pastEvents } = useAppStore()
	const [form, setForm] = useState({ title: '', description: '', start: '', end: '', location: '', hashtags: '' })
	const [creating, setCreating] = useState(false)

	useEffect(() => { purgeExpiredEvents() }, [purgeExpiredEvents])

	const onSubmit = async (e: React.FormEvent) => {
		e.preventDefault()
		setCreating(true)
		const hashtags = form.hashtags.split(',').map(s => s.trim()).filter(Boolean)
		const startMs = form.start ? new Date(form.start).getTime() : Date.now()
		const endMs = form.end ? new Date(form.end).getTime() : startMs
		const date = new Date(startMs).toLocaleDateString()
		const evt = createEvent({ title: form.title, description: form.description, date, location: form.location, hashtags, startMs, endMs })
		await new Promise(r => setTimeout(r, 1200))
		setCreating(false)
		setForm({ title: '', description: '', start: '', end: '', location: '', hashtags: '' })
		console.log('Created event', evt)
	}

	return (
		<div className="grid md:grid-cols-2 gap-8">
			<form onSubmit={onSubmit} className="space-y-4 p-6 border border-neutral-800 rounded-lg bg-neutral-900/40">
				<h2 className="text-xl font-semibold">Create Event</h2>
				<input className="w-full rounded-md bg-neutral-900 border border-neutral-700 px-3 py-2" placeholder="Title" value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} required />
				<textarea className="w-full rounded-md bg-neutral-900 border border-neutral-700 px-3 py-2" placeholder="Description" value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} />
				<div className="grid grid-cols-2 gap-3">
					<input type="datetime-local" className="rounded-md bg-neutral-900 border border-neutral-700 px-3 py-2" placeholder="Start" value={form.start} onChange={e => setForm({ ...form, start: e.target.value })} />
					<input type="datetime-local" className="rounded-md bg-neutral-900 border border-neutral-700 px-3 py-2" placeholder="End" value={form.end} onChange={e => setForm({ ...form, end: e.target.value })} />
				</div>
				<div className="grid grid-cols-2 gap-3">
					<input className="rounded-md bg-neutral-900 border border-neutral-700 px-3 py-2" placeholder="Location" value={form.location} onChange={e => setForm({ ...form, location: e.target.value })} />
					<input className="rounded-md bg-neutral-900 border border-neutral-700 px-3 py-2" placeholder="Hashtags (comma-separated)" value={form.hashtags} onChange={e => setForm({ ...form, hashtags: e.target.value })} />
				</div>
				<button disabled={creating} className="relative px-5 py-2.5 rounded-md bg-brand hover:bg-brand-dark transition shadow-md overflow-hidden">
					{creating ? (
						<span className="inline-flex items-center gap-2">
							<span className="h-4 w-4 border-2 border-white/70 border-t-transparent rounded-full animate-spin"></span>
							Creating...
						</span>
					) : (
						'Create Event'
					)}
				</button>
			</form>

			<div className="space-y-4">
				<div className="flex items-center justify-between">
					<h2 className="text-xl font-semibold">Upcoming Events</h2>
					<a href="#past-events" className="text-sm text-brand hover:underline">View Past Events</a>
				</div>
				<div className="space-y-4">
					{events.length === 0 && <div className="text-neutral-400">No events yet. Create one to get started.</div>}
					{events.map(evt => {
						const shareUrl = buildShareUrl(evt.shortCode)
						return (
							<div key={evt.id} className="p-4 border border-neutral-800 rounded-lg bg-neutral-900/40">
								<div className="font-semibold">{evt.title}</div>
								<div className="text-neutral-400 text-sm">{evt.description}</div>
								<div className="text-xs text-neutral-500 mt-1">{new Date(evt.startMs).toLocaleString()} – {new Date(evt.endMs).toLocaleString()}</div>
								<div className="mt-3 flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
									<QRCodeCard text={shareUrl} />
									<div className="space-y-2">
										<div className="text-sm text-neutral-400">Short link</div>
										<a className="text-brand break-all" href={shareUrl} target="_blank" rel="noreferrer">{shareUrl}</a>
										<div>
											<button onClick={() => deleteEvent(evt.id)} className="mt-2 px-3 py-1.5 rounded-md bg-red-600/80 hover:bg-red-600 transition text-white text-sm">Delete</button>
										</div>
									</div>
								</div>
							</div>
						)
					})}
				</div>
				<div id="past-events" className="space-y-3 pt-6">
					<div className="flex items-center justify-between">
						<h3 className="font-semibold">Past Events</h3>
					</div>
					{pastEvents?.length === 0 && <div className="text-neutral-500 text-sm">No past events yet.</div>}
					{pastEvents?.map(evt => (
						<div key={evt.id} className="p-4 rounded-lg border border-neutral-800 bg-neutral-900/40">
							<div className="font-medium">{evt.title}</div>
							<div className="text-xs text-neutral-500">Ended {new Date(evt.endMs).toLocaleString()}</div>
						</div>
					))}
				</div>
			</div>
		</div>
	)
}
