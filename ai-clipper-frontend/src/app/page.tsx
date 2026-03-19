import Link from "next/link";
import { Button } from "~/components/ui/button";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">

      {/* ── Nav ── */}
      <nav className="sticky top-0 z-50 flex h-14 items-center justify-between border-b bg-background/95 px-6 backdrop-blur">
        <Link href="/" className="text-sm font-semibold tracking-tight">
          Clyp<span className="font-normal text-muted-foreground">so</span>
        </Link>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm" asChild>
            <Link href="#how">How it works</Link>
          </Button>
          <Button variant="ghost" size="sm" asChild>
            <Link href="#pricing">Pricing</Link>
          </Button>
          <Button variant="outline" size="sm" asChild>
            <Link href="/login">Log in</Link>
          </Button>
          <Button size="sm" asChild>
            <Link href="/login">Get started</Link>
          </Button>
        </div>
      </nav>

      {/* ── Hero ── */}
      <section className="mx-auto max-w-2xl px-6 pb-16 pt-20 text-center">
        <div className="mb-6 inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs text-muted-foreground">
          <span className="h-1.5 w-1.5 rounded-full bg-foreground" />
          AI-powered clip extraction
        </div>
        <h1 className="mb-4 text-4xl font-semibold tracking-tight sm:text-5xl">
          Turn your podcast into short-form content, automatically.
        </h1>
        <p className="mx-auto mb-8 max-w-md text-[15px] leading-relaxed text-muted-foreground">
          Upload your episode. Our AI finds the best moments and delivers clips
          ready to post — no editing required.
        </p>
        <div className="flex justify-center gap-2">
          <Button asChild>
            <Link href="/sign-up">Get started free</Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href="#how">See how it works</Link>
          </Button>
        </div>
      </section>

      {/* ── Dashboard preview ── */}
      <section className="mx-auto max-w-3xl px-6 pb-16">
        <div className="overflow-hidden rounded-xl border shadow-sm">
          {/* Browser chrome */}
          <div className="flex items-center gap-2 border-b bg-muted px-3 py-2">
            <div className="flex gap-1.5">
              <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
              <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
              <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
            </div>
            <div className="flex-1 rounded border bg-background px-2 py-0.5 font-mono text-[11px] text-muted-foreground">
              app.clypso.io/dashboard
            </div>
          </div>

          {/* Dashboard interior */}
          <div className="flex flex-col gap-5 bg-background p-6">
            {/* Header */}
            <div className="flex items-start justify-between">
              <div>
                <h2 className="text-xl font-semibold tracking-tight">Clypso</h2>
                <p className="text-sm text-muted-foreground">
                  Upload your podcast episodes and create clips from them.
                </p>
              </div>
              <Button size="sm">Buy Credits</Button>
            </div>

            {/* Tabs */}
            <div className="inline-flex rounded-md bg-muted p-1 text-sm">
              <span className="rounded bg-background px-3 py-1 font-medium shadow-sm">Upload</span>
              <span className="px-3 py-1 text-muted-foreground">My Clips</span>
            </div>

            {/* Upload card */}
            <div className="rounded-lg border">
              <div className="border-b px-5 py-4">
                <p className="font-semibold">Upload File</p>
                <p className="text-sm text-muted-foreground">
                  Upload your audio or video file to generate clips.
                </p>
              </div>
              <div className="p-5">
                {/* Dropzone */}
                <div className="flex flex-col items-center gap-3 rounded-lg border-2 border-dashed py-8 text-center">
                  <svg
                    className="h-9 w-9 text-muted-foreground"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={1.5}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    viewBox="0 0 24 24"
                  >
                    <polyline points="16 16 12 12 8 16" />
                    <line x1="12" y1="12" x2="12" y2="21" />
                    <path d="M20.39 18.39A5 5 0 0 0 18 9h-1.26A8 8 0 1 0 3 16.3" />
                  </svg>
                  <div>
                    <p className="text-sm font-medium">Drag and drop your file</p>
                    <p className="text-xs text-muted-foreground">or click to browse (MP4 up to 500 MB)</p>
                  </div>
                  <Button size="sm" className="mt-1">Select File</Button>
                </div>

                {/* Upload button row */}
                <div className="mt-3 flex justify-end">
                  <Button size="sm" disabled>Upload and Generate Clips</Button>
                </div>

                {/* Queue table */}
                <div className="mt-5">
                  <div className="mb-2 flex items-center justify-between">
                    <p className="text-sm font-medium">Queue Status</p>
                    <Button variant="outline" size="sm">Refresh</Button>
                  </div>
                  <div className="overflow-hidden rounded-md border text-sm">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b bg-muted/50 text-left text-xs font-medium text-muted-foreground">
                          <th className="px-3 py-2">File</th>
                          <th className="px-3 py-2">Uploaded</th>
                          <th className="px-3 py-2">Status</th>
                          <th className="px-3 py-2">Clips Generated</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="border-b">
                          <td className="px-3 py-2 font-medium">ep42_full.mp4</td>
                          <td className="px-3 py-2 text-muted-foreground">3/17/2026</td>
                          <td className="px-3 py-2">
                            <span className="rounded-full border bg-green-50 px-2 py-0.5 text-xs font-medium text-green-700">
                              Processed
                            </span>
                          </td>
                          <td className="px-3 py-2">8 clips</td>
                        </tr>
                        <tr className="border-b">
                          <td className="px-3 py-2 font-medium">interview_mar18.mp4</td>
                          <td className="px-3 py-2 text-muted-foreground">3/18/2026</td>
                          <td className="px-3 py-2">
                            <span className="rounded-full border px-2 py-0.5 text-xs font-medium">
                              Processing
                            </span>
                          </td>
                          <td className="px-3 py-2 text-muted-foreground">No clips yet</td>
                        </tr>
                        <tr>
                          <td className="px-3 py-2 font-medium">mi65min.mp4</td>
                          <td className="px-3 py-2 text-muted-foreground">3/18/2026</td>
                          <td className="px-3 py-2">
                            <span className="rounded-full bg-destructive px-2 py-0.5 text-xs font-medium text-destructive-foreground">
                              No Credits
                            </span>
                          </td>
                          <td className="px-3 py-2 text-muted-foreground">No clips yet</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Features ── */}
      <section id="features" className="border-y bg-muted/40 px-6 py-16">
        <div className="mx-auto max-w-3xl">
          <h2 className="mb-2 text-2xl font-semibold tracking-tight">
            Everything you need to clip smarter.
          </h2>
          <p className="mb-8 text-sm text-muted-foreground">
            A focused tool built for creators, marketers, and podcasters.
          </p>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {[
              { icon: "🧠", title: "AI clip detection", desc: "Identifies high-value moments — insights, humor, hot takes — not random cuts." },
              { icon: "⚡", title: "Background processing", desc: "Upload and walk away. Clips appear in your queue when they're ready." },
              { icon: "📱", title: "Short-form ready", desc: "Every clip formatted for TikTok, Reels, and YouTube Shorts." },
              { icon: "📦", title: "Batch uploads", desc: "Process your full back-catalog. Clypso handles the queue for you." },
              { icon: "📊", title: "Queue dashboard", desc: "Track upload status, clip counts, and processing — all in one place." },
              { icon: "💳", title: "Pay as you go", desc: "Buy credits when you need them. No subscriptions or surprise charges." },
            ].map((f) => (
              <div key={f.title} className="rounded-lg border bg-background p-5">
                <div className="mb-3 text-lg">{f.icon}</div>
                <p className="mb-1 text-sm font-semibold">{f.title}</p>
                <p className="text-xs leading-relaxed text-muted-foreground">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── How it works ── */}
      <section id="how" className="px-6 py-16">
        <div className="mx-auto max-w-xl">
          <h2 className="mb-2 text-2xl font-semibold tracking-tight">How it works.</h2>
          <p className="mb-8 text-sm text-muted-foreground">
            From upload to ready-to-post in a few minutes.
          </p>
          <div className="overflow-hidden rounded-lg border">
            {[
              { n: "1", title: "Upload your episode", desc: "Drag and drop any MP4 up to 500MB into the dashboard. Clypso queues it immediately." },
              { n: "2", title: "AI analyzes the content", desc: "The backend transcribes your episode and scores every segment for shareability and impact." },
              { n: "3", title: "Download your clips", desc: 'Trimmed clips appear in "My Clips" — labeled, ready to download and post.' },
            ].map((s, i, arr) => (
              <div key={s.n} className={`flex gap-4 p-5 ${i < arr.length - 1 ? "border-b" : ""}`}>
                <span className="mt-0.5 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-muted text-xs font-semibold text-muted-foreground">
                  {s.n}
                </span>
                <div>
                  <p className="mb-1 text-sm font-semibold">{s.title}</p>
                  <p className="text-xs leading-relaxed text-muted-foreground">{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Pricing ── */}
      <section id="pricing" className="border-y bg-muted/40 px-6 py-16">
        <div className="mx-auto max-w-3xl">
          <h2 className="mb-2 text-2xl font-semibold tracking-tight">
            Simple, credit-based pricing.
          </h2>
          <p className="mb-8 text-sm text-muted-foreground">
            No monthly fees. Buy credits when you need them.
          </p>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
            {[
              {
                name: "Starter", price: "$9", credits: "50 credits · ~5 episodes", popular: false,
                features: ["AI clip detection", "MP4 up to 500MB", "Queue dashboard", "Download all clips"],
              },
              {
                name: "Creator", price: "$29", credits: "200 credits · ~20 episodes", popular: true,
                features: ["Everything in Starter", "Priority processing", "Batch uploads", "Clip quality scores"],
              },
              {
                name: "Studio", price: "$79", credits: "600 credits · ~60 episodes", popular: false,
                features: ["Everything in Creator", "Team access (5 seats)", "API access", "Priority support"],
              },
            ].map((plan) => (
              <div
                key={plan.name}
                className={`relative rounded-lg border bg-background p-5 ${plan.popular ? "ring-1 ring-foreground" : ""}`}
              >
                {plan.popular && (
                  <span className="absolute -top-2.5 left-1/2 -translate-x-1/2 rounded-full bg-foreground px-2.5 py-0.5 text-[10px] font-semibold text-background">
                    Most popular
                  </span>
                )}
                <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                  {plan.name}
                </p>
                <p className="mb-0.5 text-3xl font-semibold tracking-tight">{plan.price}</p>
                <p className="mb-4 text-xs text-muted-foreground">{plan.credits}</p>
                <hr className="mb-4" />
                <ul className="mb-5 space-y-2">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-center gap-2 text-xs text-muted-foreground">
                      <span className="font-semibold text-foreground">✓</span> {f}
                    </li>
                  ))}
                </ul>
                <Button variant={plan.popular ? "default" : "outline"} className="w-full" size="sm" asChild>
                  <Link href="/sign-up">Buy credits</Link>
                </Button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="mx-auto max-w-lg px-6 py-20 text-center">
        <h2 className="mb-3 text-2xl font-semibold tracking-tight">
          Start clipping your first episode today.
        </h2>
        <p className="mb-6 text-sm text-muted-foreground">
          No credit card needed to get started.
        </p>
        <Button asChild>
          <Link href="/signup">Create free account</Link>
        </Button>
      </section>

      {/* ── Footer ── */}
      <footer className="flex items-center justify-between border-t px-6 py-5">
        <Link href="/" className="text-sm font-semibold tracking-tight">
          Clyp<span className="font-normal text-muted-foreground">so</span>
        </Link>
        <div className="flex gap-5">
          {["Features", "Pricing", "Privacy", "Terms"].map((l) => (
            <Link key={l} href="#" className="text-xs text-muted-foreground hover:text-foreground">
              {l}
            </Link>
          ))}
        </div>
        <p className="text-xs text-muted-foreground">© 2026 Clypso</p>
      </footer>

    </div>
  );
}
