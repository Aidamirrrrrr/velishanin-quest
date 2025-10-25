export const getMedalEmoji = (position: number): string => {
    switch (position) {
        case 1:
            return '🥇'
        case 2:
            return '🥈'
        case 3:
            return '🥉'
        default:
            return `${position}.`
    }
}
