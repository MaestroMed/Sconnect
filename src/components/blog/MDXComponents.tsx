import Link from "next/link";
import Image from "next/image";
import type { MDXRemoteProps } from "next-mdx-remote/rsc";
import { Info, AlertTriangle, CheckCircle2, Lightbulb } from "lucide-react";
import { cn } from "@/lib/utils";

type Components = MDXRemoteProps["components"];

interface CalloutProps {
  children: React.ReactNode;
  type?: "info" | "warning" | "success" | "tip";
  title?: string;
}

function Callout({ children, type = "info", title }: CalloutProps) {
  const styles = {
    info: {
      bg: "bg-primary-50 dark:bg-primary-500/10",
      border: "border-primary-200 dark:border-primary-500/30",
      text: "text-primary-900 dark:text-primary-200",
      icon: Info,
      iconColor: "text-primary-600",
    },
    warning: {
      bg: "bg-accent-50 dark:bg-accent-500/10",
      border: "border-accent-200 dark:border-accent-500/30",
      text: "text-accent-900 dark:text-accent-200",
      icon: AlertTriangle,
      iconColor: "text-accent-600",
    },
    success: {
      bg: "bg-green-50 dark:bg-green-500/10",
      border: "border-green-200 dark:border-green-500/30",
      text: "text-green-900 dark:text-green-200",
      icon: CheckCircle2,
      iconColor: "text-green-600",
    },
    tip: {
      bg: "bg-electric-50 dark:bg-electric-500/10",
      border: "border-electric-200 dark:border-electric-500/30",
      text: "text-electric-900 dark:text-electric-200",
      icon: Lightbulb,
      iconColor: "text-electric-600",
    },
  }[type];

  const Icon = styles.icon;

  return (
    <aside
      className={cn(
        "my-6 flex gap-3 rounded-2xl border-l-4 p-5",
        styles.bg,
        styles.border,
        styles.text,
      )}
    >
      <Icon className={cn("h-6 w-6 shrink-0 mt-0.5", styles.iconColor)} aria-hidden="true" />
      <div className="flex-1">
        {title && <p className="font-semibold mb-1">{title}</p>}
        <div className="text-sm leading-relaxed [&>*:first-child]:mt-0 [&>*:last-child]:mb-0">
          {children}
        </div>
      </div>
    </aside>
  );
}

const MDXComponents: Components = {
  // Heading anchors (rehype-slug adds ids)
  h2: (props) => (
    <h2
      className="scroll-mt-24 mt-12 mb-4 font-display font-bold text-2xl md:text-3xl text-foreground"
      {...props}
    />
  ),
  h3: (props) => (
    <h3
      className="scroll-mt-24 mt-10 mb-3 font-display font-bold text-xl md:text-2xl text-foreground"
      {...props}
    />
  ),
  h4: (props) => (
    <h4 className="scroll-mt-24 mt-8 mb-3 font-semibold text-lg text-foreground" {...props} />
  ),
  p: (props) => <p className="my-4 text-foreground leading-relaxed" {...props} />,
  a: ({ href, children, ...props }) => {
    const isExternal = href?.startsWith("http");
    if (isExternal) {
      return (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="text-primary-600 dark:text-primary-300 underline underline-offset-2 hover:text-primary-700"
          {...props}
        >
          {children}
        </a>
      );
    }
    return (
      <Link
        href={href ?? "#"}
        className="text-primary-600 dark:text-primary-300 underline underline-offset-2 hover:text-primary-700"
      >
        {children}
      </Link>
    );
  },
  ul: (props) => <ul className="my-4 ml-6 list-disc space-y-2 text-foreground" {...props} />,
  ol: (props) => <ol className="my-4 ml-6 list-decimal space-y-2 text-foreground" {...props} />,
  li: (props) => <li className="leading-relaxed" {...props} />,
  blockquote: (props) => (
    <blockquote
      className="my-6 border-l-4 border-primary-500 bg-surface-muted pl-4 py-2 italic text-foreground-muted"
      {...props}
    />
  ),
  hr: () => <hr className="my-10 border-t border-border" />,
  strong: (props) => <strong className="font-semibold text-foreground" {...props} />,
  em: (props) => <em className="italic" {...props} />,
  code: (props) => (
    <code
      className="rounded bg-surface-muted px-1.5 py-0.5 font-mono text-sm text-foreground border border-border"
      {...props}
    />
  ),
  pre: (props) => (
    <pre
      className="my-6 overflow-x-auto rounded-xl bg-dark-900 p-4 text-sm text-dark-100"
      {...props}
    />
  ),
  table: (props) => (
    <div className="my-6 overflow-x-auto">
      <table className="w-full border-collapse text-sm" {...props} />
    </div>
  ),
  thead: (props) => <thead className="bg-surface-muted" {...props} />,
  th: (props) => (
    <th
      className="border border-border px-4 py-2 text-left font-semibold text-foreground"
      {...props}
    />
  ),
  td: (props) => <td className="border border-border px-4 py-2 text-foreground" {...props} />,
  img: ({ src, alt, ...props }) => {
    if (!src) return null;
    return (
      <Image
        src={src as string}
        alt={alt ?? ""}
        width={1200}
        height={800}
        className="my-6 rounded-2xl shadow-lg"
        {...props}
      />
    );
  },
  // Custom components available in MDX
  Callout,
};

export default MDXComponents;
