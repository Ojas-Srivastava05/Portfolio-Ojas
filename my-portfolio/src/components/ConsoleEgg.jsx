/**
 * ConsoleEgg — prints styled branding in DevTools console.
 * Fires once on mount. Rewards curious developers who inspect the page.
 */
import { useEffect } from "react";

export default function ConsoleEgg() {
  useEffect(() => {
    const emerald = "color:#34d399;font-weight:bold;";
    const white = "color:#f4f5f7;font-weight:normal;";
    const gold = "color:#fbbf24;font-weight:bold;";
    const muted = "color:#6b7280;font-size:10px;";
    const reset = "color:inherit;";

    const ascii = `
%c  ___        _        _        ___  
 / _ \\      | |      /_\\      / __| 
| | | |  _  | |     / _ \\     \\__ \\ 
| |_| | | |_| |    / ___ \\    ___) |
 \\___/   \\___/    /_/   \\_\\  |____/ 
`;

    console.log(ascii, emerald);

    console.log(
      "%cHey, you found the console 👀\n%cI'm Ojas Srivastava — AI Engineer & Full-Stack Developer.\n%cIf you're reading this, we'd probably get along.\n\n%c→ Email   %csrivastavaojas454@gmail.com\n%c→ GitHub  %cgithub.com/Ojas-Srivastava05\n%c→ Resume  %c/Ojas-Srivastava-Resume.pdf\n\n%cBuilt with React · Vite · Tailwind · Framer Motion",
      gold,
      white,
      white,
      emerald, white,
      emerald, white,
      emerald, white,
      muted,
    );

    console.log(
      "%c⌘K  %cOpen command palette\n%c?    %cShortcut reference\n%cJ/K  %cJump sections",
      emerald, reset,
      emerald, reset,
      emerald, reset,
    );
  }, []);

  return null;
}
