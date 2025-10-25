export function jwtTimeToMilliseconds(timeString: string): number {
    const regex = /^(\d+)([smhd])$/
    const match = timeString.match(regex)

    if (!match) {
        throw new Error(`Invalid JWT time format: ${timeString}`)
    }

    const value = parseInt(match[1], 10)
    const unit = match[2]

    const multipliers: Record<string, number> = {
        s: 1000,
        m: 60 * 1000,
        h: 60 * 60 * 1000,
        d: 24 * 60 * 60 * 1000,
    }

    return value * multipliers[unit]
}
