import React, { useCallback, useState, useEffect } from "react";

export const useDraggable = () => {
  const [node, setNode] = useState(null);
  const [{ dx, dy }, setOffSet] = useState({
    dx: 180,
    dy: -15,
  });
  const [angle, setAngle] = useState(0);

  const ref = useCallback((ne) => {
    setNode(ne);
  }, []);

  const handleMouseDown = useCallback(
    (e) => {
      if (!node) {
        return;
      }
      const startPos = {
        x: e.clientX - dx,
        y: e.clientY - dy,
        angle: 0,
      };

      const width = node.getBoundingClientRect().width;
      const containerWidth = node.parentElement.getBoundingClientRect().width;
      const radius = containerWidth / 2;
      const center = radius - width / 2;

      const handleMouseMove = (e) => {
        let dx = e.clientX - startPos.x;
        let dy = e.clientY - startPos.y;

        const centerDistance = Math.sqrt(
          Math.pow(dx - center, 2) + Math.pow(dy - center, 2)
        );
        const sinValue = (dy - center) / centerDistance;
        const cosValue = (dx - center) / centerDistance;
        dx = center + radius * cosValue;
        dy = center + radius * sinValue;
        const angle =
          Math.atan2(dy - center, dx - center) + Math.PI / 2 > 0
            ? Math.atan2(dy - center, dx - center) + Math.PI / 2
            : 2 * Math.PI + Math.atan2(dy - center, dx - center) + Math.PI / 2;

        setOffSet({ dx, dy });

        setAngle(angle * (180 / Math.PI)); // change to degrees
        updateCursor();
      };

      const handleMouseUp = () => {
        document.removeEventListener("mousemove", handleMouseMove);
        document.removeEventListener("mouseup", handleMouseUp);
        resetCursor();
      };

      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
    },
    [node, dx, dy]
  );

  useEffect(() => {
    if (node) {
      node.style.transform = `translate3d(${dx}px, ${dy}px, 0)`;
    }
  }, [node, dx, dy]);

  useEffect(() => {
    if (!node) {
      return;
    }
    node.addEventListener("mousedown", handleMouseDown);

    return () => {
      node.removeEventListener("mousedown", handleMouseDown);
    };
  }, [node, dx, dy]);

  const updateCursor = () => {
    document.body.style.cursor = "move";
    document.body.style.userSelect = "none";
  };

  const resetCursor = () => {
    document.body.style.removeProperty("cursor");
    document.body.style.removeProperty("user-select");
  };

  return [ref, dx, dy, angle];
};
