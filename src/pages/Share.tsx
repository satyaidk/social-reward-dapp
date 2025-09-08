import { useEffect, useMemo, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useAppStore } from '../store'

function useEventByCode(code: string | undefined) {
	const events = useAppStore(s => s.events)
	return useMemo(() => events.find(e => e.shortCode === code), [events, code])
}

async function generatePostPrompt(title: string, description: string, hashtags: string[]) {
	const base = `Join me at ${title}! ${description}`.slice(0, 180)
	const tags = hashtags.slice(0, 4).map(t => (t.startsWith('#') ? t : `#${t}`)).join(' ')
	return `${base} ${tags}`.trim()
}

export default function SharePage() {
	const { code } = useParams()
	const eventItem = useEventByCode(code)
	const recordShare = useAppStore(s => s.recordShare)
	const verifyShare = useAppStore(s => s.verifyShare)
	const [text, setText] = useState('')
	const [platform, setPlatform] = useState<'twitter' | 'linkedin'>('twitter')
	const [url, setUrl] = useState('')
	const [status, setStatus] = useState<'idle' | 'generated' | 'shared' | 'verified'>('idle')

	useEffect(() => {
		if (!eventItem) return
		generatePostPrompt(eventItem.title, eventItem.description, eventItem.hashtags).then(setText)
	}, [eventItem])

	if (!eventItem) return <div className="text-neutral-400">Invalid share link.</div>
	const now = Date.now()
	const expired = (eventItem as any).endMs && (eventItem as any).endMs < now
	if (expired) {
		return (
			<div className="max-w-xl p-6 rounded-lg border border-neutral-800 bg-neutral-900/40">
				<div className="text-xl font-semibold">This event has ended.</div>
				<div className="text-neutral-400 text-sm mt-1">Sharing is disabled for ended events.</div>
			</div>
		)
	}

	const shareIntent = () => {
		if (platform === 'twitter') {
			const href = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}`
			window.open(href, '_blank')
		} else {
			const href = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(location.origin)}&summary=${encodeURIComponent(text)}`
			window.open(href, '_blank')
		}
		setStatus('shared')
	}

	const onVerify = () => {
		const rec = recordShare({ eventId: eventItem.id, platform, url })
		verifyShare(rec.id, 10)
		setStatus('verified')
	}

	return (
		<div className="max-w-2xl space-y-4">
			<h1 className="text-2xl font-bold">Share: {eventItem.title}</h1>
			<textarea className="w-full h-40 rounded-md bg-neutral-900 border border-neutral-700 px-3 py-2" value={text} onChange={e => setText(e.target.value)} />
			<div className="flex gap-3 items-center">
				<select className="rounded-md bg-neutral-900 border border-neutral-700 px-3 py-2" value={platform} onChange={e => setPlatform(e.target.value as any)}>
					<option value="twitter">Twitter/X</option>
					<option value="linkedin">LinkedIn</option>
				</select>
				<button className="px-4 py-2 bg-brand rounded-md" onClick={shareIntent}>Share</button>
			</div>
			<div className="space-y-2">
				<label className="text-sm text-neutral-400">Paste your post URL here to verify:</label>
				<input className="w-full rounded-md bg-neutral-900 border border-neutral-700 px-3 py-2" placeholder="https://..." value={url} onChange={e => setUrl(e.target.value)} />
				<button className="px-4 py-2 bg-neutral-800 rounded-md" onClick={onVerify}>Verify & Claim 10 POSTMINT</button>
			</div>
			{status === 'verified' && <div className="text-green-400">Verified! 10 POSTMINT added.</div>}
		</div>
	)
}
