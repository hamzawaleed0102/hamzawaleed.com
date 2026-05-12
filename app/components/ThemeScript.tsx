// Runs before hydration to set html.dark from localStorage — prevents theme flash.
const code = `(function(){try{var k='hw-theme';var s=localStorage.getItem(k);var d=document.documentElement;if(s==='light'){d.classList.remove('dark');}else{d.classList.add('dark');}}catch(_){document.documentElement.classList.add('dark');}})();`;

export function ThemeScript() {
  return <script dangerouslySetInnerHTML={{ __html: code }} />;
}
