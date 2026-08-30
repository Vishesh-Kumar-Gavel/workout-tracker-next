'use client'
import Link from "next/link"
import { usePathname } from "next/navigation"
export default function Sidebar(){
    const pathName = usePathname();
    console.log(pathName);
    return(
        <>
            {/* Sidebar */}
            <aside className="hidden w-64 flex-col border-r border-neutral-800 bg-neutral-950/80 px-6 py-6 md:flex">
                <div className="mb-8 flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-500/15 text-emerald-400 ring-1 ring-emerald-500/30">
                    <span className="text-lg font-semibold">WT</span>
                </div>
                <div>
                    <div className="text-sm font-semibold tracking-tight">
                    Workout Tracker
                    </div>
                    <div className="text-xs text-neutral-500">
                    Daily performance dashboard
                    </div>
                </div>
                </div>

                <nav className="space-y-1 text-sm">
                <Link href="/" className={`flex w-full items-center gap-2 rounded-lg 
                     px-3 py-2 text-left text-neutral-100 hover:bg-neutral-900/60 
                    ${pathName==="/"?'ring-1 ring-emerald-500/40 bg-neutral-900/80':''}`}>
                    <span className="inline-flex h-6 w-6 items-center justify-center rounded-md bg-neutral-900 text-neutral-500">
                    ●
                    </span>
                    <span className="font-medium">Dashboard</span>
                </Link>
                <Link href="/workouts" className={`flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-neutral-400 transition hover:bg-neutral-900/60 hover:text-neutral-100 ${pathName==="/workouts"?'ring-1 ring-emerald-500/40 bg-neutral-900/60':''}`}>
                    <span className="inline-flex h-6 w-6 items-center justify-center rounded-md bg-neutral-900 text-neutral-500">
                    ▢
                    </span>
                    Workouts
                </Link>
                <Link href="/exercises" className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-neutral-400 transition hover:bg-neutral-900/60 hover:text-neutral-100">
                    <span className="inline-flex h-6 w-6 items-center justify-center rounded-md bg-neutral-900 text-neutral-500">
                    ▲
                    </span>
                    Exercises
                </Link>
                <button className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-neutral-400 transition hover:bg-neutral-900/60 hover:text-neutral-100">
                    <span className="inline-flex h-6 w-6 items-center justify-center rounded-md bg-neutral-900 text-neutral-500">
                    ⚙
                    </span>
                    Settings
                </button>
                </nav>

                <div className="mt-auto pt-8 text-xs text-neutral-500">
                <div className="mb-2 text-neutral-400">Today&apos;s focus</div>
                <div className="rounded-lg border border-neutral-800 bg-neutral-900/60 px-3 py-3">
                    <div className="mb-1 text-xs font-medium text-neutral-200">
                    Upper Body Strength
                    </div>
                    <div className="text-[11px] text-neutral-500">
                    Log bench, rows, and accessory work.
                    </div>
                </div>
                </div>
            </aside>

        </>
    )
}