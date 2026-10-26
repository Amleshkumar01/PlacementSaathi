// Company logos (trimmed, transparent copies made by scripts/make-logos.ps1 from the originals in src/image/).
// Kept separate from companies.ts so the proxy (middleware) never bundles images.
// Logos are trademarks of their respective owners; PlacementSaathi is not affiliated with them.
import type { StaticImageData } from "next/image";
import tcs from "@/image/logos/tcs.png";
import infosys from "@/image/logos/infosys.png";
import wipro from "@/image/logos/wipro.png";
import accenture from "@/image/logos/accenture.png";
import capgemini from "@/image/logos/capgemini.png";
import amazon from "@/image/logos/amazon.png";

export const companyLogos: Record<string, StaticImageData> = {
  tcs,
  infosys,
  wipro,
  accenture,
  capgemini,
  amazon,
};
