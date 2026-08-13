import Image from "next/image";
import Link from "next/link";
import type { CmsSiteSettings } from "@/lib/cms";

export function Footer({ settings }: { settings: CmsSiteSettings }) {
  return (
    <footer className="bg-[var(--navy-deep)] text-white/80">
      <div className="mx-auto max-w-6xl px-6 py-16">
        <div className="grid gap-12 sm:grid-cols-2 md:grid-cols-4">
          <div>
            <div className="flex items-center gap-3">
              {settings.logo && (
                <Image src={settings.logo} alt="" width={36} height={36} />
              )}
              <span className="text-sm font-bold text-white">{settings.name}</span>
            </div>
            <p className="mt-4 text-sm leading-relaxed">{settings.address}</p>
            <p className="mt-2 text-sm leading-relaxed">Sunday Service · 10:00 AM</p>
          </div>

          <div>
            <h4 className="kicker mb-4">Explore</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/" className="hover:text-white">Home</Link></li>
              <li><Link href="/sermons" className="hover:text-white">Sermons</Link></li>
              <li><Link href="/events" className="hover:text-white">Events</Link></li>
              <li><Link href="/media" className="hover:text-white">Media</Link></li>
              <li><Link href="/contact" className="hover:text-white">Contact</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="kicker mb-4">Connect</h4>
            <ul className="space-y-2 text-sm">
              {settings.youtubeUrl && (
                <li>
                  <a href={settings.youtubeUrl} target="_blank" rel="noopener noreferrer" className="hover:text-white">
                    YouTube
                  </a>
                </li>
              )}
              {settings.podcastUrl && (
                <li>
                  <a href={settings.podcastUrl} target="_blank" rel="noopener noreferrer" className="hover:text-white">
                    DAG Podcast
                  </a>
                </li>
              )}
              {settings.linktreeUrl && (
                <li>
                  <a href={settings.linktreeUrl} target="_blank" rel="noopener noreferrer" className="hover:text-white">
                    Linktree
                  </a>
                </li>
              )}
            </ul>
          </div>

          <div>
            <h4 className="kicker mb-4">Give</h4>
            <p className="text-sm leading-relaxed">
              Every seed sown helps take the Gospel further.
            </p>
            <p className="mt-2 text-xs text-white/50">2 Corinthians 9:7</p>
          </div>
        </div>

        <div className="mt-12 border-t border-white/10 pt-6 text-xs text-white/40">
          © {new Date().getFullYear()} {settings.name}. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
