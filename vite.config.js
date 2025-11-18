import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";


export default defineConfig({
  plugins: [react()],
  base: "/meu-sistema/", // ALTERE para o nome do repositório no GitHub
});
