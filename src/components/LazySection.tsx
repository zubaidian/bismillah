import React, { Component, Suspense, useEffect, useRef, useState } from 'react';

export function lazyWithRetry<T extends React.ComponentType<any>>(
  importer: () => Promise<{ default: T }>
) {
  const loadWithRetries = async () => {
    let lastError: unknown;
    for (let attempt = 0; attempt < 3; attempt++) {
      try {
        return await importer();
      } catch (err) {
        lastError = err;
        if (attempt < 2) {
          await new Promise((resolve) => setTimeout(resolve, 350 * (attempt + 1)));
        }
      }
    }
    throw lastError;
  };

  const makeLazy = (): React.LazyExoticComponent<T> =>
    React.lazy(async () => {
      try {
        return await loadWithRetries();
      } catch (err) {
        LazyComponent = makeLazy();
        throw err;
      }
    });

  let LazyComponent = makeLazy();

  const RetryableLazy: React.FC<React.ComponentProps<T>> = (props) => {
    const Comp = LazyComponent;
    return <Comp {...props} />;
  };

  return RetryableLazy;
}

interface SectionErrorBoundaryProps {
  id: string;
  minHeight: string;
  placeholderClassName: string;
  children: React.ReactNode;
}

interface SectionErrorBoundaryState {
  hasError: boolean;
  retryKey: number;
  autoRetryCount: number;
}

class SectionErrorBoundary extends Component<
  SectionErrorBoundaryProps,
  SectionErrorBoundaryState
> {
  private retryTimer: number | null = null;

  state: SectionErrorBoundaryState = {
    hasError: false,
    retryKey: 0,
    autoRetryCount: 0,
  };

  static getDerivedStateFromError(): Partial<SectionErrorBoundaryState> {
    return { hasError: true };
  }

  componentDidCatch() {
    if (this.state.autoRetryCount < 1 && typeof window !== 'undefined') {
      this.retryTimer = window.setTimeout(() => {
        this.setState((prev) => ({
          hasError: false,
          retryKey: prev.retryKey + 1,
          autoRetryCount: prev.autoRetryCount + 1,
        }));
      }, 450);
    }
  }

  componentWillUnmount() {
    if (this.retryTimer !== null && typeof window !== 'undefined') {
      window.clearTimeout(this.retryTimer);
    }
  }

  handleManualRetry = () => {
    this.setState((prev) => ({
      hasError: false,
      retryKey: prev.retryKey + 1,
    }));
  };

  handleReloadPage = () => {
    if (typeof window !== 'undefined') {
      window.location.reload();
    }
  };

  render() {
    if (this.state.hasError) {
      if (this.state.autoRetryCount < 1) {
        return (
          <section
            id={this.props.id}
            className={`scroll-mt-20 ${this.props.minHeight} ${this.props.placeholderClassName}`}
            aria-hidden="true"
          />
        );
      }

      return (
        <section
          id={this.props.id}
          className="scroll-mt-20 py-12 px-4 bg-[#042f28] text-white border-y border-emerald-800"
        >
          <div className="max-w-xl mx-auto text-center space-y-3">
            <p className="text-sm text-amber-200 font-semibold">
              This section could not load due to a brief connection or update interruption.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3">
              <button
                type="button"
                onClick={this.handleManualRetry}
                className="px-4 py-2 rounded-lg bg-amber-400 hover:bg-amber-300 text-emerald-950 font-bold text-xs cursor-pointer"
              >
                Retry Section
              </button>
              <button
                type="button"
                onClick={this.handleReloadPage}
                className="px-4 py-2 rounded-lg bg-[#064b36] hover:bg-emerald-800 text-white border border-emerald-700 font-semibold text-xs cursor-pointer"
              >
                Refresh Page
              </button>
            </div>
          </div>
        </section>
      );
    }

    return <React.Fragment key={this.state.retryKey}>{this.props.children}</React.Fragment>;
  }
}

interface LazySectionProps {
  id: string;
  aliasIds?: string[];
  minHeight?: string;
  placeholderClassName?: string;
  children: React.ReactNode;
}

const ACTIVATE_EVENT = 'ggzc:activate-section';
let listenerRegistered = false;

