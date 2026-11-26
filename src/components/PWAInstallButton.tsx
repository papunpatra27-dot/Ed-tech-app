import React, { useState } from 'react';
import { Download, Smartphone, WifiOff, X } from 'lucide-react';
import { useOnlineStatus } from '../hooks/useOnlineStatus';
import { usePWAInstall } from '../hooks/usePWAInstall';

export const PWAInstallButton: React.FC<{ variant?: 'compact' | 'card' }> = ({
  variant = 'compact',
}) => {
  const { isInstallable, isInstalled, isIOS, install } = usePWAInstall();
  const [showGuide, setShowGuide] = useState(false);

  if (isInstalled) return null;

  if (variant === 'card') {
    return (
      <>
        <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <h3 className="font-display text-base font-semibold text-slate-900 dark:text-slate-100">
              Install BangaPrep on Android
            </h3>
            <p className="text-sm text-slate-600 dark:text-slate-400">
              Add to your home screen for full-screen app launch and offline starter question access.
            </p>
          </div>
          {isInstallable ? (
            <button
              type="button"
              onClick={install}
              className="inline-flex items-center justify-center gap-2 min-h-[44px] px-5 py-2.5 rounded-xl bg-blue-800 hover:bg-blue-900 text-white text-sm font-semibold transition-colors whitespace-nowrap shrink-0 cursor-pointer"
            >
              <Download className="w-4 h-4" />
              <span>Install Android App</span>
            </button>
          ) : (
            <button
              type="button"
              onClick={() => setShowGuide(true)}
              className="inline-flex items-center justify-center gap-2 min-h-[44px] px-5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-900 dark:text-slate-100 text-sm font-semibold transition-colors whitespace-nowrap shrink-0 cursor-pointer"
            >
              <Smartphone className="w-4 h-4" />
              <span>{isIOS ? 'Add to iPhone' : 'Android Install Guide'}</span>
            </button>
          )}
        </div>

        {showGuide && (
          <InstallGuideModal
            isIOS={isIOS}
            onClose={() => setShowGuide(false)}
          />
        )}
      </>
    );
  }

  if (isInstallable) {
    return (
      <button
        type="button"
        onClick={install}
        className="inline-flex items-center gap-1.5 min-h-[40px] px-3.5 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-100 text-xs font-semibold transition-colors whitespace-nowrap shrink-0 cursor-pointer"
      >
        <Download className="w-3.5 h-3.5 text-blue-700 dark:text-blue-400" />
        <span>Install App</span>
      </button>
    );
  }

  if (isIOS) {
    return (
      <>
        <button
          type="button"
          onClick={() => setShowGuide(true)}
          className="inline-flex items-center gap-1.5 min-h-[40px] px-3.5 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-100 text-xs font-semibold transition-colors whitespace-nowrap shrink-0 cursor-pointer"
        >
          <Smartphone className="w-3.5 h-3.5" />
          <span>Install</span>
        </button>
        {showGuide && (
          <InstallGuideModal isIOS={true} onClose={() => setShowGuide(false)} />
        )}
      </>
    );
  }

  return null;
};

const InstallGuideModal: React.FC<{ isIOS: boolean; onClose: () => void }> = ({
  isIOS,
  onClose,
}) => (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 backdrop-blur-xs p-4">
    <div className="w-full max-w-md rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-xl">
      <div className="flex items-center justify-between gap-4">
        <h3 className="font-display text-lg font-semibold text-slate-900 dark:text-slate-100">
          {isIOS ? 'Add BangaPrep to iPhone / iPad' : 'Install BangaPrep on Android'}
        </h3>
        <button
          type="button"
          onClick={onClose}
          aria-label="Close guide"
          className="min-h-[40px] min-w-[40px] flex items-center justify-center rounded-xl text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
      {isIOS ? (
        <ol className="mt-4 space-y-2.5 text-sm text-slate-700 dark:text-slate-300 list-decimal pl-5">
          <li>Tap the Share button in the Safari toolbar.</li>
          <li>Scroll down and choose &ldquo;Add to Home Screen&rdquo;.</li>
          <li>Tap &ldquo;Add&rdquo; to launch BangaPrep like a native app.</li>
        </ol>
      ) : (
        <ol className="mt-4 space-y-2.5 text-sm text-slate-700 dark:text-slate-300 list-decimal pl-5">
          <li>Open this page in Google Chrome on your Android phone.</li>
          <li>Tap the three-dot browser menu in the top-right corner.</li>
          <li>Select &ldquo;Install app&rdquo; or &ldquo;Add to Home screen&rdquo;.</li>
          <li>Or build the native Android APK using the included Capacitor workflow.</li>
        </ol>
      )}
      <button
        type="button"
        onClick={onClose}
        className="mt-6 w-full min-h-[44px] rounded-xl bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 text-sm font-semibold hover:opacity-90 transition-opacity cursor-pointer"
      >
        Done
      </button>
    </div>
  </div>
);

export const OfflineIndicator: React.FC = () => {
  const isOnline = useOnlineStatus();
  if (isOnline) return null;

  return (
    <div className="fixed bottom-20 md:bottom-4 left-4 z-40 inline-flex items-center gap-2 rounded-xl border border-amber-300 dark:border-amber-800 bg-amber-50 dark:bg-amber-950 px-3.5 py-2 text-xs font-medium text-amber-950 dark:text-amber-100 shadow-md">
      <WifiOff className="w-3.5 h-3.5 text-amber-700 dark:text-amber-300 shrink-0" />
      <span>Offline Mode — Curated starter MCQs &amp; Mistake Vault available</span>
    </div>
  );
};
