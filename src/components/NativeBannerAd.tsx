import React from 'react';

interface NativeBannerAdProps {
  className?: string;
  showLabel?: boolean;
}

export const NativeBannerAd: React.FC<NativeBannerAdProps> = ({ className = '', showLabel = true }) => {
  // Exact user-provided Native banner script and container
  const nativeHtml = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    html, body {
      width: 100%;
      min-height: 100%;
      background-color: transparent;
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
      padding: 6px;
      overflow-x: hidden;
    }
    #container-96450409c12a4063f2d817b760e315ff {
      width: 100%;
      min-height: 120px;
    }
  </style>
</head>
<body>
  <div id="container-96450409c12a4063f2d817b760e315ff"></div>
  <script async="async" data-cfasync="false" src="https://pl31339741.profitableratecpmnetwork.com/96450409c12a4063f2d817b760e315ff/invoke.js"></script>
</body>
</html>`;

  return (
    <div className={`w-full my-5 ${className}`}>
      {showLabel && (
        <div className="flex items-center justify-between gap-2 mb-1.5 px-1">
          <div className="flex items-center gap-2">
            <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400">
              স্পন্সরড কনটেন্ট (SPONSORED)
            </span>
            <span className="text-[10px] text-slate-400 font-mono">Native Banner</span>
          </div>
          <div className="h-px bg-slate-200 flex-1 ml-2"></div>
        </div>
      )}
      <div className="w-full rounded-2xl bg-slate-50/80 border border-slate-200/80 p-2 overflow-hidden shadow-2xs">
        <iframe
          title="Native Sponsored Advertisement"
          srcDoc={nativeHtml}
          className="w-full min-h-[160px] border-0 block"
          style={{ width: '100%', minHeight: '160px', border: 'none' }}
          scrolling="no"
        />
      </div>
    </div>
  );
};
