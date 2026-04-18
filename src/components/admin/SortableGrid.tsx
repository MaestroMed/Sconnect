"use client";

import {
  DndContext,
  PointerSensor,
  KeyboardSensor,
  closestCenter,
  useSensor,
  useSensors,
  type DragEndEvent,
  type UniqueIdentifier,
} from "@dnd-kit/core";
import {
  SortableContext,
  rectSortingStrategy,
  arrayMove,
  sortableKeyboardCoordinates,
  useSortable,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { GripVertical } from "lucide-react";
import { cn } from "@/lib/utils";

interface Item {
  id: string;
}

interface SortableGridProps<T extends Item> {
  items: T[];
  onReorder: (items: T[]) => void;
  renderItem: (item: T) => React.ReactNode;
  className?: string;
  gridClassName?: string;
}

export function SortableGrid<T extends Item>({
  items,
  onReorder,
  renderItem,
  className,
  gridClassName = "grid sm:grid-cols-2 lg:grid-cols-3 gap-6",
}: SortableGridProps<T>) {
  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 6 } }),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates }),
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;
    const oldIndex = items.findIndex((i) => i.id === active.id);
    const newIndex = items.findIndex((i) => i.id === over.id);
    if (oldIndex < 0 || newIndex < 0) return;
    onReorder(arrayMove(items, oldIndex, newIndex));
  };

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
    >
      <SortableContext items={items.map((i) => i.id as UniqueIdentifier)} strategy={rectSortingStrategy}>
        <div className={cn(gridClassName, className)}>
          {items.map((item) => (
            <SortableCard key={item.id} id={item.id}>
              {renderItem(item)}
            </SortableCard>
          ))}
        </div>
      </SortableContext>
    </DndContext>
  );
}

interface SortableCardProps {
  id: string;
  children: React.ReactNode;
}

function SortableCard({ id, children }: SortableCardProps) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } =
    useSortable({ id });

  const style: React.CSSProperties = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
    zIndex: isDragging ? 10 : undefined,
  };

  return (
    <div ref={setNodeRef} style={style} className="relative group">
      <button
        type="button"
        {...attributes}
        {...listeners}
        aria-label="Réordonner"
        className="absolute top-2 left-2 z-20 p-1.5 rounded-md bg-surface-elevated/90 backdrop-blur border border-border shadow-sm opacity-0 group-hover:opacity-100 focus-visible:opacity-100 transition-opacity cursor-grab active:cursor-grabbing focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
      >
        <GripVertical className="h-4 w-4 text-foreground-muted" />
      </button>
      {children}
    </div>
  );
}
