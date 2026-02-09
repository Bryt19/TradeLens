import tailwindcss from "tailwindcss";
import autoprefixer from "autoprefixer";

// Filter out autoprefixer's "Gradient has outdated direction syntax" warnings
// (often triggered by Tailwind's base CSS, not our code)
function suppressGradientWarnings() {
  return {
    postcssPlugin: "suppress-gradient-warnings",
    OnceExit(_root, { result }) {
      if (result.messages) {
        result.messages = result.messages.filter(
          (msg) =>
            !(
              msg.type === "warning" &&
              msg.text &&
              msg.text.includes("Gradient has outdated direction syntax")
            )
        );
      }
    },
  };
}
suppressGradientWarnings.postcss = true;

export default {
  plugins: [tailwindcss, autoprefixer, suppressGradientWarnings],
};
