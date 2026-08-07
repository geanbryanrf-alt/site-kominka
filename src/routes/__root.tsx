import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold tracking-tight text-foreground">
          This page didn't load
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Something went wrong on our end. You can try refreshing or head back home.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Try again
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent"
          >
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Kominka Dojo | Karate Goju-Ryu de Okinawa em Vitória" },
      {
        name: "description",
        content:
          "Kominka Dojo, Honbu Dojo da IOGKF Brasil em Pontal de Camburi, Vitória/ES. Karate Goju-Ryu tradicional para crianças e adultos, meditação zazen, Shiatsu e aula experimental gratuita.",
      },
      { name: "author", content: "Kominka Dojo" },
      { name: "theme-color", content: "#173B35" },
      { property: "og:title", content: "Kominka Dojo | Karate Goju-Ryu de Okinawa em Vitória" },
      {
        property: "og:description",
        content:
          "Honbu Dojo da IOGKF Brasil. Karate Goju-Ryu tradicional para crianças e adultos, meditação zazen e Shiatsu em Pontal de Camburi, Vitória/ES.",
      },
      { property: "og:type", content: "website" },
      { property: "og:locale", content: "pt_BR" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Kominka Dojo | Karate Goju-Ryu de Okinawa em Vitória" },
      {
        name: "twitter:description",
        content:
          "Honbu Dojo da IOGKF Brasil. Karate Goju-Ryu tradicional para crianças e adultos, meditação zazen e Shiatsu em Pontal de Camburi, Vitória/ES.",
      },
      {
        property: "og:image",
        content:
          "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/5cdcdefb-a643-47f1-8ddc-28aea9de9316/id-preview-89c1ee28--eed9e86d-bb7b-4c22-b009-4f51a891bb11.lovable.app-1783444442757.png",
      },
      {
        name: "twitter:image",
        content:
          "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/5cdcdefb-a643-47f1-8ddc-28aea9de9316/id-preview-89c1ee28--eed9e86d-bb7b-4c22-b009-4f51a891bb11.lovable.app-1783444442757.png",
      },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "icon", href: "/favicon.ico", type: "image/x-icon" },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;500;600;700&family=Inter:wght@300;400;500;600;700&display=swap",
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="pt-BR">
      <head>
        <HeadContent />
        {/*
         * As animações de entrada partem de um estado escondido (texto
         * transparente, foto atrás da cortina) e só são liberadas por
         * JavaScript. Sem ele, metade da página ficaria invisível — então
         * neutralizamos o estado inicial e a página nasce montada.
         */}
        <noscript>
          <style>{`
            .reveal { opacity: 1 !important; transform: none !important; }
            .title-reveal { clip-path: none !important; transform: none !important; }
            .media-reveal::after { display: none !important; }
            .media-shot { transform: none !important; filter: none !important; }
          `}</style>
        </noscript>
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  return (
    <QueryClientProvider client={queryClient}>
      {/* Required: nested routes render here. Removing <Outlet /> breaks all child routes. */}
      <Outlet />
    </QueryClientProvider>
  );
}
