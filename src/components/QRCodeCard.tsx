import { useEffect, useRef } from 'react'
import QRCode from 'qrcode'

export function QRCodeCard({ text }: { text: string }) {
	const canvasRef = useRef<HTMLCanvasElement | null>(null)
	useEffect(() => {
		if (!canvasRef.current) return
		QRCode.toCanvas(canvasRef.current, text, { width: 220, margin: 1, color: { light: '#111111', dark: '#ffffff' } })
	}, [text])
	return (
		<div className="p-4 border border-neutral-800 rounded-lg inline-flex flex-col items-center gap-2 bg-neutral-900/40">
			<canvas ref={canvasRef} className="rounded-md bg-neutral-950" />
			<div className="text-xs text-neutral-400 break-all max-w-[220px] text-center">{text}</div>
		</div>
	)
}
