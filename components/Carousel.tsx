"use client";

import { useRef, useState, type ReactNode } from "react";

export function Carousel({ children }: { children: ReactNode }) {
  const trackRef = useRef<HTMLDivElement>(null);
  const dragState = useRef({ isDown: false, startX: 0, scrollLeft: 0, moved: false });
  const [dragging, setDragging] = useState(false);

  const onPointerDown = (e: React.PointerEvent) => {
    const track = trackRef.current;
    if (!track) return;
    dragState.current = {
      isDown: true,
      startX: e.clientX,
      scrollLeft: track.scrollLeft,
      moved: false,
    };
    setDragging(true);
  };

  const onPointerMove = (e: React.PointerEvent) => {
    const track = trackRef.current;
    if (!track || !dragState.current.isDown) return;
    const dx = e.clientX - dragState.current.startX;
    if (Math.abs(dx) > 3) dragState.current.moved = true;
    track.scrollLeft = dragState.current.scrollLeft - dx;
  };

  const endDrag = () => {
    dragState.current.isDown = false;
    setDragging(false);
  };

  const onClickCapture = (e: React.MouseEvent) => {
    if (dragState.current.moved) {
      e.preventDefault();
      e.stopPropagation();
    }
  };

  return (
    <div
      ref={trackRef}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={endDrag}
      onPointerLeave={endDrag}
      onClickCapture={onClickCapture}
      className={`flex snap-x snap-mandatory gap-6 overflow-x-auto pb-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden ${
        dragging ? "cursor-grabbing select-none" : "cursor-grab"
      }`}
    >
      {children}
    </div>
  );
}
