import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Calendar } from "lucide-react";
import { format, addDays, startOfWeek, addWeeks, isBefore, startOfDay } from "date-fns";
import { fr } from "date-fns/locale";

interface TimeSlot {
  label: string;
  value: string;
}

const SLOTS_BY_DAY: Record<number, TimeSlot[]> = {
  1: [ // Lundi
    { label: "9h-12h", value: "9h-12h" },
    { label: "14h-18h", value: "14h-18h" },
  ],
  2: [ // Mardi
    { label: "9h-12h", value: "9h-12h" },
    { label: "14h-18h", value: "14h-18h" },
  ],
  3: [ // Mercredi
    { label: "9h-12h", value: "9h-12h" },
    { label: "14h-18h", value: "14h-18h" },
  ],
  4: [ // Jeudi
    { label: "9h-12h", value: "9h-12h" },
    { label: "14h-18h", value: "14h-18h" },
  ],
  5: [ // Vendredi
    { label: "9h-12h", value: "9h-12h" },
    { label: "14h30-18h30", value: "14h30-18h30" },
  ],
  6: [ // Samedi
    { label: "9h-12h", value: "9h-12h" },
    { label: "14h-17h", value: "14h-17h" },
  ],
  0: [ // Dimanche
    { label: "10h-15h", value: "10h-15h" },
  ],
};

const TOTAL_WEEKS = 9; // ~2 mois

interface DateSlotPickerProps {
  selectedSlot: string;
  onSelectSlot: (slot: string) => void;
  maxPerSlot?: number;
  getReservationCount?: (slot: string) => number;
}

const DateSlotPicker = ({
  selectedSlot,
  onSelectSlot,
  maxPerSlot,
  getReservationCount,
}: DateSlotPickerProps) => {
  const [weekOffset, setWeekOffset] = useState(0);
  const today = useMemo(() => startOfDay(new Date()), []);

  const weekStart = useMemo(
    () => addWeeks(startOfWeek(today, { weekStartsOn: 1 }), weekOffset),
    [today, weekOffset]
  );

  const days = useMemo(() => {
    return Array.from({ length: 7 }, (_, i) => addDays(weekStart, i));
  }, [weekStart]);

  const weekLabel = useMemo(() => {
    const start = days[0];
    const end = days[6];
    return `${format(start, "d MMM", { locale: fr })} — ${format(end, "d MMM yyyy", { locale: fr })}`;
  }, [days]);

  return (
    <div className="space-y-4">
      {/* Week navigation */}
      <div className="flex items-center justify-between bg-muted/50 rounded-lg p-3">
        <button
          onClick={() => setWeekOffset((o) => Math.max(0, o - 1))}
          disabled={weekOffset === 0}
          className="p-2 rounded-md hover:bg-muted disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <div className="text-center">
          <div className="flex items-center justify-center gap-2 text-sm font-semibold text-foreground">
            <Calendar className="w-4 h-4 text-primary" />
            <span className="capitalize">{weekLabel}</span>
          </div>
          <p className="text-xs text-muted-foreground mt-0.5">
            Semaine {weekOffset + 1} / {TOTAL_WEEKS}
          </p>
        </div>
        <button
          onClick={() => setWeekOffset((o) => Math.min(TOTAL_WEEKS - 1, o + 1))}
          disabled={weekOffset >= TOTAL_WEEKS - 1}
          className="p-2 rounded-md hover:bg-muted disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>

      {/* Days & slots */}
      <div className="space-y-2">
        {days.map((day) => {
          const dayOfWeek = day.getDay();
          const slots = SLOTS_BY_DAY[dayOfWeek] || [];
          const isPast = isBefore(day, today);
          const dayLabel = format(day, "EEEE d MMMM", { locale: fr });

          if (isPast) {
            return (
              <div key={day.toISOString()} className="opacity-40 pointer-events-none">
                <div className="text-xs font-medium text-muted-foreground capitalize mb-1 pl-1">
                  {dayLabel}
                </div>
                <div className="flex gap-2">
                  {slots.map((slot) => (
                    <div
                      key={slot.value}
                      className="flex-1 px-3 py-2 rounded-md text-xs border bg-muted/30 border-border text-muted-foreground/50 line-through text-center"
                    >
                      {slot.label}
                    </div>
                  ))}
                </div>
              </div>
            );
          }

          return (
            <div key={day.toISOString()}>
              <div className="text-xs font-medium text-muted-foreground capitalize mb-1 pl-1">
                {dayLabel}
              </div>
              <div className="flex gap-2">
                {slots.map((slot) => {
                  const slotKey = `${format(day, "yyyy-MM-dd")}_${slot.value}`;
                  const count = getReservationCount?.(slotKey) ?? 0;
                  const isFull = maxPerSlot ? count >= maxPerSlot : false;
                  const remaining = maxPerSlot ? maxPerSlot - count : null;
                  const isSelected = selectedSlot === slotKey;

                  return (
                    <motion.button
                      key={slot.value}
                      onClick={() => !isFull && onSelectSlot(slotKey)}
                      disabled={isFull}
                      className={`flex-1 px-3 py-2.5 rounded-md text-sm border transition-colors text-center ${
                        isFull
                          ? "bg-muted/30 border-border text-muted-foreground/50 cursor-not-allowed line-through"
                          : isSelected
                          ? "bg-primary/10 border-primary text-foreground"
                          : "bg-muted border-border text-muted-foreground hover:border-primary/50"
                      }`}
                      whileTap={isFull ? {} : { scale: 0.97 }}
                    >
                      <span>{slot.label}</span>
                      {isFull ? (
                        <span className="block text-xs text-destructive mt-0.5">Complet</span>
                      ) : remaining !== null && remaining <= 2 ? (
                        <span className="block text-xs text-primary mt-0.5">
                          {remaining} place{remaining > 1 ? "s" : ""}
                        </span>
                      ) : null}
                    </motion.button>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default DateSlotPicker;
