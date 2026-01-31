import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import { TRUST_LEVEL_NAMES, TRUST_LEVEL_COLORS, type TrustLevel } from "@/types/linuxdo"

interface TrustLevelBadgeProps {
  level: TrustLevel
}

export function TrustLevelBadge({ level }: TrustLevelBadgeProps) {
  const validLevel = (level >= 0 && level <= 4 ? level : 0) as TrustLevel

  return (
    <Badge
      variant="secondary"
      className={cn(
        "font-medium",
        TRUST_LEVEL_COLORS[validLevel]
      )}
    >
      {TRUST_LEVEL_NAMES[validLevel]}
    </Badge>
  )
}
