import type { LucideIcon } from "lucide-react";
import {
  Mail, MessageCircle, Bot, BookOpen, Users, User, Send, FileText, Receipt, Calculator,
  AlertTriangle, CheckCircle2, Calendar, ClipboardList, Image, Megaphone, Clock, BarChart3,
  Package, Timer, Tag, Database, Gauge,
} from "lucide-react";
import type { IconName } from "@/data/automationFlows";

export const flowIcons: Record<IconName, LucideIcon> = {
  mail: Mail, whatsapp: MessageCircle, bot: Bot, book: BookOpen, users: Users, user: User, send: Send,
  file: FileText, receipt: Receipt, calculator: Calculator, alert: AlertTriangle, check: CheckCircle2,
  calendar: Calendar, clipboard: ClipboardList, image: Image, megaphone: Megaphone, clock: Clock,
  chart: BarChart3, package: Package, timer: Timer, tag: Tag, database: Database, gauge: Gauge,
};

export const Packet = ({ path, color, delay, dur = 2.4, reverse = false }: { path: string; color: string; delay: number; dur?: number; reverse?: boolean }) => {
  const begin = `${delay.toFixed(2)}s`;
  const keyPoints = reverse ? "1;0" : "0;1";
  return (
    <>
      <circle r="9" fill={color} opacity="0">
        <set attributeName="opacity" to="0.22" begin={begin} />
        <animateMotion dur={`${dur}s`} begin={begin} repeatCount="indefinite" path={path} keyPoints={keyPoints} keyTimes="0;1" calcMode="linear" />
      </circle>
      <circle r="3.5" fill={color} opacity="0">
        <set attributeName="opacity" to="1" begin={begin} />
        <animateMotion dur={`${dur}s`} begin={begin} repeatCount="indefinite" path={path} keyPoints={keyPoints} keyTimes="0;1" calcMode="linear" />
      </circle>
    </>
  );
};
