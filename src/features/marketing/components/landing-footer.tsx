import Image from "next/image";
import Link from "next/link";

export function LandingFooter() {
  return (
    <footer className="border-t border-dashed border-border bg-muted/30">
      <div className="mx-auto max-w-6xl px-4 py-12 lg:px-8">
        <div className="flex flex-col gap-8 sm:flex-row sm:items-start sm:justify-between">
          <div className="space-y-3">
            <Link href="/" className="flex items-center gap-2">
              <Image
                src="/logo.svg"
                alt="Resonance"
                width={24}
                height={24}
                className="rounded-sm"
              />
              <span className="text-lg font-semibold tracking-tighter">VoiceForge</span>
            </Link>
            <p className="max-w-xs text-sm text-muted-foreground">
              AI-powered text-to-speech and voice cloning for creators, teams, and
              storytellers.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-8 sm:gap-16">
            <div className="space-y-3">
              <p className="text-sm font-medium">Product</p>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <a href="#how-it-works" className="hover:text-foreground">
                    How it works
                  </a>
                </li>
                <li>
                  <a href="#faq" className="hover:text-foreground">
                    FAQ
                  </a>
                </li>
                <li>
                  <Link href="/sign-up" className="hover:text-foreground">
                    Get started
                  </Link>
                </li>
              </ul>
            </div>
            <div className="space-y-3">
              <p className="text-sm font-medium">Support</p>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <Link href="/sign-in" className="hover:text-foreground">
                    Sign in
                  </Link>
                </li>
                <li>
                  <a
                    href="mailto:imrohitsingh091@gmail.com"
                    className="hover:text-foreground"
                  >
                    Contact us
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-10 border-t border-dashed border-border pt-6 text-center text-sm text-muted-foreground">
          © {new Date().getFullYear()} VoiceForge. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
