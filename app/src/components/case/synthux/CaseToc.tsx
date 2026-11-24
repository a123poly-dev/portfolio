import cn from "classnames";
import { useEffect, useState } from "react";
import type { RefObject } from "react";
import { useNavigate } from "react-router-dom";

import styles from "./CaseToc.module.scss";

type TCaseTocProps = {
  // The case content; its h2 headings become the menu
  contentRef: RefObject<HTMLElement | null>;
  title: string;
  backTo: string;
  backLabel?: string;
};

type TTocItem = { id: string; label: string };

const slug = (text: string) =>
  text
    .toLowerCase()
    .replace(/[“”"’']/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

// Side menu for long cases: a back link, the case name and its section headings.
// Sticks to the left on wide screens, the current section is darker, and a click scrolls to it.
// Hidden below 1200 px, where the page keeps its single column.
export const CaseToc = ({
  contentRef,
  title,
  backTo,
  backLabel = "Back",
}: TCaseTocProps) => {
  const [items, setItems] = useState<TTocItem[]>([]);
  const [active, setActive] = useState<string | null>(null);
  const [ended, setEnded] = useState(false);
  const navigate = useNavigate();

  // Back goes to the previous page, like the browser's back button.
  // Opened directly (no history in this tab), it goes to backTo instead.
  const goBack = () => {
    const idx = (window.history.state as { idx?: number } | null)?.idx ?? 0;
    if (idx > 0) navigate(-1);
    else navigate(backTo);
  };

  // Read the headings once the case has rendered and give each one an id
  useEffect(() => {
    const root = contentRef.current;
    if (!root) return;
    const headings = Array.from(
      root.querySelectorAll<HTMLHeadingElement>("h2"),
    );
    const used = new Set<string>();
    const next = headings.map((h) => {
      const label = (h.dataset.toc ?? h.textContent ?? "").trim();
      let id = h.id || slug(h.textContent ?? label);
      while (used.has(id)) id += "-2";
      used.add(id);
      h.id = id;
      return { id, label };
    });
    setItems(next);
  }, [contentRef]);

  // Scroll spy: the current section is the last heading above 40% of the screen.
  // The menu fades out once the case content has scrolled past it.
  useEffect(() => {
    if (items.length === 0) return;
    let frame = 0;
    const update = () => {
      frame = 0;
      const line = window.innerHeight * 0.4;
      let current: string | null = null;
      for (const item of items) {
        const el = document.getElementById(item.id);
        if (el && el.getBoundingClientRect().top <= line) current = item.id;
      }
      setActive(current);
      const root = contentRef.current;
      setEnded(
        root
          ? root.getBoundingClientRect().bottom < window.innerHeight * 0.6
          : false,
      );
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(frame);
    };
  }, [items, contentRef]);

  const go = (id: string) => (event: React.MouseEvent) => {
    const el = document.getElementById(id);
    if (!el) return;
    event.preventDefault();
    el.scrollIntoView({ behavior: "smooth", block: "start" });
    history.replaceState(null, "", `#${id}`);
  };

  return (
    <nav
      className={cn(styles.toc, ended && styles.ended)}
      aria-label="On this page"
    >
      <button type="button" onClick={goBack} className={styles.back}>
        <svg viewBox="0 0 16 16" aria-hidden="true">
          <path d="M6 4 2.5 7.5 6 11M3 7.5h7a3.5 3.5 0 0 1 3.5 3.5v1" />
        </svg>
        {backLabel}
      </button>
      <p className={styles.title}>{title}</p>
      <ol className={styles.list}>
        {items.map((item) => (
          <li key={item.id}>
            <a
              href={`#${item.id}`}
              onClick={go(item.id)}
              className={cn(styles.item, active === item.id && styles.active)}
              aria-current={active === item.id ? "location" : undefined}
            >
              {item.label}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
};
