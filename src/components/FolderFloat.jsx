import React, { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import Matter from 'matter-js';
import './FolderFloat.css';

const { Bodies, Body, Composite, Engine } = Matter;

const DEFAULT_ITEMS = [
  { label: 'Player Management', shortLabel: 'Player Management', value: 'player-management' },
  { label: 'Graphics (Thumbnails / Posters / Stream Assets)', shortLabel: 'Graphics & Stream Assets', value: 'graphics' },
  { label: '2D Illustration', shortLabel: '2D Illustration', value: '2d-illustration' },
  { label: 'Video Editing (Long Form / Short Form)', shortLabel: 'Video Editing', value: 'video-editing' },
  { label: 'Social Media Management', shortLabel: 'Social Media Management', value: 'social-media-management' }
];

const PAD = 28;
const CHAR = 6.8;
const DRAG_MIN = 4;
const ZONE_PAD = 16;

const jitter = (i) => {
  const x = Math.sin(i * 12.9898 + 4.1414) * 43758.5453;
  return x - Math.floor(x);
};

/**
 * Calculates non-overlapping, well-spaced positions for items
 * with generous horizontal and vertical clearance.
 */
const layout = (list, spread, lift, tilt, sizes, compact = false) => {
  // Dedicated layout for the 5 studio services: generous gaps, non-overlapping and spacious
  if (list.length === 5) {
    if (compact) {
      // Compact side mode: all pills stay to the left and center so the right side is completely clear for the info card
      return [
        // 0: 'Player management' (Left lower)
        { x: -115, y: -lift - 65, r: -2.5 },
        // 1: 'Graphics (thumbnail/poster/streaming assets)' (Center mid tier)
        { x: -25,  y: -lift - 145, r: 0.5 },
        // 2: '2D illustration' (Right-inward, well inside folder boundary)
        { x: 35,   y: -lift - 75, r: 2 },
        // 3: 'Video editing (long form/short form)' (Left upper tier)
        { x: -105, y: -lift - 235, r: -2 },
        // 4: 'Social media management' (Center-right upper tier)
        { x: 25,   y: -lift - 225, r: 1.5 }
      ];
    }

    const isMobile = spread < 240;
    if (isMobile) {
      return [
        // 0: 'Player management'
        { x: -30, y: -lift - 45, r: -1.5 },
        // 1: 'Graphics & Stream Assets'
        { x: 0,   y: -lift - 115, r: 0 },
        // 2: '2D illustration'
        { x: 30,  y: -lift - 75, r: 1.5 },
        // 3: 'Video editing'
        { x: -25, y: -lift - 170, r: -1 },
        // 4: 'Social media management'
        { x: 25,  y: -lift - 225, r: 1 }
      ];
    }

    // Desktop/Tablet arched scatter: generous visible gap between every single service pill and high clearance above folder
    const spreadFactor = Math.min(1.15, Math.max(0.45, spread / 420));
    return [
      // 0: 'Player management' (Flanking left)
      { x: -Math.round(330 * spreadFactor), y: -lift - 70, r: -3.5 },
      // 1: 'Graphics (thumbnail/poster/streaming assets)' (Center mid tier)
      { x: 0,                               y: -lift - 180, r: 0 },
      // 2: '2D illustration' (Flanking right)
      { x: Math.round(320 * spreadFactor),  y: -lift - 70, r: 3.5 },
      // 3: 'Video editing (long form/short form)' (Upper tier, left)
      { x: -Math.round(250 * spreadFactor), y: -lift - 290, r: -2.5 },
      // 4: 'Social media management' (Upper tier, right)
      { x: Math.round(240 * spreadFactor),  y: -lift - 285, r: 2.5 }
    ];
  }

  // Fallback for arbitrary item lists
  const rows = [];
  let row = [];
  let width = 0;
  list.forEach((item, i) => {
    const pw = sizes[i]?.w ?? PAD + item.label.length * CHAR;
    if (row.length >= 2 || (row.length && width + 32 + pw > spread * 1.5)) {
      rows.push({ items: row, width });
      row = [];
      width = 0;
    }
    row.push({ i, pw });
    width += (row.length > 1 ? 32 : 0) + pw;
  });
  if (row.length) rows.push({ items: row, width });
  const pos = [];
  rows.forEach((r, ri) => {
    let x = -r.width / 2;
    const shift = (ri % 2 ? 1 : -1) * Math.min(20, spread * 0.08);
    r.items.forEach(({ i, pw }) => {
      const j = jitter(i);
      pos[i] = {
        x: x + pw / 2 + shift + (j - 0.5) * 4,
        y: -lift - ri * 70 - (j - 0.5) * 4,
        r: Math.min(tilt, 3) * (j * 2 - 1)
      };
      x += pw + 32;
    });
  });
  return pos;
};

export default function FolderFloat({
  items = DEFAULT_ITEMS,
  label = 'OUR SERVICES',
  sublabel = '5 disciplines',
  trigger = 'click',
  open: controlledOpen,
  defaultOpen = false,
  closeOnSelect = false,
  physics = true,
  drift = 0.4,
  onSelect,
  onOpenChange,
  folderColor = '#35064A',
  frontColor = '#68118A',
  paperColor = '#FFFFFF',
  itemColor = '#FFFFFF',
  itemTextColor = '#050505',
  labelColor = '#FFFFFF',
  width = 340,
  height = 225,
  radius = 20,
  spread = 420,
  lift = 26,
  tilt = 4,
  flapAngle = 38,
  restAngle = 0,
  openDuration = 520,
  stagger = 45,
  bounce = 0.3,
  className = '',
  activeValue = null,
  compact = false
}) {
  const [internalOpen, setInternalOpen] = useState(defaultOpen);
  const isControlled = controlledOpen !== undefined;
  const open = isControlled ? controlledOpen : internalOpen;

  const [popped, setPopped] = useState(-1);
  const [live, setLive] = useState(false);
  const [sizes, setSizes] = useState([]);
  const [dynamicSpread, setDynamicSpread] = useState(spread);

  const containerRef = useRef(null);
  const anchorRef = useRef(null);
  const pillRefs = useRef([]);
  const world = useRef({
    engine: null,
    bodies: [],
    sizes: [],
    raf: 0,
    last: 0,
    t0: 0,
    drag: null,
    zone: null,
    live: false
  });
  const latest = useRef({});
  latest.current = { onSelect, onOpenChange, drift, reduce: false };
  const popTimer = useRef(undefined);
  const liveTimer = useRef(undefined);

  // Responsive spread adjustments
  useEffect(() => {
    const handleResize = () => {
      if (typeof window === 'undefined') return;
      if (window.innerWidth < 640) {
        setDynamicSpread(Math.min(130, Math.floor(window.innerWidth / 2 - 30)));
      } else if (window.innerWidth < 1024) {
        setDynamicSpread(Math.min(300, Math.floor(window.innerWidth / 2 - 32)));
      } else {
        setDynamicSpread(spread);
      }
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [spread]);

  const list = items.map((item) =>
    typeof item === 'string' ? { label: item, value: item } : item
  );
  const n = list.length;
  const sub = sublabel || `${n} ${n === 1 ? 'discipline' : 'disciplines'}`;
  const pos = layout(list, dynamicSpread, lift, tilt, sizes, compact);

  const labelsKey = list.map((item) => item.label).join('|');
  useLayoutEffect(() => {
    const measure = () => {
      const next = pillRefs.current
        .slice(0, n)
        .map((el) => (el ? { w: el.offsetWidth, h: el.offsetHeight } : null));
      if (next.some((s) => !s)) return;
      setSizes((prev) =>
        prev.length === next.length &&
        prev.every((s, i) => s.w === next[i].w && s.h === next[i].h)
          ? prev
          : next
      );
    };
    measure();
    document.fonts?.ready?.then?.(measure);
  }, [n, labelsKey]);

  const stopPhysics = useCallback(() => {
    const w = world.current;
    clearTimeout(liveTimer.current);
    cancelAnimationFrame(w.raf);
    w.raf = 0;
    if (w.engine) {
      w.bodies.forEach((b, i) => {
        const el = pillRefs.current[i];
        if (!el) return;
        el.style.setProperty('--x', `${b.position.x.toFixed(1)}px`);
        el.style.setProperty(
          '--y',
          `${(b.position.y - w.sizes[i].h / 2).toFixed(1)}px`
        );
      });
      Composite.clear(w.engine.world, false, true);
      Engine.clear(w.engine);
      w.engine = null;
    }
    w.bodies = [];
    w.drag = null;
    w.live = false;
    setLive(false);
  }, []);

  const startPhysics = useCallback(() => {
    const w = world.current;
    if (w.engine) return;
    const els = pillRefs.current.slice(0, n);
    if (els.some((el) => !el)) return;
    const engine = Engine.create({ gravity: { x: 0, y: 0 } });
    engine.enableSleeping = false;
    w.engine = engine;
    w.sizes = els.map((el) => ({ w: el.offsetWidth, h: el.offsetHeight }));
    const ys = pos.map((p) => p.y);
    const zone = {
      left: -dynamicSpread - ZONE_PAD - 90,
      right: dynamicSpread + ZONE_PAD + 90,
      top: Math.min(...ys) - ZONE_PAD - 30,
      bottom: -lift + 30
    };
    w.zone = zone;
    w.bodies = els.map((el, i) => {
      const { w: bw, h: bh } = w.sizes[i];
      const b = Bodies.rectangle(pos[i].x, pos[i].y + bh / 2, bw, bh, {
        chamfer: { radius: Math.min(bh / 2 - 1, 16) },
        restitution: 0.35,
        friction: 0.1,
        frictionAir: 0.12,
        inertia: Infinity
      });
      b.plugin = { phase: jitter(i) * Math.PI * 2 };
      return b;
    });
    const T = 80;
    const walls = [
      Bodies.rectangle(
        (zone.left + zone.right) / 2,
        zone.top - T / 2,
        zone.right - zone.left + 2 * T,
        T,
        { isStatic: true }
      ),
      Bodies.rectangle(
        (zone.left + zone.right) / 2,
        zone.bottom + T / 2,
        zone.right - zone.left + 2 * T,
        T,
        { isStatic: true }
      ),
      Bodies.rectangle(
        zone.left - T / 2,
        (zone.top + zone.bottom) / 2,
        T,
        zone.bottom - zone.top + 2 * T,
        { isStatic: true }
      ),
      Bodies.rectangle(
        zone.right + T / 2,
        (zone.top + zone.bottom) / 2,
        T,
        zone.bottom - zone.top + 2 * T,
        { isStatic: true }
      )
    ];
    Composite.add(engine.world, [...w.bodies, ...walls]);
    w.live = true;
    w.last = 0;
    w.t0 = performance.now();
    setLive(true);
    const tick = (now) => {
      const s = world.current;
      if (!s.engine) return;
      const dt = s.last ? Math.min(32, now - s.last) : 16;
      s.last = now;
      const t = (now - s.t0) / 1000;
      const k = latest.current.drift * 0.00003 * Math.min(1, t / 2);
      s.bodies.forEach((b, i) => {
        if (s.drag && s.drag.i === i) return;
        const ph = b.plugin.phase;
        Body.applyForce(b, b.position, {
          x: Math.sin(t * 0.9 + ph) * k * b.mass,
          y: Math.cos(t * 1.3 + ph * 1.7) * k * b.mass
        });
      });
      Engine.update(s.engine, dt);
      s.bodies.forEach((b, i) => {
        const el = pillRefs.current[i];
        if (!el) return;
        el.style.setProperty('--x', `${b.position.x.toFixed(1)}px`);
        el.style.setProperty(
          '--y',
          `${(b.position.y - s.sizes[i].h / 2).toFixed(1)}px`
        );
      });
      s.raf = requestAnimationFrame(tick);
    };
    w.raf = requestAnimationFrame(tick);
  }, [n, dynamicSpread, lift, pos]);

  const set = useCallback(
    (next) => {
      if (!next) stopPhysics();
      if (!isControlled) {
        setInternalOpen(next);
      }
      latest.current.onOpenChange?.(next);
    },
    [isControlled, stopPhysics]
  );

  // Stop physics if controlled open becomes false
  useEffect(() => {
    if (isControlled && !controlledOpen) {
      stopPhysics();
    }
  }, [isControlled, controlledOpen, stopPhysics]);

  // Click outside folder to close
  useEffect(() => {
    if (!open) return;
    const handlePointerDown = (e) => {
      if (containerRef.current && containerRef.current.contains(e.target)) {
        return;
      }
      set(false);
    };

    const timer = setTimeout(() => {
      window.addEventListener('pointerdown', handlePointerDown);
    }, 60);

    return () => {
      clearTimeout(timer);
      window.removeEventListener('pointerdown', handlePointerDown);
    };
  }, [open, set]);

  // Escape key to close
  useEffect(() => {
    if (!open) return;
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        set(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [open, set]);

  useEffect(() => {
    clearTimeout(liveTimer.current);
    // Disable physics RAF loop on touch devices / mobile screens to ensure silky 60fps scrolling
    const isMobileDevice = typeof window !== 'undefined' && (window.innerWidth < 768 || 'ontouchstart' in window);
    if (!open || !physics || latest.current.reduce || isMobileDevice) {
      if (!open) stopPhysics();
      else if (!physics || isMobileDevice) stopPhysics();
      return undefined;
    }
    liveTimer.current = setTimeout(
      startPhysics,
      openDuration + (n - 1) * stagger + 80
    );
    return () => clearTimeout(liveTimer.current);
  }, [open, physics, openDuration, stagger, n, startPhysics, stopPhysics]);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const sync = () => {
      latest.current.reduce = mq.matches;
    };
    sync();
    mq.addEventListener('change', sync);
    return () => mq.removeEventListener('change', sync);
  }, []);

  useEffect(
    () => () => {
      clearTimeout(popTimer.current);
      stopPhysics();
    },
    [stopPhysics]
  );

  const lastPickTime = useRef(0);
  const pick = (item, i) => {
    const now = Date.now();
    if (now - lastPickTime.current < 150) return;
    lastPickTime.current = now;
    latest.current.onSelect?.(item.value, i);
    clearTimeout(popTimer.current);
    setPopped(i);
    popTimer.current = setTimeout(() => setPopped(-1), 320);
    if (closeOnSelect) set(false);
  };

  const pointerAt = (e) => {
    const r = anchorRef.current?.getBoundingClientRect();
    return r ? { x: e.clientX - r.left, y: e.clientY - r.top } : { x: 0, y: 0 };
  };

  const down = (e, i) => {
    const w = world.current;
    if (!w.live || e.button !== 0) return;
    // On touch devices don't capture pointer to avoid interfering with mobile touch scroll
    if (e.pointerType === 'touch') return;
    const b = w.bodies[i];
    if (!b) return;
    const p = pointerAt(e);
    w.drag = {
      i,
      id: e.pointerId,
      dx: b.position.x - p.x,
      dy: b.position.y - p.y,
      sx: e.clientX,
      sy: e.clientY,
      moved: false
    };
    try {
      e.currentTarget.setPointerCapture(e.pointerId);
    } catch {}
  };

  const move = (e, i) => {
    const w = world.current;
    const d = w.drag;
    if (!d || d.i !== i || d.id !== e.pointerId) return;
    if (!d.moved && Math.hypot(e.clientX - d.sx, e.clientY - d.sy) >= DRAG_MIN) {
      d.moved = true;
      e.currentTarget.setAttribute('data-drag', '');
    }
    if (!d.moved) return;
    const b = w.bodies[i];
    const { w: bw, h: bh } = w.sizes[i];
    const z = w.zone;
    const p = pointerAt(e);
    const x = Math.min(
      z.right - bw / 2,
      Math.max(z.left + bw / 2, p.x + d.dx)
    );
    const y = Math.min(
      z.bottom - bh / 2,
      Math.max(z.top + bh / 2, p.y + d.dy)
    );
    Body.setVelocity(b, {
      x: (x - b.position.x) * 0.6,
      y: (y - b.position.y) * 0.6
    });
    Body.setPosition(b, { x, y });
  };

  const up = (e, i, item) => {
    const w = world.current;
    const d = w.drag;
    if (!d || d.i !== i) return;
    const wasMoved = d.moved;
    w.drag = null;
    e.currentTarget.removeAttribute('data-drag');
    try {
      e.currentTarget.releasePointerCapture(e.pointerId);
    } catch {}
    if (!wasMoved && (e.type === 'pointerup' || e.type === 'click')) pick(item, i);
  };

  const hover = trigger === 'hover';

  return (
    <div
      ref={containerRef}
      className={`folder-float${className ? ` ${className}` : ''}`}
      data-open={open ? '' : undefined}
      data-live={live ? '' : undefined}
      data-physics={physics ? '' : undefined}
      data-trigger={trigger}
      onPointerEnter={hover ? () => set(true) : undefined}
      onPointerLeave={
        hover
          ? () => {
              if (!world.current.drag) set(false);
            }
          : undefined
      }
      onKeyDown={(e) => {
        if (e.key === 'Escape' && open) {
          e.stopPropagation();
          set(false);
        }
      }}
      style={{
        '--ff-w': `${width}px`,
        '--ff-h': `${height}px`,
        '--ff-r': `${radius}px`,
        '--ff-back': folderColor,
        '--ff-front': frontColor,
        '--ff-paper': paperColor,
        '--ff-item': itemColor,
        '--ff-item-ink': itemTextColor,
        '--ff-label': labelColor,
        '--ff-spread': `${dynamicSpread}px`,
        '--ff-lift': `${lift}px`,
        '--ff-angle': `${flapAngle}deg`,
        '--ff-rest': `${restAngle}deg`,
        '--ff-open': `${openDuration}ms`,
        '--ff-close': `${Math.round(openDuration * 0.6)}ms`,
        '--ff-stagger': `${stagger}ms`,
        '--ff-n': n,
        '--ff-spring': `cubic-bezier(0.34, ${(1 + bounce * 1.9).toFixed(2)}, 0.64, 1)`
      }}
    >
      <div ref={anchorRef} className="folder-float__items">
        {list.map((item, i) => {
          const p = pos[i] || { x: 0, y: 0, r: 0 };
          return (
            <button
              key={`${item.value}-${i}`}
              ref={(el) => {
                pillRefs.current[i] = el;
              }}
              type="button"
              className="folder-float__item"
              data-index={i}
              tabIndex={open ? 0 : -1}
              aria-hidden={!open}
              data-pop={popped === i ? '' : undefined}
              data-active={activeValue && (activeValue === item.value || activeValue === item.id || activeValue === item.label) ? '' : undefined}
              style={{
                '--i': i,
                '--x': `${p.x.toFixed(1)}px`,
                '--y': `${p.y.toFixed(1)}px`,
                '--r': `${p.r.toFixed(2)}deg`
              }}
              onPointerDown={(e) => down(e, i)}
              onPointerMove={(e) => move(e, i)}
              onPointerUp={(e) => up(e, i, item)}
              onPointerCancel={(e) => up(e, i, item)}
              onClick={() => {
                const d = world.current?.drag;
                if (!d || !d.moved) pick(item, i);
              }}
            >
              <span className="folder-float__drift">
                <span className="sm:hidden">{item.shortLabel || item.label}</span>
                <span className="hidden sm:inline">{item.label}</span>
              </span>
            </button>
          );
        })}
      </div>
      <div className="folder-float__folder">
        <span className="folder-float__back" aria-hidden="true" />
        <span className="folder-float__paper" aria-hidden="true" />
        <span className="folder-float__front" aria-hidden="true">
          <span className="folder-float__label">{label}</span>
          <span className="folder-float__sub">{sub}</span>
        </span>
        <button
          type="button"
          className="folder-float__trigger"
          aria-expanded={open}
          aria-label={open ? 'Close services folder' : `${label}, ${sub}`}
          title={open ? 'Click to close folder' : 'Click to view services'}
          onClick={() => set(!open)}
        />
      </div>
    </div>
  );
}