function ensureGlobalHashListener() {
  if (listenerRegistered || typeof window === 'undefined') return;
  listenerRegistered = true;

  const dispatchForHash = (rawHash: string) => {
    const cleanId = rawHash.replace(/^#/, '').trim();
    if (!cleanId) return;
    window.dispatchEvent(
      new CustomEvent<{ targetId: string }>(ACTIVATE_EVENT, {
        detail: { targetId: cleanId },
      })
    );
  };

  window.addEventListener('hashchange', () => {
    dispatchForHash(window.location.hash);
  });

  document.addEventListener(
    'click',
    (event) => {
      const target = event.target as HTMLElement | null;
      const anchor = target?.closest('a[href^="#"]') as HTMLAnchorElement | null;
      if (!anchor) return;
      const href = anchor.getAttribute('href');
      if (href && href.length > 1) {
        dispatchForHash(href);
      }
    },
    true
  );
}

export function LazySection({
  id,
  aliasIds = [],
  minHeight = 'min-h-[240px]',
  placeholderClassName = '',
  children,
}: LazySectionProps) {
  const allIds = [id, ...aliasIds];
  const [shouldRender, setShouldRender] = useState<boolean>(() => {
    if (typeof window === 'undefined') return true;
    const initialHash = window.location.hash.replace(/^#/, '').trim();
    return Boolean(initialHash && allIds.includes(initialHash));
  });
  const wrapperRef = useRef<HTMLDivElement>(null);
  const pendingScrollIdRef = useRef<string | null>(
    typeof window !== 'undefined' &&
      allIds.includes(window.location.hash.replace(/^#/, '').trim())
      ? window.location.hash.replace(/^#/, '').trim()
      : null
  );

  useEffect(() => {
    ensureGlobalHashListener();
  }, []);

  useEffect(() => {
    if (shouldRender) return;

    const handleActivate = (event: Event) => {
      const custom = event as CustomEvent<{ targetId?: string }>;
      const targetId = custom.detail?.targetId;
      if (targetId && allIds.includes(targetId)) {
        pendingScrollIdRef.current = targetId;
        setShouldRender(true);
      }
    };

    window.addEventListener(ACTIVATE_EVENT, handleActivate);
    return () => window.removeEventListener(ACTIVATE_EVENT, handleActivate);
  }, [shouldRender, id, aliasIds.join(',')]);

  useEffect(() => {
    if (shouldRender) return;
    const el = wrapperRef.current;
    if (!el || typeof IntersectionObserver === 'undefined') {
      setShouldRender(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setShouldRender(true);
          observer.disconnect();
        }
      },
      { rootMargin: '700px 0px' }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [shouldRender]);

  useEffect(() => {
    if (!shouldRender || !pendingScrollIdRef.current) return;
    const targetId = pendingScrollIdRef.current;
    const wrapper = wrapperRef.current;
    if (!wrapper) return;

    const tryScroll = () => {
      const targetEl = document.getElementById(targetId);
      if (targetEl && targetEl.dataset.lazyPlaceholder !== 'true') {
        pendingScrollIdRef.current = null;
        requestAnimationFrame(() => {
          targetEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
        });
        return true;
      }
      return false;
    };

    if (tryScroll()) return;

    const mutationObserver = new MutationObserver(() => {
      if (tryScroll()) {
        mutationObserver.disconnect();
      }
    });
    mutationObserver.observe(wrapper, { childList: true, subtree: true });

    const timeout = window.setTimeout(() => {
      mutationObserver.disconnect();
      pendingScrollIdRef.current = null;
    }, 4500);

    return () => {
      mutationObserver.disconnect();
      window.clearTimeout(timeout);
    };
  }, [shouldRender]);

  if (!shouldRender) {
    return (
      <div ref={wrapperRef}>
        <section
          id={id}
          data-lazy-placeholder="true"
          className={`scroll-mt-20 ${minHeight} ${placeholderClassName}`}
          aria-hidden="true"
        >
          {aliasIds.map((alias) => (
            <span
              key={alias}
              id={alias}
              data-lazy-placeholder="true"
              className="block h-0 scroll-mt-20"
            />
          ))}
        </section>
      </div>
    );
  }

  return (
    <div ref={wrapperRef}>
      <SectionErrorBoundary
        id={id}
        minHeight={minHeight}
        placeholderClassName={placeholderClassName}
      >
        <Suspense
          fallback={
            <section
              id={id}
              data-lazy-placeholder="true"
              className={`scroll-mt-20 ${minHeight} ${placeholderClassName}`}
              aria-hidden="true"
            />
          }
        >
          {children}
        </Suspense>
      </SectionErrorBoundary>
    </div>
  );
}
