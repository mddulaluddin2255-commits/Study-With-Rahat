import React from 'react';

interface Banner728x90Props {
  className?: string;
  showLabel?: boolean;
}

export const Banner728x90: React.FC<Banner728x90Props> = ({ className = '', showLabel = true }) => {
  // Exact user-provided 728x90 ad script safely isolated in an iframe document
  const adHtml = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    html, body {
      width: 100%;
      height: 100%;
      background-color: transparent;
      display: flex;
      justify-content: center;
      align-items: center;
      overflow: hidden;
    }
  </style>
</head>
<body>
  <script type="text/javascript">
    atOptions = {
      'key' : '24b11563f636493ae3cb845b3c43892b',
      'format' : 'iframe',
      'height' : 90,
      'width' : 728,
      'params' : {}
    };
  </script>
  <script type="text/javascript" src="https://www.highrevenueformat.com/24b11563f636493ae3cb845b3c43892b/invoke.js"></script>
</body>
</html>`;

  return (
    <div className={`w-full flex flex-col items-center justify-center my-4 ${className}`}>
      {showLabel && (
        <div className="w-full max-w-[728px] flex items-center justify-between gap-2 mb-1 px-1">
          <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400">
            বিজ্ঞাপন (ADVERTISEMENT)
          </span>
          <span className="text-[10px] text-slate-400 font-mono">728×90 Banner</span>
        </div>
      )}
      <div className="w-full flex justify-center items-center overflow-x-auto rounded-xl bg-slate-50/70 border border-slate-200/80 p-1.5 min-h-[98px] shadow-2xs">
        <iframe
          title="728x90 Advertisement Banner"
          srcDoc={adHtml}
          width="728"
          height="90"
          className="max-w-none border-0 block"
          style={{ width: '728px', height: '90px', border: 'none' }}
          scrolling="no"
        />
      </div>
    </div>
  );
};
