"use client";
import React, { useState, useEffect, useRef } from "react";
import { ArrowRight, Link, Zap } from "lucide-react";
import { Badge } from "./badge";
import { Button } from "./button";
import { Card, CardContent, CardHeader, CardTitle } from "./card";

export interface TimelineItem {
  id: number;
  title: string;
  date: string;
  content: string;
  category: string;
  icon: React.ElementType;
  relatedIds: number[];
  status: "completed" | "in-progress" | "pending";
  energy: number;
}

interface RadialOrbitalTimelineProps {
  timelineData: TimelineItem[];
}

export default function RadialOrbitalTimeline({
  timelineData,
}: RadialOrbitalTimelineProps) {
  const [expandedItems, setExpandedItems] = useState<Record<number, boolean>>(
    {}
  );
  const [viewMode, setViewMode] = useState<"orbital">("orbital");
  const [rotationAngle, setRotationAngle] = useState<number>(0);
  const [autoRotate, setAutoRotate] = useState<boolean>(true);
  const [pulseEffect, setPulseEffect] = useState<Record<number, boolean>>({});
  const [centerOffset, setCenterOffset] = useState<{ x: number; y: number }>({
    x: 0,
    y: 0,
  });
  const [activeNodeId, setActiveNodeId] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const orbitRef = useRef<HTMLDivElement>(null);
  const nodeRefs = useRef<Record<number, HTMLDivElement | null>>({});

  const handleContainerClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === containerRef.current || e.target === orbitRef.current) {
      setExpandedItems({});
      setActiveNodeId(null);
      setPulseEffect({});
      setAutoRotate(true);
    }
  };

  const toggleItem = (id: number) => {
    setExpandedItems((prev) => {
      const newState = { ...prev };
      Object.keys(newState).forEach((key) => {
        if (parseInt(key) !== id) {
          newState[parseInt(key)] = false;
        }
      });

      newState[id] = !prev[id];

      if (!prev[id]) {
        setActiveNodeId(id);
        setAutoRotate(false);

        const relatedItems = getRelatedItems(id);
        const newPulseEffect: Record<number, boolean> = {};
        relatedItems.forEach((relId) => {
          newPulseEffect[relId] = true;
        });
        setPulseEffect(newPulseEffect);

        centerViewOnNode(id);
      } else {
        setActiveNodeId(null);
        setAutoRotate(true);
        setPulseEffect({});
      }

      return newState;
    });
  };

  useEffect(() => {
    let rotationTimer: ReturnType<typeof setInterval>;

    if (autoRotate && viewMode === "orbital") {
      rotationTimer = setInterval(() => {
        setRotationAngle((prev) => {
          const newAngle = (prev + 0.3) % 360;
          return Number(newAngle.toFixed(3));
        });
      }, 50);
    }

    return () => {
      if (rotationTimer) {
        clearInterval(rotationTimer);
      }
    };
  }, [autoRotate, viewMode]);

  const centerViewOnNode = (nodeId: number) => {
    if (viewMode !== "orbital" || !nodeRefs.current[nodeId]) return;

    const nodeIndex = timelineData.findIndex((item) => item.id === nodeId);
    const totalNodes = timelineData.length;
    const targetAngle = (nodeIndex / totalNodes) * 360;

    setRotationAngle(270 - targetAngle);
  };

  const calculateNodePosition = (index: number, total: number) => {
    const angle = ((index / total) * 360 + rotationAngle) % 360;
    // Responsive radius: slightly smaller on mobile to fit screen
    const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
    const radius = isMobile ? 140 : 220; 
    const radian = (angle * Math.PI) / 180;

    const x = radius * Math.cos(radian) + centerOffset.x;
    const y = radius * Math.sin(radian) + centerOffset.y;

    const zIndex = Math.round(100 + 50 * Math.cos(radian));
    const opacity = Math.max(
      0.4,
      Math.min(1, 0.4 + 0.6 * ((1 + Math.sin(radian)) / 2))
    );

    return { x, y, angle, zIndex, opacity };
  };

  const getRelatedItems = (itemId: number): number[] => {
    const currentItem = timelineData.find((item) => item.id === itemId);
    return currentItem ? currentItem.relatedIds : [];
  };

  const isRelatedToActive = (itemId: number): boolean => {
    if (!activeNodeId) return false;
    const relatedItems = getRelatedItems(activeNodeId);
    return relatedItems.includes(itemId);
  };

  const getStatusStyles = (status: TimelineItem["status"]): string => {
    switch (status) {
      case "completed":
        return "text-black bg-white border-white";
      case "in-progress":
        return "text-white bg-orange-500 border-orange-500";
      case "pending":
        return "text-white bg-white/20 border-white/30";
      default:
        return "text-white bg-white/20 border-white/30";
    }
  };

  return (
    <div
      className="w-full h-full min-h-[600px] flex flex-col items-center justify-center bg-transparent overflow-hidden relative z-10"
      ref={containerRef}
      onClick={handleContainerClick}
    >
      <div className="relative w-full max-w-4xl h-full flex items-center justify-center py-20">
        <div
          className="absolute w-full h-full flex items-center justify-center"
          ref={orbitRef}
          style={{
            perspective: "1000px",
            transform: `translate(${centerOffset.x}px, ${centerOffset.y}px)`,
          }}
        >
          <div className="absolute w-16 h-16 rounded-full bg-gradient-to-br from-orange-500 via-orange-400 to-yellow-500 animate-pulse flex items-center justify-center z-10 shadow-[0_0_30px_rgba(249,115,22,0.6)]">
            <div className="absolute w-20 h-20 rounded-full border border-orange-500/20 animate-ping opacity-70"></div>
            <div
              className="absolute w-24 h-24 rounded-full border border-orange-500/10 animate-ping opacity-50"
              style={{ animationDelay: "0.5s" }}
            ></div>
            <div className="w-8 h-8 rounded-full bg-white backdrop-blur-md flex items-center justify-center">
                <span className="font-bold text-orange-500 text-xs">V</span>
            </div>
          </div>

          <div className="absolute w-72 h-72 md:w-96 md:h-96 rounded-full border border-white/5"></div>
          <div className="absolute w-[350px] h-[350px] md:w-[500px] md:h-[500px] rounded-full border border-white/5 border-dashed opacity-30"></div>

          {timelineData.map((item, index) => {
            const position = calculateNodePosition(index, timelineData.length);
            const isExpanded = expandedItems[item.id];
            const isRelated = isRelatedToActive(item.id);
            const isPulsing = pulseEffect[item.id];
            const Icon = item.icon;

            const nodeStyle = {
              transform: `translate(${position.x}px, ${position.y}px)`,
              zIndex: isExpanded ? 200 : position.zIndex,
              opacity: isExpanded ? 1 : position.opacity,
            };

            return (
              <div
                key={item.id}
                ref={(el) => (nodeRefs.current[item.id] = el)}
                className="absolute transition-all duration-700 cursor-pointer"
                style={nodeStyle}
                onClick={(e) => {
                  e.stopPropagation();
                  toggleItem(item.id);
                }}
              >
                <div
                  className={`absolute rounded-full -inset-1 ${
                    isPulsing ? "animate-pulse duration-1000" : ""
                  }`}
                  style={{
                    background: `radial-gradient(circle, rgba(249,115,22,0.2) 0%, rgba(249,115,22,0) 70%)`,
                    width: `${item.energy * 0.5 + 40}px`,
                    height: `${item.energy * 0.5 + 40}px`,
                    left: `-${(item.energy * 0.5 + 40 - 40) / 2}px`,
                    top: `-${(item.energy * 0.5 + 40 - 40) / 2}px`,
                  }}
                ></div>

                <div
                  className={`
                  w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center
                  ${
                    isExpanded
                      ? "bg-white text-black"
                      : isRelated
                      ? "bg-white/50 text-black"
                      : "bg-black text-white"
                  }
                  border-2 
                  ${
                    isExpanded
                      ? "border-orange-500 shadow-[0_0_20px_rgba(249,115,22,0.5)]"
                      : isRelated
                      ? "border-white animate-pulse"
                      : "border-white/20 hover:border-orange-500"
                  }
                  transition-all duration-300 transform
                  ${isExpanded ? "scale-125" : "hover:scale-110"}
                `}
                >
                  <Icon size={18} />
                </div>

                <div
                  className={`
                  absolute top-14 left-1/2 -translate-x-1/2 whitespace-nowrap
                  text-[10px] md:text-xs font-semibold tracking-wider font-mono uppercase
                  transition-all duration-300
                  ${isExpanded ? "text-orange-500 scale-110" : "text-white/40"}
                `}
                >
                  {item.title}
                </div>

                {isExpanded && (
                  <Card className="absolute top-20 left-1/2 -translate-x-1/2 w-[280px] md:w-80 bg-[#0a0a0a]/95 backdrop-blur-xl border-white/10 shadow-2xl shadow-black overflow-hidden z-[201]">
                    {/* Connection Line */}
                    <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-px h-6 bg-gradient-to-b from-transparent to-orange-500"></div>
                    
                    <CardHeader className="pb-3 pt-5 px-5 border-b border-white/5">
                      <div className="flex justify-between items-center mb-1">
                        <Badge
                          className={`px-2 text-[10px] uppercase tracking-widest ${getStatusStyles(
                            item.status
                          )}`}
                        >
                          {item.category}
                        </Badge>
                        <span className="text-[10px] font-mono text-white/30">
                          {item.id.toString().padStart(2, '0')}
                        </span>
                      </div>
                      <CardTitle className="text-xl md:text-2xl font-serif italic text-white">
                        {item.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="px-5 py-5 text-sm text-white/70">
                      <p className="leading-relaxed mb-4">{item.content}</p>

                      <div className="space-y-3 pt-3 border-t border-white/5">
                        
                        <div className="flex items-center justify-between">
                            <span className="text-[10px] uppercase tracking-widest text-white/40">Impact</span>
                            <div className="flex items-center gap-1">
                                <Zap size={10} className="text-orange-500 fill-orange-500" />
                                <span className="font-mono text-xs text-orange-500">{item.energy}%</span>
                            </div>
                        </div>
                        
                        <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-gradient-to-r from-orange-600 to-yellow-500"
                            style={{ width: `${item.energy}%` }}
                          ></div>
                        </div>
                      </div>

                      {item.relatedIds.length > 0 && (
                        <div className="mt-5 pt-3 border-t border-white/5">
                          <div className="flex items-center mb-3">
                            <Link size={10} className="text-white/40 mr-2" />
                            <h4 className="text-[10px] uppercase tracking-widest font-bold text-white/40">
                              Kombinierbar mit
                            </h4>
                          </div>
                          <div className="flex flex-wrap gap-2">
                            {item.relatedIds.map((relatedId) => {
                              const relatedItem = timelineData.find(
                                (i) => i.id === relatedId
                              );
                              return (
                                <Button
                                  key={relatedId}
                                  variant="outline"
                                  size="sm"
                                  className="h-6 px-2 py-0 text-[10px] font-mono rounded-full border-white/10 bg-white/5 hover:bg-orange-500 hover:text-white hover:border-orange-500 transition-all text-white/60"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    toggleItem(relatedId);
                                  }}
                                >
                                  {relatedItem?.title}
                                  <ArrowRight
                                    size={8}
                                    className="ml-1 opacity-50"
                                  />
                                </Button>
                              );
                            })}
                          </div>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}