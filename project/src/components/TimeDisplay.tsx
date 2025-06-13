import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Clock } from 'lucide-react';
import { motion } from 'framer-motion';

export default function TimeDisplay() {
  const { i18n } = useTranslation();
  const [time, setTime] = useState(new Date());
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (date: Date) => {
    return new Intl.DateTimeFormat(i18n.language, {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: i18n.language !== 'tr', // Use 24-hour format for Turkish
      timeZoneName: 'short',
    }).format(date);
  };

  return (
    <motion.div
      className="inline-flex items-center gap-2 px-4 py-2.5 bg-base-200/80 backdrop-blur-sm rounded-lg border border-base-300 hover:border-primary/20 transition-colors"
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      whileHover={{ scale: 1.02 }}
      initial={false}
      animate={{
        boxShadow: isHovered 
          ? '0 4px 12px rgba(0, 90, 156, 0.15)' 
          : '0 2px 4px rgba(0, 90, 156, 0.1)',
      }}
      transition={{ duration: 0.2 }}
    >
      <motion.div
        animate={{ rotate: isHovered ? 360 : 0 }}
        transition={{ duration: 1, ease: "linear" }}
        className="text-primary"
      >
        <Clock className="w-5 h-5" strokeWidth={2} />
      </motion.div>
      <time 
        className="font-medium text-base text-base-content min-w-[160px] text-center tabular-nums tracking-wide"
        dateTime={time.toISOString()}
      >
        {formatTime(time)}
      </time>
    </motion.div>
  );
}