import { cva } from "class-variance-authority";
import { clsx } from "clsx";

// Définition des classes de base
const base = "mes classes de base";

const buttonVariants = cva(base, {
  variants: {
    intent: {
      primary: "inline-flex px-4 py-2 justify-center items-center gap-2.5 rounded-md bg-btnBg",
      secondary: "bg-hoverbutton text-hoverfont hover:bg-button hover:text-font",
      outline: "bg-none text-hoverfont border-button border-2",
      ghost: "bg-none text-hoverfont hover:text-font",
    },
    size: {
      verysmall: "py-1 px-2 w-28 h-8 text-sm",
      small: "py-2 px-4 w-32 h-8 text-sm",
      medium: "py-3 px-6 w-36 h-12 text-base",
      big: "py-4 px-8 w-48 h-14 text-lg",
    },
    rounde: {
      rd: "rounded-lg",
      nrd: "rounded-none",
    },
  },
  compoundVariants: [],
  defaultVariants: {
    intent: "primary",
    size: "medium",
    rounde: "rd",
  },
});

// Composant Button
export default function Button({
  className,    // Classes supplémentaires passées via props
  intent,       // Variante d'intention (primary, secondary, etc.)
  size,         // Taille (small, medium, etc.)
  rounde,       // Roundness (rd, nrd)
  children,     // Contenu enfant du bouton
  ...props      // Autres props
}) {
  // Combine les classes avec clsx et buttonVariants
  const buttonClassNames = clsx(buttonVariants({ intent, size, rounde }), className);

  console.log(buttonClassNames); // Aide pour le débogage, affiche les classes combinées

  return (
    <button
      className={buttonClassNames}  // Utilise les classes générées
      {...props}  // Passe les autres props au bouton (comme onClick, etc.)
    >
      {children}
    </button>
  );
}