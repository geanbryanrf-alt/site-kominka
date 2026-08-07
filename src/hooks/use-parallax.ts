import { useEffect, useRef } from "react";

/**
 * Desloca o elemento no eixo Y conforme ele atravessa o viewport, criando
 * profundidade entre o quadro e a imagem dentro dele.
 *
 * O deslocamento vai de +strength (elemento entrando por baixo) a -strength
 * (saindo por cima), passando por zero quando ele está centralizado — assim o
 * enquadramento que o visitante vê parado é sempre o enquadramento original.
 *
 * Escreve direto no style em vez de passar por estado do React: são dezenas de
 * atualizações por segundo e nenhuma delas precisa de re-render.
 */
export function useParallax<T extends HTMLElement = HTMLDivElement>(strength = 26) {
  const ref = useRef<T | null>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) return;

    let frame = 0;
    let onScreen = false;

    const apply = () => {
      frame = 0;
      const rect = node.getBoundingClientRect();
      const viewport = window.innerHeight || 1;
      // -1 (abaixo da dobra) → 0 (centralizado) → 1 (acima da dobra)
      const span = (viewport + rect.height) / 2;
      const progress = (viewport / 2 - (rect.top + rect.height / 2)) / span;
      node.style.transform = `translate3d(0, ${(progress * strength).toFixed(2)}px, 0)`;
    };

    const schedule = () => {
      if (!frame && onScreen) frame = requestAnimationFrame(apply);
    };

    // Só recalcula enquanto o elemento está por perto da área visível.
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          onScreen = entry.isIntersecting;
          if (onScreen) schedule();
        }
      },
      { rootMargin: "120px 0px" },
    );

    observer.observe(node);
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    apply();

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [strength]);

  return ref;
}
